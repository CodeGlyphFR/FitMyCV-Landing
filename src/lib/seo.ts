import { routing } from "@/i18n/routing";

const BASE_URL = "https://www.fitmycv.io";

/**
 * Generate locale-aware alternates (canonical + hreflang) for Next.js metadata.
 * @param locale  Current page locale (e.g. "fr")
 * @param pathname  Page path without locale prefix (e.g. "/" or "/support")
 */
export function getAlternates(locale: string, pathname: string) {
  const suffix = pathname === "/" ? "" : pathname;

  const canonical =
    locale === routing.defaultLocale
      ? `${BASE_URL}${pathname}`
      : `${BASE_URL}/${locale}${suffix}`;

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] =
      loc === routing.defaultLocale
        ? `${BASE_URL}${pathname}`
        : `${BASE_URL}/${loc}${suffix}`;
  }
  languages["x-default"] = `${BASE_URL}/en${suffix}`;

  return { canonical, languages };
}

/**
 * Generate BreadcrumbList JSON-LD for structured data.
 */
export function getBreadcrumbJsonLd(locale: string, crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: locale === routing.defaultLocale
        ? `${BASE_URL}${c.path}`
        : `${BASE_URL}/${locale}${c.path === "/" ? "" : c.path}`,
    })),
  };
}

/** Default Open Graph image shared across all pages. */
export const OG_IMAGE = {
  url: "/og-image.webp",
  width: 1200,
  height: 630,
} as const;

/**
 * Build the locale-aware og:url for the current page.
 */
export function getOgUrl(locale: string, pathname: string) {
  const suffix = pathname === "/" ? "" : pathname;
  return locale === routing.defaultLocale
    ? `${BASE_URL}${pathname}`
    : `${BASE_URL}/${locale}${suffix}`;
}
