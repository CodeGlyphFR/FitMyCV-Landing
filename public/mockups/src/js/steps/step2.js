import { $, moveToEl, clickEffect, wait } from '../dom-helpers.js';
import { showCv, setCvIcon, updateStepIndicator } from '../ui-state.js';
import { stepLabels } from '../step-labels.js';

export function setupStep2(cursor) {
  // Step 2 starts after import: fullstack CV visible, credits 60, dd-fullstack selected
  $('cv-name').innerHTML = '07/02/2026 &nbsp;Développeur Full-Stack JavaScript';
  setCvIcon('import');
  $('credits').textContent = '60';
  $('credit-bar-fill').style.width = '60%';
  document.querySelectorAll('.cv-dropdown li').forEach(li => li.classList.remove('selected'));
  $('dd-fullstack').classList.add('selected');
  showCv('cv-fullstack');
}

export async function runStep2(cursor) {
  const viewport = $('viewport');

  // === STEP 2: Génération IA ===
  updateStepIndicator(2, stepLabels);
  moveToEl(viewport, cursor, 'btn-ai');
  await wait(600);
  clickEffect(cursor);
  await wait(300);
  $('generator-modal').classList.add('visible');
  await wait(800);

  updateStepIndicator(2, stepLabels);
  moveToEl(viewport, cursor, 'gen-cv-select');
  await wait(600);
  clickEffect(cursor);
  await wait(300);
  $('gen-cv-dropdown').classList.add('visible');
  await wait(500);
  moveToEl(viewport, cursor, 'gen-cv-data-option');
  await wait(500);
  $('gen-cv-data-option').classList.add('highlighted');
  await wait(500);
  clickEffect(cursor);
  await wait(300);
  $('gen-cv-dropdown').classList.remove('visible');
  $('gen-cv-data-option').classList.remove('highlighted');
  $('gen-cv-name').innerHTML = '07/02/2026 &nbsp;Ingénieur UI/UX Front-End';
  await wait(500);

  updateStepIndicator(2, stepLabels);
  moveToEl(viewport, cursor, 'link1-history-btn');
  await wait(600);
  clickEffect(cursor);
  await wait(300);
  $('link1-history').classList.add('visible');
  await wait(500);
  moveToEl(viewport, cursor, 'lh-item-1');
  await wait(500);
  $('lh-item-1').classList.add('highlighted');
  await wait(500);
  clickEffect(cursor);
  await wait(300);
  $('link1-history').classList.remove('visible');
  $('lh-item-1').classList.remove('highlighted');
  $('link1-input').value = 'https://welcometothejungle.com/fr/companies/techvision/jobs/senior-frontend';
  await wait(500);

  updateStepIndicator(2, stepLabels);
  moveToEl(viewport, cursor, 'add-link-btn');
  await wait(600);
  clickEffect(cursor);
  await wait(300);
  $('link2-row').classList.remove('hidden');
  await wait(500);

  updateStepIndicator(2, stepLabels);
  moveToEl(viewport, cursor, 'link2-history-btn');
  await wait(600);
  clickEffect(cursor);
  await wait(300);
  $('link2-history').classList.add('visible');
  await wait(500);
  moveToEl(viewport, cursor, 'lh2-item-2');
  await wait(500);
  $('lh2-item-2').classList.add('highlighted');
  await wait(500);
  clickEffect(cursor);
  await wait(300);
  $('link2-history').classList.remove('visible');
  $('lh2-item-2').classList.remove('highlighted');
  $('link2-input').value = 'https://indeed.com/viewjob?jk=a8f3c2d1e9b74560';
  await wait(500);

  updateStepIndicator(2, stepLabels);
  moveToEl(viewport, cursor, 'btn-valider');
  await wait(600);
  clickEffect(cursor);
  await wait(300);
  $('generator-modal').classList.remove('visible');
  $('credits').textContent = '54';
  $('credit-bar-fill').style.width = '54%';
  $('cv-name').innerHTML = '07/02/2026 &nbsp;Senior Frontend...';
  setCvIcon('import');
  await wait(500);

  updateStepIndicator(2, stepLabels);
  $('import-task-item').classList.add('hidden');
  $('import-task-done').classList.remove('hidden');
  $('task1-item').classList.remove('hidden');
  $('task2-item').classList.remove('hidden');
  $('task-footer').textContent = 'Total : 3';
  $('btn-tasks').classList.add('progress-btn');
  $('btn-tasks').style.setProperty('--progress', '25%');
  moveToEl(viewport, cursor, 'btn-tasks');
  await wait(450);
  clickEffect(cursor);
  await wait(200);
  $('task-dropdown').classList.add('visible');

  await wait(300);
  $('task1-fill').style.width = '55%'; $('task1-percent').textContent = '55%';
  $('task1-step').textContent = 'Projets 1/3';
  $('task2-fill').style.width = '30%'; $('task2-percent').textContent = '30%';
  $('task2-step').textContent = 'Expériences 1/5';
  $('btn-tasks').style.setProperty('--progress', '40%');
  await wait(700);

  $('task1-fill').style.width = '75%'; $('task1-percent').textContent = '75%';
  $('task1-step').textContent = 'Compétences';
  $('task2-fill').style.width = '50%'; $('task2-percent').textContent = '50%';
  $('task2-step').textContent = 'Projets 2/3';
  $('btn-tasks').style.setProperty('--progress', '65%');
  await wait(700);

  $('task1-fill').style.width = '100%'; $('task1-percent').textContent = '100%';
  $('task1-step').textContent = 'Terminé';
  $('task1-fill').classList.add('completed');
  $('task1-percent').style.color = '#34d399';
  $('task1-percent').textContent = 'Terminé';
  $('task2-fill').style.width = '75%'; $('task2-percent').textContent = '75%';
  $('task2-step').textContent = 'Résumé';
  $('btn-tasks').style.setProperty('--progress', '85%');
  await wait(800);
}
