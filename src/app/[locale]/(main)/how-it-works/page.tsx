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
  const t = await getTranslations({ locale, namespace: "HowItWorksPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getAlternates(locale, "/how-it-works"),
    openGraph: { url: getOgUrl(locale, "/how-it-works") },
  };
}

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("HowItWorksPage");

  const breadcrumbJsonLd = getBreadcrumbJsonLd(locale, [
    { name: "FitMyCV", path: "/" },
    { name: t("pageTitle"), path: "/how-it-works" },
  ]);

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t("metaTitle"),
    description: t("metaDescription"),
    step: [
      { "@type": "HowToStep", position: 1, name: t("step1Title"), text: t("step1P1") },
      { "@type": "HowToStep", position: 2, name: t("step2Title"), text: t("step2P1") },
      { "@type": "HowToStep", position: 3, name: t("step3Title"), text: t("step3P1") },
      { "@type": "HowToStep", position: 4, name: t("step4Title"), text: t("step4P1") },
      { "@type": "HowToStep", position: 5, name: t("step5Title"), text: t("step5P1") },
      { "@type": "HowToStep", position: 6, name: t("step6Title"), text: t("step6P1") },
      { "@type": "HowToStep", position: 7, name: t("step7Title"), text: t("step7P1") },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
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
          <p className="dedicated-intro">{t("intro")}</p>

          <div className="how-it-works-steps">
            <article className="step-detail">
              <h2>{t("step1Title")}</h2>
              <p>{t("step1P1")}</p>
              <p>{t("step1P2")}</p>
              <p>{t("step1P3")}</p>
            </article>

            <article className="step-detail">
              <h2>{t("step2Title")}</h2>
              <p>{t("step2P1")}</p>
              <p>{t("step2P2")}</p>
              <p>{t("step2P3")}</p>
            </article>

            <article className="step-detail">
              <h2>{t("step3Title")}</h2>
              <p>{t("step3P1")}</p>
              <p>{t("step3P2")}</p>
            </article>

            <article className="step-detail">
              <h2>{t("step4Title")}</h2>
              <p>{t("step4P1")}</p>
              <p>{t("step4P2")}</p>
            </article>

            <article className="step-detail">
              <h2>{t("step5Title")}</h2>
              <p>{t("step5P1")}</p>
              <p>{t("step5P2")}</p>
            </article>

            <article className="step-detail">
              <h2>{t("step6Title")}</h2>
              <p>{t("step6P1")}</p>
              <p>{t("step6P2")}</p>
            </article>

            <article className="step-detail">
              <h2>{t("step7Title")}</h2>
              <p>{t("step7P1")}</p>
              <p>{t("step7P2")}</p>
            </article>
          </div>
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
