async function checkIntegration() {
  console.log('🔍 Checking ContaFácil Client Integration...\n');

  // Check 1: Package dependencies
  try {
    const packageJson = require('../package.json');
    const requiredDeps = ['@contafacil/ui', '@contafacil/auth', 'next-auth'];
    
    const missingDeps = requiredDeps.filter(dep => 
      !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]
    );
    
    if (missingDeps.length === 0) {
      console.log('✅ All required dependencies installed');
    } else {
      console.log('❌ Missing dependencies:', missingDeps);
    }
  } catch (error) {
    console.log('❌ Error checking dependencies');
  }

  // Check 2: Environment variables
  const requiredEnvs = ['NEXTAUTH_URL', 'NEXTAUTH_SECRET', 'API_URL'];
  const missingEnvs = requiredEnvs.filter(env => !process.env[env]);
  
  if (missingEnvs.length === 0) {
    console.log('✅ All environment variables configured');
  } else {
    console.log('❌ Missing environment variables:', missingEnvs);
  }

  // Check 3: File structure
  const fs = require('fs');
  const requiredFiles = [
    'src/app/layout.tsx',
    'src/app/login/page.tsx',
    'src/app/(dashboard)/layout.tsx',
    'src/app/(dashboard)/dashboard/page.tsx',
    'src/middleware.ts'
  ];
  
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
  
  if (missingFiles.length === 0) {
    console.log('✅ All required files present');
  } else {
    console.log('❌ Missing files:', missingFiles);
  }

  console.log('\n🎯 Integration check completed!');
}

checkIntegration(); 