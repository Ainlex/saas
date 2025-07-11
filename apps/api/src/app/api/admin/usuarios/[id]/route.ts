import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@contafacil/auth';
import { prisma } from '@contafacil/database';
import { hash } from 'bcryptjs';
import { z } from 'zod';

const UsuarioUpdateSchema = z.object({
  nombre: z.string().min(2).max(100).optional(),
  apellido: z.string().min(2).max(100).optional(),
  rolId: z.string().optional(),
  activo: z.boolean().optional(),
  newPassword: z.string().min(8).optional()
});

export async function PUT(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request);
    
    if (user.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = UsuarioUpdateSchema.parse(body);

    const updateData: any = { ...validatedData };
    delete updateData.newPassword;

    // Hash nueva contraseña si se proporciona
    if (validatedData.newPassword) {
      updateData.password = await hash(validatedData.newPassword, 12);
    }

    const usuario = await prisma.usuario.update({
      where: { id: params.id },
      data: updateData,
      include: {
        empresa: true,
        rol: true
      }
    });

    return NextResponse.json({ 
      usuario: {
        ...usuario,
        password: undefined
      }
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors }, 
        { status: 400 }
      );
    }
    
    console.error('Error actualizando usuario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
} 