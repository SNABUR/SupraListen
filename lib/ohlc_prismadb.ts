import { PrismaClient } from '../prisma/generated/ohlc_db';

declare global {
  var ohlc_prisma: PrismaClient | undefined;
}

const ohlc_prismadb = globalThis.ohlc_prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.ohlc_prisma = ohlc_prismadb;
}

export default ohlc_prismadb;
