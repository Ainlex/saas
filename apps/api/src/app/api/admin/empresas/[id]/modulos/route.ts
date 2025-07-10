import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@contafacil/auth'
import { prisma } from '@contafacil/database'
import { z } from 'zod'

// Schema validación
const ModuloUpdateSchema = z.object({
  moduloId: z.string(),
  activo: z.boolean(),
  razon: z.string().optional()
})

const BulkModulosSchema = z.object({
  modulos: z.array(ModuloUpdateSchema)
})

// GET - Obtener módulos de empresa
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request)
    
    // Verificar que es admin
    if (user.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    // Obtener módulos de la empresa
    const empresaModulos = await prisma.empresaModulo.findMany({
      where: { empresaId: params.id },
      include: {
        modulo: true
      }
    })

    // Obtener todos los módulos disponibles
    const todosModulos = await prisma.modulo.findMany({
      where: { activo: true }
    })

    // Mapear estado actual
    const modulosConEstado = todosModulos.map(modulo => {
      const empresaModulo = empresaModulos.find(em => em.moduloId === modulo.id)
      return {
        ...modulo,
        activoEnEmpresa: empresaModulo?.activo || false,
        fechaActivacion: empresaModulo?.fechaActivacion,
        fechaActualizacion: empresaModulo?.fechaDesactivacion
      }
    })

    return NextResponse.json({ modulos: modulosConEstado })

  } catch (error) {
    console.error('Error obteniendo módulos:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// PUT - Actualizar módulo individual
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request)
    
    if (user.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const body = await request.json()
    const { moduloId, activo, razon } = ModuloUpdateSchema.parse(body)

    // Validar dependencias si se está desactivando
    if (!activo) {
      const dependientes = await validarDependencias(params.id, moduloId)
      if (dependientes.length > 0) {
        return NextResponse.json({
          error: 'No se puede desactivar',
          dependientes
        }, { status: 400 })
      }
    }

    // Actualizar o crear empresaModulo
    const resultado = await prisma.empresaModulo.upsert({
      where: {
        empresaId_moduloId: {
          empresaId: params.id,
          moduloId
        }
      },
      update: {
        activo,
        fechaActivacion: activo ? new Date() : undefined,
        fechaDesactivacion: !activo ? new Date() : undefined
      },
      create: {
        empresaId: params.id,
        moduloId,
        activo,
        fechaActivacion: activo ? new Date() : undefined,
        fechaDesactivacion: !activo ? new Date() : undefined
      }
    })

    // Registrar en histórico (comentado hasta que se aplique la migración)
    // await prisma.moduloHistorico.create({
    //   data: {
    //     empresaId: params.id,
    //     moduloId,
    //     accion: activo ? 'ACTIVADO' : 'DESACTIVADO',
    //     usuarioId: user.id,
    //     razon
    //   }
    // })

    return NextResponse.json({ success: true, resultado })

  } catch (error) {
    console.error('Error actualizando módulo:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// POST - Bulk update módulos
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request)
    
    if (user.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const body = await request.json()
    const { modulos } = BulkModulosSchema.parse(body)

    // Procesar cada módulo
    const resultados = []
    for (const { moduloId, activo, razon } of modulos) {
      // Validar dependencias
      if (!activo) {
        const dependientes = await validarDependencias(params.id, moduloId)
        if (dependientes.length > 0) {
          resultados.push({
            moduloId,
            error: 'Tiene dependientes activos',
            dependientes
          })
          continue
        }
      }

      // Actualizar módulo
      const resultado = await prisma.empresaModulo.upsert({
        where: {
          empresaId_moduloId: {
            empresaId: params.id,
            moduloId
          }
        },
        update: { 
          activo,
          fechaActivacion: activo ? new Date() : undefined,
          fechaDesactivacion: !activo ? new Date() : undefined
        },
        create: {
          empresaId: params.id,
          moduloId,
          activo,
          fechaActivacion: activo ? new Date() : undefined,
          fechaDesactivacion: !activo ? new Date() : undefined
        }
      })

      // Registrar histórico (comentado hasta que se aplique la migración)
      // await prisma.moduloHistorico.create({
      //   data: {
      //     empresaId: params.id,
      //     moduloId,
      //     accion: activo ? 'ACTIVADO' : 'DESACTIVADO',
      //     usuarioId: user.id,
      //     razon: razon || 'Activación múltiple'
      //   }
      // })

      resultados.push({ moduloId, success: true })
    }

    return NextResponse.json({ resultados })

  } catch (error) {
    console.error('Error en bulk update:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// Función auxiliar para validar dependencias
async function validarDependencias(empresaId: string, moduloId: string) {
  const DEPENDENCIAS: Record<string, string[]> = {
    'inventario': ['pos'], // Si inventario se desactiva, POS no puede funcionar
    'contabilidad': ['facturacion'], // Si contabilidad se desactiva, facturación no puede funcionar
  }

  const dependientes = DEPENDENCIAS[moduloId] || []
  
  if (dependientes.length === 0) return []

  // Verificar si algún dependiente está activo
  const dependientesActivos = await prisma.empresaModulo.findMany({
    where: {
      empresaId,
      moduloId: { in: dependientes },
      activo: true
    },
    include: { modulo: true }
  })

  return dependientesActivos.map(em => em.modulo.nombre)
} 