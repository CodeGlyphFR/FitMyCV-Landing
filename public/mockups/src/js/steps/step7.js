import { $, moveToEl, clickEffect, wait, slowScroll } from '../dom-helpers.js';
import { showCv, setCvIcon, updateStepIndicator } from '../ui-state.js';
import { stepLabels } from '../step-labels.js';

export function setupStep7(cursor) {
  // Step 7 starts: cv-clean visible, gpt icon, credits 50,
  // version v3, score-badge-clean visible, score 87, border green
  $('cv-name').innerHTML = '07/02/2026 &nbsp;Senior Frontend Engi...';
  setCvIcon('gpt');
  $('credits').textContent = '50';
  $('credit-bar-fill').style.width = '50%';
  showCv('cv-clean');
  $('clean-version').textContent = 'v3';
  $('score-badge-clean').classList.add('visible');
  $('score-refresh-clean').classList.add('hidden');
  $('score-num-clean').textContent = '87';
  $('score-num-clean').classList.remove('hidden');
  $('score-num-clean').style.color = 'var(--emerald)';
  $('score-badge-clean').style.borderColor = 'var(--emerald)';
}

export async function runStep7(cursor) {
  const viewport = $('viewport');

  // === STEP 7: Export ===
  updateStepIndicator(7, stepLabels);
  moveToEl(viewport, cursor, 'btn-export');
  await wait(450);
  clickEffect(cursor);
  await wait(200);
  $('export-modal').classList.add('visible');
  await wait(1200);

  updateStepIndicator(7, stepLabels);
  var exportBody = $('export-modal-body');
  await slowScroll(exportBody, exportBody.scrollHeight, 1200);
  await wait(600);
  moveToEl(viewport, cursor, 'btn-preview-export');
  await wait(500);
  clickEffect(cursor);
  await wait(300);
  $('export-selection-mode').classList.add('hidden');
  $('export-preview-mode').classList.remove('hidden');
  await wait(800);
  var previewScroll = $('export-preview-scroll');
  await slowScroll(previewScroll, previewScroll.scrollHeight, 1800);
  await wait(800);

  updateStepIndicator(7, stepLabels);
  moveToEl(viewport, cursor, 'btn-export-final');
  await wait(500);
  clickEffect(cursor);
  await wait(300);
  $('export-modal').classList.remove('visible');
  $('credits').textContent = '48';
  $('credit-bar-fill').style.width = '48%';
  await wait(800);
}
