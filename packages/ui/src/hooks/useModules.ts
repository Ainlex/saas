"use client";
import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'

export interface ModuleInfo {
  id: string
  nombre: string
  displayName: string
  activo: boolean
  icono?: string
  color?: string
  rutas: ModuleRoute[]
}

export interface ModuleRoute {
  ruta: string
  nombre: string
  activo: boolean
}

export interface UseModulesOptions {
  empresaId?: string
  enabled?: boolean
}

export function useModules(options: UseModulesOptions = {}) {
  const auth = useAuth()
  const empresaId = options.empresaId ?? auth.empresaId
  const enabled = options.enabled !== undefined ? options.enabled : true
  const [modules, setModules] = useState<ModuleInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (enabled && empresaId) {
      fetchActiveModules()
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empresaId, enabled])

  const fetchActiveModules = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/modulos/active', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error(`Error fetching modules: ${response.statusText}`)
      }
      const data = await response.json()
      setModules(data.modules || data || [])
    } catch (error) {
      console.error('Error fetching modules:', error)
      setError(error instanceof Error ? error.message : 'Error desconocido')
      setModules([])
    } finally {
      setLoading(false)
    }
  }

  const hasModule = (moduleName: string): boolean => {
    return modules.some(m => m.nombre === moduleName && m.activo)
  }

  const getModule = (moduleName: string): ModuleInfo | null => {
    return modules.find(m => m.nombre === moduleName) || null
  }

  const getModuleRoutes = (moduleName: string): string[] => {
    const module = modules.find(m => m.nombre === moduleName)
    return module?.rutas.map(r => r.ruta) || []
  }

  return {
    modules,
    loading,
    error,
    hasModule,
    getModule,
    getModuleRoutes,
    refetch: fetchActiveModules
  }
} 