"use client";
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const spinnerVariants = cva(
  'animate-spin rounded-full border-2 border-gray-200',
  {
    variants: {
      size: {
        sm: 'h-4 w-4 border-2',
        md: 'h-6 w-6 border-2',
        lg: 'h-8 w-8 border-3'
      },
      color: {
        primary: 'border-t-primary-600',
        secondary: 'border-t-secondary-600',
        white: 'border-t-white'
      }
    },
    defaultVariants: {
      size: 'md',
      color: 'primary'
    }
  }
)

export interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string
}

export function LoadingSpinner({ size, color, className }: LoadingSpinnerProps) {
  return (
    <div className={cn(spinnerVariants({ size, color }), className)}>
      <div className="sr-only">Cargando...</div>
    </div>
  )
} 