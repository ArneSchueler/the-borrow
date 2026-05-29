import { auth } from "../../../auth";
import { redirect, Link } from "@/src/i18n/routing";
import MainLayout from "../MainLayout";
import { getUserTransactions } from "@/lib/data";
import {
  MobileTransactionCard,
  DesktopTransactionCard,
} from "@/components/TransactionCard";
import { getTranslations } from "next-intl/server";

export default async function DashboardPage() {
  const session = await auth();
  const t = await getTranslations("Dashboard");

  if (!session?.user?.email) {
    redirect("/login");
  }

  const transactions = await getUserTransactions(session.user.email);
  const lentTransactions = transactions.filter((tx) => tx.isLentByMe);
  const borrowedTransactions = transactions.filter((tx) => !tx.isLentByMe);

  return (
    <MainLayout showFab>
      {/* mobile */}
      <div className="mx-auto max-w-md space-y-6 px-4 pt-5 md:hidden">
        <section>
          <h1 className="text-display-lg text-primary">
            {t("title", { name: session.user.name || "Julian" })}
          </h1>
          <p className="mt-2 text-body-lg text-on-surface-variant">
            {t("subtitle")}
          </p>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#0d566b] p-4 text-white shadow-sm">
            <p className="text-[13px] opacity-95">{t("lent")}</p>
            <p className="mt-2 text-[39px] font-bold leading-none">
              {lentTransactions.length}
            </p>
            <p className="mt-1 text-[22px]">{t("transactions")}</p>
          </div>
          <div className="rounded-xl bg-[#f7952f] p-4 text-[#3a230e] shadow-sm">
            <p className="text-[13px] opacity-95">{t("borrowed")}</p>
            <p className="mt-2 text-[39px] font-bold leading-none">
              {borrowedTransactions.length}
            </p>
            <p className="mt-1 text-[22px]">{t("transactions")}</p>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-title-md text-title-md text-on-surface">
              {t("currentlyLent")}
            </h2>
            <button className="text-body-md font-medium text-primary hover:text-primary-container transition-colors">
              {t("viewAll")}
            </button>
          </div>

          <div className="space-y-2">
            {lentTransactions.length > 0 ? (
              lentTransactions
                .slice(0, 2)
                .map((tx) => <MobileTransactionCard key={tx.id} t={tx} />)
            ) : (
              <p className="text-[#40484b]">{t("noLentItems")}</p>
            )}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-title-md text-title-md text-on-surface">
              {t("currentlyBorrowed")}
            </h2>
            <button className="text-body-md font-medium text-primary hover:text-primary-container transition-colors">
              {t("viewAll")}
            </button>
          </div>

          <div className="space-y-2">
            {borrowedTransactions.length > 0 ? (
              borrowedTransactions
                .slice(0, 2)
                .map((tx) => <MobileTransactionCard key={tx.id} t={tx} />)
            ) : (
              <p className="text-[#40484b]">{t("noBorrowedItems")}</p>
            )}
          </div>
        </section>
      </div>

      {/* desktop */}
      <div className="hidden md:flex px-container-padding-desktop py-base max-w-7xl mx-auto w-full flex-col gap-section-gap md:px-8 lg:px-12 pt-8 pb-10">
        <section className="flex items-start justify-between">
          <div>
            <h1 className="text-display-lg text-primary">
              {t("title", { name: session.user.name || "Julian" })}
            </h1>
            <p className="mt-2 max-w-md text-body-lg text-on-surface-variant">
              {t("subtitle")}
            </p>
          </div>
          <section className="grid grid-cols-2 gap-3">
            <div className="w-[210px] rounded-2xl bg-[#0d566b] p-4 text-white shadow-sm">
              <p className="text-[13px] opacity-95">{t("lent")}</p>
              <p className="mt-2 text-[39px] font-bold leading-none">
                {lentTransactions.length}
              </p>
              <p className="mt-1 text-[22px]">{t("transactions")}</p>
            </div>
            <div className="w-[210px] rounded-2xl bg-[#f7952f] p-4 text-[#3a230e] shadow-sm">
              <p className="text-[13px] opacity-95">{t("borrowed")}</p>
              <p className="mt-2 text-[39px] font-bold leading-none">
                {borrowedTransactions.length}
              </p>
              <p className="mt-1 text-[22px]">{t("transactions")}</p>
            </div>
          </section>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-title-md text-title-md text-on-surface">
              {t("currentlyLent")}
            </h3>
            <button className="text-body-md font-medium text-primary hover:text-primary-container transition-colors">
              {t("viewAll")}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {lentTransactions.slice(0, 2).map((tx) => (
              <DesktopTransactionCard key={tx.id} t={tx} />
            ))}
            <Link
              href="?new-transaction=true"
              scroll={false}
              className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-outline-variant bg-surface-container-low p-6 text-outline hover:bg-surface-container hover:text-primary transition-colors group min-h-[200px]"
            >
              <span className="text-display-lg group-hover:scale-110 transition-transform">
                +
              </span>
              <span className="text-body-md mt-2">{t("newTransaction")}</span>
            </Link>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-title-md text-title-md text-on-surface">
              {t("currentlyBorrowed")}
            </h3>
            <button className="text-body-md font-medium text-primary hover:text-primary-container transition-colors">
              {t("viewAll")}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {borrowedTransactions.length > 0 ? (
              borrowedTransactions
                .slice(0, 2)
                .map((tx) => <DesktopTransactionCard key={tx.id} t={tx} />)
            ) : (
              <div className="col-span-2">
                <p className="text-[#40484b]">{t("noBorrowedItems")}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
