import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAlternates, getBreadcrumbJsonLd } from "@/lib/seo";
import ContactForm from "@/components/landing/ContactForm";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Contact");

  const breadcrumbJsonLd = getBreadcrumbJsonLd(locale, [
    { name: "FitMyCV", path: "/" },
    { name: t("metaTitle"), path: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <h1>{t("pageTitle")}</h1>
      <p style={{ marginBottom: "2rem" }}>{t("intro")}</p>

      <div className="legal-section">
        <ContactForm />
      </div>

      <div className="legal-section">
        <h2>{t("infoTitle")}</h2>
        <div className="legal-infobox">
          {t.rich("infoBox", {
            contactEmail: (chunks) => (
              <a href="mailto:contact@fitmycv.io">{chunks}</a>
            ),
          })}
        </div>
      </div>
    </>
  );
}
