// Configuración de Prisma
export default {
  database: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/contafacil',
    log: process.env.NODE_ENV === 'development',
  },
  prisma: {
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  },
}; 