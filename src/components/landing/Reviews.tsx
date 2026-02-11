'use client';

import { useEffect, useRef } from 'react';

/* ── Pixel grid config ── */
const CONFIG = {
  gridCols: 48,
  gridRows: 20,
  maxElevation: 12,
  elevationSmoothing: 0.12,
  bgColor: { r: 10, g: 10, b: 26 },
  gapRatio: 0.1,
  darken: 0.15,
  borderOpacity: 0.06,
};

interface Pixel {
  row: number;
  col: number;
  r: number;
  g: number;
  b: number;
  currentElevation: number;
  targetElevation: number;
}

/* ── Star SVG path ── */
const STAR_PATH =
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

function StarIcon() {
  return (
    <svg className="star-icon" viewBox="0 0 24 24">
      <path className="star-fill" d={STAR_PATH} />
      <path className="star-stroke" d={STAR_PATH} />
    </svg>
  );
}

/* ── Component ── */
export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const starsRowRef = useRef<HTMLDivElement>(null);

  /* ── Pixel grid + glow border ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let pixels: Pixel[] = [];
    let fallbackTime = 0;
    let animId: number | null = null;
    let dpr = 1;

    function initPixels() {
      pixels = [];
      for (let row = 0; row < CONFIG.gridRows; row++) {
        for (let col = 0; col < CONFIG.gridCols; col++) {
          pixels.push({
            row,
            col,
            r: 0,
            g: 0,
            b: 0,
            currentElevation: 0,
            targetElevation: 0,
          });
        }
      }
    }

    function resizeCanvas() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      canvas!.style.width = rect.width + 'px';
      canvas!.style.height = rect.height + 'px';
    }

    function generateFallback(time: number) {
      const colors = [
        { r: 34, g: 211, b: 238 },
        { r: 52, g: 211, b: 153 },
        { r: 96, g: 165, b: 250 },
      ];
      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i],
          col = p.col,
          row = p.row;
        const wave1 = Math.sin(col * 0.15 + time * 0.8) * 0.5 + 0.5;
        const wave2 = Math.sin(row * 0.2 + time * 0.6 + 1.5) * 0.5 + 0.5;
        const wave3 =
          Math.sin((col + row) * 0.1 + time * 0.4) * 0.5 + 0.5;
        const combined = (wave1 + wave2 + wave3) / 3;
        const colorIdx = ((col * 0.08 + time * 0.3) % 3 + 3) % 3;
        const ci = Math.floor(colorIdx),
          cf = colorIdx - ci;
        const c1 = colors[ci % 3],
          c2 = colors[(ci + 1) % 3];
        const brightness = combined * 0.35 + 0.05;
        const df = 1 - CONFIG.darken;
        p.r = Math.round((c1.r * (1 - cf) + c2.r * cf) * brightness * df);
        p.g = Math.round((c1.g * (1 - cf) + c2.g * cf) * brightness * df);
        p.b = Math.round((c1.b * (1 - cf) + c2.b * cf) * brightness * df);
        const elevWave =
          Math.sin(col * 0.2 + time * 1.2) *
          Math.cos(row * 0.15 + time * 0.9);
        p.targetElevation =
          Math.max(0, elevWave) * CONFIG.maxElevation * 0.6;
      }
    }

    function render() {
      const w = canvas!.width,
        h = canvas!.height;
      const cellSize = h / CONFIG.gridRows;
      const gridW = cellSize * CONFIG.gridCols;
      const gridX0 = (w - gridW) / 2;
      const gap = cellSize * CONFIG.gapRatio;

      ctx!.fillStyle = `rgb(${CONFIG.bgColor.r},${CONFIG.bgColor.g},${CONFIG.bgColor.b})`;
      ctx!.fillRect(0, 0, w, h);

      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i];
        p.currentElevation +=
          (p.targetElevation - p.currentElevation) * CONFIG.elevationSmoothing;
        const elev = p.currentElevation;
        const x = gridX0 + p.col * cellSize,
          y = p.row * cellSize;
        const cw = cellSize - gap,
          ch = cellSize - gap;
        const offsetX = -elev * 1.0 * dpr,
          offsetY = -elev * 1.5 * dpr;

        if (p.r + p.g + p.b < 3 && elev < 0.3) continue;

        if (elev > 0.5) {
          ctx!.fillStyle = `rgba(0,0,0,${Math.min(0.4, elev * 0.03)})`;
          ctx!.fillRect(
            x + gap / 2 + elev * 1.2,
            y + gap / 2 + elev * 1.8,
            cw,
            ch
          );

          ctx!.fillStyle = `rgb(${Math.max(0, p.r - 60)},${Math.max(0, p.g - 60)},${Math.max(0, p.b - 60)})`;
          ctx!.beginPath();
          ctx!.moveTo(x + gap / 2 + cw + offsetX, y + gap / 2 + offsetY);
          ctx!.lineTo(x + gap / 2 + cw, y + gap / 2);
          ctx!.lineTo(x + gap / 2 + cw, y + gap / 2 + ch);
          ctx!.lineTo(
            x + gap / 2 + cw + offsetX,
            y + gap / 2 + ch + offsetY
          );
          ctx!.closePath();
          ctx!.fill();

          ctx!.fillStyle = `rgb(${Math.max(0, p.r - 40)},${Math.max(0, p.g - 40)},${Math.max(0, p.b - 40)})`;
          ctx!.beginPath();
          ctx!.moveTo(
            x + gap / 2 + offsetX,
            y + gap / 2 + ch + offsetY
          );
          ctx!.lineTo(x + gap / 2, y + gap / 2 + ch);
          ctx!.lineTo(x + gap / 2 + cw, y + gap / 2 + ch);
          ctx!.lineTo(
            x + gap / 2 + cw + offsetX,
            y + gap / 2 + ch + offsetY
          );
          ctx!.closePath();
          ctx!.fill();
        }

        const br = 1 + elev * 0.04;
        ctx!.fillStyle = `rgb(${Math.min(255, Math.round(p.r * br))},${Math.min(255, Math.round(p.g * br))},${Math.min(255, Math.round(p.b * br))})`;
        ctx!.fillRect(
          x + gap / 2 + offsetX,
          y + gap / 2 + offsetY,
          cw,
          ch
        );

        if (CONFIG.borderOpacity > 0) {
          ctx!.strokeStyle = `rgba(255,255,255,${Math.min(0.2, CONFIG.borderOpacity + elev * 0.006)})`;
          ctx!.lineWidth = 0.5 * dpr;
          ctx!.strokeRect(
            x + gap / 2 + offsetX,
            y + gap / 2 + offsetY,
            cw,
            ch
          );
        }
      }
    }

    function animate() {
      fallbackTime += 0.016;
      generateFallback(fallbackTime);
      render();
      animId = requestAnimationFrame(animate);
    }

    /* ── Glow border setup ── */
    const glowEl = glowRef.current;
    let glowAnimId: number | null = null;
    let angle = 0;

    function tickGlow() {
      angle += 1.6;
      glowEl!.style.setProperty('--start', String(angle));
      glowAnimId = requestAnimationFrame(tickGlow);
    }

    if (glowEl) {
      glowEl.style.setProperty('--active', '1');
    }

    // Intersection observer to start/stop canvas + glow
    let running = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !running) {
            running = true;
            animate();
            if (glowEl && glowAnimId === null) glowAnimId = requestAnimationFrame(tickGlow);
          } else if (!entry.isIntersecting && running) {
            running = false;
            if (animId) { cancelAnimationFrame(animId); animId = null; }
            if (glowAnimId) { cancelAnimationFrame(glowAnimId); glowAnimId = null; }
          }
        });
      },
      { threshold: 0.1 }
    );

    initPixels();
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    generateFallback(0);
    render();

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => {
      running = false;
      if (animId) cancelAnimationFrame(animId);
      if (glowAnimId) cancelAnimationFrame(glowAnimId);
      window.removeEventListener('resize', resizeCanvas);
      if (section) observer.unobserve(section);
      observer.disconnect();
    };
  }, []);

  /* ── Star fill animation ── */
  useEffect(() => {
    const starsRow = starsRowRef.current;
    const section = sectionRef.current;
    if (!starsRow || !section) return;

    const stars = starsRow.querySelectorAll<SVGSVGElement>('.star-icon');
    if (!stars.length) return;

    const FILL_DELAY = 350;
    const HOLD = 2000;
    const PAUSE = 1500;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;
    let visible = false;
    let looping = false;

    function resetAll() {
      stars.forEach((s) => s.classList.remove('filled', 'filling'));
    }

    function fillStars(i: number) {
      if (cancelled) return;
      if (i >= stars.length) {
        const tid = setTimeout(() => {
          if (cancelled) return;
          resetAll();
          const tid2 = setTimeout(() => {
            if (cancelled) return;
            if (!visible) { looping = false; return; }
            fillStars(0);
          }, PAUSE);
          timers.push(tid2);
        }, HOLD);
        timers.push(tid);
        return;
      }
      stars[i].classList.add('filling');
      const tid1 = setTimeout(() => {
        if (cancelled) return;
        stars[i].classList.remove('filling');
        stars[i].classList.add('filled');
      }, 150);
      timers.push(tid1);
      const tid2 = setTimeout(() => {
        if (!cancelled) fillStars(i + 1);
      }, FILL_DELAY);
      timers.push(tid2);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !looping && !cancelled) {
          looping = true;
          const tid = setTimeout(() => {
            if (!cancelled) fillStars(0);
          }, 600);
          timers.push(tid);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);

    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
      observer.disconnect();
    };
  }, []);

  return (
    <section className="reviews-section" id="reviews" ref={sectionRef}>
      <canvas className="pixel-grid-canvas" ref={canvasRef} />
      <div className="pixel-grid-vignette" />

      <div className="reviews-card">
        <div className="glow-border" ref={glowRef}>
          <div className="glow-inactive" />
          <div className="glow-inner" />
        </div>
        <div className="stars-row" ref={starsRowRef}>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </div>

        <h2 className="reviews-title">Le premier, ce sera le{'\u00a0'}vôtre</h2>

        <div className="trustpilot-badge">
          <span className="trustpilot-label">Bientôt sur</span>
          <div className="trustpilot-logo">
            <svg className="trustpilot-star" viewBox="0 0 24 24">
              <path
                fill="#00b67a"
                d="M12 0l3.708 7.514L24 8.718l-6 5.848L19.416 24 12 19.77 4.584 24 6 14.566 0 8.718l8.292-1.204z"
              />
            </svg>
            <span className="trustpilot-wordmark">Trustpilot</span>
          </div>
        </div>
      </div>

    </section>
  );
}
