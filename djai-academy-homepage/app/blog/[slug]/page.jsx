import { redirect } from "next/navigation";

export default async function BlogPostRedirectPage({ params }) {
  const resolvedParams = await params;
  redirect(`/blog/EN/${resolvedParams.slug}/`);
}
