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
      {/* mobile */}
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

      {/* desktop */}
      <div className="hidden md:block mx-auto w-full max-w-6xl px-container-desktop  pb-10 pt-8 space-y-section-gap">
        <section className="flex items-start justify-between">
          <div>
            <h2 className="text-display-lg text-primary">Overview</h2>
            <p className="mt-2 max-w-md text-body-lg text-on-surface-variant">
              Manage your trust and shared assets in one place.
            </p>
          </div>
          <section className="grid grid-cols-2 gap-3">
            <div className="w-[210px] rounded-2xl bg-[#0d566b] p-4 text-white shadow-sm">
              <p className="text-[13px] opacity-95">Verliehen</p>
              <p className="mt-2 text-[39px] font-bold leading-none">2</p>
              <p className="mt-1 text-[22px]">Vorgange</p>
            </div>
            <div className="w-[210px] rounded-2xl bg-[#f7952f] p-4 text-[#3a230e] shadow-sm">
              <p className="text-[13px] opacity-95">Geliehen</p>
              <p className="mt-2 text-[39px] font-bold leading-none">1</p>
              <p className="mt-1 text-[22px]">Vorgang</p>
            </div>
          </section>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-display-md text-on-surface">Lent</h3>
            <button className="text-body-md font-medium text-primary hover:text-primary-container transition-colors">
              View All
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-3xl border border-outline-variant bg-surface p-6 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.04)] transition-shadow">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-headline-lg text-primary tabular-nums">
                  $450.00
                </p>
                <span className="rounded-full bg-primary-fixed text-on-primary-fixed px-3 py-1 text-label-sm">
                  Active
                </span>
              </div>
              <p className="text-title-md text-on-surface">
                Canon EOS R5 Camera
              </p>
              <p className="mt-2 text-body-md text-on-surface-variant">
                Lukas Weber
              </p>
              <p className="mt-1 text-body-md text-on-surface-variant">
                Due Oct 24, 2023
              </p>
              <button className="mt-6 w-full rounded border border-primary py-3 text-body-md font-medium text-primary hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors">
                Confirm Return
              </button>
            </div>
            <div className="rounded-3xl border border-outline-variant bg-surface p-6 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.04)] transition-shadow">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-headline-lg text-primary tabular-nums">
                  $1,000.00
                </p>
                <span className="rounded-full bg-error-container text-on-error-container px-3 py-1 text-label-sm">
                  Overdue
                </span>
              </div>
              <p className="text-title-md text-on-surface">Personal Loan</p>
              <p className="mt-2 text-body-md text-on-surface-variant">
                Elena Schmidt
              </p>
              <p className="mt-1 text-body-md text-on-surface-variant">
                Due Oct 15, 2023
              </p>
              <button className="mt-6 w-full rounded border border-primary py-3 text-body-md font-medium text-primary hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors">
                Remind Party
              </button>
            </div>
            <Link
              href="/new-transaction"
              className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-outline-variant bg-surface-container-low p-6 text-outline hover:bg-surface-container hover:text-primary transition-colors group"
            >
              <span className="text-display-lg group-hover:scale-110 transition-transform">
                +
              </span>
              <span className="text-body-md mt-2">Lend something new</span>
            </Link>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-display-md text-on-surface">Borrowed</h3>
            <button className="text-body-md font-medium text-primary hover:text-primary-container transition-colors">
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl border border-outline-variant bg-surface p-6 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.04)] transition-shadow">
              <p className="text-headline-lg text-on-surface">
                Drill & Tool Kit
              </p>
              <p className="text-body-lg text-on-surface-variant mt-1">
                Borrowed from: Marco Polo
              </p>
              <div className="mt-6 flex gap-3">
                <button className="rounded bg-primary px-6 py-3 text-body-md font-medium text-on-primary hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors">
                  Contact Owner
                </button>
                <button className="rounded border border-primary px-6 py-3 text-body-md font-medium text-primary hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors">
                  Request Extension
                </button>
              </div>
            </div>
            <div className="rounded-3xl border border-outline-variant bg-surface p-6 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.04)] transition-shadow">
              <p className="text-headline-lg text-on-surface tabular-nums">
                $320.00
              </p>
              <p className="text-body-lg text-on-surface-variant mt-1">
                Owed to: Sarah Jenkins
              </p>
              <div className="mt-6 flex gap-3">
                <button className="rounded bg-secondary px-6 py-3 text-body-md font-medium text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors">
                  Repay Now
                </button>
                <button className="rounded border border-primary px-6 py-3 text-body-md font-medium text-primary hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors">
                  Chat
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
