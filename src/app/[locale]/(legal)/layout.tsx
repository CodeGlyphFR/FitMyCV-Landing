"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Footer from "@/components/landing/Footer";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations("LegalLayout");
  const pathname = usePathname();
  const titles: Record<string, string> = {
    "/terms": t("terms"),
    "/privacy": t("privacy"),
  };
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
