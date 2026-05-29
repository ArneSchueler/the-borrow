import { Link } from "@/src/i18n/routing";
import { PlusCircle } from "lucide-react";
import { NewTransactionDialog } from "./NewTransactionDialog";

export function NewTransactionFab() {
  return (
    <>
      {/* Mobile */}
      <Link
        href="?new-transaction=true"
        scroll={false}
        className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#004b5f] text-3xl text-white shadow-lg transition-transform active:scale-95 md:hidden"
      >
        +
      </Link>
      {/* Desktop */}
      <Link
        href="?new-transaction=true"
        scroll={false}
        className="fixed bottom-8 right-8 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-[#003644] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 md:flex"
      >
        <PlusCircle className="h-7 w-7" />
      </Link>

      <NewTransactionDialog />
    </>
  );
}
