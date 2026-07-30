import Script from "next/script";
import PromoHeader from "./PromoHeader";

const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "DJAI Academy Web Development Service",
  url: "https://www.djai.academy/web_promo/",
  provider: {
    "@type": "Organization",
    name: "DJAI Academy",
    url: "https://www.djai.academy/",
  },
  areaServed: "Worldwide",
  availableLanguage: ["Thai", "English"],
  serviceType: "Web development, technical SEO, and AI voice agent integration",
  offers: {
    "@type": "OfferCatalog",
    name: "Web development promotional packages",
    itemListElement: [
      { "@type": "Offer", name: "Landing Page", price: "5000", priceCurrency: "THB" },
      { "@type": "Offer", name: "Additional Page", price: "3000", priceCurrency: "THB" },
      { "@type": "Offer", name: "Complete Website", price: "10000", priceCurrency: "THB" },
    ],
  },
};

export default function Home() {
  return (
    <>
      <PromoHeader />
      <main id="app">
        <article>
          <header>
            <p>DJAI Academy Web Development Service</p>
            <h1>Professional websites built to launch, rank, and convert</h1>
            <p>
              Choose a high-converting landing page, additional business page, or complete
              five-page website with technical SEO, responsive design, hosting, and bilingual
              Thai-English support.
            </p>
            <p lang="th">
              บริการพัฒนาเว็บไซต์สำหรับธุรกิจ พร้อมโครงสร้าง Technical SEO ดีไซน์รองรับมือถือ
              โฮสติ้ง และการสนับสนุนทั้งภาษาไทยและอังกฤษ
            </p>
          </header>
          <section aria-labelledby="promo-packages">
            <h2 id="promo-packages">Web development promotional packages</h2>
            <ul>
              <li>Landing Page — 5,000 THB promotional price</li>
              <li>Additional Page — 3,000 THB promotional price</li>
              <li>Complete five-page business website — 10,000 THB promotional price</li>
            </ul>
          </section>
          <section aria-labelledby="promo-ai-agent">
            <h2 id="promo-ai-agent">Talk to the DJAI AI voice sales agent</h2>
            <p>
              Ask questions in Thai or English. The OpenAI Realtime voice agent can explain
              packages, identify a suitable service, and collect project details for human
              follow-up.
            </p>
          </section>
        </article>
      </main>
      <Script src="/web_promo/assets/js/promo.js" strategy="afterInteractive" />
      <Script
        src="/web_promo/djai-voice-widget.js"
        strategy="afterInteractive"
        data-api-base="/web_promo"
        data-mode="inline"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />
    </>
  );
}
