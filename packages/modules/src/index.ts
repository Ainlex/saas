// Core classes
export { ModuleEventBus, eventBus } from './core/module-events'
export { ModuleManager, moduleManager } from './core/module-manager'
export { BaseModule } from './core/base-module'

// Types
export * from './types'

// Utils
export { ValidationUtils } from './utils/validation'

// Re-export commonly used types
export type { 
  BaseModuleEvent,
  ModuleEvent,
  VentaCompletadaEvent,
  FacturaEmitidaEvent,
  StockActualizadoEvent,
  AsientoCreado,
  ClienteCreadoEvent
} from './types/events'

export type {
  ModuloNombre,
  ModuleConfig,
  ModuleContext,
  ModuleActionResult,
  BaseModuleInterface
} from './types/modules' 