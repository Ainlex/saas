'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@contafacil/ui';
import Link from 'next/link';

export default function UnauthorizedPage() {
  const searchParams = useSearchParams();
  const module = searchParams.get('module');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow-md text-center">
        <div className="text-6xl">🔒</div>
        <h1 className="text-2xl font-bold text-gray-900">
          Acceso Denegado
        </h1>
        <p className="text-gray-600">
          {module 
            ? `No tienes acceso al módulo: ${module.toUpperCase()}`
            : 'No tienes permisos para acceder a esta página'
          }
        </p>
        <p className="text-sm text-gray-500">
          Contacta al administrador para activar este módulo en tu cuenta.
        </p>
        <Link href="/dashboard">
          <Button>Volver al Dashboard</Button>
        </Link>
      </div>
    </div>
  );
} 