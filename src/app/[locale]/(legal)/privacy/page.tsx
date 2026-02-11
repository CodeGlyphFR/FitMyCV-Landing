import { getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getAlternates(locale, "/privacy"),
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("Privacy");

  return (
    <>
      <h1>{t("pageTitle")}</h1>
      <p className="legal-date">{t("lastUpdate")}</p>

      <div className="legal-section">
        <h2>{t("s1Title")}</h2>
        <p>{t("s1p1")}</p>
        <div className="legal-infobox">
          {t.rich("s1Infobox", {
            contactEmail: (chunks) => (
              <a href="mailto:contact@codeglyph.fr">{chunks}</a>
            ),
          })}
        </div>
      </div>

      <div className="legal-section">
        <h2>{t("s2Title")}</h2>
        <p>{t("s2p1")}</p>
      </div>

      <div className="legal-section">
        <h2>{t("s3Title")}</h2>
        <p>{t("s3p1")}</p>
        <ul>
          {(t.raw("s3Rights") as Array<{ title: string; desc: string }>).map(
            (right, i) => (
              <li key={i}>
                <strong>{right.title} :</strong> {right.desc}
              </li>
            )
          )}
        </ul>
        <p>
          {t.rich("s3p2", {
            contactEmail: (chunks) => (
              <a href="mailto:contact@codeglyph.fr">{chunks}</a>
            ),
          })}
        </p>
        <p>
          {t.rich("s3p3", {
            cnilLink: (chunks) => (
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>

      <div className="legal-section">
        <h2>{t("s4Title")}</h2>
        <h3>{t("s4_1Title")}</h3>
        <ul>
          {(t.raw("s4_1Items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <h3>{t("s4_2Title")}</h3>
        <ul>
          {(t.raw("s4_2Items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <h3>{t("s4_3Title")}</h3>
        <ul>
          {(t.raw("s4_3Items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <h3>{t("s4_4Title")}</h3>
        <ul>
          {(t.raw("s4_4Items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <h3>{t("s4_5Title")}</h3>
        <ul>
          {(t.raw("s4_5Items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="legal-section">
        <h2>{t("s5Title")}</h2>
        <table className="legal-table">
          <thead>
            <tr>
              {(t.raw("s5TableHeaders") as string[]).map((header, i) => (
                <th key={i}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(t.raw("s5TableRows") as string[][]).map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="legal-section">
        <h2>{t("s6Title")}</h2>
        <table className="legal-table">
          <thead>
            <tr>
              {(t.raw("s6TableHeaders") as string[]).map((header, i) => (
                <th key={i}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(t.raw("s6TableRows") as string[][]).map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="legal-section">
        <h2>{t("s7Title")}</h2>
        <p>{t("s7p1")}</p>
      </div>

      <div className="legal-section">
        <h2>{t("s8Title")}</h2>
        <p>{t("s8p1")}</p>
        <ul>
          <li>
            {t.rich("s8Provider", {
              openaiLink: (chunks) => (
                <a
                  href="https://openai.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {chunks}
                </a>
              ),
            })}
          </li>
        </ul>
        <p>{t("s8p2")}</p>
        <h3>{t("s8_autoTitle")}</h3>
        <p>{t("s8_autoP")}</p>
      </div>

      <div className="legal-section">
        <h2>{t("s9Title")}</h2>
        <p>{t("s9p1")}</p>
        <p>
          {t.rich("s9Link", {
            stripeLink: (chunks) => (
              <a
                href="https://stripe.com/fr/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>

      <div className="legal-section">
        <h2>{t("s10Title")}</h2>
        <p>{t("s10p1")}</p>
        <p>
          {t.rich("s10Link", {
            resendLink: (chunks) => (
              <a
                href="https://resend.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>

      <div className="legal-section">
        <h2>{t("s11Title")}</h2>
        <p>{t("s11p1")}</p>
      </div>

      <div className="legal-section">
        <h2>{t("s12Title")}</h2>
        <p>{t("s12p1")}</p>
        <ul>
          {(t.raw("s12Items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p>
          {t.rich("s12p2", {
            googlePrivacyLink: (chunks) => (
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>

      <div className="legal-section">
        <h2>{t("s13Title")}</h2>
        <p>{t("s13p1")}</p>
      </div>

      <div className="legal-section">
        <h2>{t("s14Title")}</h2>
        <p>{t("s14p1")}</p>
      </div>
    </>
  );
}
