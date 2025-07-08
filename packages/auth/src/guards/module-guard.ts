import { prisma } from '@contafacil/database'

export type ModuloNombre = 'contabilidad' | 'facturacion' | 'pos' | 'inventario' | 'crm' | 'reportes';

export interface ModuleAccessResult {
  hasAccess: boolean;
  module?: any;
  error?: string;
}

export class ModuleGuard {
  static async checkModuleAccess(
    empresaId: string,
    moduloNombre: ModuloNombre,
    throwError: boolean = true
  ): Promise<boolean> {
    const empresaModulo = await prisma.empresaModulo.findFirst({
      where: {
        empresaId,
        activo: true,
        modulo: {
          nombre: moduloNombre,
          activo: true
        }
      },
      include: {
        modulo: true
      }
    })

    const hasAccess = !!empresaModulo

    if (!hasAccess && throwError) {
      throw new Error(`Módulo ${moduloNombre} no disponible para esta empresa`)
    }

    return hasAccess
  }

  static async getActiveModules(empresaId: string): Promise<string[]> {
    const empresaModulos = await prisma.empresaModulo.findMany({
      where: {
        empresaId,
        activo: true,
        modulo: {
          activo: true
        }
      },
      include: {
        modulo: true
      }
    })

    return empresaModulos.map((em: any) => em.modulo.nombre)
  }

  static async checkModuleDependencies(
    empresaId: string,
    moduloNombre: ModuloNombre
  ): Promise<{ valid: boolean; missing: string[] }> {
    const modulo = await prisma.modulo.findFirst({
      where: { nombre: moduloNombre },
      include: {
        dependeDe: {
          include: {
            dependeDe: true
          }
        }
      }
    })

    if (!modulo) {
      return { valid: false, missing: [] }
    }

    const activeModules = await this.getActiveModules(empresaId)
    const missing: string[] = []

    for (const dep of modulo.dependeDe) {
      if (dep.requerido && !activeModules.includes(dep.dependeDe.nombre)) {
        missing.push(dep.dependeDe.displayName)
      }
    }

    return { valid: missing.length === 0, missing }
  }
} 