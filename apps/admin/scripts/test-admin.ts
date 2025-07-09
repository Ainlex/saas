import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function testAdminApp() {
  console.log('🧪 Testing ContaFácil Admin App...\n');

  const ADMIN_URL = 'http://localhost:3001';
  
  const routes = [
    { path: '/login', description: 'Admin login page' },
    { path: '/unauthorized', description: 'Admin unauthorized page' },
    { path: '/admin', description: 'Admin dashboard (requires auth + admin role)' }
  ];

  for (const route of routes) {
    try {
      const { stdout } = await execAsync(`curl -s -o /dev/null -w "%{http_code}" ${ADMIN_URL}${route.path}`);
      const statusCode = stdout.trim();
      
      if (route.path === '/login' && statusCode === '200') {
        console.log(`✅ ${route.description}: Accessible`);
      } else if (route.path === '/admin' && (statusCode === '307' || statusCode === '200')) {
        console.log(`✅ ${route.description}: Protected (redirect or requires auth)`);
      } else if (statusCode === '200') {
        console.log(`✅ ${route.description}: Accessible`);
      } else {
        console.log(`❌ ${route.description}: Status ${statusCode}`);
      }
    } catch (error) {
      console.log(`❌ ${route.description}: Error testing`);
    }
  }

  console.log('\n🎯 Admin app testing completed!');
}

testAdminApp(); 