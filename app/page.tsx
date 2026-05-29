import Link from "next/link";
import { ArrowRight, ShieldCheck, Repeat, BellRing } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#faf9f8] flex flex-col text-[#1a1c1c]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-[#c0c8cb] bg-[#faf9f8]/90 backdrop-blur-md">
        <div className="text-2xl font-black text-[#003644]">TheBorrow</div>
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-[#003644] hover:bg-[#eeeeed] rounded-lg transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-[#003644] hover:brightness-110 rounded-lg transition-all"
          >
            Sign up
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 py-20 md:py-32 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-[#003644] tracking-tight mb-6 leading-tight">
            Keep track of what you <span className="text-[#0d566b]">lend</span>{" "}
            & <span className="text-[#f7952f]">borrow</span>.
          </h1>
          <p className="text-lg md:text-xl text-[#40484b] mb-10 max-w-2xl mx-auto">
            TheBorrow is the easiest way to document your personal loans,
            borrowed items, and shared expenses. Say goodbye to awkward
            reminders and lost items.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium text-white bg-[#003644] hover:bg-[#004b5f] rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Start tracking for free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        {/* Why Us Section */}
        <section className="bg-[#f4f3f2] py-20 px-6 border-y border-[#c0c8cb]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003644] mb-4">
                Why use TheBorrow?
              </h2>
              <p className="text-[#40484b] max-w-2xl mx-auto text-lg">
                Build trust with your friends and family by keeping everything
                documented securely and clearly.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#c0c8cb]">
                <div className="w-14 h-14 bg-[#eeeeed] rounded-xl flex items-center justify-center mb-6 text-[#003644]">
                  <Repeat className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1a1c1c]">
                  Clear Overview
                </h3>
                <p className="text-[#40484b]">
                  Easily see what you've lent out and what you've borrowed in
                  one central dashboard.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#c0c8cb]">
                <div className="w-14 h-14 bg-[#eeeeed] rounded-xl flex items-center justify-center mb-6 text-[#003644]">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1a1c1c]">
                  Secure Agreements
                </h3>
                <p className="text-[#40484b]">
                  Create digital records of your loans, including photos,
                  conditions, and expected return dates.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#c0c8cb]">
                <div className="w-14 h-14 bg-[#eeeeed] rounded-xl flex items-center justify-center mb-6 text-[#003644]">
                  <BellRing className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1a1c1c]">
                  No More Awkwardness
                </h3>
                <p className="text-[#40484b]">
                  Keep relationships healthy with clear expectations and
                  straightforward accountability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#003644] mb-6">
            Ready to bring clarity to your sharing?
          </h2>
          <p className="text-lg text-[#40484b] mb-10">
            Join today and never lose track of a loaned item or borrowed money
            again.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-[#003644] bg-[#b6ebfe] hover:bg-[#9cdffc] rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Create your free account
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#003644] text-white/80 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xl font-black text-white">TheBorrow</div>
          <p className="text-sm">
            © {new Date().getFullYear()} TheBorrow. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
