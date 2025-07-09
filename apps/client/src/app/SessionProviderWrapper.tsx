'use client'
import { SessionProvider } from 'next-auth/react'

export default function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider 
      session={undefined}
      basePath="/api/auth"
    >
      {children}
    </SessionProvider>
  )
} 