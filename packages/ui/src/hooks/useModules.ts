import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'

interface Modulo {
  id: string
  nombre: string
  slug: string
  activo: boolean
}

export function useModules() {
  const { user, isAuthenticated } = useAuth()
  const [modulosActivos, setModulosActivos] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      fetchModulosActivos()
    } else {
      setLoading(false)
    }
  }, [isAuthenticated])

  const fetchModulosActivos = async () => {
    try {
      const response = await fetch('/api/modulos/active')
      if (response.ok) {
        const data = await response.json()
        const slugs = (data.modulos || []).map((m: Modulo) => m.slug)
        setModulosActivos(slugs)
      }
    } catch (error) {
      console.error('Error cargando módulos:', error)
    } finally {
      setLoading(false)
    }
  }

  const hasModule = (moduleName: string) => {
    return modulosActivos.includes(moduleName)
  }

  return { 
    hasModule, 
    modulosActivos, 
    loading 
  }
} 