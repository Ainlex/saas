// Database client configuration
// This will be replaced with actual Prisma client setup

import { PrismaClient } from './generated';

// Cliente Prisma singleton para evitar múltiples conexiones
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Exportar el cliente como default
export default prisma;

export const db = {
  // Placeholder for Prisma client
  connect: async () => {
    console.log('Database connected');
  },
  disconnect: async () => {
    console.log('Database disconnected');
  },
}; 