'use client'

import React from 'react'
import { ModuleNavigation } from './ModuleNavigation'

export function Sidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-xl font-bold text-primary-600">
            ContaFácil Paraguay
          </h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ModuleNavigation />
        </nav>
      </div>
    </div>
  )
} 