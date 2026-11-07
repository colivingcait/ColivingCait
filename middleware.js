import { NextResponse } from "next/server";
import { legacyPropertyRedirects } from "./lib/legacy-property-paths.mjs";

const byLower = new Map(
  legacyPropertyRedirects.map(([source, destination]) => [
    source.toLowerCase(),
    destination,
  ]),
);

// Case-insensitive safety net for the same paths next.config redirects.
// An odd-cased incoming link still lands on the nickname file.
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const destination = byLower.get(path.toLowerCase());
  if (!destination || path === destination) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = destination;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/images/:path*"],
};
