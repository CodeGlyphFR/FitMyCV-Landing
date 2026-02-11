import { ICON_IMPORT } from './icons.js';
import { t } from '../js/i18n.js';

export function createCvDropdown() {
  return `
    <div class="cv-dropdown" id="cv-dropdown">
      <ul>
        <li class="selected" data-cv="react">
          <span class="dd-icon-wrap"><img src="${ICON_IMPORT}" style="width:16px;height:16px"></span>
          <span class="dd-date">07/02/2026</span>
          <span class="dd-name">Développeur Front-End React</span>
        </li>
        <li data-cv="fullstack" id="dd-fullstack">
          <span class="dd-icon-wrap"><img src="${ICON_IMPORT}" style="width:16px;height:16px"></span>
          <span class="dd-date">07/02/2026</span>
          <span class="dd-name">Développeur Full-Stack JavaScript</span>
        </li>
        <li data-cv="uiux">
          <span class="dd-icon-wrap"><img src="${ICON_IMPORT}" style="width:16px;height:16px"></span>
          <span class="dd-date">07/02/2026</span>
          <span class="dd-name">Ingénieur UI/UX Front-End</span>
        </li>
      </ul>
    </div>`;
}

export function createTaskDropdown() {
  return `
    <div class="task-dropdown" id="task-dropdown">
      <div class="task-item" id="task1-item">
        <div class="task-line1">
          <div class="task-line1-left">
            <span class="task-time">14:23</span>
            <span class="task-sep">|</span>
            <span class="task-title-text">Senior Frontend Engineer (TechVision)</span>
          </div>
          <span class="task-percent" id="task1-percent">35%</span>
        </div>
        <div class="task-progress-bar"><div class="task-progress-fill" id="task1-fill" style="width:35%"></div></div>
        <div class="task-step-label" id="task1-step">${t('task.experiences', {done: 2, total: 5})}</div>
      </div>
      <div class="task-item" id="task2-item">
        <div class="task-line1">
          <div class="task-line1-left">
            <span class="task-time">14:23</span>
            <span class="task-sep">|</span>
            <span class="task-title-text">Lead Développeur React (StartupFlow)</span>
          </div>
          <span class="task-percent" id="task2-percent">15%</span>
        </div>
        <div class="task-progress-bar"><div class="task-progress-fill" id="task2-fill" style="width:15%"></div></div>
        <div class="task-step-label" id="task2-step">${t('task.classification')}</div>
      </div>
      <div class="task-item hidden" id="import-task-item">
        <div class="task-line1">
          <div class="task-line1-left">
            <span class="task-time">14:22</span>
            <span class="task-sep">|</span>
            <span class="task-title-text">Thomas_Lefevre_CV.pdf</span>
          </div>
          <span class="task-percent" id="import-task-percent">&mdash;</span>
        </div>
        <div class="task-progress-bar"><div class="task-progress-fill" id="import-task-fill" style="width:8%"></div></div>
        <div class="task-step-label" id="import-task-step">${t('task.importPdf')}</div>
      </div>
      <div class="task-item hidden" id="import-task-done">
        <div class="task-line1">
          <div class="task-line1-left">
            <span class="task-title-text">Thomas_Lefevre_CV.pdf</span>
          </div>
          <span class="task-percent" style="color:#34d399">${t('status.done')}</span>
        </div>
        <div class="task-step-label">14:22 <span style="color:rgba(255,255,255,0.3)">|</span> ${t('task.importPdf')}</div>
      </div>
      <div class="task-footer" id="task-footer">${t('count.total', {n: 2})}</div>
    </div>`;
}
