import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const ADSENSE_CLIENT = "ca-pub-3624708289866566";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.djai.academy"),
  title: "DJAI Document Tools",
  description: "Free private browser tools for documents, AI context, OCR, CSV and spreadsheets.",
  icons: { icon: "/tools/djai-assets/djai-academy-logo-small.webp" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>
        {children}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-CGJ5BTR44T" strategy="lazyOnload" />
        <Script id="google-analytics" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-CGJ5BTR44T',{anonymize_ip:true});`}
        </Script>
      </body>
    </html>
  );
}
