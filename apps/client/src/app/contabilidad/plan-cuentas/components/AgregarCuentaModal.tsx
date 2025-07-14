import { useState } from 'react'
import { Button, Input, Modal } from '@contafacil/ui'

interface AgregarCuentaModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (cuenta: any) => void
  cuentasExistentes: any[]
}

export function AgregarCuentaModal({ isOpen, onClose, onSuccess, cuentasExistentes }: AgregarCuentaModalProps) {
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
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/contabilidad/plan-cuentas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Error al crear la cuenta')
      }
      
      onSuccess(result.cuenta)
      handleClose()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  const handleClose = () => {
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
    setError('')
    onClose()
  }
  
  const sugerirCodigo = () => {
    // Encontrar el siguiente código disponible en el nivel 1
    const codigosNivel1 = cuentasExistentes
      .filter(c => c.nivel === 1)
      .map(c => parseInt(c.codigo))
      .sort((a, b) => a - b)
    
    let siguienteCodigo = 1
    for (const codigo of codigosNivel1) {
      if (codigo === siguienteCodigo) {
        siguienteCodigo++
      } else {
        break
      }
    }
    
    setFormData(prev => ({ ...prev, codigo: siguienteCodigo.toString() }))
  }
  
  const actualizarNivel = (codigo: string) => {
    const nivel = codigo.split('.').length
    setFormData(prev => ({ ...prev, nivel }))
  }
  
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="relative max-w-lg w-full mx-auto bg-white rounded-2xl shadow-2xl p-0 overflow-hidden animate-fadeIn">
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none z-10"
          aria-label="Cerrar"
        >
          ×
        </button>
        <div className="px-8 pt-8 pb-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Agregar Nueva Cuenta</h2>
          <p className="text-sm text-gray-500 mb-6">Completa los datos de la nueva cuenta contable.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
            {/* Código */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Código <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <Input
                  value={formData.codigo}
                  onChange={(e) => {
                    const codigo = e.target.value
                    setFormData(prev => ({ ...prev, codigo }))
                    actualizarNivel(codigo)
                  }}
                  placeholder="1.1.01.001"
                  className="font-mono flex-1 text-base"
                  required
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  className="h-9 px-3"
                  onClick={sugerirCodigo}
                >
                  Sugerir
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Formato: 1.1.01.001 (máximo 4 niveles)
              </p>
            </div>
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.nombre}
                onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                placeholder="Nombre de la cuenta"
                className="text-base"
                required
              />
            </div>
            {/* Nombre Corto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Corto
              </label>
              <Input
                value={formData.nombreCorto}
                onChange={(e) => setFormData(prev => ({ ...prev, nombreCorto: e.target.value }))}
                placeholder="Para reportes"
                className="text-base"
              />
            </div>
            {/* Tipo Mayor y Naturaleza */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo Mayor
                </label>
                <select
                  value={formData.tipoMayor}
                  onChange={(e) => setFormData(prev => ({ ...prev, tipoMayor: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-base"
                >
                  <option value="ACTIVO">Activo</option>
                  <option value="PASIVO">Pasivo</option>
                  <option value="PATRIMONIO">Patrimonio</option>
                  <option value="INGRESOS">Ingresos</option>
                  <option value="GASTOS">Gastos</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Naturaleza
                </label>
                <select
                  value={formData.naturaleza}
                  onChange={(e) => setFormData(prev => ({ ...prev, naturaleza: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-base"
                >
                  <option value="DEUDORA">Deudora</option>
                  <option value="ACREEDORA">Acreedora</option>
                </select>
              </div>
            </div>
            {/* Nivel y Permite Movimiento */}
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nivel
                </label>
                <div className="text-lg font-semibold text-gray-900">{formData.nivel}</div>
                <p className="text-xs text-gray-400">
                  Calculado automáticamente basado en el código
                </p>
              </div>
              <div className="flex-1 flex items-center h-full">
                <input
                  type="checkbox"
                  checked={formData.permiteMovimiento}
                  onChange={(e) => setFormData(prev => ({ ...prev, permiteMovimiento: e.target.checked }))}
                  className="mr-2 mt-1"
                />
                <span className="text-sm font-medium text-gray-700">
                  Permite Movimiento
                </span>
              </div>
            </div>
            {/* Moneda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Moneda
              </label>
              <select
                value={formData.monedaPermitida}
                onChange={(e) => setFormData(prev => ({ ...prev, monedaPermitida: e.target.value }))}
                className="w-full border border-gray-300 rounded px-3 py-2 text-base"
              >
                <option value="GUARANIES">Guaraníes</option>
                <option value="USD">Dólares</option>
                <option value="MIXTA">Mixta</option>
              </select>
            </div>
            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
                disabled={loading}
                className="px-6"
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                disabled={loading}
                className="px-6"
              >
                {loading ? 'Creando...' : 'Crear Cuenta'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
} 