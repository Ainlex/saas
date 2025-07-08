import { prisma } from '@contafacil/database'
import { ModuloNombre } from '../index'

export class PermissionChecker {
  static async checkPermission(
    userId: string,
    empresaId: string,
    moduloNombre: ModuloNombre,
    accion: string
  ): Promise<boolean> {
    try {
      // Verificar que el usuario tiene acceso al módulo
      const usuario = await prisma.usuario.findFirst({
        where: {
          id: userId,
          empresaId,
          activo: true
        },
        include: {
          rol: {
            include: {
              rolPermisos: {
                include: {
                  moduloPermiso: {
                    include: {
                      modulo: true
                    }
                  }
                }
              }
            }
          }
        }
      })

      if (!usuario) {
        return false
      }

      // Buscar el permiso específico
      const tienePermiso = usuario.rol.rolPermisos.some(rp => 
        rp.activo &&
        rp.moduloPermiso.activo &&
        rp.moduloPermiso.modulo.nombre === moduloNombre &&
        rp.moduloPermiso.accion === accion
      )

      return tienePermiso
    } catch (error) {
      console.error('Error checking permission:', error)
      return false
    }
  }

  static async getUserPermissions(
    userId: string,
    empresaId: string
  ): Promise<Array<{ modulo: string; accion: string }>> {
    try {
      const usuario = await prisma.usuario.findFirst({
        where: {
          id: userId,
          empresaId,
          activo: true
        },
        include: {
          rol: {
            include: {
              rolPermisos: {
                include: {
                  moduloPermiso: {
                    include: {
                      modulo: true
                    }
                  }
                }
              }
            }
          }
        }
      })

      if (!usuario) {
        return []
      }

      return usuario.rol.rolPermisos
        .filter(rp => rp.activo && rp.moduloPermiso.activo)
        .map(rp => ({
          modulo: rp.moduloPermiso.modulo.nombre,
          accion: rp.moduloPermiso.accion
        }))
    } catch (error) {
      console.error('Error getting user permissions:', error)
      return []
    }
  }

  static async hasModulePermission(
    userId: string,
    empresaId: string,
    moduloNombre: ModuloNombre,
    accion: string
  ): Promise<boolean> {
    return this.checkPermission(userId, empresaId, moduloNombre, accion)
  }
} 