# ContaFácil Paraguay - API

API unificada para la plataforma SaaS de contabilidad ContaFácil Paraguay.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev

# Verificar implementación
pnpm verify

# Ejecutar tests
pnpm test:api
```

## 📡 Endpoints

### Públicos

#### `GET /api/health`
Health check de la API.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "contafacil-api"
}
```

#### `GET /`
Información general de la API.

**Response:**
```json
{
  "message": "ContaFácil Paraguay API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/health",
    "auth": "/api/auth",
    "modules": "/api/modulos",
    "pos": "/api/pos"
  }
}
```

### Protegidos (Requieren autenticación)

#### `GET /api/auth/user`
Obtiene información del usuario autenticado.

**Headers requeridos:**
- `Authorization: Bearer <jwt-token>`

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "nombre": "Juan Pérez",
    "empresaId": "empresa_id",
    "rol": "ADMIN"
  }
}
```

#### `GET /api/modulos/active`
Lista los módulos activos para la empresa del usuario.

**Headers requeridos:**
- `Authorization: Bearer <jwt-token>`

**Response:**
```json
{
  "modulos": [
    {
      "id": "modulo_id",
      "nombre": "pos",
      "displayName": "Punto de Venta",
      "descripcion": "Sistema POS táctil",
      "icono": "🛒",
      "color": "#3B82F6",
      "activo": true,
      "fechaActivacion": "2024-01-15T10:30:00.000Z",
      "rutas": [
        {
          "ruta": "/pos",
          "nombre": "Punto de Venta",
          "activo": true
        }
      ]
    }
  ]
}
```

#### `GET /api/pos`
Endpoint específico del módulo POS (ejemplo).

**Headers requeridos:**
- `Authorization: Bearer <jwt-token>`

**Response:**
```json
{
  "data": {
    "message": "Módulo POS accesible",
    "empresaId": "empresa_id",
    "usuario": "Juan Pérez",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🔐 Autenticación

La API utiliza **JWT tokens** para autenticación. Todos los endpoints protegidos requieren:

1. **Token válido** en el header `Authorization: Bearer <token>`
2. **Usuario activo** en la base de datos
3. **Empresa asociada** al usuario

### Middleware de Autenticación

El middleware global (`src/middleware.ts`) se ejecuta en todas las rutas `/api/*` y:

- ✅ Permite acceso a endpoints públicos (`/api/health`, `/api/auth`)
- 🔒 Bloquea acceso no autenticado a endpoints protegidos
- 📋 Agrega headers con datos del usuario:
  - `x-user-id`: ID del usuario
  - `x-empresa-id`: ID de la empresa
  - `x-user-rol`: Rol del usuario

## 🧩 Sistema de Módulos

### ApiModuleGuard

Para proteger endpoints específicos de módulos:

```typescript
import { ApiModuleGuard } from '../utils/module-guard';

export async function GET(request: NextRequest) {
  try {
    // Verifica acceso al módulo y obtiene usuario
    const user = await ApiModuleGuard.requireModuleAccess(request, 'pos');
    
    // Lógica específica del módulo...
    
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 403 }
    );
  }
}
```

### Módulos Disponibles

- `pos` - Punto de Venta
- `inventario` - Inventario
- `facturacion` - Facturación
- `contabilidad` - Contabilidad
- `crm` - CRM
- `reportes` - Reportes

## 🛠️ Desarrollo

### Estructura de Archivos

```
apps/api/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── health/route.ts
│   │   │   ├── auth/user/route.ts
│   │   │   ├── modulos/active/route.ts
│   │   │   └── pos/route.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── utils/
│   │   ├── auth.ts
│   │   └── module-guard.ts
│   └── middleware.ts
├── scripts/
│   ├── test-api.ts
│   └── verify-setup.ts
└── package.json
```

### Scripts Disponibles

- `pnpm dev` - Servidor de desarrollo (puerto 3002)
- `pnpm build` - Construir para producción
- `pnpm start` - Servidor de producción
- `pnpm verify` - Verificar implementación completa
- `pnpm test:api` - Tests básicos de endpoints

### Variables de Entorno

```bash
# .env.local
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="tu-secreto-jwt"
NEXTAUTH_URL="http://localhost:3002"
```

## 🔧 Configuración

### CORS

La API está configurada para permitir requests desde:
- `http://localhost:3000` (cliente)
- `http://localhost:3001` (admin)
- Cualquier origen en desarrollo

### TranspilePackages

Next.js está configurado para transpilar los paquetes del monorepo:
- `@contafacil/auth`
- `@contafacil/database`
- `@contafacil/shared`

## 📊 Monitoreo

### Health Check

El endpoint `/api/health` proporciona:
- Estado del servicio
- Timestamp de respuesta
- Información de versión

### Logs

La API registra:
- Requests a endpoints protegidos
- Errores de autenticación
- Accesos denegados a módulos

## 🚀 Próximos Pasos

1. **Implementar endpoints específicos** para cada módulo
2. **Agregar validación de datos** con Zod
3. **Implementar rate limiting**
4. **Agregar métricas y monitoreo**
5. **Documentación con OpenAPI/Swagger**

## 📝 Notas

- **Puerto**: 3002 (para no conflictar con otras apps)
- **Base de datos**: PostgreSQL con Prisma ORM
- **Autenticación**: NextAuth.js con JWT
- **CORS**: Configurado para comunicación entre apps
- **TypeScript**: Modo estricto habilitado 