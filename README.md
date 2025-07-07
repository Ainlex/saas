# ContaFácil Paraguay SaaS

Monorepo para la plataforma SaaS de contabilidad ContaFácil Paraguay.

## 🏗️ Estructura del Proyecto

```
contafacil-saas/
├── apps/
│   ├── client/     # Next.js 14 - App clientes (puerto 3000)
│   ├── admin/      # Next.js 14 - Panel admin SaaS (puerto 3001)
│   └── api/        # Next.js 14 - API unificada (puerto 3002)
├── packages/
│   ├── database/   # Prisma + esquemas
│   ├── ui/         # Componentes compartidos
│   ├── modules/    # Lógica módulos
│   ├── auth/       # Guards + middleware
│   └── shared/     # Types + utils
```

## 🚀 Tecnologías

- **Monorepo**: Turborepo + pnpm
- **Frontend**: Next.js 14 con App Router
- **Backend**: Next.js 14 API Routes
- **Base de Datos**: Prisma ORM
- **UI**: Tailwind CSS + Componentes personalizados
- **Lenguaje**: TypeScript (strict mode)
- **Autenticación**: JWT + bcrypt

## 📦 Instalación

```bash
# Instalar pnpm si no lo tienes
npm install -g pnpm

# Instalar dependencias
pnpm install

# Generar tipos de Prisma
pnpm --filter @contafacil/database db:generate
```

## 🛠️ Scripts Disponibles

### Scripts Globales (desde la raíz)
```bash
pnpm dev          # Ejecutar todas las apps en modo desarrollo
pnpm build        # Construir todas las apps
pnpm lint         # Lintear todo el código
pnpm type-check   # Verificar tipos TypeScript
pnpm clean        # Limpiar builds
pnpm format       # Formatear código con Prettier
```

### Scripts por App
```bash
# Cliente (puerto 3000)
pnpm --filter @contafacil/client dev

# Admin (puerto 3001)
pnpm --filter @contafacil/admin dev

# API (puerto 3002)
pnpm --filter @contafacil/api dev
```

## 🔧 Configuración

### Variables de Entorno
Crea archivos `.env.local` en cada app según sea necesario:

```bash
# apps/client/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3002

# apps/admin/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3002

# apps/api/.env.local
DATABASE_URL="postgresql://..."
JWT_SECRET="tu-secreto-jwt"
```

## 📁 Paquetes

### @contafacil/shared
Tipos y utilidades compartidas entre todas las apps.

### @contafacil/database
Configuración de Prisma y esquemas de base de datos.

### @contafacil/ui
Componentes de UI reutilizables con Tailwind CSS.

### @contafacil/auth
Middleware y guards de autenticación.

### @contafacil/modules
Lógica de negocio para usuarios, empresas y contabilidad.

## 🚀 Desarrollo

1. **Iniciar desarrollo**: `pnpm dev`
2. **Cliente**: http://localhost:3000
3. **Admin**: http://localhost:3001
4. **API**: http://localhost:3002

## 📝 Licencia

MIT
