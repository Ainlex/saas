import { useEffect, useState, useMemo } from 'react'
import { Button, LoadingSpinner } from '@contafacil/ui'

interface PlanCuentasGridProps {
  tipoMayor: string
  nivel: string
  busqueda: string
  permiteMovimiento: string
}

interface Cuenta {
  id: string
  codigo: string
  codigoPadre?: string | null
  nivel: number
  nombre: string
  nombreCompleto?: string | null
  nombreCorto?: string | null
  tipoMayor: string
  tipoDetalle?: string | null
  naturaleza: string
  permiteMovimiento: boolean
  esAuxiliar: boolean
  nivelMaximo: number
  monedaPermitida: string
  centroCostoObligatorio: boolean
  proyectoObligatorio: boolean
  requiereReferencia: boolean
  requiereCliente: boolean
  requiereProveedor: boolean
  activo: boolean
}

interface TreeCuenta extends Cuenta {
  children: TreeCuenta[]
  expanded?: boolean
}

export function PlanCuentasGrid({ tipoMayor, nivel, busqueda, permiteMovimiento }: PlanCuentasGridProps) {
  const [loading, setLoading] = useState(true)
  const [cuentas, setCuentas] = useState<Cuenta[]>([])
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setLoading(true)
    setError(null)
    const params = new URLSearchParams()
    if (tipoMayor) params.append('tipoMayor', tipoMayor)
    if (nivel) params.append('nivel', nivel)
    if (permiteMovimiento) params.append('permiteMovimiento', permiteMovimiento)
    fetch(`/api/contabilidad/plan-cuentas?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setCuentas(data.cuentas || [])
        setLoading(false)
      })
      .catch(() => {
        setError('Error al cargar el plan de cuentas')
        setLoading(false)
      })
  }, [tipoMayor, nivel, permiteMovimiento])

  // Filtrado por búsqueda
  const cuentasFiltradas = useMemo(() => {
    if (!busqueda) return cuentas
    const b = busqueda.toLowerCase()
    return cuentas.filter(c =>
      c.codigo.toLowerCase().includes(b) ||
      (c.nombre?.toLowerCase().includes(b) ?? false) ||
      (c.nombreCompleto?.toLowerCase().includes(b) ?? false)
    )
  }, [cuentas, busqueda])

  // Construir árbol jerárquico
  const tree = useMemo(() => {
    const map: Record<string, TreeCuenta> = {}
    const roots: TreeCuenta[] = []
    cuentasFiltradas.forEach(c => {
      map[c.codigo] = { ...c, children: [], expanded: expanded[c.codigo] ?? c.nivel < 3 }
    })
    Object.values(map).forEach(c => {
      if (c.codigoPadre && map[c.codigoPadre]) {
        map[c.codigoPadre].children.push(c)
      } else {
        roots.push(c)
      }
    })
    return roots
  }, [cuentasFiltradas, expanded])

  const toggleExpand = (codigo: string) => {
    setExpanded(e => ({ ...e, [codigo]: !e[codigo] }))
  }

  if (loading) return (
    <div className="flex justify-center items-center py-12">
      <LoadingSpinner />
    </div>
  )
  
  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="text-red-800 text-sm">{error}</div>
    </div>
  )
  
  if (!tree.length) return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
      <div className="text-gray-500 text-sm">No hay cuentas para mostrar.</div>
    </div>
  )

  // Render fila de cuenta con zebra striping
  const renderRow = (cuenta: TreeCuenta, depth = 0, rowIndex = 0): JSX.Element | JSX.Element[] => {
    const isEven = rowIndex % 2 === 0
    const baseClass = isEven ? 'bg-white' : 'bg-gray-50'
    const hoverClass = 'hover:bg-blue-50 transition-colors duration-150'
    
    return (
      <>
        <tr className={`${baseClass} ${hoverClass} ${!cuenta.permiteMovimiento ? 'opacity-75' : ''}`}>
          <td className="px-3 py-2.5 text-sm" style={{ paddingLeft: `${depth * 20 + 12}px` }}>
            <div className="flex items-center space-x-2">
              {cuenta.children.length > 0 && (
                <button
                  className="w-4 h-4 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors"
                  onClick={() => toggleExpand(cuenta.codigo)}
                  aria-label={cuenta.expanded ? 'Colapsar' : 'Expandir'}
                >
                  <span className="text-xs">
                    {cuenta.expanded ? '▼' : '▶'}
                  </span>
                </button>
              )}
              <span className="font-mono text-gray-900 font-medium">{cuenta.codigo}</span>
            </div>
          </td>
          <td className="px-3 py-2.5 text-sm text-gray-900">
            <div className="font-medium">{cuenta.nombre}</div>
            {cuenta.nombreCompleto && cuenta.nombreCompleto !== cuenta.nombre && (
              <div className="text-xs text-gray-500 mt-0.5">{cuenta.nombreCompleto}</div>
            )}
          </td>
          <td className="px-3 py-2.5 text-sm">
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
              cuenta.tipoMayor === 'ACTIVO' ? 'bg-green-100 text-green-800' :
              cuenta.tipoMayor === 'PASIVO' ? 'bg-red-100 text-red-800' :
              cuenta.tipoMayor === 'PATRIMONIO' ? 'bg-blue-100 text-blue-800' :
              cuenta.tipoMayor === 'INGRESOS' ? 'bg-emerald-100 text-emerald-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {cuenta.tipoMayor}
            </span>
          </td>
          <td className="px-3 py-2.5 text-sm text-gray-700">
            {cuenta.naturaleza}
          </td>
          <td className="px-3 py-2.5 text-sm text-right text-gray-700">
            {cuenta.nivel}
          </td>
          <td className="px-3 py-2.5 text-sm text-center">
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
              cuenta.permiteMovimiento 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {cuenta.permiteMovimiento ? 'Sí' : 'No'}
            </span>
          </td>
          <td className="px-3 py-2.5 text-sm text-center text-gray-700">
            {cuenta.monedaPermitida}
          </td>
        </tr>
        {cuenta.expanded && cuenta.children.map((child, childIndex) => 
          renderRow(child, depth + 1, rowIndex + childIndex + 1)
        )}
      </>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Código
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Tipo Mayor
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Naturaleza
              </th>
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                Nivel
              </th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Movimiento
              </th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Moneda
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tree.map((cuenta, index) => renderRow(cuenta, 0, index))}
          </tbody>
        </table>
      </div>
      
      {/* Footer con estadísticas */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Total: {cuentasFiltradas.length} cuentas</span>
          <span>Mostrando {cuentasFiltradas.length} de {cuentas.length}</span>
        </div>
      </div>
    </div>
  )
} 