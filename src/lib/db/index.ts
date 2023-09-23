import { Prisma, PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const prismaOptions: Prisma.PrismaClientOptions = {}

if (Boolean(process.env.DATABASE_DEBUG)) {
  prismaOptions.log = ["query", "error", "warn"]
}

export const prisma = globalThis.prisma || new PrismaClient(prismaOptions)

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma
}

export default prisma

