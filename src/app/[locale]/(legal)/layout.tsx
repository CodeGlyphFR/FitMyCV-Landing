import Image from "next/image";
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
            <Image src="/icons/logo_small.webp" alt="FitMyCV" width={95} height={28} priority />
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
