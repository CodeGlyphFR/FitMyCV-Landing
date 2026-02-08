export const $ = id => document.getElementById(id);

export function getElCenter(viewport, id) {
  const el = typeof id === 'string' ? $(id) : id;
  if (!el) return { x: 450, y: 300 };
  const vr = viewport.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  return {
    x: er.left - vr.left + er.width / 2,
    y: er.top - vr.top + er.height / 2
  };
}

export function moveCursor(cursor, x, y) {
  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';
}

export function moveToEl(viewport, cursor, id) {
  const pos = getElCenter(viewport, id);
  moveCursor(cursor, pos.x, pos.y);
}

export function clickEffect(cursor) {
  cursor.classList.add('clicking');
  setTimeout(() => cursor.classList.remove('clicking'), 400);
}

// Pause/resume support
let _paused = false;
let _resumeResolve = null;

export function setPaused(paused) {
  _paused = paused;
  if (!paused && _resumeResolve) {
    _resumeResolve();
    _resumeResolve = null;
  }
}

function waitForResume() {
  if (!_paused) return Promise.resolve();
  return new Promise(r => { _resumeResolve = r; });
}

export function wait(ms) {
  return new Promise(r => setTimeout(r, ms)).then(() => waitForResume());
}

export function slowScroll(el, target, duration) {
  return new Promise(resolve => {
    const start = el.scrollTop;
    const distance = target - start;
    const startTime = performance.now();
    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      el.scrollTop = start + distance * ease;
      if (progress < 1) requestAnimationFrame(step);
      else resolve();
    }
    requestAnimationFrame(step);
  });
}
