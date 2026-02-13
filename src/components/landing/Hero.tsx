'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';

const BASE_W = 960;
const BASE_H = 600;
const MAX_TILT = 20;
const VISIBLE_RATIO = 0.33;

export default function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const PHRASES = t.raw('phrases') as string[];
  const phrasesRef = useRef(PHRASES);
  phrasesRef.current = PHRASES;

  const sectionRef = useRef<HTMLElement>(null);
  const heroStickyRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const mockupWrapperRef = useRef<HTMLDivElement>(null);
  const mockupFrameRef = useRef<HTMLDivElement>(null);
  const mockupIframeRef = useRef<HTMLIFrameElement>(null);
  const mockupGlowRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);

  const rafIdRef = useRef(0);
  const introStartRef = useRef(0);
  const demoStartedRef = useRef(false);
  const demoPausedRef = useRef(false);
  const cancelledRef = useRef(false);
  const visibleRef = useRef(true);

  const updateScale = useCallback(() => {
    const mockupFrame = mockupFrameRef.current;
    const mockupIframe = mockupIframeRef.current;
    if (!mockupFrame || !mockupIframe) return { scale: 1, scaledH: BASE_H };

    const containerW = mockupFrame.offsetWidth;
    const scale = containerW / BASE_W;
    const scaledH = BASE_H * scale;
    mockupFrame.style.height = `${scaledH}px`;
    mockupIframe.style.transform = `scale(${scale})`;
    return { scale, scaledH };
  }, []);

  const update = useCallback(() => {
    rafIdRef.current = 0;

    const section = sectionRef.current;
    const heroSticky = heroStickyRef.current;
    const heroContent = heroContentRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const mockupWrapper = mockupWrapperRef.current;
    const mockupFrame = mockupFrameRef.current;
    const mockupIframe = mockupIframeRef.current;
    const mockupGlow = mockupGlowRef.current;
    const heroVideo = videoRef.current;
    const overlay = overlayRef.current;

    if (
      !section || !heroSticky || !heroContent || !scrollIndicator ||
      !mockupWrapper || !mockupFrame || !mockupIframe || !mockupGlow ||
      !heroVideo || !overlay
    ) return;

    const { scaledH } = updateScale();
    const rect = section.getBoundingClientRect();
    const sectionHeight = rect.height - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));
    const vh = window.innerHeight;
    const mockupHeight = scaledH;

    const startY = vh - (mockupHeight * VISIBLE_RATIO);
    const endY = (vh - mockupHeight) / 2;
    const easedPos = 1 - Math.pow(1 - progress, 3);
    const currentY = startY + (endY - startY) * easedPos;

    mockupWrapper.style.top = `${currentY}px`;
    mockupWrapper.style.left = '50%';
    mockupWrapper.style.transform = 'translateX(-50%)';

    const easedTilt = 1 - Math.pow(1 - progress, 3);
    const currentTilt = MAX_TILT * (1 - easedTilt);
    mockupFrame.style.transform = `rotateX(${currentTilt}deg)`;

    const discoverBottom = vh - currentY + 16;
    scrollIndicator.style.bottom = `${discoverBottom}px`;

    let titleY = currentY * 0.55;

    // Lire les hauteurs pour l'anti-chevauchement
    const contentH = heroContent.offsetHeight;
    const indicatorH = scrollIndicator.offsetHeight;

    // Anti-chevauchement : clamper hero-content au-dessus du scroll-indicator
    if (contentH > 0) {
      const OVERLAP_PADDING = 24;
      const contentBottom = titleY + contentH * 0.55;
      const indicatorTop = vh - discoverBottom - indicatorH;

      if (contentBottom + OVERLAP_PADDING > indicatorTop) {
        titleY = indicatorTop - OVERLAP_PADDING - contentH * 0.55;
      }
    }

    // Intro animation (fade-in + slide-up over 1.5s, driven by JS)
    const now = performance.now();
    if (!introStartRef.current) introStartRef.current = now;
    const introT = Math.min(1, (now - introStartRef.current) / 2500);
    const introEase = 1 - Math.pow(1 - introT, 3); // ease-out cubic
    const introOffsetY = (1 - introEase) * 30;

    heroContent.style.top = `${titleY}px`;
    heroContent.style.transform = `translate(-50%, -45%) translateY(${introOffsetY}px)`;

    const fadeOut = Math.max(0, 1 - progress * 2.5);
    heroContent.style.opacity = String(fadeOut * introEase);

    // Continue RAF loop during intro
    if (introT < 1 && !rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(update);
    }
    scrollIndicator.style.opacity = String(fadeOut);

    heroVideo.style.transform = `translateY(${-progress * vh * 0.4}px)`;
    if (progress > 0.01) {
      heroVideo.style.opacity = String(Math.max(0, 0.35 - (progress * 0.5)));
    } else {
      heroVideo.style.removeProperty('opacity');
    }

    overlay.style.transform = `translateY(${-progress * vh * 0.4}px)`;
    overlay.style.background = `linear-gradient(to bottom,
      rgba(10,10,26,${0.6 + progress * 0.4}) 0%,
      transparent 12%,
      transparent ${60 - progress * 20}%,
      rgba(10,10,26,${0.7 + progress * 0.3}) ${75 - progress * 10}%,
      #0a0a1a ${90 - progress * 10}%)`;

    const glowY = currentY + mockupHeight + 5;
    mockupGlow.style.top = `${glowY}px`;
    mockupGlow.style.opacity = String(Math.max(0, (progress - 0.6) / 0.4));

    const finalStickyH = endY + mockupHeight + 90;
    heroSticky.style.height = `${vh + (finalStickyH - vh) * easedPos}px`;

    if (progress > 0.1 && !demoStartedRef.current) {
      demoStartedRef.current = true;
      demoPausedRef.current = false;
      mockupIframe.contentWindow?.postMessage('start-demo', '*');
    }

    if (demoStartedRef.current) {
      const mockupVisible = currentY < vh && currentY + mockupHeight > 0 && progress > 0.3;
      if (!mockupVisible && !demoPausedRef.current) {
        demoPausedRef.current = true;
        mockupIframe.contentWindow?.postMessage('pause-demo', '*');
      } else if (mockupVisible && demoPausedRef.current) {
        demoPausedRef.current = false;
        mockupIframe.contentWindow?.postMessage('resume-demo', '*');
      }
    }
  }, [updateScale]);

  const scheduleUpdate = useCallback(() => {
    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(update);
    }
  }, [update]);

  // Video setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.loop = false;
  }, []);

  // Scroll-synced animation: RAF loop on scroll/resize
  useEffect(() => {
    scheduleUpdate();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
    };
  }, [scheduleUpdate]);

  // Section visibility for typewriter pause
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Typewriter effect
  useEffect(() => {
    cancelledRef.current = false;

    const wait = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        const id = setTimeout(() => {
          if (cancelledRef.current) reject(new Error('cancelled'));
          else resolve();
        }, ms);
        // Allow cleanup to reject early
        if (cancelledRef.current) {
          clearTimeout(id);
          reject(new Error('cancelled'));
        }
      });

    async function waitVisible() {
      while (!visibleRef.current && !cancelledRef.current) {
        await new Promise<void>((r) => setTimeout(r, 500));
      }
      if (cancelledRef.current) throw new Error('cancelled');
    }

    async function typewrite() {
      const el = subtitleRef.current;
      if (!el) return;

      try {
        while (!cancelledRef.current) {
          for (const phrase of phrasesRef.current) {
            if (cancelledRef.current) return;
            await waitVisible();
            // Type in character by character
            for (let i = 0; i <= phrase.length; i++) {
              if (cancelledRef.current) return;
              el.textContent = phrase.slice(0, i);
              await wait(40);
            }
            await wait(1000);
            await waitVisible();
            // Erase word by word
            const words = phrase.split(' ');
            while (words.length > 0) {
              if (cancelledRef.current) return;
              words.pop();
              el.textContent = words.join(' ');
              await wait(80);
            }
            await wait(400);
          }
        }
      } catch {
        // Cancelled — exit gracefully
      }
    }

    const timerId = setTimeout(typewrite, 1500);

    return () => {
      cancelledRef.current = true;
      clearTimeout(timerId);
    };
  }, []);

  return (
    <section className="hero-section" ref={sectionRef}>
      <div className="hero-sticky" ref={heroStickyRef}>

        <video
          className="hero-video"
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster="/hero-poster.webp"
          ref={videoRef}
        >
          <source src="/background_video.webm" type="video/webm" />
        </video>
        <div className="hero-overlay" ref={overlayRef} />

        <div className="hero-content" ref={heroContentRef}>
          <h1 className="hero-title">{t('title')}</h1>
          <p className="hero-subtitle" aria-hidden="true">
            <span ref={subtitleRef} />
            <span className="cursor" />
          </p>
          <p className="sr-only">
            {PHRASES.join(' — ')}
          </p>
          <div className="hero-cta-wrapper">
            <div className="hero-cta-gradient" />
            <div className="hero-cta-noise" />
            <a href="https://app.fitmycv.io" className="hero-cta">
              {t('cta')} <span className="cta-arrow">{'→'}</span>
            </a>
          </div>
        </div>

        <div className="scroll-indicator" ref={scrollIndicatorRef}>
          <span>{t('scrollMore')}</span>
          <div className="scroll-chevron" />
        </div>

        <div className="hero-mockup-wrapper" ref={mockupWrapperRef}>
          <div className="hero-mockup-frame" ref={mockupFrameRef}>
            <iframe
              ref={mockupIframeRef}
              src={`/mockups/workflow-demo.html?embed&lang=${locale}`}
              style={{
                width: '960px',
                height: '600px',
                border: 'none',
                transformOrigin: 'top left',
              }}
            />
          </div>
        </div>
        <div className="hero-mockup-glow" ref={mockupGlowRef} />

      </div>
    </section>
  );
}
