import { NextResponse, type NextRequest } from "next/server";
import { publicLocaleFromPath } from "./lib/public-locales";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-djai-locale", publicLocaleFromPath(request.nextUrl.pathname));
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/", "/vi/:path*", "/zh-cn/:path*", "/zh-tw/:path*"],
};
