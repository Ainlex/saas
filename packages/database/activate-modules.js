// packages/database/activate-modules.js
const { PrismaClient } = require('./src/generated')

const prisma = new PrismaClient()

async function activateModules() {
  try {
    console.log('🔧 Activando módulos para empresa...')
    
    // Buscar empresa y módulos
    const empresa = await prisma.empresa.findFirst({
      where: { id: 'empresa_demo_001' }
    })
    
    if (!empresa) {
      console.log('❌ No se encontró la empresa demo')
      return
    }
    
    const modulos = await prisma.modulo.findMany({
      where: { 
        nombre: { in: ['pos', 'inventario', 'facturacion'] }
      }
    })
    
    console.log(`📦 Encontrados ${modulos.length} módulos`)
    
    // Activar cada módulo para la empresa
    for (const modulo of modulos) {
      const empresaModulo = await prisma.empresaModulo.upsert({
        where: {
          empresaId_moduloId: {
            empresaId: empresa.id,
            moduloId: modulo.id
          }
        },
        create: {
          empresaId: empresa.id,
          moduloId: modulo.id,
          activo: true
        },
        update: {
          activo: true
        }
      })
      
      console.log(`✅ Módulo ${modulo.displayName} activado`)
    }
    
    console.log('🎉 ¡Todos los módulos activados!')
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

activateModules()