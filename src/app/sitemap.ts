import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { getAllSlugs } from "@/lib/blog";

const base = "https://www.fitmycv.io";

const pages: {
  path: Parameters<typeof getPathname>[0]["href"];
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/support", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.3 },
];

function buildLocaleEntries(
  path: Parameters<typeof getPathname>[0]["href"],
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
  locales: readonly string[] = routing.locales,
): MetadataRoute.Sitemap {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[locale] = `${base}${getPathname({ locale, href: path })}`;
  }
  return locales.map((locale) => ({
    url: `${base}${getPathname({ locale, href: path })}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages: alternates },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = pages.flatMap((page) =>
    buildLocaleEntries(page.path, page.changeFrequency, page.priority),
  );

  const blogSlugs = getAllSlugs();
  const blogEntries = blogSlugs.flatMap(({ locale, slug }) => {
    const path = `/blog/${slug}`;
    const url =
      locale === routing.defaultLocale
        ? `${base}${path}`
        : `${base}/${locale}${path}`;
    return {
      url,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    };
  });

  return [...staticEntries, ...blogEntries];
}
