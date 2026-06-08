"use client";

import { useState, useMemo } from "react";
import { EnrichedTransaction } from "@/lib/data";
import { MobileTransactionCard } from "@/components/TransactionCard";

export type FilterType =
  | "ALL"
  | "RETURNING_SOON"
  | "OVERDUE"
  | "AWAITING_CONFIRMATION";

export function FilterableTransactions({
  transactions,
}: {
  transactions: EnrichedTransaction[];
}) {
  const [filter, setFilter] = useState<FilterType>("ALL");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const isCompleted = t.status === "COMPLETED";
      if (filter === "ALL") return true;

      if (filter === "OVERDUE") {
        return (
          t.expectedReturnDate &&
          new Date(t.expectedReturnDate) < new Date() &&
          !isCompleted
        );
      }

      if (filter === "RETURNING_SOON") {
        if (!t.expectedReturnDate || isCompleted) return false;
        const returnDate = new Date(t.expectedReturnDate);
        const now = new Date();
        const inSevenDays = new Date();
        inSevenDays.setDate(now.getDate() + 7);

        return returnDate >= now && returnDate <= inSevenDays;
      }

      if (filter === "AWAITING_CONFIRMATION") {
        return !(t.creatorConfirmed && t.partnerConfirmed) && !isCompleted;
      }

      return true;
    });
  }, [transactions, filter]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <FilterBadge
          label="All Items"
          active={filter === "ALL"}
          onClick={() => setFilter("ALL")}
        />
        <FilterBadge
          label="Returning Soon"
          active={filter === "RETURNING_SOON"}
          onClick={() => setFilter("RETURNING_SOON")}
        />
        <FilterBadge
          label="Overdue"
          active={filter === "OVERDUE"}
          onClick={() => setFilter("OVERDUE")}
        />
        <FilterBadge
          label="Awaiting Confirmation"
          active={filter === "AWAITING_CONFIRMATION"}
          onClick={() => setFilter("AWAITING_CONFIRMATION")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((t) => (
            <MobileTransactionCard key={t.id} t={t} />
          ))
        ) : (
          <p className="col-span-full py-8 text-center text-sm text-[#70787c]">
            No transactions found for this filter.
          </p>
        )}
      </div>
    </div>
  );
}

function FilterBadge({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-[#003644] text-white shadow-sm"
          : "border border-[#c0c8cb] bg-[#faf9f8] text-[#40484b] hover:bg-[#eeeeed]"
      }`}
    >
      {label}
    </button>
  );
}
