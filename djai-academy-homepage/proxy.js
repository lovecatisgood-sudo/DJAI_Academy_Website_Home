import { NextResponse } from "next/server";
import { languageForPath } from "./app/lib/i18n";

const legacyUppercaseRules = [
  [/^\/EN(?=\/|$)/, "/en"],
  [/^\/portfolio\/EN(?=\/|$)/, "/portfolio/en"],
  [/^\/development\/EN(?=\/|$)/, "/development/en"],
  [/^\/service\/EN(?=\/|$)/, "/service/en"],
  [/^\/tools\/EN(?=\/|$)/, "/tools/en"],
  [/^\/blog\/EN(?=\/|$)/, "/blog/en"],
  [/^\/siamese_cat\/EN(?=\/|$)/, "/siamese_cat/en"]
];

export function proxy(request) {
  const { pathname } = request.nextUrl;

  for (const [pattern, replacement] of legacyUppercaseRules) {
    if (pattern.test(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(pattern, replacement);
      return NextResponse.redirect(url, 308);
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-djai-language", languageForPath(pathname));

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"]
};
