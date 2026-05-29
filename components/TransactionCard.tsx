import { EnrichedTransaction } from "@/lib/data";
import { format } from "date-fns";
import { User, CalendarDays, Euro, Package } from "lucide-react";

export function MobileTransactionCard({ t }: { t: EnrichedTransaction }) {
  const isOverdue = t.expectedReturnDate && t.expectedReturnDate < new Date();

  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#d9dddf] bg-white p-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f1f3f4] text-[#5b6468]">
        {t.type === "MONEY" ? (
          <Euro className="h-6 w-6" />
        ) : (
          <Package className="h-6 w-6" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <User className="h-5 w-5 shrink-0 text-[#5b6468]" />
          <p className="truncate text-[22px] md:text-[26px] font-semibold text-[#21272a]">
            {t.partyName}
          </p>
        </div>
        <p className="truncate text-[16px] md:text-[20px] text-[#40484b]">
          {t.type === "MONEY" ? "Geld" : t.itemName || "Gegenstand"}
        </p>
      </div>
      <div className="text-right">
        {t.amount ? (
          <p className="text-[24px] md:text-[30px] font-bold text-[#1b1f21]">
            {t.amount} €
          </p>
        ) : null}
        <div
          className={`flex items-center justify-end gap-1.5 ${isOverdue ? "text-[#d0262d]" : "text-[#40484b]"}`}
        >
          <CalendarDays className="h-4 w-4 md:h-5 md:w-5 shrink-0" />
          {t.expectedReturnDate ? (
            <p
              className={`text-[16px] md:text-[20px] ${isOverdue ? "font-semibold" : ""}`}
            >
              {isOverdue
                ? "Überfällig"
                : `Fällig: ${format(t.expectedReturnDate, "dd.MM.yyyy")}`}
            </p>
          ) : (
            <p className="text-[16px] md:text-[20px]">Kein Datum</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function DesktopTransactionCard({ t }: { t: EnrichedTransaction }) {
  const isOverdue = t.expectedReturnDate && t.expectedReturnDate < new Date();

  return (
    <div className="rounded-2xl border border-[#d8dcdf] bg-white p-4 flex flex-col justify-between">
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
      <button className="mt-4 w-full rounded-lg border border-[#0d4f63] py-2 text-sm font-medium text-[#0d4f63]">
        Vorgang ansehen
      </button>
    </div>
  );
}
