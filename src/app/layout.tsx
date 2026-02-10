import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/landing.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fitmycv.io"),
  title: {
    default: "FitMyCV — Adaptez votre CV à chaque offre d'emploi avec l'IA",
    template: "%s | FitMyCV",
  },
  description:
    "Importez votre CV, collez le lien d'une offre d'emploi, et laissez l'IA optimiser votre candidature pour maximiser vos chances. Export PDF et Word en quelques secondes.",
  applicationName: "FitMyCV",
  keywords: [
    "CV",
    "optimisation CV",
    "IA",
    "intelligence artificielle",
    "ATS",
    "générateur CV",
    "adapter CV offre emploi",
    "score matching CV",
    "export PDF CV",
    "candidature automatique",
    "FitMyCV",
  ],
  authors: [{ name: "FitMyCV", url: "https://www.fitmycv.io" }],
  creator: "FitMyCV",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
      { url: "/apple-touch-icon-512.png", sizes: "512x512" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "FitMyCV",
    title: "FitMyCV — Adaptez votre CV à chaque offre d'emploi avec l'IA",
    description:
      "Importez votre CV, collez le lien d'une offre et laissez l'IA l'optimiser pour chaque poste. Export PDF/Word en secondes.",
    url: "https://www.fitmycv.io",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FitMyCV — Votre CV, optimisé par l'IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FitMyCV — Adaptez votre CV à chaque offre d'emploi avec l'IA",
    images: ["/og-image.png"],
    description:
      "Importez votre CV, collez un lien d'offre et laissez l'IA l'optimiser. Export PDF/Word en secondes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script dangerouslySetInnerHTML={{ __html: "history.scrollRestoration='manual';window.scrollTo(0,0);" }} />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
