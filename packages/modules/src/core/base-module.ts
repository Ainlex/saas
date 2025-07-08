import { ModuleEventBus } from './module-events'

export abstract class BaseModule {
  protected eventBus: ModuleEventBus

  constructor(eventBus?: ModuleEventBus) {
    this.eventBus = eventBus || ModuleEventBus.getInstance()
  }

  abstract init(): void | Promise<void>
  abstract destroy(): void | Promise<void>
} 