"use client";

import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function LegalBreadcrumb() {
  const t = useTranslations("LegalLayout");
  const pathname = usePathname();
  const titles: Record<string, string> = {
    "/terms": t("terms"),
    "/privacy": t("privacy"),
  };

  return (
    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>
      {titles[pathname] ?? ""}
    </span>
  );
}
