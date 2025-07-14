'use client'
import { useState } from 'react'
import { useAuth, useModules } from '@contafacil/ui/hooks'
import { ModuleNotAvailable, Button } from '@contafacil/ui'
import { PlanCuentasTree } from './components/PlanCuentasTree'
import { PlanCuentasDetail } from './components/PlanCuentasDetail'
import { PlanCuentasNavigation } from './components/PlanCuentasNavigation'
import React from 'react'

interface CuentaSelected {
  id: string
  codigo: string
  nombre: string
  nombreCorto?: string
  tipoMayor: string
  naturaleza: string
  nivel: number
  permiteMovimiento: boolean
  monedaPermitida: string
  saldoActual?: number
}

export default function PlanCuentasPage() {
  const { hasModule, modulosActivos, loading } = useModules()
  const [selectedCuenta, setSelectedCuenta] = useState<CuentaSelected | null>(null)
  const [filtros, setFiltros] = useState({
    tipoMayor: '',
    nivel: '',
    busqueda: ''
  })
  const [cuentasExistentes, setCuentasExistentes] = useState<any[]>([])
  
  // DEBUG LOGS
  console.log('🔍 === DEBUG PLAN CUENTAS PAGE ===')
  console.log('🔍 useModules result:', { 
    hasModule: hasModule('contabilidad'), 
    modulosActivos, 
    loading 
  })
  console.log('🔍 Filtros iniciales:', filtros)
  console.log('✅ === FIN DEBUG ===')
  
  if (!hasModule('contabilidad')) {
    console.log('❌ Módulo contabilidad no disponible')
    return <ModuleNotAvailable moduleName="Contabilidad" />
  }
  
  // Agregar funciones de import/export
  const handleExport = async () => {
    try {
      const response = await fetch('/api/contabilidad/plan-cuentas/export')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `plan-cuentas-${new Date().toISOString().split('T')[0]}.xlsx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exportando:', error)
      alert('Error al exportar el plan de cuentas')
    }
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      // Convertir archivo a base64
      const reader = new FileReader()
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer
        const uint8Array = new Uint8Array(arrayBuffer)
        const base64 = btoa(String.fromCharCode(...uint8Array))
        try {
          const response = await fetch('/api/contabilidad/plan-cuentas/import', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              fileData: base64,
              fileName: file.name 
            })
          })
          const result = await response.json()
          if (response.ok) {
            alert(`✅ Importación exitosa: ${result.imported} cuentas importadas, ${result.errors} errores`)
            window.location.reload()
          } else {
            alert(`❌ Error: ${result.error}`)
          }
        } catch (error) {
          console.error('Error en request:', error)
          alert('Error al procesar la importación')
        }
      }
      reader.onerror = () => {
        alert('Error al leer el archivo')
      }
      reader.readAsArrayBuffer(file)
    } catch (error) {
      console.error('Error general:', error)
      alert('Error al importar el archivo')
    }
    event.target.value = ''
  }
  
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Plan de Cuentas</h1>
            <p className="text-gray-600">Gestiona la estructura contable de tu empresa</p>
          </div>
          <div className="flex space-x-3">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleImport}
                className="hidden"
              />
              <span className="btn btn-outline btn-sm">Importar</span>
            </label>
            <Button variant="outline" size="sm" onClick={handleExport}>
              Exportar
            </Button>
            <Button size="sm" onClick={() => setSelectedCuenta(null)}>
              Agregar Cuenta
            </Button>
          </div>
        </div>
      </div>
      
      {/* Layout 3 Paneles SAP-Inspired */}
      <div className="flex-1 flex">
        {/* Panel Izquierdo - Formulario Detalle */}
        <div className="w-80 bg-gray-50 border-r">
          <PlanCuentasDetail 
            cuenta={selectedCuenta}
            onSave={(cuenta: any) => {
              setSelectedCuenta(cuenta)
            }}
            modoCreacion={selectedCuenta === null}
          />
        </div>
        
        {/* Panel Centro - Árbol Jerárquico */}
        <div className="flex-1 bg-white">
          <PlanCuentasTree
            filtros={filtros}
            selectedCuenta={selectedCuenta}
            onSelectCuenta={setSelectedCuenta}
            onCuentasLoaded={setCuentasExistentes}
          />
        </div>
        
        {/* Panel Derecho - Navegación y Filtros */}
        <div className="w-64 bg-gray-50 border-l">
          <PlanCuentasNavigation
            filtros={filtros}
            onFiltrosChange={setFiltros}
          />
        </div>
      </div>
    </div>
  )
} 