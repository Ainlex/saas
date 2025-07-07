// Re-export tipos generados por Prisma
export * from './generated';

// Tipos custom para la aplicación
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
  plan: 'basic' | 'pro' | 'enterprise';
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