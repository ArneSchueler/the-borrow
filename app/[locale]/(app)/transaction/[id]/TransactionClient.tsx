"use client";

import { useState } from "react";
import { Link } from "@/src/i18n/routing";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Gavel,
  Group,
  Info,
  ShieldCheck,
  Euro,
  Package,
} from "lucide-react";
import { format } from "date-fns";
import { EnrichedTransaction } from "@/lib/data";
import { confirmTransaction } from "@/app/[locale]/actions/transaction";

export default function TransactionClient({
  transaction,
  userName,
}: {
  transaction: EnrichedTransaction;
  userName: string;
}) {
  const [agreed, setAgreed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isMoney = transaction.type === "MONEY";

  const lenderName = transaction.isLentByMe
    ? `${userName} (Du)`
    : transaction.partyName;
  const borrowerName = transaction.isLentByMe
    ? transaction.partyName
    : `${userName} (Du)`;

  const hasConfirmed = transaction.isCreator
    ? transaction.creatorConfirmed
    : transaction.partnerConfirmed;
    
  const otherPartyConfirmed = transaction.isCreator
    ? transaction.partnerConfirmed
    : transaction.creatorConfirmed;

  const isFullyConfirmed = transaction.creatorConfirmed && transaction.partnerConfirmed;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await confirmTransaction(transaction.id);
      setOpenModal(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Mobile Back Button */}
      <div className="mb-2 flex items-center gap-2 px-5 pt-4 md:hidden">
        <Link
          href="/dashboard"
          className="-ml-2 rounded-full p-2 hover:bg-[#eeeeed]"
          aria-label="Zurück"
        >
          <ArrowLeft className="h-5 w-5 text-[#003644]" />
        </Link>
        <h1 className="text-[20px] font-semibold text-[#003644]">
          Transaktionsübersicht
        </h1>
      </div>

      {/* Mobile Content */}
      <div className="mx-auto max-w-md px-5 pb-44 md:hidden">
        <section className="mb-6">
          <p className="mb-1 text-[10px] uppercase tracking-wider text-[#40484b]">
            {isMoney ? "Geld Details" : "Leihgabe Details"}
          </p>
          <h2 className="text-[38px] font-semibold leading-none text-[#003644]">
            {isMoney
              ? `${transaction.amount} €`
              : transaction.itemName || "Gegenstand"}
          </h2>
          <div className="mt-2 flex gap-2">
            <span className="rounded-full bg-[#ffdcc3] px-3 py-1 text-[11px]">
              Privat
            </span>
            {transaction.expectedReturnDate && (
              <span className="rounded-full bg-[#e9e8e7] px-3 py-1 text-[11px]">
                Bis {format(transaction.expectedReturnDate, "dd.MM.yyyy")}
              </span>
            )}
            {isFullyConfirmed && (
              <span className="rounded-full bg-green-100 text-green-800 px-3 py-1 text-[11px]">
                Bestätigt
              </span>
            )}
          </div>
        </section>

        <StackCard
          title="Beteiligte Personen"
          icon={<Group className="h-4 w-4" />}
        >
          <Party label="Verleiher" name={lenderName} verified />
          <div className="my-4 h-px bg-[#c0c8cb]" />
          <Party label="Entleiher" name={borrowerName} />
        </StackCard>

        <StackCard
          title={isMoney ? "Betrag & Details" : "Gegenstand & Zustand"}
          icon={<Info className="h-4 w-4" />}
        >
          <div className="space-y-3">
            <div className="flex justify-between">
              <div>
                <p className="text-xs uppercase text-[#40484b]">Vorgangs-ID</p>
                <p className="font-mono">
                  {transaction.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
              <span className="text-[#70787c]">
                {isMoney ? (
                  <Euro className="h-5 w-5" />
                ) : (
                  <Package className="h-5 w-5" />
                )}
              </span>
            </div>
            <div className="rounded-lg bg-[#f4f3f2] p-3 text-sm italic">
              &quot;{isMoney ? "Geliehener Betrag." : "Wie vereinbart übergeben."}&quot;
            </div>
          </div>
        </StackCard>

        <StackCard title="Bedingungen" icon={<Gavel className="h-4 w-4" />}>
          <div className="space-y-4">
            <Term
              icon={<CalendarDays className="h-4 w-4 text-[#76330d]" />}
              label="Fälligkeit"
              value={
                transaction.expectedReturnDate
                  ? format(transaction.expectedReturnDate, "dd. MMM yyyy")
                  : "Kein Datum"
              }
            />
            {!isMoney && (
              <div className="flex gap-2 rounded-lg bg-[#ffdad6] p-3 text-sm text-[#93000a]">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <p>
                  Bei Beschädigung oder Verlust haftet der Entleiher in vollem
                  Umfang des Wiederbeschaffungswerts.
                </p>
              </div>
            )}
          </div>
        </StackCard>

        {!hasConfirmed && !isFullyConfirmed && (
          <label className="mt-6 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-5 w-5 rounded border-[#c0c8cb]"
            />
            <span className="text-[15px] text-[#40484b]">
              Ich bestätige, dass ich die{" "}
              <span className="font-semibold text-[#003644] underline">
                Nutzungsbedingungen
              </span>{" "}
              und Haftungsregeln gelesen habe und akzeptiere.
            </span>
          </label>
        )}
      </div>

      {/* Desktop Content */}
      <div className="hidden px-8 py-6 md:block">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-[#40484b]">
            <Link
              href="/dashboard"
              className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#003644]"
            >
              <ArrowLeft className="h-[18px] w-[18px]" />
              Back to Dashboard
            </Link>
          </div>

          <h1 className="text-[44px] font-semibold leading-tight text-[#003644]">
            Transaction Overview
          </h1>
          <p className="mt-2 text-[#40484b]">
            Overview of your transaction details.
          </p>

          <div className="mt-8 grid grid-cols-12 gap-6">
            <div className="col-span-8 space-y-6">
              <div className="rounded-xl border border-[#c0c8cb] bg-white p-6">
                <div className="flex gap-6">
                  <div className="flex h-40 w-40 items-center justify-center rounded-lg bg-[linear-gradient(180deg,#d8d2ca,#b8aa96)] text-white">
                    {isMoney ? (
                      <Euro className="h-16 w-16" />
                    ) : (
                      <Package className="h-16 w-16" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex gap-2 mb-2">
                          <p className="inline-block rounded-full bg-[#134e5e]/10 px-3 py-1 text-xs text-[#003644]">
                            {isMoney ? "Money Loan" : "Item Loan"}
                          </p>
                          {isFullyConfirmed && (
                            <p className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">
                              Confirmed
                            </p>
                          )}
                        </div>
                        <h2 className="text-[38px] font-semibold leading-tight">
                          {isMoney
                            ? `${transaction.amount} €`
                            : transaction.itemName || "Gegenstand"}
                        </h2>
                      </div>
                      {isMoney && transaction.amount && (
                        <div className="text-right">
                          <p className="font-label-sm text-label-sm text-[#40484b]">
                            Value
                          </p>
                          <p className="font-title-md text-title-md text-[#003644]">
                            {transaction.amount} €
                          </p>
                        </div>
                      )}
                    </div>

                    <p className="mt-2 text-[#40484b]">
                      {isMoney
                        ? "Geliehener Betrag."
                        : "Wie vereinbart übergeben. To be returned in the same condition as received."}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4 border-t border-[#c0c8cb] pt-4">
                      <p className="text-sm text-[#40484b]">
                        End Date:{" "}
                        {transaction.expectedReturnDate
                          ? format(
                              transaction.expectedReturnDate,
                              "dd. MMM yyyy",
                            )
                          : "Kein Datum"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-[#c0c8cb] bg-white p-6">
                <h3 className="mb-4 text-[31px] font-semibold">
                  Terms & Conditions
                </h3>
                <ul className="space-y-3 text-[15px] text-[#40484b]">
                  {!isMoney && (
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#904d00] shrink-0" />
                      The borrower is responsible for physical damage beyond
                      normal wear and tear.
                    </li>
                  )}
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#904d00] shrink-0" />
                    Late returns may incur a penalty as agreed upon by both
                    parties.
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-span-4 space-y-6">
              <div className="rounded-xl border border-[#c0c8cb] bg-[#f4f3f2] p-6">
                <p className="mb-4 text-xs uppercase tracking-widest text-[#40484b]">
                  Parties Involved
                </p>
                <p className="text-sm font-medium flex items-center justify-between">
                  <span>
                    Lender:{" "}
                    <span className="font-normal text-[#40484b]">
                      {lenderName}
                    </span>
                  </span>
                  {(transaction.isCreatorLender ? transaction.creatorConfirmed : transaction.partnerConfirmed) && (
                     <CheckCircle2 className="w-4 h-4 text-green-600" />
                  )}
                </p>
                <p className="mt-2 text-sm font-medium flex items-center justify-between">
                  <span>
                    Borrower:{" "}
                    <span className="font-normal text-[#40484b]">
                      {borrowerName}
                    </span>
                  </span>
                  {(!transaction.isCreatorLender ? transaction.creatorConfirmed : transaction.partnerConfirmed) && (
                     <CheckCircle2 className="w-4 h-4 text-green-600" />
                  )}
                </p>
              </div>
              
              <div className="rounded-xl border-2 border-[#003644]/20 bg-white p-6 shadow-sm">
                {!hasConfirmed ? (
                  <>
                    <button
                      onClick={handleConfirm}
                      disabled={isLoading}
                      className="w-full rounded-lg bg-[#003644] py-3 font-semibold text-white hover:brightness-110 transition-all disabled:opacity-50"
                    >
                      {isLoading ? "Confirming..." : "Confirm Agreement"}
                    </button>
                    <p className="text-xs text-center text-[#40484b] mt-2">By confirming you agree to the terms.</p>
                  </>
                ) : !isFullyConfirmed ? (
                  <div className="text-center p-3 bg-amber-50 rounded-lg text-amber-800 text-sm font-medium">
                    Waiting for the other party to confirm.
                  </div>
                ) : (
                  <div className="text-center p-3 bg-green-50 rounded-lg text-green-800 text-sm font-medium">
                    Transaction is fully confirmed and active.
                  </div>
                )}

                <button className="mt-4 w-full rounded-lg border border-[#003644] py-3 text-sm text-[#003644] hover:bg-[#003644]/5 transition-colors">
                  Request Extension
                </button>
                <button className="mt-3 w-full rounded-lg border border-[#c0c8cb] py-3 text-sm text-[#40484b] hover:bg-gray-50 transition-colors">
                  Mark as finished
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Action Footer */}
      <div className="fixed bottom-20 left-0 right-0 z-30 border-t border-[#c0c8cb] bg-[#faf9f8] p-5 md:hidden">
        <div className="mx-auto flex max-w-md flex-col gap-2">
          {!hasConfirmed ? (
            <button
              disabled={!agreed || isLoading}
              onClick={handleConfirm}
              className="w-full rounded-xl bg-[#003644] py-4 font-semibold text-white disabled:opacity-50 hover:brightness-110 transition-all"
            >
              {isLoading ? "Wird bestätigt..." : "Vereinbarung bestätigen"}
            </button>
          ) : !isFullyConfirmed ? (
            <button
              disabled
              className="w-full rounded-xl bg-[#f4f3f2] py-4 font-semibold text-[#70787c] disabled:opacity-100"
            >
              Wartet auf Bestätigung...
            </button>
          ) : (
            <button
              disabled
              className="w-full rounded-xl bg-green-100 py-4 font-semibold text-green-800 disabled:opacity-100"
            >
              Vollständig bestätigt
            </button>
          )}
          <Link
            href="/dashboard"
            className="w-full rounded-lg py-2 text-center font-medium text-[#003644]"
          >
            Zurück
          </Link>
        </div>
      </div>

      {/* Success Modal */}
      {openModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1c1c]/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-[#003644]" />
            <h2 className="text-3xl font-semibold">Confirmed!</h2>
            <p className="mt-2 text-[#40484b]">
              Your transaction has been confirmed. {isFullyConfirmed ? "Both parties have agreed." : "We are waiting for the other party to confirm."}
            </p>
            <button
              onClick={() => setOpenModal(false)}
              className="mt-6 w-full rounded-lg bg-[#003644] py-3 font-semibold text-white hover:brightness-110 transition-all"
            >
              Great, thanks!
            </button>
          </div>
        </div>
      )}
    </>
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

function Party({
  label,
  name,
  verified = false,
}: {
  label: string;
  name: string;
  verified?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e3e2e1] font-bold text-[#40484b] uppercase">
        {name.charAt(0)}
      </div>
      <div className="flex-1">
        <p className="text-xs text-[#40484b]">{label}</p>
        <p className="font-medium">{name}</p>
      </div>
      {verified && <ShieldCheck className="h-4 w-4 text-[#003644]" />}
    </div>
  );
}

function Term({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#eeeeed]">
        {icon}
      </div>
      <div>
        <p className="text-xs text-[#40484b]">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
