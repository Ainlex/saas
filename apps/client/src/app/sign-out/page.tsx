"use client";
import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

export default function SignOutPage() {
  useEffect(() => {
    signOut({ callbackUrl: '/sign-in' })
  }, [])
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-2">Cerrando sesión...</h1>
        <p className="text-gray-600">Serás redirigido en unos segundos</p>
      </div>
    </div>
  )
} 