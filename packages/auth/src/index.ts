
// Types obligatorios
export type ModuloNombre = 
  | 'facturacion'
  | 'pos'
  | 'inventario'
  | 'contabilidad'
  | 'crm'
  | 'reportes'
  | 'admin'

export interface UserWithEmpresa {
  id: string
  email: string
  nombre: string
  apellido?: string
  empresaId: string
  rolId: string
  activo: boolean
  empresa: {
    id: string
    nombre: string
    ruc: string
    plan: 'STARTER' | 'PROFESIONAL' | 'EMPRESARIAL'
    activo: boolean
  }
  rol: {
    id: string
    nombre: string
    descripcion?: string
  }
}

export interface ModuleAccessResult {
  hasAccess: boolean
  missing?: string[]
  dependencies?: {
    valid: boolean
    missing: string[]
  }
}

// Exports de guards
export { ModuleGuard } from './guards/module-guard'

// Exports de middleware
export { getCurrentUser } from './middleware/auth-middleware'
export { moduleMiddleware } from './middleware/module-middleware'

// Exports de permissions
export { PermissionChecker } from './permissions/permission-checker'

// Exports de helpers para Clerk
export { 
  syncUserWithClerk, 
  updateUserEmpresa, 
  updateUserRol, 
  deactivateUser,
  type ClerkUserData 
} from './helpers/clerk-helpers' 