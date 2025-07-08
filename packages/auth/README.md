# @contafacil/auth

Sistema de autenticación y autorización modular para ContaFácil Paraguay.

## 🏗 Estructura

```
packages/auth/
├── src/
│   ├── guards/
│   │   └── module-guard.ts          # Validación de acceso a módulos
│   ├── middleware/
│   │   ├── auth-middleware.ts       # Extracción de usuario actual
│   │   └── module-middleware.ts     # Protección de rutas por módulo
│   ├── permissions/
│   │   └── permission-checker.ts    # Validación de permisos granulares
│   ├── helpers/
│   │   └── clerk-helpers.ts         # Sincronización con Clerk
│   ├── examples/
│   │   ├── client-middleware.ts     # Ejemplo middleware app client
│   │   └── api-route-example.ts     # Ejemplo API route protegida
│   └── index.ts                     # Exports principales
└── package.json
```

## 🚀 Instalación

```bash
pnpm add @contafacil/auth
```

## 📋 Configuración Clerk

### 1. Configurar publicMetadata

```typescript
// En tu app, configurar Clerk con metadata custom
import { clerkClient } from '@clerk/nextjs/server'

await clerkClient.users.updateUser(userId, {
  publicMetadata: {
    empresaId: 'empresa_123',
    rolId: 'rol_456'
  }
})
```

### 2. Sincronizar Usuario

```typescript
import { syncUserWithClerk } from '@contafacil/auth'

const success = await syncUserWithClerk(clerkUserId, {
  email: 'usuario@empresa.com',
  nombre: 'Juan Pérez',
  empresaId: 'empresa_123',
  rolId: 'rol_456'
})
```

## 🛡 Guards de Módulos

### Verificar Acceso a Módulo

```typescript
import { ModuleGuard } from '@contafacil/auth'

// Verificar si empresa tiene acceso al módulo
const hasAccess = await ModuleGuard.checkModuleAccess(
  empresaId, 
  'facturacion'
)

// Con validación de dependencias
const dependencies = await ModuleGuard.checkModuleDependencies(
  empresaId,
  'facturacion'
)

if (!dependencies.valid) {
  console.log('Módulos faltantes:', dependencies.missing)
}
```

### Obtener Módulos Activos

```typescript
const activeModules = await ModuleGuard.getActiveModules(empresaId)
// ['facturacion', 'pos', 'inventario']
```

## 🔐 Middleware de Protección

### Middleware para App Client

```typescript
// apps/client/src/middleware.ts
import { NextRequest } from 'next/server'
import { moduleMiddleware } from '@contafacil/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const moduleRoutes = {
    '/facturacion': 'facturacion',
    '/pos': 'pos',
    '/inventario': 'inventario',
    '/contabilidad': 'contabilidad',
    '/crm': 'crm',
    '/reportes': 'reportes'
  }

  for (const [route, module] of Object.entries(moduleRoutes)) {
    if (pathname.startsWith(route)) {
      return moduleMiddleware(request, module)
    }
  }
}

export const config = {
  matcher: [
    '/facturacion/:path*',
    '/pos/:path*',
    '/inventario/:path*',
    '/contabilidad/:path*',
    '/crm/:path*',
    '/reportes/:path*'
  ]
}
```

## 🔑 API Routes Protegidas

```typescript
// apps/api/src/app/api/facturacion/route.ts
import { NextRequest } from 'next/server'
import { ModuleGuard, getCurrentUser } from '@contafacil/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return Response.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Verificar acceso al módulo
    await ModuleGuard.checkModuleAccess(user.empresaId, 'facturacion')
    
    // Lógica específica del módulo
    const facturas = await getFacturasByEmpresa(user.empresaId)
    
    return Response.json({ facturas })
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 403 })
  }
}
```

## 🎯 Permisos Granulares

```typescript
import { PermissionChecker } from '@contafacil/auth'

// Verificar permiso específico
const canCreate = await PermissionChecker.checkPermission(
  userId,
  empresaId,
  'facturacion',
  'create'
)

// Obtener todos los permisos del usuario
const permissions = await PermissionChecker.getUserPermissions(
  userId,
  empresaId
)
// [{ modulo: 'facturacion', accion: 'create' }, ...]
```

## 📝 Types

### ModuloNombre
```typescript
type ModuloNombre = 
  | 'facturacion'
  | 'pos'
  | 'inventario'
  | 'contabilidad'
  | 'crm'
  | 'reportes'
  | 'admin'
```

### UserWithEmpresa
```typescript
interface UserWithEmpresa {
  id: string
  email: string
  nombre: string
  empresaId: string
  rolId: string
  activo: boolean
  empresa: {
    id: string
    nombre: string
    ruc: string
    plan: 'STARTER' | 'PROFESIONAL' | 'EMPRESARIAL'
    activo: boolean
  }
  rol: {
    id: string
    nombre: string
    descripcion?: string
  }
}
```

## 🔄 Helpers para Clerk

### Actualizar Empresa
```typescript
import { updateUserEmpresa } from '@contafacil/auth'

await updateUserEmpresa(clerkUserId, 'nueva_empresa_id')
```

### Actualizar Rol
```typescript
import { updateUserRol } from '@contafacil/auth'

await updateUserRol(clerkUserId, 'nuevo_rol_id')
```

### Desactivar Usuario
```typescript
import { deactivateUser } from '@contafacil/auth'

await deactivateUser(clerkUserId)
```

## ✅ Criterios de Éxito

- ✅ Clerk configurado con metadata custom
- ✅ Guards para módulos implementados
- ✅ Middleware de protección funcionando
- ✅ Types de usuario definidos
- ✅ Integración completa con Prisma
- ✅ Permisos granulares por módulo
- ✅ Helpers para sincronización Clerk
- ✅ Ejemplos de implementación incluidos

## 🎯 Casos de Uso

1. **Ferretería Pequeña**: Solo POS + Inventario
2. **Empresa Mediana**: POS + Facturación + Contabilidad
3. **Empresa Grande**: Todos los módulos

Cada caso de uso tiene diferentes niveles de acceso y permisos configurados automáticamente. 