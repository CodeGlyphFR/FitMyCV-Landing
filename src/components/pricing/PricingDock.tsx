"use client";

import { FloatingDock } from "@/components/ui/floating-dock";

function MockupIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full"
      style={{ filter: "brightness(0) invert(1)", opacity: 0.85 }}
    />
  );
}

function ScoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
      style={{ opacity: 0.85 }}
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

const creditItems = [
  {
    title: "Génération IA — 3 Cr",
    icon: <MockupIcon src="/icons/openai-symbol.png" alt="Génération IA" />,
    href: "#",
  },
  {
    title: "Optimisation — 2 Cr",
    icon: <MockupIcon src="/icons/analyzer.png" alt="Optimisation" />,
    href: "#",
  },
  {
    title: "Import CV — 2 Cr",
    icon: <MockupIcon src="/icons/import.png" alt="Import CV" />,
    href: "#",
  },
  {
    title: "Score — 1 Cr",
    icon: <ScoreIcon />,
    href: "#",
  },
  {
    title: "Export PDF — 1 Cr",
    icon: <MockupIcon src="/icons/export.png" alt="Export PDF" />,
    href: "#",
  },
];

export function PricingDock() {
  return (
    <FloatingDock
      items={creditItems}
      desktopClassName="h-16 gap-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl px-4 pb-3"
      mobileClassName="translate-y-0"
    />
  );
}
