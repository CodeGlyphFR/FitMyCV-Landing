import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAlternates, getBreadcrumbJsonLd, getOgUrl } from "@/lib/seo";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FeaturesPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getAlternates(locale, "/features"),
    openGraph: { url: getOgUrl(locale, "/features") },
  };
}

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("FeaturesPage");

  const breadcrumbJsonLd = getBreadcrumbJsonLd(locale, [
    { name: "FitMyCV", path: "/" },
    { name: t("pageTitle"), path: "/features" },
  ]);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("metaTitle"),
    itemListElement: Array.from({ length: 14 }, (_, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t(`feat${i + 1}Title`),
      description: t(`feat${i + 1}Desc`),
    })),
  };

  const categories = [
    {
      title: t("category1Title"),
      desc: t("category1Desc"),
      features: [
        { title: t("feat1Title"), desc: t("feat1Desc") },
        { title: t("feat2Title"), desc: t("feat2Desc") },
        { title: t("feat3Title"), desc: t("feat3Desc") },
        { title: t("feat4Title"), desc: t("feat4Desc") },
      ],
    },
    {
      title: t("category2Title"),
      desc: t("category2Desc"),
      features: [
        { title: t("feat5Title"), desc: t("feat5Desc") },
        { title: t("feat6Title"), desc: t("feat6Desc") },
        { title: t("feat7Title"), desc: t("feat7Desc") },
        { title: t("feat8Title"), desc: t("feat8Desc") },
      ],
    },
    {
      title: t("category3Title"),
      desc: t("category3Desc"),
      features: [
        { title: t("feat9Title"), desc: t("feat9Desc") },
        { title: t("feat10Title"), desc: t("feat10Desc") },
        { title: t("feat11Title"), desc: t("feat11Desc") },
      ],
    },
    {
      title: t("category4Title"),
      desc: t("category4Desc"),
      features: [
        { title: t("feat12Title"), desc: t("feat12Desc") },
        { title: t("feat13Title"), desc: t("feat13Desc") },
        { title: t("feat14Title"), desc: t("feat14Desc") },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main id="main" className="dedicated-page">
        <section className="dedicated-hero">
          <h1>{t("pageTitle")}</h1>
          <p className="dedicated-subtitle">{t("pageSubtitle")}</p>
        </section>

        <section className="dedicated-content">
          {categories.map((category) => (
            <div key={category.title} className="feature-category">
              <h2>{category.title}</h2>
              <p className="category-desc">{category.desc}</p>
              <div className="feature-grid">
                {category.features.map((feat) => (
                  <article key={feat.title} className="feature-card-detail">
                    <h3>{feat.title}</h3>
                    <p>{feat.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="dedicated-cta">
          <h2>{t("ctaTitle")}</h2>
          <p>{t("ctaText")}</p>
          <a href="https://app.fitmycv.io" className="cta-button">
            {t("ctaButton")}
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
