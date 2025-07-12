import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@contafacil/auth/middleware'
import { ModuleGuard } from '@contafacil/auth/guards'
import { prisma, seedPlanCuentasParaguay } from '@contafacil/database'

// Si aparece error de tipado en prisma.planCuentas:
// => Ejecutar 'pnpm --filter @contafacil/database db:generate' para regenerar el cliente Prisma
// Esto ocurre tras agregar un nuevo modelo o cambiar el schema

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    await ModuleGuard.checkModuleAccess(user.empresaId, 'contabilidad')

    const { searchParams } = new URL(request.url)
    const tipoMayor = searchParams.get('tipoMayor')
    const nivel = searchParams.get('nivel')
    const permiteMovimiento = searchParams.get('permiteMovimiento')

    let cuentas = await prisma.planCuentas.findMany({
      where: {
        empresaId: user.empresaId,
        activo: true,
        ...(tipoMayor && { tipoMayor }),
        ...(nivel && { nivel: parseInt(nivel) }),
        ...(permiteMovimiento && { permiteMovimiento: permiteMovimiento === 'true' })
      },
      orderBy: { codigo: 'asc' }
    })

    // Si no hay cuentas, ejecutar seed automáticamente
    if (cuentas.length === 0) {
      await seedPlanCuentasParaguay(user.empresaId)
      // Recargar después del seed
      const cuentasAfterSeed = await prisma.planCuentas.findMany({
        where: { empresaId: user.empresaId, activo: true },
        orderBy: { codigo: 'asc' }
      })
      return NextResponse.json({
        success: true,
        cuentas: cuentasAfterSeed,
        total: cuentasAfterSeed.length,
        seeded: true
      })
    }

    return NextResponse.json({ cuentas })
  } catch (error: any) {
    console.error('API /plan-cuentas error:', error)
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
} 