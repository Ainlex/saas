'use client';
import { useSession } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user ? {
      id: (session.user as any).id || '',
      email: session.user.email || '',
      name: session.user.name || '',
      empresaId: (session.user as any).empresaId || '',
      rol: (session.user as any).rol || ''
    } : null,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
    empresaId: (session?.user as any)?.empresaId || null,
    rol: (session?.user as any)?.rol || null
  };
} 