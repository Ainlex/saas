import { useState, useEffect, useMemo } from 'react'
import { LoadingSpinner } from '@contafacil/ui'

interface PlanCuentasTreeProps {
  filtros: any
  selectedCuenta: any
  onSelectCuenta: (cuenta: any) => void
  onCuentasLoaded?: (cuentas: any[]) => void
}

export function PlanCuentasTree({ filtros, selectedCuenta, onSelectCuenta, onCuentasLoaded }: PlanCuentasTreeProps) {
  const [loading, setLoading] = useState(true)
  const [cuentas, setCuentas] = useState([])
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  
  useEffect(() => {
    loadCuentas()
  }, [filtros])
  
  const loadCuentas = async () => {
    console.log('🔄 === DEBUG PLAN CUENTAS TREE ===')
    console.log('🔍 Filtros recibidos:', filtros)
    
    setLoading(true)
    const params = new URLSearchParams()
    
    if (filtros.tipoMayor) params.append('tipoMayor', filtros.tipoMayor)
    if (filtros.nivel) params.append('nivel', filtros.nivel)
    
    const url = `/api/contabilidad/plan-cuentas?${params}`
    console.log('📡 URL construida:', url)
    
    try {
      console.log('🚀 Haciendo request...')
      const response = await fetch(url)
      console.log('📊 Response status:', response.status)
      console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()))
      
      const data = await response.json()
      console.log('📄 Response data:', data)
      
      const cuentasData = data.cuentas || []
      console.log('📊 Cuentas procesadas:', cuentasData.length)
      console.log('📊 Códigos de cuentas:', cuentasData.map((c: any) => `${c.codigo} (nivel: ${c.nivel}, padre: ${c.codigoPadre})`))
      
      setCuentas(cuentasData)
      
      // Notificar al componente padre sobre las cuentas cargadas
      if (onCuentasLoaded) {
        onCuentasLoaded(cuentasData)
      }
      
      // Auto-expandir nivel 1
      const autoExpand: Record<string, boolean> = {}
      cuentasData.forEach((c: any) => {
        if (c.nivel <= 2) autoExpand[c.codigo] = true
      })
      setExpanded(autoExpand)
      
      console.log('✅ === FIN DEBUG ===')
    } catch (error) {
      console.error('❌ Error cargando cuentas:', error)
    } finally {
      setLoading(false)
    }
  }
  
  // Construir árbol jerárquico
  const treeData = useMemo(() => {
    const map: any = {}
    const roots: any = []
    
    // Filtrar por búsqueda
    const cuentasFiltradas = filtros.busqueda 
      ? cuentas.filter((c: any) => 
          c.codigo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
          c.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase())
        )
      : cuentas
    
    cuentasFiltradas.forEach((cuenta: any) => {
      map[cuenta.codigo] = { ...cuenta, children: [] }
    })
    
    Object.values(map).forEach((cuenta: any) => {
      if (cuenta.codigoPadre && map[cuenta.codigoPadre]) {
        map[cuenta.codigoPadre].children.push(cuenta)
      } else {
        roots.push(cuenta)
      }
    })
    
    // DEBUG LOGS
    console.log('Cuentas recibidas:', cuentasFiltradas)
    console.log('Mapa construido:', map)
    console.log('Raíces:', roots)
    
    return roots
  }, [cuentas, filtros.busqueda])
  
  const toggleExpand = (codigo: string) => {
    setExpanded(prev => ({ ...prev, [codigo]: !prev[codigo] }))
  }
  
  const renderCuenta = (cuenta: any, depth = 0) => {
    const isSelected = selectedCuenta?.id === cuenta.id
    const hasChildren = cuenta.children?.length > 0
    const isExpanded = expanded[cuenta.codigo]
    
    return (
      <div key={cuenta.id}>
        {/* Fila de la cuenta */}
        <div 
          className={`flex items-center py-2 px-3 cursor-pointer hover:bg-blue-50 border-b border-gray-100 ${
            isSelected ? 'bg-yellow-100 border-yellow-300' : ''
          }`}
          style={{ paddingLeft: `${depth * 20 + 12}px` }}
          onClick={() => onSelectCuenta(cuenta)}
        >
          {/* Expand/Collapse */}
          {hasChildren && (
            <button
              className="mr-2 text-gray-400 hover:text-gray-600"
              onClick={(e) => {
                e.stopPropagation()
                toggleExpand(cuenta.codigo)
              }}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          
          {/* Información de la cuenta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-sm font-medium">{cuenta.codigo}</span>
              <span className="text-sm">{cuenta.nombre}</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                cuenta.tipoMayor === 'ACTIVO' ? 'bg-green-100 text-green-800' :
                cuenta.tipoMayor === 'PASIVO' ? 'bg-red-100 text-red-800' :
                cuenta.tipoMayor === 'PATRIMONIO' ? 'bg-blue-100 text-blue-800' :
                cuenta.tipoMayor === 'INGRESOS' ? 'bg-purple-100 text-purple-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {cuenta.tipoMayor}
              </span>
            </div>
          </div>
          
          {/* Saldo */}
          {cuenta.saldoActual && (
            <div className="text-right">
              <span className="font-mono text-sm">
                ₲ {cuenta.saldoActual.toLocaleString()}
              </span>
            </div>
          )}
        </div>
        
        {/* Hijos */}
        {hasChildren && isExpanded && (
          <div>
            {cuenta.children.map((child: any) => renderCuenta(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }
  
  if (loading) return <div className="p-6"><LoadingSpinner /></div>
  if (!treeData.length) return <div className="p-6 text-gray-500">No hay cuentas para mostrar</div>
  
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-medium text-gray-900">Estructura Jerárquica</h3>
      </div>
      <div>
        {treeData.map((cuenta: any) => renderCuenta(cuenta))}
      </div>
    </div>
  )
} 