// UI package exports
export * from './components'
export * from './hooks'
export * from './utils/cn'
export * from './types'

// Components - Common
export { Button } from './components/common/Button'
export { Input } from './components/common/Input'
export { Modal } from './components/common/Modal'
export { LoadingSpinner } from './components/common/LoadingSpinner'

// Components - Forms
export { Form } from './components/forms/Form'
export { FormField } from './components/forms/FormField'

// Components - Layouts
export { AppLayout } from './components/layouts/AppLayout'
export { ModuleNavigation } from './components/layouts/ModuleNavigation'
export { Sidebar } from './components/layouts/Sidebar'

// Hooks
export { useModules } from './hooks/useModules'
export { useAuth } from './hooks/useAuth'

// Types (si existen)
export type { ModuleInfo } from './hooks/useModules' 