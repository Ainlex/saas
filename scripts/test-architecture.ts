async function testCompleteArchitecture() {
  console.log('🏗️ Testing ContaFácil Complete Architecture...\n');

  const fs = require('fs');
  
  const checks = [
    {
      name: 'Monorepo Structure',
      check: () => {
        return fs.existsSync('apps/client') && 
               fs.existsSync('apps/admin') && 
               fs.existsSync('apps/api') &&
               fs.existsSync('packages/ui') &&
               fs.existsSync('packages/auth') &&
               fs.existsSync('packages/database');
      }
    },
    {
      name: 'Package Dependencies',
      check: () => {
        try {
          const clientPkg = require('../apps/client/package.json');
          const adminPkg = require('../apps/admin/package.json');
          const apiPkg = require('../apps/api/package.json');
          
          return clientPkg.dependencies['@contafacil/ui'] &&
                 adminPkg.dependencies['@contafacil/ui'] &&
                 apiPkg.dependencies['@contafacil/database'];
        } catch {
          return false;
        }
      }
    },
    {
      name: 'Environment Files',
      check: () => {
        return fs.existsSync('.env') || fs.existsSync('.env.local');
      }
    }
  ];

  for (const check of checks) {
    try {
      const result = check.check();
      console.log(`${result ? '✅' : '❌'} ${check.name}`);
    } catch (error) {
      console.log(`❌ ${check.name}: Error checking`);
    }
  }

  console.log('\n🎯 Architecture testing completed!');
}

testCompleteArchitecture(); 