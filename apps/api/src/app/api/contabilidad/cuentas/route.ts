import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@contafacil/auth/middleware'
import { ModuleGuard } from '@contafacil/auth/guards'
import { prisma } from '@contafacil/database'

export async function GET(request: NextRequest) {
  try {
    // ✅ USAR FUNCIONES EXISTENTES
    const user = await getCurrentUser(request)
    await ModuleGuard.checkModuleAccess(user.empresaId, 'contabilidad')
    
    const cuentas = await prisma.cuentaContable.findMany({
      where: { 
        empresaId: user.empresaId,
        activo: true 
      },
      include: {
        cuentasHijas: {
          where: { activo: true },
          include: {
            cuentasHijas: {
              where: { activo: true },
              include: {
                cuentasHijas: {
                  where: { activo: true }
                }
              }
            }
          }
        },
        cuentaPadre: true
      },
      orderBy: { codigo: 'asc' }
    })
    
    return NextResponse.json({ 
      success: true,
      cuentas,
      total: cuentas.length 
    })
    
  } catch (error) {
    console.error('Error obteniendo cuentas:', error)
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 403 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    await ModuleGuard.checkModuleAccess(user.empresaId, 'contabilidad')
    
    const body = await request.json()
    const { codigo, nombre, descripcion, tipo, nivel, cuentaPadreId, esMovimiento } = body
    
    // Validar código único
    const existeCuenta = await prisma.cuentaContable.findFirst({
      where: {
        empresaId: user.empresaId,
        codigo,
        activo: true
      }
    })
    
    if (existeCuenta) {
      return NextResponse.json({
        success: false,
        error: 'Ya existe una cuenta con ese código'
      }, { status: 400 })
    }
    
    const cuenta = await prisma.cuentaContable.create({
      data: {
        empresaId: user.empresaId,
        codigo,
        nombre,
        descripcion,
        tipo,
        nivel,
        cuentaPadreId,
        esMovimiento,
        activo: true
      }
    })
    
    return NextResponse.json({ 
      success: true,
      cuenta 
    })
    
  } catch (error) {
    console.error('Error creando cuenta:', error)
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 400 })
  }
} 