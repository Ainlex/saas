console.log('Testing UI migration from Clerk to NextAuth...')

// Test imports
try {
  const { useAuth, LoadingSpinner, cn } = require('./src/index')
  console.log('✅ All imports working')
} catch (e) {
  console.log('❌ Import failed:', e.message)
}

// Test no Clerk references
const fs = require('fs')
const path = require('path')

function checkClerkReferences(dir) {
  const files = fs.readdirSync(dir)
  let hasClerkRefs = false
  
  files.forEach(file => {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      if (checkClerkReferences(fullPath)) hasClerkRefs = true
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8')
      if (content.includes('@clerk/nextjs') || content.includes('useUser')) {
        console.log(`❌ Clerk reference found in: ${fullPath}`)
        hasClerkRefs = true
      }
    }
  })
  
  return hasClerkRefs
}

if (!checkClerkReferences('./src')) {
  console.log('✅ No Clerk references found')
} else {
  console.log('❌ Clerk references still exist')
}

console.log('Migration test complete') 