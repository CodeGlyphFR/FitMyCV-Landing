import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAlternates, getBreadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getAlternates(locale, "/terms"),
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Terms");

  const breadcrumbJsonLd = getBreadcrumbJsonLd(locale, [
    { name: "FitMyCV", path: "/" },
    { name: t("metaTitle"), path: "/terms" },
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
      <p className="legal-date">{t("lastUpdate")}</p>

      <div className="legal-section">
        <h2>{t("s1Title")}</h2>
        <p>{t("s1p1")}</p>
        <p>{t("s1p2")}</p>
        <p>{t("s1p3")}</p>
      </div>

      <div className="legal-section">
        <h2>{t("s2Title")}</h2>
        <p>{t("s2p1")}</p>

        <h3>{t("s2_1Title")}</h3>
        <ul>
          {(t.raw("s2_1Items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h3>{t("s2_2Title")}</h3>
        <ul>
          {(t.raw("s2_2Items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h3>{t("s2_3Title")}</h3>
        <p>{t("s2_3p1")}</p>
        <p>{t("s2_3p2")}</p>
        <p>{t("s2_3p3")}</p>
        <p>
          {t.rich("s2_3p4", {
            creditsLink: (chunks) => (
              <a href="https://app.fitmycv.io/account/subscriptions?tab=credits">
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>

      <div className="legal-section">
        <h2>{t("s3Title")}</h2>
        <p>{t("s3p1")}</p>
        <p>{t("s3p2")}</p>
        <p>
          {t.rich("s3p3", {
            creditsLink: (chunks) => (
              <a href="https://app.fitmycv.io/account/subscriptions?tab=credits">
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>

      <div className="legal-section">
        <h2>{t("s4Title")}</h2>
        <p>{t("s4p1")}</p>
        <p>{t("s4p2")}</p>
        <div className="legal-highlight highlight-warning">
          {t.rich("s4Highlight", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </div>
      </div>

      <div className="legal-section">
        <h2>{t("s5Title")}</h2>
        <p>{t("s5p1")}</p>
        <p>
          {t.rich("s5p2", {
            supportEmail: (chunks) => (
              <a href="mailto:support@fitmycv.io">{chunks}</a>
            ),
          })}
        </p>
      </div>

      <div className="legal-section">
        <h2>{t("s6Title")}</h2>
        <p>{t("s6p1")}</p>
        <ul>
          {(t.raw("s6Items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <div className="legal-highlight highlight-warning">
          {t.rich("s6Highlight", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </div>
      </div>

      <div className="legal-section">
        <h2>{t("s7Title")}</h2>
        <p>{t("s7p1")}</p>

        <h3>{t("s7_1Title")}</h3>
        <ul>
          {(t.raw("s7_1Items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h3>{t("s7_2Title")}</h3>
        <p>{t("s7_2p1")}</p>

        <h3>{t("s7_3Title")}</h3>
        <p>{t("s7_3p1")}</p>
        <div className="legal-highlight highlight-info">
          {t.rich("s7Highlight", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </div>
      </div>

      <div className="legal-section">
        <h2>{t("s8Title")}</h2>
        <p>{t("s8p1")}</p>
        <p>{t("s8p2")}</p>
      </div>

      <div className="legal-section">
        <h2>{t("s9Title")}</h2>
        <p>{t("s9p1")}</p>
        <p>{t("s9p2")}</p>
        <ul>
          {(t.raw("s9Items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p>{t("s9p3")}</p>
        <p>{t("s9p4")}</p>
      </div>

      <div className="legal-section">
        <h2>{t("s10Title")}</h2>
        <p>{t("s10p1")}</p>
        <ul>
          {(t.raw("s10Items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <div className="legal-highlight highlight-danger">
          {t.rich("s10Highlight", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </div>
      </div>

      <div className="legal-section">
        <h2>{t("s11Title")}</h2>
        <p>
          {t.rich("s11p1", {
            supportEmail: (chunks) => (
              <a href="mailto:support@fitmycv.io">{chunks}</a>
            ),
          })}
        </p>
        <p>
          {t.rich("s11p2", {
            privacyLink: (chunks) => <Link href="/privacy">{chunks}</Link>,
          })}
        </p>
        <div className="legal-highlight highlight-warning">
          {t.rich("s11Highlight", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </div>
      </div>

      <div className="legal-section">
        <h2>{t("s12Title")}</h2>
        <p>{t("s12p1")}</p>
      </div>

      <div className="legal-section">
        <h2>{t("s13Title")}</h2>
        <p>{t("s13p1")}</p>
        <p>
          {t.rich("s13p2", {
            contactEmail: (chunks) => (
              <a href="mailto:contact@fitmycv.io">{chunks}</a>
            ),
          })}
        </p>
        <div className="legal-highlight highlight-info">
          {t.rich("s13Highlight", {
            strong: (chunks) => <strong>{chunks}</strong>,
            odrLink: (chunks) => (
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
            ),
          })}
        </div>
      </div>

      <div className="legal-section">
        <h2>{t("s14Title")}</h2>
        <p>{t("s14p1")}</p>
        <p>{t("s14p2")}</p>
      </div>

      <div className="legal-section">
        <h2>{t("s15Title")}</h2>
        <p>{t("s15p1")}</p>
        <div className="legal-infobox">
          {t.rich("s15Infobox", {
            contactEmail: (chunks) => (
              <a href="mailto:contact@codeglyph.fr">{chunks}</a>
            ),
          })}
        </div>

        <h3>{t("s15_hosting")}</h3>
        <p>{t("s15_hostingP")}</p>

        <h3>{t("s15_dataProtection")}</h3>
        <p>
          {t.rich("s15_dataProtectionP1", {
            privacyLink: (chunks) => <Link href="/privacy">{chunks}</Link>,
          })}
        </p>
        <p>
          {t.rich("s15_dataProtectionP2", {
            contactEmail: (chunks) => (
              <a href="mailto:contact@fitmycv.io">{chunks}</a>
            ),
          })}
        </p>
      </div>
    </>
  );
}
