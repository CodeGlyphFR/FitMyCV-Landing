'use client';

import { useState, useCallback } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionListProps {
  items: FaqItem[];
  className?: string;
}

/** Renders a list of FAQ accordion items with expand/collapse behavior. */
export default function FaqAccordionList({ items, className }: FaqAccordionListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className={className}>
      {items.map((item, i) => (
        <div
          key={i}
          className={`faq-item${activeIndex === i ? ' active' : ''}`}
          onClick={() => handleItemClick(i)}
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
            <h3 className="faq-question">{item.question}</h3>
          </div>
          <div className="faq-answer">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
