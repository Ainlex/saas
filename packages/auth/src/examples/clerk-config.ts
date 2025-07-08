// Ejemplo de configuración de Clerk con metadata custom
// Este archivo muestra cómo configurar Clerk para trabajar con @contafacil/auth

import { clerkClient } from '@clerk/nextjs/server'

// 1. Configurar usuario con metadata al crear cuenta
export async function setupNewUser(
  clerkUserId: string,
  userData: {
    email: string
    nombre: string
    empresaId: string
    rolId: string
  }
) {
  try {
    // Actualizar metadata en Clerk
    await clerkClient.users.updateUser(clerkUserId, {
      publicMetadata: {
        empresaId: userData.empresaId,
        rolId: userData.rolId
      }
    })

    console.log('Usuario configurado con metadata:', clerkUserId)
    return true
  } catch (error) {
    console.error('Error configurando usuario:', error)
    return false
  }
}

// 2. Webhook para sincronizar datos cuando se crea usuario en Clerk
export async function handleUserCreated(userId: string) {
  try {
    const user = await clerkClient.users.getUser(userId)
    
    // Aquí podrías crear el usuario en tu base de datos
    // y configurar el metadata inicial
    
    console.log('Usuario creado en Clerk:', userId)
  } catch (error) {
    console.error('Error en webhook user.created:', error)
  }
}

// 3. Función para cambiar empresa de usuario
export async function changeUserEmpresa(
  clerkUserId: string,
  nuevaEmpresaId: string
) {
  try {
    // Actualizar metadata en Clerk
    await clerkClient.users.updateUser(clerkUserId, {
      publicMetadata: {
        empresaId: nuevaEmpresaId
      }
    })

    console.log('Empresa actualizada para usuario:', clerkUserId)
    return true
  } catch (error) {
    console.error('Error cambiando empresa:', error)
    return false
  }
}

// 4. Función para cambiar rol de usuario
export async function changeUserRol(
  clerkUserId: string,
  nuevoRolId: string
) {
  try {
    // Actualizar metadata en Clerk
    await clerkClient.users.updateUser(clerkUserId, {
      publicMetadata: {
        rolId: nuevoRolId
      }
    })

    console.log('Rol actualizado para usuario:', clerkUserId)
    return true
  } catch (error) {
    console.error('Error cambiando rol:', error)
    return false
  }
}

// 5. Configuración de webhooks en Clerk Dashboard
export const WEBHOOK_CONFIG = {
  // En Clerk Dashboard, configurar estos webhooks:
  // - user.created
  // - user.updated
  // - user.deleted
  
  // URL del webhook: https://tu-dominio.com/api/webhooks/clerk
  
  // Eventos a escuchar:
  events: [
    'user.created',
    'user.updated',
    'user.deleted'
  ]
}

// 6. Ejemplo de webhook handler
export async function handleClerkWebhook(
  event: string,
  data: any
) {
  switch (event) {
    case 'user.created':
      await handleUserCreated(data.id)
      break
      
    case 'user.updated':
      // Manejar actualizaciones de usuario
      console.log('Usuario actualizado:', data.id)
      break
      
    case 'user.deleted':
      // Manejar eliminación de usuario
      console.log('Usuario eliminado:', data.id)
      break
      
    default:
      console.log('Evento no manejado:', event)
  }
} 