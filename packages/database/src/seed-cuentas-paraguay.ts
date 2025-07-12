import { PrismaClient } from './generated'

const prisma = new PrismaClient()

export const PLAN_CUENTAS_PARAGUAY = [
  // ACTIVOS - Nivel 1
  { codigo: '1', nombre: 'ACTIVO', tipo: 'ACTIVO', nivel: 1, esMovimiento: false },
  { codigo: '1.1', nombre: 'ACTIVO CORRIENTE', tipo: 'ACTIVO', nivel: 2, esMovimiento: false, padre: '1' },
  { codigo: '1.1.01', nombre: 'DISPONIBILIDADES', tipo: 'ACTIVO', nivel: 3, esMovimiento: false, padre: '1.1' },
  { codigo: '1.1.01.001', nombre: 'Caja', tipo: 'ACTIVO', nivel: 4, esMovimiento: true, padre: '1.1.01' },
  { codigo: '1.1.01.002', nombre: 'Banco Cuenta Corriente', tipo: 'ACTIVO', nivel: 4, esMovimiento: true, padre: '1.1.01' },
  { codigo: '1.1.01.003', nombre: 'Banco Caja de Ahorro', tipo: 'ACTIVO', nivel: 4, esMovimiento: true, padre: '1.1.01' },
  
  { codigo: '1.1.02', nombre: 'CRÉDITOS', tipo: 'ACTIVO', nivel: 3, esMovimiento: false, padre: '1.1' },
  { codigo: '1.1.02.001', nombre: 'Deudores por Ventas', tipo: 'ACTIVO', nivel: 4, esMovimiento: true, padre: '1.1.02' },
  { codigo: '1.1.02.002', nombre: 'Documentos a Cobrar', tipo: 'ACTIVO', nivel: 4, esMovimiento: true, padre: '1.1.02' },
  { codigo: '1.1.02.003', nombre: 'IVA Crédito Fiscal', tipo: 'ACTIVO', nivel: 4, esMovimiento: true, padre: '1.1.02' },
  
  // PASIVOS
  { codigo: '2', nombre: 'PASIVO', tipo: 'PASIVO', nivel: 1, esMovimiento: false },
  { codigo: '2.1', nombre: 'PASIVO CORRIENTE', tipo: 'PASIVO', nivel: 2, esMovimiento: false, padre: '2' },
  { codigo: '2.1.01', nombre: 'DEUDAS COMERCIALES', tipo: 'PASIVO', nivel: 3, esMovimiento: false, padre: '2.1' },
  { codigo: '2.1.01.001', nombre: 'Proveedores', tipo: 'PASIVO', nivel: 4, esMovimiento: true, padre: '2.1.01' },
  { codigo: '2.1.01.002', nombre: 'Documentos a Pagar', tipo: 'PASIVO', nivel: 4, esMovimiento: true, padre: '2.1.01' },
  { codigo: '2.1.01.003', nombre: 'IVA Débito Fiscal', tipo: 'PASIVO', nivel: 4, esMovimiento: true, padre: '2.1.01' },
  
  // PATRIMONIO
  { codigo: '3', nombre: 'PATRIMONIO', tipo: 'PATRIMONIO', nivel: 1, esMovimiento: false },
  { codigo: '3.1', nombre: 'CAPITAL', tipo: 'PATRIMONIO', nivel: 2, esMovimiento: false, padre: '3' },
  { codigo: '3.1.01.001', nombre: 'Capital Social', tipo: 'PATRIMONIO', nivel: 4, esMovimiento: true, padre: '3.1' },
  { codigo: '3.2', nombre: 'RESULTADOS', tipo: 'PATRIMONIO', nivel: 2, esMovimiento: false, padre: '3' },
  { codigo: '3.2.01.001', nombre: 'Resultados Acumulados', tipo: 'PATRIMONIO', nivel: 4, esMovimiento: true, padre: '3.2' },
  
  // INGRESOS
  { codigo: '4', nombre: 'INGRESOS', tipo: 'INGRESO', nivel: 1, esMovimiento: false },
  { codigo: '4.1', nombre: 'INGRESOS OPERATIVOS', tipo: 'INGRESO', nivel: 2, esMovimiento: false, padre: '4' },
  { codigo: '4.1.01.001', nombre: 'Ventas', tipo: 'INGRESO', nivel: 4, esMovimiento: true, padre: '4.1' },
  { codigo: '4.1.01.002', nombre: 'Servicios', tipo: 'INGRESO', nivel: 4, esMovimiento: true, padre: '4.1' },
  
  // GASTOS
  { codigo: '5', nombre: 'GASTOS', tipo: 'GASTO', nivel: 1, esMovimiento: false },
  { codigo: '5.1', nombre: 'GASTOS OPERATIVOS', tipo: 'GASTO', nivel: 2, esMovimiento: false, padre: '5' },
  { codigo: '5.1.01.001', nombre: 'Costo de Mercaderías Vendidas', tipo: 'GASTO', nivel: 4, esMovimiento: true, padre: '5.1' },
  { codigo: '5.1.01.002', nombre: 'Gastos de Administración', tipo: 'GASTO', nivel: 4, esMovimiento: true, padre: '5.1' },
  { codigo: '5.1.01.003', nombre: 'Gastos de Ventas', tipo: 'GASTO', nivel: 4, esMovimiento: true, padre: '5.1' }
]

export async function seedCuentasParaguay(empresaId: string) {
  console.log(`🌱 Seeding plan cuentas para empresa: ${empresaId}`)
  
  // Crear mapa para IDs de cuentas padre
  const cuentasMap = new Map<string, string>()
  
  // Procesar en orden de nivel para mantener jerarquía
  for (const nivel of [1, 2, 3, 4]) {
    const cuentasNivel = PLAN_CUENTAS_PARAGUAY.filter(c => c.nivel === nivel)
    
    for (const cuenta of cuentasNivel) {
      const cuentaPadreId = cuenta.padre ? cuentasMap.get(cuenta.padre) : null
      
      const created = await prisma.planCuentas.create({
        data: {
          empresaId,
          codigo: cuenta.codigo,
          nombre: cuenta.nombre,
          nombreCompleto: cuenta.nombre,
          nombreCorto: cuenta.nombre.slice(0, 12),
          tipoMayor: cuenta.tipo,
          tipoDetalle: null,
          naturaleza: (cuenta.tipo === 'PASIVO' || cuenta.tipo === 'PATRIMONIO') ? 'ACREEDORA' : 'DEUDORA',
          nivel: cuenta.nivel,
          codigoPadre: cuenta.padre || null,
          permiteMovimiento: cuenta.esMovimiento,
          esAuxiliar: false,
          nivelMaximo: 4,
          monedaPermitida: 'GUARANIES',
          centroCostoObligatorio: false,
          proyectoObligatorio: false,
          requiereReferencia: false,
          requiereCliente: false,
          requiereProveedor: false,
          activo: true
        }
      })
      
      cuentasMap.set(cuenta.codigo, created.id)
      console.log(`✅ Creada cuenta: ${cuenta.codigo} - ${cuenta.nombre}`)
    }
  }
  
  console.log(`🎉 Plan de cuentas paraguayo creado: ${PLAN_CUENTAS_PARAGUAY.length} cuentas`)
} 