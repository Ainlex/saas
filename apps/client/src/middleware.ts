import { NextRequest, NextResponse } from 'next/server';

const moduleRoutes = ['/pos', '/inventario', '/facturacion', '/contabilidad', '/crm', '/reportes'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir rutas públicas
  const publicRoutes = ['/login', '/unauthorized', '/error', '/reset-password', '/'];
  if (publicRoutes.includes(pathname) || pathname.startsWith('/reset-password')) {
    return NextResponse.next();
  }

  // Verificar si hay cookie de sesión
  const sessionCookie = request.cookies.get('next-auth.session-token') || 
                       request.cookies.get('__Secure-next-auth.session-token');

  // Si no hay sesión, redirigir a login
  if (!sessionCookie) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protección de rutas de módulos
  const matchedModule = moduleRoutes.find(route => pathname.startsWith(route));
  if (matchedModule) {
    // Consultar la API de módulos activos
    try {
      const apiUrl = process.env.API_URL || 'http://localhost:3002';
      const response = await fetch(`${apiUrl}/api/modulos/active`, {
        headers: {
          'Cookie': request.headers.get('cookie') || ''
        },
        cache: 'no-store'
      });
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          const unauthorizedUrl = new URL('/unauthorized', request.url);
          unauthorizedUrl.searchParams.set('module', matchedModule.replace('/', ''));
          return NextResponse.redirect(unauthorizedUrl);
        }
        // Otro error inesperado
        const errorUrl = new URL('/error', request.url);
        errorUrl.searchParams.set('code', 'MODULE_ERROR');
        errorUrl.searchParams.set('message', 'Error verificando módulos activos');
        return NextResponse.redirect(errorUrl);
      }
      const { modulos } = await response.json();
      const hasModule = modulos.some((m: any) => m.nombre === matchedModule.replace('/', ''));
      if (!hasModule) {
        const unauthorizedUrl = new URL('/unauthorized', request.url);
        unauthorizedUrl.searchParams.set('module', matchedModule.replace('/', ''));
        return NextResponse.redirect(unauthorizedUrl);
      }
    } catch (error) {
      const errorUrl = new URL('/error', request.url);
      errorUrl.searchParams.set('code', 'NETWORK_ERROR');
      errorUrl.searchParams.set('message', 'Error verificando módulos activos');
      return NextResponse.redirect(errorUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}; 