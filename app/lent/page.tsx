import { auth } from "../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import MainLayout from "../MainLayout";

export default async function LentPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

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
            <div className="flex items-center gap-3 rounded-xl border border-[#d9dddf] bg-white p-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f1f3f4] text-[#5b6468]">
                ◉
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[26px] font-semibold text-[#21272a]">
                  Lukas M.
                </p>
                <p className="truncate text-[20px] text-[#40484b]">
                  Kamera-Equipment
                </p>
              </div>
              <div className="text-right">
                <p className="text-[30px] font-bold text-[#1b1f21]">800 €</p>
                <p className="text-[20px] text-[#40484b]">Noch 12 Tage</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[#d9dddf] bg-white p-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f1f3f4] text-[#5b6468]">
                ◉
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[26px] font-semibold text-[#21272a]">
                  WG Kasse
                </p>
                <p className="truncate text-[20px] text-[#40484b]">
                  Nebenkosten
                </p>
              </div>
              <div className="text-right">
                <p className="text-[30px] font-bold text-[#1b1f21]">440 €</p>
                <p className="text-[20px] font-semibold text-[#d0262d]">
                  Überfällig
                </p>
              </div>
            </div>
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

        {/* Content for Lent specific view goes here. Showing sample block: */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-[#d8dcdf] bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[34px] font-bold text-[#0d4f63]">$450.00</p>
              <span className="rounded-full bg-[#0f596f] px-3 py-1 text-xs text-white">
                Active
              </span>
            </div>
            <p className="text-[22px] text-[#3f474b]">Canon EOS R5 Camera</p>
            <p className="mt-2 text-[20px] text-[#4b5357]">Lukas Weber</p>
            <p className="mt-1 text-[20px] text-[#4b5357]">Due Oct 24, 2023</p>
            <button className="mt-4 w-full rounded-lg border border-[#0d4f63] py-2 text-sm font-medium text-[#0d4f63]">
              Confirm Return
            </button>
          </div>
          <div className="rounded-2xl border border-[#d8dcdf] bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[34px] font-bold text-[#0d4f63]">$1,000.00</p>
              <span className="rounded-full bg-[#ffdad6] px-3 py-1 text-xs text-[#93000a]">
                Overdue
              </span>
            </div>
            <p className="text-[22px] text-[#3f474b]">Personal Loan</p>
            <p className="mt-2 text-[20px] text-[#4b5357]">Elena Schmidt</p>
            <p className="mt-1 text-[20px] text-[#4b5357]">Due Oct 15, 2023</p>
            <button className="mt-4 w-full rounded-lg border border-[#0d4f63] py-2 text-sm font-medium text-[#0d4f63]">
              Remind Party
            </button>
          </div>
          <Link
            href="/new-transaction"
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#c0c8cb] bg-[#f4f3f2] text-[#7a8388]"
          >
            <span className="text-4xl">+</span>
            <span className="text-sm">Lend something new</span>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
