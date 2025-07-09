import EventEmitter from 'eventemitter3'
import { z } from 'zod'
import { BaseModuleEvent, ModuleEvent, ModuleEventListener, EventBusConfig } from '../types/events'

// Schema de validación para eventos
const EventSchema = z.object({
  id: z.string(),
  type: z.string(),
  source: z.string(),
  empresaId: z.string(),
  data: z.any(),
  timestamp: z.date(),
  userId: z.string().optional(),
  metadata: z.record(z.any()).optional()
})

export class ModuleEventBus {
  private static instance: ModuleEventBus
  private emitter: EventEmitter
  private config: EventBusConfig
  private eventHistory: BaseModuleEvent[] = []

  private constructor(config: EventBusConfig = {}) {
    this.config = {
      maxListeners: 100,
      enableLogging: true,
      persistEvents: false,
      ...config
    }
    
    this.emitter = new EventEmitter()
    // eventemitter3 no tiene setMaxListeners, se maneja automáticamente
  }

  static getInstance(config?: EventBusConfig): ModuleEventBus {
    if (!ModuleEventBus.instance) {
      ModuleEventBus.instance = new ModuleEventBus(config)
    }
    return ModuleEventBus.instance
  }

  /**
   * Emite un evento a todos los listeners
   */
  emit(event: Omit<BaseModuleEvent, 'id' | 'timestamp'>): string {
    const fullEvent: BaseModuleEvent = {
      ...event,
      id: this.generateEventId(),
      timestamp: new Date()
    }

    // Validar evento
    try {
      EventSchema.parse(fullEvent)
    } catch (error) {
      console.error('Invalid event format:', error)
      throw new Error(`Invalid event format: ${error}`)
    }

    // Log del evento
    if (this.config.enableLogging) {
      console.log(`📡 Event emitted: ${fullEvent.type} from ${fullEvent.source}`, {
        eventId: fullEvent.id,
        empresaId: fullEvent.empresaId,
        data: fullEvent.data
      })
    }

    // Persistir evento si está habilitado
    if (this.config.persistEvents) {
      this.eventHistory.push(fullEvent)
    }

    // Emitir evento global
    this.emitter.emit('*', fullEvent)
    
    // Emitir evento específico por tipo
    this.emitter.emit(fullEvent.type, fullEvent)
    
    // Emitir evento específico por módulo
    this.emitter.emit(`${fullEvent.source}:${fullEvent.type}`, fullEvent)

    return fullEvent.id
  }

  /**
   * Suscribirse a todos los eventos
   */
  onAll(listener: ModuleEventListener): void {
    this.emitter.on('*', listener)
  }

  /**
   * Suscribirse a eventos de un tipo específico
   */
  on(eventType: string, listener: ModuleEventListener): void {
    this.emitter.on(eventType, listener)
  }

  /**
   * Suscribirse a eventos de un módulo específico
   */
  onModule(moduleName: string, eventType: string, listener: ModuleEventListener): void {
    this.emitter.on(`${moduleName}:${eventType}`, listener)
  }

  /**
   * Desuscribirse de eventos
   */
  off(eventType: string, listener: ModuleEventListener): void {
    this.emitter.off(eventType, listener)
  }

  /**
   * Desuscribirse de todos los eventos
   */
  offAll(listener: ModuleEventListener): void {
    this.emitter.off('*', listener)
  }

  /**
   * Emitir evento una sola vez
   */
  once(eventType: string, listener: ModuleEventListener): void {
    this.emitter.once(eventType, listener)
  }

  /**
   * Obtener listeners de un evento
   */
  listeners(eventType: string): ModuleEventListener[] {
    return this.emitter.listeners(eventType) as ModuleEventListener[]
  }

  /**
   * Obtener número de listeners
   */
  listenerCount(eventType?: string): number {
    return eventType ? this.emitter.listenerCount(eventType) : this.emitter.eventNames().length
  }

  /**
   * Limpiar todos los listeners
   */
  removeAllListeners(eventType?: string): void {
    this.emitter.removeAllListeners(eventType)
  }

  /**
   * Obtener historial de eventos (si está habilitado)
   */
  getEventHistory(filter?: { type?: string; source?: string; empresaId?: string }): BaseModuleEvent[] {
    if (!this.config.persistEvents) {
      console.warn('Event persistence is disabled')
      return []
    }

    let events = this.eventHistory

    if (filter) {
      events = events.filter(event => {
        if (filter.type && event.type !== filter.type) return false
        if (filter.source && event.source !== filter.source) return false
        if (filter.empresaId && event.empresaId !== filter.empresaId) return false
        return true
      })
    }

    return events
  }

  /**
   * Limpiar historial de eventos
   */
  clearHistory(): void {
    this.eventHistory = []
  }

  /**
   * Destruir instancia del EventBus
   */
  destroy(): void {
    this.emitter.removeAllListeners()
    this.eventHistory = []
    ModuleEventBus.instance = undefined as any
  }

  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}

// Export singleton instance
export const eventBus = ModuleEventBus.getInstance({
  enableLogging: process.env.NODE_ENV === 'development',
  persistEvents: process.env.NODE_ENV === 'development'
}) 