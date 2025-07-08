"use client";
import { useEffect, useState } from 'react'
import { ModuleInfo } from '@contafacil/database'

interface UseModulesOptions {
  empresaId?: string
  enabled?: boolean
}

export function useModules(options: UseModulesOptions = {}) {
  const { empresaId, enabled = true } = options
  const [modules, setModules] = useState<ModuleInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (enabled && empresaId) {
      fetchActiveModules()
    } else {
      setLoading(false)
    }
  }, [empresaId, enabled])

  const fetchActiveModules = async () => {
    try {
      const response = await fetch('/api/modulos/active', {
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch modules')
      }
      
      const data = await response.json() as ModuleInfo[]
      setModules(data)
    } catch (error) {
      console.error('Error fetching modules:', error)
      setModules([])
    } finally {
      setLoading(false)
    }
  }

  const hasModule = (moduleName: string): boolean => {
    return modules.some(m => m.nombre === moduleName && m.activo)
  }

  const getModuleRoutes = (moduleName: string): string[] => {
    const module = modules.find(m => m.nombre === moduleName)
    return module?.rutas || []
  }

  return {
    modules,
    loading,
    hasModule,
    getModuleRoutes,
    refetch: fetchActiveModules
  }
}

// Re-export for compatibility
export type { ModuleInfo } from '@contafacil/database' 