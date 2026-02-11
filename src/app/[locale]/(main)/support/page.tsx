import { getTranslations } from "next-intl/server";
import SvgDefs from "@/components/landing/SvgDefs";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SupportAccordion from "./SupportAccordion";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Support" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/support" },
  };
}

export default async function SupportPage() {
  const t = await getTranslations("Support");
  const faqT = await getTranslations("FAQ");
  const faqItems = faqT.raw("items") as Array<{ question: string; answer: string }>;

  const supportFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question" as const,
      name: f.question,
      acceptedAnswer: { "@type": "Answer" as const, text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(supportFaqJsonLd),
        }}
      />
      <SvgDefs />
      <Header />
      <section className="support-page">
        <h1>{t("heading")}</h1>
        <p className="support-subtitle">
          {t("subtitle")}
        </p>
        <SupportAccordion />
      </section>
      <Footer />
    </>
  );
}
