'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useModules, AppLayout, Card, Button, LoadingSpinner } from '@contafacil/ui'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const empresaId = session?.user?.empresaId as string
  const { modules, loading, hasModule } = useModules({ 
    empresaId, 
    enabled: status === 'authenticated' 
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/sign-in')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null // Será redirecteado por useEffect
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard ContaFácil</h1>
            <p className="text-gray-600 mt-2">Bienvenido a tu panel de control</p>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <div className="flex items-center">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <span className="text-2xl">🛒</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Punto de Venta</h3>
                  <p className="text-blue-100">{hasModule('pos') ? 'Activo' : 'Inactivo'}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
              <div className="flex items-center">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <span className="text-2xl">📦</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Inventario</h3>
                  <p className="text-green-100">{hasModule('inventario') ? 'Activo' : 'Inactivo'}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <div className="flex items-center">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <span className="text-2xl">📄</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Facturación</h3>
                  <p className="text-yellow-100">{hasModule('facturacion') ? 'Activo' : 'Inactivo'}</p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Módulos disponibles */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Módulos Activos</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : modules.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No hay módulos activos para esta empresa</p>
                <p className="text-sm text-gray-400 mt-2">Contacta al administrador para activar módulos</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map(module => (
                  <Card key={module.nombre} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-2xl">{module.icono || '📋'}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{module.displayName}</h3>
                        <p className="text-sm text-gray-500">Módulo {module.nombre}</p>
                        <div className="flex items-center mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Activo
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Información de empresa */}
          {empresaId && (
            <div className="mt-8 bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Información de Empresa</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Empresa ID</p>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">{empresaId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Usuario</p>
                  <p className="font-medium">{session?.user?.name}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
} 