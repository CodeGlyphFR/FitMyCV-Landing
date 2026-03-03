"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

const CIRCUMFERENCE = 2 * Math.PI * 35;
const EV_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function randomString(len: number): string {
  let s = "";
  for (let i = 0; i < len; i++)
    s += EV_CHARS.charAt(Math.floor(Math.random() * EV_CHARS.length));
  return s;
}

interface PackData {
  tier: number;
  credits: number;
  ringPct: number;
  name: string;
  badge?: string;
  badgeClass?: string;
  price: string;
  perCredit: string;
  savings?: string;
}

export default function PackCardsGrid() {
  const t = useTranslations("Pricing");
  const gridRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const packs: PackData[] = [
    { tier: 1, credits: 15, ringPct: 10, name: "Starter", price: "4,99", perCredit: "0,33 €/crédit" },
    { tier: 2, credits: 50, ringPct: 33, name: "Pro", badge: t("packBadgePopular"), badgeClass: "popular", price: "14,99", perCredit: "0,30 €/crédit", savings: "−10 %" },
    { tier: 3, credits: 100, ringPct: 67, name: "Expert", price: "26,99", perCredit: "0,27 €/crédit", savings: "−20 %" },
    { tier: 4, credits: 150, ringPct: 100, name: "Ultimate", badge: t("packBadgeBestValue"), badgeClass: "best-value", price: "35,99", perCredit: "0,24 €/crédit", savings: "−30 %" },
  ];

  /* ── Evervault hover effect ── */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(".pack-card")) as HTMLElement[];

    cards.forEach((card) => {
      const str = randomString(3000);
      const ch = card.querySelector(".ev-chars");
      const chH = card.querySelector(".ev-chars-hover");
      if (ch) ch.textContent = str;
      if (chH) chH.textContent = str;
    });

    const handleMouseMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest(".pack-card") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
      const str = randomString(3000);
      const ch = card.querySelector(".ev-chars");
      const chH = card.querySelector(".ev-chars-hover");
      if (ch) ch.textContent = str;
      if (chH) chH.textContent = str;
    };

    const handleEnter = (card: HTMLElement) => {
      card.classList.add("hovered");
      const glow = card.querySelector(".glow-border") as HTMLElement | null;
      if (glow) glow.style.setProperty("--active", "1");
    };
    const handleLeave = (card: HTMLElement) => {
      card.classList.remove("hovered");
      const glow = card.querySelector(".glow-border") as HTMLElement | null;
      if (glow) glow.style.setProperty("--active", "0");
    };

    const enterHandlers: Array<() => void> = [];
    const leaveHandlers: Array<() => void> = [];

    cards.forEach((card, i) => {
      enterHandlers[i] = () => handleEnter(card);
      leaveHandlers[i] = () => handleLeave(card);
      card.addEventListener("mouseenter", enterHandlers[i]);
      card.addEventListener("mouseleave", leaveHandlers[i]);
    });

    grid.addEventListener("mousemove", handleMouseMove);

    return () => {
      grid.removeEventListener("mousemove", handleMouseMove);
      cards.forEach((card, i) => {
        card.removeEventListener("mouseenter", enterHandlers[i]);
        card.removeEventListener("mouseleave", leaveHandlers[i]);
      });
    };
  }, []);

  /* ── Glow border rotation ── */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const glowEls = Array.from(wrapper.querySelectorAll(".glow-border")) as HTMLElement[];
    const isTouch = !window.matchMedia("(hover: hover)").matches;
    let rafId: number | null = null;

    if (!isTouch) {
      const LERP = 0.15;
      let mouseX = 0, mouseY = 0;
      const states = glowEls.map((el) => ({ el, angle: 0, active: false }));

      const handlePointerMove = (e: PointerEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
      document.body.addEventListener("pointermove", handlePointerMove, { passive: true });

      function tick() {
        for (const s of states) {
          const card = s.el.parentElement;
          if (!card) continue;
          const rect = card.getBoundingClientRect();
          const inside = mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom;
          if (!inside) {
            if (s.active) { s.active = false; s.el.style.setProperty("--active", "0"); }
            continue;
          }
          if (!s.active) { s.active = true; s.el.style.setProperty("--active", "1"); }
          const cx = rect.left + rect.width * 0.5;
          const cy = rect.top + rect.height * 0.5;
          const target = (180 * Math.atan2(mouseY - cy, mouseX - cx)) / Math.PI + 90;
          const diff = ((target - s.angle + 180) % 360) - 180;
          s.angle += diff * LERP;
          s.el.style.setProperty("--start", String(s.angle));
        }
        rafId = requestAnimationFrame(tick);
      }
      rafId = requestAnimationFrame(tick);

      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    } else {
      const SPEED = 1.5;
      const states = glowEls.map((el) => ({ el, angle: 0 }));
      function tick() {
        for (const s of states) {
          const card = s.el.parentElement;
          if (card && card.classList.contains("hovered")) {
            s.angle += SPEED;
            s.el.style.setProperty("--start", String(s.angle));
          }
        }
        rafId = requestAnimationFrame(tick);
      }
      rafId = requestAnimationFrame(tick);
      return () => { if (rafId !== null) cancelAnimationFrame(rafId); };
    }
  }, []);

  /* ── Scroll reveal + counter + ring ── */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(".pack-card")) as HTMLElement[];
    const timers: ReturnType<typeof setTimeout>[] = [];

    cards.forEach((card) => card.classList.add("will-animate"));

    function animateCounter(el: HTMLElement, target: number, duration = 900) {
      const start = performance.now();
      const update = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    }

    function animateCard(card: HTMLElement) {
      if (card.dataset.animated) return;
      card.dataset.animated = "1";
      card.classList.add("visible");
      const counter = card.querySelector(".counter") as HTMLElement | null;
      if (counter) {
        const tid = setTimeout(() => animateCounter(counter, parseInt(counter.dataset.target || "0")), 200);
        timers.push(tid);
      }
      const ring = card.querySelector(".ring-fg") as SVGElement | null;
      const pct = parseInt(card.dataset.ringPct || "0") / 100;
      if (ring) {
        const tid = setTimeout(() => { (ring as unknown as HTMLElement).style.strokeDashoffset = String(CIRCUMFERENCE * (1 - pct)); }, 300);
        timers.push(tid);
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cards.forEach((card, i) => {
            const tid = setTimeout(() => animateCard(card), i * 120);
            timers.push(tid);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.15 });

    observer.observe(grid);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <linearGradient id="rg1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#94a3b8" }} />
            <stop offset="100%" style={{ stopColor: "#64748b" }} />
          </linearGradient>
          <linearGradient id="rg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#22d3ee" }} />
            <stop offset="100%" style={{ stopColor: "#60a5fa" }} />
          </linearGradient>
          <linearGradient id="rg3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#60a5fa" }} />
            <stop offset="100%" style={{ stopColor: "#a78bfa" }} />
          </linearGradient>
          <linearGradient id="rg4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#34d399" }} />
            <stop offset="100%" style={{ stopColor: "#22d3ee" }} />
          </linearGradient>
        </defs>
      </svg>

      <div className="packs-grid" ref={gridRef}>
        {packs.map((pack) => (
          <div
            className="pack-card"
            key={pack.tier}
            data-tier={pack.tier}
            data-credits={pack.credits}
            data-ring-pct={pack.ringPct}
          >
            <div className="ev-pattern">
              <div className="ev-chars" />
              <div className="ev-gradient" />
              <div className="ev-chars-hover" />
            </div>
            <div className="glow-border">
              <div className="glow-inactive" />
              <div className="glow-inner" />
            </div>
            {pack.badge && (
              <span className={`pack-badge ${pack.badgeClass || ""}`}>{pack.badge}</span>
            )}
            <div className="pack-name">{pack.name}</div>
            <div className="credit-ring">
              <svg viewBox="0 0 82 82">
                <circle className="ring-bg" cx="41" cy="41" r="35" />
                <circle className="ring-fg" cx="41" cy="41" r="35" />
              </svg>
              <div className="ring-number">
                <span className="ring-count counter" data-target={pack.credits}>0</span>
                <span className="ring-label">{t("creditsLabel")}</span>
              </div>
            </div>
            <div className="pack-price">
              <span className="currency">€</span>
              {pack.price}
              <span className="pack-price-ht">{t("exclTax")}</span>
            </div>
            <div className="pack-per-credit">{pack.perCredit} {t("exclTax")}</div>
            {pack.savings && <div className="pack-savings">{pack.savings}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
