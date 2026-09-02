import { courseRegistrationUrls } from "./lib/courseRegistration";

export default function CourseLandingSchema({ locale, name, description, path }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: `https://www.djai.academy${path}`,
    inLanguage: locale,
    educationalLevel: "Beginner",
    provider: {
      "@type": "Organization",
      name: "DJAI Academy",
      url: "https://www.djai.academy/"
    },
    offers: {
      "@type": "Offer",
      price: "5999",
      priceCurrency: "THB",
      url: courseRegistrationUrls.signup
    }
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}
