import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const prismadb = globalThis.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  transactionOptions: {
    maxWait: 15000, // 15 segundos
    timeout: 15000, // 15 segundos
  },
})
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

export default prismadb;

