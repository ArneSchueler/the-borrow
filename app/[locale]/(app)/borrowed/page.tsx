import { auth } from "../../../../auth";
import { redirect, Link } from "@/src/i18n/routing";
import { getUserTransactions } from "@/lib/data";
import {
  MobileTransactionCard,
  DesktopTransactionCard,
} from "@/components/TransactionCard";
import { FilterableTransactions } from "@/components/FilterableTransactions";

import { getLocale } from "next-intl/server";

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function BorrowedPage({ searchParams }: PageProps) {
  const session = await auth();
  const locale = await getLocale();
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams.q;

  if (!session?.user?.email) {
    return redirect({ href: "/login", locale });
  }

  let transactions = await getUserTransactions(session.user.email);

  if (q) {
    const searchLower = q.toLowerCase();
    transactions = transactions.filter(
      (tx) =>
        (tx.itemName && tx.itemName.toLowerCase().includes(searchLower)) ||
        (tx.partyName && tx.partyName.toLowerCase().includes(searchLower)) ||
        (tx.notes && tx.notes.toLowerCase().includes(searchLower)),
    );
  }

  const borrowedTransactions = transactions.filter(
    (t) => !t.isLentByMe && t.status !== "COMPLETED",
  );
  const completedTransactions = transactions.filter(
    (t) => !t.isLentByMe && t.status === "COMPLETED",
  );

  return (
    <>
      {/* Mobile Content */}
      <div className="mx-auto max-w-md space-y-6 px-4 pt-5 md:hidden">
        <section>
          <h1 className="text-[40px] font-bold leading-none text-[#0d4f63]">
            Geliehen
          </h1>
          <p className="mt-2 text-[29px] text-[#3f474b]">
            Gegenstände und Gelder, die du ausgeliehen hast.
          </p>
        </section>

        <section className="space-y-3">
          <FilterableTransactions transactions={borrowedTransactions} />
        </section>

        {completedTransactions.length > 0 && (
          <section className="mt-8 space-y-3">
            <h2 className="text-[22px] font-semibold text-[#0d4f63]">
              Abgeschlossen
            </h2>
            <div className="space-y-2">
              {completedTransactions.map((t) => (
                <MobileTransactionCard key={t.id} t={t} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Desktop Content */}
      <div className="hidden mx-auto w-full max-w-6xl px-8 pb-10 pt-8 md:block">
        <section className="mb-10 flex items-start justify-between">
          <div>
            <h2 className="text-[42px] font-semibold text-[#0d4f63]">
              Borrowed (Geliehen)
            </h2>
            <p className="mt-2 max-w-md text-[22px] text-[#40484b]">
              Everything you have currently borrowed from others.
            </p>
          </div>
        </section>

        <FilterableTransactions transactions={borrowedTransactions} />

        {completedTransactions.length > 0 && (
          <section className="mt-12">
            <h3 className="mb-6 text-[28px] font-semibold text-[#0d4f63]">
              Completed (Abgeschlossen)
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {completedTransactions.map((t) => (
                <DesktopTransactionCard key={t.id} t={t} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
