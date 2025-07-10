// Script para verificar que la gestión de módulos funciona
async function testGestionModulos() {
  console.log('🧪 Testing Gestión de Módulos...')
  
  // Simular datos de prueba
  const empresaId = 'test-empresa-id'
  const baseUrl = 'http://localhost:3002/api/admin/empresas'
  
  console.log('1. Verificando estructura de archivos...')
  
  // Verificar que los archivos existen
  const fs = require('fs')
  const path = require('path')
  
  const archivosRequeridos = [
    'apps/api/src/app/api/admin/empresas/[empresaId]/modulos/route.ts',
    'apps/api/src/app/api/admin/empresas/[empresaId]/modulos/historico/route.ts',
    'apps/admin/src/app/admin/empresas/[empresaId]/modulos/page.tsx',
    'apps/admin/src/app/admin/empresas/[empresaId]/modulos/components/ModuloCard.tsx',
    'apps/admin/src/app/admin/empresas/[empresaId]/modulos/components/PlanesPredefinidos.tsx',
    'apps/admin/src/app/admin/empresas/[empresaId]/modulos/components/HistoricoModulos.tsx',
    'packages/ui/src/components/common/Switch.tsx'
  ]
  
  let archivosExistentes = 0
  for (const archivo of archivosRequeridos) {
    if (fs.existsSync(archivo)) {
      console.log(`✅ ${archivo}`)
      archivosExistentes++
    } else {
      console.log(`❌ ${archivo} - NO EXISTE`)
    }
  }
  
  console.log(`\n📊 Archivos creados: ${archivosExistentes}/${archivosRequeridos.length}`)
  
  // Verificar que el componente Switch está exportado
  console.log('\n2. Verificando exportaciones...')
  
  try {
    const uiIndex = fs.readFileSync('packages/ui/src/index.ts', 'utf8')
    if (uiIndex.includes("export { Switch }")) {
      console.log('✅ Switch exportado correctamente')
    } else {
      console.log('❌ Switch no está exportado')
    }
  } catch (error) {
    console.log('❌ Error verificando exportaciones:', error.message)
  }
  
  // Verificar schema de base de datos
  console.log('\n3. Verificando schema de base de datos...')
  
  try {
    const schema = fs.readFileSync('packages/database/prisma/schema.prisma', 'utf8')
    if (schema.includes('model ModuloHistorico')) {
      console.log('✅ ModuloHistorico agregado al schema')
    } else {
      console.log('❌ ModuloHistorico no está en el schema')
    }
  } catch (error) {
    console.log('❌ Error verificando schema:', error.message)
  }
  
  console.log('\n🎯 Testing completado')
  console.log('\n📋 Próximos pasos:')
  console.log('1. Ejecutar: cd packages/database && npx prisma db push')
  console.log('2. Ejecutar: npx prisma generate')
  console.log('3. Reiniciar las aplicaciones')
  console.log('4. Probar en: http://localhost:3001/admin/empresas/[id]/modulos')
}

testGestionModulos().catch(console.error) 