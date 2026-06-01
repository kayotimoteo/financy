import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaLibSql({
	url: process.env.DATABASE_URL ?? "",
});
export const prismaClient =
	globalForPrisma.prisma || new PrismaClient({ adapter });

globalForPrisma.prisma = prismaClient;
