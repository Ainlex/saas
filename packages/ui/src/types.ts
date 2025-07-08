// Re-export types from hooks
export type { ModuleInfo } from './hooks/useModules'
export type { AuthUser } from './hooks/useAuth'

// Common component props
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// Module types
export type ModuleName = 
  | 'facturacion'
  | 'pos'
  | 'inventario'
  | 'contabilidad'
  | 'crm'
  | 'reportes'

// Theme types
export type ColorVariant = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'gray'

export type SizeVariant = 
  | 'sm'
  | 'default'
  | 'lg'
  | 'xl' 