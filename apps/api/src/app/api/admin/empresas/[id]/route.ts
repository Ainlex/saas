import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@contafacil/auth';
import { prisma } from '@contafacil/database';
import { z } from 'zod';

const EmpresaUpdateSchema = z.object({
  nombre: z.string().min(2).max(100).optional(),
  direccion: z.string().min(5).max(200).optional(),
  telefono: z.string().regex(/^\+595\s[0-9]{2,3}\s[0-9]{3}\s[0-9]{3,4}$/).optional(),
  email: z.string().email().optional(),
  activo: z.boolean().optional()
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request);
    
    if (user.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }

    const empresa = await prisma.empresa.findUnique({
      where: { id: params.id },
      include: {
        usuarios: {
          include: {
            rol: true
          }
        },
        modulosActivos: {
          include: {
            modulo: true
          }
        }
      }
    });

    if (!empresa) {
      return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ empresa });
    
  } catch (error) {
    console.error('Error obteniendo empresa:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
}

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
    const validatedData = EmpresaUpdateSchema.parse(body);

    const empresa = await prisma.empresa.update({
      where: { id: params.id },
      data: validatedData
    });

    return NextResponse.json({ empresa });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors }, 
        { status: 400 }
      );
    }
    
    console.error('Error actualizando empresa:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request);
    
    if (user.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }

    // Soft delete - marcar como inactivo
    const empresa = await prisma.empresa.update({
      where: { id: params.id },
      data: { activo: false }
    });

    return NextResponse.json({ empresa });
    
  } catch (error) {
    console.error('Error eliminando empresa:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
} 