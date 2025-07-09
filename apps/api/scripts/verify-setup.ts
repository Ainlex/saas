import fetch from 'node-fetch';

const API_BASE = 'http://localhost:3002';

interface TestResult {
  name: string;
  status: 'PASS' | 'FAIL';
  message: string;
  details?: any;
}

async function runTests(): Promise<TestResult[]> {
  const results: TestResult[] = [];

  console.log('🧪 Verificando implementación de ContaFácil API...\n');

  // Test 1: Health endpoint
  try {
    console.log('🔍 Testing /api/health...');
    const response = await fetch(`${API_BASE}/api/health`);
    const data = await response.json() as any;
    
    if (response.ok && data.status === 'ok') {
      results.push({
        name: 'Health Endpoint',
        status: 'PASS',
        message: 'Health check funcionando correctamente',
        details: data
      });
      console.log('✅ Health endpoint: OK');
    } else {
      results.push({
        name: 'Health Endpoint',
        status: 'FAIL',
        message: `Status: ${response.status}, Data: ${JSON.stringify(data)}`
      });
      console.log('❌ Health endpoint: FAILED');
    }
  } catch (error) {
    results.push({
      name: 'Health Endpoint',
      status: 'FAIL',
      message: (error as Error).message
    });
    console.log('❌ Health endpoint: ERROR');
  }

  // Test 2: API Info endpoint
  try {
    console.log('\n🔍 Testing /api/info...');
    const response = await fetch(`${API_BASE}/api/info`);
    const data = await response.json() as any;
    
    if (response.ok && data.message) {
      results.push({
        name: 'API Info Endpoint',
        status: 'PASS',
        message: 'API info funcionando correctamente',
        details: data
      });
      console.log('✅ API info: OK');
    } else {
      results.push({
        name: 'API Info Endpoint',
        status: 'FAIL',
        message: `Status: ${response.status}, Data: ${JSON.stringify(data)}`
      });
      console.log('❌ API info: FAILED');
    }
  } catch (error) {
    results.push({
      name: 'API Info Endpoint',
      status: 'FAIL',
      message: (error as Error).message
    });
    console.log('❌ API info: ERROR');
  }

  // Test 3: Protected endpoints without auth
  const protectedEndpoints = [
    '/api/auth/user',
    '/api/modulos/active',
    '/api/pos'
  ];

  for (const endpoint of protectedEndpoints) {
    try {
      console.log(`\n🔍 Testing ${endpoint} (sin autenticación)...`);
      const response = await fetch(`${API_BASE}${endpoint}`);
      
      if (response.status === 401) {
        results.push({
          name: `Protected Endpoint: ${endpoint}`,
          status: 'PASS',
          message: 'Bloquea acceso no autenticado correctamente'
        });
        console.log(`✅ ${endpoint}: Bloquea acceso (401)`);
      } else {
        results.push({
          name: `Protected Endpoint: ${endpoint}`,
          status: 'FAIL',
          message: `Debería retornar 401, pero retornó ${response.status}`
        });
        console.log(`❌ ${endpoint}: Debería bloquear acceso`);
      }
    } catch (error) {
      results.push({
        name: `Protected Endpoint: ${endpoint}`,
        status: 'FAIL',
        message: (error as Error).message
      });
      console.log(`❌ ${endpoint}: ERROR`);
    }
  }

  // Test 4: CORS headers
  try {
    console.log('\n🔍 Testing CORS headers...');
    const response = await fetch(`${API_BASE}/api/health`, {
      method: 'OPTIONS'
    });
    
    const corsOrigin = response.headers.get('access-control-allow-origin');
    const corsMethods = response.headers.get('access-control-allow-methods');
    
    if (corsOrigin && corsMethods) {
      results.push({
        name: 'CORS Configuration',
        status: 'PASS',
        message: 'Headers CORS configurados correctamente',
        details: { origin: corsOrigin, methods: corsMethods }
      });
      console.log('✅ CORS: Configurado correctamente');
    } else {
      results.push({
        name: 'CORS Configuration',
        status: 'FAIL',
        message: 'Headers CORS faltantes'
      });
      console.log('❌ CORS: Headers faltantes');
    }
  } catch (error) {
    results.push({
      name: 'CORS Configuration',
      status: 'FAIL',
      message: (error as Error).message
    });
    console.log('❌ CORS: ERROR');
  }

  return results;
}

function printSummary(results: TestResult[]) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN DE VERIFICACIÓN');
  console.log('='.repeat(60));
  
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  
  console.log(`✅ Tests pasados: ${passed}`);
  console.log(`❌ Tests fallidos: ${failed}`);
  console.log(`📈 Total: ${results.length}`);
  
  if (failed > 0) {
    console.log('\n🔍 Detalles de fallos:');
    results.filter(r => r.status === 'FAIL').forEach(result => {
      console.log(`  ❌ ${result.name}: ${result.message}`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
  
  if (failed === 0) {
    console.log('🎉 ¡TODOS LOS TESTS PASARON! La API está funcionando correctamente.');
    console.log('\n📝 Próximos pasos:');
    console.log('   1. Configurar autenticación con tokens JWT');
    console.log('   2. Probar endpoints con usuarios autenticados');
    console.log('   3. Implementar funcionalidades específicas de módulos');
  } else {
    console.log('⚠️  Algunos tests fallaron. Revisa los detalles arriba.');
  }
  
  console.log('='.repeat(60));
}

async function main() {
  try {
    const results = await runTests();
    printSummary(results);
    
    // Exit code basado en resultados
    const failed = results.filter(r => r.status === 'FAIL').length;
    process.exit(failed > 0 ? 1 : 0);
  } catch (error) {
    console.error('💥 Error ejecutando tests:', error);
    process.exit(1);
  }
}

main(); 