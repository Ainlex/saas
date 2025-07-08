"use client";
import React, { createContext, useContext, useState } from 'react'
import { cn } from '../../utils/cn'

interface FormContextType {
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
  touched: Record<string, boolean>
  setTouched: (touched: Record<string, boolean>) => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a Form component')
  }
  return context
}

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: (data: any) => void | Promise<void>
  initialValues?: Record<string, any>
  validationSchema?: any
}

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  initialValues = {},
  validationSchema,
  className,
  ...props
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [values, setValues] = useState(initialValues)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validationSchema) {
      try {
        await validationSchema.validate(values, { abortEarly: false })
        setErrors({})
      } catch (validationErrors: any) {
        const newErrors: Record<string, string> = {}
        validationErrors.inner?.forEach((error: any) => {
          newErrors[error.path] = error.message
        })
        setErrors(newErrors)
        return
      }
    }

    if (onSubmit) {
      await onSubmit(values)
    }
  }

  const contextValue: FormContextType = {
    errors,
    setErrors,
    touched,
    setTouched,
  }

  return (
    <FormContext.Provider value={contextValue}>
      <form
        onSubmit={handleSubmit}
        className={cn('space-y-6', className)}
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
}

export { Form } 