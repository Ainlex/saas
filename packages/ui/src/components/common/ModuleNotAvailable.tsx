import React from 'react'

interface ModuleNotAvailableProps {
  moduleName: string
}

export function ModuleNotAvailable({ moduleName }: ModuleNotAvailableProps) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🔒</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Módulo {moduleName} no disponible
      </h2>
      <p className="text-gray-600">
        Este módulo no está activo para tu empresa
      </p>
    </div>
  )
} 