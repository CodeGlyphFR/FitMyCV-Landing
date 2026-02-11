"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a1a",
          color: "#fff",
          fontFamily: "Inter, sans-serif",
          margin: 0,
        }}
      >
        <h1
          style={{ fontSize: "6rem", fontWeight: 700, margin: 0, opacity: 0.3 }}
        >
          500
        </h1>
        <p style={{ fontSize: "1.25rem", opacity: 0.6, marginTop: "0.5rem" }}>
          Une erreur est survenue
        </p>
        <button
          onClick={() => reset()}
          style={{
            marginTop: "2rem",
            padding: "0.75rem 2rem",
            borderRadius: "0.5rem",
            background: "linear-gradient(135deg, #22d3ee, #34d399)",
            color: "#0a0a1a",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Réessayer
        </button>
      </body>
    </html>
  );
}
