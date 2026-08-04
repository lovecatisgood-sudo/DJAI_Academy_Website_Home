import { redirect } from "next/navigation";

const REGISTRATION_URL =
  "https://school.djai.academy/signup?intent=free-course&course_id=money-making-product-2026-08-22";

export default function MoneyMakingProductRegistrationPage() {
  redirect(REGISTRATION_URL);
}
