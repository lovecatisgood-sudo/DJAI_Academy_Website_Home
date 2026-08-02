import OnboardingFlow from "../OnboardingFlow";

export const metadata = {
  title: "Join DJAI Academy | Community Guidelines and Learner Survey",
  description: "Review the community guidelines, share your learning goals, and get started with DJAI Academy.",
  alternates: {
    canonical: "/academy/en/",
    languages: { th: "/academy/", en: "/academy/en/", "x-default": "/academy/" }
  },
  robots: { index: false, follow: true }
};

export default function EnglishAcademyOnboardingPage() {
  return <OnboardingFlow locale="en" />;
}
