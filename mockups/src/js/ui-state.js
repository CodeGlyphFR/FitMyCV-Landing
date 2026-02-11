import { $, wait } from './dom-helpers.js';
import { ICON_OPENAI_SYMBOL, ICON_ANALYZER, ICON_IMPORT } from '../html/icons.js';
import { t } from './i18n.js';

export function showCv(id) {
  document.querySelectorAll('.cv-area').forEach(el => el.classList.add('hidden'));
  $(id).classList.remove('hidden');
}

export function updateStepIndicator(step) {
  document.querySelectorAll('.step-dot').forEach(dot => {
    const s = parseInt(dot.dataset.step);
    dot.classList.remove('active', 'done');
    if (s === step) dot.classList.add('active');
    else if (s < step) dot.classList.add('done');
  });
  const label = $('step-label');
  if (label) label.textContent = t('stepIndicator', {n: step, label: t('step.' + step)});
}

export function setCvIcon(type) {
  const img = $('cv-icon-img');
  if (type === 'gpt') {
    img.src = ICON_OPENAI_SYMBOL;
  } else if (type === 'analyzer') {
    img.src = ICON_ANALYZER;
  } else {
    img.src = ICON_IMPORT;
  }
}

export async function typeText(el, text, speed) {
  for (let i = 0; i <= text.length; i++) {
    el.textContent = text.substring(0, i);
    await wait(speed);
  }
}

export function animateCounter(el, from, to, duration) {
  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (to - from) * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
