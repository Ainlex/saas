import React from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface ModuleNotAvailableProps {
  moduleName: string
  message?: string
}

export function ModuleNotAvailable({ 
  moduleName, 
  message = "Este módulo no está disponible en tu plan actual." 
}: ModuleNotAvailableProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-warning-500" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Módulo {moduleName} no disponible
        </h3>
        <p className="mt-1 text-sm text-gray-500">{message}</p>
        <div className="mt-6">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  )
} 