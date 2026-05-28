-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('MONEY', 'ITEM');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING_APPROVAL', 'ACTIVE', 'PENDING_RETURN', 'COMPLETED', 'OVERDUE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING_APPROVAL',
    "amount" DOUBLE PRECISION,
    "interestRate" DOUBLE PRECISION,
    "installmentPlan" TEXT,
    "itemCondition" TEXT,
    "itemImages" TEXT[],
    "creatorId" TEXT NOT NULL,
    "partnerName" TEXT,
    "partnerEmail" TEXT,
    "isCreatorLender" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
