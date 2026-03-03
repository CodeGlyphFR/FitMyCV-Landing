"use client";

import { useCallback } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { usePathnameOverrides } from "@/components/PathnameOverrides";

const FLAG_SRC: Record<string, string> = {
  fr: "/icons/fr.svg",
  en: "/icons/gb.svg",
  es: "/icons/es.svg",
  de: "/icons/de.svg",
};

const LABELS: Record<string, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
  de: "Deutsch",
};

export default function FooterLanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const overrides = usePathnameOverrides();

  const switchLocale = useCallback(
    (newLocale: string) => {
      const target = overrides[newLocale] ?? pathname;
      router.replace(target, { locale: newLocale as "fr" | "en" | "es" | "de" });
    },
    [router, pathname, overrides]
  );

  return (
    <div className="footer-lang">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          className={`footer-lang-btn${loc === locale ? " active" : ""}`}
          onClick={() => switchLocale(loc)}
          aria-label={LABELS[loc]}
          title={LABELS[loc]}
        >
          <img src={FLAG_SRC[loc]} alt={LABELS[loc]} width={24} height={24} loading="lazy" />
        </button>
      ))}
    </div>
  );
}
