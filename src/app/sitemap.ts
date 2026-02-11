import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const base = "https://www.fitmycv.io";

const pages: {
  path: Parameters<typeof getPathname>[0]["href"];
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/support", changeFrequency: "monthly", priority: 0.7 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) => {
    const alternates: Record<string, string> = {};
    for (const locale of routing.locales) {
      const pathname = getPathname({ locale, href: page.path });
      alternates[locale] =
        locale === routing.defaultLocale
          ? `${base}${pathname}`
          : `${base}/${locale}${pathname}`;
    }

    return routing.locales.map((locale) => {
      const pathname = getPathname({ locale, href: page.path });
      const url =
        locale === routing.defaultLocale
          ? `${base}${pathname}`
          : `${base}/${locale}${pathname}`;

      return {
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages: alternates },
      };
    });
  });
}
