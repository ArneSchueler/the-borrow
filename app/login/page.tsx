"use client";

import { useState } from "react";
import { loginUser } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function fillTestCredentials() {
    setEmail("testuser@example.com");
    setPassword("password123");
  }

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    setSuccess("");

    const result = await loginUser(formData);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(result.success);
      router.push("/dashboard"); // Redirect to dashboard on success, or rely on next-auth redirection
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
            Willkommen!
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1120px] px-5 pb-12 pt-8 lg:flex lg:min-h-screen lg:items-center lg:px-6 lg:py-10">
        <div className="grid w-full overflow-hidden rounded-xl border border-[#c0c8cb] bg-white shadow-[0_20px_40px_-15px_rgba(0,54,68,0.04)] lg:min-h-[640px] lg:grid-cols-[1fr_1fr]">
          <section className="relative hidden overflow-hidden bg-[#003f4f] p-12 lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[28px_28px]" />
            </div>
            <div className="relative z-10">
              <p className="text-lg font-black tracking-tight text-white">
                TheBorrow
              </p>
              <h2 className="mt-8 max-w-sm text-5xl font-bold leading-tight text-white">
                Financial clarity for the modern burrow.
              </h2>
              <p className="mt-6 max-w-xs text-lg text-[#8abed1]">
                Securely manage your lending and borrowing with communal trust
                and clear organization.
              </p>
            </div>
          </section>

          <section className="flex flex-col justify-center bg-white p-6 md:p-10 lg:p-14">
            <div className="mb-10 flex flex-col items-center gap-2 lg:hidden">
              <p className="text-2xl font-black text-[#003644]">TheBorrow</p>
            </div>
            <div className="mx-auto w-full max-w-[400px]">
              <div className="mb-8 flex w-full border-b border-[#c0c8cb]">
                <div className="flex-1 border-b-2 border-[#003644] py-3 text-center text-sm font-semibold text-[#003644]">
                  Anmelden
                </div>
                <Link
                  href="/register"
                  className="flex-1 py-3 text-center text-sm font-medium text-[#70787c] transition-colors hover:text-[#003644]"
                >
                  Registrieren
                </Link>
              </div>

              <div className="mb-10 text-left">
                <h2 className="text-[44px] font-semibold leading-tight text-[#1a1c1c]">
                  Welcome Back
                </h2>
                <p className="mt-2 text-[22px] text-[#40484b]">
                  Log in to your secure burrow dashboard.
                </p>
              </div>

              <form action={onSubmit} className="space-y-6">
                {error && <div className="text-sm text-red-600">{error}</div>}
                {success && (
                  <div className="text-sm text-emerald-700">{success}</div>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="px-1 text-sm text-[#40484b]"
                  >
                    E-Mail Adresse
                  </Label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#70787c]">
                      @
                    </span>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@beispiel.de"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 border-0 bg-[#f5f2ed] pl-11 text-base focus-visible:ring-2 focus-visible:ring-[#003644]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="px-1 text-sm text-[#40484b]"
                  >
                    Passwort
                  </Label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#70787c]">
                      *
                    </span>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-12 border-0 bg-[#f5f2ed] pl-11 text-base focus-visible:ring-2 focus-visible:ring-[#003644]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="h-12 w-full bg-[#003f4f] text-white hover:brightness-110"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Jetzt Anmelden"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 w-full border-[#003644] text-[#003644] hover:bg-[#003644] hover:text-white"
                    onClick={fillTestCredentials}
                  >
                    Use test credentials
                  </Button>
                </div>
              </form>

              <div className="mt-10 border-t border-[#c0c8cb] pt-8 text-center text-[#40484b]">
                New to the burrow?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-[#003644] hover:underline"
                >
                  Create an Account
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
