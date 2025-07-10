// Script para verificar que las páginas de auth funcionan
async function testAuthPages() {
  console.log('🧪 Testing Páginas de Autenticación...')
  
  const baseUrl = 'http://localhost:3000'
  
  // Test 1: Página login carga
  console.log('1. Verificando página login...')
  try {
    const response = await fetch(`${baseUrl}/login`)
    console.log('✅ Login page:', response.status === 200 ? 'OK' : 'FAIL')
  } catch (error) {
    console.log('❌ Login page: ERROR')
  }
  
  // Test 2: Página unauthorized carga
  console.log('2. Verificando página unauthorized...')
  try {
    const response = await fetch(`${baseUrl}/unauthorized`)
    console.log('✅ Unauthorized page:', response.status === 200 ? 'OK' : 'FAIL')
  } catch (error) {
    console.log('❌ Unauthorized page: ERROR')
  }
  
  // Test 3: Página error carga
  console.log('3. Verificando página error...')
  try {
    const response = await fetch(`${baseUrl}/error`)
    console.log('✅ Error page:', response.status === 200 ? 'OK' : 'FAIL')
  } catch (error) {
    console.log('❌ Error page: ERROR')
  }
  
  // Test 4: Reset password carga
  console.log('4. Verificando reset password...')
  try {
    const response = await fetch(`${baseUrl}/reset-password`)
    console.log('✅ Reset password page:', response.status === 200 ? 'OK' : 'FAIL')
  } catch (error) {
    console.log('❌ Reset password page: ERROR')
  }
  
  // Test 5: API reset password
  console.log('5. Verificando API reset password...')
  try {
    const response = await fetch(`http://localhost:3002/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' })
    })
    console.log('✅ Reset password API:', response.status === 200 ? 'OK' : 'FAIL')
  } catch (error) {
    console.log('❌ Reset password API: ERROR')
  }
  
  console.log('🎉 Testing de autenticación completado')
}

testAuthPages().catch(console.error) 