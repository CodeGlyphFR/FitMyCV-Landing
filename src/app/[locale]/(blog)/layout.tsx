import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main id="main" className="blog-layout">
        {children}
      </main>
      <Footer />
    </>
  );
}
