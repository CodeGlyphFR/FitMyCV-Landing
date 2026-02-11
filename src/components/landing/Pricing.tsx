'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';

/* ── Data ── */

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

/* ── Constants ── */
const CIRCUMFERENCE = 2 * Math.PI * 35; // ~220
const EV_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function randomString(len: number): string {
  let s = '';
  for (let i = 0; i < len; i++) s += EV_CHARS.charAt(Math.floor(Math.random() * EV_CHARS.length));
  return s;
}

/* ── Cost Calculator Logic ── */
const CREDITS_IMPORT = 2;     // import CV — once
const CREDITS_PER_OFFER = 7;  // per job offer: generate(3) + score(1) + optimize(2) + export(1)
const FREE_CREDITS = 15;
const LAUNCH_DISCOUNT = 0.70; // -30% first purchase

const CALC_PACKS = [
  { name: 'Starter', credits: 15, price: 499 },
  { name: 'Pro', credits: 50, price: 1499 },
  { name: 'Expert', credits: 100, price: 2699 },
  { name: 'Ultimate', credits: 150, price: 3599 },
];

function computeCost(n: number): { total: number; perOffer: number; packName: string; fullPrice: number } {
  if (n <= 0) return { total: 0, perOffer: 0, packName: '', fullPrice: 0 };

  const creditsNeeded = CREDITS_IMPORT + n * CREDITS_PER_OFFER;
  const packCreditsNeeded = Math.max(0, creditsNeeded - FREE_CREDITS);

  if (packCreditsNeeded === 0) {
    return { total: 0, perOffer: 0, packName: '', fullPrice: 0 };
  }

  const pack = CALC_PACKS.find(p => p.credits >= packCreditsNeeded) || CALC_PACKS[CALC_PACKS.length - 1];
  const fullPrice = pack.price / 100;
  const discounted = Math.round(pack.price * LAUNCH_DISCOUNT) / 100;
  const perOffer = (discounted / pack.credits) * CREDITS_PER_OFFER;

  return { total: discounted, perOffer, packName: pack.name, fullPrice };
}

function fmtPrice(v: number): string {
  return v.toFixed(2).replace('.', ',') + '\u00a0€';
}

/* ── Copy Icon ── */
function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

/* ── Check Icon ── */
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── Component ── */
export default function Pricing() {
  const t = useTranslations('Pricing');

  const packs: PackData[] = [
    { tier: 1, credits: 15, ringPct: 10, name: 'Starter', price: '4,99', perCredit: '0,33 €/crédit' },
    { tier: 2, credits: 50, ringPct: 33, name: 'Pro', badge: t('packBadgePopular'), badgeClass: 'popular', price: '14,99', perCredit: '0,30 €/crédit', savings: '−10 %' },
    { tier: 3, credits: 100, ringPct: 67, name: 'Expert', price: '26,99', perCredit: '0,27 €/crédit', savings: '−20 %' },
    { tier: 4, credits: 150, ringPct: 100, name: 'Ultimate', badge: t('packBadgeBestValue'), badgeClass: 'best-value', price: '35,99', perCredit: '0,24 €/crédit', savings: '−30 %' },
  ];

  const trustLabels = t.raw('trustItems') as string[];
  const trustItems = [
    { icon: '🔒', text: trustLabels[0] },
    { icon: '♾️', text: trustLabels[1] },
    { icon: '🚫', text: trustLabels[2] },
    { icon: '💳', text: trustLabels[3] },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const packsGridRef = useRef<HTMLDivElement>(null);
  const promoBtnRef = useRef<HTMLButtonElement>(null);
  const eaCounterRef = useRef<HTMLSpanElement>(null);

  const [copied, setCopied] = useState(false);
  const [eaRemaining, setEaRemaining] = useState<number | null>(null);
  const [eaMax, setEaMax] = useState<number | null>(null);
  const [applications, setApplications] = useState(5);
  const cost = useMemo(() => computeCost(applications), [applications]);
  const recommendedTier = useMemo(() => {
    if (!cost.packName) return null;
    return packs.find(p => p.name === cost.packName)?.tier ?? null;
  }, [cost.packName]);

  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const userTouchingCarouselRef = useRef(false);

  /* ── Sync active card: dimmed/recommended + hover effect ── */
  useEffect(() => {
    const grid = packsGridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.pack-card')) as HTMLElement[];

    function activateCard(card: HTMLElement) {
      card.classList.add('hovered');
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', Math.round(r.width / 2) + 'px');
      card.style.setProperty('--my', Math.round(r.height / 2) + 'px');
      const str = randomString(3000);
      const ch = card.querySelector('.ev-chars');
      const chH = card.querySelector('.ev-chars-hover');
      if (ch) ch.textContent = str;
      if (chH) chH.textContent = str;
      const glow = card.querySelector('.glow-border') as HTMLElement | null;
      if (glow) glow.style.setProperty('--active', '1');
    }

    function deactivateCard(card: HTMLElement) {
      card.classList.remove('hovered');
      const glow = card.querySelector('.glow-border') as HTMLElement | null;
      if (glow) glow.style.setProperty('--active', '0');
    }

    cards.forEach((card) => {
      const tier = parseInt(card.dataset.tier || '0');

      if (hoveredTier !== null) {
        // Hover mode: no dimming, only Evervault effect on hovered card
        card.classList.remove('dimmed', 'recommended');
        if (tier === hoveredTier) {
          activateCard(card);
        } else {
          deactivateCard(card);
        }
      } else {
        // Slider mode: recommended highlighted, others dimmed
        if (recommendedTier !== null && tier === recommendedTier) {
          card.classList.add('recommended');
          card.classList.remove('dimmed');
          activateCard(card);
        } else {
          card.classList.remove('recommended');
          card.classList.add('dimmed');
          deactivateCard(card);
        }
      }
    });

    // Mobile: scroll carousel to recommended card (only in slider mode)
    if (window.innerWidth < 768 && recommendedTier !== null && hoveredTier === null) {
      const target = grid.querySelector(`[data-tier="${recommendedTier}"]`) as HTMLElement | null;
      if (target) {
        const scrollLeft = target.offsetLeft - (grid.offsetWidth - target.offsetWidth) / 2;
        grid.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [hoveredTier, recommendedTier]);

  /* ── Mobile: manual scroll overrides slider mode ── */
  useEffect(() => {
    const grid = packsGridRef.current;
    if (!grid || window.innerWidth >= 768) return;

    const cards = Array.from(grid.querySelectorAll('.pack-card')) as HTMLElement[];
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;

    const handleTouchStart = () => {
      userTouchingCarouselRef.current = true;
      // Remove dimming instantly so user doesn't see a flash
      cards.forEach((card) => card.classList.remove('dimmed', 'recommended'));
    };

    const handleScroll = () => {
      if (!userTouchingCarouselRef.current) return;

      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const gridRect = grid.getBoundingClientRect();
        const centerX = gridRect.left + gridRect.width / 2;
        let closest = 0, closestDist = Infinity;
        cards.forEach((card, i) => {
          const r = card.getBoundingClientRect();
          const dist = Math.abs(r.left + r.width / 2 - centerX);
          if (dist < closestDist) { closestDist = dist; closest = i; }
        });
        const snappedTier = parseInt(cards[closest]?.dataset.tier || '0');
        setHoveredTier(snappedTier);
      }, 150);
    };

    grid.addEventListener('touchstart', handleTouchStart, { passive: true });
    grid.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      grid.removeEventListener('touchstart', handleTouchStart);
      grid.removeEventListener('scroll', handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  /* ── Evervault Card Effect ── */
  useEffect(() => {
    const grid = packsGridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.pack-card')) as HTMLElement[];

    // Fill initial random chars
    cards.forEach((card) => {
      const str = randomString(3000);
      const charsEl = card.querySelector('.ev-chars');
      const charsHoverEl = card.querySelector('.ev-chars-hover');
      if (charsEl) charsEl.textContent = str;
      if (charsHoverEl) charsHoverEl.textContent = str;
    });

    // Mouse move: update mask position + regenerate chars
    const handleMouseMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest('.pack-card') as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');

      const str = randomString(3000);
      const charsEl = card.querySelector('.ev-chars');
      const charsHoverEl = card.querySelector('.ev-chars-hover');
      if (charsEl) charsEl.textContent = str;
      if (charsHoverEl) charsHoverEl.textContent = str;
    };

    grid.addEventListener('mousemove', handleMouseMove);

    // Touch devices: tap to toggle hover
    const clickHandlers: Array<(e: Event) => void> = [];
    const isTouch = !window.matchMedia('(hover: hover)').matches;

    if (isTouch) {
      cards.forEach((card, i) => {
        const handler = () => {
          if (window.innerWidth < 768) return;
          const wasActive = card.classList.contains('hovered');
          cards.forEach((c) => {
            c.classList.remove('hovered');
            const glow = c.querySelector('.glow-border') as HTMLElement | null;
            if (glow) glow.style.setProperty('--active', '0');
          });
          if (!wasActive) {
            card.classList.add('hovered');
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', Math.round(r.width / 2) + 'px');
            card.style.setProperty('--my', Math.round(r.height / 2) + 'px');
            const str = randomString(3000);
            const ch = card.querySelector('.ev-chars');
            const chH = card.querySelector('.ev-chars-hover');
            if (ch) ch.textContent = str;
            if (chH) chH.textContent = str;
            const glow = card.querySelector('.glow-border') as HTMLElement | null;
            if (glow) glow.style.setProperty('--active', '1');
          }
        };
        clickHandlers[i] = handler;
        card.addEventListener('click', handler);
      });
    }

    return () => {
      grid.removeEventListener('mousemove', handleMouseMove);
      cards.forEach((card, i) => {
        if (clickHandlers[i]) card.removeEventListener('click', clickHandlers[i]);
      });
    };
  }, []);

  /* ── Glowing Border Effect ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const glowEls = Array.from(section.querySelectorAll('.glow-border')) as HTMLElement[];
    const isTouch = !window.matchMedia('(hover: hover)').matches;
    const isPortrait = window.innerWidth < 768;

    let rafId: number | null = null;
    let visible = true;
    let tickFn: (() => void) | null = null;

    const sectionObs = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (entry.isIntersecting && rafId === null && tickFn) {
        rafId = requestAnimationFrame(tickFn);
      }
    }, { threshold: 0 });
    sectionObs.observe(section);

    if (!isTouch) {
      // Desktop: follow mouse
      const LERP = 0.15;
      let mouseX = 0, mouseY = 0;
      const states = glowEls.map((el) => ({ el, angle: 0, active: false }));

      const handlePointerMove = (e: PointerEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      };
      document.body.addEventListener('pointermove', handlePointerMove, { passive: true });

      function tickDesktop() {
        if (!visible) { rafId = null; return; }
        for (let i = 0; i < states.length; i++) {
          const s = states[i];
          const card = s.el.parentElement;
          if (!card) continue;
          const rect = card.getBoundingClientRect();
          const inside = mouseX >= rect.left && mouseX <= rect.right &&
                         mouseY >= rect.top && mouseY <= rect.bottom;
          if (!inside) {
            if (s.active) { s.active = false; s.el.style.setProperty('--active', '0'); }
            continue;
          }
          if (!s.active) { s.active = true; s.el.style.setProperty('--active', '1'); }
          const cx = rect.left + rect.width * 0.5;
          const cy = rect.top + rect.height * 0.5;
          const target = (180 * Math.atan2(mouseY - cy, mouseX - cx)) / Math.PI + 90;
          const diff = ((target - s.angle + 180) % 360) - 180;
          s.angle += diff * LERP;
          s.el.style.setProperty('--start', String(s.angle));
        }
        rafId = requestAnimationFrame(tickDesktop);
      }
      tickFn = tickDesktop;
      rafId = requestAnimationFrame(tickDesktop);

      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        sectionObs.disconnect();
        document.body.removeEventListener('pointermove', handlePointerMove);
      };
    } else if (!isPortrait) {
      // Touch landscape: auto-rotate on selected card
      const SPEED_L = 1.5;
      const lStates = glowEls.map((el) => ({ el, angle: 0 }));

      function tickLandscape() {
        if (!visible) { rafId = null; return; }
        for (let i = 0; i < lStates.length; i++) {
          const s = lStates[i];
          const card = s.el.parentElement;
          if (card && card.classList.contains('hovered')) {
            s.angle += SPEED_L;
            s.el.style.setProperty('--start', String(s.angle));
          }
        }
        rafId = requestAnimationFrame(tickLandscape);
      }
      tickFn = tickLandscape;
      rafId = requestAnimationFrame(tickLandscape);

      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        sectionObs.disconnect();
      };
    } else {
      // Mobile: auto-rotate on snapped card
      const SPEED = 1.5;
      const mStates = glowEls.map((el) => ({ el, angle: 0 }));
      const grid = packsGridRef.current;
      const mobileCards = grid ? Array.from(grid.querySelectorAll('.pack-card')) as HTMLElement[] : [];
      let activeIndex = 0;

      function updateActiveGlow() {
        if (!grid || !mobileCards.length) return;
        const gridRect = grid.getBoundingClientRect();
        const centerX = gridRect.left + gridRect.width / 2;
        let closest = 0, closestDist = Infinity;
        mobileCards.forEach((card, i) => {
          const r = card.getBoundingClientRect();
          const dist = Math.abs(r.left + r.width / 2 - centerX);
          if (dist < closestDist) { closestDist = dist; closest = i; }
        });
        activeIndex = closest;
        mStates.forEach((s, i) => {
          s.el.style.setProperty('--active', i === activeIndex ? '1' : '0');
        });
        // Simulate hover on active card
        mobileCards.forEach((card, i) => {
          if (i === activeIndex) {
            card.classList.add('hovered');
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', Math.round(r.width / 2) + 'px');
            card.style.setProperty('--my', Math.round(r.height / 2) + 'px');
            const str = randomString(3000);
            const ch = card.querySelector('.ev-chars');
            const chH = card.querySelector('.ev-chars-hover');
            if (ch) ch.textContent = str;
            if (chH) chH.textContent = str;
          } else {
            card.classList.remove('hovered');
          }
        });
      }

      const handleScroll = () => updateActiveGlow();
      if (grid) {
        grid.addEventListener('scroll', handleScroll, { passive: true });
        setTimeout(updateActiveGlow, 750);
      }

      function tickMobile() {
        if (!visible) { rafId = null; return; }
        for (let i = 0; i < mStates.length; i++) {
          if (i !== activeIndex) continue;
          mStates[i].angle += SPEED;
          mStates[i].el.style.setProperty('--start', String(mStates[i].angle));
        }
        rafId = requestAnimationFrame(tickMobile);
      }
      tickFn = tickMobile;
      rafId = requestAnimationFrame(tickMobile);

      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        sectionObs.disconnect();
        if (grid) grid.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  /* ── Scroll Reveal + Counter + Ring Animation ── */
  useEffect(() => {
    const grid = packsGridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.pack-card')) as HTMLElement[];
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Hide cards for animation — only runs client-side, SSR keeps them visible
    cards.forEach((card) => card.classList.add('will-animate'));

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
      card.dataset.animated = '1';
      card.classList.add('visible');
      const counter = card.querySelector('.counter') as HTMLElement | null;
      if (counter) {
        const tid = setTimeout(() => animateCounter(counter, parseInt(counter.dataset.target || '0')), 200);
        timers.push(tid);
      }
      const ring = card.querySelector('.ring-fg') as SVGElement | null;
      const pct = parseInt(card.dataset.ringPct || '0') / 100;
      if (ring) {
        const tid = setTimeout(() => { (ring as unknown as HTMLElement).style.strokeDashoffset = String(CIRCUMFERENCE * (1 - pct)); }, 300);
        timers.push(tid);
      }
    }

    function resetCard(card: HTMLElement) {
      if (!card.dataset.animated) return;
      delete card.dataset.animated;
      const counter = card.querySelector('.counter') as HTMLElement | null;
      if (counter) counter.textContent = '0';
      const ring = card.querySelector('.ring-fg') as SVGElement | null;
      if (ring) (ring as unknown as HTMLElement).style.strokeDashoffset = String(CIRCUMFERENCE);
    }

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCard(entry.target as HTMLElement);
          } else {
            resetCard(entry.target as HTMLElement);
          }
        });
      }, { root: grid, threshold: 0.7 });

      cards.forEach((card) => {
        card.classList.add('visible');
        card.style.opacity = '1';
        card.style.transform = 'none';
        cardObserver.observe(card);
      });

      return () => {
        cardObserver.disconnect();
        timers.forEach(clearTimeout);
      };
    } else {
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
    }
  }, []);

  /* ── Promo Code Copy ── */
  const handlePromoCopy = useCallback(() => {
    navigator.clipboard.writeText('LAUNCH30').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  /* ── Launch Counter (Stripe API) ── */
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    function fetchPromoRemaining() {
      fetch('/api/promo-remaining')
        .then((r) => r.json())
        .then((data) => {
          if (data.remaining !== null && data.remaining !== undefined) {
            setEaRemaining(data.remaining);
          }
          if (data.max) {
            setEaMax(data.max);
          }
        })
        .catch(() => { /* keep fallback value */ });
    }

    fetchPromoRemaining();
    intervalId = setInterval(fetchPromoRemaining, 60000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  /* ── Mobile Carousel Dots ── */
  useEffect(() => {
    const grid = packsGridRef.current;
    if (!grid) return;
    const section = sectionRef.current;
    if (!section) return;

    const dots = Array.from(section.querySelectorAll('.carousel-dots .dot')) as HTMLElement[];
    if (!dots.length) return;

    // Scroll popular card into center on mobile
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;
    if (window.innerWidth < 768) {
      scrollTimer = setTimeout(() => {
        const popular = grid.querySelector('[data-tier="2"]') as HTMLElement | null;
        if (popular) {
          const cardLeft = popular.offsetLeft;
          const cardWidth = popular.offsetWidth;
          const gridWidth = grid.offsetWidth;
          grid.scrollLeft = cardLeft - (gridWidth - cardWidth) / 2;
        }
      }, 600);
    }

    const handleScroll = () => {
      const scrollLeft = grid.scrollLeft;
      const firstCard = grid.querySelector('.pack-card') as HTMLElement | null;
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth + 16;
      const index = Math.round(scrollLeft / cardWidth);
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
    };

    grid.addEventListener('scroll', handleScroll);

    return () => {
      grid.removeEventListener('scroll', handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <>
      {/* SVG gradients for ring gauges */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="rg1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#94a3b8' }} />
            <stop offset="100%" style={{ stopColor: '#64748b' }} />
          </linearGradient>
          <linearGradient id="rg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#22d3ee' }} />
            <stop offset="100%" style={{ stopColor: '#60a5fa' }} />
          </linearGradient>
          <linearGradient id="rg3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#60a5fa' }} />
            <stop offset="100%" style={{ stopColor: '#a78bfa' }} />
          </linearGradient>
          <linearGradient id="rg4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#34d399' }} />
            <stop offset="100%" style={{ stopColor: '#22d3ee' }} />
          </linearGradient>
        </defs>
      </svg>

      <section className="pricing-section" id="pricing" ref={sectionRef}>
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">
            {t.rich('title', {
              highlight: (chunks) => (<><span className="title-highlight">{chunks}</span><br /></>),
            })}
          </h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </div>

        {/* Cost Calculator */}
        <div className="cost-calc">
          <p className="cost-calc-q">{t('calcQuestion')}</p>
          <div className="cost-calc-slider">
            <input
              type="range"
              min={1}
              max={20}
              value={applications}
              onChange={(e) => {
                userTouchingCarouselRef.current = false;
                setHoveredTier(null);
                setApplications(parseInt(e.target.value));
              }}
              style={{ '--range-pct': `${((applications - 1) / 19) * 100}%` } as React.CSSProperties}
            />
            <span className="cost-calc-val">{applications}</span>
          </div>
          <div className="cost-calc-metrics">
            <div className="cost-calc-metric">
              <span className="label">{t('calcTotal')}<sup>1</sup></span>
              <span className="value green" key={`t-${applications}`}>
                {cost.total === 0 ? t('calcFree') : fmtPrice(cost.total)}
              </span>
            </div>
            <div className="cost-calc-metric">
              <span className="label">{t('calcPerOffer')}<sup>2</sup></span>
              <span className="value cyan" key={`p-${applications}`}>
                {cost.total === 0 ? t('calcFree') : fmtPrice(cost.perOffer)}
              </span>
            </div>
            <div className="cost-calc-metric">
              <span className="label">{t('calcCompetition')}</span>
              <span className="value red">{t('calcCompetitionValue')}<span className="approx">{t('calcPerMonth')}</span></span>
            </div>
          </div>
          <div className="cost-calc-notes">
            <p><sup>1</sup>{t('calcNote1')}</p>
            <p><sup>2</sup>{t('calcNote2')}</p>
          </div>
        </div>

        {/* Pack cards */}
        <div className="packs-grid-wrapper">
          <div className="packs-grid" id="packsGrid" ref={packsGridRef}>
            {packs.map((pack) => (
              <div
                className="pack-card"
                key={pack.tier}
                data-tier={pack.tier}
                data-credits={pack.credits}
                data-ring-pct={pack.ringPct}
                onMouseEnter={() => setHoveredTier(pack.tier)}
                onMouseLeave={() => setHoveredTier(null)}
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
                  <span className={`pack-badge ${pack.badgeClass || ''}`}>{pack.badge}</span>
                )}
                <div className="pack-name">{pack.name}</div>
                <div className="credit-ring">
                  <svg viewBox="0 0 82 82">
                    <circle className="ring-bg" cx="41" cy="41" r="35" />
                    <circle className="ring-fg" cx="41" cy="41" r="35" />
                  </svg>
                  <div className="ring-number">
                    <span className="ring-count counter" data-target={pack.credits}>0</span>
                    <span className="ring-label">{t('creditsLabel')}</span>
                  </div>
                </div>
                <div className="pack-price">
                  <span className="currency">€</span>
                  {pack.price}
                </div>
                <div className="pack-per-credit">{pack.perCredit}</div>
                {pack.savings && <div className="pack-savings">{pack.savings}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Carousel dots (mobile only) */}
        <div className="carousel-dots" id="carouselDots">
          {packs.map((_, i) => (
            <div className={`dot${i === 1 ? ' active' : ''}`} data-index={i} key={i} />
          ))}
        </div>

        {/* Trust strip */}
        <div className="trust-strip">
          {trustItems.map((item, i) => (
            <div className="trust-item" key={i}>
              <span className="t-icon">{item.icon}</span> {item.text}
            </div>
          ))}
        </div>

        {/* Launch offer */}
        <div className="launch-offer">
          <div className="launch-tag">{t('launchTag')}</div>
          <h2 className="launch-title">
            {t.rich('launchTitle', {
              highlight: (chunks) => <span className="highlight">{chunks}</span>,
            })}<sup className="launch-asterisk">*</sup>
          </h2>
          {eaRemaining !== null && eaMax !== null && (
            <p className="launch-sub">
              {t('launchRemaining', { remaining: eaRemaining, max: eaMax })}
            </p>
          )}
          <p className="launch-note launch-note-asterisk">{t('launchNoteAsterisk')}</p>
          <div className="launch-buttons">
            <button
              className={`promo-btn${copied ? ' copied' : ''}`}
              ref={promoBtnRef}
              onClick={handlePromoCopy}
            >
              <span className="promo-code">LAUNCH30</span>
              <span className="promo-copy">
                {copied ? <CheckIcon /> : <CopyIcon />}
              </span>
            </button>
            <div className="cta-wrapper">
              <div className="cta-gradient" />
              <div className="cta-noise" />
              <button className="cta-btn">
                {t('ctaBtn')} <span className="cta-arrow">{'→'}</span>
              </button>
            </div>
          </div>
          <p className="launch-note">{t('launchNote')}</p>
        </div>
      </section>
    </>
  );
}
