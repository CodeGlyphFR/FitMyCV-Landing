import { createBrowserFrame } from './html/browser-frame.js';
import { createTopBar } from './html/topbar.js';
import { createCvDropdown, createTaskDropdown } from './html/dropdowns.js';
import { createCvAreas } from './html/cv-areas.js';
import { createGeneratorModal, createOptimizationModal, createExportModal, createImportModal } from './html/modals.js';
import { createCursor, createStepIndicator } from './html/cursor-and-indicator.js';
import { runAnimation } from './js/animation.js';

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

// Start animation on load
window.addEventListener('load', () => {
  setTimeout(runAnimation, 500);
});
