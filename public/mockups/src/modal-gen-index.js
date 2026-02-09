import { createGeneratorModal } from './html/modals.js';
import { createCursor } from './html/cursor-and-indicator.js';
import { $, moveToEl, clickEffect, wait } from './js/dom-helpers.js';

/**
 * Standalone mockup: generator modal at fixed 420×402px.
 * Link2 space always reserved (visibility:hidden), no layout shifts.
 * "Ajouter un lien" button always visible.
 */
const MOCKUP_W = 420;
const MOCKUP_H = 402;

const style = document.createElement('style');
style.textContent = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin:0; padding:0; overflow:hidden; background:var(--modal-bg); }
  #modal-viewport {
    position:relative;
    width:${MOCKUP_W}px; height:${MOCKUP_H}px;
    transform-origin:0 0;
  }

  #generator-modal {
    display:block !important;
    position:static !important;
    opacity:1 !important;
    pointer-events:auto !important;
  }
  #generator-modal > .modal-backdrop-bg { display:none !important; }
  #generator-modal > .modal {
    width:${MOCKUP_W}px !important;
    max-width:none !important;
    max-height:none !important;
    transform:none !important;
    opacity:1 !important;
    border:none !important;
    border-radius:0 !important;
    box-shadow:none !important;
  }
  .modal-close { display:none !important; }
  #gen-cv-name { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; min-width:0; }

  /* Link2: space always reserved, just toggle visibility */
  #link2-row.hidden {
    display:flex !important;
    visibility:hidden !important;
  }
`;
document.head.appendChild(style);

const app = document.getElementById('app');
app.innerHTML = `
  <div id="modal-viewport">
    ${createGeneratorModal()}
    ${createCursor()}
  </div>
`;

$('generator-modal').classList.add('visible');

const viewport = $('modal-viewport');
const cursor = $('cursor');

function resetModal() {
  $('gen-cv-name').innerHTML = '07/02/2026 &nbsp;Développeur Full-Stack JavaScript';
  $('gen-cv-dropdown').classList.remove('visible');
  if ($('gen-cv-data-option')) $('gen-cv-data-option').classList.remove('highlighted');
  $('link1-input').value = '';
  $('link2-input').value = '';
  $('link1-history').classList.remove('visible');
  if ($('link2-history')) $('link2-history').classList.remove('visible');
  if ($('lh-item-1')) $('lh-item-1').classList.remove('highlighted');
  if ($('lh2-item-2')) $('lh2-item-2').classList.remove('highlighted');
  $('link2-row').classList.add('hidden');
}

let firstRun = true;

async function animate() {
  try {
    if (firstRun) {
      // First run: just set initial state, no fade
      firstRun = false;
      resetModal();
      cursor.style.opacity = '0';
      await wait(600);
    } else {
      // Hide link2 before fade so it's already gone
      $('link2-row').classList.add('hidden');
      cursor.style.opacity = '0';
      viewport.style.transition = 'opacity 0.4s ease';
      viewport.style.opacity = '0';
      await wait(500);
      // Reset while fully invisible
      viewport.style.transition = 'none';
      resetModal();
      // Force reflow so opacity stays 0 during reset
      viewport.offsetHeight;
      // Fade back in
      viewport.style.transition = 'opacity 0.4s ease';
      viewport.style.opacity = '1';
      await wait(500);
    }

    cursor.style.opacity = '1';

    // 1. Select CV reference
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

    // 2. Select first link from history
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

    // 3. Click "Ajouter un lien" — link2 becomes visible (space was already reserved)
    moveToEl(viewport, cursor, 'add-link-btn');
    await wait(600);
    clickEffect(cursor);
    await wait(300);
    $('link2-row').classList.remove('hidden');
    await wait(400);

    // 4. Select second link from history
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

    // 5. Click Valider
    moveToEl(viewport, cursor, 'btn-valider');
    await wait(600);
    clickEffect(cursor);
    await wait(600);
  } catch(e) {}

  setTimeout(animate, 200);
}

window.addEventListener('load', () => {
  setTimeout(animate, 500);
});
