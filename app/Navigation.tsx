"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Upload, Download, Settings } from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    mobileName: "Dashboard",
  },
  { name: "Lent", href: "/lent", icon: Upload, mobileName: "Verliehen" },
  {
    name: "Borrowed",
    href: "/borrowed",
    icon: Download,
    mobileName: "Geliehen",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    mobileName: "Einstellungen",
  },
];

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2 text-sm">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 ${
              isActive
                ? "bg-[#0f596f] font-semibold text-white"
                : "text-[#2d3539] hover:bg-[#e3e2e1]"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#d2d6d9] bg-white px-2 py-2 md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-lg px-1 py-2 text-center text-xs ${
                isActive
                  ? "bg-[#0f596f] font-medium text-white"
                  : "text-[#2d3539] hover:bg-[#f4f3f2]"
              }`}
            >
              <item.icon className="mb-1 h-5 w-5" />
              {item.mobileName}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
