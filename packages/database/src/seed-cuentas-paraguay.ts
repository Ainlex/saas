import { PrismaClient, TipoCuenta } from './generated'

const prisma = new PrismaClient()

export const PLAN_CUENTAS_PARAGUAY = [
  // ACTIVOS - Nivel 1
  { codigo: '1', nombre: 'ACTIVO', tipo: 'ACTIVO' as TipoCuenta, nivel: 1, esMovimiento: false },
  { codigo: '1.1', nombre: 'ACTIVO CORRIENTE', tipo: 'ACTIVO' as TipoCuenta, nivel: 2, esMovimiento: false, padre: '1' },
  { codigo: '1.1.01', nombre: 'DISPONIBILIDADES', tipo: 'ACTIVO' as TipoCuenta, nivel: 3, esMovimiento: false, padre: '1.1' },
  { codigo: '1.1.01.001', nombre: 'Caja', tipo: 'ACTIVO' as TipoCuenta, nivel: 4, esMovimiento: true, padre: '1.1.01' },
  { codigo: '1.1.01.002', nombre: 'Banco Cuenta Corriente', tipo: 'ACTIVO' as TipoCuenta, nivel: 4, esMovimiento: true, padre: '1.1.01' },
  { codigo: '1.1.01.003', nombre: 'Banco Caja de Ahorro', tipo: 'ACTIVO' as TipoCuenta, nivel: 4, esMovimiento: true, padre: '1.1.01' },
  
  { codigo: '1.1.02', nombre: 'CRÉDITOS', tipo: 'ACTIVO' as TipoCuenta, nivel: 3, esMovimiento: false, padre: '1.1' },
  { codigo: '1.1.02.001', nombre: 'Deudores por Ventas', tipo: 'ACTIVO' as TipoCuenta, nivel: 4, esMovimiento: true, padre: '1.1.02' },
  { codigo: '1.1.02.002', nombre: 'Documentos a Cobrar', tipo: 'ACTIVO' as TipoCuenta, nivel: 4, esMovimiento: true, padre: '1.1.02' },
  { codigo: '1.1.02.003', nombre: 'IVA Crédito Fiscal', tipo: 'ACTIVO' as TipoCuenta, nivel: 4, esMovimiento: true, padre: '1.1.02' },
  
  // PASIVOS
  { codigo: '2', nombre: 'PASIVO', tipo: 'PASIVO' as TipoCuenta, nivel: 1, esMovimiento: false },
  { codigo: '2.1', nombre: 'PASIVO CORRIENTE', tipo: 'PASIVO' as TipoCuenta, nivel: 2, esMovimiento: false, padre: '2' },
  { codigo: '2.1.01', nombre: 'DEUDAS COMERCIALES', tipo: 'PASIVO' as TipoCuenta, nivel: 3, esMovimiento: false, padre: '2.1' },
  { codigo: '2.1.01.001', nombre: 'Proveedores', tipo: 'PASIVO' as TipoCuenta, nivel: 4, esMovimiento: true, padre: '2.1.01' },
  { codigo: '2.1.01.002', nombre: 'Documentos a Pagar', tipo: 'PASIVO' as TipoCuenta, nivel: 4, esMovimiento: true, padre: '2.1.01' },
  { codigo: '2.1.01.003', nombre: 'IVA Débito Fiscal', tipo: 'PASIVO' as TipoCuenta, nivel: 4, esMovimiento: true, padre: '2.1.01' },
  
  // PATRIMONIO
  { codigo: '3', nombre: 'PATRIMONIO', tipo: 'PATRIMONIO' as TipoCuenta, nivel: 1, esMovimiento: false },
  { codigo: '3.1', nombre: 'CAPITAL', tipo: 'PATRIMONIO' as TipoCuenta, nivel: 2, esMovimiento: false, padre: '3' },
  { codigo: '3.1.01.001', nombre: 'Capital Social', tipo: 'PATRIMONIO' as TipoCuenta, nivel: 4, esMovimiento: true, padre: '3.1' },
  { codigo: '3.2', nombre: 'RESULTADOS', tipo: 'PATRIMONIO' as TipoCuenta, nivel: 2, esMovimiento: false, padre: '3' },
  { codigo: '3.2.01.001', nombre: 'Resultados Acumulados', tipo: 'PATRIMONIO' as TipoCuenta, nivel: 4, esMovimiento: true, padre: '3.2' },
  
  // INGRESOS
  { codigo: '4', nombre: 'INGRESOS', tipo: 'INGRESO' as TipoCuenta, nivel: 1, esMovimiento: false },
  { codigo: '4.1', nombre: 'INGRESOS OPERATIVOS', tipo: 'INGRESO' as TipoCuenta, nivel: 2, esMovimiento: false, padre: '4' },
  { codigo: '4.1.01.001', nombre: 'Ventas', tipo: 'INGRESO' as TipoCuenta, nivel: 4, esMovimiento: true, padre: '4.1' },
  { codigo: '4.1.01.002', nombre: 'Servicios', tipo: 'INGRESO' as TipoCuenta, nivel: 4, esMovimiento: true, padre: '4.1' },
  
  // GASTOS
  { codigo: '5', nombre: 'GASTOS', tipo: 'GASTO' as TipoCuenta, nivel: 1, esMovimiento: false },
  { codigo: '5.1', nombre: 'GASTOS OPERATIVOS', tipo: 'GASTO' as TipoCuenta, nivel: 2, esMovimiento: false, padre: '5' },
  { codigo: '5.1.01.001', nombre: 'Costo de Mercaderías Vendidas', tipo: 'GASTO' as TipoCuenta, nivel: 4, esMovimiento: true, padre: '5.1' },
  { codigo: '5.1.01.002', nombre: 'Gastos de Administración', tipo: 'GASTO' as TipoCuenta, nivel: 4, esMovimiento: true, padre: '5.1' },
  { codigo: '5.1.01.003', nombre: 'Gastos de Ventas', tipo: 'GASTO' as TipoCuenta, nivel: 4, esMovimiento: true, padre: '5.1' }
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
      
      const created = await prisma.cuentaContable.create({
        data: {
          empresaId,
          codigo: cuenta.codigo,
          nombre: cuenta.nombre,
          tipo: cuenta.tipo,
          nivel: cuenta.nivel,
          esMovimiento: cuenta.esMovimiento,
          cuentaPadreId,
          activo: true
        }
      })
      
      cuentasMap.set(cuenta.codigo, created.id)
      console.log(`✅ Creada cuenta: ${cuenta.codigo} - ${cuenta.nombre}`)
    }
  }
  
  console.log(`🎉 Plan de cuentas paraguayo creado: ${PLAN_CUENTAS_PARAGUAY.length} cuentas`)
} 