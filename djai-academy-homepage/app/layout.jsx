import "./globals.css";
import Script from "next/script";

const GA_ID = "G-CGJ5BTR44T";

export const metadata = {
  metadataBase: new URL("https://djai.academy"),
  title: "DJAI Academy | Educate, Build, Deploy",
  description:
    "DJAI Academy helps builders learn AI, create software, launch tools, and turn ideas into working products.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "DJAI Academy | Educate, Build, Deploy",
    description:
      "Learn AI, build software, use free tools, and turn ideas into working products with DJAI Academy.",
    url: "/",
    siteName: "DJAI Academy",
    images: ["/djai-logo.webp"],
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
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
