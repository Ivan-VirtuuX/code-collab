import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextResponse } from "next/server";

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent
) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const isAuthenticated = !!token;

  if (
    (req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")) &&
    isAuthenticated
  )
    return NextResponse.redirect(new URL("/", req.url));

  if (
    (req.nextUrl.pathname.startsWith("/create") && !isAuthenticated) ||
    (req.nextUrl.pathname.startsWith("/edit-profile") && !isAuthenticated)
  )
    return NextResponse.redirect(new URL("/login", req.url));

  if (
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register") ||
    req.nextUrl.pathname.startsWith("/create") ||
    req.nextUrl.pathname.startsWith("/edit-profile")
  )
    return fetch(req);

  const authMiddleware = withAuth({
    pages: {
      signIn: `/login`,
    },
  });

  return authMiddleware(req, event);
}

export const config = {
  matcher: ["/login", "/register", "/create", "/edit-profile"],
};
