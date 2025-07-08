import { useUser } from '@clerk/nextjs'
import { useModules } from '../../hooks/useModules'
import Link from 'next/link'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  module: string
}

// Iconos para los módulos
const DocumentIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
  </svg>
)

const CubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
)

const CalculatorIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
)

const UserGroupIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const navigationItems: NavigationItem[] = [
  { name: 'Facturación', href: '/facturacion', icon: DocumentIcon, module: 'facturacion' },
  { name: 'Punto de Venta', href: '/pos', icon: ShoppingCartIcon, module: 'pos' },
  { name: 'Inventario', href: '/inventario', icon: CubeIcon, module: 'inventario' },
  { name: 'Contabilidad', href: '/contabilidad', icon: CalculatorIcon, module: 'contabilidad' },
  { name: 'CRM', href: '/crm', icon: UserGroupIcon, module: 'crm' },
  { name: 'Reportes', href: '/reportes', icon: ChartBarIcon, module: 'reportes' }
]

export function ModuleNavigation() {
  const { user, isSignedIn } = useUser()
  const empresaId = user?.publicMetadata?.empresaId as string
  const { hasModule, loading } = useModules({ 
    empresaId, 
    enabled: isSignedIn 
  })

  if (loading) {
    return <div className="p-4 text-sm text-gray-500">Cargando módulos...</div>
  }

  return (
    <nav className="space-y-2">
      {navigationItems.map((item) => {
        if (!hasModule(item.module)) return null
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
} 