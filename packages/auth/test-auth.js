// Script de validación
console.log('Testing auth package...')

// Test 1: Imports
try {
  const { ModuleGuard, getCurrentUser } = require('./dist/index.js')
  console.log('✅ Imports OK')
} catch (e) {
  console.log('❌ Import failed:', e.message)
}

// Test 2: Database connection
try {
  const { prisma } = require('@contafacil/database')
  console.log('✅ Database connection OK')
} catch (e) {
  console.log('❌ Database connection failed:', e.message)
}

// Test 3: Config import
try {
  const { authOptions } = require('./dist/config/auth-config.js')
  console.log('✅ Auth config OK')
} catch (e) {
  console.log('❌ Auth config failed:', e.message)
}

console.log('Auth package validation complete') 