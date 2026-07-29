import "./globals.css";
import Script from "next/script";
import { headers } from "next/headers";

const GA_ID = "G-CGJ5BTR44T";
const ADSENSE_CLIENT = "ca-pub-3624708289866566";

export const metadata = {
  metadataBase: new URL("https://www.djai.academy"),
  title: "DJAI Academy | Educate, Build, Deploy",
  description:
    "DJAI Academy helps builders learn AI, create software, launch tools, and turn ideas into working products.",
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/djai-logo-small.webp", type: "image/webp" }
    ],
    shortcut: "/favicon.svg",
    apple: "/djai-logo-small.webp"
  },
  openGraph: {
    title: "DJAI Academy | Educate, Build, Deploy",
    description:
      "Learn AI, build software, use free tools, and turn ideas into working products with DJAI Academy.",
    url: "/",
    siteName: "DJAI Academy",
    images: [{ url: "/social/djai-academy.webp", width: 1200, height: 630, alt: "DJAI Academy" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    images: ["/social/djai-academy.webp"]
  },
  other: {
    "google-adsense-account": ADSENSE_CLIENT
  }
};

export default async function RootLayout({ children }) {
  const requestHeaders = await headers();
  const language = requestHeaders.get("x-djai-language") === "en" ? "en" : "th";

  return (
    <html lang={language}>
      <body>
        {children}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
