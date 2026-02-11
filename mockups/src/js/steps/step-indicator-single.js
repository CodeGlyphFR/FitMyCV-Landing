import { t } from '../i18n.js';

export function createSingleStepIndicator(stepNum) {
  const dots = [1, 2, 3, 4, 5, 6, 7].map(s => {
    let cls = 'step-dot';
    if (s === stepNum) cls += ' active';
    else if (s < stepNum) cls += ' done';
    return `<div class="${cls}" data-step="${s}"></div>`;
  }).join('');

  return `
<div class="step-indicator" id="step-indicator">
  ${dots}
  <span class="step-label" id="step-label">${t('stepIndicator', {n: stepNum, label: t('step.' + stepNum)})}</span>
</div>`;
}
