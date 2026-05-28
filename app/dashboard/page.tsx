import { auth } from "../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import MainLayout from "../MainLayout";

export default async function DashboardPage() {
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
            Hallo, {session.user.name || "Julian"}
          </h1>
          <p className="mt-2 text-[29px] text-[#3f474b]">
            Hier ist deine Ubersicht fur heute.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#0d566b] p-4 text-white shadow-sm">
            <p className="text-[13px] opacity-95">Verliehen</p>
            <p className="mt-2 text-[39px] font-bold leading-none">2</p>
            <p className="mt-1 text-[22px]">Vorgange</p>
          </div>
          <div className="rounded-xl bg-[#f7952f] p-4 text-[#3a230e] shadow-sm">
            <p className="text-[13px] opacity-95">Geliehen</p>
            <p className="mt-2 text-[39px] font-bold leading-none">1</p>
            <p className="mt-1 text-[22px]">Vorgang</p>
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
                  Uberfallig
                </p>
              </div>
            </div>
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

          <div className="flex items-center gap-3 rounded-xl border border-[#d9dddf] bg-white p-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f1f3f4] text-[#5b6468]">
              ▣
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[26px] font-semibold text-[#21272a]">
                Hardware Store
              </p>
              <p className="truncate text-[20px] text-[#40484b]">
                Werkzeug-Miete
              </p>
            </div>
            <div className="text-right">
              <p className="text-[30px] font-bold text-[#1b1f21]">450 €</p>
              <p className="text-[20px] text-[#40484b]">Fallig: 2 Tage</p>
            </div>
          </div>
        </section>
      </div>

      {/* Desktop Content */}
      <div className="hidden mx-auto w-full max-w-6xl px-8 pb-10 pt-8 md:block">
        <section className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="text-[40px] font-bold leading-none text-[#0d4f63]">
              Hallo, {session.user.name || "Julian"}
            </h1>
            <p className="mt-2 max-w-md text-[22px] text-[#40484b]">
              Hier ist deine Ubersicht fur heute.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-[210px] rounded-xl bg-[#0d566b] p-5 text-white shadow-sm">
              <p className="text-[13px] opacity-95">Verliehen</p>
              <p className="mt-2 text-[46px] font-bold leading-none">2</p>
              <p className="mt-1 text-[22px] leading-none">Vorgange</p>
            </div>
            <div className="w-[210px] rounded-xl bg-[#f7952f] p-5 text-[#3a230e] shadow-sm">
              <p className="text-[13px] opacity-95">Geliehen</p>
              <p className="mt-2 text-[46px] font-bold leading-none">1</p>
              <p className="mt-1 text-[22px] leading-none">Vorgang</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[34px] font-semibold text-[#1f2325]">
              Aktuell Verliehen
            </h2>
            <button className="text-sm font-medium text-[#0f4f64]">
              Alle ansehen
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-[#d8dcdf] bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[34px] font-bold text-[#1b1f21]">800 €</p>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f1f3f4] text-[#5b6468]">
                  ◉
                </div>
              </div>
              <p className="text-[26px] font-semibold text-[#21272a]">
                Lukas M.
              </p>
              <p className="mt-1 text-[20px] text-[#40484b]">
                Kamera-Equipment
              </p>
              <p className="mt-1 text-[20px] text-[#40484b]">Noch 12 Tage</p>
              <button className="mt-4 w-full rounded-lg border border-[#0d4f63] py-2 text-sm font-medium text-[#0d4f63]">
                Vorgang ansehen
              </button>
            </div>
            <div className="rounded-2xl border border-[#d8dcdf] bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[34px] font-bold text-[#1b1f21]">440 €</p>
                <span className="rounded-full bg-[#ffdad6] px-3 py-1 text-xs font-semibold text-[#d0262d]">
                  Uberfallig
                </span>
              </div>
              <p className="text-[26px] font-semibold text-[#21272a]">
                WG Kasse
              </p>
              <p className="mt-1 text-[20px] text-[#40484b]">Nebenkosten</p>
              <button className="mt-4 w-full rounded-lg border border-[#0d4f63] py-2 text-sm font-medium text-[#0d4f63]">
                Erinnern
              </button>
            </div>
            <Link
              href="/new-transaction"
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#c0c8cb] bg-[#f4f3f2] text-[#7a8388]"
            >
              <span className="text-4xl">+</span>
              <span className="text-sm">Neuen Vorgang anlegen</span>
            </Link>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[34px] font-semibold text-[#1f2325]">
              Aktuell Geliehen
            </h2>
            <button className="text-sm font-medium text-[#0f4f64]">
              Alle ansehen
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-[#d8dcdf] bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[34px] font-bold text-[#1b1f21]">450 €</p>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f1f3f4] text-[#5b6468]">
                  ▣
                </div>
              </div>
              <p className="text-[26px] font-semibold text-[#21272a]">
                Hardware Store
              </p>
              <p className="mt-1 text-[20px] text-[#40484b]">Werkzeug-Miete</p>
              <p className="mt-1 text-[20px] text-[#40484b]">Fallig: 2 Tage</p>
              <div className="mt-4 flex gap-2">
                <button className="w-full rounded-lg bg-[#0f596f] py-2 text-sm font-medium text-white">
                  Zuruckgeben
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
