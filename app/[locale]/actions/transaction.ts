"use server";

import prisma from "@/lib/db";
import { auth } from "@/auth";
import { $Enums } from "@prisma/client";
import { redirect } from "@/src/i18n/routing";

export async function createTransaction(formData: FormData) {
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
    },
  });

  redirect("/dashboard");
}
