import SvgDefs from "@/components/landing/SvgDefs";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import SectionDivider from "@/components/landing/SectionDivider";
import StatsStrip from "@/components/landing/StatsStrip";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Reviews from "@/components/landing/Reviews";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <SvgDefs />
      <Header />
      <Hero />
      <HowItWorks />
      <SectionDivider />
      <StatsStrip />
      <SectionDivider />
      <Features />
      <SectionDivider />
      <Pricing />
      <Reviews />
      <FAQ />
      <Footer />
    </>
  );
}
