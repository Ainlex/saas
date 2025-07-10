'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@contafacil/ui'
import { useAuth } from '../../hooks/useAuth'

export default function UnauthorizedPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const module = searchParams.get('module')
  const { user } = useAuth()

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  const handleContactAdmin = () => {
    const subject = `Solicitud acceso módulo ${module}`
    const body = `Hola,\n\nSolicito acceso al módulo ${module} para mi empresa.\n\nUsuario: ${user?.email}\nEmpresa: ${user?.empresaId}\n\nGracias.`
    window.location.href = `mailto:admin@contafacil.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Icono */}
        <div className="bg-red-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl">🚫</span>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Acceso No Autorizado
        </h1>

        {/* Mensaje específico */}
        {module ? (
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              No tienes acceso al módulo <strong>{module}</strong>.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <h3 className="font-semibold text-blue-800 mb-2">
                ¿Por qué veo este mensaje?
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• El módulo {module} no está activado para tu empresa</li>
                <li>• Tu plan actual no incluye este módulo</li>
                <li>• Necesitas permisos adicionales</li>
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 mb-6">
            No tienes permisos para acceder a esta página.
          </p>
        )}

        {/* Acciones */}
        <div className="space-y-3">
          <Button
            onClick={handleBackToDashboard}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Volver al Dashboard
          </Button>

          {module && (
            <Button
              onClick={handleContactAdmin}
              variant="secondary"
              className="w-full"
            >
              Solicitar Acceso a {module}
            </Button>
          )}
        </div>

        {/* Contacto */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            ¿Necesitas ayuda?
          </p>
          <p className="text-sm font-medium text-gray-800">
            admin@contafacil.com
          </p>
          <p className="text-sm text-gray-600">
            +595 21 123 4567
          </p>
        </div>
      </div>
    </div>
  )
} 