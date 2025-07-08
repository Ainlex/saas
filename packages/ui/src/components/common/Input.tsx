"use client";
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const inputVariants = cva(
  'flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-300',
        error: 'border-danger-500 focus-visible:ring-danger-500',
        success: 'border-success-500 focus-visible:ring-success-500',
      },
      size: {
        default: 'h-10 px-3 py-2',
        sm: 'h-8 px-2 py-1 text-xs',
        lg: 'h-12 px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  error?: string
  success?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, error, success, ...props }, ref) => {
    const inputVariant = error ? 'error' : success ? 'success' : variant

    return (
      <div className="relative">
        <input
          className={cn(inputVariants({ variant: inputVariant, size, className }))}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-danger-500">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input, inputVariants } 