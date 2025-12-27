// Fiz um downgrade do Prisma 7 pro 6 porque o 7 colocou mudanças novas que eu ainda nao sei como fazer dar certo.
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
