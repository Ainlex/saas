import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@contafacil/database'
import { z } from 'zod'
import crypto from 'crypto'

const ResetPasswordSchema = z.object({
  email: z.string().email('Email inválido')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = ResetPasswordSchema.parse(body)

    // Buscar usuario
    const usuario = await prisma.usuario.findUnique({
      where: { email },
      include: { empresa: true }
    })

    if (!usuario || !usuario.activo) {
      // Por seguridad, no revelar si el email existe
      return NextResponse.json({ 
        message: 'Si el email existe, recibirás las instrucciones' 
      })
    }

    // Generar token de reset
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetExpires = new Date(Date.now() + 3600000) // 1 hora

    // Guardar token en base de datos
    await prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        resetToken,
        resetTokenExpires: resetExpires
      }
    })

    // TODO: Enviar email con el token
    // Por ahora, solo log para desarrollo
    console.log(`Reset token para ${email}: ${resetToken}`)
    console.log(`Reset URL: ${process.env.NEXTAUTH_URL}/reset-password/change?token=${resetToken}`)

    return NextResponse.json({ 
      message: 'Si el email existe, recibirás las instrucciones' 
    })

  } catch (error) {
    console.error('Error en reset password:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 