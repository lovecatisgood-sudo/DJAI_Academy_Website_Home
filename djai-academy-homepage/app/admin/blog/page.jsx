import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import AdminBlogForm from "./AdminBlogForm";

export const metadata = {
  title: "Blog Admin | DJAI Academy",
  robots: {
    index: false,
    follow: false
  }
};

export default function BlogAdminPage() {
  return (
    <>
      <SiteHeader />
      <main className="admin-page">
        <AdminBlogForm />
      </main>
      <SiteFooter />
    </>
  );
}
