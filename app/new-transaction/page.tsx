"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Euro,
  PlusCircle,
  Save,
  SendHorizonal,
  Shield,
  UserRoundPlus,
} from "lucide-react";
import { createTransaction } from "../actions/transaction";
import MainLayout from "../MainLayout";

export default function NewTransactionPage() {
  const [type, setType] = useState<"money" | "object">("money");

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#faf9f8] text-[#1a1c1c]">
        <header className="sticky top-0 z-40 flex items-center border-b border-[#c0c8cb] bg-[#faf9f8] px-5 py-4 md:hidden">
          <button
            className="-ml-2 rounded-full p-2 hover:bg-[#eeeeed]"
            aria-label="Zuruck"
          >
            <ArrowLeft className="h-5 w-5 text-[#003644]" />
          </button>
          <h1 className="ml-2 text-[19px] font-semibold text-[#003644]">
            Neue Transaktion
          </h1>
        </header>

        <div className="hidden md:flex">
          <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col gap-4 border-r border-[#c0c8cb] bg-[#f4f3f2] p-6">
            <div className="mb-8">
              <h2 className="text-xl font-black text-[#003644]">TheBorrow</h2>
              <p className="text-xs text-[#40484b]">Financial Clarity</p>
            </div>
            <nav className="space-y-2 text-sm text-[#40484b]">
              <div className="rounded-lg px-4 py-3 hover:bg-[#e3e2e1]">
                Dashboard
              </div>
              <div className="rounded-lg px-4 py-3 hover:bg-[#e3e2e1]">
                Lent
              </div>
              <div className="rounded-lg px-4 py-3 hover:bg-[#e3e2e1]">
                Borrowed
              </div>
              <div className="rounded-lg px-4 py-3 hover:bg-[#e3e2e1]">
                Settings
              </div>
            </nav>
          </aside>
        </div>

        <main className="mx-auto max-w-4xl px-5 pb-40 pt-6 md:ml-64 md:px-8">
          <div className="mb-10 hidden items-end justify-between md:flex">
            <div>
              <h1 className="text-[44px] font-semibold leading-tight text-[#003644]">
                New Transaction
              </h1>
              <p className="mt-2 text-[15px] text-[#40484b]">
                Log a new lend or borrow agreement with ease.
              </p>
            </div>
            <button className="rounded-full p-2 hover:bg-[#eeeeed]">x</button>
          </div>

          <div className="rounded-xl border border-[#c0c8cb] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
            <div className="hidden border-b border-[#c0c8cb] bg-[#f4f3f2] p-4 md:block">
              <div className="mx-auto flex w-fit rounded-lg border border-[#c0c8cb] bg-[#faf9f8] p-1">
                <button
                  type="button"
                  onClick={() => setType("money")}
                  className={`rounded-md px-6 py-2 text-sm font-medium transition ${type === "money" ? "bg-[#003644] text-white" : "text-[#40484b]"}`}
                >
                  {type === "money" ? "Geld" : "Money (Geld)"}
                </button>
                <button
                  type="button"
                  onClick={() => setType("object")}
                  className={`rounded-md px-6 py-2 text-sm font-medium transition ${type === "object" ? "bg-[#003644] text-white" : "text-[#40484b]"}`}
                >
                  {type === "object" ? "Gegenstand" : "Object (Gegenstand)"}
                </button>
              </div>
            </div>

            <form
              action={createTransaction}
              className="space-y-6 p-0 md:space-y-8 md:p-8"
            >
              <input type="hidden" name="type" value={type} />
              <div className="md:hidden space-y-2">
                <p className="px-5 pt-4 text-sm text-[#40484b]">
                  Art der Leihe
                </p>
                <div className="mx-5 relative flex h-12 items-center rounded-lg border border-[#d7dbde] bg-[#eeeeed] p-1">
                  <button
                    type="button"
                    onClick={() => setType("money")}
                    className={`z-10 h-full flex-1 rounded-md text-xs font-semibold ${type === "money" ? "bg-white text-[#003644] shadow-sm" : "text-[#40484b]"}`}
                  >
                    Geld
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("object")}
                    className={`z-10 h-full flex-1 rounded-md text-xs font-semibold ${type === "object" ? "bg-white text-[#003644] shadow-sm" : "text-[#40484b]"}`}
                  >
                    Gegenstand
                  </button>
                </div>
              </div>

              {type === "money" ? (
                <section className="grid grid-cols-1 gap-4 px-5 md:grid-cols-3 md:px-0">
                  <Field
                    name="amount"
                    label="Amount (€)"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                  />
                  <Field
                    name="interestRate"
                    label="Interest % (Optional)"
                    placeholder="0.0"
                    type="number"
                    step="0.01"
                  />
                  <Field
                    name="installmentPlan"
                    label="Installments (Optional)"
                    placeholder="Monthly / Weekly"
                  />
                </section>
              ) : (
                <section className="grid grid-cols-1 gap-6 px-5 md:grid-cols-2 md:px-0">
                  <div className="space-y-4">
                    <Field
                      name="itemName"
                      label="Object Name"
                      placeholder="e.g. Lawn Mower"
                    />
                    <div className="space-y-2">
                      <label className="px-1 text-sm text-[#40484b]">
                        Condition Description
                      </label>
                      <textarea
                        name="itemCondition"
                        className="w-full rounded-lg border border-[#c0c8cb] bg-[#f5f2ed] px-4 py-3 outline-none focus:ring-2 focus:ring-[#306576]"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="px-1 text-sm text-[#40484b]">
                      Photo Upload
                    </label>
                    <div className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#c0c8cb] bg-[#f5f2ed] text-center">
                      <PlusCircle className="mb-2 h-8 w-8 text-[#70787c]" />
                      <p className="text-sm text-[#70787c]">
                        Click or drag to upload object image
                      </p>
                    </div>
                  </div>
                </section>
              )}

              <div className="space-y-4 border-t border-[#c0c8cb] px-5 pt-6 md:space-y-6 md:px-0">
                <h3 className="text-[20px] font-semibold text-[#003644]">
                  Shared Details
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <label className="px-1 text-sm text-[#40484b]">Role</label>
                    <select
                      name="isCreatorLender"
                      className="w-full rounded-lg border border-[#c0c8cb] bg-[#f5f2ed] px-4 py-3 outline-none focus:ring-2 focus:ring-[#306576]"
                    >
                      <option value="true">I am lending</option>
                      <option value="false">I am borrowing</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <IconField
                      name="partnerEmail"
                      icon={<UserRoundPlus className="h-4 w-4" />}
                      label="Recipient/Lender Email"
                      placeholder="email@address.com"
                    />
                  </div>
                  <IconField
                    name="lendingDate"
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Date of Lending"
                    type="date"
                  />
                  <IconField
                    name="expectedReturnDate"
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Expected Return Date"
                    type="date"
                  />
                  <div className="space-y-2 md:col-span-2">
                    <label className="px-1 text-sm text-[#40484b]">
                      Personal Notes
                    </label>
                    <textarea
                      name="notes"
                      className="w-full rounded-lg border border-[#c0c8cb] bg-[#f5f2ed] px-4 py-3 outline-none focus:ring-2 focus:ring-[#306576]"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <div className="hidden justify-end gap-4 pt-4 md:flex">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-[#003644] hover:underline"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#003644] px-8 py-3 text-sm font-medium text-white"
                >
                  <SendHorizonal className="h-4 w-4" />
                  Create Agreement
                </button>
              </div>

              <footer className="fixed bottom-20 left-0 right-0 border-t border-[#c0c8cb] bg-[#faf9f8]/95 p-3 backdrop-blur md:hidden">
                <div className="mx-auto flex max-w-md gap-4">
                  <button
                    type="button"
                    className="h-12 flex-1 rounded-full border border-[#003644] font-semibold text-[#003644]"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#003644] font-semibold text-white"
                  >
                    <Save className="h-4 w-4" />
                    Speichern
                  </button>
                </div>
              </footer>
            </form>
          </div>

          <div className="mt-4 rounded-xl border border-[#c0c8cb] bg-[#f4f3f2] p-4 md:hidden">
            <div className="flex gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#134e5e] text-[#b6ebfe]">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-[17px] font-semibold text-[#1a1c1c]">
                  Sichere Leihe
                </h3>
                <p className="text-xs text-[#40484b]">
                  Alle Transaktionen werden privat und sicher im
                  Borrow-Protokoll gespeichert.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 hidden grid-cols-2 gap-6 md:grid">
            <div className="rounded-xl bg-[#0d566b] p-6 text-[#b6ebfe]">
              <Shield className="mb-2 h-5 w-5" />
              <h3 className="mb-2 text-xl font-semibold">Communal Trust</h3>
              <p className="text-sm">
                All transactions are logged with digital timestamps to ensure
                clarity and peace of mind for both parties.
              </p>
            </div>
            <div className="rounded-xl bg-[#e9e8e7] p-6">
              <p className="mb-1 text-xs font-bold text-[#003644]">PRO TIP</p>
              <p className="text-sm text-[#40484b]">
                Adding a photo for objects helps document the condition at the
                time of lending.
              </p>
            </div>
          </div>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 border-t border-[#c0c8cb] bg-[#faf9f8] md:hidden">
          <div className="mx-auto grid h-20 max-w-md grid-cols-3 place-items-center text-xs text-[#40484b]">
            <span>Dashboard</span>
            <span>Verliehen</span>
            <span>Geliehen</span>
          </div>
        </nav>

        <button className="fixed bottom-8 right-8 hidden h-14 w-14 items-center justify-center rounded-full bg-[#003644] text-white shadow-lg md:flex">
          <PlusCircle className="h-7 w-7" />
        </button>
      </div>
    </MainLayout>
  );
}

function Field({
  label,
  placeholder,
  name,
  type = "text",
  step,
}: {
  label: string;
  placeholder: string;
  name?: string;
  type?: string;
  step?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="px-1 text-sm text-[#40484b]">{label}</label>
      <div className="relative">
        <input
          name={name}
          type={type}
          step={step}
          className="w-full rounded-lg border border-[#c0c8cb] bg-[#f5f2ed] px-4 py-3 outline-none focus:ring-2 focus:ring-[#306576]"
          placeholder={placeholder}
        />
        {label.includes("Amount") ? (
          <Euro className="absolute right-3 top-3.5 h-4 w-4 text-[#40484b]" />
        ) : null}
      </div>
    </div>
  );
}

function IconField({
  icon,
  label,
  placeholder,
  name,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  placeholder?: string;
  name?: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="px-1 text-sm text-[#40484b]">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-3.5 text-[#70787c]">{icon}</span>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-full rounded-lg border border-[#c0c8cb] bg-[#f5f2ed] py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#306576]"
        />
      </div>
    </div>
  );
}
