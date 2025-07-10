import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserFromHeaders } from '../../../../utils/auth';
import { prisma } from '@contafacil/database';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUserFromHeaders(request);
    
    if (user.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }

    const roles = await prisma.rol.findMany({
      where: { activo: true },
      orderBy: { nombre: 'asc' }
    });

    return NextResponse.json({ roles });
    
  } catch (error) {
    console.error('Error obteniendo roles:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
} 