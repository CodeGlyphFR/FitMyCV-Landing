import { initLang } from './js/i18n.js';
import { createBrowserFrame } from './html/browser-frame.js';
import { createTopBar } from './html/topbar.js';
import { createCvDropdown, createTaskDropdown } from './html/dropdowns.js';
import { createCvAreas } from './html/cv-areas.js';
import { createGeneratorModal, createOptimizationModal, createExportModal, createImportModal } from './html/modals.js';
import { createCursor, createStepIndicator } from './html/cursor-and-indicator.js';
import { runAnimation } from './js/animation.js';
import { setPaused } from './js/dom-helpers.js';

initLang();

// Assemble viewport content
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

// Assemble full page
const html = createBrowserFrame(viewportContent) + createStepIndicator();

// Inject into DOM
document.getElementById('app').innerHTML = html;

// Start animation — in embed mode, wait for parent to send 'start-demo'
const isEmbed = location.search.includes('embed');

if (isEmbed) {
  window.addEventListener('message', (e) => {
    if (e.data === 'start-demo') runAnimation();
    if (e.data === 'pause-demo') setPaused(true);
    if (e.data === 'resume-demo') setPaused(false);
  });
} else {
  window.addEventListener('load', () => {
    setTimeout(runAnimation, 500);
  });
}
