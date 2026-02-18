'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';

const BASE_W = 960;
const BASE_H = 600;
const TOTAL_STEPS = 7;

export default function HowItWorks() {
  const t = useTranslations('HowItWorks');
  const locale = useLocale();
  const steps = t.raw('steps') as Array<{label: string; title: string; desc: string; time: string}>;
  const STEP_LABELS = steps.map(s => s.label);

  const [currentStep, setCurrentStep] = useState(1);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const mockupIframeRef = useRef<HTMLIFrameElement>(null);
  const mockupFrameRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const stepsTextRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  // Store currentStep in a ref so callbacks always see the latest value
  const currentStepRef = useRef(currentStep);
  currentStepRef.current = currentStep;

  const iframeLoadedRef = useRef(iframeLoaded);
  iframeLoadedRef.current = iframeLoaded;

  // Update iframe scale to fit container (height handled by CSS aspect-ratio)
  const updateScale = useCallback(() => {
    const frame = mockupFrameRef.current;
    const iframe = mockupIframeRef.current;
    if (!frame || !iframe) return;
    const scale = frame.offsetWidth / BASE_W;
    iframe.style.transform = `scale(${scale})`;
  }, []);

  // Switch to a given step
  const switchToStep = useCallback((n: number) => {
    if (n === currentStepRef.current && iframeLoadedRef.current) return;

    setCurrentStep(n);
    currentStepRef.current = n;
    setIframeLoaded(false);
    iframeLoadedRef.current = false;

    const frame = mockupFrameRef.current;
    const iframe = mockupIframeRef.current;
    if (frame) frame.classList.remove('loaded');
    if (iframe) iframe.src = `/mockups/step${n}.html?embed&lang=${locale}`;

    const progress = ((n - 1) / (TOTAL_STEPS - 1)) * 100;
    if (progressFillRef.current) {
      progressFillRef.current.style.height = `${progress}%`;
    }
  }, [locale]);

  // Handle iframe load event
  useEffect(() => {
    const iframe = mockupIframeRef.current;
    const frame = mockupFrameRef.current;
    if (!iframe) return;

    const onLoad = () => {
      setIframeLoaded(true);
      iframeLoadedRef.current = true;
      if (frame) frame.classList.add('loaded');
      updateScale();
    };

    iframe.addEventListener('load', onLoad);
    return () => iframe.removeEventListener('load', onLoad);
  }, [updateScale]);

  // IntersectionObserver for step cards (scroll-sync on desktop)
  useEffect(() => {
    const cards = stepsTextRef.current?.querySelectorAll<HTMLElement>('.step-card');
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const step = parseInt(
              (entry.target as HTMLElement).dataset.step || '0',
              10
            );
            if (step && step !== currentStepRef.current) {
              switchToStep(step);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0.5],
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [switchToStep]);

  // Resize listener
  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  // Mobile: horizontal scroll sync
  useEffect(() => {
    const stepsContainer = stepsTextRef.current;
    if (!stepsContainer) return;

    let scrollTimer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const cards =
          stepsContainer.querySelectorAll<HTMLElement>('.step-card');
        const containerRect = stepsContainer.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        let closest = 1;
        let closestDist = Infinity;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const dist = Math.abs(cardCenter - centerX);
          if (dist < closestDist) {
            closestDist = dist;
            closest = parseInt(card.dataset.step || '1', 10);
          }
        });

        if (closest !== currentStepRef.current) {
          switchToStep(closest);
        }
      }, 100);
    };

    stepsContainer.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(scrollTimer);
      stepsContainer.removeEventListener('scroll', onScroll);
    };
  }, [switchToStep]);

  // Swipe on mockup frame (mobile)
  useEffect(() => {
    const frame = mockupFrameRef.current;
    if (!frame) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx)) return;

      const nextStep =
        dx < 0
          ? Math.min(currentStepRef.current + 1, TOTAL_STEPS)
          : Math.max(currentStepRef.current - 1, 1);

      if (nextStep !== currentStepRef.current) {
        const card = stepsTextRef.current?.querySelector<HTMLElement>(
          `.step-card[data-step="${nextStep}"]`
        );
        if (card) {
          card.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
          });
        }
      }
    };

    frame.addEventListener('touchstart', onTouchStart, { passive: true });
    frame.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      frame.removeEventListener('touchstart', onTouchStart);
      frame.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // Pause/resume HIW iframe when section leaves/enters viewport
  useEffect(() => {
    const section = sectionRef.current;
    const iframe = mockupIframeRef.current;
    if (!section || !iframe) return;

    let paused = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          try {
            if (!entry.isIntersecting && !paused) {
              paused = true;
              iframe.contentWindow?.postMessage('pause-demo', '*');
              sparklesRef.current?.classList.add('paused');
            } else if (entry.isIntersecting && paused) {
              paused = false;
              iframe.contentWindow?.postMessage('resume-demo', '*');
              sparklesRef.current?.classList.remove('paused');
            }
          } catch {
            // cross-origin safety
          }
        });
      },
      { rootMargin: '100px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Sparkles particle generation
  useEffect(() => {
    const container = sparklesRef.current;
    if (!container) return;

    const density = window.innerWidth <= 1024 ? 400 : 1200;
    const minSize = 0.8;
    const maxSize = 2;
    const speed = 1;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < density; i++) {
      const dot = document.createElement('span');
      dot.className = 'sparkle-dot';
      const size = minSize + Math.random() * (maxSize - minSize);
      const dur = (Math.random() * 3 + speed).toFixed(2);
      const delay = (Math.random() * 4).toFixed(2);
      const peakOpacity = (0.1 + Math.random() * 0.9).toFixed(2);
      dot.style.cssText = `
        width: ${size}px; height: ${size}px;
        top: ${(Math.random() * 100).toFixed(1)}%;
        left: ${(Math.random() * 100).toFixed(1)}%;
        --dur: ${dur}s;
        --peak-opacity: ${peakOpacity};
        animation-delay: ${delay}s;
      `;
      fragment.appendChild(dot);
    }

    container.appendChild(fragment);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  // Initialize on mount
  useEffect(() => {
    switchToStep(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Click on step dot buttons
  const handleDotClick = useCallback(
    (step: number) => {
      switchToStep(step);
      const card = stepsTextRef.current?.querySelector<HTMLElement>(
        `.step-card[data-step="${step}"]`
      );
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    [switchToStep]
  );

  // Arrow navigation
  const handlePrev = useCallback(() => {
    if (currentStepRef.current > 1) {
      const card = stepsTextRef.current?.querySelector<HTMLElement>(
        `.step-card[data-step="${currentStepRef.current - 1}"]`
      );
      if (card) {
        card.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, []);

  const handleNext = useCallback(() => {
    if (currentStepRef.current < TOTAL_STEPS) {
      const card = stepsTextRef.current?.querySelector<HTMLElement>(
        `.step-card[data-step="${currentStepRef.current + 1}"]`
      );
      if (card) {
        card.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, []);

  return (
    <section className="how-it-works" id="howItWorks" ref={sectionRef}>
      <div className="section-header" id="sectionHeader">
        <p className="section-intro">
          {t('intro')}
        </p>
        <h2 className="section-title">
          {(t.raw('title') as string).split('\n').map((line: string, i: number) => (
            <span key={i}>{i > 0 && <br />}{line}</span>
          ))}
        </h2>
        <div className="sparkles-container">
          <div className="sparkle-line line-wide"></div>
          <div className="sparkle-line line-wide-sharp"></div>
          <div className="sparkle-line line-narrow"></div>
          <div className="sparkle-line line-narrow-sharp"></div>
          <div
            className="sparkles-particles"
            id="sparklesParticles"
            ref={sparklesRef}
          ></div>
          <div className="sparkles-mask"></div>
        </div>
        <p
          className="section-subtitle"
          style={{ marginTop: '-7rem', position: 'relative', zIndex: 1 }}
        >
          {t('subtitle')}
        </p>
      </div>

      <div className="scroll-layout">
        <div className="grid-bg"></div>
        <div className="grid-fade"></div>
        <div className="grid-vfade"></div>

        <div className="steps-text" id="stepsText" ref={stepsTextRef}>
          <div className="progress-track">
            <div
              className="progress-fill"
              id="progressFill"
              ref={progressFillRef}
            ></div>
          </div>

          <div className="phase-header">
            <div className="phase-number">{t('phase1')}</div>
          </div>

          <div
            className={`step-card${currentStep === 1 ? ' active' : ''}`}
            data-step="1"
          >
            <div className="step-dot"></div>
            <div className="step-number">{t('stepLabel')} 01</div>
            <h3 className="step-title">{steps[0].title}</h3>
            <p className="step-desc">
              {steps[0].desc}
            </p>
          </div>

          <div className="phase-header">
            <div className="phase-number">{t('phase2')}</div>
          </div>

          <div
            className={`step-card${currentStep === 2 ? ' active' : ''}`}
            data-step="2"
          >
            <div className="step-dot"></div>
            <div className="step-number">{t('stepLabel')} 02</div>
            <h3 className="step-title">{steps[1].title}</h3>
            <p className="step-desc">
              {steps[1].desc}
            </p>
            {steps[1].time && <span className="step-time">{'⚡'} {steps[1].time}</span>}
          </div>

          <div
            className={`step-card${currentStep === 3 ? ' active' : ''}`}
            data-step="3"
          >
            <div className="step-dot"></div>
            <div className="step-number">{t('stepLabel')} 03</div>
            <h3 className="step-title">{steps[2].title}</h3>
            <p className="step-desc">
              {steps[2].desc}
            </p>
            {steps[2].time && <span className="step-time">{'⚡'} {steps[2].time}</span>}
          </div>

          <div
            className={`step-card${currentStep === 4 ? ' active' : ''}`}
            data-step="4"
          >
            <div className="step-dot"></div>
            <div className="step-number">{t('stepLabel')} 04</div>
            <h3 className="step-title">{steps[3].title}</h3>
            <p className="step-desc">
              {steps[3].desc}
            </p>
            {steps[3].time && <span className="step-time">{'⚡'} {steps[3].time}</span>}
          </div>

          <div
            className={`step-card${currentStep === 5 ? ' active' : ''}`}
            data-step="5"
          >
            <div className="step-dot"></div>
            <div className="step-number">{t('stepLabel')} 05</div>
            <h3 className="step-title">{steps[4].title}</h3>
            <p className="step-desc">
              {steps[4].desc}
            </p>
            {steps[4].time && <span className="step-time">{'⚡'} {steps[4].time}</span>}
          </div>

          <div
            className={`step-card${currentStep === 6 ? ' active' : ''}`}
            data-step="6"
          >
            <div className="step-dot"></div>
            <div className="step-number">{t('stepLabel')} 06</div>
            <h3 className="step-title">{steps[5].title}</h3>
            <p className="step-desc">
              {steps[5].desc}
            </p>
            {steps[5].time && <span className="step-time">{'⚡'} {steps[5].time}</span>}
          </div>

          <div className="phase-header">
            <div className="phase-number">{t('phase3')}</div>
          </div>

          <div
            className={`step-card${currentStep === 7 ? ' active' : ''}`}
            data-step="7"
          >
            <div className="step-dot"></div>
            <div className="step-number">{t('stepLabel')} 07</div>
            <h3 className="step-title">{steps[6].title}</h3>
            <p className="step-desc">
              {steps[6].desc}
            </p>
            {steps[6].time && <span className="step-time">{'⚡'} {steps[6].time}</span>}
          </div>
        </div>

        <div className="hiw-mockup-sticky">
          <div className="hiw-mockup-container">
            <div className="mockup-label" id="hiwMockupLabel">
              <span className="label-step">{t('stepLabel')} {currentStep}</span> {'—'}{' '}
              {STEP_LABELS[currentStep - 1]}
            </div>
            <div className="step-dots" id="stepDots">
              <button
                className={`swipe-arrow swipe-prev${currentStep <= 1 ? ' hidden' : ''}`}
                id="swipePrev"
                aria-label={t('stepPrev')}
                onClick={handlePrev}
              >
                <span aria-hidden="true">{'<'}</span>
              </button>
              {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map(
                (step) => (
                  <button
                    key={step}
                    className={currentStep === step ? 'active' : undefined}
                    data-step={step}
                    aria-label={t('stepN', { step })}
                    onClick={() => handleDotClick(step)}
                  />
                )
              )}
              <button
                className={`swipe-arrow swipe-next${currentStep >= TOTAL_STEPS ? ' hidden' : ''}`}
                id="swipeNext"
                aria-label={t('stepNext')}
                onClick={handleNext}
              >
                <span aria-hidden="true">{'>'}</span>
              </button>
            </div>
            <div
              className="hiw-mockup-frame"
              id="hiwMockupFrame"
              ref={mockupFrameRef}
            >
              <iframe
                id="hiwMockupIframe"
                ref={mockupIframeRef}
                src={`/mockups/step1.html?embed&lang=${locale}`}
                title="FitMyCV step demo"
                width={960}
                height={600}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
