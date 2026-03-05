"use client";

import { useTranslations } from "next-intl";
import FaqAccordionList from "@/components/ui/FaqAccordionList";

export default function SupportAccordion() {
  const t = useTranslations("FAQ");
  const items = t.raw("items") as Array<{ question: string; answer: string }>;

  return <FaqAccordionList items={items} className="support-list" />;
}
