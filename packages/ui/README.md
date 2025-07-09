# @contafacil/ui

Componentes UI base y sistema de layouts para ContaFácil Paraguay.

## Componentes Principales

### Hooks
- `useModules()`: Gestión de módulos activos por empresa
- `useAuth()`: Información de usuario autenticado

### Layouts
- `AppLayout`: Layout principal con sidebar y header
- `ModuleNavigation`: Navegación condicional por módulos

### Componentes Base
- `Button`: Botón con variants y estados
- `Input`: Input con label y validación
- `LoadingSpinner`: Spinner de carga
- `ModuleNotAvailable`: Mensaje módulo no disponible

## Uso

```typescript
import { AppLayout, useModules, Button } from '@contafacil/ui'

function MyPage() {
  const { hasModule } = useModules()
  
  return (
    <AppLayout>
      {hasModule('inventario') && (
        <Button variant="primary">Gestionar Inventario</Button>
      )}
    </AppLayout>
  )
}
```

## Theme

Configurado con colores Paraguay (azul/rojo) y sistema de design tokens.

## Dependencias

- `next-auth`: Autenticación
- `@contafacil/auth`: Guards y middleware
- `@contafacil/database`: Tipos de base de datos
- `tailwindcss`: Estilos
- `clsx`: Utilidades de clases CSS 