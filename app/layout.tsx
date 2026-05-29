import type { Metadata } from "next";
import "./globals.css"; // Assuming you have a global CSS file

export const metadata: Metadata = {
  title: "TheBorrow",
  description: "Keep track of what you lend & borrow.",
  icons: {
    icon: "../public/theBorrow-logo.png", // Path to your favicon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
