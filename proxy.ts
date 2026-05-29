import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    // Use the Auth.js v5 helper instead of getToken
    const session = await auth();

    if (!session?.user) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
