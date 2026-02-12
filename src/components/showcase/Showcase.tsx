'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import './showcase.css';

const MAX_LOADED = 2;

export default function Showcase() {
  const t = useTranslations('Showcase');
  const locale = useLocale();
  const stepLabels = t.raw('stepLabels') as string[];
  const loadedQueueRef = useRef<HTMLElement[]>([]);
  const visibleSetRef = useRef<Set<HTMLElement>>(new Set());
  const unloadTimersRef = useRef<WeakMap<HTMLElement, ReturnType<typeof setTimeout>>>(new WeakMap());
  const loadTimersRef = useRef<WeakMap<HTMLElement, ReturnType<typeof setTimeout>>>(new WeakMap());
  const isLoadingRef = useRef(false);
  const pendingLoadsRef = useRef<HTMLElement[]>([]);

  const scaleIframes = useCallback(() => {
    document.querySelectorAll<HTMLIFrameElement>('.mockup-wrap iframe[src]').forEach((iframe) => {
      if (iframe.src === 'about:blank') return;
      const parent = iframe.parentElement;
      if (!parent) return;
      const scale = parent.clientWidth / 960;
      iframe.style.transform = `scale(${scale})`;
    });
  }, []);

  const evictOne = useCallback((): boolean => {
    const queue = loadedQueueRef.current;
    const visible = visibleSetRef.current;
    for (let i = 0; i < queue.length; i++) {
      if (!visible.has(queue[i])) {
        const evicted = queue.splice(i, 1)[0];
        const iframe = evicted.querySelector('iframe');
        if (iframe) {
          iframe.src = 'about:blank';
          iframe.style.transform = '';
        }
        const wrap = evicted.querySelector('.mockup-wrap') ?? evicted.closest('.mockup-wrap');
        if (wrap) wrap.classList.remove('loaded');
        return true;
      }
    }
    return false;
  }, []);

  const processLoadQueue = useCallback(() => {
    if (isLoadingRef.current) return;
    const el = pendingLoadsRef.current.shift();
    if (!el) return;

    const iframe = el.querySelector<HTMLIFrameElement>('iframe[data-src]');
    if (!iframe || (iframe.src && iframe.src !== 'about:blank')) {
      processLoadQueue();
      return;
    }

    const queue = loadedQueueRef.current;
    while (queue.length >= MAX_LOADED) {
      if (!evictOne()) break;
    }

    isLoadingRef.current = true;
    iframe.src = iframe.dataset.src!;
    iframe.addEventListener('load', () => {
      scaleIframes();
      const wrap = el.querySelector('.mockup-wrap') ?? el.closest('.mockup-wrap');
      if (wrap) wrap.classList.add('loaded');
      isLoadingRef.current = false;
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => processLoadQueue());
      } else {
        setTimeout(() => processLoadQueue(), 100);
      }
    }, { once: true });
    queue.push(el);
  }, [evictOne, scaleIframes]);

  const queueIframeLoad = useCallback((el: HTMLElement) => {
    const iframe = el.querySelector<HTMLIFrameElement>('iframe[data-src]');
    if (!iframe) return;
    if (iframe.src && iframe.src !== 'about:blank') return;
    if (pendingLoadsRef.current.includes(el)) return;

    pendingLoadsRef.current.push(el);
    processLoadQueue();
  }, [processLoadQueue]);

  useEffect(() => {
    const visible = visibleSetRef.current;
    const unloadTimers = unloadTimersRef.current;
    const loadTimers = loadTimersRef.current;
    const queue = loadedQueueRef.current;
    const pendingLoads = pendingLoadsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            visible.add(el);

            const ut = unloadTimers.get(el);
            if (ut) { clearTimeout(ut); unloadTimers.delete(el); }

            el.classList.add('visible');

            const iframe = el.querySelector<HTMLIFrameElement>('iframe[data-src]');
            if (iframe && (!iframe.src || iframe.src === 'about:blank')) {
              const lt = loadTimers.get(el);
              if (lt) clearTimeout(lt);
              loadTimers.set(el, setTimeout(() => {
                loadTimers.delete(el);
                queueIframeLoad(el);
              }, 500));
            }
          } else {
            visible.delete(el);

            const lt = loadTimers.get(el);
            if (lt) { clearTimeout(lt); loadTimers.delete(el); }

            // Remove from pending queue if not yet loading
            const pendingIdx = pendingLoads.indexOf(el);
            if (pendingIdx !== -1) pendingLoads.splice(pendingIdx, 1);

            const iframe = el.querySelector<HTMLIFrameElement>('iframe');
            if (iframe && iframe.src && iframe.src !== 'about:blank') {
              unloadTimers.set(el, setTimeout(() => {
                unloadTimers.delete(el);
                iframe.src = 'about:blank';
                iframe.style.transform = '';
                const idx = queue.indexOf(el);
                if (idx !== -1) queue.splice(idx, 1);
                const wrap = el.querySelector('.mockup-wrap') ?? el.closest('.mockup-wrap');
                if (wrap) wrap.classList.remove('loaded');
              }, 1500));
            }
          }
        });
      },
      { rootMargin: '300px 0px 100px 0px', threshold: 0 }
    );

    document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
      observer.observe(el);
    });

    window.addEventListener('resize', scaleIframes);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', scaleIframes);
    };
  }, [queueIframeLoad, scaleIframes]);

  return (
    <>
      {/* Hero: Workflow complet */}
      <section className="hero">
        <Image src="/icons/logo_small.png" alt="FitMyCV" width={360} height={106} className="hero-logo reveal" />
        <h1 className="hero-title reveal">{t('title')}</h1>
        <p className="hero-subtitle reveal">
          {t('subtitle')}
        </p>
        <div className="hero-mockup reveal">
          <div className="mockup-wrap">
            <iframe data-src={`/mockups/workflow-demo.html?lang=${locale}`} title={t('title')} />
          </div>
        </div>
      </section>

      <div className="divider"><hr /></div>

      {/* Steps: chaque étape individuelle */}
      <section className="steps-section">
        <div className="steps-header reveal">
          <h2 className="steps-title">{t('stepsTitle')}</h2>
          <p className="steps-subtitle">{t('stepsSubtitle')}</p>
        </div>

        <div className="steps-grid">
          {stepLabels.map((label, i) => (
            <div
              key={i}
              className="step-card reveal"
              data-delay={i % 2 === 0 ? '1' : '2'}
            >
              <div className="step-label">{label}</div>
              <div className="mockup-wrap">
                <iframe data-src={`/mockups/step${i + 1}.html?lang=${locale}`} title={`${label}`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="footer">{t('footer')}</div>
    </>
  );
}
