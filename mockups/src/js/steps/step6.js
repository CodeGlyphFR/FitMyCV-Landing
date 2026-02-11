import { $, moveToEl, clickEffect, wait } from '../dom-helpers.js';
import { showCv, setCvIcon, updateStepIndicator } from '../ui-state.js';

export function setupStep6(cursor) {
  // Step 6 starts: cv-optim-review visible, gpt icon, credits 50, score-badge-optim visible
  $('cv-name').innerHTML = '07/02/2026 &nbsp;Senior Frontend Engi...';
  setCvIcon('gpt');
  $('credits').textContent = '50';
  $('credit-bar-fill').style.width = '50%';
  showCv('cv-optim-review');
  $('score-badge-optim').classList.add('visible');
}

export async function runStep6(cursor) {
  const viewport = $('viewport');

  // Transition depuis step 5 (no-op si exécuté individuellement)
  $('optim-modal').classList.remove('visible');

  // === STEP 6: Review optimisation ===
  updateStepIndicator(6);
  await wait(400);

  showCv('cv-optim-review');
  $('score-badge-optim').classList.add('visible');
  $('credits').textContent = '50';
  $('credit-bar-fill').style.width = '50%';

  updateStepIndicator(6);
  moveToEl(viewport, cursor, 'optim-summary-highlight');
  await wait(450);
  clickEffect(cursor);
  await wait(200);
  $('optim-change-popover').classList.remove('hidden');
  await wait(1800);
  moveToEl(viewport, cursor, 'btn-accept-optim-change');
  await wait(450);
  clickEffect(cursor);
  await wait(200);
  $('optim-change-popover').classList.add('hidden');
  $('optim-summary-highlight').classList.remove('highlight-modified');

  updateStepIndicator(6);
  moveToEl(viewport, cursor, 'btn-tout-accepter-optim');
  await wait(450);
  clickEffect(cursor);
  await wait(200);
  showCv('cv-clean');
  $('clean-version').textContent = 'v3';
  $('score-badge-clean').classList.add('visible');
  $('score-refresh-clean').classList.remove('hidden');
  $('score-refresh-clean').classList.add('spinning');
  $('score-num-clean').classList.add('hidden');
  $('score-badge-clean').style.borderColor = 'rgba(255,255,255,0.3)';
  $('btn-optimize-clean').classList.add('hidden');
  await wait(1000);

  updateStepIndicator(6);
  $('score-refresh-clean').classList.add('hidden');
  $('score-refresh-clean').classList.remove('spinning');
  $('score-num-clean').textContent = '87';
  $('score-num-clean').classList.remove('hidden');
  $('score-num-clean').style.color = 'var(--emerald)';
  $('score-badge-clean').style.borderColor = 'var(--emerald)';
  await wait(1000);
}
