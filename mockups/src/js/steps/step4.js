import { $, moveToEl, clickEffect, wait } from '../dom-helpers.js';
import { setCvIcon, updateStepIndicator, showCv } from '../ui-state.js';

export function setupStep4(cursor) {
  // Step 4 starts: cv-clean visible, gpt icon, credits 54, score-badge-clean visible
  $('cv-name').innerHTML = '07/02/2026 &nbsp;Senior Frontend Engi...';
  setCvIcon('gpt');
  $('credits').textContent = '54';
  $('credit-bar-fill').style.width = '54%';
  showCv('cv-clean');
  $('score-badge-clean').classList.add('visible');
}

export async function runStep4(cursor) {
  const viewport = $('viewport');

  // === STEP 4: Score de correspondance ===
  updateStepIndicator(4);
  moveToEl(viewport, cursor, 'score-badge-clean');
  await wait(450);
  clickEffect(cursor);
  await wait(200);
  $('score-refresh-clean').classList.add('spinning');
  $('credits').textContent = '52';
  $('credit-bar-fill').style.width = '52%';
  await wait(1200);
  $('score-refresh-clean').classList.add('hidden');
  $('score-refresh-clean').classList.remove('spinning');
  $('score-num-clean').classList.remove('hidden');
  $('score-badge-clean').style.borderColor = 'var(--orange-500)';
  await wait(400);
  $('btn-optimize-clean').classList.remove('hidden');
  await wait(600);
}
