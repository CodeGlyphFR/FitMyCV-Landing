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

/**
 * Pillar assignment by translationKey.
 * Keys not listed here fall into "other".
 */
const PILLAR_MAP: Record<string, string> = {
  // Pillar 1: CV & ATS optimization
  "ats-complete-guide": "ats-optimization",
  "ats-format": "ats-optimization",
  "ats-mistakes": "ats-optimization",
  "match-score": "ats-optimization",
  "tailor-ai": "ats-optimization",
  "cv-keywords-job-posting": "ats-optimization",
  "ats-resume-by-sector": "ats-optimization",
  "essential-resume-sections": "ats-optimization",
  "professional-summary-cv": "ats-optimization",
  "hard-skills-resume-ats": "ats-optimization",
  "soft-skills-resume-ats": "ats-optimization",
  // Pillar 2: AI & CV
  "ai-resume-writing-2026": "ai-cv",
  "chatgpt-vs-specialized-tool": "ai-cv",
  "customize-resume-each-job": "ai-cv",
  "ai-resume-without-lying": "ai-cv",
  "save-time-job-applications-ai": "ai-cv",
  // Pillar 3: Job search
  "unsolicited-application-resume": "job-search",
  "career-change-resume": "job-search",
  "resume-no-experience": "job-search",
  "freelance-consultant-resume": "job-search",
  "cover-letter-resume-consistency": "job-search",
  "follow-up-recruiter-after-applying": "job-search",
  // Pillar 4: Format & layout
  "resume-pdf-vs-word": "format-layout",
  "ideal-resume-length": "format-layout",
  "resume-font-layout-ats": "format-layout",
  "photo-on-resume-france": "format-layout",
  "resume-title-headline": "format-layout",
  // Pillar 5: International
  "resume-working-abroad": "international",
  "multilingual-resume-language-skills": "international",
};

export const PILLAR_ORDER = [
  "ats-optimization",
  "ai-cv",
  "job-search",
  "format-layout",
  "international",
] as const;

export function getPillar(translationKey?: string): string {
  if (!translationKey) return "other";
  return PILLAR_MAP[translationKey] ?? "other";
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

export function getAllSlugs(): { locale: string; slug: string; translationKey?: string }[] {
  const results: { locale: string; slug: string; translationKey?: string }[] = [];
  const locales = ["fr", "en", "es", "de"];

  for (const locale of locales) {
    const dir = path.join(BLOG_DIR, locale);
    if (!fs.existsSync(dir)) continue;
    for (const filename of fs.readdirSync(dir)) {
      if (filename.endsWith(".md")) {
        const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
        const { data } = matter(raw);
        results.push({
          locale,
          slug: filename.replace(/\.md$/, ""),
          translationKey: data.translationKey,
        });
      }
    }
  }

  return results;
}
