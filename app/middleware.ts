import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = [
  "/dashboard",
  "/inbox",
  "/campaigns",
  "/templates",
  "/contacts",
  "/crm-sync",
  "/settings",
];

export function middleware(request: NextRequest) {
  const session = request.cookies.get("wh_hub_session")?.value;
  const pathname = request.nextUrl.pathname;

  const isProtectedPage = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPage && session !== "active") {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && session === "active") {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/inbox/:path*",
    "/campaigns/:path*",
    "/templates/:path*",
    "/contacts/:path*",
    "/crm-sync/:path*",
    "/settings/:path*",
    "/login",
  ],
};
