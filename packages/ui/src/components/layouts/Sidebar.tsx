import React, { useState } from 'react'
import { cn } from '../../utils/cn'
import { ModuleNavigation } from './ModuleNavigation'
import { useAuth } from '../../hooks/useAuth'

interface SidebarProps {
  isOpen?: boolean
  onToggle?: () => void
  className?: string
}

export function Sidebar({ isOpen = true, onToggle, className }: SidebarProps) {
  const { user } = useAuth()

  return (
    <div
      className={cn(
        'flex flex-col bg-white border-r border-gray-200 transition-all duration-300',
        isOpen ? 'w-64' : 'w-16',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {isOpen && (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CF</span>
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-gray-900">ContaFácil</h1>
              <p className="text-xs text-gray-500">Paraguay</p>
            </div>
          </div>
        )}
        
        {!isOpen && (
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">CF</span>
          </div>
        )}

        {onToggle && (
          <button
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M4 6h16M4 12h16M4 18h16" : "M4 6h16M4 12h8M4 18h16"}
              />
            </svg>
          </button>
        )}
      </div>

      {/* User Info */}
      {isOpen && user && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium text-sm">
                {user.firstName?.[0] || user.email[0].toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.email}
              </p>
              <p className="text-xs text-gray-500">Usuario</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {isOpen ? (
            <ModuleNavigation />
          ) : (
            <div className="space-y-2">
              {/* Iconos compactos para modo colapsado */}
              <div className="flex flex-col items-center space-y-4">
                <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {isOpen && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            ContaFácil v1.0.0
          </div>
        </div>
      )}
    </div>
  )
} 