import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Solo importar en runtime para evitar problemas de build
    const { getCurrentUser } = await import('@contafacil/auth')
    const user = await getCurrentUser(request)
    
    return Response.json({
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      empresaId: user.empresaId,
      rol: user.rol
    })
  } catch (error) {
    return Response.json(
      { error: (error as Error).message }, 
      { status: 401 }
    )
  }
} 