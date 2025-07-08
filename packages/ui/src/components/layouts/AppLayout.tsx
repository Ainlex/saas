"use client";
import React, { useState } from 'react'
import { cn } from '../../utils/cn'
import { Sidebar } from './Sidebar'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../common/Button'

interface AppLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
}

export function AppLayout({ 
  children, 
  title, 
  subtitle, 
  actions,
  className 
}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <div>No autenticado</div>
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        className="hidden md:flex"
      />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out md:hidden',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <Sidebar 
          isOpen={true} 
          onToggle={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Page Title */}
              <div className="ml-4">
                {title && (
                  <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                )}
                {subtitle && (
                  <p className="text-sm text-gray-500">{subtitle}</p>
                )}
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {actions}
              
              {/* User Menu */}
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium text-sm">
                      {user?.firstName?.[0] || user?.email[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user?.firstName || user?.email}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className={cn(
          'flex-1 overflow-y-auto p-6',
          className
        )}>
          {children}
        </main>
      </div>
    </div>
  )
} 