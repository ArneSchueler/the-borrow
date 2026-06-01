import MainLayout from "../MainLayout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // We can pass showFab=true by default or base it on route if needed,
  // but let's just pass showFab={true} as most authenticated pages have it.
  return <MainLayout showFab>{children}</MainLayout>;
}
