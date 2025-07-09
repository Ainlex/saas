async function testSystemIntegration() {
  console.log('🔍 Testing ContaFácil System Integration...\n');

  const endpoints = [
    { url: 'http://localhost:3000', name: 'Client App' },
    { url: 'http://localhost:3001', name: 'Admin App' },
    { url: 'http://localhost:3002/api/health', name: 'API Health' }
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint.url);
      if (response.ok) {
        console.log(`✅ ${endpoint.name}: Running`);
      } else {
        console.log(`❌ ${endpoint.name}: Status ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name}: Not accessible`);
    }
  }

  console.log('\n🎯 System integration test completed!');
}

testSystemIntegration(); 