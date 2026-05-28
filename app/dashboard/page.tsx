import { auth, signOut } from "../../auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#faf9f8] text-[#1a1c1c] md:flex">
      <aside className="sticky top-0 hidden h-screen w-64 flex-col gap-4 border-r border-[#c0c8cb] bg-[#f4f3f2] p-6 md:flex">
        <div className="mb-8 px-2">
          <h1 className="text-xl font-black text-[#003644]">TheBorrow</h1>
          <p className="text-xs text-[#40484b]">Financial Clarity</p>
        </div>

        <nav className="flex grow flex-col gap-2">
          <div className="rounded-lg bg-[#134e5e] px-4 py-3 text-sm font-semibold text-[#b6ebfe]">
            Dashboard
          </div>
          <button className="rounded-lg px-4 py-3 text-left text-sm text-[#40484b] transition hover:bg-[#e3e2e1]">
            Lent
          </button>
          <button className="rounded-lg px-4 py-3 text-left text-sm text-[#40484b] transition hover:bg-[#e3e2e1]">
            Borrowed
          </button>
          <button className="rounded-lg px-4 py-3 text-left text-sm text-[#40484b] transition hover:bg-[#e3e2e1]">
            Settings
          </button>
        </nav>

        <Button className="h-12 w-full bg-[#003644] text-white hover:opacity-90">
          New Transaction
        </Button>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-[#c0c8cb] bg-[#faf9f8] px-5 py-4 md:px-10">
          <div className="flex w-full max-w-md items-center rounded-full bg-[#f4f3f2] px-4 py-2">
            <span className="text-[#70787c]">Search</span>
          </div>
          <div className="ml-6 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#e3e2e1]" />
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <Button type="submit" variant="outline" className="border-[#c0c8cb]">
                Log out
              </Button>
            </form>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-2 md:px-10">
          <section className="mt-8">
            <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold text-[#003644]">Overview</h2>
                <p className="text-[#40484b]">
                  Welcome, {session.user.name || "User"} - manage your trust and shared assets in one place.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="min-w-[180px] rounded-2xl border border-[#c0c8cb] bg-[#e9e8e7] p-6">
                  <p className="mb-1 text-xs uppercase tracking-wider text-[#70787c]">Total Lent</p>
                  <p className="text-3xl font-semibold text-[#003644]">$1,450.00</p>
                </div>
                <div className="min-w-[180px] rounded-2xl border border-[#c0c8cb] bg-[#e9e8e7] p-6">
                  <p className="mb-1 text-xs uppercase tracking-wider text-[#70787c]">Total Borrowed</p>
                  <p className="text-3xl font-semibold text-[#904d00]">$320.00</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#1a1c1c]">Lent (Verliehen)</h3>
              <button className="text-sm text-[#003644] hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-[#c0c8cb] bg-white p-6">
                <h4 className="text-xl font-semibold text-[#003644]">$450.00</h4>
                <p className="mb-6 text-[#40484b]">Canon EOS R5 Camera</p>
                <Button variant="outline" className="w-full border-[#003644] text-[#003644]">
                  Confirm Return
                </Button>
              </div>
              <div className="rounded-2xl border border-[#c0c8cb] bg-white p-6">
                <h4 className="text-xl font-semibold text-[#003644]">$1,000.00</h4>
                <p className="mb-6 text-[#40484b]">Personal Loan</p>
                <Button variant="outline" className="w-full border-[#003644] text-[#003644]">
                  Remind Party
                </Button>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#c0c8cb] bg-[#f4f3f2] p-6 text-[#70787c]">
                <p className="text-2xl">+</p>
                <p className="text-sm">Lend something new</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
