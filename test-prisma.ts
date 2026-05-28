import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  console.log(Object.keys(prisma.transaction.fields));
}
main().catch(console.error);
