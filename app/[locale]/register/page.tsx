"use client";

import { useState } from "react";
import { registerUser } from "@/app/[locale]/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "@/src/i18n/routing";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    setSuccess("");

    const result = await registerUser(formData);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(result.success);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#faf9f8] text-[#1a1c1c]">
      <header className="relative flex h-48 items-center justify-center overflow-hidden bg-[#003644] px-6 lg:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="relative z-10 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#b6ebfe]">
            TheBorrow
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#b6ebfe]">
            Konto erstellen
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1120px] px-5 pb-12 pt-8 lg:flex lg:min-h-screen lg:items-center lg:px-6 lg:py-10">
        <div className="grid w-full overflow-hidden rounded-xl border border-[#c0c8cb] bg-white shadow-[0_20px_40px_-15px_rgba(0,54,68,0.04)] lg:min-h-[640px] lg:grid-cols-2">
          <section className="relative hidden overflow-hidden bg-[#003644] p-12 lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[28px_28px]" />
            </div>
            <div className="relative z-10">
              <p className="text-lg font-black tracking-tight text-white">
                TheBorrow
              </p>
              <h2 className="mt-8 max-w-sm text-5xl font-bold leading-tight text-white">
                Build trusted borrowing circles.
              </h2>
              <p className="mt-6 max-w-xs text-lg text-[#8abed1]">
                Create your account and start tracking loans transparently
                across your community.
              </p>
            </div>
          </section>

          <section className="flex flex-col justify-center bg-white p-6 md:p-10 lg:p-16">
            <div className="mb-10 flex flex-col items-center gap-2 lg:hidden">
              <p className="text-2xl font-black text-[#003644]">TheBorrow</p>
            </div>
            <div className="mx-auto w-full max-w-[400px]">
              <div className="mb-8 flex w-full border-b border-[#c0c8cb]">
                <Link
                  href="/login"
                  className="flex-1 py-3 text-center text-sm font-medium text-[#70787c] transition-colors hover:text-[#003644]"
                >
                  Anmelden
                </Link>
                <div className="flex-1 border-b-2 border-[#003644] py-3 text-center text-sm font-semibold text-[#003644]">
                  Registrieren
                </div>
              </div>

              <div className="mb-10 text-center">
                <h2 className="text-3xl font-semibold text-[#1a1c1c]">
                  Create Account
                </h2>
                <p className="mt-2 text-[#40484b]">
                  Set up your secure burrow profile.
                </p>
              </div>

              <form action={onSubmit} className="space-y-6">
                {error && <div className="text-sm text-red-600">{error}</div>}
                {success && (
                  <div className="text-sm text-emerald-700">{success}</div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="px-1 text-sm text-[#40484b]">
                    Vollstandiger Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Max Mustermann"
                    className="h-12 border-0 bg-[#f5f2ed] text-base focus-visible:ring-2 focus-visible:ring-[#003644]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="px-1 text-sm text-[#40484b]"
                  >
                    E-Mail Adresse
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@beispiel.de"
                    className="h-12 border-0 bg-[#f5f2ed] text-base focus-visible:ring-2 focus-visible:ring-[#003644]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="px-1 text-sm text-[#40484b]"
                  >
                    Passwort wahlen
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Mind. 8 Zeichen"
                    className="h-12 border-0 bg-[#f5f2ed] text-base focus-visible:ring-2 focus-visible:ring-[#003644]"
                    required
                  />
                </div>

                <p className="px-1 text-sm text-[#40484b]">
                  Mit der Registrierung akzeptieren Sie unsere{" "}
                  <a href="#" className="text-[#003644] underline">
                    AGB
                  </a>{" "}
                  und{" "}
                  <a href="#" className="text-[#003644] underline">
                    Datenschutzbestimmungen
                  </a>
                  .
                </p>

                <Button
                  type="submit"
                  className="h-12 w-full bg-[#003644] text-white hover:brightness-110"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Konto erstellen"}
                </Button>
              </form>

              <div className="mt-10 border-t border-[#c0c8cb] pt-8 text-center text-[#40484b]">
                Already registered?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#003644] hover:underline"
                >
                  Log in
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="hidden px-10 pb-8 lg:block">
        <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between text-sm text-[#70787c]">
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#003644]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#003644]">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#003644]">
              Support
            </a>
          </div>
          <p>© 2024 TheBorrow Financial</p>
        </div>
      </footer>
    </div>
  );
}
