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
  const isVietnamesePage = /(?:^|\/)vi(?:\/|$)/.test(pathname);
  const isEnglishPage = /(?:^|\/)en(?:\/|$)/.test(pathname)
    || pathname === "/Cam_PDF_Scan_Signer_QR-Gen"
    || pathname.startsWith("/Cam_PDF_Scan_Signer_QR-Gen/");
  requestHeaders.set("x-djai-language", isVietnamesePage ? "vi" : isEnglishPage ? "en" : "th");

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"]
};
