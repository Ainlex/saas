import { useSession } from 'next-auth/react'

export function useAuth() {
  const { data: session } = useSession()
  
  return {
    user: session?.user || null,
    isAuthenticated: !!session,
    empresaId: (session?.user as any)?.empresaId || null,
    rol: (session?.user as any)?.rol || null
  }
} 