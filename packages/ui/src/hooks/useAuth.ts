"use client";

import { useUser } from '@clerk/nextjs'

export interface AuthUser {
  id: string
  email: string
  firstName?: string
  lastName?: string
  empresaId: string
  isSignedIn: boolean
}

export function useAuth() {
  const { user, isLoaded, isSignedIn } = useUser()
  
  const authUser: AuthUser | null = user ? {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress || '',
    firstName: user.firstName || undefined,
    lastName: user.lastName || undefined,
    empresaId: user.publicMetadata?.empresaId as string || '',
    isSignedIn: isSignedIn
  } : null

  return {
    user: authUser,
    isSignedIn: isSignedIn,
    isLoaded: isLoaded,
    empresaId: authUser?.empresaId || '',
  }
} 