import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from '@/src/i18n/routing';

const handleI18nRouting = createIntlMiddleware(routing);

export async function proxy(req: NextRequest) {
  // 1. Run custom auth logic for dashboard routes
  // The path will include the locale, e.g., /de/dashboard or /en/dashboard
  const isDashboard = /^\/(de|en)\/dashboard(\/.*)?$/.test(req.nextUrl.pathname);
  
  if (isDashboard) {
    const session = await auth();

    if (!session?.user) {
      // Extract the locale from the pathname to redirect to the correct localized login page
      const localeMatch = req.nextUrl.pathname.match(/^\/(de|en)/);
      const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/login`, req.nextUrl));
    }
  }

  // 2. Run next-intl middleware for locale routing and negotiations
  return handleI18nRouting(req);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*']
};
