"use client";

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
            <img src="/icons/logo_small.png" alt="FitMyCV" width={109} height={32} />
            <p>{t("tagline")}</p>
          </div>
          <div className="footer-col">
            <span className="footer-heading">{t("product")}</span>
            <Link href="/#howItWorks">{t("howItWorks")}</Link>
            <Link href="/#features">{t("features")}</Link>
            <Link href="/#pricing">{t("pricing")}</Link>
            <Link href="/#faq">{t("faq")}</Link>
            <Link href="/support">{t("support")}</Link>
          </div>
          <div className="footer-col">
            <span className="footer-heading">{t("legal")}</span>
            <Link href="/terms">{t("terms")}</Link>
            <Link href="/privacy">{t("privacy")}</Link>
          </div>
          <div className="footer-col">
            <span className="footer-heading">{t("contact")}</span>
            <a href="mailto:contact@fitmycv.io">contact@fitmycv.io</a>
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
