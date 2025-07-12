import { prisma } from './client'

// 1. Verificar si hay datos legacy en CuentaContable
async function checkLegacyData(empresaId: string) {
  // Verifica si existe la tabla y datos legacy
  try {
    const count = await prisma.$queryRawUnsafe<number>(
      `SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'cuentas_contables'`
    )
    if (Array.isArray(count) && count.length > 0 && Number(count[0].count) > 0) {
      const legacy = await prisma.$queryRawUnsafe<any[]>(
        `SELECT * FROM cuentas_contables WHERE "empresaId" = $1`, empresaId
      )
      return legacy.length > 0 ? legacy : null
    }
    return null
  } catch {
    return null
  }
}

// 2. Migrar datos legacy al nuevo modelo profesional
async function migratePlanCuentasExistente(empresaId: string) {
  const legacy = await prisma.$queryRawUnsafe<any[]>(
    `SELECT * FROM cuentas_contables WHERE "empresaId" = $1`, empresaId
  )
  if (!legacy || legacy.length === 0) return

  const mapped = legacy.map((c: any) => ({
    empresaId: c.empresaId,
    codigo: c.codigo,
    codigoPadre: c.cuentaPadreId ? legacy.find((l: any) => l.id === c.cuentaPadreId)?.codigo : null,
    nivel: c.nivel,
    nombre: c.nombre,
    nombreCompleto: c.descripcion || c.nombre,
    nombreCorto: c.nombre?.slice(0, 12),
    tipoMayor: c.tipo || 'ACTIVO',
    tipoDetalle: null,
    naturaleza: (c.tipo === 'PASIVO' || c.tipo === 'PATRIMONIO') ? 'ACREEDORA' : 'DEUDORA',
    permiteMovimiento: c.esMovimiento ?? true,
    esAuxiliar: false,
    nivelMaximo: 4,
    monedaPermitida: 'GUARANIES',
    centroCostoObligatorio: false,
    proyectoObligatorio: false,
    requiereReferencia: false,
    requiereCliente: false,
    requiereProveedor: false,
    activo: c.activo ?? true,
    fechaCreacion: c.fechaCreacion ?? new Date(),
    fechaActualizacion: c.fechaActualizacion ?? new Date(),
  }))

  await prisma.planCuentas.createMany({ data: mapped })
}

// 3. Seed plan paraguayo profesional SET
export async function seedPlanCuentasParaguay(empresaId: string) {
  const cuentasParaguay = [
    // ACTIVOS
    { codigo: "1", nombre: "ACTIVO", tipoMayor: "ACTIVO", naturaleza: "DEUDORA", nivel: 1, permiteMovimiento: false },
    { codigo: "1.1", codigoPadre: "1", nombre: "ACTIVO CORRIENTE", tipoMayor: "ACTIVO", tipoDetalle: "Corriente", naturaleza: "DEUDORA", nivel: 2, permiteMovimiento: false },
    { codigo: "1.1.01", codigoPadre: "1.1", nombre: "DISPONIBILIDADES", tipoMayor: "ACTIVO", naturaleza: "DEUDORA", nivel: 3, permiteMovimiento: false },
    { codigo: "1.1.01.001", codigoPadre: "1.1.01", nombre: "Caja", tipoMayor: "ACTIVO", naturaleza: "DEUDORA", nivel: 4, permiteMovimiento: true },
    { codigo: "1.1.01.002", codigoPadre: "1.1.01", nombre: "Banco", tipoMayor: "ACTIVO", naturaleza: "DEUDORA", nivel: 4, permiteMovimiento: true },
    // PASIVOS
    { codigo: "2", nombre: "PASIVO", tipoMayor: "PASIVO", naturaleza: "ACREEDORA", nivel: 1, permiteMovimiento: false },
    { codigo: "2.1", codigoPadre: "2", nombre: "PASIVO CORRIENTE", tipoMayor: "PASIVO", tipoDetalle: "Corriente", naturaleza: "ACREEDORA", nivel: 2, permiteMovimiento: false },
    // ... más cuentas según estándar paraguayo
  ]

  await prisma.planCuentas.createMany({
    data: cuentasParaguay.map((c: any) => ({
      empresaId,
      codigo: c.codigo,
      codigoPadre: c.codigoPadre || null,
      nivel: c.nivel,
      nombre: c.nombre,
      nombreCompleto: c.nombre,
      nombreCorto: c.nombre.slice(0, 12),
      tipoMayor: c.tipoMayor,
      tipoDetalle: c.tipoDetalle || null,
      naturaleza: c.naturaleza,
      permiteMovimiento: c.permiteMovimiento,
      esAuxiliar: false,
      nivelMaximo: 4,
      monedaPermitida: 'GUARANIES',
      centroCostoObligatorio: false,
      proyectoObligatorio: false,
      requiereReferencia: false,
      requiereCliente: false,
      requiereProveedor: false,
      activo: true,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }))
  })
}

// 4. Inicialización dual inteligente
export async function initializePlanCuentas(empresaId: string) {
  const existente = await prisma.planCuentas.count({ where: { empresaId } })
  if (existente === 0) {
    const legacyData = await checkLegacyData(empresaId)
    if (legacyData) {
      await migratePlanCuentasExistente(empresaId)
    } else {
      await seedPlanCuentasParaguay(empresaId)
    }
  }
} 