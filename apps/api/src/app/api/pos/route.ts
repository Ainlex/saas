import { NextRequest, NextResponse } from 'next/server';
import { ApiModuleGuard } from '../../../utils/module-guard';

export async function GET(request: NextRequest) {
  try {
    const user = await ApiModuleGuard.requireModuleAccess(request, 'pos');
    
    // Lógica específica del módulo POS
    const data = {
      message: 'Módulo POS accesible',
      empresaId: user.empresaId,
      usuario: user.nombre,
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json({ data });
    
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 403 }
    );
  }
} 