"use client";
import React from 'react'
import { Input } from '../common/Input'
import { useFormContext } from './Form'
import { cn } from '../../utils/cn'

export interface FormFieldProps {
  name: string
  label?: string
  placeholder?: string
  type?: string
  required?: boolean
  disabled?: boolean
  className?: string
  labelClassName?: string
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
  required = false,
  disabled = false,
  className,
  labelClassName,
  ...props
}) => {
  const { errors, touched, setTouched } = useFormContext()

  const handleBlur = () => {
    const newTouched = { ...touched, [name]: true }
    setTouched(newTouched)
  }

  const error = errors[name]
  const isTouched = touched[name]

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            'block text-sm font-medium text-gray-700 mb-1',
            labelClassName
          )}
        >
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        error={isTouched ? error : undefined}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  )
}

export { FormField } 