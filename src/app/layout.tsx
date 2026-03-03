import "./globals.css";
import "../styles/landing.css";
import { Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import PostHogProvider from "@/components/PostHogProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://app.fitmycv.io" />
        <link rel="dns-prefetch" href="https://eu.i.posthog.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: "history.scrollRestoration='manual';window.scrollTo(0,0);",
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <PostHogProvider>
        <noscript>
          <div style={{ padding: "2rem", textAlign: "center", color: "#fff", background: "#0a0a1a" }}>
            <p>
              {{
                fr: "JavaScript est requis pour utiliser FitMyCV. Veuillez activer JavaScript dans votre navigateur.",
                en: "JavaScript is required to use FitMyCV. Please enable JavaScript in your browser.",
                es: "Se requiere JavaScript para usar FitMyCV. Por favor, active JavaScript en su navegador.",
                de: "JavaScript ist erforderlich, um FitMyCV zu nutzen. Bitte aktivieren Sie JavaScript in Ihrem Browser.",
              }[locale as "fr" | "en" | "es" | "de"] ?? "JavaScript is required to use FitMyCV. Please enable JavaScript in your browser."}
            </p>
            {/* noscript: plain <a> tags are intentional — <Link> requires JS */}
            {/* eslint-disable @next/next/no-html-link-for-pages */}
            <nav style={{ marginTop: "1rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/" style={{ color: "#22d3ee" }}>Home</a>
              <a href="/how-it-works" style={{ color: "#22d3ee" }}>How It Works</a>
              <a href="/features" style={{ color: "#22d3ee" }}>Features</a>
              <a href="/pricing" style={{ color: "#22d3ee" }}>Pricing</a>
              <a href="/blog" style={{ color: "#22d3ee" }}>Blog</a>
              <a href="/support" style={{ color: "#22d3ee" }}>Support</a>
              <a href="/contact" style={{ color: "#22d3ee" }}>Contact</a>
            </nav>
            {/* eslint-enable @next/next/no-html-link-for-pages */}
          </div>
        </noscript>
        {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
