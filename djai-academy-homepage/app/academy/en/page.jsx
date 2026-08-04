import { permanentRedirect } from "next/navigation";

const COMMUNITY_DESTINATION = "https://school.djai.academy/";

export default function EnglishAcademyOnboardingPage() {
  permanentRedirect(COMMUNITY_DESTINATION);
}
