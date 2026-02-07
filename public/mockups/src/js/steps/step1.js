import { $, moveToEl, clickEffect, wait, slowScroll, moveCursor } from '../dom-helpers.js';
import { showCv, setCvIcon, updateStepIndicator } from '../ui-state.js';
import { stepLabels } from '../step-labels.js';

// Step 1 starts from default resetAll state — no extra setup needed
export function setupStep1(cursor) {
  // resetAll already sets: cv-react visible, credits 61, import icon
  // No additional setup required
}

export async function runStep1(cursor) {
  const viewport = $('viewport');

  // === STEP 1: Import PDF ===
  updateStepIndicator(1, stepLabels);
  moveToEl(viewport, cursor, 'btn-import');
  await wait(600);
  clickEffect(cursor);
  await wait(300);
  $('import-modal').classList.add('visible');
  await wait(800);

  // --- Drag PDF file from outside the viewport ---
  updateStepIndicator(1, stepLabels);
  moveCursor(cursor, viewport.offsetWidth + 50, 120);
  await wait(600);
  $('file-ghost').classList.add('visible');
  await wait(100);
  moveToEl(viewport, cursor, 'import-upload-btn');
  await wait(300);
  $('import-upload-btn').classList.add('drag-over');
  await wait(400);
  $('file-ghost').classList.remove('visible');
  await wait(150);
  $('import-upload-btn').classList.remove('drag-over');
  $('import-file-selected').classList.add('visible');
  await wait(400);
  $('btn-import-submit').classList.remove('disabled');
  await wait(400);
  moveToEl(viewport, cursor, 'btn-import-submit');
  await wait(500);
  clickEffect(cursor);
  await wait(300);
  $('import-modal').classList.remove('visible');
  $('credits').textContent = '60';
  $('credit-bar-fill').style.width = '60%';
  await wait(500);

  // --- Task manager shows import progress ---
  updateStepIndicator(1, stepLabels);
  moveToEl(viewport, cursor, 'btn-tasks');
  await wait(450);
  clickEffect(cursor);
  await wait(200);
  $('task1-item').classList.add('hidden');
  $('task2-item').classList.add('hidden');
  $('import-task-item').classList.remove('hidden');
  $('task-footer').textContent = 'Total : 1';
  $('task-dropdown').classList.add('visible');
  await wait(600);

  $('import-task-fill').style.width = '25%';
  $('import-task-percent').textContent = '25%';
  $('import-task-step').textContent = 'Import PDF';
  await wait(600);

  $('import-task-fill').style.width = '55%';
  $('import-task-percent').textContent = '55%';
  $('import-task-step').textContent = 'Conversion IA';
  await wait(600);

  $('import-task-fill').style.width = '85%';
  $('import-task-percent').textContent = '85%';
  $('import-task-step').textContent = 'Structuration';
  await wait(600);

  $('import-task-fill').style.width = '100%';
  $('import-task-fill').classList.add('completed');
  $('import-task-percent').textContent = 'Terminé';
  $('import-task-percent').style.color = '#34d399';
  $('import-task-step').textContent = 'Terminé';
  await wait(800);

  // --- Import complete — CV displayed ---
  updateStepIndicator(1, stepLabels);
  $('task-dropdown').classList.remove('visible');
  $('import-task-item').classList.add('hidden');
  $('cv-name').innerHTML = '07/02/2026 &nbsp;Développeur Full-Stack JavaScript';
  setCvIcon('import');
  document.querySelectorAll('.cv-dropdown li').forEach(li => li.classList.remove('selected'));
  $('dd-fullstack').classList.add('selected');
  showCv('cv-fullstack');
  await wait(500);
  const cvFullstack = $('cv-fullstack');
  const skillsSection = $('fs-skills');
  const expSection = $('fs-experience');
  await slowScroll(cvFullstack, skillsSection.offsetTop - 10, 800);
  await wait(800);
  await slowScroll(cvFullstack, expSection.offsetTop - 10, 800);
  await wait(800);
  await slowScroll(cvFullstack, cvFullstack.scrollHeight, 1000);
  await wait(700);
  await slowScroll(cvFullstack, 0, 500);
  await wait(300);
}
