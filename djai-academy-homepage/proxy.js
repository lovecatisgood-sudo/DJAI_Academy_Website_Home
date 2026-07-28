import { NextResponse } from "next/server";

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
  const isEnglishPage = /^\/(?:en(?:\/|$)|(?:portfolio|development|service|tools|blog|siamese_cat)\/en(?:\/|$))/.test(
    pathname
  );
  const shouldLoadAdSense = /^\/(?:blog|tools)(?:\/|$)/.test(pathname);
  requestHeaders.set("x-djai-language", isEnglishPage ? "en" : "th");
  requestHeaders.set("x-djai-adsense", shouldLoadAdSense ? "1" : "0");

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"]
};
