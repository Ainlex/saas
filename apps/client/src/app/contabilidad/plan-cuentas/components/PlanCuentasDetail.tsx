import { useState, useEffect } from 'react'
import { Button, Input } from '@contafacil/ui'

interface PlanCuentasDetailProps {
  cuenta: any
  onSave: (cuenta: any) => void
  modoCreacion?: boolean
}

export function PlanCuentasDetail({ cuenta, onSave, modoCreacion }: PlanCuentasDetailProps) {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    nombreCorto: '',
    tipoMayor: 'ACTIVO',
    naturaleza: 'DEUDORA',
    nivel: 1,
    permiteMovimiento: true,
    monedaPermitida: 'GUARANIES'
  })
  
  useEffect(() => {
    if (cuenta && !modoCreacion) {
      setFormData({
        codigo: cuenta.codigo || '',
        nombre: cuenta.nombre || '',
        nombreCorto: cuenta.nombreCorto || '',
        tipoMayor: cuenta.tipoMayor || 'ACTIVO',
        naturaleza: cuenta.naturaleza || 'DEUDORA',
        nivel: cuenta.nivel || 1,
        permiteMovimiento: cuenta.permiteMovimiento ?? true,
        monedaPermitida: cuenta.monedaPermitida || 'GUARANIES'
      })
    } else if (modoCreacion) {
      setFormData({
        codigo: '',
        nombre: '',
        nombreCorto: '',
        tipoMayor: 'ACTIVO',
        naturaleza: 'DEUDORA',
        nivel: 1,
        permiteMovimiento: true,
        monedaPermitida: 'GUARANIES'
      })
    }
  }, [cuenta, modoCreacion])
  
  const handleSave = async () => {
    if (!formData.codigo || !formData.nombre) return
    try {
      let response, result
      if (modoCreacion) {
        response = await fetch('/api/contabilidad/plan-cuentas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      } else {
        response = await fetch('/api/contabilidad/plan-cuentas', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: cuenta.id, ...formData })
        })
      }
      result = await response.json()
      if (response.ok) {
        onSave(result.cuenta)
        if (modoCreacion) {
          setFormData({
            codigo: '',
            nombre: '',
            nombreCorto: '',
            tipoMayor: 'ACTIVO',
            naturaleza: 'DEUDORA',
            nivel: 1,
            permiteMovimiento: true,
            monedaPermitida: 'GUARANIES'
          })
        }
      } else {
        alert(result.error || 'Error al guardar')
      }
    } catch (error) {
      alert('Error al guardar')
    }
  }
  
  if (!cuenta && !modoCreacion) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">
          <p>Selecciona una cuenta para ver sus detalles</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-4">
        <h3 className="font-medium text-gray-900 mb-2">
          {modoCreacion ? 'Nueva Cuenta' : 'Detalle de Cuenta'}
        </h3>
        <div className="text-sm text-gray-600">
          {modoCreacion ? 'Completa los datos para crear una nueva cuenta' : `${cuenta?.codigo} - ${cuenta?.nombre}`}
        </div>
      </div>
      <div className="space-y-4">
        {/* Código */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Código
          </label>
          <Input
            value={formData.codigo}
            onChange={(e) => setFormData(f => ({ ...f, codigo: e.target.value }))}
            className="font-mono"
            disabled={!modoCreacion && !!cuenta}
          />
        </div>
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <Input
            value={formData.nombre}
            onChange={(e) => setFormData(f => ({ ...f, nombre: e.target.value }))}
          />
        </div>
        {/* Nombre Corto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Corto
          </label>
          <Input
            value={formData.nombreCorto}
            onChange={(e) => setFormData(f => ({ ...f, nombreCorto: e.target.value }))}
            placeholder="Para reportes"
          />
        </div>
        {/* Tipo Mayor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo Mayor
          </label>
          <select
            value={formData.tipoMayor}
            onChange={(e) => setFormData(f => ({ ...f, tipoMayor: e.target.value }))}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="ACTIVO">Activo</option>
            <option value="PASIVO">Pasivo</option>
            <option value="PATRIMONIO">Patrimonio</option>
            <option value="INGRESOS">Ingresos</option>
            <option value="GASTOS">Gastos</option>
          </select>
        </div>
        {/* Naturaleza */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Naturaleza
          </label>
          <select
            value={formData.naturaleza}
            onChange={(e) => setFormData(f => ({ ...f, naturaleza: e.target.value }))}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="DEUDORA">Deudora</option>
            <option value="ACREEDORA">Acreedora</option>
          </select>
        </div>
        {/* Nivel */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nivel
          </label>
          <div className="text-lg font-medium text-gray-900">{formData.nivel}</div>
        </div>
        {/* Permite Movimiento */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.permiteMovimiento}
              onChange={(e) => setFormData(f => ({ ...f, permiteMovimiento: e.target.checked }))}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              Permite Movimiento
            </span>
          </label>
        </div>
        {/* Moneda */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Moneda
          </label>
          <select
            value={formData.monedaPermitida}
            onChange={(e) => setFormData(f => ({ ...f, monedaPermitida: e.target.value }))}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="GUARANIES">Guaraníes</option>
            <option value="USD">Dólares</option>
            <option value="MIXTA">Mixta</option>
          </select>
        </div>
        {/* Saldo */}
        {cuenta?.saldoActual !== undefined && !modoCreacion && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Saldo Actual
            </label>
            <div className="text-lg font-mono font-medium text-gray-900">
              ₲ {cuenta.saldoActual?.toLocaleString() || '0'}
            </div>
          </div>
        )}
        {/* Botones */}
        <div className="pt-4 space-y-2">
          <Button 
            onClick={handleSave}
            className="w-full"
          >
            {modoCreacion ? 'Crear Cuenta' : 'Guardar Cambios'}
          </Button>
        </div>
      </div>
    </div>
  )
} 