import { $, moveToEl, clickEffect, wait, slowScroll } from '../dom-helpers.js';
import { setCvIcon, updateStepIndicator, showCv, typeText, animateCounter } from '../ui-state.js';

export function setupStep5(cursor) {
  // Step 5 starts: cv-clean visible, gpt icon, credits 52,
  // score-badge-clean visible with score 79, border orange, optimize btn visible
  $('cv-name').innerHTML = '07/02/2026 &nbsp;Senior Frontend Engi...';
  setCvIcon('gpt');
  $('credits').textContent = '52';
  $('credit-bar-fill').style.width = '52%';
  showCv('cv-clean');
  $('score-badge-clean').classList.add('visible');
  $('score-refresh-clean').classList.add('hidden');
  $('score-num-clean').classList.remove('hidden');
  $('score-badge-clean').style.borderColor = 'var(--orange-500)';
  $('btn-optimize-clean').classList.remove('hidden');
}

export async function runStep5(cursor) {
  const viewport = $('viewport');

  // === STEP 5: Optimisation IA ===
  updateStepIndicator(5);
  moveToEl(viewport, cursor, 'btn-optimize-clean');
  await wait(450);
  clickEffect(cursor);
  await wait(200);

  const scoreCircle = document.querySelector('.optim-card circle:nth-child(2)');
  if (scoreCircle) {
    scoreCircle.style.transition = 'none';
    scoreCircle.style.strokeDashoffset = '351.86';
    scoreCircle.getBoundingClientRect();
  }
  const optimScoreNum = document.querySelector('.score-center .score-num');
  if (optimScoreNum) optimScoreNum.textContent = '0';
  document.querySelectorAll('.score-bar-fill').forEach(bar => {
    bar.style.transition = 'none';
    bar.style.width = '0%';
  });

  $('optim-modal').classList.add('visible');

  setTimeout(() => {
    if (scoreCircle) {
      scoreCircle.style.transition = 'stroke-dashoffset 1.5s ease-out';
      scoreCircle.style.strokeDashoffset = '73.89';
    }
  }, 100);

  if (optimScoreNum) {
    setTimeout(() => animateCounter(optimScoreNum, 0, 79, 1500), 100);
  }

  const barWidths = ['74%', '80%', '85%', '73%'];
  document.querySelectorAll('.score-bar-fill').forEach((bar, i) => {
    setTimeout(() => {
      bar.style.transition = 'width 1s ease-out';
      bar.style.width = barWidths[i] || '0%';
    }, 200 + i * 150);
  });

  await wait(1800);

  updateStepIndicator(5);
  moveToEl(viewport, cursor, 'sug-checkbox-1');
  await wait(450);
  clickEffect(cursor);
  await wait(200);
  $('sug-checkbox-1').classList.add('checked');
  $('sug-context-1').classList.add('visible');
  await wait(300);

  moveToEl(viewport, cursor, 'sug-context-1');
  await wait(350);
  await typeText($('sug-context-1'), 'Jest + Cypress utilisés 2 ans chez TechVision', 30);
  await wait(300);

  $('btn-improve-cv').classList.add('active');
  await wait(400);

  const optContent = document.querySelector('.optim-content');
  await slowScroll(optContent, optContent.scrollHeight, 1000);
  await wait(300);

  moveToEl(viewport, cursor, 'btn-improve-cv');
  await wait(600);
  clickEffect(cursor);
  await wait(400);
}
