import { PrismaClient } from '../prisma/generated/main_db';

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  transactionOptions: {
    maxWait: 30000, // 30 segundos
    timeout: 30000, // 30 segundos
  },
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prismadb;
}

export default prismadb;