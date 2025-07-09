# @contafacil/modules

Sistema de comunicación entre módulos para ContaFácil Paraguay.

## Características

- **EventBus**: Comunicación desacoplada entre módulos
- **ModuleManager**: Gestión centralizada de instancias de módulos
- **BaseModule**: Clase base para implementar módulos específicos
- **Type Safety**: Types TypeScript completos para eventos y módulos
- **Validaciones**: Schemas Zod para validar datos

## Arquitectura

### EventBus
Sistema de eventos basado en EventEmitter3 para comunicación entre módulos.

```typescript
import { eventBus } from '@contafacil/modules'

// Emitir evento
eventBus.emit({
  type: 'VENTA_COMPLETADA',
  source: 'pos',
  empresaId: 'empresa-123',
  data: {
    ventaId: 'venta-456',
    total: 150000,
    productos: [...]
  }
})

// Escuchar eventos
eventBus.on('VENTA_COMPLETADA', (event) => {
  console.log('Venta procesada:', event.data)
})
```

### ModuleManager
Gestión centralizada de módulos por empresa.

```typescript
import { moduleManager } from '@contafacil/modules'

// Registrar módulo
moduleManager.registerModule('pos', POSModule)

// Ejecutar acción
const result = await moduleManager.executeModuleAction(
  'pos',
  'crear_venta',
  context,
  ventaData
)
```

### BaseModule
Clase base para implementar módulos específicos.

```typescript
import { BaseModule } from '@contafacil/modules'

export class POSModule extends BaseModule {
  config = {
    name: 'pos',
    version: '1.0.0',
    dependencies: ['inventario'],
    capabilities: ['crear_venta', 'consultar_productos'],
    eventTypes: ['VENTA_COMPLETADA']
  }

  protected async onInit(context) {
    // Inicialización específica del POS
  }

  protected async onExecuteAction(action, params, context) {
    if (action === 'crear_venta') {
      // Lógica crear venta
      return {
        success: true,
        data: venta,
        events: [{
          type: 'VENTA_COMPLETADA',
          data: venta
        }]
      }
    }
  }

  protected async onHandleEvent(event) {
    if (event.type === 'STOCK_ACTUALIZADO') {
      // Reaccionar a cambio de stock
    }
  }
}
```

## Eventos Disponibles

- `VENTA_COMPLETADA`: Venta procesada en POS
- `FACTURA_EMITIDA`: Factura electrónica generada
- `STOCK_ACTUALIZADO`: Cambio en inventario
- `ASIENTO_CREADO`: Asiento contable registrado
- `CLIENTE_CREADO`: Nuevo cliente en CRM

## Testing

```bash
cd packages/modules
pnpm test
```

## Desarrollo

Para crear un nuevo módulo:

1. Extender `BaseModule`
2. Implementar métodos abstractos
3. Registrar en `ModuleManager`
4. Definir eventos específicos
5. Documentar API del módulo 