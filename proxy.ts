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

  // Protect routes
  if (pathname.startsWith("/create-event") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (pathname.startsWith("/booking") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect if already logged in
  if (
    (pathname.startsWith("/login") || pathname.startsWith("/register")) &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create-event/:path*", "/booking/:path*", "/login", "/register"],
};
