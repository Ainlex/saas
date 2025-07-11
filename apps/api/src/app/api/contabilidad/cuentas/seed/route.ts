import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@contafacil/auth/middleware'
import { ModuleGuard } from '@contafacil/auth/guards'
import { seedCuentasParaguay } from '@contafacil/database'

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    await ModuleGuard.checkModuleAccess(user.empresaId, 'contabilidad')
    
    // Solo admin puede ejecutar seed
    if (user.rol !== 'ADMIN') {
      return NextResponse.json({ 
        success: false,
        error: 'Solo admins pueden ejecutar seed' 
      }, { status: 403 })
    }
    
    await seedCuentasParaguay(user.empresaId)
    
    return NextResponse.json({
      success: true,
      message: 'Plan de cuentas paraguayo cargado exitosamente'
    })
    
  } catch (error) {
    console.error('Error en seed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 })
  }
} 