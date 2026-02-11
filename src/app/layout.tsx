import "./globals.css";
import "../styles/landing.css";
import { Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
