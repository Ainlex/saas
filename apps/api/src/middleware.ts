import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/api/auth', '/api/modulos/active']
  
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )
  
  if (isPublicRoute) {
    return NextResponse.next()
  }
  
  // Para otras rutas, verificar autenticación
  // TODO: Implementar verificación de sesión NextAuth
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/(.*)',
  ],
}; 