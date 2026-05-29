import { auth } from "../../../auth";
import { redirect, notFound } from "next/navigation";
import MainLayout from "../../MainLayout";
import { getUserTransactions } from "@/lib/data";
import TransactionClient from "./TransactionClient";

export default async function TransactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  // In Next.js 15+, dynamic route parameters must be awaited
  const { id } = await params;
  const transactions = await getUserTransactions(session.user.email);
  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    notFound();
  }

  return (
    <MainLayout showFab>
      <TransactionClient
        transaction={transaction}
        userName={session.user.name || "Du"}
      />
    </MainLayout>
  );
}
