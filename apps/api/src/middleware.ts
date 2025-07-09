import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Solo aplicar a rutas /api/ (excepto health y auth)
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Permitir endpoints públicos
  const publicEndpoints = ['/api/health', '/api/auth', '/api/info'];
  const isPublicEndpoint = publicEndpoints.some(endpoint => 
    request.nextUrl.pathname.startsWith(endpoint)
  );

  if (isPublicEndpoint) {
    return NextResponse.next();
  }

  // Verificar token JWT
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });

  if (!token || !token.empresaId) {
    return NextResponse.json(
      { error: 'No autenticado' }, 
      { status: 401 }
    );
  }

  // Agregar headers con datos usuario
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', token.sub as string);
  requestHeaders.set('x-empresa-id', token.empresaId as string);
  requestHeaders.set('x-user-rol', token.rol as string);

  return NextResponse.next({
    request: { headers: requestHeaders }
  });
}

export const config = {
  matcher: '/api/:path*'
}; 