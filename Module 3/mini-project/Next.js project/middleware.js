import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("session");

  // Layer 1: Fast edge verification. Stops unauthenticated visits before page render
  if (!session) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Narrow matcher ensures middleware never runs on static assets, images, or public routes
export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*", "/kitchen/:path*"],
};