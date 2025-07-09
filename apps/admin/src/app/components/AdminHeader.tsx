'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@contafacil/ui';

export function AdminHeader() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    // Redirigir manualmente al login del admin
    router.push('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold admin-text-primary">
            ContaFácil Admin
          </h1>
          {user && (
            <p className="text-sm text-gray-600">
              Panel de administración - {user.name}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">
            {user?.email}
          </span>
          <a 
            href="http://localhost:3000" 
            target="_blank"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Ver Portal Cliente
          </a>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleLogout}
          >
            Salir
          </Button>
        </div>
      </div>
    </header>
  );
} 