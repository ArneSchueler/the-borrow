"use server";

import prisma from "@/lib/db";
import { auth } from "@/auth";
import { $Enums } from "@prisma/client";
import { redirect } from "@/src/i18n/routing";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";

export async function createTransaction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const locale = await getLocale();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const typeValue = formData.get("type") as string;
  const type =
    typeValue === "money"
      ? $Enums.TransactionType.MONEY
      : $Enums.TransactionType.ITEM;

  // common
  const partnerEmail = formData.get("partnerEmail") as string;
  const lendingDateRaw = formData.get("lendingDate") as string;
  const expectedReturnDateRaw = formData.get("expectedReturnDate") as string;
  const notes = formData.get("notes") as string;

  const isCreatorLenderStr = formData.get("isCreatorLender") as string;
  const isCreatorLender = isCreatorLenderStr !== "false"; // default true

  // money
  const amountRaw = formData.get("amount") as string;
  const amount = amountRaw ? parseFloat(amountRaw) : null;
  const interestRateRaw = formData.get("interestRate") as string;
  const interestRate = interestRateRaw ? parseFloat(interestRateRaw) : null;
  const installmentPlan = formData.get("installmentPlan") as string;

  // item
  const itemName = formData.get("itemName") as string;
  const itemCondition = formData.get("itemCondition") as string;

  await prisma.transaction.create({
    data: {
      type,
      creatorId: user.id,
      partnerEmail: partnerEmail || null,
      isCreatorLender,
      lendingDate: lendingDateRaw ? new Date(lendingDateRaw) : null,
      expectedReturnDate: expectedReturnDateRaw
        ? new Date(expectedReturnDateRaw)
        : null,
      notes: notes || null,
      amount,
      interestRate,
      installmentPlan: installmentPlan || null,
      itemName: itemName || null,
      itemCondition: itemCondition || null,
      creatorConfirmed: true,
    },
  });

  redirect({ href: "/dashboard", locale });
}

export async function confirmTransaction(transactionId: string) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  const isCreator = transaction.creatorId === user.id;
  const isPartner = transaction.partnerEmail === user.email;

  if (!isCreator && !isPartner) {
    throw new Error("Unauthorized to confirm this transaction");
  }

  if (isCreator) {
    await prisma.transaction.update({
      where: { id: transactionId },
      data: { creatorConfirmed: true },
    });
  } else if (isPartner) {
    await prisma.transaction.update({
      where: { id: transactionId },
      data: { partnerConfirmed: true },
    });
  }

  // If both confirmed, update status to ACTIVE
  const updatedTransaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  if (
    updatedTransaction?.creatorConfirmed &&
    updatedTransaction?.partnerConfirmed
  ) {
    await prisma.transaction.update({
      where: { id: transactionId },
      data: { status: "ACTIVE" },
    });
  }

  revalidatePath(`/`);
}

export async function markTransactionAsReturned(transactionId: string) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  await prisma.transaction.update({
    where: { id: transactionId },
    data: { status: "PENDING_RETURN" },
  });

  revalidatePath(`/`);
}

export async function confirmTransactionReturn(transactionId: string) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  await prisma.transaction.update({
    where: { id: transactionId },
    data: { status: "COMPLETED" },
  });

  revalidatePath(`/`);
}

export async function searchTransactions(query: string) {
  const session = await auth();
  if (!session?.user?.email) {
    return [];
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return [];
  }

  // Fetch all transactions for the user
  const transactions = await prisma.transaction.findMany({
    where: {
      OR: [{ creatorId: user.id }, { partnerEmail: user.email }],
    },
    include: {
      creator: {
        select: {
          email: true,
        },
      },
    },
  });

  // Filter in memory to support partial matching on numbers
  const lowerQuery = query.toLowerCase();
  const normalizedQuery = query.replace(",", "."); // Handle EU comma decimals

  const filteredTransactions = transactions.filter((t) => {
    const amountStr = t.amount?.toString() || "";
    return (
      t.itemName?.toLowerCase().includes(lowerQuery) ||
      t.partnerEmail?.toLowerCase().includes(lowerQuery) ||
      t.notes?.toLowerCase().includes(lowerQuery) ||
      t.creator?.email?.toLowerCase().includes(lowerQuery) ||
      amountStr.includes(normalizedQuery) ||
      amountStr.replace(".", ",").includes(query)
    );
  });

  // Take the top 10 results and enrich them
  return filteredTransactions.slice(0, 10).map((t) => ({
    ...t,
    partyName:
      t.creatorId === user.id ? t.partnerEmail || "Unknown" : t.creator.email,
    isLentByMe:
      t.creatorId === user.id ? t.isCreatorLender : !t.isCreatorLender,
  }));
}
