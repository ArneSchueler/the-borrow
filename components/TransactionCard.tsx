import { EnrichedTransaction } from "@/lib/data";
import { format } from "date-fns";

export function MobileTransactionCard({ t }: { t: EnrichedTransaction }) {
  const isOverdue = t.expectedReturnDate && t.expectedReturnDate < new Date();
  
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#d9dddf] bg-white p-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f1f3f4] text-[#5b6468]">
        {t.type === "MONEY" ? "€" : "📦"}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[22px] md:text-[26px] font-semibold text-[#21272a]">
          {t.partyName}
        </p>
        <p className="truncate text-[16px] md:text-[20px] text-[#40484b]">
          {t.type === "MONEY" ? "Geld" : t.itemName || "Gegenstand"}
        </p>
      </div>
      <div className="text-right">
        {t.amount ? (
          <p className="text-[24px] md:text-[30px] font-bold text-[#1b1f21]">{t.amount} €</p>
        ) : null}
        {t.expectedReturnDate ? (
          <p className={`text-[16px] md:text-[20px] ${isOverdue ? 'font-semibold text-[#d0262d]' : 'text-[#40484b]'}`}>
            {isOverdue ? 'Überfällig' : `Fällig: ${format(t.expectedReturnDate, 'dd.MM.yyyy')}`}
          </p>
        ) : (
          <p className="text-[16px] md:text-[20px] text-[#40484b]">Kein Datum</p>
        )}
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
          <p className="text-[34px] font-bold text-[#1b1f21]">
            {t.amount ? `${t.amount} €` : (t.itemName || "Gegenstand")}
          </p>
          {isOverdue ? (
            <span className="rounded-full bg-[#ffdad6] px-3 py-1 text-xs font-semibold text-[#d0262d]">
              Überfällig
            </span>
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f1f3f4] text-[#5b6468]">
              {t.type === "MONEY" ? "€" : "📦"}
            </div>
          )}
        </div>
        <p className="text-[26px] font-semibold text-[#21272a] truncate">
          {t.partyName}
        </p>
        <p className="mt-1 text-[20px] text-[#40484b] truncate">
          {t.type === "MONEY" ? "Geld" : t.itemName || "Gegenstand"}
        </p>
        {t.expectedReturnDate ? (
          <p className="mt-1 text-[20px] text-[#40484b]">
            {isOverdue ? 'Überfällig' : `Fällig: ${format(t.expectedReturnDate, 'dd.MM.yyyy')}`}
          </p>
        ) : (
          <p className="mt-1 text-[20px] text-[#40484b]">Kein Datum</p>
        )}
      </div>
      <button className="mt-4 w-full rounded-lg border border-[#0d4f63] py-2 text-sm font-medium text-[#0d4f63]">
        Vorgang ansehen
      </button>
    </div>
  );
}
