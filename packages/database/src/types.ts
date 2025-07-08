// Re-export tipos desde generated (donde Prisma los crea)
export type { 
  Empresa, 
  Usuario, 
  Modulo, 
  EmpresaModulo,
  ModuloDependencia,
  ModuloRuta,
  ModuloPermiso,
  Rol,
  RolPermiso,
  PlanType 
} from './generated'

// Import PlanType for internal use
import type { PlanType } from './generated'

// Types custom para la arquitectura
export type ModuloNombre = 
  | 'facturacion' 
  | 'pos' 
  | 'inventario' 
  | 'contabilidad' 
  | 'crm' 
  | 'reportes'

// Tipo mejorado para usuario con empresa y rol completos
export interface UserWithEmpresa {
  id: string;
  email: string;
  nombre: string;
  empresaId: string;
  rolId: string;
  empresa?: {
    id: string;
    nombre: string;
    ruc: string;
    plan: PlanType;
    activo: boolean;
  };
  rol?: {
    id: string;
    nombre: string;
    descripcion?: string;
    activo: boolean;
  };
}

export interface ModuleAccessResult {
  hasAccess: boolean;
  missingDependencies?: string[];
  reason?: string;
}

export interface ModuleInfo {
  nombre: string;
  displayName: string;
  activo: boolean;
  icono?: string;
  color?: string;
  rutas: string[];
}

export interface DatabaseConfig {
  url: string;
  log?: boolean;
}

export interface ModuleConfig {
  name: string;
  displayName: string;
  version: string;
  dependencies: string[];
  permissions: ModulePermission[];
  routes: ModuleRoute[];
}

export interface ModulePermission {
  name: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'execute';
}

export interface ModuleRoute {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  requiresAuth: boolean;
  permissions?: string[];
}

// Tipos para configuración de empresa
export interface EmpresaConfig {
  plan: 'STARTER' | 'PROFESIONAL' | 'EMPRESARIAL';
  modules: string[];
  settings: Record<string, any>;
}

// Tipos para roles y permisos
export interface UserRole {
  id: string;
  name: string;
  permissions: string[];
  isGlobal: boolean;
}

// Tipos para respuestas de API
export interface DatabaseResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 