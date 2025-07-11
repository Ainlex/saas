import { NextRequest } from 'next/server';
import { getCurrentUser } from '@contafacil/auth';
import { prisma } from '@contafacil/database';

export class ApiModuleGuard {
  static async checkModuleAccess(
    request: NextRequest, 
    moduleNombre: string
  ): Promise<{ user: any; hasAccess: boolean }> {
    const user = await getCurrentUser(request);
    
    const moduleAccess = await prisma.empresaModulo.findFirst({
      where: {
        empresaId: user.empresaId,
        modulo: { 
          nombre: moduleNombre,
          activo: true
        },
        activo: true
      }
    });

    return {
      user,
      hasAccess: !!moduleAccess
    };
  }

  static async requireModuleAccess(request: NextRequest, moduleNombre: string) {
    const { user, hasAccess } = await this.checkModuleAccess(request, moduleNombre);
    
    if (!hasAccess) {
      throw new Error(`Acceso denegado al módulo: ${moduleNombre}`);
    }
    
    return user;
  }
} 