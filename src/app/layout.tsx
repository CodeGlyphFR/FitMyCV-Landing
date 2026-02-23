import "./globals.css";
import "../styles/landing.css";
import { Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import PostHogProvider from "@/components/PostHogProvider";

const inter = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://app.fitmycv.io" />
        <script
          dangerouslySetInnerHTML={{
            __html: "history.scrollRestoration='manual';window.scrollTo(0,0);",
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <PostHogProvider>
        <noscript>
          <p style={{ padding: "2rem", textAlign: "center", color: "#fff", background: "#0a0a1a" }}>
            {{
              fr: "JavaScript est requis pour utiliser FitMyCV. Veuillez activer JavaScript dans votre navigateur.",
              en: "JavaScript is required to use FitMyCV. Please enable JavaScript in your browser.",
              es: "Se requiere JavaScript para usar FitMyCV. Por favor, active JavaScript en su navegador.",
              de: "JavaScript ist erforderlich, um FitMyCV zu nutzen. Bitte aktivieren Sie JavaScript in Ihrem Browser.",
            }[locale as "fr" | "en" | "es" | "de"] ?? "JavaScript is required to use FitMyCV. Please enable JavaScript in your browser."}
          </p>
        </noscript>
        {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
