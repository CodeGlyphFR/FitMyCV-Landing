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
            <img src="/icons/logo.png" alt="FitMyCV" height={32} loading="lazy" />
            <p>{t("tagline")}</p>
          </div>
          <div className="footer-col">
            <h4>{t("product")}</h4>
            <Link href="/#howItWorks">{t("howItWorks")}</Link>
            <Link href="/#features">{t("features")}</Link>
            <Link href="/#pricing">{t("pricing")}</Link>
            <Link href="/#faq">{t("faq")}</Link>
            <Link href="/support">{t("support")}</Link>
          </div>
          <div className="footer-col">
            <h4>{t("legal")}</h4>
            <Link href="/terms">{t("terms")}</Link>
            <Link href="/privacy">{t("privacy")}</Link>
          </div>
          <div className="footer-col">
            <h4>{t("contact")}</h4>
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
