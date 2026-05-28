import prisma from "./db";
import { Transaction } from "@prisma/client";

export type EnrichedTransaction = Transaction & {
  isLentByMe: boolean;
  partyName: string;
};

export async function getUserTransactions(userEmail: string): Promise<EnrichedTransaction[]> {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    return [];
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      OR: [
        { creatorId: user.id },
        { partnerEmail: userEmail }
      ]
    },
    include: {
      creator: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return transactions.map((t) => {
    let isLentByMe = false;
    let partyName = "";

    if (t.creatorId === user.id) {
      isLentByMe = t.isCreatorLender;
      partyName = t.partnerEmail || "Unbekannt";
    } else {
      isLentByMe = !t.isCreatorLender;
      partyName = t.creator.name || t.creator.email || "Unbekannt";
    }

    return {
      ...t,
      isLentByMe,
      partyName,
    };
  });
}
