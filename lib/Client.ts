// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Add a global type to avoid multiple client instances during development
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// Reuse existing PrismaClient instance or create a new one
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
