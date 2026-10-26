import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const ADSENSE_CLIENT = "ca-pub-3624708289866566";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.djai.academy"),
  title: "DJAI Document Tools",
  description: "Free private browser tools for documents, AI context, OCR, CSV and spreadsheets.",
  other: {
    "google-adsense-account": ADSENSE_CLIENT
  },
  icons: { icon: "/tools/djai-assets/djai-academy-logo-small.webp" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <head>
        {/* Ad serving is paused; ownership verification remains in metadata. */}
      </head>
      <body>
        {children}
        <Script id="djai-analytics-consent" src="/analytics-consent.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
