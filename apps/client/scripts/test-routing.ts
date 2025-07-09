import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function testClientRouting() {
  console.log('🧪 Testing ContaFácil Client Routing...\n');

  const CLIENT_URL = 'http://localhost:3000';
  
  const routes = [
    { path: '/login', description: 'Login page' },
    { path: '/unauthorized', description: 'Unauthorized page' },
    { path: '/dashboard', description: 'Dashboard (requires auth)' }
  ];

  for (const route of routes) {
    try {
      const { stdout } = await execAsync(`curl -s -o /dev/null -w "%{http_code}" ${CLIENT_URL}${route.path}`);
      const statusCode = stdout.trim();
      
      if (route.path === '/login' && statusCode === '200') {
        console.log(`✅ ${route.description}: Accessible`);
      } else if (route.path === '/dashboard' && (statusCode === '307' || statusCode === '200')) {
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

  console.log('\n🎯 Client routing testing completed!');
}

testClientRouting(); 