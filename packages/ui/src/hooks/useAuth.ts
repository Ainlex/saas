"use client";

import { useSession } from 'next-auth/react'

export interface AuthUser {
  id: string
  email: string
  name: string
  empresaId: string
  rol: string
}

export function useAuth() {
  const { data: session, status } = useSession()
  
  const user: AuthUser | null = session?.user ? {
    id: (session.user as any).id || '',
    email: session.user.email || '',
    name: session.user.name || '',
    empresaId: (session.user as any).empresaId || '',
    rol: (session.user as any).rol || ''
  } : null
  
  return {
    user,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
    empresaId: user?.empresaId || null
  }
} 