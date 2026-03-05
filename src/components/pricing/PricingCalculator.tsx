"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

const CREDITS_IMPORT = 2;
const CREDITS_PER_OFFER = 7;
const FREE_CREDITS = 15;
const LAUNCH_DISCOUNT = 0.7;

const CALC_PACKS = [
  { name: "Starter", credits: 15, price: 499 },
  { name: "Pro", credits: 50, price: 1499 },
  { name: "Expert", credits: 100, price: 2699 },
  { name: "Ultimate", credits: 150, price: 3599 },
];

export function computeCost(n: number) {
  if (n <= 0) return { total: 0, perOffer: 0, packName: "", fullPrice: 0 };
  const creditsNeeded = CREDITS_IMPORT + n * CREDITS_PER_OFFER;
  const packCreditsNeeded = Math.max(0, creditsNeeded - FREE_CREDITS);
  if (packCreditsNeeded === 0) return { total: 0, perOffer: 0, packName: "", fullPrice: 0 };
  const pack = CALC_PACKS.find((p) => p.credits >= packCreditsNeeded) || CALC_PACKS[CALC_PACKS.length - 1];
  const fullPrice = pack.price / 100;
  const discounted = Math.round(pack.price * LAUNCH_DISCOUNT) / 100;
  const perOffer = (discounted / pack.credits) * CREDITS_PER_OFFER;
  return { total: discounted, perOffer, packName: pack.name, fullPrice };
}

function fmtPrice(v: number, suffix?: string): string {
  return v.toFixed(2).replace(".", ",") + "\u00a0€" + (suffix ? "\u00a0" + suffix : "");
}

interface PricingCalculatorProps {
  max?: number;
  onApplicationsChange?: (applications: number) => void;
}

export default function PricingCalculator({ max = 30, onApplicationsChange }: PricingCalculatorProps) {
  const t = useTranslations("Pricing");
  const [applications, setApplications] = useState(5);
  const rangePct = ((applications - 1) / (max - 1)) * 100;

  const cost = useMemo(() => computeCost(applications), [applications]);

  return (
    <div className="cost-calc">
      <p className="cost-calc-q">{t("calcQuestion")}</p>
      <div className="cost-calc-slider">
        <input
          type="range"
          min={1}
          max={max}
          value={applications}
          onChange={(e) => {
            const n = Number(e.target.value);
            setApplications(n);
            onApplicationsChange?.(n);
          }}
          style={{ "--range-pct": `${rangePct}%` } as React.CSSProperties}
        />
        <span className="cost-calc-val">{applications}</span>
      </div>
      <div className="cost-calc-metrics">
        <div className="cost-calc-metric">
          <span className="label">{t("calcTotal")}<sup>1</sup></span>
          <span className="value green" key={`t-${applications}`}>
            {cost.total === 0 ? t("calcFree") : fmtPrice(cost.total, t("exclTax"))}
          </span>
        </div>
        <div className="cost-calc-metric">
          <span className="label">{t("calcPerOffer")}<sup>2</sup></span>
          <span className="value cyan" key={`p-${applications}`}>
            {cost.perOffer === 0 ? t("calcFree") : fmtPrice(cost.perOffer, t("exclTax"))}
          </span>
        </div>
        <div className="cost-calc-metric">
          <span className="label">{t("calcCompetition")}</span>
          <span className="value red">{t("calcCompetitionValue")}<span className="approx">{t("calcPerMonth")}</span></span>
        </div>
      </div>
      <div className="cost-calc-notes">
        <p><sup>1</sup>{t("calcNote1")}</p>
        <p><sup>2</sup>{t("calcNote2")}</p>
      </div>
    </div>
  );
}
