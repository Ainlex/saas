const https = require('https');
const http = require('http');

async function testEndpoint() {
  console.log('🧪 === TESTING ENDPOINT PLAN CUENTAS ===\n');
  
  const url = 'http://localhost:3000/api/contabilidad/plan-cuentas';
  
  console.log(`📡 Probando: ${url}`);
  console.log('⚠️  Nota: Este test requiere que estés logueado en el navegador');
  console.log('   o que tengas una sesión válida con cookies\n');
  
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      console.log(`📊 Status: ${res.statusCode} ${res.statusMessage}`);
      console.log(`📊 Headers:`, res.headers);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('\n📄 Response Body:');
        try {
          const jsonData = JSON.parse(data);
          console.log(JSON.stringify(jsonData, null, 2));
          
          if (jsonData.cuentas) {
            console.log(`\n📊 Total cuentas: ${jsonData.cuentas.length}`);
            console.log('📊 Códigos encontrados:');
            jsonData.cuentas.forEach(cuenta => {
              console.log(`  - ${cuenta.codigo}: ${cuenta.nombre} (nivel: ${cuenta.nivel})`);
            });
          }
        } catch (e) {
          console.log('❌ Error parsing JSON:', e.message);
          console.log('📄 Raw response:', data);
        }
        resolve();
      });
    });
    
    req.on('error', (err) => {
      console.error('❌ Error en request:', err.message);
      reject(err);
    });
    
    req.setTimeout(5000, () => {
      console.error('❌ Timeout - el servidor no responde');
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Ejecutar el test
testEndpoint()
  .then(() => {
    console.log('\n✅ Test completado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test falló:', error.message);
    process.exit(1);
  }); 