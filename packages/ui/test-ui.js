console.log('Testing UI package...')

// Test 1: Package structure
const fs = require('fs')
const path = require('path')

const requiredFiles = [
  'src/components/common/Button.tsx',
  'src/components/layouts/AppLayout.tsx',
  'src/hooks/useModules.ts',
  'src/hooks/useAuth.ts',
  'src/index.ts',
  'package.json',
  'tailwind.config.js'
]

let allFilesExist = true
requiredFiles.forEach(file => {
  if (!fs.existsSync(path.join(__dirname, file))) {
    console.log(`❌ Missing file: ${file}`)
    allFilesExist = false
  }
})

if (allFilesExist) {
  console.log('✅ All required files exist')
}

// Test 2: Imports validation
try {
  const packageJson = require('./package.json')
  
  const requiredDeps = [
    '@contafacil/auth',
    '@contafacil/database',
    'next-auth',
    '@heroicons/react',
    'tailwindcss',
    'clsx'
  ]
  
  let allDepsExist = true
  requiredDeps.forEach(dep => {
    if (!packageJson.dependencies[dep] && !packageJson.devDependencies[dep]) {
      console.log(`❌ Missing dependency: ${dep}`)
      allDepsExist = false
    }
  })
  
  if (allDepsExist) {
    console.log('✅ All dependencies configured')
  }
} catch (e) {
  console.log('❌ Package.json validation failed:', e.message)
}

// Test 3: TypeScript compilation check
const { execSync } = require('child_process')
try {
  // Usar el tsconfig.json específico del package
  execSync('npx tsc --noEmit --project tsconfig.json', { 
    cwd: __dirname, 
    stdio: 'pipe',
    encoding: 'utf8'
  })
  console.log('✅ TypeScript compilation successful')
} catch (e) {
  console.log('❌ TypeScript compilation failed')
  console.log('Error details:', e.message)
}

console.log('UI package validation complete') 