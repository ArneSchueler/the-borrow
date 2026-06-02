"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/routing";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 rounded-full text-[#555d61] hover:bg-[#e3e2e1] transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-[#c0c8cb] py-1 z-50 overflow-hidden">
          <button
            onClick={() => handleLocaleChange("de")}
            className={`w-full text-left px-4 py-2 text-sm ${
              locale === "de"
                ? "bg-[#e3e2e1] font-semibold text-[#1a1c1c]"
                : "text-[#555d61] hover:bg-[#f4f3f2]"
            }`}
          >
            Deutsch (DE)
          </button>
          <button
            onClick={() => handleLocaleChange("en")}
            className={`w-full text-left px-4 py-2 text-sm ${
              locale === "en"
                ? "bg-[#e3e2e1] font-semibold text-[#1a1c1c]"
                : "text-[#555d61] hover:bg-[#f4f3f2]"
            }`}
          >
            English (EN)
          </button>
        </div>
      )}
    </div>
  );
}
