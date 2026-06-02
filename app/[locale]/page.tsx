import { Link } from "@/src/i18n/routing";
import { ArrowRight, ShieldCheck, Repeat, BellRing } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getTranslations } from "next-intl/server";

export default async function LandingPage() {
  const t = await getTranslations("LandingPage");

  return (
    <div className="min-h-screen bg-[#faf9f8] flex flex-col text-[#1a1c1c]">
      {/* Header with Logo */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-[#c0c8cb] bg-[#faf9f8]/90 backdrop-blur-md">
        <Link href="/" className="flex flex-col md:flex-row items-center justify-center md:-gap-2">
          <img
            src="/theBorrow-logo.png"
            alt="TheBorrow Logo"
            className="h-10 md:h-11"
          />
          <span className="text-sm md:text-title-md font-black text-[#003644] mt-1 md:mt-0 leading-none">The Borrow</span>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <LanguageSwitcher />
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-[#003644] hover:bg-[#eeeeed] rounded-lg transition-colors"
          >
            {t("login")}
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium text-white bg-[#003644] hover:brightness-110 rounded-lg transition-all"
          >
            {t("signup")}
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 py-20 md:py-32 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-[#003644] tracking-tight mb-6 leading-tight">
            {t("heroTitle1")}
            <span className="text-[#0d566b]">{t("heroTitleLend")}</span>
            {t("heroTitleAnd")}
            <span className="text-[#f7952f]">{t("heroTitleBorrow")}</span>
            {t("heroTitlePunct")}
          </h1>
          <p className="text-lg md:text-xl text-[#40484b] mb-10 max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium text-white bg-[#003644] hover:bg-[#004b5f] rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            {t("startTracking")}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        {/* Why Us Section */}
        <section className="bg-[#f4f3f2] py-20 px-6 border-y border-[#c0c8cb]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003644] mb-4">
                {t("whyTitle")}
              </h2>
              <p className="text-[#40484b] max-w-2xl mx-auto text-lg">
                {t("whySubtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#c0c8cb]">
                <div className="w-14 h-14 bg-[#eeeeed] rounded-xl flex items-center justify-center mb-6 text-[#003644]">
                  <Repeat className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1a1c1c]">
                  {t("feature1Title")}
                </h3>
                <p className="text-[#40484b]">{t("feature1Desc")}</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#c0c8cb]">
                <div className="w-14 h-14 bg-[#eeeeed] rounded-xl flex items-center justify-center mb-6 text-[#003644]">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1a1c1c]">
                  {t("feature2Title")}
                </h3>
                <p className="text-[#40484b]">{t("feature2Desc")}</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#c0c8cb]">
                <div className="w-14 h-14 bg-[#eeeeed] rounded-xl flex items-center justify-center mb-6 text-[#003644]">
                  <BellRing className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1a1c1c]">
                  {t("feature3Title")}
                </h3>
                <p className="text-[#40484b]">{t("feature3Desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#003644] mb-6">
            {t("ctaTitle")}
          </h2>
          <p className="text-lg text-[#40484b] mb-10">{t("ctaSubtitle")}</p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-[#003644] bg-[#b6ebfe] hover:bg-[#9cdffc] rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            {t("createAccount")}
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#003644] text-white/80 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xl font-black text-white">The Borrow</div>
          <p className="text-sm">
            © {new Date().getFullYear()} TheBorrow. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              {t("privacy")}
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              {t("terms")}
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              {t("contact")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
