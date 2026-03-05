"use client";

import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { FLAG_SRC, LABELS } from "@/lib/locale-metadata";
import { useLocaleSwitch } from "@/hooks/useLocaleSwitch";

export default function FooterLanguageSelector() {
  const locale = useLocale();
  const switchLocale = useLocaleSwitch();

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
