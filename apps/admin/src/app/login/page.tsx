'use client';

import { signIn, getSession, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Input, LoadingSpinner } from '@contafacil/ui';

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  let callbackUrl = searchParams.get('callbackUrl') || '/admin';
  if (!callbackUrl.startsWith('/')) {
    callbackUrl = '/admin';
  }

  useEffect(() => {
    if (status === 'authenticated' && (session?.user as any)?.rol === 'ADMIN') {
      router.replace('/admin');
    }
  }, [status, session, router]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError('Credenciales inválidas');
      } else {
        // Verificar sesión y rol
        const session = await getSession();
        if (session && (session.user as any).rol === 'ADMIN') {
          router.push(callbackUrl);
        } else {
          setError('Acceso denegado - Se requieren permisos de administrador');
        }
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold admin-text-primary">Panel Admin</h1>
          <p className="mt-2 text-gray-600">ContaFácil Paraguay</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email Administrador"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full admin-primary"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : 'Acceder al Panel'}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Acceso restringido solo para administradores
        </div>
      </div>
    </div>
  );
} 