import { auth } from "../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import MainLayout from "../MainLayout";
import { getUserTransactions } from "@/lib/data";
import {
  MobileTransactionCard,
  DesktopTransactionCard,
} from "@/components/TransactionCard";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const transactions = await getUserTransactions(session.user.email);
  const lentTransactions = transactions.filter((t) => t.isLentByMe);
  const borrowedTransactions = transactions.filter((t) => !t.isLentByMe);

  return (
    <MainLayout showFab>
      {/* mobile */}
      <div className="mx-auto max-w-md space-y-6 px-4 pt-5 md:hidden">
        <section>
          <h1 className="text-[40px] font-bold leading-none text-[#0d4f63]">
            Hallo, {session.user.name || "Julian"}
          </h1>
          <p className="mt-2 text-[29px] text-[#3f474b]">
            Hier ist deine Übersicht für heute.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#0d566b] p-4 text-white shadow-sm">
            <p className="text-[13px] opacity-95">Verliehen</p>
            <p className="mt-2 text-[39px] font-bold leading-none">
              {lentTransactions.length}
            </p>
            <p className="mt-1 text-[22px]">Vorgänge</p>
          </div>
          <div className="rounded-xl bg-[#f7952f] p-4 text-[#3a230e] shadow-sm">
            <p className="text-[13px] opacity-95">Geliehen</p>
            <p className="mt-2 text-[39px] font-bold leading-none">
              {borrowedTransactions.length}
            </p>
            <p className="mt-1 text-[22px]">Vorgänge</p>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[42px] font-semibold text-[#1f2325]">
              Aktuell Verliehen
            </h2>
            <button className="text-[20px] font-medium text-[#0f4f64]">
              Alle ansehen
            </button>
          </div>

          <div className="space-y-2">
            {lentTransactions.length > 0 ? (
              lentTransactions
                .slice(0, 2)
                .map((t) => <MobileTransactionCard key={t.id} t={t} />)
            ) : (
              <p className="text-[#40484b]">Keine verliehenen Gegenstände.</p>
            )}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[42px] font-semibold text-[#1f2325]">
              Aktuell Geliehen
            </h2>
            <button className="text-[20px] font-medium text-[#0f4f64]">
              Alle ansehen
            </button>
          </div>

          <div className="space-y-2">
            {borrowedTransactions.length > 0 ? (
              borrowedTransactions
                .slice(0, 2)
                .map((t) => <MobileTransactionCard key={t.id} t={t} />)
            ) : (
              <p className="text-[#40484b]">Keine geliehenen Gegenstände.</p>
            )}
          </div>
        </section>
      </div>

      {/* desktop */}
      {/* <div className="hidden md:block mx-auto w-full max-w-6xl px-container-desktop pb-10 pt-8 space-y-section-gap"> */}
      <div className="px-container-padding-desktop py-base max-w-7xl mx-auto w-full flex flex-col gap-section-gap md:px-8 lg:px-12 pt-8 pb-10">
        <section className="flex items-start justify-between">
          <div>
            <h1 className="text-display-lg text-primary">
              Hallo, {session.user.name || "Julian"}
            </h1>
            <p className="mt-2 max-w-md text-body-lg text-on-surface-variant">
              Hier ist deine Übersicht für heute.
            </p>
          </div>
          <section className="grid grid-cols-2 gap-3">
            <div className="w-[210px] rounded-2xl bg-[#0d566b] p-4 text-white shadow-sm">
              <p className="text-[13px] opacity-95">Verliehen</p>
              <p className="mt-2 text-[39px] font-bold leading-none">
                {lentTransactions.length}
              </p>
              <p className="mt-1 text-[22px]">Vorgänge</p>
            </div>
            <div className="w-[210px] rounded-2xl bg-[#f7952f] p-4 text-[#3a230e] shadow-sm">
              <p className="text-[13px] opacity-95">Geliehen</p>
              <p className="mt-2 text-[39px] font-bold leading-none">
                {borrowedTransactions.length}
              </p>
              <p className="mt-1 text-[22px]">Vorgänge</p>
            </div>
          </section>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-title-md text-title-md text-on-surface">
              Aktuell Verliehen
            </h3>
            <button className="text-body-md font-medium text-primary hover:text-primary-container transition-colors">
              Alle ansehen
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {lentTransactions.slice(0, 2).map((t) => (
              <DesktopTransactionCard key={t.id} t={t} />
            ))}
            <Link
              href="?new-transaction=true"
              scroll={false}
              className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-outline-variant bg-surface-container-low p-6 text-outline hover:bg-surface-container hover:text-primary transition-colors group min-h-[200px]"
            >
              <span className="text-display-lg group-hover:scale-110 transition-transform">
                +
              </span>
              <span className="text-body-md mt-2">Neuer Vorgang</span>
            </Link>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-title-md text-title-md text-on-surface">
              Aktuell Geliehen
            </h3>
            <button className="text-body-md font-medium text-primary hover:text-primary-container transition-colors">
              Alle ansehen
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {borrowedTransactions.length > 0 ? (
              borrowedTransactions
                .slice(0, 2)
                .map((t) => <DesktopTransactionCard key={t.id} t={t} />)
            ) : (
              <div className="col-span-2">
                <p className="text-[#40484b]">Keine geliehenen Gegenstände.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
