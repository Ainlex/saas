'use client'

import { useSession } from 'next-auth/react'
import { useModules } from '@contafacil/ui'

export default function POSPage() {
  const { data: session, status } = useSession()
  const empresaId = session?.user?.empresaId as string
  const { hasModule } = useModules({ 
    empresaId, 
    enabled: status === 'authenticated' 
  })

  if (!hasModule('pos')) {
    return <div>Módulo POS no disponible</div>
  }

  return (
    <div>
      <h1>Punto de Venta</h1>
      <p>Módulo POS funcionando - Próximamente contenido completo</p>
    </div>
  )
} 