# @contafacil/auth

## Configuración NextAuth

Este paquete provee la configuración y guards de autenticación para ContaFácil Paraguay usando NextAuth y Prisma.

### Uso básico

1. Importa la configuración en tu API:

```ts
import NextAuth from 'next-auth'
import { authOptions } from '@contafacil/auth/config'

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

2. Usa los guards y middleware:

```ts
import { getCurrentUser, moduleMiddleware, ModuleGuard } from '@contafacil/auth'
```

## Guards de módulos

- `ModuleGuard.checkModuleAccess(empresaId, moduloNombre)`
- `moduleMiddleware(request, moduleName)`

## Ejemplo de uso en API Route

```ts
import { moduleMiddleware } from '@contafacil/auth'

export async function GET(request: NextRequest) {
  return moduleMiddleware(request, 'facturacion')
}
```

## Troubleshooting

- Verifica que las dependencias estén instaladas: `next-auth`, `@auth/prisma-adapter`, `@contafacil/database`.
- Si tienes errores de import, revisa los paths y la estructura del monorepo.
- Asegúrate de que la base de datos esté migrada y accesible.

---

© ContaFácil Paraguay 