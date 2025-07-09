import { ModuleEventBus } from './module-events'
import { 
  BaseModuleInterface, 
  ModuleConfig, 
  ModuleContext, 
  ModuleActionResult,
  ModuloNombre 
} from '../types/modules'
import { BaseModuleEvent } from '../types/events'

export abstract class BaseModule implements BaseModuleInterface {
  public abstract config: ModuleConfig
  protected eventBus: ModuleEventBus
  protected context?: ModuleContext
  protected isInitialized: boolean = false

  constructor() {
    this.eventBus = ModuleEventBus.getInstance()
  }

  /**
   * Inicializar módulo con contexto
   */
  async init(context: ModuleContext): Promise<void> {
    this.context = context
    
    // Validar que el módulo puede ejecutarse en esta empresa
    await this.validateAccess(context)
    
    // Registrar listeners de eventos
    await this.registerEventListeners()
    
    // Ejecutar inicialización específica del módulo
    await this.onInit(context)
    
    this.isInitialized = true
    
    console.log(`✅ Module ${this.config.name} initialized for empresa ${context.empresaId}`)
  }

  /**
   * Destruir módulo y limpiar recursos
   */
  async destroy(): Promise<void> {
    if (!this.isInitialized) return

    // Cleanup específico del módulo
    await this.onDestroy()
    
    // Desregistrar event listeners
    this.unregisterEventListeners()
    
    this.isInitialized = false
    this.context = undefined
    
    console.log(`🗑️ Module ${this.config.name} destroyed`)
  }

  /**
   * Ejecutar acción del módulo
   */
  async executeAction(action: string, params: any, context?: ModuleContext): Promise<ModuleActionResult> {
    const ctx = context || this.context
    if (!ctx) {
      return {
        success: false,
        error: 'Module not initialized or no context provided'
      }
    }

    try {
      // Validar que la acción existe
      if (!await this.validateAction(action, params, ctx)) {
        return {
          success: false,
          error: `Action ${action} not valid for module ${this.config.name}`
        }
      }

      // Ejecutar acción específica
      const result = await this.onExecuteAction(action, params, ctx)
      
      // Emitir eventos si se generaron
      if (result.events) {
        result.events.forEach(event => {
          this.eventBus.emit({
            ...event,
            source: this.config.name,
            empresaId: ctx.empresaId,
            userId: ctx.userId
          })
        })
      }

      return result
      
    } catch (error) {
      console.error(`❌ Error executing action ${action} in module ${this.config.name}:`, error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Manejar evento recibido
   */
  async handleEvent(event: BaseModuleEvent): Promise<void> {
    if (!this.isInitialized || !this.context) {
      console.warn(`Module ${this.config.name} received event but is not initialized`)
      return
    }

    // Solo procesar eventos de la misma empresa
    if (event.empresaId !== this.context.empresaId) {
      return
    }

    try {
      await this.onHandleEvent(event)
    } catch (error) {
      console.error(`❌ Error handling event ${event.type} in module ${this.config.name}:`, error)
    }
  }

  /**
   * Emitir evento desde este módulo
   */
  protected emitEvent(event: Omit<BaseModuleEvent, 'id' | 'timestamp' | 'source' | 'empresaId' | 'userId'>): string {
    if (!this.context) {
      throw new Error('Cannot emit event: module not initialized')
    }

    return this.eventBus.emit({
      ...event,
      source: this.config.name,
      empresaId: this.context.empresaId,
      userId: this.context.userId
    })
  }

  /**
   * Verificar si el módulo está inicializado
   */
  protected requireInitialized(): void {
    if (!this.isInitialized || !this.context) {
      throw new Error(`Module ${this.config.name} is not initialized`)
    }
  }

  // Métodos abstractos que deben implementar los módulos específicos
  protected abstract onInit(context: ModuleContext): Promise<void>
  protected abstract onDestroy(): Promise<void>
  protected abstract onExecuteAction(action: string, params: any, context: ModuleContext): Promise<ModuleActionResult>
  protected abstract onHandleEvent(event: BaseModuleEvent): Promise<void>
  protected abstract validateAction(action: string, params: any, context: ModuleContext): Promise<boolean>

  // Métodos opcionales
  protected async validateAccess(context: ModuleContext): Promise<void> {
    // Implementación base: verificar que el usuario tiene acceso al módulo
    // Los módulos específicos pueden sobrescribir este método
  }

  protected async registerEventListeners(): Promise<void> {
    // Los módulos específicos deben sobrescribir este método
    // para registrar sus listeners específicos
  }

  protected unregisterEventListeners(): void {
    // Cleanup básico - los módulos específicos pueden sobrescribir
  }
} 