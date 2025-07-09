import { z } from 'zod'
import { ModuloNombre } from '../types/modules'

// Schema para validar nombres de módulos
export const ModuloNombreSchema = z.enum([
  'contabilidad',
  'facturacion', 
  'pos',
  'inventario',
  'crm',
  'reportes'
])

// Schema para validar contexto de módulo
export const ModuleContextSchema = z.object({
  empresaId: z.string().min(1),
  userId: z.string().min(1),
  permissions: z.array(z.string()),
  config: z.record(z.any())
})

// Schema para validar configuración de módulo
export const ModuleConfigSchema = z.object({
  name: ModuloNombreSchema,
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  dependencies: z.array(ModuloNombreSchema),
  capabilities: z.array(z.string()),
  eventTypes: z.array(z.string())
})

// Utilidades de validación
export class ValidationUtils {
  static isValidModuleName(name: string): name is ModuloNombre {
    return ModuloNombreSchema.safeParse(name).success
  }

  static validateModuleContext(context: any): boolean {
    return ModuleContextSchema.safeParse(context).success
  }

  static validateModuleConfig(config: any): boolean {
    return ModuleConfigSchema.safeParse(config).success
  }

  static sanitizeEventData(data: any): any {
    // Remover propiedades sensibles o peligrosas
    if (typeof data === 'object' && data !== null) {
      const sanitized = { ...data }
      delete sanitized.password
      delete sanitized.token
      delete sanitized.secret
      return sanitized
    }
    return data
  }
} 