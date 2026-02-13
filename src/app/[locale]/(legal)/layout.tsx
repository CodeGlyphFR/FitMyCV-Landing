import { Link } from "@/i18n/navigation";
import Footer from "@/components/landing/Footer";
import LegalBreadcrumb from "./LegalBreadcrumb";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="legal-header">
        <div className="legal-header-inner">
          <Link href="/">
            <img src="/icons/logo_small.png" alt="FitMyCV" width={95} height={28} />
            FitMyCV
          </Link>
          <span>/</span>
          <LegalBreadcrumb />
        </div>
      </header>
      <main className="legal-content">{children}</main>
      <Footer />
    </>
  );
}
