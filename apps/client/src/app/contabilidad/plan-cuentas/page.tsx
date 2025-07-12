'use client'
import { useState } from 'react'
import { useAuth, useModules } from '@contafacil/ui/hooks'
import { ModuleNotAvailable, Button, Input, LoadingSpinner } from '@contafacil/ui'
import { PlanCuentasGrid } from './PlanCuentasGrid'

export default function PlanCuentasPage() {
  const { hasModule } = useModules()
  const [tipoMayor, setTipoMayor] = useState('')
  const [nivel, setNivel] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [permiteMovimiento, setPermiteMovimiento] = useState('')

  if (!hasModule('contabilidad')) {
    return <ModuleNotAvailable moduleName="Contabilidad" />
  }

  return (
    <div className="space-y-4">
      {/* Header con acciones principales */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Plan de Cuentas</h1>
          <p className="text-sm text-gray-600 mt-1">Gestiona la estructura contable de tu empresa</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => window.alert('Importar próximamente')}>
            Importar
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.alert('Exportar Excel próximamente')}>
            Exportar
          </Button>
          <Button size="sm">
            Agregar Cuenta
          </Button>
        </div>
      </div>

      {/* Filtros compactos y profesionales */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Tipo Mayor</label>
            <select 
              name="tipoMayor" 
              value={tipoMayor} 
              onChange={e => setTipoMayor(e.target.value)} 
              className="w-full h-9 text-sm px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los tipos</option>
              <option value="ACTIVO">Activo</option>
              <option value="PASIVO">Pasivo</option>
              <option value="PATRIMONIO">Patrimonio</option>
              <option value="INGRESOS">Ingresos</option>
              <option value="GASTOS">Gastos</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Nivel</label>
            <select 
              name="nivel" 
              value={nivel} 
              onChange={e => setNivel(e.target.value)} 
              className="w-full h-9 text-sm px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los niveles</option>
              <option value="1">Nivel 1</option>
              <option value="2">Nivel 2</option>
              <option value="3">Nivel 3</option>
              <option value="4">Nivel 4</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Movimiento</label>
            <select 
              name="permiteMovimiento" 
              value={permiteMovimiento} 
              onChange={e => setPermiteMovimiento(e.target.value)} 
              className="w-full h-9 text-sm px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos</option>
              <option value="true">Permite</option>
              <option value="false">No permite</option>
            </select>
          </div>

          <div className="md:col-span-2 flex items-end gap-2">
            <div className="flex flex-1 items-end gap-2">
              <div className="flex-1 max-w-xs">
                <label className="block text-xs font-medium text-gray-700 mb-1">Buscar</label>
                <Input 
                  placeholder="Código o nombre..." 
                  value={busqueda} 
                  onChange={e => setBusqueda(e.target.value)}
                  className="h-9 text-sm w-full px-3 py-1"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setTipoMayor('')
                  setNivel('')
                  setBusqueda('')
                  setPermiteMovimiento('')
                }}
                className="h-9 text-sm px-3 py-1"
              >
                Limpiar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid jerárquico profesional */}
      <PlanCuentasGrid 
        tipoMayor={tipoMayor}
        nivel={nivel}
        busqueda={busqueda}
        permiteMovimiento={permiteMovimiento}
      />
    </div>
  )
} 