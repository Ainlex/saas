'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@contafacil/ui'
import { ModuloCard } from './components/ModuloCard'
import { HistoricoModulos } from './components/HistoricoModulos'


interface Modulo {
  id: string
  nombre: string
  displayName: string
  descripcion: string
  icono: string
  activoEnEmpresa: boolean
  dependencias: string[]
}

export default function GestionModulosPage() {
  const params = useParams()
  const empresaId = params.empresaId as string
  
  const [modulos, setModulos] = useState<Modulo[]>([])
  const [loading, setLoading] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cargar módulos
  useEffect(() => {
    cargarModulos()
  }, [empresaId])

  const cargarModulos = async () => {
    try {
      console.log('Cargando módulos para empresa:', empresaId)
      const response = await fetch(`/api/admin/empresas/${empresaId}/modulos`)
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response:', errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }
      
      const data = await response.json()
      console.log('Módulos cargados:', data)
      setModulos(data.modulos || [])
    } catch (error) {
      console.error('Error cargando módulos:', error)
      setError(error instanceof Error ? error.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const toggleModulo = async (moduloId: string, activo: boolean) => {
    setGuardando(true)
    try {
      const response = await fetch(`/api/admin/empresas/${empresaId}/modulos`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduloId, activo })
      })

      if (!response.ok) {
        const error = await response.json()
        alert(`Error: ${error.error}`)
        return
      }

      // Actualizar estado local
      setModulos(prev => prev.map(m => 
        m.id === moduloId ? { ...m, activoEnEmpresa: activo } : m
      ))

    } catch (error) {
      console.error('Error actualizando módulo:', error)
      alert('Error al actualizar módulo')
    } finally {
      setGuardando(false)
    }
  }



  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Gestión de Módulos</h1>
          <p className="text-gray-600">
            Activa o desactiva módulos para esta empresa
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando módulos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Gestión de Módulos</h1>
        <p className="text-gray-600">
          Activa o desactiva módulos para esta empresa
        </p>
      </div>



      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-red-400">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error cargando módulos
              </h3>
              <div className="mt-2 text-sm text-red-700">
                {error}
              </div>
              <div className="mt-4">
                <button
                  onClick={cargarModulos}
                  className="text-sm text-red-800 hover:text-red-900 underline"
                >
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid de Módulos */}
      {!error && (
        <>
          {modulos.length === 0 ? (
            <div className="mb-8 p-8 text-center bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🧩</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay módulos disponibles
              </h3>
              <p className="text-gray-600">
                No se encontraron módulos para esta empresa
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {modulos.map(modulo => (
                <ModuloCard
                  key={modulo.id}
                  modulo={modulo}
                  onToggle={toggleModulo}
                  disabled={guardando}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Histórico */}
      <HistoricoModulos empresaId={empresaId} />
    </div>
  )
} 