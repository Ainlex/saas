import { NextRequest } from 'next/server';
import { prisma } from '@contafacil/database';

export interface ApiUser {
  id: string;
  email: string;
  nombre: string;
  empresaId: string;
  rol: string;
}

export async function getCurrentUserFromHeaders(request: NextRequest): Promise<ApiUser> {
  const userId = request.headers.get('x-user-id');
  const empresaId = request.headers.get('x-empresa-id');
  const rol = request.headers.get('x-user-rol');

  if (!userId || !empresaId) {
    throw new Error('Headers de autenticación faltantes');
  }

  // Double-check desde DB para datos actualizados
  const usuario = await prisma.usuario.findUnique({
    where: { id: userId },
    include: { empresa: true, rol: true }
  });

  if (!usuario || !usuario.activo) {
    throw new Error('Usuario no encontrado o inactivo');
  }

  return {
    id: usuario.id,
    email: usuario.email,
    nombre: usuario.nombre,
    empresaId: usuario.empresaId,
    rol: usuario.rol.nombre
  };
} 