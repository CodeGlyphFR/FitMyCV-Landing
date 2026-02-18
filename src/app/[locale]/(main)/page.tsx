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
  const landingFaqItems = faqConfig.filter(c => c.landing).map(c => ({ ...faqItems[c.id] }));

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FitMyCV",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.fitmycv.io",
    description: t("softwareDescription"),
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
    mainEntity: landingFaqItems.map((f) => ({
      "@type": "Question" as const,
      name: f.question,
      acceptedAnswer: { "@type": "Answer" as const, text: f.answer },
    })),
  };

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: t("videoName"),
    description: t("videoDescription"),
    thumbnailUrl: "https://www.fitmycv.io/hero-poster.webp",
    uploadDate: "2025-02-10",
    contentUrl: "https://www.fitmycv.io/background_video.webm",
    duration: "PT8S",
    width: 1280,
    height: 720,
    encodingFormat: "video/webm",
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoJsonLd),
        }}
      />
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
