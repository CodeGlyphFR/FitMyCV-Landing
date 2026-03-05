"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { FLAG_SRC, LABELS } from "@/lib/locale-metadata";
import { useLocaleSwitch } from "@/hooks/useLocaleSwitch";

export default function LanguageSelector() {
  const locale = useLocale();
  const switchLocale = useLocaleSwitch();
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

  const handleSwitch = useCallback(
    (newLocale: string) => {
      switchLocale(newLocale);
      close();
    },
    [switchLocale, close]
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
          onClick={() => handleSwitch(loc)}
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
