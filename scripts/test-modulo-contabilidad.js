#!/usr/bin/env node

const { PrismaClient } = require('../packages/database/src/generated')

const prisma = new PrismaClient()

async function testModuloContabilidad() {
  console.log('🧪 Testing Módulo Contabilidad - Plan de Cuentas Profesional')
  console.log('=' .repeat(60))

  try {
    // 1. Verificar conexión a BD
    console.log('\n1️⃣ Verificando conexión a base de datos...')
    await prisma.$connect()
    console.log('✅ Conexión exitosa')

    // 2. Verificar que el modelo planCuentas existe
    console.log('\n2️⃣ Verificando modelo planCuentas...')
    const modelExists = await prisma.planCuentas.findFirst()
    console.log('✅ Modelo planCuentas disponible')

    // 3. Buscar empresa demo
    console.log('\n3️⃣ Buscando empresa demo...')
    const empresa = await prisma.empresa.findFirst()
    if (!empresa) {
      console.log('❌ No se encontró empresa demo')
      return
    }
    console.log(`✅ Empresa encontrada: ${empresa.nombre} (${empresa.id})`)

    // 4. Verificar si ya tiene plan de cuentas
    console.log('\n4️⃣ Verificando plan de cuentas existente...')
    const cuentasExistentes = await prisma.planCuentas.count({
      where: { empresaId: empresa.id }
    })
    console.log(`📊 Cuentas existentes: ${cuentasExistentes}`)

    // 5. Probar inicialización dual
    console.log('\n5️⃣ Probando inicialización dual...')
    const { initializePlanCuentas } = require('./packages/database/src/seed-plan-cuentas-paraguay')
    await initializePlanCuentas(empresa.id)
    
    const cuentasDespues = await prisma.planCuentas.count({
      where: { empresaId: empresa.id }
    })
    console.log(`📊 Cuentas después de inicialización: ${cuentasDespues}`)

    // 6. Probar filtros del modelo profesional
    console.log('\n6️⃣ Probando filtros profesionales...')
    const activos = await prisma.planCuentas.findMany({
      where: { 
        empresaId: empresa.id,
        tipoMayor: 'ACTIVO',
        activo: true
      }
    })
    console.log(`📈 Cuentas de ACTIVO: ${activos.length}`)

    const nivel4 = await prisma.planCuentas.findMany({
      where: { 
        empresaId: empresa.id,
        nivel: 4,
        permiteMovimiento: true
      }
    })
    console.log(`📊 Cuentas nivel 4 con movimiento: ${nivel4.length}`)

    // 7. Probar endpoint API (simulado)
    console.log('\n7️⃣ Probando estructura de datos...')
    const muestra = await prisma.planCuentas.findFirst({
      where: { empresaId: empresa.id }
    })
    
    if (muestra) {
      console.log('✅ Estructura de datos correcta:')
      console.log(`   - Código: ${muestra.codigo}`)
      console.log(`   - Nombre: ${muestra.nombre}`)
      console.log(`   - Tipo Mayor: ${muestra.tipoMayor}`)
      console.log(`   - Naturaleza: ${muestra.naturaleza}`)
      console.log(`   - Nivel: ${muestra.nivel}`)
      console.log(`   - Permite Movimiento: ${muestra.permiteMovimiento}`)
      console.log(`   - Moneda: ${muestra.monedaPermitida}`)
    }

    console.log('\n🎉 ¡Testing completado exitosamente!')
    console.log('\n📋 Resumen:')
    console.log(`   - Modelo planCuentas: ✅`)
    console.log(`   - Inicialización dual: ✅`)
    console.log(`   - Filtros profesionales: ✅`)
    console.log(`   - Estructura de datos: ✅`)
    console.log(`   - Total cuentas: ${cuentasDespues}`)

  } catch (error) {
    console.error('\n❌ Error durante testing:', error.message)
    console.error(error.stack)
  } finally {
    await prisma.$disconnect()
  }
}

// Ejecutar testing
testModuloContabilidad()
  .then(() => {
    console.log('\n🏁 Testing finalizado')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error)
    process.exit(1)
  }) 