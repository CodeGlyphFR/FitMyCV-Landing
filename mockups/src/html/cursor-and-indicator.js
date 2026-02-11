import { t } from '../js/i18n.js';

export function createCursor() {
  return `
    <div class="cursor" id="cursor" style="left:450px;top:300px">
      <svg viewBox="0 0 24 24" fill="white" stroke="rgba(0,0,0,0.3)" stroke-width="1">
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z"/>
      </svg>
      <div class="click-ring"></div>
      <div class="file-ghost" id="file-ghost">
        <svg viewBox="0 0 24 24" fill="none" style="width:14px;height:14px">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" fill="#ef4444" opacity="0.9"/>
          <path d="M14 2v6h6" stroke="#fca5a5" stroke-width="1.5" fill="none"/>
          <text x="6" y="17" font-size="5.5" fill="white" font-weight="bold" font-family="Arial">PDF</text>
        </svg>
        <span>Thomas_Lefevre_CV.pdf</span>
      </div>
    </div>`;
}

export function createStepIndicator() {
  return `
<div class="step-indicator" id="step-indicator">
  <div class="step-dot active" data-step="1"></div>
  <div class="step-dot" data-step="2"></div>
  <div class="step-dot" data-step="3"></div>
  <div class="step-dot" data-step="4"></div>
  <div class="step-dot" data-step="5"></div>
  <div class="step-dot" data-step="6"></div>
  <div class="step-dot" data-step="7"></div>
  <span class="step-label" id="step-label">${t('stepIndicator', {n: 1, label: t('step.1')})}</span>
</div>`;
}
