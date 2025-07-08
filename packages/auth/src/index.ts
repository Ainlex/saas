// Guards
export { ModuleGuard } from './guards/module-guard'
export type { ModuloNombre, ModuleAccessResult } from './guards/module-guard'

// Middleware  
export { getCurrentUser } from './middleware/auth-middleware'
export { moduleMiddleware } from './middleware/module-middleware'
export type { UserWithEmpresa } from './middleware/auth-middleware'

// Config
export { authOptions } from './config/auth-config' 