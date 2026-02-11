"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/landing/Footer";

const titles: Record<string, string> = {
  "/terms": "Conditions Générales de Vente",
  "/privacy": "Politique de confidentialité",
};

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const title = titles[pathname] ?? "";

  return (
    <>
      <header className="legal-header">
        <div className="legal-header-inner">
          <Link href="/">
            <img src="/icons/logo.png" alt="FitMyCV" />
            FitMyCV
          </Link>
          <span>/</span>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>
            {title}
          </span>
        </div>
      </header>
      <main className="legal-content">{children}</main>
      <Footer />
    </>
  );
}
