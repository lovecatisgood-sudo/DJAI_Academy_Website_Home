import "./globals.css";
import Script from "next/script";

const BASE_PATH = "/course";
const GA_ID = "G-CGJ5BTR44T";

export const metadata = {
  metadataBase: new URL("https://www.djai.academy"),
  title: "AI Masterclass ออฟไลน์: สร้างโปรดักต์และจองที่นั่ง | DJAI",
  description:
    "ประเมิน AI Masterclass ออฟไลน์หนึ่งวันในประเทศไทย ดูผลลัพธ์ ราคา สถานที่ และจองที่นั่งเพื่อสร้างโปรดักต์จริงด้วย AI",
  alternates: {
    canonical: `${BASE_PATH}/`,
    languages: {
      th: `${BASE_PATH}/`,
      en: `${BASE_PATH}/en/`,
      vi: `${BASE_PATH}/vi/`,
      "x-default": `${BASE_PATH}/`
    }
  },
  openGraph: {
    title: "AI Masterclass ออฟไลน์: สร้างโปรดักต์และจองที่นั่ง",
    description:
      "ดูว่า workshop ออฟไลน์เหมาะกับคุณหรือไม่ ตรวจสอบราคาและสถานที่ แล้วสร้างบัญชี DJAI School เพื่อจองที่นั่ง",
    url: `${BASE_PATH}/`,
    siteName: "DJAI Academy",
    images: [`${BASE_PATH}/assets/DJAI-logo.webp`],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "DJAI Academy AI Masterclass",
    description: "Build websites, apps, automation, and digital products with AI.",
    images: [`${BASE_PATH}/assets/DJAI-logo.webp`]
  },
  icons: {
    icon: `${BASE_PATH}/assets/DJAI-logo.webp`
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Course", name: "DJAI Academy AI Masterclass", description: "Hands-on AI product development masterclass for websites, apps, automation, and digital products.", provider: { "@type": "Organization", name: "DJAI Academy", sameAs: "https://www.djai.academy/" }, url: "https://www.djai.academy/course/", inLanguage: ["th", "en", "vi"] }) }} />
        {children}
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
