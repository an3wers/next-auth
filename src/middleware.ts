import { NextRequest, NextResponse } from "next/server";
import { privatePages, publicPages } from "./lib/pages-config";
import { protectLogin } from "./lib/middleware/protect-login";
import { protectProfile } from "./lib/middleware/protect-profile";
import { protectAdmin } from "./lib/middleware/protect-admin";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith(publicPages.auth)) {
    return protectLogin(request);
  }

  if (pathname.startsWith(privatePages.profile)) {
    return protectProfile(request);
  }

  if (pathname.startsWith(privatePages.admin)) {
    return protectAdmin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/auth/:path*",
    "/profile/:path*",
    "/admin/:path*",
  ],
};
