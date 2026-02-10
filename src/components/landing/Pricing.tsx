'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/* ── Data ── */

interface DockItemData {
  tooltip: string;
  type: 'img' | 'svg';
  src?: string;
  alt?: string;
}

const dockItems: DockItemData[] = [
  { tooltip: 'Génération IA · 3 Cr', type: 'img', src: '/icons/openai-symbol.svg', alt: 'Génération' },
  { tooltip: 'Optimisation · 2 Cr', type: 'img', src: '/icons/analyzer.svg', alt: 'Optimisation' },
  { tooltip: 'Import CV · 2 Cr', type: 'img', src: '/icons/import.svg', alt: 'Import' },
  { tooltip: 'Score · 1 Cr', type: 'svg', alt: 'Score' },
  { tooltip: 'Export PDF · 1 Cr', type: 'img', src: '/icons/export.svg', alt: 'Export' },
];

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

const packs: PackData[] = [
  { tier: 1, credits: 15, ringPct: 10, name: 'Starter', price: '4,99', perCredit: '0,33 €/crédit' },
  { tier: 2, credits: 50, ringPct: 33, name: 'Pro', badge: 'Le plus populaire', badgeClass: 'popular', price: '14,99', perCredit: '0,30 €/crédit', savings: '−10 %' },
  { tier: 3, credits: 100, ringPct: 67, name: 'Expert', price: '26,99', perCredit: '0,27 €/crédit', savings: '−20 %' },
  { tier: 4, credits: 150, ringPct: 100, name: 'Ultimate', badge: 'Meilleur rapport', badgeClass: 'best-value', price: '35,99', perCredit: '0,24 €/crédit', savings: '−30 %' },
];

const trustItems = [
  { icon: '🔒', text: 'Paiement sécurisé Stripe' },
  { icon: '♾️', text: 'Crédits permanents' },
  { icon: '🚫', text: 'Sans engagement' },
  { icon: '💳', text: 'Visa · MC · Apple Pay' },
];

/* ── Constants ── */
const CIRCUMFERENCE = 2 * Math.PI * 35; // ~220
const EV_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function randomString(len: number): string {
  let s = '';
  for (let i = 0; i < len; i++) s += EV_CHARS.charAt(Math.floor(Math.random() * EV_CHARS.length));
  return s;
}

/* ── Score SVG Icon ── */
function ScoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
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
  const sectionRef = useRef<HTMLElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const packsGridRef = useRef<HTMLDivElement>(null);
  const promoBtnRef = useRef<HTMLButtonElement>(null);
  const eaCounterRef = useRef<HTMLSpanElement>(null);

  const [copied, setCopied] = useState(false);
  const [eaRemaining, setEaRemaining] = useState<number | null>(null);
  const [eaMax, setEaMax] = useState<number | null>(null);

  /* ── Floating Dock (Aceternity spring physics) ── */
  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;
    const items = Array.from(dock.querySelectorAll('.dock-item')) as HTMLElement[];

    const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };
    const BASE = 36, MAX = 56, BASE_ICON = 18, MAX_ICON = 28;

    function lerp(dist: number, minD: number, maxD: number, minV: number, maxV: number): number {
      const t = Math.max(0, Math.min(1, (dist - minD) / (maxD - minD)));
      return minV + (maxV - minV) * t;
    }

    function getTargetSize(distance: number): number {
      const d = Math.abs(distance);
      if (d >= 150) return BASE;
      return lerp(d, 0, 150, MAX, BASE);
    }

    function getTargetIconSize(distance: number): number {
      const d = Math.abs(distance);
      if (d >= 150) return BASE_ICON;
      return lerp(d, 0, 150, MAX_ICON, BASE_ICON);
    }

    const state = items.map(() => ({
      size: BASE, sizeV: 0,
      iconSize: BASE_ICON, iconSizeV: 0,
      targetSize: BASE, targetIconSize: BASE_ICON,
    }));

    let animating = false;
    let rafId: number | null = null;

    function springStep(current: number, velocity: number, target: number, dt: number) {
      const { stiffness, damping, mass } = SPRING;
      const subDt = dt / 4;
      let pos = current, vel = velocity;
      for (let sub = 0; sub < 4; sub++) {
        const accel = (-stiffness * (pos - target) - damping * vel) / mass;
        vel += accel * subDt;
        pos += vel * subDt;
      }
      return { pos, vel };
    }

    function animate() {
      const dt = 1 / 60;
      let settled = true;

      items.forEach((item, i) => {
        const s = state[i];

        const sz = springStep(s.size, s.sizeV, s.targetSize, dt);
        s.size = Math.max(BASE, Math.min(MAX, sz.pos));
        s.sizeV = sz.vel;

        const ic = springStep(s.iconSize, s.iconSizeV, s.targetIconSize, dt);
        s.iconSize = Math.max(BASE_ICON, Math.min(MAX_ICON, ic.pos));
        s.iconSizeV = ic.vel;

        item.style.width = s.size + 'px';
        item.style.height = s.size + 'px';
        const inner = item.querySelector('.dock-item-inner') as HTMLElement | null;
        if (inner) {
          inner.style.width = s.iconSize + 'px';
          inner.style.height = s.iconSize + 'px';
        }

        if (Math.abs(s.size - s.targetSize) > 0.1 || Math.abs(s.sizeV) > 0.1 ||
            Math.abs(s.iconSize - s.targetIconSize) > 0.1 || Math.abs(s.iconSizeV) > 0.1) {
          settled = false;
        }
      });

      if (!settled) {
        rafId = requestAnimationFrame(animate);
      } else {
        animating = false;
      }
    }

    function startAnim() {
      if (!animating) {
        animating = true;
        rafId = requestAnimationFrame(animate);
      }
    }

    function updateFromX(pageX: number) {
      items.forEach((item, i) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const distance = pageX - centerX;

        state[i].targetSize = getTargetSize(distance);
        state[i].targetIconSize = getTargetIconSize(distance);

        if (Math.abs(distance) < 30) {
          item.classList.add('hovered');
        } else {
          item.classList.remove('hovered');
        }
      });
      startAnim();
    }

    function resetAll() {
      items.forEach((item, i) => {
        item.classList.remove('hovered');
        state[i].targetSize = BASE;
        state[i].targetIconSize = BASE_ICON;
      });
      startAnim();
    }

    const handleMouseMove = (e: MouseEvent) => updateFromX(e.pageX);
    const handleMouseLeave = () => resetAll();
    const handleTouchStart = (e: TouchEvent) => { updateFromX(e.touches[0].pageX); };
    const handleTouchMove = (e: TouchEvent) => { e.preventDefault(); updateFromX(e.touches[0].pageX); };
    const handleTouchEnd = () => { resetAll(); };

    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', handleMouseLeave);
    dock.addEventListener('touchstart', handleTouchStart, { passive: true });
    dock.addEventListener('touchmove', handleTouchMove, { passive: false });
    dock.addEventListener('touchend', handleTouchEnd);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      dock.removeEventListener('mousemove', handleMouseMove);
      dock.removeEventListener('mouseleave', handleMouseLeave);
      dock.removeEventListener('touchstart', handleTouchStart);
      dock.removeEventListener('touchmove', handleTouchMove);
      dock.removeEventListener('touchend', handleTouchEnd);
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

    // Hover class
    const hasHover = window.matchMedia('(hover: hover)').matches;
    const enterHandlers: Array<() => void> = [];
    const leaveHandlers: Array<() => void> = [];
    const clickHandlers: Array<(e: Event) => void> = [];

    if (hasHover) {
      cards.forEach((card, i) => {
        const enter = () => { card.classList.add('hovered'); };
        const leave = () => { card.classList.remove('hovered'); };
        enterHandlers[i] = enter;
        leaveHandlers[i] = leave;
        card.addEventListener('mouseenter', enter);
        card.addEventListener('mouseleave', leave);
      });
    } else {
      // Touch devices
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

      // Pre-select popular card on landscape touch
      if (window.innerWidth >= 768) {
        const popular = grid.querySelector('.pack-card[data-tier="2"]') as HTMLElement | null;
        if (popular) {
          popular.classList.add('hovered');
          const r = popular.getBoundingClientRect();
          popular.style.setProperty('--mx', Math.round(r.width / 2) + 'px');
          popular.style.setProperty('--my', Math.round(r.height / 2) + 'px');
          const str = randomString(3000);
          const ch = popular.querySelector('.ev-chars');
          const chH = popular.querySelector('.ev-chars-hover');
          if (ch) ch.textContent = str;
          if (chH) chH.textContent = str;
          const glow = popular.querySelector('.glow-border') as HTMLElement | null;
          if (glow) glow.style.setProperty('--active', '1');
        }
      }
    }

    return () => {
      grid.removeEventListener('mousemove', handleMouseMove);
      cards.forEach((card, i) => {
        if (enterHandlers[i]) card.removeEventListener('mouseenter', enterHandlers[i]);
        if (leaveHandlers[i]) card.removeEventListener('mouseleave', leaveHandlers[i]);
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
            <span className="title-highlight">Pas d&apos;abonnement.</span>
            <br />
            Payez ce que vous utilisez.
          </h2>
          <p className="section-subtitle">15 crédits offerts à l&apos;inscription.</p>
        </div>

        {/* Floating dock - credit costs */}
        <div className="floating-dock-wrapper">
          <div className="floating-dock" id="floatingDock" ref={dockRef}>
            {dockItems.map((item, i) => (
              <div className="dock-item" key={i}>
                <div className="dock-tooltip">{item.tooltip}</div>
                <div className="dock-item-inner">
                  {item.type === 'svg' ? (
                    <ScoreIcon />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={item.src}
                      alt={item.alt || ''}
                      style={{ filter: 'brightness(0) invert(1)', opacity: 0.85 }}
                    />
                  )}
                </div>
              </div>
            ))}
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
                    <span className="ring-label">crédits</span>
                  </div>
                </div>
                <div className="pack-divider" />
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
          <div className="launch-tag">Offre de lancement</div>
          <h2 className="launch-title">
            {'−'}30 % avec le code <span className="highlight">LAUNCH30</span>
          </h2>
          {eaRemaining !== null && eaMax !== null && (
            <p className="launch-sub">
              <span className="ea-num" ref={eaCounterRef}>{eaRemaining}</span>
              /{eaMax} places restantes
            </p>
          )}
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
                Commencer gratuitement <span className="cta-arrow">{'→'}</span>
              </button>
            </div>
          </div>
          <p className="launch-note">15 crédits offerts {'·'} Aucune carte bancaire requise</p>
        </div>
      </section>
    </>
  );
}
