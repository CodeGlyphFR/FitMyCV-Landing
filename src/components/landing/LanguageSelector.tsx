"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

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

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };
    if (open) {
      document.addEventListener("click", handleClick);
    }
    return () => document.removeEventListener("click", handleClick);
  }, [open, close]);

  const switchLocale = useCallback(
    (newLocale: string) => {
      router.replace(pathname, { locale: newLocale as "fr" | "en" | "es" | "de" });
      close();
    },
    [router, pathname, close]
  );

  // Inactive locales ordered to the left of the active one
  const others = routing.locales.filter((l) => l !== locale);

  return (
    <div className={`lang-expand${open ? " open" : ""}`} ref={ref}>
      {others.map((loc, i) => (
        <button
          key={loc}
          className="lang-expand-btn other"
          style={{ transitionDelay: open ? `${(others.length - 1 - i) * 50}ms` : `${i * 30}ms` }}
          onClick={() => switchLocale(loc)}
          aria-label={LABELS[loc]}
          title={LABELS[loc]}
        >
          <img src={FLAG_SRC[loc]} alt={LABELS[loc]} width={26} height={26} />
        </button>
      ))}
      <button
        className="lang-expand-btn active"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={`${LABELS[locale]} — Change language`}
        title={LABELS[locale]}
      >
        <img src={FLAG_SRC[locale]} alt={LABELS[locale]} width={26} height={26} />
      </button>
    </div>
  );
}
