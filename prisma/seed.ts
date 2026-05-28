import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1. Upsert a primary test user
  const testUser = await prisma.user.upsert({
    where: { email: "testuser@example.com" },
    update: {
      name: "Jane Doe",
      password: hashedPassword,
    },
    create: {
      email: "testuser@example.com",
      name: "Jane Doe",
      password: hashedPassword,
    },
  });

  console.log("Seeded test user:", testUser.email);

  // 2. MONEY loan (ACTIVE) where the test user is the lender
  await prisma.transaction.create({
    data: {
      type: "MONEY",
      status: "ACTIVE",
      amount: 1000.0,
      installmentPlan: "$100 per month for 10 months",
      isCreatorLender: true,
      creatorId: testUser.id,
      partnerName: "Alice Guest",
      partnerEmail: "alice.guest@example.com",
    },
  });

  // 3. ITEM loan (PENDING_APPROVAL) where a partner needs to accept a borrowed item
  await prisma.transaction.create({
    data: {
      type: "ITEM",
      status: "PENDING_APPROVAL",
      itemCondition: "Good, minor scratches",
      itemImages: ["https://example.com/drill-image-1.jpg"],
      isCreatorLender: true,
      creatorId: testUser.id,
      partnerName: "Bob Guest",
      partnerEmail: "bob.guest@example.com",
    },
  });

  // 4. ITEM loan (OVERDUE) where the return date is theoretically past
  const pastDate = new Date();
  pastDate.setMonth(pastDate.getMonth() - 2);

  await prisma.transaction.create({
    data: {
      type: "ITEM",
      status: "OVERDUE",
      itemCondition: "Like new",
      itemImages: ["https://example.com/camera-image-1.jpg"],
      isCreatorLender: false,
      creatorId: testUser.id,
      partnerName: "Charlie Guest",
      partnerEmail: "charlie.guest@example.com",
      createdAt: pastDate, // Mocking an older creation date to represent overdue status
    },
  });

  console.log("Seeded transactions successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
