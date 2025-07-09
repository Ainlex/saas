async function testLogin() {
  console.log('🧪 Probando login directo a la API...');
  
  try {
    // Test 1: Login directo a la API
    const loginData = new URLSearchParams({
      email: 'demo@contafacil.com',
      password: 'demo123',
      callbackUrl: 'http://localhost:3000/dashboard',
      json: 'true'
    });

    console.log('📤 Enviando petición a:', 'http://localhost:3002/api/auth/callback/credentials');
    console.log('📝 Datos:', loginData.toString());

    const response = await fetch('http://localhost:3002/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: loginData.toString()
    });

    console.log('📊 Status:', response.status);
    console.log('📋 Headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('📝 Response:', text);
    
    if (response.ok) {
      console.log('✅ Login exitoso!');
    } else {
      console.log('❌ Login falló');
    }
    
  } catch (error) {
    console.error('💥 Error:', error.message);
    console.error('💥 Stack:', error.stack);
  }
}

async function testProxy() {
  console.log('\n🧪 Probando proxy del cliente...');
  
  try {
    const loginData = new URLSearchParams({
      email: 'demo@contafacil.com',
      password: 'demo123',
      callbackUrl: 'http://localhost:3000/dashboard',
      json: 'true'
    });

    console.log('📤 Enviando petición a:', 'http://localhost:3000/api/auth/callback/credentials');
    console.log('📝 Datos:', loginData.toString());

    const response = await fetch('http://localhost:3000/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: loginData.toString()
    });

    console.log('📊 Status:', response.status);
    console.log('📋 Headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('📝 Response:', text);
    
    if (response.ok) {
      console.log('✅ Proxy funcionando!');
    } else {
      console.log('❌ Proxy falló');
    }
    
  } catch (error) {
    console.error('💥 Error:', error.message);
    console.error('💥 Stack:', error.stack);
  }
}

async function runTests() {
  console.log('🚀 Iniciando tests de autenticación...\n');
  
  await testLogin();
  await testProxy();
  
  console.log('\n🏁 Tests completados');
}

runTests(); 