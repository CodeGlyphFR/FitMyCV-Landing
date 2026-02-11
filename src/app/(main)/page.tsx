import type { Metadata } from "next";
import { faqItems } from "@/data/faq";
import SvgDefs from "@/components/landing/SvgDefs";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import SectionDivider from "@/components/landing/SectionDivider";
import StatsStrip from "@/components/landing/StatsStrip";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FitMyCV",
  url: "https://www.fitmycv.io",
  logo: "https://www.fitmycv.io/icons/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@fitmycv.io",
    contactType: "customer service",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FitMyCV",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://www.fitmycv.io",
  description:
    "Importez votre CV, collez le lien d'une offre d'emploi, et laissez l'IA optimiser votre candidature pour maximiser vos chances.",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "4.99",
    highPrice: "35.99",
    offerCount: "4",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems
    .filter((f) => f.landing)
    .map((f) => ({
      "@type": "Question" as const,
      name: f.question,
      acceptedAnswer: { "@type": "Answer" as const, text: f.answer },
    })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <SvgDefs />
      <Header />
      <Hero />
      <HowItWorks />
      <SectionDivider />
      <StatsStrip />
      <SectionDivider />
      <Features />
      <SectionDivider />
      <Pricing />
      {/* <Reviews /> */}
      <FAQ />
      <Footer />
    </>
  );
}
