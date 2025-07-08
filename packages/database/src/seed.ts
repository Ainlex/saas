import { PrismaClient } from './generated'

const prisma = new PrismaClient()

async function createDemoData() {
  try {
    console.log('🌱 Creando datos demo...')

    // Crear empresa demo
    const empresa = await prisma.empresa.create({
      data: {
        nombre: 'Ferretería Demo',
        ruc: '12345678-1',
        email: 'demo@ferreteria.py',
        telefono: '+595 21 123 456',
        direccion: 'Asunción, Paraguay',
        plan: 'PROFESIONAL',
        activo: true
      }
    })

    console.log('✅ Empresa creada:', empresa.id)

    // Crear módulos demo
    const modulos = await Promise.all([
      prisma.modulo.create({
        data: {
          nombre: 'pos',
          displayName: 'Punto de Venta',
          descripcion: 'Sistema POS táctil para ventas rápidas',
          version: '1.0.0',
          activo: true,
          orden: 1,
          icono: '🛒',
          color: '#3B82F6'
        }
      }),
      prisma.modulo.create({
        data: {
          nombre: 'inventario',
          displayName: 'Inventario',
          descripcion: 'Gestión completa de stock y productos',
          version: '1.0.0',
          activo: true,
          orden: 2,
          icono: '📦',
          color: '#10B981'
        }
      }),
      prisma.modulo.create({
        data: {
          nombre: 'facturacion',
          displayName: 'Facturación',
          descripcion: 'Facturación electrónica y reportes',
          version: '1.0.0',
          activo: true,
          orden: 3,
          icono: '📄',
          color: '#F59E0B'
        }
      }),
      prisma.modulo.create({
        data: {
          nombre: 'contabilidad',
          displayName: 'Contabilidad',
          descripcion: 'Libro diario y mayor',
          version: '1.0.0',
          activo: true,
          orden: 4,
          icono: '📊',
          color: '#8B5CF6'
        }
      }),
      prisma.modulo.create({
        data: {
          nombre: 'crm',
          displayName: 'CRM',
          descripcion: 'Gestión de clientes y contactos',
          version: '1.0.0',
          activo: true,
          orden: 5,
          icono: '👥',
          color: '#EC4899'
        }
      }),
      prisma.modulo.create({
        data: {
          nombre: 'reportes',
          displayName: 'Reportes',
          descripcion: 'Reportes y análisis de datos',
          version: '1.0.0',
          activo: true,
          orden: 6,
          icono: '📈',
          color: '#06B6D4'
        }
      })
    ])

    console.log('✅ Módulos creados:', modulos.length)

    // Crear roles
    const rolAdmin = await prisma.rol.create({
      data: {
        nombre: 'ADMIN',
        descripcion: 'Administrador de empresa',
        activo: true
      }
    })

    const rolUsuario = await prisma.rol.create({
      data: {
        nombre: 'USUARIO',
        descripcion: 'Usuario estándar',
        activo: true
      }
    })

    console.log('✅ Roles creados')

    // Activar todos los módulos para la empresa demo
    const empresaModulos = await Promise.all(
      modulos.map(modulo => 
        prisma.empresaModulo.create({
          data: {
            empresaId: empresa.id,
            moduloId: modulo.id,
            activo: true,
            configuracion: {}
          }
        })
      )
    )

    console.log('✅ Módulos activados para empresa:', empresaModulos.length)

    // Crear rutas para los módulos
    const rutas = [
      { moduloId: modulos[0].id, ruta: '/pos', nombre: 'Punto de Venta' },
      { moduloId: modulos[1].id, ruta: '/inventario', nombre: 'Inventario' },
      { moduloId: modulos[2].id, ruta: '/facturacion', nombre: 'Facturación' },
      { moduloId: modulos[3].id, ruta: '/contabilidad', nombre: 'Contabilidad' },
      { moduloId: modulos[4].id, ruta: '/crm', nombre: 'CRM' },
      { moduloId: modulos[5].id, ruta: '/reportes', nombre: 'Reportes' }
    ]

    await Promise.all(
      rutas.map(ruta =>
        prisma.moduloRuta.create({
          data: {
            moduloId: ruta.moduloId,
            ruta: ruta.ruta,
            nombre: ruta.nombre,
            activo: true
          }
        })
      )
    )

    console.log('✅ Rutas creadas')

    console.log('🎉 Datos demo creados exitosamente!')
    console.log('📋 Empresa Demo ID:', empresa.id)
    console.log('📋 Empresa Demo RUC:', empresa.ruc)
    console.log('📋 Módulos activos:', modulos.length)

    return {
      empresaId: empresa.id,
      empresaRuc: empresa.ruc,
      modulosCount: modulos.length
    }

  } catch (error) {
    console.error('❌ Error creando datos demo:', error)
    throw error
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  createDemoData()
    .then(() => {
      console.log('✅ Seed completado')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Error en seed:', error)
      process.exit(1)
    })
}

export { createDemoData } 