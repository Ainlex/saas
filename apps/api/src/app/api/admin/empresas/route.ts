import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@contafacil/auth';
import { prisma } from '@contafacil/database';
import { z } from 'zod';

// Schema de validación para empresas paraguayas
const EmpresaSchema = z.object({
  nombre: z.string().min(2, 'Nombre debe tener al menos 2 caracteres').max(100),
  ruc: z.string().regex(/^[0-9]{6,8}-[0-9]$/, 'RUC debe tener formato: 12345678-9'),
  direccion: z.string().min(5, 'Dirección requerida').max(200),
  telefono: z.string().regex(/^\+595\s[0-9]{2,3}\s[0-9]{3}\s[0-9]{3,4}$/, 'Formato: +595 21 123 4567'),
  email: z.string().email('Email inválido'),
  activo: z.boolean().default(true)
});

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    
    // Solo administradores pueden ver empresas
    if (user.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }

    const empresas = await prisma.empresa.findMany({
      include: {
        usuarios: {
          select: {
            id: true,
            nombre: true,
            email: true,
            activo: true
          }
        },
        _count: {
          select: {
            usuarios: true,
            modulosActivos: {
              where: { activo: true }
            }
          }
        }
      },
      orderBy: { fechaCreacion: 'desc' }
    });

    return NextResponse.json({ empresas });
    
  } catch (error) {
    console.error('Error obteniendo empresas:', error);
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
    const validatedData = EmpresaSchema.parse(body);

    // Verificar RUC único
    const existingRuc = await prisma.empresa.findUnique({
      where: { ruc: validatedData.ruc }
    });

    if (existingRuc) {
      return NextResponse.json(
        { error: 'RUC ya registrado' }, 
        { status: 400 }
      );
    }

    // Crear empresa
    const empresa = await prisma.empresa.create({
      data: {
        ...validatedData,
        plan: 'PROFESIONAL' // Plan por defecto
      }
    });

    return NextResponse.json({ empresa }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors }, 
        { status: 400 }
      );
    }
    
    console.error('Error creando empresa:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
} 