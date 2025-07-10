"use client";
import React from 'react'
import { clsx } from 'clsx'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Switch({ 
  checked, 
  onChange, 
  disabled = false,
  className,
  size = 'md'
}: SwitchProps) {
  const sizes = {
    sm: 'w-8 h-4',
    md: 'w-11 h-6',
    lg: 'w-14 h-7'
  }

  const dotSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={clsx(
        'relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        sizes[size],
        checked 
          ? 'bg-primary-600' 
          : 'bg-gray-200',
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && 'cursor-pointer',
        className
      )}
    >
      <span
        className={clsx(
          'inline-block transform transition-transform bg-white rounded-full shadow-sm',
          dotSizes[size],
          checked 
            ? size === 'sm' ? 'translate-x-4' : size === 'md' ? 'translate-x-5' : 'translate-x-7'
            : 'translate-x-0.5'
        )}
      />
    </button>
  )
} 