import "./globals.css";
import { headers } from "next/headers";
import ConsentManager from "./components/ConsentManager";

const GA_ID = "G-CGJ5BTR44T";
const ADSENSE_CLIENT = "ca-pub-3624708289866566";
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://www.djai.academy/#organization",
  name: "DJAI Academy",
  url: "https://www.djai.academy/",
  logo: "https://www.djai.academy/djai-logo.webp",
  description: "DJAI Academy teaches practical AI and vibe coding and builds software, automation, and digital products.",
  areaServed: { "@type": "Country", name: "Thailand" },
  knowsAbout: ["Artificial intelligence", "Vibe coding", "Software development", "Product development", "Automation"]
};

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
  const requestedLanguage = requestHeaders.get("x-djai-language");
  const language = ["en", "vi"].includes(requestedLanguage) ? requestedLanguage : "th";

  return (
    <html lang={language}>
      <head>
        {/* Consent Mode defaults. React hoists the async AdSense loader below to
            the top of <head>, so these two are not in source order in the served
            HTML. That is fine: this inline script executes during HTML parsing,
            while the loader is a network fetch that cannot execute until later. */}
        <script
          id="google-consent-defaults"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                personalization_storage: 'denied',
                functionality_storage: 'granted',
                security_storage: 'granted'
              });
              gtag('set', 'ads_data_redaction', true);
              window.adsbygoogle = window.adsbygoogle || [];
              window.adsbygoogle.requestNonPersonalizedAds = 1;
            `
          }}
        />
        {/* Raw tag, not next/script: AdSense verification reads the served HTML, and
            next/script emits only a preload link here, which Google cannot detect.
            The Consent Mode defaults above run first, so ads stay non-personalized
            and ad_storage stays denied until the visitor opts in. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        {children}
        <ConsentManager gaId={GA_ID} locale={language} />
      </body>
    </html>
  );
}
