import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  translationKey?: string;
  locale: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(locale: string): PostMeta[] {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        tags: data.tags ?? [],
        translationKey: data.translationKey,
        locale,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(locale: string, slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, locale, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    translationKey: data.translationKey,
    locale,
    content,
  };
}

/**
 * Get alternate blog paths for all locales based on translationKey.
 * Returns a map of locale → "/blog/{slug}" for the same article.
 */
export function getAlternateBlogPaths(
  translationKey: string
): Record<string, string> {
  const locales = ["fr", "en", "es", "de"];
  const result: Record<string, string> = {};

  for (const locale of locales) {
    const dir = path.join(BLOG_DIR, locale);
    if (!fs.existsSync(dir)) continue;
    for (const filename of fs.readdirSync(dir)) {
      if (!filename.endsWith(".md")) continue;
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data } = matter(raw);
      if (data.translationKey === translationKey) {
        result[locale] = `/blog/${filename.replace(/\.md$/, "")}`;
        break;
      }
    }
  }

  return result;
}

export function getAllSlugs(): { locale: string; slug: string }[] {
  const results: { locale: string; slug: string }[] = [];
  const locales = ["fr", "en", "es", "de"];

  for (const locale of locales) {
    const dir = path.join(BLOG_DIR, locale);
    if (!fs.existsSync(dir)) continue;
    for (const filename of fs.readdirSync(dir)) {
      if (filename.endsWith(".md")) {
        results.push({ locale, slug: filename.replace(/\.md$/, "") });
      }
    }
  }

  return results;
}
