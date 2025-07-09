import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserFromHeaders } from '../../../../utils/auth';
import { prisma } from '@contafacil/database';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUserFromHeaders(request);
    
    // Obtener módulos activos de la empresa
    const modulosActivos = await prisma.empresaModulo.findMany({
      where: {
        empresaId: user.empresaId,
        activo: true,
        modulo: {
          activo: true
        }
      },
      include: {
        modulo: {
          include: {
            rutas: true
          }
        }
      },
      orderBy: {
        modulo: {
          orden: 'asc'
        }
      }
    });

    const modulos = modulosActivos.map(em => ({
      id: em.modulo.id,
      nombre: em.modulo.nombre,
      displayName: em.modulo.displayName,
      descripcion: em.modulo.descripcion,
      icono: em.modulo.icono,
      color: em.modulo.color,
      activo: em.activo,
      fechaActivacion: em.fechaActivacion,
      rutas: em.modulo.rutas.map(r => ({
        ruta: r.ruta,
        nombre: r.nombre,
        activo: r.activo
      }))
    }));

    return NextResponse.json({ modulos });
    
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
} 