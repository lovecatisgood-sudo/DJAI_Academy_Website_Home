import Script from "next/script";
import PromoHeader from "./PromoHeader";
import { chinesePromoCopy } from "../lib/public-locales";

export default function ChinesePromoPage({ locale }: { locale: keyof typeof chinesePromoCopy }) {
  const copy = chinesePromoCopy[locale];
  const canonical = `https://www.djai.academy/web_promo/${copy.segment}/`;
  const schema = { "@context": "https://schema.org", "@type": "Service", name: copy.title, description: copy.description, url: canonical, mainEntityOfPage: canonical, provider: { "@id": "https://www.djai.academy/#organization" }, availableLanguage: [locale], serviceType: locale === "zh-TW" ? "網站開發、技術 SEO 與 AI 整合" : "网站开发、技术 SEO 与 AI 集成" };
  return <>
    <script dangerouslySetInnerHTML={{ __html: `(function(){try{var s=JSON.parse(localStorage.getItem('djai-web-voucher-v1')||'null');var active=!s||(['new','won','form'].includes(s.stage)&&Number(s.deadline)>Date.now());if(active){document.documentElement.classList.add('voucher-pending');setTimeout(function(){document.documentElement.classList.remove('voucher-pending')},3000)}}catch(e){}})();` }} />
    <PromoHeader initialLocale={locale} /><div id="voucher-welcome-root" />
    <main id="app"><article><header><p>{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.intro}</p><p>{copy.localIntro}</p></header><section aria-labelledby={`promo-packages-${copy.segment}`}><h2 id={`promo-packages-${copy.segment}`}>{copy.packagesTitle}</h2><ul>{copy.packages.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>{copy.voucherTitle}</h2><p>{copy.voucher}</p></section><section><h2>{copy.agentTitle}</h2><p>{copy.agent}</p></section></article></main>
    <Script src="/web_promo/assets/js/promo.js" strategy="afterInteractive" /><Script src="/web_promo/djai-voice-widget.js" strategy="afterInteractive" data-api-base="/web_promo" data-mode="inline" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </>;
}
