import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const { pathname } = req.nextUrl;

  // Protected
  if (
    (pathname.startsWith("/create-event") || pathname.startsWith("/booking")) &&
    !isAuthenticated
  ) {
    const callbackUrl = pathname;
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, req.url),
    );
  }

  // Redirect if already logged in
  if (
    (pathname.startsWith("/login") || pathname.startsWith("/register")) &&
    isAuthenticated
  ) {
    const callbackUrl = req.nextUrl.searchParams.get("callbackUrl");
    if (callbackUrl) {
      return NextResponse.redirect(new URL(callbackUrl, req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create-event/:path*", "/booking/:path*", "/login", "/register"],
};
