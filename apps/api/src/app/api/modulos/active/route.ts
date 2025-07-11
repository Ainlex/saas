import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserFromHeaders } from '../../../../utils/auth';
import { prisma } from '@contafacil/database';

// Función para generar slug
function generateSlug(name: string): string {
  return name.toLowerCase()
    .replace(/[áàäâã]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöôõ]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

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
      slug: generateSlug(em.modulo.nombre),
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
      { error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
} 