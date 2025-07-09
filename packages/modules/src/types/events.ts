export interface BaseModuleEvent {
  id: string
  type: string
  source: string
  empresaId: string
  data: any
  timestamp: Date
  userId?: string
  metadata?: Record<string, any>
}

export interface ModuleEventListener {
  (event: BaseModuleEvent): void | Promise<void>
}

// Eventos específicos por módulo
export interface VentaCompletadaEvent extends BaseModuleEvent {
  type: 'VENTA_COMPLETADA'
  source: 'pos'
  data: {
    ventaId: string
    productos: Array<{
      id: string
      cantidad: number
      precio: number
      subtotal: number
    }>
    total: number
    clienteId?: string
    almacenId: string
    metodoPago: string
  }
}

export interface FacturaEmitidaEvent extends BaseModuleEvent {
  type: 'FACTURA_EMITIDA'
  source: 'facturacion'
  data: {
    facturaId: string
    ventaId?: string
    clienteId: string
    numeroFactura: string
    cdc: string
    total: number
    tipoDocumento: string
  }
}

export interface StockActualizadoEvent extends BaseModuleEvent {
  type: 'STOCK_ACTUALIZADO'
  source: 'inventario'
  data: {
    productoId: string
    almacenId: string
    stockAnterior: number
    stockActual: number
    movimiento: 'ENTRADA' | 'SALIDA' | 'AJUSTE'
    referencia?: string
  }
}

export interface AsientoCreado extends BaseModuleEvent {
  type: 'ASIENTO_CREADO'
  source: 'contabilidad'
  data: {
    asientoId: string
    numeroAsiento: string
    fecha: Date
    concepto: string
    total: number
    cuentas: Array<{
      cuentaId: string
      debe: number
      haber: number
    }>
  }
}

export interface ClienteCreadoEvent extends BaseModuleEvent {
  type: 'CLIENTE_CREADO'
  source: 'crm'
  data: {
    clienteId: string
    nombre: string
    ruc?: string
    email?: string
    telefono?: string
    direccion?: string
  }
}

// Union type de todos los eventos
export type ModuleEvent = 
  | VentaCompletadaEvent
  | FacturaEmitidaEvent
  | StockActualizadoEvent
  | AsientoCreado
  | ClienteCreadoEvent

// Types para el EventBus
export interface EventBusConfig {
  maxListeners?: number
  enableLogging?: boolean
  persistEvents?: boolean
} 