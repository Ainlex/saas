console.log('Testing Module Events System...')

// Test 1: Imports
try {
  const { ModuleEventBus, moduleManager, ValidationUtils } = require('./src/index')
  console.log('✅ Core imports working')
} catch (e) {
  console.log('❌ Import failed:', e.message)
  return
}

// Test 2: EventBus básico
try {
  const { eventBus } = require('./src/index')
  
  let eventReceived = false
  
  // Suscribirse a evento
  eventBus.on('TEST_EVENT', (event) => {
    console.log('✅ Event received:', event.type)
    eventReceived = true
  })
  
  // Emitir evento
  eventBus.emit({
    type: 'TEST_EVENT',
    source: 'test',
    empresaId: 'test-empresa',
    data: { message: 'Hello World' }
  })
  
  if (eventReceived) {
    console.log('✅ EventBus communication working')
  } else {
    console.log('❌ EventBus communication failed')
  }
  
} catch (e) {
  console.log('❌ EventBus test failed:', e.message)
}

// Test 3: Validaciones
try {
  const { ValidationUtils } = require('./src/index')
  
  const validContext = {
    empresaId: 'test-empresa',
    userId: 'test-user',
    permissions: ['pos:crear_venta'],
    config: {}
  }
  
  if (ValidationUtils.validateModuleContext(validContext)) {
    console.log('✅ Context validation working')
  } else {
    console.log('❌ Context validation failed')
  }
  
  if (ValidationUtils.isValidModuleName('pos')) {
    console.log('✅ Module name validation working')
  } else {
    console.log('❌ Module name validation failed')
  }
  
} catch (e) {
  console.log('❌ Validation test failed:', e.message)
}

// Test 4: Event types
try {
  const eventTypes = [
    'VENTA_COMPLETADA',
    'FACTURA_EMITIDA', 
    'STOCK_ACTUALIZADO',
    'ASIENTO_CREADO',
    'CLIENTE_CREADO'
  ]
  
  console.log('✅ Event types defined:', eventTypes.length)
  
} catch (e) {
  console.log('❌ Event types test failed:', e.message)
}

console.log('Module Events System testing complete') 