'use client'
import { useModules, ModuleNotAvailable, Button } from '@contafacil/ui'
import PlanCuentasTree from './components/PlanCuentasTree'

export default function ContabilidadPage() {
  const { hasModule } = useModules()
  
  if (!hasModule('contabilidad')) {
    return <ModuleNotAvailable moduleName="Contabilidad" />
  }
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Plan de Cuentas</h1>
              <p className="text-gray-600">Gestiona tu plan de cuentas contable paraguayo</p>
            </div>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Nueva Cuenta
            </Button>
          </div>
        </div>
      </div>
      
      {/* Plan de Cuentas */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <PlanCuentasTree />
        </div>
      </div>
    </div>
  )
} 