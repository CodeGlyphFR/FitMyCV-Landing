import { initLang } from './js/i18n.js';
import { createBrowserFrame } from './html/browser-frame.js';
import { createTopBar } from './html/topbar.js';
import { createCvDropdown, createTaskDropdown } from './html/dropdowns.js';
import { createCvAreas } from './html/cv-areas.js';
import { createGeneratorModal, createOptimizationModal, createExportModal, createImportModal } from './html/modals.js';
import { createCursor } from './html/cursor-and-indicator.js';
import { runStepLoop } from './js/steps/step-runner.js';
import { setPaused } from './js/dom-helpers.js';

import { setupStep1, runStep1 } from './js/steps/step1.js';
import { setupStep2, runStep2 } from './js/steps/step2.js';
import { setupStep3, runStep3 } from './js/steps/step3.js';
import { setupStep4, runStep4 } from './js/steps/step4.js';
import { setupStep5, runStep5 } from './js/steps/step5.js';
import { setupStep6, runStep6 } from './js/steps/step6.js';
import { setupStep7, runStep7 } from './js/steps/step7.js';

const stepMap = {
  1: { setup: setupStep1, run: runStep1 },
  2: { setup: setupStep2, run: runStep2 },
  3: { setup: setupStep3, run: runStep3 },
  4: { setup: setupStep4, run: runStep4 },
  5: { setup: setupStep5, run: runStep5 },
  6: { setup: setupStep6, run: runStep6 },
  7: { setup: setupStep7, run: runStep7 },
};

initLang();

// Read step number from data attribute
const app = document.getElementById('app');
const stepNum = parseInt(app.dataset.step) || 1;

// Assemble viewport content (all templates — needed for resetAll null-safety)
const viewportContent = [
  createTopBar(),
  createCvDropdown(),
  createTaskDropdown(),
  createCvAreas(),
  createGeneratorModal(),
  createOptimizationModal(),
  createExportModal(),
  createImportModal(),
  createCursor()
].join('');

// Assemble full page (no step indicator for individual steps)
const html = createBrowserFrame(viewportContent);

// Inject into DOM
app.innerHTML = html;

// Start animation — in embed mode, wait for parent to send 'start-demo'
const isEmbed = location.search.includes('embed');
const { setup, run } = stepMap[stepNum];

if (isEmbed) {
  document.body.classList.add('embed');
  window.addEventListener('message', (e) => {
    if (e.data === 'start-demo') runStepLoop(stepNum, setup, run);
    if (e.data === 'pause-demo') setPaused(true);
    if (e.data === 'resume-demo') setPaused(false);
  });
  // Auto-start after short delay if no message received (fallback)
  setTimeout(() => {
    if (!document.body.dataset.started) {
      document.body.dataset.started = '1';
      runStepLoop(stepNum, setup, run);
    }
  }, 1000);
} else {
  window.addEventListener('load', () => {
    setTimeout(() => runStepLoop(stepNum, setup, run), 500);
  });
}
