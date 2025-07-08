import { clerkClient } from '@clerk/nextjs/server'
import { prisma } from '@contafacil/database'

export interface ClerkUserData {
  email: string
  nombre: string
  empresaId: string
  rolId: string
}

export async function syncUserWithClerk(
  clerkUserId: string,
  userData: ClerkUserData
): Promise<boolean> {
  try {
    // Actualizar publicMetadata en Clerk
    await clerkClient.users.updateUser(clerkUserId, {
      publicMetadata: {
        empresaId: userData.empresaId,
        rolId: userData.rolId
      }
    })

    // Verificar que el usuario existe en nuestra base de datos
    const usuario = await prisma.usuario.findFirst({
      where: {
        id: clerkUserId,
        empresaId: userData.empresaId
      }
    })

    if (!usuario) {
      // Crear usuario en nuestra base de datos si no existe
      await prisma.usuario.create({
        data: {
          id: clerkUserId,
          email: userData.email,
          nombre: userData.nombre,
          empresaId: userData.empresaId,
          rolId: userData.rolId,
          activo: true
        }
      })
    } else {
      // Actualizar datos del usuario si ya existe
      await prisma.usuario.update({
        where: { id: clerkUserId },
        data: {
          email: userData.email,
          nombre: userData.nombre,
          rolId: userData.rolId
        }
      })
    }

    return true
  } catch (error) {
    console.error('Error syncing user with Clerk:', error)
    return false
  }
}

export async function updateUserEmpresa(
  clerkUserId: string,
  empresaId: string
): Promise<boolean> {
  try {
    // Actualizar empresaId en Clerk
    await clerkClient.users.updateUser(clerkUserId, {
      publicMetadata: {
        empresaId
      }
    })

    // Actualizar en nuestra base de datos
    await prisma.usuario.update({
      where: { id: clerkUserId },
      data: { empresaId }
    })

    return true
  } catch (error) {
    console.error('Error updating user empresa:', error)
    return false
  }
}

export async function updateUserRol(
  clerkUserId: string,
  rolId: string
): Promise<boolean> {
  try {
    // Actualizar rolId en Clerk
    await clerkClient.users.updateUser(clerkUserId, {
      publicMetadata: {
        rolId
      }
    })

    // Actualizar en nuestra base de datos
    await prisma.usuario.update({
      where: { id: clerkUserId },
      data: { rolId }
    })

    return true
  } catch (error) {
    console.error('Error updating user rol:', error)
    return false
  }
}

export async function deactivateUser(
  clerkUserId: string
): Promise<boolean> {
  try {
    // Desactivar en Clerk
    await clerkClient.users.updateUser(clerkUserId, {
      publicMetadata: {
        activo: false
      }
    })

    // Desactivar en nuestra base de datos
    await prisma.usuario.update({
      where: { id: clerkUserId },
      data: { activo: false }
    })

    return true
  } catch (error) {
    console.error('Error deactivating user:', error)
    return false
  }
} 