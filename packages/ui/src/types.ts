// Common component props
export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
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