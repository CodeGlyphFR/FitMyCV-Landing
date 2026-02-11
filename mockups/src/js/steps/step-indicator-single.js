import { stepLabels } from '../step-labels.js';

export function createSingleStepIndicator(stepNum) {
  const dots = [1, 2, 3, 4, 5, 6, 7].map(s => {
    let cls = 'step-dot';
    if (s === stepNum) cls += ' active';
    else if (s < stepNum) cls += ' done';
    return `<div class="${cls}" data-step="${s}"></div>`;
  }).join('');

  const label = stepLabels[stepNum] || '';

  return `
<div class="step-indicator" id="step-indicator">
  ${dots}
  <span class="step-label" id="step-label">Étape ${stepNum} — ${label}</span>
</div>`;
}
