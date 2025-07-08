import React from 'react'
import { cn } from '../../utils/cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-soft p-6 border border-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
} 