import { auth } from "../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import MainLayout from "../MainLayout";
import { getUserTransactions } from "@/lib/data";
import { MobileTransactionCard, DesktopTransactionCard } from "@/components/TransactionCard";

export default async function LentPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const transactions = await getUserTransactions(session.user.email);
  const lentTransactions = transactions.filter((t) => t.isLentByMe);

  return (
    <MainLayout>
      {/* Mobile Content */}
      <div className="mx-auto max-w-md space-y-6 px-4 pt-5 md:hidden">
        <section>
          <h1 className="text-[40px] font-bold leading-none text-[#0d4f63]">
            Verliehen
          </h1>
          <p className="mt-2 text-[29px] text-[#3f474b]">
            Deine verliehenen Gegenstände und Gelder.
          </p>
        </section>

        <section className="space-y-3">
          <div className="space-y-2">
            {lentTransactions.length === 0 ? (
              <p className="text-gray-500">Keine Transaktionen gefunden.</p>
            ) : (
              lentTransactions.map((t) => (
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
              Lent (Verliehen)
            </h2>
            <p className="mt-2 max-w-md text-[22px] text-[#40484b]">
              Everything you have currently lent out to others.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-3 gap-4">
          {lentTransactions.map((t) => (
            <DesktopTransactionCard key={t.id} t={t} />
          ))}
          <Link
            href="/new-transaction"
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#c0c8cb] bg-[#f4f3f2] text-[#7a8388] min-h-[250px]"
          >
            <span className="text-4xl">+</span>
            <span className="text-sm">Lend something new</span>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
