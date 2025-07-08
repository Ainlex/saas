import { NextRequest } from 'next/server'
import { moduleMiddleware } from '../middleware/module-middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Mapeo de rutas a módulos
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