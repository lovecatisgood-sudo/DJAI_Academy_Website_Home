import SiameseCatPage from "../SiameseCatPage";

export const metadata = {
  title: "DJAI Academy and Siamese Cat | Business and Technology Partners",
  description: "Learn how DJAI Academy, Siamese Cat Dev, Siamese Cat Cafe, Siamese Cat Hotel, and Creative Club collaborate across technology, products, and business growth.",
  alternates: {
    canonical: "/siamese_cat/en/",
    languages: { th: "/siamese_cat/", en: "/siamese_cat/en/", "x-default": "/siamese_cat/" }
  },
  openGraph: {
    title: "DJAI Academy × Siamese Cat",
    description: "A practical partnership across AI, product, software development, and the Siamese Cat business ecosystem.",
    url: "/siamese_cat/en/",
    siteName: "DJAI Academy",
    images: ["/portfolio/optimized/websites/Siamese_Cat_Cafe.webp"],
    type: "website"
  }
};

export default function Page() {
  return <SiameseCatPage locale="en" />;
}
