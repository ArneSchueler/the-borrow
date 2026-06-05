import { DesktopNav, MobileNav } from "./Navigation";
import { logoutUser } from "./actions/auth";
import { NewTransactionFab } from "@/components/NewTransactionFab";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SearchBar } from "@/components/SearchBar";
import { Suspense } from "react";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { NotificationProvider } from "@/components/NotificationProvider";

export default function MainLayout({
  children,
  showFab,
}: {
  children: React.ReactNode;
  showFab?: boolean;
}) {
  return (
    <NotificationProvider>
      <div className="min-h-screen overflow-x-hidden bg-[#faf9f8] text-[#1a1c1c] md:flex">
        {/* Mobile Header */}
        <header className="mx-auto flex w-full max-w-md items-center justify-between border-b border-[#d8dcdf] px-4 py-3 md:hidden">
          <div className="text-[11px] font-black text-[#0e4d62]">
            The Borrow
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <NotificationDropdown />
            <div className="h-8 w-8 rounded-full bg-[#d49a73]" />
          </div>
        </header>

        {/* Desktop Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-[220px] shrink-0 flex-col border-r border-[#c0c8cb] bg-[#f4f3f2] px-4 py-6 md:flex">
          <div className="mb-10 px-2">
            <div className="text-xl font-black text-[#003644]">The Borrow</div>
            <p className="text-[11px] text-[#40484b]">Financial Clarity</p>
          </div>
          <DesktopNav />
        </aside>

        <main className="min-w-0 flex-1 bg-surface-container-low flex flex-col">
          {/* Desktop Header */}
          <header className="sticky top-0 z-10 hidden px-container-padding-desktopitems-center justify-between border-b border-[#c0c8cb] bg-[#faf9f8] px-8 py-3 md:flex">
            <Suspense
              fallback={
                <div className="w-full max-w-md rounded-full bg-[#f4f3f2] px-5 py-2 h-9" />
              }
            >
              <SearchBar />
            </Suspense>
            <div className="ml-6 flex items-center gap-4 text-[#555d61]">
              <LanguageSwitcher />
              <NotificationDropdown />
              <form action={logoutUser}>
                <button className="rounded-full border border-[#c0c8cb] px-3 py-1 text-xs">
                  Log out
                </button>
              </form>
            </div>
          </header>

          <div className="flex-1 pb-24 md:pb-0">{children}</div>
        </main>

        {/* Floating Action Buttons */}
        {showFab && <NewTransactionFab />}

        {/* Mobile Bottom Nav */}
        <MobileNav />
      </div>
    </NotificationProvider>
  );
}
