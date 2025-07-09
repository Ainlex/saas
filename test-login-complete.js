async function testCompleteLoginFlow() {
  console.log('🧪 Probando flujo completo de login...');
  
  try {
    // Paso 1: Obtener CSRF token
    console.log('📤 Paso 1: Obteniendo CSRF token...');
    const csrfResponse = await fetch('http://localhost:3000/api/auth/csrf');
    const csrfData = await csrfResponse.json();
    console.log('📝 CSRF Token:', csrfData.csrfToken);
    
    // Paso 2: Login con CSRF token
    console.log('📤 Paso 2: Login con CSRF token...');
    const loginData = new URLSearchParams({
      email: 'demo@contafacil.com',
      password: 'demo123',
      callbackUrl: 'http://localhost:3000/dashboard',
      csrfToken: csrfData.csrfToken,
      json: 'true'
    });

    const loginResponse = await fetch('http://localhost:3000/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: loginData.toString()
    });

    console.log('📊 Login Status:', loginResponse.status);
    console.log('📋 Login Headers:', Object.fromEntries(loginResponse.headers.entries()));
    
    const loginText = await loginResponse.text();
    console.log('📝 Login Response:', loginText);
    
    if (loginResponse.ok) {
      console.log('✅ Login exitoso!');
      
      // Paso 3: Verificar sesión
      console.log('📤 Paso 3: Verificando sesión...');
      const sessionResponse = await fetch('http://localhost:3000/api/auth/session');
      const sessionData = await sessionResponse.json();
      console.log('📝 Session:', sessionData);
      
    } else {
      console.log('❌ Login falló');
    }
    
  } catch (error) {
    console.error('💥 Error:', error.message);
    console.error('💥 Stack:', error.stack);
  }
}

async function testDirectAPI() {
  console.log('\n🧪 Probando API directa con CSRF...');
  
  try {
    // Paso 1: Obtener CSRF token de la API
    console.log('📤 Paso 1: Obteniendo CSRF token de API...');
    const csrfResponse = await fetch('http://localhost:3002/api/auth/csrf');
    const csrfData = await csrfResponse.json();
    console.log('📝 CSRF Token:', csrfData.csrfToken);
    
    // Paso 2: Login directo a la API
    console.log('📤 Paso 2: Login directo a API...');
    const loginData = new URLSearchParams({
      email: 'demo@contafacil.com',
      password: 'demo123',
      callbackUrl: 'http://localhost:3000/dashboard',
      csrfToken: csrfData.csrfToken,
      json: 'true'
    });

    const loginResponse = await fetch('http://localhost:3002/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: loginData.toString()
    });

    console.log('📊 Login Status:', loginResponse.status);
    console.log('📋 Login Headers:', Object.fromEntries(loginResponse.headers.entries()));
    
    const loginText = await loginResponse.text();
    console.log('📝 Login Response:', loginText);
    
  } catch (error) {
    console.error('💥 Error:', error.message);
  }
}

async function runTests() {
  console.log('🚀 Iniciando tests de flujo completo...\n');
  
  await testCompleteLoginFlow();
  await testDirectAPI();
  
  console.log('\n🏁 Tests completados');
}

runTests(); 