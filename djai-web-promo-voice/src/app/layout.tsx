import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.djai.academy"),
  title: "Web Development Promotion with AI Voice Agent | DJAI Academy",
  description:
    "Professional web development packages with technical SEO, AI chatbot, OpenAI voice sales agent, hosting, and bilingual support from DJAI Academy.",
  keywords: [
    "DJAI Academy",
    "website packages",
    "landing page",
    "complete website",
    "AI chatbot",
    "AI voice agent",
    "SEO",
    "hosting",
  ],
  icons: {
    icon: "/web_promo/assets/icons/favicon.svg",
  },
  alternates: {
    canonical: "/web_promo/",
  },
  openGraph: {
    type: "website",
    url: "/web_promo/",
    siteName: "DJAI Academy",
    title: "Web Development Promotion with AI Voice Agent",
    description:
      "Professional websites with technical SEO, AI chatbot, OpenAI voice sales agent, hosting, and bilingual support.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/web_promo/assets/css/styles.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
