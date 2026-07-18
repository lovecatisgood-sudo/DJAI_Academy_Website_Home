import SiameseCatPage from "./SiameseCatPage";

export const metadata = {
  title: "DJAI Academy และ Siamese Cat | พาร์ทเนอร์ด้านธุรกิจและเทคโนโลยี",
  description: "รู้จักความร่วมมือของ DJAI Academy, Siamese Cat Dev, Siamese Cat Cafe, Siamese Cat Hotel และ Creative Club ด้านเทคโนโลยี product และการเติบโตทางธุรกิจ",
  alternates: {
    canonical: "/siamese_cat/",
    languages: { th: "/siamese_cat/", en: "/siamese_cat/en/", "x-default": "/siamese_cat/" }
  },
  openGraph: {
    title: "DJAI Academy × Siamese Cat",
    description: "ความร่วมมือด้าน AI, product, software development และธุรกิจใน Siamese Cat ecosystem",
    url: "/siamese_cat/",
    siteName: "DJAI Academy",
    images: ["/portfolio/optimized/websites/Siamese_Cat_Cafe.webp"],
    type: "website"
  }
};

export default function Page() {
  return <SiameseCatPage locale="th" />;
}
