import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@contafacil/auth/config'
import { prisma } from '@contafacil/database'
import * as XLSX from 'xlsx'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.empresaId) {
      return res.status(401).json({ error: 'No autorizado' })
    }
    // Sin verificación de módulo
    const cuentas = await prisma.planCuentas.findMany({
      where: { empresaId: session.user.empresaId, activo: true },
      orderBy: { codigo: 'asc' }
    })
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(
      cuentas.map(cuenta => ({
        'Código': cuenta.codigo,
        'Nombre': cuenta.nombre,
        'Nombre Corto': cuenta.nombreCorto || '',
        'Tipo Mayor': cuenta.tipoMayor,
        'Naturaleza': cuenta.naturaleza,
        'Nivel': cuenta.nivel,
        'Permite Movimiento': cuenta.permiteMovimiento ? 'Sí' : 'No',
        'Moneda': cuenta.monedaPermitida
      }))
    )
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Plan de Cuentas')
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', `attachment; filename="plan-cuentas-${new Date().toISOString().split('T')[0]}.xlsx"`)
    res.send(buffer)
  } catch (error: any) {
    console.error('Export error:', error)
    res.status(500).json({ error: error.message })
  }
} 