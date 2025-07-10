import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@contafacil/auth'
import { prisma } from '@contafacil/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request)
    
    if (user.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    // Comentado hasta que se aplique la migración de ModuloHistorico
    // const historico = await prisma.moduloHistorico.findMany({
    //   where: { empresaId: params.id },
    //   include: {
    //     modulo: true,
    //     usuario: {
    //       select: { nombre: true, email: true }
    //     }
    //   },
    //   orderBy: { fechaCreacion: 'desc' },
    //   take: 50 // Últimos 50 cambios
    // })

    return NextResponse.json({ historico: [] })

  } catch (error) {
    console.error('Error obteniendo histórico:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
} 