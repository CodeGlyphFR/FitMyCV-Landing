import type { Metadata } from "next";
import { faqItems } from "@/data/faq";
import SvgDefs from "@/components/landing/SvgDefs";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SupportAccordion from "./SupportAccordion";

export const metadata: Metadata = {
  title: "Centre d\u2019aide \u2014 Questions fr\u00e9quentes",
  description:
    "Retrouvez toutes les r\u00e9ponses \u00e0 vos questions sur FitMyCV\u00a0: g\u00e9n\u00e9ration de CV par IA, compatibilit\u00e9 ATS, formats, tarifs, protection des donn\u00e9es et plus encore.",
  alternates: {
    canonical: "/support",
  },
};

const supportFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question" as const,
    name: f.question,
    acceptedAnswer: { "@type": "Answer" as const, text: f.answer },
  })),
};

export default function SupportPage() {
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
        <h1>Centre d&apos;aide</h1>
        <p className="support-subtitle">
          Tout ce que vous devez savoir sur FitMyCV
        </p>
        <SupportAccordion items={faqItems} />
      </section>
      <Footer />
    </>
  );
}
