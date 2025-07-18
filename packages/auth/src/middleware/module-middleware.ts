import { NextRequest, NextResponse } from 'next/server'
import { ModuleGuard, ModuloNombre } from '../guards/module-guard'
import { getCurrentUser } from './auth-middleware'

export async function moduleMiddleware(
  request: NextRequest,
  moduleName: string
) {
  try {
    const user = await getCurrentUser(request)
    
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    const hasAccess = await ModuleGuard.checkModuleAccess(
      user.empresaId,
      moduleName as ModuloNombre,
      false
    )
    
    if (!hasAccess) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
    
    return NextResponse.next()
  } catch (error) {
    console.error('Module middleware error:', error)
    return NextResponse.redirect(new URL('/error', request.url))
  }
} 