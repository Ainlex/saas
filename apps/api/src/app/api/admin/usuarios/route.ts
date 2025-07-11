import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@contafacil/auth';
import { prisma } from '@contafacil/database';
import { hash } from 'bcryptjs';
import { z } from 'zod';

const UsuarioSchema = z.object({
  nombre: z.string().min(2, 'Nombre requerido').max(100),
  apellido: z.string().min(2, 'Apellido requerido').max(100),
  email: z.string().email('Email inválido'),
  empresaId: z.string().min(1, 'Empresa requerida'),
  rolId: z.string().min(1, 'Rol requerido'),
  activo: z.boolean().default(true),
  password: z.string().min(8, 'Contraseña debe tener al menos 8 caracteres').optional()
});

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    
    if (user.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const empresaId = searchParams.get('empresaId');

    const whereClause = empresaId ? { empresaId } : {};

    const usuarios = await prisma.usuario.findMany({
      where: whereClause,
      include: {
        empresa: {
          select: {
            id: true,
            nombre: true,
            ruc: true
          }
        },
        rol: {
          select: {
            id: true,
            nombre: true,
            descripcion: true
          }
        }
      },
      orderBy: { id: 'desc' }
    });

    return NextResponse.json({ usuarios });
    
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    
    if (user.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = UsuarioSchema.parse(body);

    // Verificar email único
    const existingEmail = await prisma.usuario.findUnique({
      where: { email: validatedData.email }
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email ya registrado' }, 
        { status: 400 }
      );
    }

    // Generar contraseña temporal si no se proporciona
    const password = validatedData.password || generateTempPassword();
    const hashedPassword = await hash(password, 12);

    const usuario = await prisma.usuario.create({
      data: {
        nombre: validatedData.nombre,
        apellido: validatedData.apellido,
        email: validatedData.email,
        password: hashedPassword,
        empresaId: validatedData.empresaId,
        rolId: validatedData.rolId,
        activo: validatedData.activo
      },
      include: {
        empresa: true,
        rol: true
      }
    });

    // TODO: Enviar email con credenciales (implementar en siguiente versión)
    
    return NextResponse.json({ 
      usuario: {
        ...usuario,
        password: undefined // No devolver hash
      },
      tempPassword: password // Para mostrar al admin
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors }, 
        { status: 400 }
      );
    }
    
    console.error('Error creando usuario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
}

function generateTempPassword(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
} 