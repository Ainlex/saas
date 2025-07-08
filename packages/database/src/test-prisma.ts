import { prisma } from './index';

async function main() {
  try {
    console.log('🔍 Probando conexión a Prisma...');
    
    // Probar conexión básica
    await prisma.$connect();
    console.log('✅ Conexión exitosa a la base de datos');
    
    // Probar consulta simple
    const empresas = await prisma.empresa.findMany();
    console.log('📊 Empresas encontradas:', empresas.length);
    
    // Probar consulta de módulos activos
    const modulosActivos = await prisma.modulo.findMany({
      where: { activo: true }
    });
    console.log('🎯 Módulos activos encontrados:', modulosActivos.length);
    
    // Probar consulta de empresas con módulos activos
    const empresasConModulos = await prisma.empresaModulo.findMany({
      where: { activo: true },
      include: { 
        empresa: true,
        modulo: true 
      }
    });
    console.log('🏢 Empresas con módulos activos:', empresasConModulos.length);
    
    await prisma.$disconnect();
    console.log('✅ Test completado exitosamente');
  } catch (error) {
    console.error('❌ Error en el test:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main(); 