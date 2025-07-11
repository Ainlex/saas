'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@contafacil/ui';
import Link from 'next/link';
import { Suspense } from 'react';

function UnauthorizedContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');

  const getMessage = () => {
    switch (reason) {
      case 'admin_required':
        return 'Se requieren permisos de administrador para acceder al panel';
      default:
        return 'No tienes permisos para acceder a esta sección';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow-md text-center">
        <div className="text-6xl">🚫</div>
        <h1 className="text-2xl font-bold text-gray-900">
          Acceso Denegado
        </h1>
        <p className="text-gray-600">
          {getMessage()}
        </p>
        <div className="space-y-3">
          <Link href="/login">
            <Button className="w-full admin-primary">
              Iniciar Sesión como Admin
            </Button>
          </Link>
          <Link href="http://localhost:3000">
            <Button variant="secondary" className="w-full">
              Ir al Portal Cliente
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminUnauthorizedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow-md text-center">
          <div className="text-6xl">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900">
            Acceso Denegado
          </h1>
          <p className="text-gray-600">
            Cargando...
          </p>
        </div>
      </div>
    }>
      <UnauthorizedContent />
    </Suspense>
  );
} 