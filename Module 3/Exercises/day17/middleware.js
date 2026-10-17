import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("session");

  // Exercises 3 & 4: Redirect unauthenticated requests, carrying destination in 'next'
  if (!session) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Exercise 3: Narrow matcher ensures middleware never intercepts static files or images
export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*", "/kitchen/:path*"],
};