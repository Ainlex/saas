import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Solo importar en runtime para evitar problemas de build
    const { getCurrentUser } = await import('@contafacil/auth')
    const { prisma } = await import('@contafacil/database')
    
    const user = await getCurrentUser(request)
    // NOTA: Eliminar estos logs cuando todo esté al 100%
    console.log('🔍 USER obtenido de Clerk:', user)

    if (!user || !user.empresaId) {
      console.log('⚠️ Usuario no autenticado o sin empresaId')
      return Response.json([], { status: 200 })
    }

    // Obtener módulos activos para la empresa
    // NOTA: Eliminar estos logs cuando todo esté al 100%
    console.log('🔎 Buscando módulos activos para empresaId:', user.empresaId)
    const empresaModulos = await prisma.empresaModulo.findMany({
      where: {
        empresaId: user.empresaId,
        activo: true,
        modulo: {
          activo: true
        }
      },
      include: {
        modulo: {
          include: {
            rutas: true
          }
        }
      },
      orderBy: {
        modulo: {
          orden: 'asc'
        }
      }
    })
    // NOTA: Eliminar estos logs cuando todo esté al 100%
    console.log('✅ Resultado empresaModulos:', empresaModulos)

    const modules = empresaModulos.map((em: any) => ({
      nombre: em.modulo.nombre,
      displayName: em.modulo.displayName,
      activo: em.activo,
      icono: em.modulo.icono,
      color: em.modulo.color,
      rutas: em.modulo.rutas.map((r: any) => r.ruta)
    }))
    // NOTA: Eliminar estos logs cuando todo esté al 100%
    console.log('📦 Modules a retornar:', modules)

    return Response.json(modules)
  } catch (error) {
    // NOTA: Eliminar estos logs cuando todo esté al 100%
    console.error('❌ Error en /api/modulos/active:', error)
    return Response.json(
      { 
        error: (error as Error).message,
        stack: (error as Error).stack,
        full: JSON.stringify(error)
      }, 
      { status: 500 }
    )
  }
} 