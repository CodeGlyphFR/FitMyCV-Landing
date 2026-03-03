import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAlternates, getBreadcrumbJsonLd, getOgUrl } from "@/lib/seo";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PricingCalculator from "@/components/pricing/PricingCalculator";
import PackCardsGrid from "@/components/pricing/PackCardsGrid";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PricingPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getAlternates(locale, "/pricing"),
    openGraph: { url: getOgUrl(locale, "/pricing") },
  };
}

const PACKS = [
  { key: "packStarter", price: "4,99" },
  { key: "packPro", price: "14,99" },
  { key: "packExpert", price: "26,99" },
  { key: "packUltimate", price: "35,99" },
];

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("PricingPage");
  const breadcrumbJsonLd = getBreadcrumbJsonLd(locale, [
    { name: "FitMyCV", path: "/" },
    { name: t("pageTitle"), path: "/pricing" },
  ]);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "FitMyCV Credits",
    description: t("metaDescription"),
    offers: PACKS.map((pack) => ({
      "@type": "Offer",
      name: t(pack.key as "packStarter" | "packPro" | "packExpert" | "packUltimate"),
      price: pack.price.replace(",", "."),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    })),
  };

  const faqItems = t.raw("faq") as Array<{ question: string; answer: string }>;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main id="main" className="dedicated-page">
        <section className="dedicated-hero">
          <h1>{t("pageTitle")}</h1>
          <p className="dedicated-subtitle">{t("pageSubtitle")}</p>
        </section>

        <section className="dedicated-content">
          <div className="pricing-section">
            <h2>{t("creditSystemTitle")}</h2>
            <p>{t("creditSystemP1")}</p>
            <p>{t("creditSystemP2")}</p>
          </div>

          <PricingCalculator />

          <div className="pricing-section">
            <h2>{t("packsTitle")}</h2>
            <p>{t("packsSubtitle")}</p>
            <PackCardsGrid />
          </div>

          <div className="pricing-section">
            <h2>{t("faqTitle")}</h2>
            <div className="pricing-faq">
              {faqItems.map((item) => (
                <details key={item.question} className="pricing-faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
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
