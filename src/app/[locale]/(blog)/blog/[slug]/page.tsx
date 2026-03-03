import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getBreadcrumbJsonLd, getOgUrl } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { getPostBySlug, getAllSlugs, getAlternateBlogPaths } from "@/lib/blog";
import { SetPathnameOverrides } from "@/components/PathnameOverrides";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BASE_URL = "https://www.fitmycv.io";

export function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    const localeSlugs = slugs.filter((s) => s.locale === locale);
    for (const { slug } of localeSlugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);
  if (!post) return {};

  const alternatePaths = post.translationKey
    ? getAlternateBlogPaths(post.translationKey)
    : {};

  const canonical =
    locale === routing.defaultLocale
      ? `${BASE_URL}/blog/${slug}`
      : `${BASE_URL}/${locale}/blog/${slug}`;

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    const altPath = alternatePaths[loc] ?? `/blog/${slug}`;
    languages[loc] =
      loc === routing.defaultLocale
        ? `${BASE_URL}${altPath}`
        : `${BASE_URL}/${loc}${altPath}`;
  }
  languages["x-default"] = languages["en"] ?? canonical;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical, languages },
    openGraph: {
      type: "article" as const,
      url: getOgUrl(locale, `/blog/${slug}`),
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);
  if (!post) notFound();

  const t = await getTranslations("Blog");

  const breadcrumbJsonLd = getBreadcrumbJsonLd(locale, [
    { name: "FitMyCV", path: "/" },
    { name: t("pageTitle"), path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ]);

  const alternatePaths = post.translationKey
    ? getAlternateBlogPaths(post.translationKey)
    : {};

  const canonicalUrl =
    locale === routing.defaultLocale
      ? `${BASE_URL}/blog/${slug}`
      : `${BASE_URL}/${locale}/blog/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    image: "https://www.fitmycv.io/og-image.webp",
    inLanguage: locale,
    author: {
      "@type": "Organization",
      name: "FitMyCV",
      url: "https://www.fitmycv.io",
    },
    publisher: {
      "@type": "Organization",
      name: "FitMyCV",
      url: "https://www.fitmycv.io",
    },
  };

  return (
    <>
      <SetPathnameOverrides overrides={alternatePaths} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="blog-article">
        <Link href="/blog" className="blog-back">
          ← {t("backToBlog")}
        </Link>
        <header className="blog-article-header">
          <h1>{post.title}</h1>
          <time dateTime={post.date}>
            {t("publishedOn")}{" "}
            {new Date(post.date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.tags.length > 0 && (
            <div className="blog-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div className="blog-content">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </div>
      </article>
    </>
  );
}
