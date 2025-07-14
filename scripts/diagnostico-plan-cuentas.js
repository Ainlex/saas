const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function diagnosticoPlanCuentas() {
  console.log('=== DIAGNÓSTICO COMPLETO PLAN DE CUENTAS ===\n');

  try {
    // 1. VERIFICAR ESTADO DE DATOS
    console.log('1. VERIFICANDO DATOS EN BASE DE DATOS...');
    
    const empresaId = 'cmd0kt1j20000h2chrqgk7ur7';
    
    const cuentas = await prisma.planCuentas.findMany({
      where: { empresaId },
      select: {
        codigo: true,
        nombre: true,
        codigoPadre: true,
        nivel: true,
        tipoMayor: true,
        activo: true,
        empresaId: true
      },
      orderBy: { codigo: 'asc' }
    });

    console.log(`Total de cuentas encontradas: ${cuentas.length}`);
    console.log('\nPrimeras 10 cuentas:');
    cuentas.slice(0, 10).forEach(cuenta => {
      console.log(`  ${cuenta.codigo} - ${cuenta.nombre} (Padre: ${cuenta.codigoPadre}, Nivel: ${cuenta.nivel})`);
    });

    // Análisis de niveles
    const niveles = {};
    cuentas.forEach(cuenta => {
      niveles[cuenta.nivel] = (niveles[cuenta.nivel] || 0) + 1;
    });
    console.log('\nDistribución por niveles:');
    Object.entries(niveles).forEach(([nivel, count]) => {
      console.log(`  Nivel ${nivel}: ${count} cuentas`);
    });

    // 2. VERIFICAR ESTADO DEL MÓDULO
    console.log('\n2. VERIFICANDO ESTADO DEL MÓDULO CONTABILIDAD...');
    
    const modulo = await prisma.empresaModulos.findFirst({
      where: {
        empresaId,
        moduloSlug: 'contabilidad'
      }
    });

    if (modulo) {
      console.log(`✅ Módulo contabilidad está activo: ${modulo.activo}`);
      console.log(`   Fecha activación: ${modulo.fechaActivacion}`);
    } else {
      console.log('❌ Módulo contabilidad NO encontrado');
    }

    // 3. VERIFICAR USUARIOS DE LA EMPRESA
    console.log('\n3. VERIFICANDO USUARIOS DE LA EMPRESA...');
    
    const usuarios = await prisma.usuario.findMany({
      where: { empresaId },
      select: {
        id: true,
        email: true,
        nombre: true,
        activo: true
      }
    });

    console.log(`Total de usuarios en la empresa: ${usuarios.length}`);
    usuarios.forEach(usuario => {
      console.log(`  ${usuario.email} - ${usuario.nombre} (Activo: ${usuario.activo})`);
    });

    // 4. VERIFICAR ESTRUCTURA JERÁRQUICA
    console.log('\n4. ANALIZANDO ESTRUCTURA JERÁRQUICA...');
    
    const cuentasConHijos = cuentas.filter(c => c.codigoPadre !== null);
    const cuentasSinPadre = cuentas.filter(c => c.codigoPadre === null);
    
    console.log(`Cuentas con padre: ${cuentasConHijos.length}`);
    console.log(`Cuentas raíz (sin padre): ${cuentasSinPadre.length}`);
    
    // Verificar si hay cuentas huérfanas
    const codigosExistentes = new Set(cuentas.map(c => c.codigo));
    const cuentasHuerfanas = cuentasConHijos.filter(c => !codigosExistentes.has(c.codigoPadre));
    
    if (cuentasHuerfanas.length > 0) {
      console.log('⚠️  Cuentas huérfanas encontradas:');
      cuentasHuerfanas.forEach(c => {
        console.log(`  ${c.codigo} - Padre inexistente: ${c.codigoPadre}`);
      });
    } else {
      console.log('✅ No hay cuentas huérfanas');
    }

    // 5. VERIFICAR CONFIGURACIÓN DE LA EMPRESA
    console.log('\n5. VERIFICANDO CONFIGURACIÓN DE LA EMPRESA...');
    
    const empresa = await prisma.empresa.findUnique({
      where: { id: empresaId },
      select: {
        id: true,
        nombre: true,
        activo: true
      }
    });

    if (empresa) {
      console.log(`Empresa: ${empresa.nombre} (Activa: ${empresa.activo})`);
    } else {
      console.log('❌ Empresa no encontrada');
    }

    console.log('\n=== FIN DEL DIAGNÓSTICO ===');

  } catch (error) {
    console.error('Error en el diagnóstico:', error);
  } finally {
    await prisma.$disconnect();
  }
}

diagnosticoPlanCuentas(); 