// import { ModuleGuard } from '@contafacil/auth'
import { ModuleGuard } from '@contafacil/auth'
import { BaseModule } from './base-module'
import { ModuleEventBus } from './module-events'
import { ModuloNombre, ModuleContext, ModuleActionResult } from '../types/modules'
import { BaseModuleEvent } from '../types/events'

export class ModuleManager {
  private static instance: ModuleManager
  private moduleRegistry: Map<string, new () => BaseModule> = new Map()
  private activeModules: Map<string, BaseModule> = new Map() // key: empresaId:moduleName
  private eventBus: ModuleEventBus

  private constructor() {
    this.eventBus = ModuleEventBus.getInstance()
  }

  static getInstance(): ModuleManager {
    if (!ModuleManager.instance) {
      ModuleManager.instance = new ModuleManager()
    }
    return ModuleManager.instance
  }

  /**
   * Registrar una clase de módulo
   */
  registerModule(name: ModuloNombre, moduleClass: new () => BaseModule): void {
    this.moduleRegistry.set(name, moduleClass)
    console.log(`📦 Module ${name} registered`)
  }

  /**
   * Obtener instancia de módulo para una empresa
   */
  async getModule(name: ModuloNombre, context: ModuleContext): Promise<BaseModule> {
    const moduleKey = `${context.empresaId}:${name}`
    
    // Verificar acceso al módulo
    const hasAccess = await ModuleGuard.checkModuleAccess(context.empresaId, name, false)
    if (!hasAccess) {
      throw new Error(`Module ${name} not available for empresa ${context.empresaId}`)
    }

    // Si ya existe una instancia activa, devolverla
    if (this.activeModules.has(moduleKey)) {
      return this.activeModules.get(moduleKey)!
    }

    // Obtener clase del módulo
    const ModuleClass = this.moduleRegistry.get(name)
    if (!ModuleClass) {
      throw new Error(`Module ${name} not registered`)
    }

    // Crear e inicializar nueva instancia
    const moduleInstance = new ModuleClass()
    await moduleInstance.init(context)
    
    // Guardar instancia activa
    this.activeModules.set(moduleKey, moduleInstance)
    
    return moduleInstance
  }

  /**
   * Ejecutar acción en un módulo específico
   */
  async executeModuleAction(
    moduleName: ModuloNombre,
    action: string,
    context: ModuleContext,
    params: any = {}
  ): Promise<ModuleActionResult> {
    try {
      const module = await this.getModule(moduleName, context)
      return await module.executeAction(action, params, context)
    } catch (error) {
      console.error(`❌ Error executing action ${action} in module ${moduleName}:`, error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Obtener módulos activos para una empresa
   */
  async getActiveModules(empresaId: string): Promise<ModuloNombre[]> {
    return await ModuleGuard.getActiveModules(empresaId) as ModuloNombre[]
  }

  /**
   * Verificar dependencias de un módulo
   */
  async checkModuleDependencies(empresaId: string, moduleName: ModuloNombre): Promise<{ valid: boolean; missing: string[] }> {
    return await ModuleGuard.checkModuleDependencies(empresaId, moduleName)
  }

  /**
   * Destruir instancia de módulo
   */
  async destroyModule(empresaId: string, moduleName: ModuloNombre): Promise<void> {
    const moduleKey = `${empresaId}:${moduleName}`
    const module = this.activeModules.get(moduleKey)
    
    if (module) {
      await module.destroy()
      this.activeModules.delete(moduleKey)
      console.log(`🗑️ Module ${moduleName} destroyed for empresa ${empresaId}`)
    }
  }

  /**
   * Destruir todos los módulos de una empresa
   */
  async destroyCompanyModules(empresaId: string): Promise<void> {
    const moduleKeys = Array.from(this.activeModules.keys()).filter(key => key.startsWith(`${empresaId}:`))
    
    for (const key of moduleKeys) {
      const module = this.activeModules.get(key)
      if (module) {
        await module.destroy()
        this.activeModules.delete(key)
      }
    }
    
    console.log(`🗑️ All modules destroyed for empresa ${empresaId}`)
  }

  /**
   * Obtener estadísticas del manager
   */
  getStats(): {
    registeredModules: number
    activeModules: number
    modulesByCompany: Record<string, number>
  } {
    const modulesByCompany: Record<string, number> = {}
    
    for (const key of this.activeModules.keys()) {
      const empresaId = key.split(':')[0]
      modulesByCompany[empresaId] = (modulesByCompany[empresaId] || 0) + 1
    }

    return {
      registeredModules: this.moduleRegistry.size,
      activeModules: this.activeModules.size,
      modulesByCompany
    }
  }

  /**
   * Propagar evento a todos los módulos activos de una empresa
   */
  async propagateEventToModules(event: BaseModuleEvent): Promise<void> {
    const moduleKeys = Array.from(this.activeModules.keys())
      .filter(key => key.startsWith(`${event.empresaId}:`))
    
    const propagationPromises = moduleKeys.map(async key => {
      const module = this.activeModules.get(key)
      if (module) {
        try {
          await module.handleEvent(event)
        } catch (error) {
          console.error(`Error propagating event to module ${key}:`, error)
        }
      }
    })

    await Promise.all(propagationPromises)
  }

  /**
   * Cleanup completo del manager
   */
  async destroy(): Promise<void> {
    // Destruir todos los módulos activos
    const destroyPromises = Array.from(this.activeModules.values()).map(module => module.destroy())
    await Promise.all(destroyPromises)
    
    // Limpiar registros
    this.activeModules.clear()
    this.moduleRegistry.clear()
    
    console.log('🗑️ ModuleManager destroyed')
  }
}

// Export singleton instance
export const moduleManager = ModuleManager.getInstance() 