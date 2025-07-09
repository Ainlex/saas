import fetch from 'node-fetch';

const API_BASE = 'http://localhost:3002';

async function testAPIRoutes() {
  console.log('🧪 Testing ContaFácil API Routes...\n');

  // Test 1: Health check (público)
  try {
    console.log('🔍 Testing /api/health...');
    const healthResponse = await fetch(`${API_BASE}/api/health`);
    const healthData = await healthResponse.json() as any;
    console.log('✅ Health check:', healthData.status);
    console.log('   Service:', healthData.service);
    console.log('   Timestamp:', healthData.timestamp);
  } catch (error) {
    console.log('❌ Health check failed:', (error as Error).message);
  }

  // Test 2: Protected route sin token (debe fallar)
  try {
    console.log('\n🔍 Testing /api/auth/user (sin token)...');
    const protectedResponse = await fetch(`${API_BASE}/api/auth/user`);
    if (protectedResponse.status === 401) {
      console.log('✅ Protected route blocks unauthorized access');
    } else {
      console.log('❌ Protected route should return 401, got:', protectedResponse.status);
    }
  } catch (error) {
    console.log('❌ Protected route test failed:', (error as Error).message);
  }

  // Test 3: Módulos activos sin token (debe fallar)
  try {
    console.log('\n🔍 Testing /api/modulos/active (sin token)...');
    const modulosResponse = await fetch(`${API_BASE}/api/modulos/active`);
    if (modulosResponse.status === 401) {
      console.log('✅ Módulos endpoint blocks unauthorized access');
    } else {
      console.log('❌ Módulos endpoint should return 401, got:', modulosResponse.status);
    }
  } catch (error) {
    console.log('❌ Módulos endpoint test failed:', (error as Error).message);
  }

  // Test 4: POS endpoint sin token (debe fallar)
  try {
    console.log('\n🔍 Testing /api/pos (sin token)...');
    const posResponse = await fetch(`${API_BASE}/api/pos`);
    if (posResponse.status === 401) {
      console.log('✅ POS endpoint blocks unauthorized access');
    } else {
      console.log('❌ POS endpoint should return 401, got:', posResponse.status);
    }
  } catch (error) {
    console.log('❌ POS endpoint test failed:', (error as Error).message);
  }

  // Test 5: CORS headers
  try {
    console.log('\n🔍 Testing CORS headers...');
    const corsResponse = await fetch(`${API_BASE}/api/health`, {
      method: 'OPTIONS'
    });
    const corsHeaders = corsResponse.headers.get('access-control-allow-origin');
    if (corsHeaders) {
      console.log('✅ CORS headers configured:', corsHeaders);
    } else {
      console.log('❌ CORS headers missing');
    }
  } catch (error) {
    console.log('❌ CORS test failed:', (error as Error).message);
  }

  console.log('\n🎯 API base testing completed!');
  console.log('\n📝 Next steps:');
  console.log('   1. Start the API server: npm run dev');
  console.log('   2. Test with authentication tokens');
  console.log('   3. Verify module access controls');
}

testAPIRoutes().catch(console.error); 