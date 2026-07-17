import CourseDetailPage from "../../CourseDetailPage";

export const metadata = {
  title: "AI Masterclass Course Details | From Idea to Live Product | DJAI Academy",
  description:
    "Explore the 1 August 2026 AI Masterclass itinerary and curriculum. Learn Vibe Coding, plan, build, and launch a real product with AI in one day.",
  alternates: {
    canonical: "/course/detail/en/",
    languages: {
      th: "/course/detail/",
      en: "/course/detail/en/",
      "x-default": "/course/detail/"
    }
  },
  openGraph: {
    title: "AI Masterclass: From Idea to Live Product",
    description: "A full-day hands-on AI workshop on 1 August 2026 by DJAI Academy.",
    url: "/course/detail/en/",
    images: ["/course/assets/community2.webp"],
    type: "website"
  }
};

export default function CourseDetailEnglish() {
  return <CourseDetailPage locale="en" />;
}
