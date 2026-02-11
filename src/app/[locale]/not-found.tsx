import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a1a",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "6rem",
          fontWeight: 700,
          margin: 0,
          opacity: 0.3,
        }}
      >
        {t("title")}
      </h1>
      <p
        style={{ fontSize: "1.25rem", opacity: 0.6, marginTop: "0.5rem" }}
      >
        {t("message")}
      </p>
      <Link
        href="/"
        style={{
          marginTop: "2rem",
          padding: "0.75rem 2rem",
          borderRadius: "0.5rem",
          background: "linear-gradient(135deg, #22d3ee, #34d399)",
          color: "#0a0a1a",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
