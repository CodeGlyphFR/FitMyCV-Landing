'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';

/* ── Flag data URIs ── */
const FLAG_FR =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cdefs%3E%3CclipPath%20id%3D%22cFR%22%3E%3Ccircle%20cx%3D%22256%22%20cy%3D%22256%22%20r%3D%22256%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg%20clip-path%3D%22url(%23cFR)%22%3E%3Crect%20width%3D%22172%22%20height%3D%22512%22%20fill%3D%22%23002395%22%2F%3E%3Crect%20x%3D%22170%22%20width%3D%22172%22%20height%3D%22512%22%20fill%3D%22%23fff%22%2F%3E%3Crect%20x%3D%22340%22%20width%3D%22172%22%20height%3D%22512%22%20fill%3D%22%23ED2939%22%2F%3E%3C%2Fg%3E%3Ccircle%20cx%3D%22256%22%20cy%3D%22256%22%20r%3D%22253%22%20fill%3D%22none%22%20stroke%3D%22%2300000022%22%20stroke-width%3D%226%22%2F%3E%3C%2Fsvg%3E";

const FLAG_GB =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cdefs%3E%3CclipPath%20id%3D%22cGB%22%3E%3Ccircle%20cx%3D%22256%22%20cy%3D%22256%22%20r%3D%22256%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg%20clip-path%3D%22url(%23cGB)%22%3E%3Crect%20width%3D%22512%22%20height%3D%22512%22%20fill%3D%22%23012169%22%2F%3E%3Cpath%20d%3D%22M0%2C0L512%2C512M512%2C0L0%2C512%22%20stroke%3D%22%23fff%22%20stroke-width%3D%2260%22%2F%3E%3Cpath%20d%3D%22M0%2C0L512%2C512M512%2C0L0%2C512%22%20stroke%3D%22%23C8102E%22%20stroke-width%3D%2240%22%2F%3E%3Cpath%20d%3D%22M256%2C0v512M0%2C256h512%22%20stroke%3D%22%23fff%22%20stroke-width%3D%22100%22%2F%3E%3Cpath%20d%3D%22M256%2C0v512M0%2C256h512%22%20stroke%3D%22%23C8102E%22%20stroke-width%3D%2260%22%2F%3E%3C%2Fg%3E%3Ccircle%20cx%3D%22256%22%20cy%3D%22256%22%20r%3D%22253%22%20fill%3D%22none%22%20stroke%3D%22%2300000022%22%20stroke-width%3D%226%22%2F%3E%3C%2Fsvg%3E";

const FLAG_DE =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cdefs%3E%3CclipPath%20id%3D%22circleClip%22%3E%3Ccircle%20cx%3D%22256%22%20cy%3D%22256%22%20r%3D%22256%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg%20clip-path%3D%22url%28%23circleClip%29%22%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22512%22%20height%3D%22172%22%20fill%3D%22%23000000%22%2F%3E%3Crect%20x%3D%220%22%20y%3D%22170%22%20width%3D%22512%22%20height%3D%22172%22%20fill%3D%22%23DD0000%22%2F%3E%3Crect%20x%3D%220%22%20y%3D%22340%22%20width%3D%22512%22%20height%3D%22172%22%20fill%3D%22%23FFCC00%22%2F%3E%3C%2Fg%3E%3Ccircle%20cx%3D%22256%22%20cy%3D%22256%22%20r%3D%22253%22%20fill%3D%22none%22%20stroke%3D%22%2300000022%22%20stroke-width%3D%226%22%2F%3E%3C%2Fsvg%3E";

const FLAG_ES =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cdefs%3E%3CclipPath%20id%3D%22circleClip%22%3E%3Ccircle%20cx%3D%22256%22%20cy%3D%22256%22%20r%3D%22256%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg%20clip-path%3D%22url%28%23circleClip%29%22%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22512%22%20height%3D%22130%22%20fill%3D%22%23AA151B%22%2F%3E%3Crect%20x%3D%220%22%20y%3D%22128%22%20width%3D%22512%22%20height%3D%22256%22%20fill%3D%22%23F1BF00%22%2F%3E%3Crect%20x%3D%220%22%20y%3D%22382%22%20width%3D%22512%22%20height%3D%22130%22%20fill%3D%22%23AA151B%22%2F%3E%3C%2Fg%3E%3Ccircle%20cx%3D%22256%22%20cy%3D%22256%22%20r%3D%22253%22%20fill%3D%22none%22%20stroke%3D%22%2300000022%22%20stroke-width%3D%226%22%2F%3E%3C%2Fsvg%3E";

/* Card-1 flag (same as FR but uses clipPath id "c" not "cFR") */
const FLAG_FR_CARD1 =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cdefs%3E%3CclipPath%20id%3D%22c%22%3E%3Ccircle%20cx%3D%22256%22%20cy%3D%22256%22%20r%3D%22256%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg%20clip-path%3D%22url(%23c)%22%3E%3Crect%20width%3D%22172%22%20height%3D%22512%22%20fill%3D%22%23002395%22%2F%3E%3Crect%20x%3D%22170%22%20width%3D%22172%22%20height%3D%22512%22%20fill%3D%22%23fff%22%2F%3E%3Crect%20x%3D%22340%22%20width%3D%22172%22%20height%3D%22512%22%20fill%3D%22%23ED2939%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E";

export default function Features() {
  const t = useTranslations("Features");
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Translated arrays & labels used inside useEffect ── */
  const atsOriginals = t.raw("card5Originals") as string[];
  const atsRewrites = t.raw("card5Rewrites") as string[];
  const taskSteps = t.raw("card15TaskSteps") as string[];
  const langLabels = t.raw("card13LangLabels") as string[];
  const taskDoneLabel = t("card15Done");
  const taskWaitingLabel = t("card15Waiting");

  /* ── Shared wait helper (returns a promise that the cleanup can reject) ── */
  const makeWait = useCallback(() => {
    let cancelled = false;
    let lastTimeout: ReturnType<typeof setTimeout>;
    const cancel = () => { cancelled = true; if (lastTimeout) clearTimeout(lastTimeout); };
    const wait = (ms: number): Promise<void> =>
      new Promise((resolve, reject) => {
        if (cancelled) { reject(new Error('cancelled')); return; }
        const id = setTimeout(() => {
          if (cancelled) reject(new Error('cancelled'));
          else resolve();
        }, ms);
        lastTimeout = id;
      });
    return { wait, cancel };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* ── Collect all cancellers so cleanup can stop every animation ── */
    const cancellers: Array<() => void> = [];
    let featRafId = 0;
    let featPageVisible = true;
    let featResizeTimer: ReturnType<typeof setTimeout>;
    let featSectionVisible = true;
    const stalledCycles: Array<() => void> = [];
    function scheduleCycle(fn: () => void, delay: number) {
      if (featSectionVisible) {
        setTimeout(fn, delay);
      } else {
        stalledCycles.push(fn);
      }
    }

    /* ======================================================================
       MARQUEE: duplicate cards & physics loop
       ====================================================================== */
    const rows = section.querySelectorAll<HTMLElement>('.marquee-row');
    const rowArr = [...rows];
    const DUR: Record<string, number> = {
      'scroll-left': 50,
      'scroll-right': 55,
      'scroll-left-slow': 60,
    };
    let activeRow: HTMLElement | null = null;

    // Attach custom props via a typed map to avoid TS complaints
    type RowMeta = {
      _copies: number;
      _ac: string;
      _dur: number;
      _dir: number;
      _hw: number;
      _cx: number;
      _paused: boolean;
      _hovered: boolean;
      _vel: number;
      _hasMomentum: boolean;
      _autoSpeed: number;
      _t0: number;
      _hoverTimer: ReturnType<typeof setTimeout> | null;
    };
    const meta = new Map<HTMLElement, RowMeta>();

    rows.forEach((row) => {
      const originals = [...row.children] as HTMLElement[];
      const setWidth =
        originals.reduce((s, c) => s + c.offsetWidth, 0) +
        (originals.length - 1) * (parseFloat(getComputedStyle(row).gap) || 16);
      const copies = Math.max(1, Math.ceil(window.innerWidth / setWidth));
      for (let i = 0; i < copies; i++) {
        originals.forEach((c) => row.appendChild(c.cloneNode(true)));
      }
      const ac = [...row.classList].find((c) => c.startsWith('scroll-')) || 'scroll-left';
      meta.set(row, {
        _copies: copies,
        _ac: ac,
        _dur: 0,
        _dir: 0,
        _hw: 0,
        _cx: 0,
        _paused: false,
        _hovered: false,
        _vel: 0,
        _hasMomentum: false,
        _autoSpeed: 0,
        _t0: 0,
        _hoverTimer: null,
      });
    });

    /* ── Mouse gradient on cards ── */
    const grid = section.querySelector<HTMLElement>('.marquee-grid');
    const onGridMouseMove = (e: MouseEvent) => {
      const c = (e.target as HTMLElement).closest<HTMLElement>('.f-card');
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      c.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    };
    grid?.addEventListener('mousemove', onGridMouseMove);

    /* ── Stride helpers ── */
    function getStride(row: HTMLElement): number {
      const m = meta.get(row)!;
      const totalSets = (m._copies || 1) + 1;
      const gap = parseFloat(getComputedStyle(row).gap) || 16;
      return row.scrollWidth / totalSets + gap / totalSets;
    }

    function wrap(row: HTMLElement) {
      const m = meta.get(row)!;
      if (m._cx <= -m._hw) m._cx += m._hw;
      if (m._cx >= 0) m._cx -= m._hw;
    }

    function applyX(row: HTMLElement) {
      const m = meta.get(row)!;
      row.style.transform = 'translateX(' + m._cx + 'px)';
    }

    /* ── Init each row ── */
    rows.forEach((row) => {
      const m = meta.get(row)!;
      const ac = m._ac;
      const dur = DUR[ac] || 40;
      const dir = ac === 'scroll-right' ? 1 : -1;

      m._dur = dur;
      m._dir = dir;
      m._hw = getStride(row);
      m._cx = ac === 'scroll-right' ? -m._hw : 0;
      m._paused = false;
      m._hovered = false;
      m._vel = 0;
      m._hasMomentum = false;
      m._autoSpeed = m._hw / (dur * 60) * dir;

      row.classList.remove(ac);
      row.style.cursor = 'grab';
      applyX(row);
    });

    /* ── Single rAF loop ── */
    function featTick() {
      if (!featSectionVisible) { featRafId = 0; return; }
      if (featPageVisible) {
        for (let i = 0; i < rowArr.length; i++) {
          const row = rowArr[i];
          const m = meta.get(row)!;
          if (m._hasMomentum) {
            m._vel *= 0.96;
            if (Math.abs(m._vel) < 0.3) {
              m._hasMomentum = false;
              m._paused = false;
            } else {
              m._cx += m._vel;
              wrap(row);
              applyX(row);
            }
          } else if (!m._paused && !m._hovered) {
            m._cx += m._autoSpeed;
            wrap(row);
            applyX(row);
          }
        }
      }
      featRafId = requestAnimationFrame(featTick);
    }
    featRafId = requestAnimationFrame(featTick);

    // Section visibility observer
    const sectionObs = new IntersectionObserver(([entry]) => {
      featSectionVisible = entry.isIntersecting;
      if (entry.isIntersecting) {
        if (!featRafId) featRafId = requestAnimationFrame(featTick);
        const toRestart = stalledCycles.splice(0);
        toRestart.forEach((fn) => fn());
      }
    }, { threshold: 0 });
    sectionObs.observe(section);

    const onVisibilityChange = () => {
      featPageVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    /* ── Resize recalc ── */
    const onResize = () => {
      clearTimeout(featResizeTimer);
      featResizeTimer = setTimeout(() => {
        for (let i = 0; i < rowArr.length; i++) {
          const row = rowArr[i];
          const m = meta.get(row)!;
          const oldHw = m._hw;
          const newHw = getStride(row);
          if (oldHw > 0 && newHw > 0) {
            m._cx = (m._cx / oldHw) * newHw;
          }
          m._hw = newHw;
          m._autoSpeed = newHw / (m._dur * 60) * m._dir;
        }
      }, 150);
    };
    window.addEventListener('resize', onResize);

    /* ── Touch events ── */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const touchHandlers: Array<{ row: HTMLElement; start: any; move: any; end: any }> = [];
    rows.forEach((row) => {
      let startX = 0;
      let startY = 0;
      let lastX = 0;
      let lastT = 0;
      let dragging = false;
      let dist = 0;
      let dirLocked = false;
      let isHoriz = false;

      const onTouchStart = (e: TouchEvent) => {
        const t = e.touches[0];
        const m = meta.get(row)!;
        startX = t.clientX;
        startY = t.clientY;
        lastX = startX;
        lastT = Date.now();
        m._t0 = lastT;
        dragging = false;
        dist = 0;
        dirLocked = false;
        isHoriz = false;
        m._vel = 0;
        m._hasMomentum = false;
        m._paused = true;
      };

      const onTouchMove = (e: TouchEvent) => {
        const t = e.touches[0];
        const now = Date.now();
        const dt = now - lastT;
        const m = meta.get(row)!;

        if (!dirLocked) {
          const totalDx = Math.abs(t.clientX - startX);
          const totalDy = Math.abs(t.clientY - startY);
          if (totalDx > 12 || totalDy > 12) {
            dirLocked = true;
            isHoriz = totalDx > totalDy * 1.5;
            if (!isHoriz) {
              m._paused = false;
              return;
            }
          } else {
            return;
          }
        }
        if (!isHoriz) {
          m._paused = false;
          return;
        }

        e.preventDefault();
        dragging = true;
        const dx = t.clientX - lastX;
        dist += Math.abs(dx);
        m._cx += dx;
        wrap(row);
        applyX(row);
        if (dt > 0) m._vel = (dx / dt) * 16;
        lastX = t.clientX;
        lastT = now;
      };

      const onTouchEnd = () => {
        const m = meta.get(row)!;
        const elapsed = Date.now() - (m._t0 || 0);
        if (elapsed < 300 && dist < 15) {
          m._paused = false;
          return;
        }
        if (dragging && Math.abs(m._vel) > 0.5) {
          m._hasMomentum = true;
        } else {
          m._paused = false;
        }
      };

      row.addEventListener('touchstart', onTouchStart, { passive: true });
      row.addEventListener('touchmove', onTouchMove, { passive: false });
      row.addEventListener('touchend', onTouchEnd);
      touchHandlers.push({ row, start: onTouchStart, move: onTouchMove, end: onTouchEnd });
    });

    /* ── Hover pause (desktop) ── */
    const hasHover = window.matchMedia('(hover: hover)').matches;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hoverHandlers: Array<{ el: HTMLElement; enter: any; leave: any }> = [];

    if (hasHover) {
      rows.forEach((row) => {
        const m = meta.get(row)!;
        m._hoverTimer = null;

        const onEnter = () => {
          if (m._hoverTimer) clearTimeout(m._hoverTimer);
          m._hovered = true;
        };
        const onLeave = () => {
          m._hoverTimer = setTimeout(() => {
            m._hovered = false;
          }, 150);
        };

        row.addEventListener('mouseenter', onEnter);
        row.addEventListener('mouseleave', onLeave);
        hoverHandlers.push({ el: row, enter: onEnter, leave: onLeave });
      });

      let _hovId: string | null = null;
      let _hovTimer: ReturnType<typeof setTimeout> | null = null;

      function _setHov(id: string | null) {
        if (id === _hovId) return;
        if (_hovTimer) clearTimeout(_hovTimer);
        if (_hovId)
          section!
            .querySelectorAll<HTMLElement>('.f-card[data-id="' + _hovId + '"]')
            .forEach((c) => c.classList.remove('hovered'));
        _hovId = id;
        if (id)
          section!
            .querySelectorAll<HTMLElement>('.f-card[data-id="' + id + '"]')
            .forEach((c) => c.classList.add('hovered'));
      }

      section.querySelectorAll<HTMLElement>('.f-card').forEach((card) => {
        const onEnter = () => {
          if (_hovTimer) clearTimeout(_hovTimer);
          _setHov(card.dataset.id || null);
        };
        const onLeave = () => {
          _hovTimer = setTimeout(() => _setHov(null), 150);
        };
        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
        hoverHandlers.push({ el: card, enter: onEnter, leave: onLeave });
      });
    }

    /* ── Mouse drag events ── */
    let mStartX = 0;
    let mLastX = 0;
    let mLastT = 0;
    let mDragging = false;
    let mDist = 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mouseDownHandlers: Array<{ row: HTMLElement; handler: any }> = [];
    rows.forEach((row) => {
      const onMouseDown = (e: MouseEvent) => {
        if (e.button !== 0) return;
        e.preventDefault();
        const m = meta.get(row)!;
        activeRow = row;
        mStartX = e.clientX;
        mLastX = e.clientX;
        mLastT = Date.now();
        m._t0 = mLastT;
        mDragging = false;
        mDist = 0;
        m._vel = 0;
        m._hasMomentum = false;
        m._paused = true;
        row.style.cursor = 'grabbing';
      };
      row.addEventListener('mousedown', onMouseDown);
      mouseDownHandlers.push({ row, handler: onMouseDown });
    });

    const onDocMouseMove = (e: MouseEvent) => {
      if (!activeRow) return;
      const m = meta.get(activeRow)!;
      const dx = e.clientX - mLastX;
      const now = Date.now();
      const dt = now - mLastT;

      if (Math.abs(e.clientX - mStartX) > 5) mDragging = true;

      mDist += Math.abs(dx);
      m._cx += dx;
      wrap(activeRow);
      applyX(activeRow);
      if (dt > 0) m._vel = (dx / dt) * 16;
      mLastX = e.clientX;
      mLastT = now;
    };

    const onDocMouseUp = () => {
      if (!activeRow) return;
      const row = activeRow;
      const m = meta.get(row)!;
      activeRow = null;
      row.style.cursor = 'grab';

      const elapsed = Date.now() - (m._t0 || 0);
      if (elapsed < 250 && mDist < 8) {
        m._paused = false;
        return;
      }
      if (mDragging && Math.abs(m._vel) > 0.5) {
        m._hasMomentum = true;
      } else {
        m._paused = false;
      }
    };

    document.addEventListener('mousemove', onDocMouseMove);
    document.addEventListener('mouseup', onDocMouseUp);

    /* ======================================================================
       CARD ANIMATIONS — each runs as a self-looping async cycle
       ====================================================================== */

    /* ── Card 1: Generator modal ── */
    const genUrl = 'https://wttj.com/fr/companies/techvision/jobs/senior-frontend';

    section.querySelectorAll<HTMLElement>('.vis-gen').forEach((vis) => {
      const cursor = vis.querySelector<HTMLElement>('.gm-cursor');
      const linkEl = vis.querySelector<HTMLElement>('.gm-input');
      const valBtn = vis.querySelector<HTMLElement>('.gm-validate');
      if (!cursor || !linkEl || !valBtn) return;

      const { wait, cancel } = makeWait();
      cancellers.push(cancel);

      function moveTo(el: HTMLElement) {
        const vr = vis.getBoundingClientRect();
        const er = el.getBoundingClientRect();
        const t = getComputedStyle(vis).transform;
        const scale = t && t !== 'none' ? new DOMMatrix(t).a : 1;
        cursor!.style.left = ((er.left - vr.left + er.width * 0.5) / scale) + 'px';
        cursor!.style.top = ((er.top - vr.top + er.height * 0.5) / scale) + 'px';
      }

      async function cycle() {
        try {
          linkEl!.textContent = '';
          cursor!.style.opacity = '0';
          valBtn!.classList.remove('flash');
          await wait(800);

          cursor!.style.opacity = '1';
          moveTo(linkEl!);
          await wait(600);

          linkEl!.classList.add('typing');
          for (let i = 0; i <= genUrl.length; i++) {
            linkEl!.textContent = genUrl.slice(0, i);
            await wait(25);
          }
          linkEl!.classList.remove('typing');
          await wait(400);

          moveTo(valBtn!);
          await wait(500);

          valBtn!.classList.add('flash');
          cursor!.style.transform = 'scale(0.85)';
          await wait(150);
          cursor!.style.transform = '';
          await wait(300);

          await wait(1200);

          cursor!.style.opacity = '0';
          await wait(500);
          valBtn!.classList.remove('flash');
        } catch {
          return;
        }
        scheduleCycle(cycle, 300);
      }
      cycle();
    });

    /* ── Card 2: Batch generation ── */
    section.querySelectorAll<HTMLElement>('.vis-batch').forEach((vis) => {
      const docs = vis.querySelectorAll<HTMLElement>('.batch-doc');
      const numEl = vis.querySelector<HTMLElement>('.bc-num');

      const { wait, cancel } = makeWait();
      cancellers.push(cancel);

      async function cycle() {
        try {
          docs.forEach((d) => d.classList.remove('visible', 'done'));
          if (numEl) numEl.textContent = '0';
          await wait(600);

          for (let i = 0; i < docs.length; i++) {
            docs[i].classList.add('visible');
            await wait(250);
            docs[i].classList.add('done');
            if (numEl) numEl.textContent = String((i + 1) * 2);
            await wait(200);
          }

          await wait(1500);

          docs.forEach((d) => d.classList.remove('visible', 'done'));
          await wait(500);
        } catch {
          return;
        }
        scheduleCycle(cycle, 400);
      }
      cycle();
    });

    /* ── Card 3: Template search typing ── */
    const tplTitle = 'Product Manager Senior';

    section.querySelectorAll<HTMLElement>('.tpl-search-text').forEach((el) => {
      const { wait, cancel } = makeWait();
      cancellers.push(cancel);

      async function cycle() {
        try {
          el.textContent = '';
          await wait(800);
          for (let i = 0; i <= tplTitle.length; i++) {
            el.textContent = tplTitle.slice(0, i);
            await wait(45);
          }
          await wait(2000);
          el.textContent = '';
          await wait(400);
        } catch {
          return;
        }
        scheduleCycle(cycle, 300);
      }
      cycle();
    });

    /* ── Card 4: Import drag-and-drop ── */
    section.querySelectorAll<HTMLElement>('.vis-import').forEach((vis) => {
      const zone = vis.querySelector<HTMLElement>('.imp-zone');
      const ghost = vis.querySelector<HTMLElement>('.imp-file-ghost');
      if (!zone || !ghost) return;

      const { wait, cancel } = makeWait();
      cancellers.push(cancel);

      async function cycle() {
        try {
          zone!.classList.remove('drag-over', 'loaded');
          ghost!.classList.remove('visible');
          ghost!.style.transform = '';
          await wait(800);

          ghost!.classList.add('visible');
          await wait(400);

          ghost!.style.transition = 'transform 0.8s ease-in-out';
          ghost!.style.transform = 'translate(-2rem, 1.5rem)';
          await wait(500);

          zone!.classList.add('drag-over');
          await wait(600);

          ghost!.classList.remove('visible');
          ghost!.style.transition = 'none';
          ghost!.style.transform = '';
          zone!.classList.remove('drag-over');
          zone!.classList.add('loaded');
          await wait(2500);

          zone!.classList.remove('loaded');
          await wait(400);
        } catch {
          return;
        }
        scheduleCycle(cycle, 400);
      }
      cycle();
    });

    /* ── Card 5: ATS rewrite ── */
    section.querySelectorAll<HTMLElement>('.vis-ats').forEach((vis) => {
      const lines = vis.querySelectorAll<HTMLElement>('.ats-line');

      const { wait, cancel } = makeWait();
      cancellers.push(cancel);

      async function cycle() {
        try {
          lines.forEach((l, i) => {
            l.classList.add('old');
            l.classList.remove('rewriting');
            l.textContent = atsOriginals[i];
          });
          await wait(800);

          for (let i = 0; i < lines.length; i++) {
            lines[i].classList.remove('old');
            lines[i].classList.add('rewriting');
            lines[i].textContent = '';
            for (let c = 0; c <= atsRewrites[i].length; c++) {
              lines[i].textContent = atsRewrites[i].slice(0, c);
              await wait(30);
            }
            await wait(400);
          }

          await wait(2000);
        } catch {
          return;
        }
        scheduleCycle(cycle, 400);
      }
      cycle();
    });

    /* ── Card 6: Score badge ── */
    section.querySelectorAll<HTMLElement>('.vis-score').forEach((vis) => {
      const oldBadge = vis.querySelector<HTMLElement>('.sc-old');
      const arrow = vis.querySelector<HTMLElement>('.sc-arrow');
      const newBadge = vis.querySelector<HTMLElement>('.sc-new');
      const refresh = vis.querySelector<HTMLElement>('.sc-refresh');
      if (!oldBadge || !arrow || !newBadge || !refresh) return;
      const newNum = newBadge.querySelector<HTMLElement>('.sc-num');
      if (!newNum) return;

      const { wait, cancel } = makeWait();
      cancellers.push(cancel);

      async function cycle() {
        try {
          oldBadge!.classList.remove('visible');
          arrow!.classList.remove('visible');
          newBadge!.classList.remove('visible');
          refresh!.classList.remove('hidden', 'spinning');
          newNum!.textContent = '';
          newBadge!.style.borderColor = 'rgba(255,255,255,0.3)';
          await wait(600);

          oldBadge!.classList.add('visible');
          await wait(600);

          arrow!.classList.add('visible');
          await wait(400);

          newBadge!.classList.add('visible');
          refresh!.classList.add('spinning');
          await wait(1800);

          refresh!.classList.remove('spinning');
          refresh!.classList.add('hidden');
          newBadge!.style.borderColor = 'var(--green)';
          newNum!.style.color = 'var(--green)';
          for (let n = 0; n <= 94; n += 3) {
            newNum!.textContent = String(Math.min(n, 94));
            await wait(20);
          }
          newNum!.textContent = '94';
          await wait(2500);
        } catch {
          return;
        }
        scheduleCycle(cycle, 400);
      }
      cycle();
    });

    /* ── Card 7: Fiche offre tags ── */
    section.querySelectorAll<HTMLElement>('.vis-fiche').forEach((vis) => {
      const tags = vis.querySelectorAll<HTMLElement>('.fiche-tag');

      const { wait, cancel } = makeWait();
      cancellers.push(cancel);

      async function cycle() {
        try {
          tags.forEach((t) => t.classList.remove('visible'));
          await wait(500);

          for (let i = 0; i < tags.length; i++) {
            tags[i].classList.add('visible');
            await wait(250);
          }

          await wait(2500);

          tags.forEach((t) => t.classList.remove('visible'));
          await wait(400);
        } catch {
          return;
        }
        scheduleCycle(cycle, 400);
      }
      cycle();
    });

    /* ── Card 8: Reco suggestions ── */
    section.querySelectorAll<HTMLElement>('.vis-reco').forEach((vis) => {
      const items = vis.querySelectorAll<HTMLElement>('.reco-item');

      const { wait, cancel } = makeWait();
      cancellers.push(cancel);

      async function cycle() {
        try {
          items.forEach((i) => i.classList.remove('visible'));
          await wait(600);

          for (let i = 0; i < items.length; i++) {
            items[i].classList.add('visible');
            await wait(500);
          }

          await wait(2500);

          items.forEach((i) => i.classList.remove('visible'));
          await wait(400);
        } catch {
          return;
        }
        scheduleCycle(cycle, 400);
      }
      cycle();
    });

    /* ── Card 9: Review mode ── */
    section.querySelectorAll<HTMLElement>('.vis-review').forEach((vis) => {
      const changes = vis.querySelectorAll<HTMLElement>('.rev-change');

      const { wait, cancel } = makeWait();
      cancellers.push(cancel);

      async function cycle() {
        try {
          changes.forEach((c) => {
            c.classList.remove('visible', 'accepted', 'rejected');
            c.querySelectorAll<HTMLElement>('.rev-btn').forEach((b) => b.classList.remove('flash'));
          });
          await wait(600);

          for (let i = 0; i < changes.length; i++) {
            changes[i].classList.add('visible');
            await wait(400);
          }
          await wait(600);

          const accept1 = changes[0].querySelector<HTMLElement>('.rev-accept');
          if (accept1) accept1.classList.add('flash');
          await wait(300);
          changes[0].classList.add('accepted');
          await wait(800);

          const reject2 = changes[1].querySelector<HTMLElement>('.rev-reject');
          if (reject2) reject2.classList.add('flash');
          await wait(300);
          changes[1].classList.add('rejected');
          await wait(2000);
        } catch {
          return;
        }
        scheduleCycle(cycle, 400);
      }
      cycle();
    });

    /* ── Card 10: History versions ── */
    section.querySelectorAll<HTMLElement>('.vis-history').forEach((vis) => {
      const hRows = vis.querySelectorAll<HTMLElement>('.hist-row');

      const { wait, cancel } = makeWait();
      cancellers.push(cancel);

      async function cycle() {
        try {
          hRows.forEach((r) => r.classList.remove('visible', 'active'));
          await wait(600);

          for (let i = 0; i < hRows.length; i++) {
            hRows[i].classList.add('visible');
            await wait(400);
          }
          await wait(300);

          hRows[hRows.length - 1].classList.add('active');
          await wait(2500);

          hRows.forEach((r) => r.classList.remove('visible', 'active'));
          await wait(400);
        } catch {
          return;
        }
        scheduleCycle(cycle, 400);
      }
      cycle();
    });

    /* ── Card 11: Inline edit kebab ── */
    section.querySelectorAll<HTMLElement>('.vis-inline').forEach((vis) => {
      const inlRows = vis.querySelectorAll<HTMLElement>('.inl-row');
      const menu = vis.querySelector<HTMLElement>('.inl-menu');
      if (!menu) return;
      const editOpt = menu.querySelector<HTMLElement>('.inl-opt.edit');

      const { wait, cancel } = makeWait();
      cancellers.push(cancel);

      async function cycle() {
        try {
          inlRows.forEach((r) => r.classList.remove('active'));
          menu!.classList.remove('visible');
          if (editOpt) editOpt.classList.remove('highlight');
          await wait(800);

          inlRows[0].classList.add('active');
          await wait(400);

          menu!.classList.add('visible');
          await wait(600);

          if (editOpt) editOpt.classList.add('highlight');
          await wait(2000);

          if (editOpt) editOpt.classList.remove('highlight');
          menu!.classList.remove('visible');
          inlRows[0].classList.remove('active');
          await wait(400);
        } catch {
          return;
        }
        scheduleCycle(cycle, 400);
      }
      cycle();
    });

    /* ── Card 12: Export section reorder ── */
    section.querySelectorAll<HTMLElement>('.vis-export-order').forEach((vis) => {
      const cards = vis.querySelectorAll<HTMLElement>('.exo-card');

      function getStep() {
        const visible = Array.from(cards).filter(c => c.offsetParent !== null);
        if (visible.length < 2) return 0;
        return visible[1].offsetTop - visible[0].offsetTop;
      }

      const { wait, cancel } = makeWait();
      cancellers.push(cancel);

      async function cycle() {
        try {
          cards.forEach((c) => {
            c.style.transform = '';
            c.classList.remove('dragging');
          });
          await wait(800);

          const step = getStep();
          const mobile = window.innerWidth <= 767;

          if (mobile) {
            // Mobile: drag Skills down below Experience
            cards[1].classList.add('dragging');
            await wait(300);
            cards[1].style.transform = `translateY(${step}px)`;
            cards[2].style.transform = `translateY(${-step}px)`;
            await wait(600);
            cards[1].classList.remove('dragging');
          } else {
            // Desktop: drag Experience up above Skills
            cards[2].classList.add('dragging');
            await wait(300);
            cards[2].style.transform = `translateY(${-step}px)`;
            cards[1].style.transform = `translateY(${step}px)`;
            await wait(600);
            cards[2].classList.remove('dragging');
          }

          await wait(2200);

          cards.forEach((c) => {
            c.style.transform = '';
          });
          await wait(400);
        } catch {
          return;
        }
        scheduleCycle(cycle, 400);
      }
      cycle();
    });

    /* ── Card 13: Language badge cycling ── */
    section.querySelectorAll<HTMLElement>('.vis-lang-btn').forEach((vis) => {
      const flags = vis.querySelectorAll<HTMLElement>('.lang-flag');
      const label = vis.querySelector<HTMLElement>('.lang-label');
      let idx = 0;

      const { wait, cancel } = makeWait();
      cancellers.push(cancel);

      async function cycle() {
        try {
          flags.forEach((f) => f.classList.remove('active'));
          flags[idx].classList.add('active');
          if (label) label.textContent = langLabels[idx];
          await wait(2000);
          flags[idx].classList.remove('active');
          await wait(200);
          idx = (idx + 1) % flags.length;
        } catch {
          return;
        }
        scheduleCycle(cycle, 100);
      }
      cycle();
    });

    /* ── Card 14: Translate carousel ── */
    section.querySelectorAll<HTMLElement>('.vis-translate').forEach((vis) => {
      const flags = [...vis.querySelectorAll<HTMLElement>('.tr-flag')];

      function rotate() {
        flags.forEach((f) => f.classList.add('tr-move'));

        flags.forEach((f) => {
          let pos = parseInt(f.dataset.pos || '0');
          pos--;
          f.dataset.pos = String(pos);
        });

        setTimeout(() => {
          const offLeft = flags.find((f) => f.dataset.pos === '-2');
          if (offLeft) {
            offLeft.classList.remove('tr-move');
            offLeft.dataset.pos = '2';
          }
        }, 550);
      }

      function rotateLoop() {
        rotate();
        scheduleCycle(rotateLoop, 2000);
      }
      scheduleCycle(rotateLoop, 2000);
    });

    /* ── Card 15: Task manager ── */
    section.querySelectorAll<HTMLElement>('.vis-tasks').forEach((vis) => {
      const items = [...vis.querySelectorAll<HTMLElement>('.tsk-item')];

      const { wait, cancel } = makeWait();
      cancellers.push(cancel);

      async function animateItem(item: HTMLElement, delay: number) {
        await wait(delay);
        const fill = item.querySelector<HTMLElement>('.tsk-fill');
        const pct = item.querySelector<HTMLElement>('.tsk-pct');
        const step = item.querySelector<HTMLElement>('.tsk-step');
        if (!fill || !pct || !step) return;

        for (let s = 0; s < taskSteps.length; s++) {
          const target = s === taskSteps.length - 1 ? 100 : 20 + (s + 1) * 18;
          step.textContent = taskSteps[s];
          fill.style.width = target + '%';
          pct.textContent = target + '%';
          if (target >= 100) {
            pct.textContent = taskDoneLabel;
            pct.classList.add('done');
            fill.classList.add('done');
          }
          await wait(500 + Math.random() * 400);
        }
      }

      async function cycle() {
        try {
          items.forEach((item) => {
            const fill = item.querySelector<HTMLElement>('.tsk-fill');
            const pct = item.querySelector<HTMLElement>('.tsk-pct');
            const step = item.querySelector<HTMLElement>('.tsk-step');
            if (fill) {
              fill.style.width = '0%';
              fill.classList.remove('done');
            }
            if (pct) {
              pct.textContent = '0%';
              pct.classList.remove('done');
            }
            if (step) step.textContent = taskWaitingLabel;
          });
          await wait(800);

          await Promise.all(items.map((item, i) => animateItem(item, i * 600)));
          await wait(2000);
        } catch {
          return;
        }
        scheduleCycle(cycle, 300);
      }
      cycle();
    });

    /* ── Card 16: Browser extension popup ── */
    const pluginUrl = 'linkedin.com/jobs/senior-frontend';

    section.querySelectorAll<HTMLElement>('.vis-plugin').forEach((vis) => {
      const urlEl = vis.querySelector<HTMLElement>('.plg-url');
      const extIcon = vis.querySelector<HTMLElement>('.plg-ext-icon');
      const popup = vis.querySelector<HTMLElement>('.plg-popup');
      const btn = vis.querySelector<HTMLElement>('.plg-popup-btn');
      if (!urlEl || !extIcon || !popup || !btn) return;

      const { wait, cancel } = makeWait();
      cancellers.push(cancel);

      async function cycle() {
        try {
          popup!.classList.remove('visible');
          urlEl!.textContent = '';
          urlEl!.classList.remove('typing');
          extIcon!.classList.remove('glow');
          btn!.classList.remove('flash');
          await wait(800);

          urlEl!.classList.add('typing');
          for (let i = 0; i <= pluginUrl.length; i++) {
            urlEl!.textContent = pluginUrl.slice(0, i);
            await wait(25);
          }
          urlEl!.classList.remove('typing');
          await wait(600);

          extIcon!.classList.add('glow');
          await wait(400);

          popup!.classList.add('visible');
          await wait(800);

          btn!.classList.add('flash');
          await wait(1500);

          btn!.classList.remove('flash');
          popup!.classList.remove('visible');
          extIcon!.classList.remove('glow');
          urlEl!.textContent = '';
          await wait(500);
        } catch {
          return;
        }
        scheduleCycle(cycle, 400);
      }
      cycle();
    });

    /* ======================================================================
       CLEANUP
       ====================================================================== */
    return () => {
      // Cancel all async animation cycles
      cancellers.forEach((c) => c());

      // Stop rAF loop
      cancelAnimationFrame(featRafId);

      // Stop section observer
      sectionObs.disconnect();

      // Clear resize timer
      clearTimeout(featResizeTimer);

      // Remove document-level listeners
      document.removeEventListener('visibilitychange', onVisibilityChange);
      document.removeEventListener('mousemove', onDocMouseMove);
      document.removeEventListener('mouseup', onDocMouseUp);
      window.removeEventListener('resize', onResize);

      // Remove grid listener
      grid?.removeEventListener('mousemove', onGridMouseMove);

      // Remove touch handlers
      touchHandlers.forEach(({ row, start, move, end }) => {
        row.removeEventListener('touchstart', start);
        row.removeEventListener('touchmove', move);
        row.removeEventListener('touchend', end);
      });

      // Remove hover handlers
      hoverHandlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });

      // Remove mousedown handlers
      mouseDownHandlers.forEach(({ row, handler }) => {
        row.removeEventListener('mousedown', handler);
      });
    };
  }, [makeWait, atsOriginals, atsRewrites, taskSteps, langLabels, taskDoneLabel, taskWaitingLabel]);

  return (
    <>
      {/* SVG gradient defs for score circles */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#22d3ee' }} />
            <stop offset="100%" style={{ stopColor: '#34d399' }} />
          </linearGradient>
        </defs>
      </svg>

      <section className="features-section" id="features" ref={sectionRef}>
        <div className="section-header">
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">{t("subtitle")}</p>
        </div>

        <div className="marquee-grid">

          {/* ROW 1: scroll left */}
          <div className="marquee-row scroll-left" id="row1">

            {/* Card 1: Generator */}
            <div className="f-card card-lg" data-id="1">
              <div className="c-title">{t("card1Title")}</div>
              <div className="c-sub">{t("card1Sub")}</div>
              <div className="c-vis">
                <div className="vis-gen" id="vis-gen">
                  <div className="gm-body">
                    <div className="gm-label">{t("card1RefLabel")}</div>
                    <div className="gm-select">
                      <svg className="gm-doc-icon" viewBox="0 0 24 24">
                        <path
                          d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm7 1.5L18.5 9H14a1 1 0 01-1-1V3.5zM8 13h8v1H8v-1zm0 3h5v1H8v-1z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="gm-select-date">07/02</span>
                      <span className="gm-select-text">{t("card1SelectText")}</span>
                      <img className="gm-flag" src={FLAG_FR_CARD1} alt="FR" />
                      <span className="gm-arrow">&#9662;</span>
                    </div>
                    <div className="gm-label">{t("card1LinkLabel")}</div>
                    <div className="gm-link-row">
                      <div className="gm-history-btn">&#128203;</div>
                      <div className="gm-input" id="gm-link"></div>
                    </div>
                    <div className="gm-actions">
                      <span className="gm-cancel">{t("card1Cancel")}</span>
                      <span className="gm-validate" id="gm-validate">{t("card1Validate")}</span>
                    </div>
                  </div>
                  <div className="gm-cursor" id="gm-cursor">
                    <svg width="12" height="16" viewBox="0 0 12 16">
                      <path d="M1 1l10 7-5 1.5-2.5 5.5z" fill="#fff" stroke="#222" strokeWidth="0.8" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5: ATS */}
            <div className="f-card card-sm" data-id="5">
              <div className="c-title">{t("card5Title")}</div>
              <div className="c-sub">{t("card5Sub")}</div>
              <div className="c-vis">
                <div className="vis-ats">
                  <div className="ats-line old">{(t.raw("card5Originals") as string[])[0]}</div>
                  <div className="ats-line old">{(t.raw("card5Originals") as string[])[1]}</div>
                  <div className="ats-line old">{(t.raw("card5Originals") as string[])[2]}</div>
                </div>
              </div>
            </div>

            {/* Card 4: Import */}
            <div className="f-card card-md" data-id="4">
              <div className="c-title">{t("card4Title")}</div>
              <div className="c-sub">{t("card4Sub")}</div>
              <div className="c-vis">
                <div className="vis-import">
                  <div className="imp-zone">
                    <svg
                      className="imp-upload-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="imp-label">{t("card4UploadLabel")}</span>
                    <div className="imp-done">
                      <svg
                        style={{ width: '12px', height: '12px', color: '#6ee7b7', flexShrink: 0 }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Thomas_Lefevre_CV.pdf</span>
                    </div>
                  </div>
                  <div className="imp-file-ghost">
                    <svg
                      style={{ width: '12px', height: '12px', flexShrink: 0 }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 18h12a2 2 0 002-2V6.414A2 2 0 0017.414 5L14 1.586A2 2 0 0012.586 1H4a2 2 0 00-2 2v13a2 2 0 002 2z" />
                    </svg>
                    <span>CV.pdf</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Batch */}
            <div className="f-card card-md" data-id="2">
              <div className="c-title">{t("card2Title")}</div>
              <div className="c-sub">{t("card2Sub")}</div>
              <div className="c-vis">
                <div className="vis-batch">
                  <div className="batch-docs">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div className="batch-doc" key={i}>
                        <div className="bd-l"></div>
                        <div className="bd-l sh"></div>
                        <div className="bd-l"></div>
                        <div className="bd-l sh"></div>
                        <div className="bd-check">&#10003;</div>
                      </div>
                    ))}
                  </div>
                  <div className="batch-counter">
                    <span className="bc-num">0</span>/10
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Template */}
            <div className="f-card card-md" data-id="3">
              <div className="c-title">{t("card3Title")}</div>
              <div className="c-sub">{t("card3Sub")}</div>
              <div className="c-vis">
                <div className="vis-tpl">
                  <div className="tpl-search">
                    <svg
                      className="tpl-search-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span className="tpl-search-text"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 16: Browser extension (coming soon) */}
            <div className="f-card card-lg" data-id="16">
              <div className="c-title">{t("card16Title")}</div>
              <span className="c-badge-soon">{t("card16Badge")}</span>
              <div className="c-sub">{t("card16Sub")}</div>
              <div className="c-vis">
                <div className="vis-plugin">
                  <div className="plg-browser">
                    <div className="plg-bar">
                      <div className="plg-lock">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10">
                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 3c1.66 0 3 1.34 3 3v2H9V6c0-1.66 1.34-3 3-3z"/>
                        </svg>
                      </div>
                      <div className="plg-url"></div>
                      <div className="plg-ext-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5a2.5 2.5 0 00-5 0V5H4c-1.1 0-2 .9-2 2v3.8h1.5a2.5 2.5 0 010 5H2V20c0 1.1.9 2 2 2h3.8v-1.5a2.5 2.5 0 015 0V22H17c1.1 0 2-.9 2-2v-4h1.5a2.5 2.5 0 000-5z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="plg-page">
                      <div className="plg-line"></div>
                      <div className="plg-line short"></div>
                      <div className="plg-line"></div>
                      <div className="plg-line med"></div>
                    </div>
                  </div>
                  <div className="plg-popup">
                    <div className="plg-popup-header">FitMyCV</div>
                    <div className="plg-popup-cv">
                      <svg className="plg-doc-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm7 1.5L18.5 9H14a1 1 0 01-1-1V3.5z"/>
                      </svg>
                      <span>{t("card16CvLabel")}</span>
                    </div>
                    <div className="plg-popup-btn">{t("card16GenBtn")}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ROW 2: scroll right (offset) */}
          <div className="marquee-row scroll-right" id="row2">

            {/* Card 7: Fiche offre */}
            <div className="f-card card-md" data-id="7">
              <div className="c-title">{t("card7Title")}</div>
              <div className="c-sub">{t("card7Sub")}</div>
              <div className="c-vis">
                <div className="vis-fiche">
                  <div className="fiche-tags">
                    <span className="fiche-tag skill">React</span>
                    <span className="fiche-tag skill">TypeScript</span>
                    <span className="fiche-tag method">Scrum</span>
                    <span className="fiche-tag benefit">Télétravail</span>
                    <span className="fiche-tag skill">Node.js</span>
                    <span className="fiche-tag benefit">50-60k&euro;</span>
                    <span className="fiche-tag method">CI/CD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 9: Review */}
            <div className="f-card card-md" data-id="9">
              <div className="c-title">{t("card9Title")}</div>
              <div className="c-sub">{t("card9Sub")}</div>
              <div className="c-vis">
                <div className="vis-review">
                  <div className="rev-change">
                    <div className="rev-diff">
                      <span className="rev-old">{t("card9Old1")}</span>
                      <span className="rev-new">{t("card9New1")}</span>
                    </div>
                    <div className="rev-actions">
                      <span className="rev-btn rev-accept">&#10003;</span>
                      <span className="rev-btn rev-reject">&#10005;</span>
                    </div>
                  </div>
                  <div className="rev-change">
                    <div className="rev-diff">
                      <span className="rev-old">{t("card9Old2")}</span>
                      <span className="rev-new">{t("card9New2")}</span>
                    </div>
                    <div className="rev-actions">
                      <span className="rev-btn rev-accept">&#10003;</span>
                      <span className="rev-btn rev-reject">&#10005;</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 8: Reco */}
            <div className="f-card card-lg" data-id="8">
              <div className="c-title">{t("card8Title")}</div>
              <div className="c-sub">{t("card8Sub")}</div>
              <div className="c-vis">
                <div className="vis-reco">
                  <div className="reco-item">
                    <div className="reco-header">
                      <span className="reco-badge high">{t("card8High")}</span>
                      <span className="reco-pts">+5 pts</span>
                    </div>
                    <div className="reco-text">{t("card8Reco1")}</div>
                  </div>
                  <div className="reco-item">
                    <div className="reco-header">
                      <span className="reco-badge med">{t("card8Med")}</span>
                      <span className="reco-pts">+4 pts</span>
                    </div>
                    <div className="reco-text">{t("card8Reco2")}</div>
                  </div>
                  <div className="reco-item">
                    <div className="reco-header">
                      <span className="reco-badge low">{t("card8Low")}</span>
                      <span className="reco-pts">+2 pts</span>
                    </div>
                    <div className="reco-text">{t("card8Reco3")}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 6: Score */}
            <div className="f-card card-sm" data-id="6">
              <div className="c-title">{t("card6Title")}</div>
              <div className="c-sub">{t("card6Sub")}</div>
              <div className="c-vis">
                <div className="vis-score">
                  <div className="sc-badge sc-old">
                    <span className="sc-num">76</span>
                  </div>
                  <div className="sc-arrow">&#8594;</div>
                  <div className="sc-badge sc-new">
                    <svg
                      className="sc-refresh"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="23 4 23 10 17 10" />
                      <polyline points="1 20 1 14 7 14" />
                      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                    </svg>
                    <span className="sc-num"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 10: History */}
            <div className="f-card card-sm" data-id="10">
              <div className="c-title">{t("card10Title")}</div>
              <div className="c-sub">{t("card10Sub")}</div>
              <div className="c-vis">
                <div className="vis-history">
                  <div className="hist-row">
                    <span className="hist-label">v1</span>
                    <span className="hist-score hs-low">72</span>
                  </div>
                  <div className="hist-row">
                    <span className="hist-label">v2</span>
                    <span className="hist-score hs-mid">79</span>
                  </div>
                  <div className="hist-row">
                    <span className="hist-label">v3</span>
                    <span className="hist-score hs-high">94</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ROW 3: scroll left slow */}
          <div className="marquee-row scroll-left-slow" id="row3">

            {/* Card 13: Language badge */}
            <div className="f-card card-sm" data-id="13">
              <div className="c-title">{t("card13Title")}</div>
              <div className="c-sub">{t("card13Sub")}</div>
              <div className="c-vis">
                <div className="vis-lang-btn">
                  <div className="lang-badge">
                    <img className="lang-flag" data-lang="0" src={FLAG_FR} alt="FR" />
                    <img className="lang-flag" data-lang="1" src={FLAG_GB} alt="GB" />
                    <img className="lang-flag" data-lang="2" src={FLAG_DE} alt="DE" />
                    <img className="lang-flag" data-lang="3" src={FLAG_ES} alt="ES" />
                  </div>
                  <div className="lang-label">{(t.raw("card13LangLabels") as string[])[0]}</div>
                </div>
              </div>
            </div>

            {/* Card 14: Translate */}
            <div className="f-card card-lg" data-id="14">
              <div className="c-title">{t("card14Title")}</div>
              <div className="c-sub">{t("card14Sub")}</div>
              <div className="c-vis">
                <div className="vis-translate">
                  <div className="tr-carousel">
                    <div className="tr-flag" data-pos="-1">
                      <img src={FLAG_ES} alt="ES" />
                    </div>
                    <div className="tr-flag" data-pos="0">
                      <img src={FLAG_FR} alt="FR" />
                    </div>
                    <div className="tr-flag" data-pos="1">
                      <img src={FLAG_GB} alt="GB" />
                    </div>
                    <div className="tr-flag" data-pos="2">
                      <img src={FLAG_DE} alt="DE" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 15: Tasks */}
            <div className="f-card card-lg" data-id="15">
              <div className="c-title">{t("card15Title")}</div>
              <div className="c-sub">{t("card15Sub")}</div>
              <div className="c-vis">
                <div className="vis-tasks">
                  <div className="tsk-item">
                    <div className="tsk-line1">
                      <span className="tsk-title">Senior Frontend Engineer</span>
                      <span className="tsk-pct" data-end="100">0%</span>
                    </div>
                    <div className="tsk-bar">
                      <div className="tsk-fill" data-end="100"></div>
                    </div>
                    <div className="tsk-step">{t("card15Waiting")}</div>
                  </div>
                  <div className="tsk-item">
                    <div className="tsk-line1">
                      <span className="tsk-title">Product Manager</span>
                      <span className="tsk-pct" data-end="100">0%</span>
                    </div>
                    <div className="tsk-bar">
                      <div className="tsk-fill" data-end="100"></div>
                    </div>
                    <div className="tsk-step">{t("card15Waiting")}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 11: Inline edit */}
            <div className="f-card card-md" data-id="11">
              <div className="c-title">{t("card11Title")}</div>
              <div className="c-sub">{t("card11Sub")}</div>
              <div className="c-vis">
                <div className="vis-inline">
                  <div className="inl-row">
                    <div className="inl-text">{t("card11Row1")}</div>
                    <div className="inl-kebab">&#8942;</div>
                    <div className="inl-menu">
                      <div className="inl-opt edit">&#9998; {t("card11Edit")}</div>
                      <div className="inl-opt del">&#10005; {t("card11Delete")}</div>
                    </div>
                  </div>
                  <div className="inl-row">
                    <div className="inl-text">{t("card11Row2")}</div>
                    <div className="inl-kebab">&#8942;</div>
                  </div>
                  <div className="inl-row">
                    <div className="inl-text">{t("card11Row3")}</div>
                    <div className="inl-kebab">&#8942;</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 12: Export order */}
            <div className="f-card card-md" data-id="12">
              <div className="c-title">{t("card12Title")}</div>
              <div className="c-sub">{t("card12Sub")}</div>
              <div className="c-vis">
                <div className="vis-export-order">
                  <div className="exo-card" data-idx="0">
                    <span className="exo-handle">&#10303;</span>
                    <span className="exo-check">&#10003;</span>
                    <span className="exo-name">Summary</span>
                  </div>
                  <div className="exo-card" data-idx="1">
                    <span className="exo-handle">&#10303;</span>
                    <span className="exo-check">&#10003;</span>
                    <span className="exo-name">Skills</span>
                  </div>
                  <div className="exo-card" data-idx="2">
                    <span className="exo-handle">&#10303;</span>
                    <span className="exo-check">&#10003;</span>
                    <span className="exo-name">Experience</span>
                  </div>
                  <div className="exo-btn">{t("card12ExportBtn")}</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
