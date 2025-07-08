// import { ModuleGuard } from '@contafacil/auth'
import { ModuleGuard } from '@contafacil/auth'
import type { ModuloNombre } from '@contafacil/database'

export class ModuleManager {
  private static instance: ModuleManager
  private moduleRegistry: Map<string, any> = new Map()

  static getInstance(): ModuleManager {
    if (!ModuleManager.instance) {
      ModuleManager.instance = new ModuleManager()
    }
    return ModuleManager.instance
  }

  registerModule(name: string, module: any) {
    this.moduleRegistry.set(name, module)
  }

  async getModule(name: string, empresaId: string) {
    const hasAccess = await ModuleGuard.checkModuleAccess(empresaId, name as ModuloNombre)
    if (!hasAccess) {
      throw new Error(`Módulo ${name} no disponible`)
    }
    return this.moduleRegistry.get(name)
  }

  async executeModuleAction(
    moduleName: string,
    action: string,
    empresaId: string,
    params: any
  ) {
    const module = await this.getModule(moduleName, empresaId)
    if (!module || !module[action]) {
      throw new Error(`Acción ${action} no encontrada en módulo ${moduleName}`)
    }
    return module[action](params)
  }
} 