import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAlternates, getBreadcrumbJsonLd, getOgUrl } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { getAllPosts } from "@/lib/blog";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getAlternates(locale, "/blog"),
    openGraph: { url: getOgUrl(locale, "/blog") },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Blog");
  const posts = getAllPosts(locale);

  const breadcrumbJsonLd = getBreadcrumbJsonLd(locale, [
    { name: "FitMyCV", path: "/" },
    { name: t("pageTitle"), path: "/blog" },
  ]);

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("pageTitle"),
    description: t("metaDescription"),
    url:
      locale === "en"
        ? "https://www.fitmycv.io/blog"
        : `https://www.fitmycv.io/${locale}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url:
          locale === "en"
            ? `https://www.fitmycv.io/blog/${post.slug}`
            : `https://www.fitmycv.io/${locale}/blog/${post.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <section className="blog-hero">
        <h1>{t("pageTitle")}</h1>
        <p className="blog-subtitle">{t("pageSubtitle")}</p>
      </section>

      {posts.length === 0 ? (
        <p className="blog-empty">{t("noPosts")}</p>
      ) : (
        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.slug} className="blog-card">
              <Link href={`/blog/${post.slug}`}>
                <h2>{post.title}</h2>
                <p className="blog-card-desc">{post.description}</p>
                <div className="blog-card-meta">
                  <time dateTime={post.date}>
                    {t("publishedOn")}{" "}
                    {new Date(post.date).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <span className="blog-read-more">{t("readMore")}</span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
