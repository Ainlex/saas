// Shared package exports
// Re-export tipos desde database para evitar duplicados
export type {
  Empresa,
  Usuario, 
  Modulo,
  EmpresaModulo,
  ModuloNombre,
  UserWithEmpresa,
  ModuleInfo,
  ModuleAccessResult,
  DatabaseResponse
} from '@contafacil/database'

// Export utilidades y constantes locales
export * from './utils';
export * from './constants'; 