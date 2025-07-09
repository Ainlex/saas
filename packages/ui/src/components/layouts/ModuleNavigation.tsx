'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../../utils/cn'
import { useModules } from '../../hooks/useModules'
import { LoadingSpinner } from '../common/LoadingSpinner'
import {
  DocumentTextIcon,
  ShoppingCartIcon,
  CubeIcon,
  CalculatorIcon,
  UserGroupIcon,
  ChartBarIcon,
  HomeIcon
} from '@heroicons/react/24/outline'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  module: string
}

const navigationItems: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, module: 'dashboard' },
  { name: 'Facturación', href: '/facturacion', icon: DocumentTextIcon, module: 'facturacion' },
  { name: 'Punto de Venta', href: '/pos', icon: ShoppingCartIcon, module: 'pos' },
  { name: 'Inventario', href: '/inventario', icon: CubeIcon, module: 'inventario' },
  { name: 'Contabilidad', href: '/contabilidad', icon: CalculatorIcon, module: 'contabilidad' },
  { name: 'CRM', href: '/crm', icon: UserGroupIcon, module: 'crm' },
  { name: 'Reportes', href: '/reportes', icon: ChartBarIcon, module: 'reportes' }
]

export function ModuleNavigation() {
  const { hasModule, loading, error } = useModules()
  const pathname = usePathname()

  if (loading) {
    return (
      <nav className="p-4">
        <div className="flex items-center justify-center">
          <LoadingSpinner size="sm" />
          <span className="ml-2 text-sm text-gray-500">Cargando módulos...</span>
        </div>
      </nav>
    )
  }

  if (error) {
    return (
      <nav className="p-4">
        <div className="text-sm text-red-600">
          Error cargando módulos: {error}
        </div>
      </nav>
    )
  }

  return (
    <nav className="space-y-1 p-4">
      {navigationItems.map((item) => {
        // Dashboard siempre visible
        if (item.module === 'dashboard') {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
              {item.name}
            </Link>
          )
        }

        // Verificar acceso al módulo
        if (!hasModule(item.module)) {
          return null
        }

        const isActive = pathname.startsWith(item.href)

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
              isActive
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
} 