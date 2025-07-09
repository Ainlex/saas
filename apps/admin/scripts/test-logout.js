const puppeteer = require('puppeteer');

async function testAdminLogout() {
  console.log('🧪 Probando logout del admin...');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });
  
  try {
    const page = await browser.newPage();
    
    // 1. Ir al login del admin
    console.log('📱 Navegando al login del admin...');
    await page.goto('http://localhost:3001/login');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 2. Hacer login
    console.log('🔑 Haciendo login...');
    await page.type('input[type="email"]', 'admin@contafacil.com');
    await page.type('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // 3. Esperar a que cargue el dashboard
    console.log('⏳ Esperando dashboard...');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 4. Verificar que estamos en el admin
    const currentUrl = page.url();
    console.log('📍 URL actual:', currentUrl);
    
    if (!currentUrl.includes('localhost:3001')) {
      throw new Error(`❌ URL incorrecta después del login: ${currentUrl}`);
    }
    
    // 5. Hacer logout - buscar el botón por texto
    console.log('🚪 Haciendo logout...');
    
    // Buscar todos los botones y encontrar el que contiene "Salir"
    const buttons = await page.$$('button');
    let logoutButton = null;
    
    for (const button of buttons) {
      const text = await button.evaluate(el => el.textContent);
      if (text && text.includes('Salir')) {
        logoutButton = button;
        break;
      }
    }
    
    if (logoutButton) {
      await logoutButton.click();
    } else {
      throw new Error('No se encontró el botón de logout');
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 6. Verificar redirección
    const finalUrl = page.url();
    console.log('📍 URL después del logout:', finalUrl);
    
    if (finalUrl.includes('localhost:3001/login')) {
      console.log('✅ Logout exitoso - Redirigido al login del admin');
    } else if (finalUrl.includes('localhost:3000/login')) {
      console.log('❌ ERROR: Logout redirigió al cliente en lugar del admin');
    } else {
      console.log('⚠️ URL inesperada después del logout:', finalUrl);
    }
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
  } catch (error) {
    console.error('💥 Error en la prueba:', error.message);
  } finally {
    await browser.close();
  }
}

testAdminLogout(); 