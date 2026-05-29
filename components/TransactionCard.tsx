import { EnrichedTransaction } from "@/lib/data";
import { format } from "date-fns";
import { User, CalendarDays, Euro, Package } from "lucide-react";
import Link from "next/link";

export function MobileTransactionCard({ t }: { t: EnrichedTransaction }) {
  const isOverdue = t.expectedReturnDate && t.expectedReturnDate < new Date();

  return (
    <Link
      href={`/transaction/${t.id}`}
      className="group flex flex-col justify-between rounded-2xl border border-[#d8dcdf] bg-white p-4 transition-all duration-300 hover:-translate-y-[2px] hover:border-[#134e5e] hover:shadow-md"
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="font-title-md text-title-md text-primary">
            {t.amount ? `${t.amount} €` : t.itemName || "Gegenstand"}
          </p>
          {isOverdue ? (
            <span className="rounded-full bg-[#ffdad6] px-3 py-1 text-xs font-semibold text-[#d0262d]">
              Überfällig
            </span>
          ) : (
            <div className="bg-primary-container text-on-primary-container flex items-center justify-center rounded-full px-3 py-1 font-label-sm text-label-sm">
              {t.type === "MONEY" ? (
                <Euro className="h-4 w-4" />
              ) : (
                <Package className="h-4 w-4" />
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[#40484b]">
          <User className="h-4 w-4 shrink-0" />
          <p className="font-body-md truncate">{t.partyName}</p>
        </div>
        <div
          className={`mt-1 flex items-center gap-1.5 ${isOverdue ? "text-[#d0262d]" : "text-[#40484b]"}`}
        >
          <CalendarDays className="h-4 w-4 shrink-0" />
          {t.expectedReturnDate ? (
            <p className="font-body-md">
              {isOverdue
                ? "Überfällig"
                : `Fällig: ${format(t.expectedReturnDate, "dd.MM.yyyy")}`}
            </p>
          ) : (
            <p className="font-body-md">Kein Datum</p>
          )}
        </div>
      </div>
      <div className="mt-4 w-full rounded-lg border border-[#0d4f63] py-2 text-center text-sm font-medium text-[#0d4f63] transition-colors group-hover:bg-[#0d4f63] group-hover:text-white">
        Vorgang ansehen
      </div>
    </Link>
  );
}

export function DesktopTransactionCard({ t }: { t: EnrichedTransaction }) {
  const isOverdue = t.expectedReturnDate && t.expectedReturnDate < new Date();

  return (
    <Link
      href={`/transaction/${t.id}`}
      className="group flex flex-col justify-between rounded-2xl border border-[#d8dcdf] bg-white p-4 transition-all duration-300 hover:-translate-y-[2px] hover:border-[#134e5e] hover:shadow-md"
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="font-title-md text-title-md text-primary">
            {t.amount ? `${t.amount} €` : t.itemName || "Gegenstand"}
          </p>
          {isOverdue ? (
            <span className="rounded-full bg-[#ffdad6] px-3 py-1 text-xs font-semibold text-[#d0262d]">
              Überfällig
            </span>
          ) : (
            <div className="bg-primary-container text-on-primary-container flex items-center justify-center rounded-full px-3 py-1 font-label-sm text-label-sm">
              {t.type === "MONEY" ? (
                <Euro className="h-4 w-4" />
              ) : (
                <Package className="h-4 w-4" />
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[#40484b]">
          <User className="h-4 w-4 shrink-0" />
          <p className="font-body-md truncate">{t.partyName}</p>
        </div>
        <div
          className={`mt-1 flex items-center gap-1.5 ${isOverdue ? "text-[#d0262d]" : "text-[#40484b]"}`}
        >
          <CalendarDays className="h-4 w-4 shrink-0" />
          {t.expectedReturnDate ? (
            <p className="font-body-md">
              {isOverdue
                ? "Überfällig"
                : `Fällig: ${format(t.expectedReturnDate, "dd.MM.yyyy")}`}
            </p>
          ) : (
            <p className="font-body-md">Kein Datum</p>
          )}
        </div>
      </div>
      <div className="mt-4 w-full rounded-lg border border-[#0d4f63] py-2 text-center text-sm font-medium text-[#0d4f63] transition-colors group-hover:bg-[#0d4f63] group-hover:text-white">
        Vorgang ansehen
      </div>
    </Link>
  );
}
