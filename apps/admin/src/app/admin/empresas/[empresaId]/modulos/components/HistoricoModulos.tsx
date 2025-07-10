'use client'

import { useState, useEffect } from 'react'

interface HistoricoModulosProps {
  empresaId: string
}

interface HistoricoItem {
  id: string
  modulo: {
    nombre: string
    displayName: string
  }
  accion: string
  usuario: {
    nombre: string
    email: string
  }
  razon?: string
  fechaCreacion: string
}

export function HistoricoModulos({ empresaId }: HistoricoModulosProps) {
  const [historico, setHistorico] = useState<HistoricoItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarHistorico()
  }, [empresaId])

  const cargarHistorico = async () => {
    try {
      const response = await fetch(`/api/admin/empresas/${empresaId}/modulos/historico`)
      const data = await response.json()
      setHistorico(data.historico || [])
    } catch (error) {
      console.error('Error cargando histórico:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleString('es-PY')
  }

  const getAccionColor = (accion: string) => {
    return accion === 'ACTIVADO' 
      ? 'text-green-600 bg-green-100' 
      : 'text-red-600 bg-red-100'
  }

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Histórico de Cambios</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-3">Histórico de Cambios</h2>
      
      {historico.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No hay cambios registrados</p>
        </div>
      ) : (
        <div className="space-y-3">
          {historico.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccionColor(item.accion)}`}>
                  {item.accion}
                </span>
                <div>
                  <p className="font-medium">{item.modulo.displayName}</p>
                  <p className="text-sm text-gray-600">
                    por {item.usuario.nombre} • {formatearFecha(item.fechaCreacion)}
                  </p>
                  {item.razon && (
                    <p className="text-xs text-gray-500">Razón: {item.razon}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 