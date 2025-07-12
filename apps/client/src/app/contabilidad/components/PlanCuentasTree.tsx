'use client'
import { useState, useEffect, useRef } from 'react'
import { LoadingSpinner, Button } from '@contafacil/ui'

interface Cuenta {
  id: string
  codigo: string
  nombre: string
  descripcion?: string
  tipo: 'ACTIVO' | 'PASIVO' | 'PATRIMONIO' | 'INGRESO' | 'GASTO'
  nivel: number
  esMovimiento: boolean
  cuentasHijas?: Cuenta[]
}

export default function PlanCuentasTree() {
  const [cuentas, setCuentas] = useState<Cuenta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandidas, setExpandidas] = useState<Set<string>>(new Set())
  const [filtro, setFiltro] = useState('')
  const [expandidasAutomaticas, setExpandidasAutomaticas] = useState<Set<string>>(new Set())

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    cargarCuentas()
  }, [])



  // Auto-expandir cuentas que contienen resultados
  useEffect(() => {
    if (filtro.trim() && cuentas.length > 0) {
      const nuevasExpandidas = new Set(expandidas)
      const nuevasAutomaticas = new Set<string>()
      
      // Función recursiva para encontrar cuentas que coinciden
      const expandirCuentasConCoincidencias = (cuentasArray: Cuenta[]) => {
        cuentasArray.forEach(cuenta => {
          // Verificar si esta cuenta o algún descendiente coincide
          const cuentaCoincide = cuenta.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
                                cuenta.nombre.toLowerCase().includes(filtro.toLowerCase())
          
          // Verificar hijos recursivamente
          let tieneDescendienteQueCoincide = false
          if (cuenta.cuentasHijas && cuenta.cuentasHijas.length > 0) {
            cuenta.cuentasHijas.forEach(hijo => {
              const hijoCoincide = hijo.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
                                 hijo.nombre.toLowerCase().includes(filtro.toLowerCase())
              
              if (hijoCoincide) {
                tieneDescendienteQueCoincide = true
              }
              
              // Continuar recursivamente
              expandirCuentasConCoincidencias([hijo])
            })
          }
          
          // Si esta cuenta tiene descendientes que coinciden, expandirla
          if (tieneDescendienteQueCoincide || cuentaCoincide) {
            nuevasExpandidas.add(cuenta.id)
            nuevasAutomaticas.add(cuenta.id)
          }
        })
      }
      
      expandirCuentasConCoincidencias(cuentas)
      
      setExpandidas(nuevasExpandidas)
      setExpandidasAutomaticas(nuevasAutomaticas)
    } else if (!filtro.trim()) {
      // Limpiar expansiones automáticas cuando no hay filtro
      const soloManuales = new Set([...expandidas].filter(id => !expandidasAutomaticas.has(id)))
      setExpandidas(soloManuales)
      setExpandidasAutomaticas(new Set())
    }
  }, [filtro, cuentas])

  // Función para filtrar manteniendo jerarquía
  const filtrarCuentasConJerarquia = (cuentas: Cuenta[], filtro: string): Cuenta[] => {
    return cuentas.map(cuenta => {
      const cuentaCoincide = cuenta.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
                            cuenta.nombre.toLowerCase().includes(filtro.toLowerCase())
      
      const hijosFiltrados = cuenta.cuentasHijas ? 
        filtrarCuentasConJerarquia(cuenta.cuentasHijas, filtro) : []
      
      if (cuentaCoincide || hijosFiltrados.length > 0) {
        return {
          ...cuenta,
          cuentasHijas: hijosFiltrados
        }
      }
      
      return null
    }).filter(Boolean) as Cuenta[]
  }

  const cargarCuentas = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/contabilidad/plan-cuentas')
      const data = await response.json()
      
      if (data.success) {
        // Guardar TODOS los datos originales sin filtrar
        const cuentasJerarquicas = organizarJerarquia(data.cuentas)
        setCuentas(cuentasJerarquicas)
        setError(null)
      } else {
        setError(data.error || 'Error cargando cuentas')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  const organizarJerarquia = (cuentasFlat: Cuenta[]): Cuenta[] => {
    // Crear mapa de cuentas por código para fácil búsqueda
    const cuentasPorCodigo = new Map<string, Cuenta & { cuentasHijas: Cuenta[] }>()
    
    // Primero, crear todas las cuentas con array de hijos vacío
    cuentasFlat.forEach(cuenta => {
      cuentasPorCodigo.set(cuenta.codigo, {
        ...cuenta,
        cuentasHijas: []
      })
    })
    
    // Segundo, construir la jerarquía
    const raices: Cuenta[] = []
    
    cuentasFlat.forEach(cuenta => {
      const cuentaConHijos = cuentasPorCodigo.get(cuenta.codigo)!
      
      if (cuenta.nivel === 1) {
        // Es cuenta de nivel 1 (raíz)
        raices.push(cuentaConHijos)
      } else {
        // Buscar el padre basado en el código
        // Ej: si cuenta es "1.1.01", padre es "1.1"
        const partescodigo = cuenta.codigo.split('.')
        const codigoPadre = partescodigo.slice(0, -1).join('.')
        const padre = cuentasPorCodigo.get(codigoPadre)
        
        if (padre) {
          padre.cuentasHijas.push(cuentaConHijos)
        }
      }
    })
    
    return raices
  }

  const toggleExpansion = (cuentaId: string) => {
    const nuevasExpandidas = new Set(expandidas)
    if (nuevasExpandidas.has(cuentaId)) {
      nuevasExpandidas.delete(cuentaId)
    } else {
      nuevasExpandidas.add(cuentaId)
    }
    setExpandidas(nuevasExpandidas)
  }

  const getIndentacion = (nivel: number): string => {
    switch (nivel) {
      case 0: return 'ml-0'
      case 1: return 'ml-4'
      case 2: return 'ml-8'
      case 3: return 'ml-12'
      case 4: return 'ml-16'
      default: return 'ml-20'
    }
  }

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text
    
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => {
      if (regex.test(part)) {
        return <mark key={index} className="bg-yellow-200 font-semibold">{part}</mark>
      }
      return part
    })
  }

  const CuentaItem = ({ cuenta, nivel = 0 }: { cuenta: Cuenta; nivel?: number }) => {
    const tieneHijos = cuenta.cuentasHijas && cuenta.cuentasHijas.length > 0
    const estaExpandida = expandidas.has(cuenta.id)
    const indentacion = getIndentacion(nivel)
    
    return (
      <div>
        <div 
          className={`flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${indentacion}`}
          onClick={() => tieneHijos && toggleExpansion(cuenta.id)}
        >
          <div className="flex items-center space-x-3 flex-1">
            {/* Indicador expansión */}
            {tieneHijos ? (
              <span className="text-gray-400 text-xs font-mono w-4">
                {estaExpandida ? '▼' : '▶'}
              </span>
            ) : (
              <span className="w-4"></span>
            )}
            
            {/* Código */}
            <span className="font-mono text-sm text-gray-600 min-w-[80px]">
              {highlightText(cuenta.codigo, filtro)}
            </span>
            
            {/* Nombre */}
            <span className="text-gray-900 font-medium">
              {highlightText(cuenta.nombre, filtro)}
            </span>
          </div>
          
          {/* Saldo */}
          <div className="text-right min-w-[120px]">
            <span className="text-gray-900 font-mono text-sm">
              $0.00
            </span>
          </div>
        </div>
        
        {/* Cuentas hijas */}
        {tieneHijos && estaExpandida && cuenta.cuentasHijas?.map(hijo => (
          <CuentaItem key={hijo.id} cuenta={hijo} nivel={nivel + 1} />
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <LoadingSpinner />
        <p className="text-gray-500 mt-4">Cargando plan de cuentas...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <Button onClick={cargarCuentas} className="bg-blue-600 text-white">
          Reintentar
        </Button>
      </div>
    )
  }

  if (cuentas.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <p className="text-lg font-medium">No hay plan de cuentas configurado</p>
          <p className="text-sm">El plan se cargará automáticamente al activar el módulo</p>
        </div>
        <Button 
          onClick={() => fetch('/api/contabilidad/cuentas/seed', { method: 'POST' }).then(cargarCuentas)}
          className="bg-green-600 text-white hover:bg-green-700"
        >
          Cargar Plan Paraguayo
        </Button>
      </div>
    )
  }

  // Agregar esta variable antes del return:
  const cuentasMostradas = filtro.trim() === '' 
    ? cuentas 
    : filtrarCuentasConJerarquia(cuentas, filtro)

  return (
    <div className="space-y-4">
      {/* Buscador */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar cuenta por código o nombre..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          style={{ outline: 'none' }}
          onBlur={(e) => {
            // Solo mantener focus si hay filtro y no se hizo click en el botón clear
            if (filtro.trim() && e.relatedTarget?.tagName !== 'BUTTON') {
              setTimeout(() => e.target.focus(), 5)
            }
          }}
        />
        {filtro && (
          <button
            onClick={() => setFiltro('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
      
      {/* Árbol de cuentas */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
          <div className="flex items-center space-x-3">
            <span className="w-4"></span>
            <span className="font-mono text-sm min-w-[80px]">CÓDIGO</span>
            <span>NOMBRE</span>
          </div>
          <div className="text-right min-w-[120px]">
            <span className="font-mono text-sm">SALDO</span>
          </div>
        </div>
        
        {/* Contenido */}
        {cuentasMostradas.map(cuenta => (
          <CuentaItem key={cuenta.id} cuenta={cuenta} />
        ))}
      </div>
    </div>
  )
} 