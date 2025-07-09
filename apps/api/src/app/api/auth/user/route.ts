import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserFromHeaders } from '../../../../utils/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUserFromHeaders(request);
    
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        empresaId: user.empresaId,
        rol: user.rol
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
} 