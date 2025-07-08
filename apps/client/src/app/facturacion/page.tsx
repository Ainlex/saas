'use client'

import { useSession } from 'next-auth/react'
import { useModules } from '@contafacil/ui'

export default function FacturacionPage() {
  const { data: session, status } = useSession()
  const empresaId = session?.user?.empresaId as string
  const { hasModule } = useModules({ 
    empresaId, 
    enabled: status === 'authenticated' 
  })

  if (!hasModule('facturacion')) {
    return <div>Módulo Facturación no disponible</div>
  }

  return (
    <div>
      <h1>Facturación</h1>
      <p>Módulo Facturación funcionando - Próximamente contenido completo</p>
    </div>
  )
} 