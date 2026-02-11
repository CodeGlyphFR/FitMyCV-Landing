'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { faqItems as allFaqItems } from '@/data/faq';

const faqItems = allFaqItems.filter((f) => f.landing);

/* ── Neural network config ── */
const NN_LAYERS = [3, 6, 7, 2];
const X_PAD = 50;
const X_END = 370;
const Y_PAD = 30;
const Y_END = 290;
const LAYER_X = NN_LAYERS.map(
  (_, i) => X_PAD + i * ((X_END - X_PAD) / (NN_LAYERS.length - 1))
);

interface Neuron {
  x: number;
  y: number;
}

function buildNeuronsByLayer(): Neuron[][] {
  return NN_LAYERS.map((count, li) => {
    const gap = (Y_END - Y_PAD) / (count + 1);
    return Array.from({ length: count }, (_, ni) => ({
      x: LAYER_X[li],
      y: Y_PAD + gap * (ni + 1),
    }));
  });
}

const neuronsByLayer = buildNeuronsByLayer();

/* ── Helpers ── */
function pickRandom(max: number, n: number): number[] {
  const indices = Array.from({ length: max }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, Math.min(n, max));
}

/* ── Component ── */
export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const synapsesRef = useRef<SVGGElement>(null);
  const neuronsRef = useRef<SVGGElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleItemClick = useCallback(
    (index: number) => {
      setActiveIndex((prev) => (prev === index ? null : index));
    },
    []
  );

  /* ── Neural network animation ── */
  useEffect(() => {
    const synG = synapsesRef.current;
    const neuG = neuronsRef.current;
    if (!synG || !neuG) return;

    const svgNS = 'http://www.w3.org/2000/svg';

    // Clear any existing content
    synG.innerHTML = '';
    neuG.innerHTML = '';

    // Build synapse lines: fireLines[li][src][dst], backLines[li][src][dst]
    const fireLines: SVGLineElement[][][] = [];
    const backLines: SVGLineElement[][][] = [];

    for (let li = 0; li < NN_LAYERS.length - 1; li++) {
      const layerFire: SVGLineElement[][] = [];
      const layerBack: SVGLineElement[][] = [];
      for (let a = 0; a < NN_LAYERS[li]; a++) {
        const srcFire: SVGLineElement[] = [];
        const srcBack: SVGLineElement[] = [];
        for (let b = 0; b < NN_LAYERS[li + 1]; b++) {
          const src = neuronsByLayer[li][a];
          const dst = neuronsByLayer[li + 1][b];

          // Base synapse
          const base = document.createElementNS(svgNS, 'line');
          base.setAttribute('x1', String(src.x));
          base.setAttribute('y1', String(src.y));
          base.setAttribute('x2', String(dst.x));
          base.setAttribute('y2', String(dst.y));
          base.setAttribute('class', 'synapse');
          synG.appendChild(base);

          // Forward fire line
          const fire = document.createElementNS(svgNS, 'line');
          fire.setAttribute('x1', String(src.x));
          fire.setAttribute('y1', String(src.y));
          fire.setAttribute('x2', String(dst.x));
          fire.setAttribute('y2', String(dst.y));
          fire.setAttribute('class', 'synapse-fire');
          fire.setAttribute('filter', 'url(#nn-glow-line)');
          synG.appendChild(fire);
          srcFire.push(fire);

          // Backprop line
          const back = document.createElementNS(svgNS, 'line');
          back.setAttribute('x1', String(dst.x));
          back.setAttribute('y1', String(dst.y));
          back.setAttribute('x2', String(src.x));
          back.setAttribute('y2', String(src.y));
          back.setAttribute('class', 'synapse-backprop');
          back.setAttribute('filter', 'url(#nn-glow-line)');
          synG.appendChild(back);
          srcBack.push(back);
        }
        layerFire.push(srcFire);
        layerBack.push(srcBack);
      }
      fireLines.push(layerFire);
      backLines.push(layerBack);
    }

    // Draw neuron circles
    const neuronCores: SVGCircleElement[][] = [];
    neuronsByLayer.forEach((layerNeurons) => {
      const cores: SVGCircleElement[] = [];
      layerNeurons.forEach((n) => {
        const outer = document.createElementNS(svgNS, 'circle');
        outer.setAttribute('cx', String(n.x));
        outer.setAttribute('cy', String(n.y));
        outer.setAttribute('r', '8');
        outer.setAttribute('class', 'neuron');
        neuG.appendChild(outer);

        const core = document.createElementNS(svgNS, 'circle');
        core.setAttribute('cx', String(n.x));
        core.setAttribute('cy', String(n.y));
        core.setAttribute('r', '3');
        core.setAttribute('class', 'neuron-core');
        neuG.appendChild(core);
        cores.push(core);
      });
      neuronCores.push(cores);
    });

    function fireSynapse(line: SVGLineElement) {
      line.style.transition = 'none';
      line.style.opacity = '0';
      requestAnimationFrame(() => {
        line.style.transition = 'opacity 0.12s ease-in';
        line.style.opacity = '0.9';
        const tid = setTimeout(() => {
          line.style.transition = 'opacity 0.5s ease-out';
          line.style.opacity = '0';
        }, 120);
        timersRef.current.push(tid);
      });
    }

    function pulseNeuron(core: SVGCircleElement, color?: string) {
      core.style.transition = 'none';
      core.style.filter = 'url(#nn-glow) brightness(2)';
      core.style.r = '4.5';
      if (color) core.style.fill = color;
      requestAnimationFrame(() => {
        const tid = setTimeout(() => {
          core.style.transition =
            'filter 0.5s ease-out, r 0.5s ease-out, fill 0.5s ease-out';
          core.style.filter = 'url(#nn-glow)';
          core.style.r = '3';
          core.style.fill = '';
        }, 150);
        timersRef.current.push(tid);
      });
    }

    let cancelled = false;
    let visible = true;
    let cycling = false;

    function cycle() {
      if (cancelled || cycling) return;
      cycling = true;
      const LAYER_DELAY = 250;

      // Forward pass
      const inputCount = 1 + Math.floor(Math.random() * NN_LAYERS[0]);
      const inputNeurons = pickRandom(NN_LAYERS[0], inputCount);
      let activeNeurons = inputNeurons;
      inputNeurons.forEach((idx) => pulseNeuron(neuronCores[0][idx]));

      const path: number[][] = [inputNeurons.slice()];

      for (let li = 0; li < NN_LAYERS.length - 1; li++) {
        const currentActive = activeNeurons.slice();
        const nextCount =
          li === NN_LAYERS.length - 2
            ? 1
            : 2 + Math.floor(Math.random() * 2);
        const nextActive = pickRandom(NN_LAYERS[li + 1], nextCount);

        currentActive.forEach((srcIdx) => {
          nextActive.forEach((dstIdx, k) => {
            const tid = setTimeout(() => {
              if (!cancelled) fireSynapse(fireLines[li][srcIdx][dstIdx]);
            }, li * LAYER_DELAY + k * 30);
            timersRef.current.push(tid);
          });
        });

        nextActive.forEach((dstIdx, k) => {
          const tid = setTimeout(() => {
            if (!cancelled) pulseNeuron(neuronCores[li + 1][dstIdx]);
          }, (li + 1) * LAYER_DELAY + k * 30);
          timersRef.current.push(tid);
        });

        activeNeurons = nextActive;
        path.push(nextActive.slice());
      }

      // Backprop pass — starts immediately after output neuron fires, 2x faster
      const fwdDuration = (NN_LAYERS.length - 1) * LAYER_DELAY + 100;
      const BP_DELAY = 125;
      let bpActive = path[NN_LAYERS.length - 1].slice();

      bpActive.forEach((nIdx, k) => {
        const tid = setTimeout(() => {
          if (!cancelled)
            pulseNeuron(
              neuronCores[NN_LAYERS.length - 1][nIdx],
              '#ef4444'
            );
        }, fwdDuration + k * 30);
        timersRef.current.push(tid);
      });

      for (let li = NN_LAYERS.length - 2; li >= 0; li--) {
        const revStep = NN_LAYERS.length - 2 - li;
        const rightNeurons = bpActive.slice();
        const leftCount =
          li === 0
            ? 1 + Math.floor(Math.random() * NN_LAYERS[0])
            : 2 + Math.floor(Math.random() * 2);
        const leftNeurons = pickRandom(NN_LAYERS[li], leftCount);

        rightNeurons.forEach((rIdx) => {
          leftNeurons.forEach((lIdx, k) => {
            const tid = setTimeout(() => {
              if (!cancelled) fireSynapse(backLines[li][lIdx][rIdx]);
            }, fwdDuration + revStep * BP_DELAY + k * 30);
            timersRef.current.push(tid);
          });
        });

        leftNeurons.forEach((lIdx, k) => {
          const tid = setTimeout(() => {
            if (!cancelled) pulseNeuron(neuronCores[li][lIdx], '#ef4444');
          }, fwdDuration + (revStep + 1) * BP_DELAY + k * 30);
          timersRef.current.push(tid);
        });

        bpActive = leftNeurons;
      }

      const totalDuration =
        fwdDuration + (NN_LAYERS.length - 1) * BP_DELAY + 500;
      const tid = setTimeout(() => {
        cycling = false;
        if (!cancelled && visible) cycle();
      }, totalDuration + 400 + Math.random() * 600);
      timersRef.current.push(tid);
    }

    cycle();

    // Observe the neural network container (not the whole section)
    // so the NN stops when the SVG scrolls off-screen even if the
    // FAQ list below is still visible.
    const nnEl = synG.closest('.faq-neural') as HTMLElement | null;
    const sectionObs = nnEl ? new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (entry.isIntersecting && !cycling && !cancelled) {
        cycle();
      }
    }, { threshold: 0 }) : null;
    if (nnEl) sectionObs!.observe(nnEl);

    return () => {
      cancelled = true;
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
      sectionObs?.disconnect();
    };
  }, []);

  return (
    <section className="faq-section" id="faq" ref={sectionRef}>
      <div className="faq-grid">
        <div className="faq-left">
          <h2 className="faq-title">
            Questions
            <br />
            fréquentes
          </h2>
          <div className="faq-neural">
            <svg viewBox="0 0 420 320" id="nn-svg">
              <defs>
                <linearGradient
                  id="nn-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="40%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
                <linearGradient
                  id="nn-gradient-red"
                  x1="100%"
                  y1="0%"
                  x2="0%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
                <filter id="nn-glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="nn-glow-line">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g ref={synapsesRef} id="nn-synapses" />
              <g ref={neuronsRef} id="nn-neurons" />
            </svg>
          </div>
        </div>
        <div className="faq-list">
          {faqItems.map((item, i) => (
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
      </div>
    </section>
  );
}
