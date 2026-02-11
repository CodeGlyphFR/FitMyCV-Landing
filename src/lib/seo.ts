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
  languages["x-default"] = `${BASE_URL}${pathname}`;

  return { canonical, languages };
}

/**
 * Build the locale-aware og:url for the current page.
 */
export function getOgUrl(locale: string, pathname: string) {
  const suffix = pathname === "/" ? "" : pathname;
  return locale === routing.defaultLocale
    ? `${BASE_URL}/`
    : `${BASE_URL}/${locale}${suffix}`;
}
