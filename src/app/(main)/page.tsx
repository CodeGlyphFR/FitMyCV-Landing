import type { Metadata } from "next";
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

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FitMyCV",
  url: "https://www.fitmycv.io",
  logo: "https://www.fitmycv.io/icons/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@fitmycv.io",
    contactType: "customer service",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FitMyCV",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://www.fitmycv.io",
  description:
    "Importez votre CV, collez le lien d'une offre d'emploi, et laissez l'IA optimiser votre candidature pour maximiser vos chances.",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "4.99",
    highPrice: "35.99",
    offerCount: "4",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Comment FitMyCV génère-t-il mon CV ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vous créez un CV de base avec l'ensemble de vos compétences et expériences. Quand vous collez le lien d'une offre, l'IA identifie ce que le recruteur recherche et adapte automatiquement votre CV : elle met en avant ce qui correspond au poste et écarte le superflu. Un système de recommandations intelligentes vous suggère ensuite des ajouts pertinents — vous choisissez ce que vous intégrez et précisez votre niveau. Résultat : un CV ciblé, fidèle à votre parcours réel, prêt en quelques minutes.",
      },
    },
    {
      "@type": "Question",
      name: "L'IA va-t-elle remplacer mon contenu ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. L'IA ne fabrique ni compétences ni expériences. Elle travaille exclusivement à partir des informations que vous fournissez : elle reformule, réorganise et optimise le contenu en tenant compte du format ATS. Le mode révision vous permet de valider chaque modification, et l'éditeur en ligne vous donne un contrôle complet sur le résultat final.",
      },
    },
    {
      "@type": "Question",
      name: "Mon CV sera-t-il compatible ATS ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. La structure du CV, le choix des mots-clés et la hiérarchie des sections sont conçus pour être correctement lus par les systèmes de suivi des candidatures (ATS). Lorsque votre profil le justifie, l'IA intègre les termes pertinents de l'offre d'emploi pour renforcer la correspondance avec les filtres des recruteurs.",
      },
    },
    {
      "@type": "Question",
      name: "Mes données sont-elles protégées ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vos CV et données personnelles sont chiffrés et ne sont jamais partagés avec des tiers ni utilisés pour entraîner des modèles d'IA. Vous pouvez supprimer votre compte et l'ensemble de vos données à tout moment. FitMyCV est conforme au RGPD.",
      },
    },
    {
      "@type": "Question",
      name: "Quels formats sont supportés ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vous pouvez importer un CV existant en PDF par glisser-déposer. Après génération ou modification, l'export est disponible en PDF et en Word (.docx), prêts à être joints à une candidature ou chargés sur une plateforme d'emploi.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de CV puis-je créer ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il n'y a pas de limite. Chaque génération de CV consomme des crédits. À l'inscription, vous recevez 15 crédits gratuits pour tester l'outil. Ensuite, vous achetez des crédits à la demande selon vos besoins — sans abonnement ni engagement.",
      },
    },
    {
      "@type": "Question",
      name: "En combien de langues puis-je créer mon CV ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'interface et la traduction de CV sont actuellement disponibles en 4 langues : français, anglais, espagnol et allemand. D'autres langues seront ajoutées progressivement. Vous pouvez traduire un CV existant vers une autre langue en un clic, en conservant la mise en page et le contenu.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je modifier le CV après génération ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. L'éditeur en ligne vous permet de modifier chaque section directement dans le navigateur. Le mode révision affiche les suggestions de l'IA sous forme de propositions que vous pouvez accepter ou rejeter individuellement avant de finaliser votre CV.",
      },
    },
    {
      "@type": "Question",
      name: "Qu'est-ce que le score de correspondance ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "C'est un indicateur en pourcentage qui mesure l'adéquation entre votre CV et une offre d'emploi. L'algorithme compare les compétences, l'expérience et les mots-clés de votre profil avec les exigences du poste. En plus du score, des recommandations ciblées vous indiquent comment améliorer la correspondance.",
      },
    },
    {
      "@type": "Question",
      name: "Y a-t-il un essai gratuit ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Vous recevez 15 crédits gratuits à la création de votre compte, sans carte bancaire requise. Cela vous permet de générer plusieurs CV et de tester l'ensemble des fonctionnalités avant d'acheter des crédits supplémentaires.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles plateformes d'emploi sont compatibles ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FitMyCV fonctionne avec toute offre d'emploi accessible publiquement, sans authentification requise : Indeed, Welcome to the Jungle, Pôle Emploi, et de nombreuses autres plateformes. Il suffit de coller l'URL de l'offre. Pour les sites nécessitant une connexion (LinkedIn, etc.), une extension navigateur est en cours de développement — elle permettra de générer un CV directement depuis la page de l'offre, à partir du CV source de votre choix.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
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
