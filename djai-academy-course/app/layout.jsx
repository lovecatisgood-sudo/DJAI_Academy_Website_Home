import "./globals.css";
import Script from "next/script";

const BASE_PATH = "/course";
const GA_ID = "G-CGJ5BTR44T";

export const metadata = {
  metadataBase: new URL("https://djai.academy"),
  title: "DJAI Academy | AI Masterclass ภาษาไทย",
  description:
    "AI Masterclass แบบลงมือทำในประเทศไทย เรียนการสร้างเว็บไซต์ แอป automation และ digital product จริงด้วย AI โดยไม่จำเป็นต้องมีพื้นฐาน programming",
  alternates: {
    canonical: `${BASE_PATH}/`,
    languages: {
      th: `${BASE_PATH}/`,
      en: `${BASE_PATH}/EN/`,
      "x-default": `${BASE_PATH}/`
    }
  },
  openGraph: {
    title: "DJAI Academy | AI Masterclass ภาษาไทย",
    description:
      "เรียนการสร้าง product ด้วย AI แบบลงมือทำจริง พร้อมจองที่นั่งผ่าน Stripe สำหรับ workshop รอบถัดไป",
    url: `${BASE_PATH}/`,
    siteName: "DJAI Academy",
    images: [`${BASE_PATH}/assets/DJAI-logo.webp`],
    type: "website"
  },
  icons: {
    icon: `${BASE_PATH}/assets/DJAI-logo.webp`
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
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
