'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function HomePage() {
  const { status } = useSession()
  
  if (status === 'authenticated') {
    redirect('/dashboard')
  } else {
    redirect('/sign-in')
  }
} 