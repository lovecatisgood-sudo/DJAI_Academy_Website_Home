import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const GA_ID = "G-CGJ5BTR44T";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.djai.academy"),
  title: "โปรโมชันพัฒนาเว็บไซต์ พร้อม AI Voice Agent | DJAI Academy",
  description:
    "บริการพัฒนาเว็บไซต์สำหรับธุรกิจ พร้อม Technical SEO, AI chatbot, OpenAI voice sales agent, โฮสติ้ง และบริการทั้งภาษาไทยและอังกฤษจาก DJAI Academy",
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
    languages: {
      th: "/web_promo/",
      vi: "/web_promo/vi/",
      "x-default": "/web_promo/",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/web_promo/",
    siteName: "DJAI Academy",
    title: "โปรโมชันพัฒนาเว็บไซต์ พร้อม AI Voice Agent",
    description:
      "เว็บไซต์ธุรกิจพร้อม Technical SEO, AI chatbot, OpenAI voice sales agent, โฮสติ้ง และบริการสองภาษา",
    images: [
      {
        url: "/social/djai-academy.webp",
        width: 1200,
        height: 630,
        alt: "DJAI Academy web development service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "โปรโมชันพัฒนาเว็บไซต์ พร้อม AI Voice Agent",
    description: "เว็บไซต์ธุรกิจพร้อม Technical SEO, AI chatbot และ OpenAI voice sales agent",
    images: ["/social/djai-academy.webp"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await headers()).get("x-djai-locale") === "vi" ? "vi" : "th";
  return (
    <html lang={locale}>
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { cookie_domain: 'auto' });
            `,
          }}
        />
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
