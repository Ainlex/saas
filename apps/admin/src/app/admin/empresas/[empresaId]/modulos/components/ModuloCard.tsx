'use client'

import { useState } from 'react'
import { Switch } from '@contafacil/ui'

interface ModuloCardProps {
  modulo: {
    id: string
    nombre: string
    displayName: string
    descripcion: string
    icono: string
    activoEnEmpresa: boolean
    dependencias: string[]
  }
  onToggle: (id: string, activo: boolean) => void
  disabled: boolean
}

export function ModuloCard({ modulo, onToggle, disabled }: ModuloCardProps) {
  const [confirmando, setConfirmando] = useState(false)

  const handleToggle = () => {
    if (!modulo.activoEnEmpresa) {
      // Activar directamente
      onToggle(modulo.id, true)
    } else {
      // Confirmar desactivación
      setConfirmando(true)
    }
  }

  const confirmarDesactivacion = () => {
    onToggle(modulo.id, false)
    setConfirmando(false)
  }

  const iconos: Record<string, string> = {
    contabilidad: '📊',
    facturacion: '🧾',
    pos: '💳',
    inventario: '📦',
    crm: '👥',
    reportes: '📈'
  }

  return (
    <div className={`
      border rounded-lg p-4 transition-all
      ${modulo.activoEnEmpresa 
        ? 'border-green-300 bg-green-50' 
        : 'border-gray-200 bg-white'
      }
    `}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">
            {iconos[modulo.nombre] || '⚙️'}
          </span>
          <div>
            <h3 className="font-semibold">{modulo.displayName}</h3>
            <p className="text-sm text-gray-600">{modulo.descripcion}</p>
          </div>
        </div>
        
        <Switch
          checked={modulo.activoEnEmpresa}
          onChange={handleToggle}
          disabled={disabled}
        />
      </div>

      {modulo.dependencias && modulo.dependencias.length > 0 && (
        <div className="text-xs text-gray-500">
          Requiere: {modulo.dependencias.join(', ')}
        </div>
      )}

      {confirmando && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800 mb-2">
            ¿Desactivar {modulo.displayName}?
          </p>
          <div className="flex space-x-2">
            <button
              onClick={confirmarDesactivacion}
              className="px-3 py-1 bg-red-500 text-white text-xs rounded"
            >
              Confirmar
            </button>
            <button
              onClick={() => setConfirmando(false)}
              className="px-3 py-1 bg-gray-300 text-xs rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 