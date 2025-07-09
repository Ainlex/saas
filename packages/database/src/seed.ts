import { PrismaClient } from './generated'

const prisma = new PrismaClient()

async function createOrGetEmpresa(data: any) {
  const existing = await prisma.empresa.findUnique({ where: { ruc: data.ruc } })
  if (existing) return existing
  return prisma.empresa.create({ data })
}

async function createOrGetModulo(data: any) {
  const existing = await prisma.modulo.findUnique({ where: { nombre: data.nombre } })
  if (existing) return existing
  return prisma.modulo.create({ data })
}

async function createOrGetRol(data: any) {
  const existing = await prisma.rol.findFirst({ where: { nombre: data.nombre } })
  if (existing) return existing
  return prisma.rol.create({ data })
}

async function createDemoData() {
  try {
    console.log('🌱 Creando datos demo...')

    // Crear empresa demo
    const empresa = await createOrGetEmpresa({
      nombre: 'Ferretería Demo',
      ruc: '12345678-1',
      email: 'demo@ferreteria.py',
      telefono: '+595 21 123 456',
      direccion: 'Asunción, Paraguay',
      plan: 'PROFESIONAL',
      activo: true
    })

    console.log('✅ Empresa creada:', empresa.id)

    // Crear módulos demo
    const modulos = await Promise.all([
      createOrGetModulo({
        nombre: 'pos',
        displayName: 'Punto de Venta',
        descripcion: 'Sistema POS táctil para ventas rápidas',
        version: '1.0.0',
        activo: true,
        orden: 1,
        icono: '🛒',
        color: '#3B82F6'
      }),
      createOrGetModulo({
        nombre: 'inventario',
        displayName: 'Inventario',
        descripcion: 'Gestión completa de stock y productos',
        version: '1.0.0',
        activo: true,
        orden: 2,
        icono: '📦',
        color: '#10B981'
      }),
      createOrGetModulo({
        nombre: 'facturacion',
        displayName: 'Facturación',
        descripcion: 'Facturación electrónica y reportes',
        version: '1.0.0',
        activo: true,
        orden: 3,
        icono: '📄',
        color: '#F59E0B'
      }),
      createOrGetModulo({
        nombre: 'contabilidad',
        displayName: 'Contabilidad',
        descripcion: 'Libro diario y mayor',
        version: '1.0.0',
        activo: true,
        orden: 4,
        icono: '📊',
        color: '#8B5CF6'
      }),
      createOrGetModulo({
        nombre: 'crm',
        displayName: 'CRM',
        descripcion: 'Gestión de clientes y contactos',
        version: '1.0.0',
        activo: true,
        orden: 5,
        icono: '👥',
        color: '#EC4899'
      }),
      createOrGetModulo({
        nombre: 'reportes',
        displayName: 'Reportes',
        descripcion: 'Reportes y análisis de datos',
        version: '1.0.0',
        activo: true,
        orden: 6,
        icono: '📈',
        color: '#06B6D4'
      })
    ])

    console.log('✅ Módulos creados:', modulos.length)

    // Crear roles
    const rolAdmin = await createOrGetRol({
      nombre: 'ADMIN',
      descripcion: 'Administrador de empresa',
      activo: true
    })

    const rolUsuario = await createOrGetRol({
      nombre: 'USUARIO',
      descripcion: 'Usuario estándar',
      activo: true
    })

    console.log('✅ Roles creados')

    // Crear usuario admin
    const usuarioAdmin = await prisma.usuario.upsert({
      where: { email: 'admin@contafacil.com' },
      update: {},
      create: {
        email: 'admin@contafacil.com',
        nombre: 'Administrador',
        apellido: 'Sistema',
        empresaId: empresa.id,
        rolId: rolAdmin.id,
        activo: true
      }
    })

    console.log('✅ Usuario admin creado:', usuarioAdmin.email)

    // Activar todos los módulos para la empresa demo
    const empresaModulos = await Promise.all(
      modulos.map(async modulo => {
        const existing = await prisma.empresaModulo.findUnique({
          where: { empresaId_moduloId: { empresaId: empresa.id, moduloId: modulo.id } }
        })
        if (existing) return existing
        return prisma.empresaModulo.create({
          data: {
            empresaId: empresa.id,
            moduloId: modulo.id,
            activo: true,
            configuracion: {}
          }
        })
      })
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
      rutas.map(async ruta => {
        const existing = await prisma.moduloRuta.findFirst({
          where: { moduloId: ruta.moduloId, ruta: ruta.ruta }
        })
        if (existing) return existing
        return prisma.moduloRuta.create({
          data: {
            moduloId: ruta.moduloId,
            ruta: ruta.ruta,
            nombre: ruta.nombre,
            activo: true
          }
        })
      })
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