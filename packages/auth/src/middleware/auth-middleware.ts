import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../config/auth-config'
import { prisma } from '@contafacil/database'

export interface UserWithEmpresa {
  id: string
  email: string
  nombre: string
  empresaId: string
  rol: string
}

export async function getCurrentUser(request: NextRequest): Promise<UserWithEmpresa> {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    throw new Error('No autenticado')
  }
  
  // VALIDAR: Double-check desde DB para datos actualizados
  const usuario = await prisma.usuario.findUnique({
    where: { email: session.user.email },
    include: { 
      empresa: true,
      rol: true 
    }
  })
  
  if (!usuario || !usuario.activo) {
    throw new Error('Usuario inactivo')
  }
  
  return {
    id: usuario.id,
    email: usuario.email,
    nombre: usuario.nombre,
    empresaId: usuario.empresaId,
    rol: usuario.rol.nombre
  }
} 