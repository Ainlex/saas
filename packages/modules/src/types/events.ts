// Tipos y constantes de eventos para comunicación entre módulos

export type ModuleEventType =
  | 'VENTA_COMPLETADA'
  | 'FACTURA_EMITIDA'
  | 'STOCK_ACTUALIZADO'
  | 'ASIENTO_CREADO'
  | 'CLIENTE_CREADO'

export const ModuleEventTypes = {
  VENTA_COMPLETADA: 'VENTA_COMPLETADA',
  FACTURA_EMITIDA: 'FACTURA_EMITIDA',
  STOCK_ACTUALIZADO: 'STOCK_ACTUALIZADO',
  ASIENTO_CREADO: 'ASIENTO_CREADO',
  CLIENTE_CREADO: 'CLIENTE_CREADO',
} as const

export interface ModuleEvent {
  type: ModuleEventType
  source: string
  data: any
  timestamp: Date
  empresaId: string
} 