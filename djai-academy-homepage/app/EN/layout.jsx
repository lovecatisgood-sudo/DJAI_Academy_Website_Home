export const metadata = {
  title: "DJAI Academy | Educate, Build, Deploy",
  description:
    "DJAI Academy helps builders learn AI, create software, launch tools, and turn ideas into working products.",
  alternates: {
    canonical: "/EN/",
    languages: {
      en: "/EN/",
      th: "/th/"
    }
  },
  openGraph: {
    title: "DJAI Academy | Educate, Build, Deploy",
    description:
      "Learn AI, build software, use free tools, and turn ideas into working products with DJAI Academy.",
    url: "/EN/",
    siteName: "DJAI Academy",
    images: ["/djai-logo.webp"],
    type: "website"
  }
};

export default function EnglishLayout({ children }) {
  return children;
}
