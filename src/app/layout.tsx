import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/landing.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitMyCV — Tailor your CV to any job offer with AI",
  description:
    "Import your CV, paste a job offer, and let AI optimize your resume for maximum match. Export as PDF or Word in seconds.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
