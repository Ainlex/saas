import type { ModuleEvent } from '../types/events'

export class ModuleEventBus {
  private static instance: ModuleEventBus
  private listeners: Map<string, Function[]> = new Map()

  static getInstance(): ModuleEventBus {
    if (!ModuleEventBus.instance) {
      ModuleEventBus.instance = new ModuleEventBus()
    }
    return ModuleEventBus.instance
  }

  emit(event: ModuleEvent) {
    const listeners = this.listeners.get(event.type) || []
    listeners.forEach(listener => {
      try {
        listener(event)
      } catch (error) {
        console.error(`Error in event listener for ${event.type}:`, error)
      }
    })
  }

  on(eventType: string, listener: Function) {
    const listeners = this.listeners.get(eventType) || []
    listeners.push(listener)
    this.listeners.set(eventType, listeners)
  }

  off(eventType: string, listener: Function) {
    const listeners = this.listeners.get(eventType) || []
    const index = listeners.indexOf(listener)
    if (index > -1) {
      listeners.splice(index, 1)
    }
  }
} 