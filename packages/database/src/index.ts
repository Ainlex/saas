// Exportar cliente Prisma
export { prisma, default as db } from './client';

// Exportar tipos (se generarán automáticamente)
export * from './types';

// Exportar configuración
export { default as prismaConfig } from './config'; 