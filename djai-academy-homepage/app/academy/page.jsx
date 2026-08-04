import { permanentRedirect } from "next/navigation";

const COMMUNITY_DESTINATION = "https://school.djai.academy/";

export default function ThaiAcademyOnboardingPage() {
  permanentRedirect(COMMUNITY_DESTINATION);
}
