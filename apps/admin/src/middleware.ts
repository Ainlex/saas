import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(request) {
    const token = request.nextauth.token;

    // Si no está autenticado, redirige a /login con callbackUrl relativo a /admin
    if (!token) {
      // SIEMPRE usa el dominio del admin
      const loginUrl = new URL('/login', 'http://localhost:3001');
      loginUrl.searchParams.set('callbackUrl', '/admin');
      return NextResponse.redirect(loginUrl);
    }

    // Si no es admin, redirige a /unauthorized
    const userRole = (token as any).rol;
    if (userRole !== 'ADMIN') {
      const unauthorizedUrl = new URL('/unauthorized', 'http://localhost:3001');
      unauthorizedUrl.searchParams.set('reason', 'admin_required');
      return NextResponse.redirect(unauthorizedUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|unauthorized|error).*)'
  ]
}; 