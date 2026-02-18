"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";

export default function SupportAccordion() {
  const t = useTranslations("FAQ");
  const items = t.raw("items") as Array<{ question: string; answer: string }>;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = useCallback((i: number) => {
    setActiveIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <div className="support-list">
      {items.map((item, i) => (
        <div
          key={i}
          className={`faq-item${activeIndex === i ? " active" : ""}`}
          onClick={() => toggle(i)}
        >
          <div className="faq-item-header">
            <div className="faq-icon">
              <svg className="faq-icon-plus" viewBox="0 0 24 24">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              <svg className="faq-icon-minus" viewBox="0 0 24 24">
                <path d="M5 12h14" />
              </svg>
            </div>
            <h2 className="faq-question">{item.question}</h2>
          </div>
          <div className="faq-answer">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
