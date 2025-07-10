'use client';

import { useSession, signOut } from 'next-auth/react';

export function AppHeader() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-primary-blue">ContaFácil</h1>
          {user && (
            <p className="text-sm text-gray-600">
              {user.name} - {user.empresaId}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">
            {user?.email}
          </span>
          <button
            className="inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 px-3 py-1.5 text-sm rounded-md"
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}