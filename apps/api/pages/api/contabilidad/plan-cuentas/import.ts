import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@contafacil/auth/config'
import { prisma } from '@contafacil/database'
import * as XLSX from 'xlsx'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.empresaId) {
      return res.status(401).json({ error: 'No autorizado' })
    }

    const { fileData } = req.body
    
    if (!fileData) {
      return res.status(400).json({ error: 'No se encontró archivo' })
    }

    // Convertir base64 a buffer
    const buffer = Buffer.from(fileData, 'base64')
    
    // Leer Excel
    const workbook = XLSX.read(buffer)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json(worksheet)

    let imported = 0
    let errors = 0

    for (const row of data as any[]) {
      try {
        if (!row['Código'] || !row['Nombre']) {
          errors++
          continue
        }

        const codigo = row['Código'].toString()
        const nivel = codigo.split('.').length
        const codigoPadre = nivel > 1 ? codigo.split('.').slice(0, -1).join('.') : null

        await prisma.planCuentas.upsert({
          where: {
            empresaId_codigo: {
              empresaId: session.user.empresaId,
              codigo: codigo
            }
          },
          update: {
            nombre: row['Nombre'],
            nombreCorto: row['Nombre Corto'] || row['Nombre'],
            tipoMayor: row['Tipo Mayor'] || 'ACTIVO',
            naturaleza: row['Naturaleza'] || 'DEUDORA',
            nivel,
            codigoPadre,
            permiteMovimiento: row['Permite Movimiento'] === 'Sí',
            monedaPermitida: row['Moneda'] || 'GUARANIES'
          },
          create: {
            empresaId: session.user.empresaId,
            codigo,
            nombre: row['Nombre'],
            nombreCorto: row['Nombre Corto'] || row['Nombre'],
            tipoMayor: row['Tipo Mayor'] || 'ACTIVO',
            naturaleza: row['Naturaleza'] || 'DEUDORA',
            nivel,
            codigoPadre,
            permiteMovimiento: row['Permite Movimiento'] === 'Sí',
            monedaPermitida: row['Moneda'] || 'GUARANIES',
            activo: true
          }
        })

        imported++
      } catch (error: any) {
        errors++
      }
    }

    res.status(200).json({ imported, errors })
  } catch (error: any) {
    console.error('Import error:', error)
    res.status(500).json({ error: error.message })
  }
} 