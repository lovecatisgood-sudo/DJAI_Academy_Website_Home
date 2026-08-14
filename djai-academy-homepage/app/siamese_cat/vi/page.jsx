import SiameseCatPage from "../SiameseCatPage";

export const metadata = {
  title: "DJAI Academy và Siamese Cat | Đối tác kinh doanh và công nghệ",
  description: "Tìm hiểu cách DJAI Academy, Siamese Cat Dev, Siamese Cat Cafe, Siamese Cat Hotel và Creative Club hợp tác về công nghệ, sản phẩm và tăng trưởng.",
  alternates: {
    canonical: "/siamese_cat/vi/",
    languages: { th: "/siamese_cat/", en: "/siamese_cat/en/", vi: "/siamese_cat/vi/", "x-default": "/siamese_cat/" }
  },
  openGraph: {
    title: "DJAI Academy × Siamese Cat",
    description: "Quan hệ hợp tác thực tế về AI, sản phẩm, phát triển phần mềm và hệ sinh thái kinh doanh Siamese Cat.",
    url: "/siamese_cat/vi/",
    siteName: "DJAI Academy",
    locale: "vi_VN",
    images: ["/portfolio/optimized/websites/Siamese_Cat_Cafe.webp"],
    type: "website"
  }
};

export default function Page() {
  return <SiameseCatPage locale="vi" />;
}
