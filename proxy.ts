import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  // getToken automatically handles the secure vs non-secure cookie names
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;

  // If user is NOT authenticated and trying to access a protected page
  if (req.nextUrl.pathname.startsWith("/create-event") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If user IS authenticated and tries to visit login, redirect them to home
  if (req.nextUrl.pathname.startsWith("/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // If user IS authenticated and tries to visit register, redirect them to home
  if (req.nextUrl.pathname.startsWith("/register") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create-event", "/login", "/register"],
};
