export type ModuloNombre = 
  | 'contabilidad'
  | 'facturacion' 
  | 'pos'
  | 'inventario'
  | 'crm'
  | 'reportes'

export interface ModuleConfig {
  name: ModuloNombre
  version: string
  dependencies: ModuloNombre[]
  capabilities: string[]
  eventTypes: string[]
}

export interface ModuleContext {
  empresaId: string
  userId: string
  permissions: string[]
  config: Record<string, any>
}

export interface ModuleActionResult {
  success: boolean
  data?: any
  error?: string
  events?: Array<Omit<import('./events').BaseModuleEvent, 'id' | 'timestamp'>>
}

export interface BaseModuleInterface {
  config: ModuleConfig
  init(context: ModuleContext): Promise<void>
  destroy(): Promise<void>
  executeAction(action: string, params: any, context: ModuleContext): Promise<ModuleActionResult>
  handleEvent(event: import('./events').BaseModuleEvent): Promise<void>
} 