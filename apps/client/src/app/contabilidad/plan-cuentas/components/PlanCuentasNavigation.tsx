import { Button, Input } from '@contafacil/ui'

interface PlanCuentasNavigationProps {
  filtros: any
  onFiltrosChange: (filtros: any) => void
}

export function PlanCuentasNavigation({ filtros, onFiltrosChange }: PlanCuentasNavigationProps) {
  const updateFiltro = (key: string, value: string) => {
    onFiltrosChange({ ...filtros, [key]: value })
  }
  
  const tiposMayor = [
    { value: 'ACTIVO', label: 'Activos', color: 'bg-green-100 text-green-800' },
    { value: 'PASIVO', label: 'Pasivos', color: 'bg-red-100 text-red-800' },
    { value: 'PATRIMONIO', label: 'Patrimonio', color: 'bg-blue-100 text-blue-800' },
    { value: 'INGRESOS', label: 'Ingresos', color: 'bg-purple-100 text-purple-800' },
    { value: 'GASTOS', label: 'Gastos', color: 'bg-orange-100 text-orange-800' }
  ]
  
  return (
    <div className="p-4 h-full overflow-y-auto">
      {/* Módulos Contabilidad */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Contabilidad</h3>
        <div className="space-y-2">
          <div className="flex items-center p-2 bg-blue-100 rounded text-blue-900 text-sm font-medium">
            📊 Plan de Cuentas
          </div>
          <div className="flex items-center p-2 text-gray-500 text-sm">
            📝 Asientos (próximamente)
          </div>
          <div className="flex items-center p-2 text-gray-500 text-sm">
            📚 Libros (próximamente)
          </div>
          <div className="flex items-center p-2 text-gray-500 text-sm">
            📋 Estados (próximamente)
          </div>
        </div>
      </div>
      
      {/* Filtros Rápidos */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Filtros Rápidos</h3>
        
        {/* Búsqueda */}
        <div className="mb-4">
          <Input
            placeholder="Buscar cuenta..."
            value={filtros.busqueda}
            onChange={(e) => updateFiltro('busqueda', e.target.value)}
            className="text-sm"
          />
        </div>
        
        {/* Tipo Mayor */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo Mayor
          </label>
          <div className="space-y-1">
            <button
              onClick={() => updateFiltro('tipoMayor', '')}
              className={`w-full text-left p-2 rounded text-sm ${
                !filtros.tipoMayor ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'
              }`}
            >
              Todos los tipos
            </button>
            {tiposMayor.map(tipo => (
              <button
                key={tipo.value}
                onClick={() => updateFiltro('tipoMayor', tipo.value)}
                className={`w-full text-left p-2 rounded text-sm ${
                  filtros.tipoMayor === tipo.value ? tipo.color + ' font-medium' : 'hover:bg-gray-100'
                }`}
              >
                {tipo.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Nivel */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nivel
          </label>
          <select
            value={filtros.nivel || ''}
            onChange={(e) => updateFiltro('nivel', e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="">Todos los niveles</option>
            <option value="1">Nivel 1</option>
            <option value="2">Nivel 2</option>
            <option value="3">Nivel 3</option>
            <option value="4">Nivel 4</option>
          </select>
        </div>
        
        {/* Limpiar Filtros */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFiltrosChange({ tipoMayor: '', nivel: '', busqueda: '' })}
          className="w-full"
        >
          Limpiar Filtros
        </Button>
      </div>
      
      {/* Acciones */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Acciones</h3>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full">
            Importar Excel
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            Exportar Excel
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            Backup Plan
          </Button>
        </div>
      </div>
    </div>
  )
} 