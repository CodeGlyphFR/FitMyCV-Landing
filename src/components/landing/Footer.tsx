"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import FooterLanguageSelector from "./FooterLanguageSelector";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <Image src="/icons/logo_small.webp" alt="FitMyCV" width={108} height={32} loading="lazy" />
            <p>{t("tagline")}</p>
          </div>
          <div className="footer-col">
            <h4>{t("product")}</h4>
            <Link href="/how-it-works">{t("howItWorks")}</Link>
            <Link href="/features">{t("features")}</Link>
            <Link href="/pricing">{t("pricing")}</Link>
            <Link href="/support">{t("support")}</Link>
            <Link href="/blog">{t("blog")}</Link>
          </div>
          <div className="footer-col">
            <h4>{t("legal")}</h4>
            <Link href="/terms">{t("terms")}</Link>
            <Link href="/privacy">{t("privacy")}</Link>
          </div>
          <div className="footer-col">
            <h4>{t("contact")}</h4>
            <Link href="/contact">{t("contact")}</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">{t("copyright")}</p>
          <FooterLanguageSelector />
        </div>
      </div>
    </footer>
  );
}
