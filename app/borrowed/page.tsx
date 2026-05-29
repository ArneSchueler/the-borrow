import { auth } from "../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import MainLayout from "../MainLayout";
import { getUserTransactions } from "@/lib/data";
import { MobileTransactionCard, DesktopTransactionCard } from "@/components/TransactionCard";

export default async function BorrowedPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const transactions = await getUserTransactions(session.user.email);
  const borrowedTransactions = transactions.filter((t) => !t.isLentByMe);

  return (
    <MainLayout showFab>
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
          <div className="space-y-2">
            {borrowedTransactions.length === 0 ? (
              <p className="text-gray-500">Keine Transaktionen gefunden.</p>
            ) : (
              borrowedTransactions.map((t) => (
                <MobileTransactionCard key={t.id} t={t} />
              ))
            )}
          </div>
        </section>
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

        <div className="grid grid-cols-3 gap-4">
          {borrowedTransactions.map((t) => (
            <DesktopTransactionCard key={t.id} t={t} />
          ))}
          {borrowedTransactions.length === 0 && (
            <p className="text-gray-500 col-span-3">Keine Transaktionen gefunden.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
