'use client'

import { useSession } from 'next-auth/react'
import { useModules } from '@contafacil/ui'

export default function InventarioPage() {
  const { data: session, status } = useSession()
  const empresaId = session?.user?.empresaId as string
  const { hasModule } = useModules({ 
    empresaId, 
    enabled: status === 'authenticated' 
  })

  if (!hasModule('inventario')) {
    return <div>Módulo Inventario no disponible</div>
  }

  return (
    <div>
      <h1>Inventario</h1>
      <p>Módulo Inventario funcionando - Próximamente contenido completo</p>
    </div>
  )
} 