import { auth } from "../../../../../auth";
import { notFound } from "next/navigation";
import { redirect } from "@/src/i18n/routing";
import { getUserTransactions } from "@/lib/data";
import TransactionClient from "./TransactionClient";

import { getLocale } from "next-intl/server";

export default async function TransactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const locale = await getLocale();

  if (!session?.user?.email) {
    return redirect({ href: "/login", locale });
  }

  // In Next.js 15+, dynamic route parameters must be awaited
  const { id } = await params;
  const transactions = await getUserTransactions(session.user.email);
  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    notFound();
  }

  return (
    <>
      <TransactionClient
        transaction={transaction}
        userName={session.user.name || "Du"}
      />
    </>
  );
}
