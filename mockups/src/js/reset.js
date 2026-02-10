import { $, moveCursor } from './dom-helpers.js';
import { showCv, setCvIcon } from './ui-state.js';

export function resetAll(cursor) {
  // Hide all overlays
  $('cv-dropdown').classList.remove('visible');
  $('task-dropdown').classList.remove('visible');
  $('generator-modal').classList.remove('visible');
  $('optim-modal').classList.remove('visible');
  $('export-modal').classList.remove('visible');
  $('import-modal').classList.remove('visible');
  $('import-file-selected').classList.remove('visible');
  $('btn-import-submit').classList.add('disabled');
  $('file-ghost').classList.remove('visible');
  $('import-upload-btn').classList.remove('drag-over');
  $('import-task-item').classList.add('hidden');
  $('import-task-done').classList.add('hidden');
  $('import-task-fill').style.width = '8%';
  $('import-task-fill').classList.remove('completed');
  $('import-task-percent').innerHTML = '&mdash;';
  $('import-task-percent').style.color = '#34d399';
  $('import-task-step').textContent = 'Import PDF';
  $('task1-item').classList.remove('hidden');
  $('task2-item').classList.remove('hidden');
  $('task-footer').textContent = 'Total : 2';
  $('export-selection-mode').classList.remove('hidden');
  $('export-preview-mode').classList.add('hidden');
  var exportBody = $('export-modal-body');
  if (exportBody) exportBody.scrollTop = 0;
  var exportPreview = $('export-preview-scroll');
  if (exportPreview) exportPreview.scrollTop = 0;
  $('gen-cv-dropdown').classList.remove('visible');
  $('link1-history').classList.remove('visible');
  $('link2-history').classList.remove('visible');

  // Reset CV views
  showCv('cv-react');

  // Reset CV scroll positions
  $('cv-fullstack').scrollTop = 0;

  // Reset CV selector
  $('cv-name').innerHTML = '07/02/2026 &nbsp;Développeur Front-End React';
  setCvIcon('import');

  // Reset generator modal
  $('gen-cv-name').innerHTML = '07/02/2026 &nbsp;Développeur Full-Stack JavaScript';
  $('link1-input').value = '';
  $('link2-input').value = '';
  $('link2-row').classList.add('hidden');

  // Reset task queue progress bars
  resetTaskQueue();

  // Reset review (generation)
  $('change-popover').classList.add('hidden');
  if ($('summary-highlight')) $('summary-highlight').classList.add('highlight-modified');
  if ($('review-bar-summary')) $('review-bar-summary').style.display = '';
  if ($('review-bar-skills')) $('review-bar-skills').style.display = '';

  // Reset review (optimization)
  $('optim-change-popover').classList.add('hidden');
  if ($('optim-summary-highlight')) $('optim-summary-highlight').classList.add('highlight-modified');
  if ($('review-bar-optim-summary')) $('review-bar-optim-summary').style.display = '';
  if ($('review-bar-optim-skills')) $('review-bar-optim-skills').style.display = '';

  // Reset score badges (3 states: RefreshCw visible, score hidden)
  $('score-badge').classList.remove('visible');
  $('score-badge').style.borderColor = 'rgba(255,255,255,0.3)';
  $('score-refresh').classList.remove('spinning', 'hidden');
  $('score-num').classList.add('hidden');

  $('score-badge-clean').classList.remove('visible');
  $('score-badge-clean').style.borderColor = 'rgba(255,255,255,0.3)';
  $('score-refresh-clean').classList.remove('spinning', 'hidden');
  $('score-num-clean').classList.add('hidden');
  $('score-num-clean').textContent = '79';
  $('score-num-clean').style.color = '';

  $('score-badge-optim').classList.remove('visible');
  $('score-badge-optim').style.borderColor = 'rgba(255,255,255,0.3)';
  $('score-refresh-optim').classList.remove('spinning', 'hidden');
  $('score-num-optim').classList.add('hidden');

  // Reset cv-clean version selector back to v2
  $('clean-version').textContent = 'v2';

  // Reset optimize buttons
  $('btn-optimize').classList.add('hidden');
  $('btn-optimize-clean').classList.add('hidden');
  $('btn-optimize-optim').classList.add('hidden');

  // Reset task button
  $('btn-tasks').classList.remove('active', 'progress-btn');
  $('btn-tasks').style.removeProperty('--progress');

  // Reset credits
  $('credits').textContent = '61';
  $('credit-bar-fill').style.width = '61%';

  // Reset topbar buttons
  document.querySelectorAll('.cv-dropdown li').forEach(li => li.classList.remove('selected', 'highlighted'));
  document.querySelector('.cv-dropdown li[data-cv="react"]').classList.add('selected');

  // Reset optim modal interactions
  const sugCheckbox = $('sug-checkbox-1');
  if (sugCheckbox) sugCheckbox.classList.remove('checked');
  const sugContext = $('sug-context-1');
  if (sugContext) { sugContext.classList.remove('visible'); sugContext.textContent = ''; }
  const btnImprove = $('btn-improve-cv');
  if (btnImprove) btnImprove.classList.remove('active');

  // Reset scroll position
  const optContent = document.querySelector('.optim-content');
  if (optContent) optContent.scrollTop = 0;

  // Reset optim modal score circle
  const scoreCircle = document.querySelector('.optim-card circle:nth-child(2)');
  if (scoreCircle) {
    scoreCircle.style.transition = 'none';
    scoreCircle.style.strokeDashoffset = '351.86';
  }
  // Reset optim score number
  const optimScoreNum = document.querySelector('.score-center .score-num');
  if (optimScoreNum) optimScoreNum.textContent = '79';
  // Reset breakdown bars
  document.querySelectorAll('.score-bar-fill').forEach(bar => {
    bar.style.transition = 'none';
    bar.style.width = '0%';
  });

  // Move cursor to center
  moveCursor(cursor, 450, 300);
}

export function resetTaskQueue() {
  $('task1-fill').style.width = '35%';
  $('task1-fill').classList.remove('completed');
  $('task1-percent').textContent = '35%';
  $('task1-percent').style.color = '#34d399';
  $('task1-step').textContent = 'Expériences 2/5';

  $('task2-fill').style.width = '15%';
  $('task2-fill').classList.remove('completed');
  $('task2-percent').textContent = '15%';
  $('task2-percent').style.color = '#34d399';
  $('task2-step').textContent = 'Classification';
}
