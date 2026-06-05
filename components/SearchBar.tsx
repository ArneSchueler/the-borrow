"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Euro, Package, Search, Upload, Download } from "lucide-react";
import { EnrichedTransaction } from "@/lib/data";
import { searchTransactions } from "@/app/[locale]/actions/transaction"; // Make sure to implement this Server Action

export function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<EnrichedTransaction[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Dashboard");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (inputValue.trim()) {
        setIsLoading(true);
        try {
          const data = await searchTransactions(inputValue);
          setResults(data);
          setIsOpen(true);
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#70787c]" />
        <input
          type="search"
          placeholder={t("searchPlaceholder") || "Search transactions..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => {
            if (inputValue.trim() && results.length > 0) setIsOpen(true);
          }}
          className="w-full rounded-full bg-[#f4f3f2] pl-10 pr-5 py-2 text-sm text-[#1a1c1c] placeholder:text-[#70787c] focus:outline-none focus:ring-2 focus:ring-[#003644]"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full rounded-xl border border-[#c0c8cb] bg-white py-2 shadow-lg z-50 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-3 text-sm text-[#70787c]">Searching...</div>
          ) : results.length > 0 ? (
            <ul className="flex flex-col">
              {results.map((transaction) => (
                <li key={transaction.id}>
                  <Link
                    href={`/transaction/${transaction.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#f4f3f2] transition-colors"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e6f2f5] text-[#0e4d62]">
                      {transaction.type === "MONEY" ? (
                        <Euro className="h-4 w-4" />
                      ) : (
                        <Package className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col overflow-hidden">
                      <span className="truncate text-sm font-medium text-[#1a1c1c]">
                        {transaction.amount
                          ? `${transaction.amount} €`
                          : transaction.itemName || "Item"}
                      </span>
                      <span className="truncate text-xs text-[#555d61]">
                        {transaction.partyName}
                      </span>
                    </div>
                    <div
                      className="shrink-0"
                      title={transaction.isLentByMe ? t("lent") : t("borrowed")}
                    >
                      {transaction.isLentByMe ? (
                        <Upload className="h-5 w-5 text-[#0d566b]" />
                      ) : (
                        <Download className="h-5 w-5 text-[#f7952f]" />
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-[#70787c]">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
