"use client";

import { useState } from "react";
import { AlertTriangle, ArrowLeft, CalendarDays, CheckCircle2, Gavel, Group, HelpCircle, Info, Plus, ShieldCheck } from "lucide-react";

export default function ReviewTransactionPage() {
  const [agreed, setAgreed] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf9f8] text-[#1a1c1c]">
      <header className="sticky top-0 z-40 flex items-center border-b border-[#c0c8cb] bg-[#faf9f8] px-5 py-4 md:hidden">
        <button className="-ml-2 rounded-full p-2 hover:bg-[#eeeeed]" aria-label="Zuruck">
          <ArrowLeft className="h-5 w-5 text-[#003644]" />
        </button>
        <h1 className="ml-2 text-[20px] font-semibold text-[#003644]">Transaktion prufen</h1>
      </header>

      <div className="mx-auto max-w-md px-5 pb-44 pt-4 md:hidden">
        <section className="mb-6">
          <p className="mb-1 text-[10px] uppercase tracking-wider text-[#40484b]">Leihgabe Details</p>
          <h2 className="text-[38px] font-semibold leading-none text-[#003644]">DJI Mavic 3 Pro</h2>
          <div className="mt-2 flex gap-2">
            <span className="rounded-full bg-[#ffdcc3] px-3 py-1 text-[11px]">Privat</span>
            <span className="rounded-full bg-[#e9e8e7] px-3 py-1 text-[11px]">3 Tage</span>
          </div>
        </section>

        <StackCard title="Beteiligte Personen" icon={<Group className="h-4 w-4" />}>
          <Party label="Verleiher" name="Stefan Meier" verified />
          <div className="my-4 h-px bg-[#c0c8cb]" />
          <Party label="Entleiher" name="Julia Schmidt (Du)" />
        </StackCard>

        <StackCard title="Gegenstand & Zustand" icon={<Info className="h-4 w-4" />}>
          <div className="space-y-3">
            <div className="flex justify-between">
              <div>
                <p className="text-xs uppercase text-[#40484b]">Seriennummer</p>
                <p className="font-mono">MV3P-9928-XL</p>
              </div>
              <span className="text-[#70787c]">Cam</span>
            </div>
            <div className="rounded-lg bg-[#f4f3f2] p-3 text-sm italic">
              "Neuwertig, keine Kratzer an den Linsen. Inklusive Ersatzpropeller und 2 Akkus."
            </div>
            <div className="flex gap-2">
              <div className="h-20 w-20 rounded-lg border border-[#c0c8cb] bg-[#e3e2e1]" />
              <div className="h-20 w-20 rounded-lg border border-[#c0c8cb] bg-[#e3e2e1]" />
            </div>
          </div>
        </StackCard>

        <StackCard title="Bedingungen" icon={<Gavel className="h-4 w-4" />}>
          <div className="space-y-4">
            <Term icon={<CalendarDays className="h-4 w-4 text-[#76330d]" />} label="Zeitraum" value="12. Okt - 15. Okt" />
            <Term icon={<ShieldCheck className="h-4 w-4 text-[#124d5d]" />} label="Sicherheitsleistung (Kaution)" value="150,00 EUR" />
            <div className="flex gap-2 rounded-lg bg-[#ffdad6] p-3 text-sm text-[#93000a]">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <p>Bei Beschadigung oder Verlust haftet der Entleiher in vollem Umfang des Wiederbeschaffungswerts.</p>
            </div>
          </div>
        </StackCard>

        <label className="mt-6 flex cursor-pointer items-start gap-3">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 h-5 w-5 rounded border-[#c0c8cb]" />
          <span className="text-[15px] text-[#40484b]">
            Ich bestatige, dass ich die <span className="font-semibold text-[#003644] underline">Nutzungsbedingungen</span> und Haftungsregeln gelesen habe und akzeptiere.
          </span>
        </label>
      </div>

      <div className="hidden md:flex">
        <aside className="sticky top-0 h-screen w-[220px] border-r border-[#c0c8cb] bg-[#f4f3f2] p-6">
          <h2 className="mb-1 text-xl font-black text-[#003644]">TheBorrow</h2>
          <p className="mb-8 text-xs text-[#40484b]">Financial Clarity</p>
          <nav className="space-y-2 text-sm text-[#40484b]">
            <div className="rounded-lg px-4 py-3 hover:bg-[#e3e2e1]">Dashboard</div>
            <div className="rounded-lg bg-[#e3e2e1] px-4 py-3 font-semibold">Lent</div>
            <div className="rounded-lg px-4 py-3 hover:bg-[#e3e2e1]">Borrowed</div>
            <div className="rounded-lg px-4 py-3 hover:bg-[#e3e2e1]">Settings</div>
          </nav>
        </aside>

        <main className="flex-1 px-8 py-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-[44px] font-semibold leading-tight text-[#003644]">Review Transaction</h1>
            <p className="mt-2 text-[#40484b]">Please verify the details below before finalizing the agreement.</p>

            <div className="mt-8 grid grid-cols-12 gap-6">
              <div className="col-span-8 space-y-6">
                <div className="rounded-xl border border-[#c0c8cb] bg-white p-6">
                  <div className="flex gap-6">
                    <div className="h-40 w-40 rounded-lg bg-[linear-gradient(180deg,#d8d2ca,#b8aa96)]" />
                    <div className="flex-1">
                      <p className="mb-2 inline-block rounded-full bg-[#134e5e]/10 px-3 py-1 text-xs text-[#003644]">Item Loan</p>
                      <h2 className="text-[38px] font-semibold leading-tight">Sony WH-1000XM4 Headphones</h2>
                      <p className="mt-2 text-[#40484b]">Premium noise-canceling headphones including the original travel case and charging cable.</p>
                      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-[#c0c8cb] pt-4">
                        <p className="text-sm text-[#40484b]">Start Date: Oct 24, 2023</p>
                        <p className="text-sm text-[#40484b]">End Date: Oct 31, 2023</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-[#c0c8cb] bg-white p-6">
                  <h3 className="mb-4 text-[31px] font-semibold">Terms & Conditions</h3>
                  <ul className="space-y-3 text-[15px] text-[#40484b]">
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#904d00]" />The borrower is responsible for physical damage beyond normal wear and tear.</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#904d00]" />Late returns may incur a penalty of EUR 5.00 per day.</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#904d00]" />Item handover happens at the agreed location.</li>
                  </ul>
                </div>
              </div>

              <div className="col-span-4 space-y-6">
                <div className="rounded-xl border border-[#c0c8cb] bg-[#f4f3f2] p-6">
                  <p className="mb-4 text-xs uppercase tracking-widest text-[#40484b]">Parties Involved</p>
                  <p className="text-sm">Lender: Sarah Mitchell</p>
                  <p className="mt-2 text-sm">Borrower (You): Alex Rivera</p>
                </div>
                <div className="rounded-xl border-2 border-[#003644]/20 bg-white p-6 shadow-sm">
                  <button onClick={() => setOpenModal(true)} className="w-full rounded-lg bg-[#003644] py-3 font-semibold text-white">
                    Confirm Agreement
                  </button>
                  <button className="mt-3 w-full rounded-lg border border-[#003644] py-3 text-sm text-[#003644]">Verlangerung anfragen</button>
                  <button className="mt-3 w-full rounded-lg border border-[#c0c8cb] py-3 text-sm text-[#40484b]">als beendet markieren</button>
                </div>
                <div className="flex gap-3 rounded-xl bg-[#ffdbcc] p-4 text-sm text-[#351000]">
                  <HelpCircle className="h-4 w-4" />
                  <p>Need Help? Our support team is available 24/7 for dispute mediation.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="fixed bottom-20 left-0 right-0 z-30 border-t border-[#c0c8cb] bg-[#faf9f8] p-5 md:hidden">
        <div className="mx-auto flex max-w-md flex-col gap-2">
          <button disabled={!agreed} className="w-full rounded-xl bg-[#003644] py-4 font-semibold text-white disabled:opacity-50">
            Vereinbarung bestatigen
          </button>
          <button className="w-full rounded-lg py-2 text-[#003644]">Abbrechen</button>
        </div>
      </footer>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-[#c0c8cb] bg-[#faf9f8] md:hidden">
        <div className="mx-auto grid h-20 max-w-md grid-cols-3 place-items-center text-xs text-[#40484b]">
          <span>Dashboard</span>
          <span>Verliehen</span>
          <span>Geliehen</span>
        </div>
      </nav>

      <button className="fixed bottom-8 right-8 hidden h-14 w-14 items-center justify-center rounded-full bg-[#003644] text-white shadow-lg md:flex">
        <Plus className="h-8 w-8" />
      </button>

      {openModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-[#003644]" />
            <h2 className="text-3xl font-semibold">Confirmed!</h2>
            <p className="mt-2 text-[#40484b]">
              Your transaction has been finalized and both parties have been notified.
            </p>
            <button onClick={() => setOpenModal(false)} className="mt-6 w-full rounded-lg bg-[#003644] py-3 font-semibold text-white">
              Great, thanks!
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StackCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-4 rounded-xl border border-[#c0c8cb] bg-white p-6">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-[#003644]">
        {icon}
        {title}
      </h3>
      {children}
    </section>
  );
}

function Party({ label, name, verified = false }: { label: string; name: string; verified?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-[#e3e2e1]" />
      <div className="flex-1">
        <p className="text-xs text-[#40484b]">{label}</p>
        <p className="font-medium">{name}</p>
      </div>
      {verified ? <ShieldCheck className="h-4 w-4 text-[#003644]" /> : null}
    </div>
  );
}

function Term({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded bg-[#eeeeed]">{icon}</div>
      <div>
        <p className="text-xs text-[#40484b]">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
