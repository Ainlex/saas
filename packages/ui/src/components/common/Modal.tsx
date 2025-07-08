"use client";
import React, { useEffect } from 'react'
import { cn } from '../../utils/cn'
import { Button } from './Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showCloseButton?: boolean
  closeOnBackdrop?: boolean
}

export function Modal({ isOpen, onClose, title, children, size = 'md', showCloseButton = true, closeOnBackdrop = true }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen && typeof document !== 'undefined') {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={closeOnBackdrop ? onClose : undefined}
      />
      
      {/* Modal */}
      <div
        className={cn(
          'relative bg-white rounded-xl shadow-soft w-full mx-4 transition-all duration-300',
          sizeClasses[size],
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
} 