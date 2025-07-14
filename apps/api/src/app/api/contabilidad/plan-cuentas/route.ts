import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@contafacil/auth/middleware'
import { ModuleGuard } from '@contafacil/auth/guards'
import { prisma, seedPlanCuentasParaguay } from '@contafacil/database'

// Si aparece error de tipado en prisma.planCuentas:
// => Ejecutar 'pnpm --filter @contafacil/database db:generate' para regenerar el cliente Prisma
// Esto ocurre tras agregar un nuevo modelo o cambiar el schema

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 === DEBUG PLAN CUENTAS API ===')
    
    const user = await getCurrentUser(request)
    console.log('👤 User:', user?.id, 'Empresa:', user?.empresaId)
    
    if (!user) {
      console.log('❌ No autorizado - usuario no encontrado')
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    
    await ModuleGuard.checkModuleAccess(user.empresaId, 'contabilidad')
    console.log('✅ Module access OK')

    const { searchParams } = new URL(request.url)
    const tipoMayor = searchParams.get('tipoMayor')
    const nivel = searchParams.get('nivel')
    const permiteMovimiento = searchParams.get('permiteMovimiento')
    const padre = searchParams.get('padre') // Para navegación jerárquica

    console.log('🔍 Filtros recibidos:')
    console.log('  - tipoMayor:', tipoMayor)
    console.log('  - nivel:', nivel)
    console.log('  - permiteMovimiento:', permiteMovimiento)
    console.log('  - padre:', padre)

    const where = {
      empresaId: user.empresaId,
      activo: true,
      ...(tipoMayor && { tipoMayor }),
      // Solo filtrar por nivel si el usuario lo selecciona explícitamente
      ...(nivel !== null && nivel !== '' && { nivel: parseInt(nivel) }),
      ...(permiteMovimiento && { permiteMovimiento: permiteMovimiento === 'true' }),
      ...(padre !== null && padre !== undefined ? { codigoPadre: padre } : {})
    }

    console.log('🔍 WHERE clause:', JSON.stringify(where, null, 2))

    let cuentas = await prisma.planCuentas.findMany({
      where,
      orderBy: { codigo: 'asc' }
    })
    
    console.log('📊 Cuentas encontradas:', cuentas.length)
    console.log('📊 Códigos:', cuentas.map(c => `${c.codigo} (nivel: ${c.nivel}, padre: ${c.codigoPadre})`))
    console.log('🔍 === FIN DEBUG ===')

    // Si no hay cuentas, ejecutar seed automáticamente
   // if (cuentas.length === 0) {
     // await seedPlanCuentasParaguay(user.empresaId)
      // Recargar después del seed
    //  const cuentasAfterSeed = await prisma.planCuentas.findMany({
    //    where: { empresaId: user.empresaId, activo: true },
    //    orderBy: { codigo: 'asc' }
    //  })
     // return NextResponse.json({
     //   success: true,
     //   cuentas: cuentasAfterSeed,
     //   total: cuentasAfterSeed.length,
     //   seeded: true
   //   })
  

    // Auto-migrar si las cuentas no tienen los campos nuevos
    if (cuentas.length > 0 && !cuentas[0].tipoMayor) {
      await migrateExistingPlanCuentas()
      
      // Recargar después de migración
      const cuentasMigradas = await prisma.planCuentas.findMany({ 
        where, 
        orderBy: { codigo: 'asc' } 
      })
      return NextResponse.json({ cuentas: cuentasMigradas, migrated: true })
    }

    return NextResponse.json({ cuentas })
  } catch (error: any) {
    console.error('API /plan-cuentas error:', error)
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    await ModuleGuard.checkModuleAccess(user.empresaId, 'contabilidad')
    
    const data = await request.json()
    
    // ✅ CORREGIR: Calcular nivel automáticamente
    data.nivel = data.codigo.split('.').length
    
    // ✅ CORREGIR: Determinar código padre automáticamente  
    if (data.nivel > 1) {
      const partes = data.codigo.split('.')
      data.codigoPadre = partes.slice(0, -1).join('.')
    } else {
      data.codigoPadre = null
    }
    
    // Determinar tipo mayor automáticamente si no se proporciona
    if (!data.tipoMayor) {
      if (data.codigo.startsWith('1')) data.tipoMayor = 'ACTIVO'
      else if (data.codigo.startsWith('2')) data.tipoMayor = 'PASIVO'
      else if (data.codigo.startsWith('3')) data.tipoMayor = 'PATRIMONIO'
      else if (data.codigo.startsWith('4')) data.tipoMayor = 'INGRESOS'
      else if (data.codigo.startsWith('5')) data.tipoMayor = 'GASTOS'
      else data.tipoMayor = 'ACTIVO'
    }
    // Determinar naturaleza automáticamente si no se proporciona
    if (!data.naturaleza) {
      data.naturaleza = ['1', '5'].some(x => data.codigo.startsWith(x)) ? 'DEUDORA' : 'ACREEDORA'
    }
    
    const cuenta = await prisma.planCuentas.create({
      data: {
        ...data,
        empresaId: user.empresaId,
        activo: true,
        permiteMovimiento: data.permiteMovimiento ?? (data.nivel >= 4),
        monedaPermitida: data.monedaPermitida || 'GUARANIES'
      }
    })
    
    return NextResponse.json({ cuenta })
  } catch (error: any) {
    console.error('API POST /plan-cuentas error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    await ModuleGuard.checkModuleAccess(user.empresaId, 'contabilidad')
    
    const data = await request.json()
    const { id, ...updateData } = data
    
    const cuenta = await prisma.planCuentas.update({
      where: { 
        id,
        empresaId: user.empresaId // Security: solo puede editar sus cuentas
      },
      data: updateData
    })
    
    return NextResponse.json({ cuenta })
  } catch (error: any) {
    console.error('API PUT /plan-cuentas error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Función para migrar datos existentes al nuevo formato
async function migrateExistingPlanCuentas() {
  console.log('🔄 Migrando plan de cuentas existente...')
  
  // Actualizar cuentas existentes con valores por defecto
  const cuentasExistentes = await prisma.planCuentas.findMany()
  
  for (const cuenta of cuentasExistentes) {
    // Determinar nivel por código
    const nivel = cuenta.codigo.split('.').length
    
    // Determinar tipo mayor por código
    let tipoMayor = 'ACTIVO'
    if (cuenta.codigo.startsWith('2')) tipoMayor = 'PASIVO'
    else if (cuenta.codigo.startsWith('3')) tipoMayor = 'PATRIMONIO'
    else if (cuenta.codigo.startsWith('4')) tipoMayor = 'INGRESOS'
    else if (cuenta.codigo.startsWith('5')) tipoMayor = 'GASTOS'
    
    // Determinar naturaleza
    const naturaleza = ['1', '5'].some(x => cuenta.codigo.startsWith(x)) ? 'DEUDORA' : 'ACREEDORA'
    
    // Determinar código padre
    const codigoPadre = nivel > 1 ? cuenta.codigo.split('.').slice(0, -1).join('.') : null
    
    await prisma.planCuentas.update({
      where: { id: cuenta.id },
      data: {
        nivel,
        tipoMayor,
        naturaleza,
        codigoPadre,
        nombreCorto: cuenta.nombre.substring(0, 20),
        permiteMovimiento: nivel >= 4 // Solo nivel 4 permite movimiento
      }
    })
  }
  
  console.log('✅ Migración completada')
} 