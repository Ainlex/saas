'use client'

import React from 'react'
import { signOut } from 'next-auth/react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../common/Button'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export function Header() {
  const { user } = useAuth()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/sign-in' })
  }

  return (
    <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-0">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {user?.name || 'Usuario'}
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Empresa: {user?.empresaId || 'N/A'}
          </span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleSignOut}
            className="flex items-center"
          >
            Salir
            <ChevronDownIcon className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 