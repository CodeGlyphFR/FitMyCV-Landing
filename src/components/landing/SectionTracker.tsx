'use client';

import { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';

const SECTIONS: { id: string; name: string }[] = [
  { id: 'hero', name: 'hero' },
  { id: 'howItWorks', name: 'how_it_works' },
  { id: 'features', name: 'features' },
  { id: 'pricing', name: 'pricing' },
  { id: 'faq', name: 'faq' },
];

export default function SectionTracker() {
  const posthog = usePostHog();

  useEffect(() => {
    if (!posthog) return;

    const seen = new Set<string>();
    const elements: Element[] = [];

    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) elements.push(el);
    }

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          const section = SECTIONS.find((s) => s.id === id);
          if (section && !seen.has(id)) {
            seen.add(id);
            posthog.capture('section_viewed', { section: section.name });
          }
        }
      },
      { threshold: 0.3 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [posthog]);

  return null;
}
