import { NextResponse } from "next/server";

const legacyUppercaseRules = [
  [/^\/EN(?=\/|$)/, "/en"],
  [/^\/portfolio\/EN(?=\/|$)/, "/portfolio/en"],
  [/^\/development\/EN(?=\/|$)/, "/development/en"],
  [/^\/service\/EN(?=\/|$)/, "/service/en"],
  [/^\/tools\/EN(?=\/|$)/, "/tools/en"],
  [/^\/blog\/EN(?=\/|$)/, "/blog/en"]
];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  for (const [pattern, replacement] of legacyUppercaseRules) {
    if (pattern.test(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(pattern, replacement);
      return NextResponse.redirect(url, 308);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"]
};
