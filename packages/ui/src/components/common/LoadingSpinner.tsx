"use client";
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const spinnerVariants = cva(
  'animate-spin rounded-full border-2 border-gray-200',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        default: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
      color: {
        default: 'border-primary-500 border-t-transparent',
        white: 'border-white border-t-transparent',
        gray: 'border-gray-500 border-t-transparent',
      },
    },
    defaultVariants: {
      size: 'default',
      color: 'default',
    },
  }
)

export interface LoadingSpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof spinnerVariants> {
  text?: string
  textClassName?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size,
  color,
  text,
  textClassName,
  ...props
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)} {...props}>
      <div className={cn(spinnerVariants({ size, color }))} />
      {text && (
        <p className={cn('mt-2 text-sm text-gray-600', textClassName)}>
          {text}
        </p>
      )}
    </div>
  )
}

export { LoadingSpinner, spinnerVariants } 