import { auth } from '@clerk/nextjs/server'
import { prisma } from '@contafacil/database'
import { UserWithEmpresa } from '../index'

export async function getCurrentUser(): Promise<UserWithEmpresa | null> {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return null
    }

    // Obtener el usuario de Clerk
    const { user } = await auth()
    
    if (!user) {
      return null
    }

    // Extraer empresaId del publicMetadata
    const empresaId = user.publicMetadata?.empresaId as string
    const rolId = user.publicMetadata?.rolId as string

    if (!empresaId || !rolId) {
      return null
    }

    // Obtener datos completos del usuario desde la base de datos
    const usuario = await prisma.usuario.findFirst({
      where: {
        id: userId,
        empresaId,
        activo: true
      },
      include: {
        empresa: true,
        rol: true
      }
    })

    if (!usuario) {
      return null
    }

    return {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      empresaId: usuario.empresaId,
      rolId: usuario.rolId,
      activo: usuario.activo,
      empresa: {
        id: usuario.empresa.id,
        nombre: usuario.empresa.nombre,
        ruc: usuario.empresa.ruc,
        plan: usuario.empresa.plan as 'STARTER' | 'PROFESIONAL' | 'EMPRESARIAL',
        activo: usuario.empresa.activo
      },
      rol: {
        id: usuario.rol.id,
        nombre: usuario.rol.nombre,
        descripcion: undefined
      }
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
} 