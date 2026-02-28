import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { faqConfig } from "@/data/faq-config";
import { getAlternates } from "@/lib/seo";
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
import SectionTracker from "@/components/landing/SectionTracker";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    alternates: getAlternates(locale, "/"),
  };
}

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FitMyCV",
  url: "https://www.fitmycv.io",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FitMyCV",
  url: "https://www.fitmycv.io",
  logo: "https://www.fitmycv.io/icons/logo_small.png",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@fitmycv.io",
    contactType: "customer service",
  },
};

export default async function Home() {
  const t = await getTranslations("JsonLd");
  const faqT = await getTranslations("FAQ");
  const faqItems = faqT.raw("items") as Array<{ question: string; answer: string }>;
  const allFaqItems = faqConfig.map(c => ({ ...faqItems[c.id] }));

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FitMyCV",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Resume Builder",
    operatingSystem: "Web",
    url: "https://www.fitmycv.io",
    description: t("softwareDescription"),
    inLanguage: ["fr", "en", "es", "de"],
    browserRequirements: "Requires Chrome, Firefox, Edge, or Brave",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "0",
      highPrice: "35.99",
      offerCount: "4",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqItems.map((f) => ({
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
          __html: JSON.stringify(webSiteJsonLd),
        }}
      />
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
      <SectionTracker />
      <SvgDefs />
      <Header />
      <main id="main">
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
      </main>
      <Footer />
    </>
  );
}
