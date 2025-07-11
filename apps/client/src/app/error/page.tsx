'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button, LoadingSpinner } from '@contafacil/ui'
import { useState } from 'react'

function ErrorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [reportSent, setReportSent] = useState(false)
  
  const errorCode = searchParams.get('code') || 'UNKNOWN'
  const errorMessage = searchParams.get('message') || 'Error desconocido'
  const errorStack = searchParams.get('stack')

  const handleGoHome = () => {
    router.push('/dashboard')
  }

  const handleReportError = async () => {
    try {
      const errorReport = {
        code: errorCode,
        message: errorMessage,
        stack: errorStack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      }

      // Enviar reporte (implementar endpoint si necesario)
      console.log('Error Report:', errorReport)
      
      // Por ahora, abrir email
      const subject = `Error en ContaFácil - ${errorCode}`
      const body = `Se produjo un error:\n\nCódigo: ${errorCode}\nMensaje: ${errorMessage}\nURL: ${window.location.href}\nFecha: ${new Date().toLocaleString()}`
      
      window.location.href = `mailto:soporte@contafacil.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setReportSent(true)
    } catch (error) {
      console.error('Error enviando reporte:', error)
    }
  }

  const getErrorDescription = (code: string) => {
    const descriptions: Record<string, string> = {
      'AUTH_ERROR': 'Error de autenticación. Tu sesión puede haber expirado.',
      'MODULE_ERROR': 'Error en el módulo. El servicio no está disponible temporalmente.',
      'DATABASE_ERROR': 'Error de base de datos. Intenta nuevamente en unos minutos.',
      'NETWORK_ERROR': 'Error de conexión. Verifica tu conexión a internet.',
      'PERMISSION_ERROR': 'Error de permisos. No tienes acceso a esta funcionalidad.',
      'UNKNOWN': 'Error inesperado del sistema.'
    }
    return descriptions[code] || descriptions['UNKNOWN']
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Icono de error */}
        <div className="text-center mb-8">
          <div className="bg-red-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">⚠️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Ops! Algo salió mal
          </h1>
          <p className="text-gray-600">
            Se produjo un error inesperado en el sistema
          </p>
        </div>

        {/* Información del error */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              Información del Error
            </h3>
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <p className="text-sm"><strong>Código:</strong> {errorCode}</p>
              <p className="text-sm mt-1">
                <strong>Descripción:</strong> {getErrorDescription(errorCode)}
              </p>
            </div>
          </div>

          {errorMessage !== 'Error desconocido' && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-1">Mensaje Técnico:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded font-mono">
                {errorMessage}
              </p>
            </div>
          )}

          {process.env.NODE_ENV === 'development' && errorStack && (
            <details className="mb-4">
              <summary className="cursor-pointer font-medium text-gray-700 mb-1">
                Stack Trace (Desarrollo)
              </summary>
              <pre className="text-xs text-gray-600 bg-gray-50 p-2 rounded overflow-auto">
                {errorStack}
              </pre>
            </details>
          )}
        </div>

        {/* Acciones */}
        <div className="space-y-3">
          <Button
            onClick={handleGoHome}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Volver al Inicio
          </Button>

          <Button
            onClick={handleReportError}
            variant="secondary"
            className="w-full"
            disabled={reportSent}
          >
            {reportSent ? 'Reporte Enviado ✓' : 'Reportar Problema'}
          </Button>

          <Button
            onClick={() => window.location.reload()}
            variant="secondary"
            className="w-full"
          >
            Recargar Página
          </Button>
        </div>

        {/* Info de contacto */}
        <div className="mt-8 text-center p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            Si el problema persiste, contacta a soporte:
          </p>
          <p className="text-sm font-medium text-gray-800">
            soporte@contafacil.com
          </p>
          <p className="text-sm text-gray-600">
            +595 21 123 4567
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <ErrorContent />
    </Suspense>
  )
} 