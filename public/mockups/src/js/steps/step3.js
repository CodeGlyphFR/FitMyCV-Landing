import { $, moveToEl, clickEffect, wait } from '../dom-helpers.js';
import { showCv, setCvIcon, updateStepIndicator } from '../ui-state.js';
import { stepLabels } from '../step-labels.js';

export function setupStep3(cursor) {
  // Step 3 starts: cv-review visible, gpt icon, credits 54, score-badge visible
  $('cv-name').innerHTML = '07/02/2026 &nbsp;Senior Frontend Engineer';
  setCvIcon('gpt');
  $('credits').textContent = '54';
  $('credit-bar-fill').style.width = '54%';
  showCv('cv-review');
  $('score-badge').classList.add('visible');
}

export async function runStep3(cursor) {
  const viewport = $('viewport');

  // Transition depuis step 2 (no-op si exécuté individuellement)
  $('task-dropdown').classList.remove('visible');
  $('btn-tasks').classList.remove('progress-btn');
  $('btn-tasks').style.removeProperty('--progress');
  $('cv-name').innerHTML = '07/02/2026 &nbsp;Senior Frontend Engineer';
  setCvIcon('gpt');
  showCv('cv-review');
  $('score-badge').classList.add('visible');

  // === STEP 3: Mode Review ===
  updateStepIndicator(3, stepLabels);
  await wait(800);

  updateStepIndicator(3, stepLabels);
  moveToEl(viewport, cursor, 'summary-highlight');
  await wait(450);
  clickEffect(cursor);
  await wait(200);
  $('change-popover').classList.remove('hidden');
  await wait(1800);
  moveToEl(viewport, cursor, 'btn-accept-change');
  await wait(450);
  clickEffect(cursor);
  await wait(200);
  $('change-popover').classList.add('hidden');
  $('summary-highlight').classList.remove('highlight-modified');
  await wait(500);

  updateStepIndicator(3, stepLabels);
  moveToEl(viewport, cursor, 'btn-tout-accepter');
  await wait(450);
  clickEffect(cursor);
  await wait(200);
  showCv('cv-clean');
  $('score-badge-clean').classList.add('visible');
  $('cv-name').innerHTML = '07/02/2026 &nbsp;Senior Frontend Engi...';
  await wait(1200);
}
