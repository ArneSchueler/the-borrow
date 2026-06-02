"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");
  const t = useTranslations("Dashboard");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (inputValue) {
        params.set("q", inputValue);
      } else {
        params.delete("q");
      }
      
      const currentQuery = searchParams.get("q") || "";
      if (inputValue !== currentQuery) {
        startTransition(() => {
          router.replace(`${pathname}?${params.toString()}`);
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, pathname, router, searchParams]);

  return (
    <input
      type="search"
      placeholder={t("searchPlaceholder") || "Search transactions..."}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="w-full max-w-md rounded-full bg-[#f4f3f2] px-5 py-2 text-sm text-[#1a1c1c] placeholder:text-[#70787c] focus:outline-none focus:ring-2 focus:ring-[#003644]"
    />
  );
}
