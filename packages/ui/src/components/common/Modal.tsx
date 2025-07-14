"use client";
import React from 'react'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative w-full max-w-lg mx-4 rounded-2xl bg-white shadow-2xl flex flex-col max-h-[90vh] animate-fadeIn"
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none z-10"
          aria-label="Cerrar"
        >
          ×
        </button>
        <div className="overflow-y-auto p-8 pt-12 w-full">
          {children}
        </div>
      </div>
    </div>
  )
} 