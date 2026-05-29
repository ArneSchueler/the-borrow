"use client";

import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/src/i18n/routing";
import { useRef, useEffect, useState } from "react";
import {
  CalendarDays,
  Euro,
  PlusCircle,
  Save,
  SendHorizonal,
  UserRoundPlus,
} from "lucide-react";
import { createTransaction } from "@/app/[locale]/actions/transaction";

export function NewTransactionDialog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [type, setType] = useState<"money" | "object">("money");

  // The dialog is open if the `new-transaction` query parameter is set to 'true'
  const isDialogOpen = searchParams.get("new-transaction") === "true";
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // We use .showModal() to display the dialog with a darkened backdrop
    if (isDialogOpen && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    } else if (!isDialogOpen && dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
  }, [isDialogOpen]);

  const closeDialog = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("new-transaction");
    // We use `{ scroll: false }` to prevent the page from jumping to the top when the dialog closes
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return isDialogOpen ? (
    <dialog
      ref={dialogRef}
      onClose={closeDialog}
      className="rounded-xl shadow-2xl backdrop:bg-black/50 m-auto w-full max-w-4xl bg-white p-0 overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-[#c0c8cb] bg-[#faf9f8] px-6 py-4">
        <div>
          <h2 className="text-xl font-bold text-[#003644]">New Transaction</h2>
          <p className="text-sm text-[#40484b]">
            Log a new lend or borrow agreement with ease.
          </p>
        </div>
        <button
          onClick={closeDialog}
          className="rounded-full p-2 text-gray-500 hover:bg-[#eeeeed] hover:text-[#003644] transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="max-h-[80vh] overflow-y-auto bg-white">
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
          className="space-y-6 p-5 md:space-y-8 md:p-8"
        >
          <input type="hidden" name="type" value={type} />
          <div className="space-y-2 md:hidden">
            <p className="text-sm text-[#40484b]">Art der Leihe</p>
            <div className="relative flex h-12 items-center rounded-lg border border-[#d7dbde] bg-[#eeeeed] p-1">
              <button
                type="button"
                onClick={() => setType("money")}
                className={`z-10 flex-1 h-full rounded-md text-xs font-semibold ${type === "money" ? "bg-white text-[#003644] shadow-sm" : "text-[#40484b]"}`}
              >
                Geld
              </button>
              <button
                type="button"
                onClick={() => setType("object")}
                className={`z-10 flex-1 h-full rounded-md text-xs font-semibold ${type === "object" ? "bg-white text-[#003644] shadow-sm" : "text-[#40484b]"}`}
              >
                Gegenstand
              </button>
            </div>
          </div>

          {type === "money" ? (
            <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
            <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                <div className="flex h-full min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#c0c8cb] bg-[#f5f2ed] text-center transition hover:bg-[#eeeeed]">
                  <PlusCircle className="mb-2 h-8 w-8 text-[#70787c]" />
                  <p className="text-sm text-[#70787c]">
                    Click or drag to upload object image
                  </p>
                </div>
              </div>
            </section>
          )}

          <div className="space-y-4 border-t border-[#c0c8cb] pt-6 md:space-y-6">
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
              onClick={closeDialog}
              className="px-4 py-2 text-sm font-medium text-[#003644] hover:underline"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-[#003644] hover:underline"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-[#003644] px-8 py-3 text-sm font-medium text-white transition-all hover:brightness-110"
            >
              <SendHorizonal className="h-4 w-4" />
              Create Agreement
            </button>
          </div>

          <div className="sticky bottom-0 left-0 right-0 -mx-5 -mb-5 mt-4 border-t border-[#c0c8cb] bg-[#faf9f8]/95 p-4 backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-md gap-4">
              <button
                type="button"
                onClick={closeDialog}
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
          </div>
        </form>
      </div>
    </dialog>
  ) : null;
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
