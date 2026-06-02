import { EnrichedTransaction } from "@/lib/data";
import { format } from "date-fns";
import { User, CalendarDays, Euro, Package, Clock } from "lucide-react";
import { Link } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";

export function MobileTransactionCard({ t }: { t: EnrichedTransaction }) {
  const isOverdue = t.expectedReturnDate && t.expectedReturnDate < new Date();
  const tCard = useTranslations("TransactionCard");
  const tBtn = useTranslations("Buttons");
  
  const isFullyConfirmed = t.creatorConfirmed && t.partnerConfirmed;

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-[#d8dcdf] bg-white p-4 transition-all duration-300 hover:-translate-y-[2px] hover:border-[#134e5e] hover:shadow-md">
      <Link href={`/transaction/${t.id}`} className="group block flex-1">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-title-md text-title-md text-primary group-hover:underline">
            {t.amount ? `${t.amount} €` : t.itemName || tCard("itemFallback")}
          </p>
          {isOverdue ? (
            <span className="rounded-full bg-[#ffdad6] px-3 py-1 text-xs font-semibold text-[#d0262d]">
              {tCard("overdue")}
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
                ? tCard("overdue")
                : tCard("due", { date: format(t.expectedReturnDate, "dd.MM.yyyy") })}
            </p>
          ) : (
            <p className="font-body-md">{tCard("noDate")}</p>
          )}
        </div>
        
        {!isFullyConfirmed && (
          <div className="mt-2 flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2 py-1 rounded-md inline-flex w-fit">
            <Clock className="h-3 w-3" />
            <p className="text-xs font-medium">{tCard("awaitingConfirmation")}</p>
          </div>
        )}
      </Link>
      
      {isFullyConfirmed && (
        <div className="mt-4 flex gap-2">
          {t.isLentByMe ? (
            <>
              <button className="flex-1 rounded-lg bg-[#0d4f63] py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[#0a3d4c]">
                {tBtn("confirmReturn")}
              </button>
              <button className="flex-1 rounded-lg border border-[#0d4f63] py-2 text-center text-sm font-medium text-[#0d4f63] transition-colors hover:bg-[#f1f4f5]">
                {tBtn("remind")}
              </button>
            </>
          ) : (
            <>
              <button className="flex-1 rounded-lg bg-[#0d4f63] py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[#0a3d4c]">
                {t.type === "MONEY" ? tBtn("payNow") : tBtn("returnItem")}
              </button>
              <button className="flex-1 rounded-lg border border-[#0d4f63] py-2 text-center text-sm font-medium text-[#0d4f63] transition-colors hover:bg-[#f1f4f5]">
                {tBtn("extend")}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function DesktopTransactionCard({ t }: { t: EnrichedTransaction }) {
  return <MobileTransactionCard t={t} />;
}
