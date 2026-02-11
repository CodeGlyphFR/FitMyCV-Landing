import { ICON_IMPORT, ICON_FR, ICON_GB, ICON_ADD } from './icons.js';
import { t } from '../js/i18n.js';

export function createGeneratorModal() {
  return `
    <div class="modal-overlay" id="generator-modal">
      <div class="modal-backdrop-bg"></div>
      <div class="modal" id="generator-content">
        <div class="modal-header">
          <span class="modal-title">${t('genModal.title')}</span>
          <button class="modal-close"><svg style="width:20px;height:20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        </div>

        <div class="modal-body">
          <div class="form-label">${t('genModal.refCv')}</div>
          <div class="form-select" id="gen-cv-select">
            <span class="select-icon-wrap"><img src="${ICON_IMPORT}" style="width:16px;height:16px"></span>
            <span id="gen-cv-name">07/02/2026 &nbsp;Développeur Full-Stack JavaScript</span>
            <span style="margin-left:4px"><img src="${ICON_FR}" style="width:16px;height:12px"></span>
            <span class="select-arrow">&#9662;</span>

            <div class="modal-dropdown" id="gen-cv-dropdown">
              <ul>
                <li style="color:var(--emerald-light);font-weight:500">
                  <span style="font-size:18px">&#10024;</span>
                  <span>${t('genModal.createNew')}</span>
                </li>
                <li class="separator"></li>
                <li>
                  <span class="dd-icon-wrap"><img src="${ICON_IMPORT}" style="width:16px;height:16px"></span>
                  <span style="font-size:11px;color:var(--text-dimmer)">07/02/2026</span>
                  <span class="dd-name">Développeur Front-End React</span>
                  <span style="margin-left:auto"><img src="${ICON_FR}" style="width:16px;height:12px"></span>
                </li>
                <li class="selected">
                  <span class="dd-icon-wrap"><img src="${ICON_IMPORT}" style="width:16px;height:16px"></span>
                  <span style="font-size:11px;color:var(--text-dimmer)">07/02/2026</span>
                  <span class="dd-name">Développeur Full-Stack JavaScript</span>
                  <span style="margin-left:auto"><img src="${ICON_FR}" style="width:16px;height:12px"></span>
                </li>
                <li id="gen-cv-data-option">
                  <span class="dd-icon-wrap"><img src="${ICON_IMPORT}" style="width:16px;height:16px"></span>
                  <span style="font-size:11px;color:var(--text-dimmer)">07/02/2026</span>
                  <span class="dd-name">Ingénieur UI/UX Front-End</span>
                  <span style="margin-left:auto"><img src="${ICON_FR}" style="width:16px;height:12px"></span>
                </li>
              </ul>
            </div>
          </div>

          <div class="form-label">${t('genModal.jobLinks')}</div>

          <div id="link-fields">
            <div class="link-input-row">
              <div class="link-history-btn" id="link1-history-btn">&#128203;</div>
              <input class="link-input" id="link1-input" type="text" placeholder="${t('genModal.linkPlaceholder')}" readonly>
              <button class="link-remove">&#10005;</button>

              <div class="link-history-dropdown" id="link1-history">
                <div class="lh-header">${t('genModal.recentLinks')}</div>
                <ul>
                  <li id="lh-item-1">
                    <span class="lh-content">
                      <img src="${ICON_GB}" style="width:16px;height:12px">
                      <span class="lh-title">Senior Frontend Engineer (TechVision)</span>
                    </span>
                    <span class="lh-remove">&#10005;</span>
                  </li>
                  <li id="lh-item-2">
                    <span class="lh-content">
                      <img src="${ICON_FR}" style="width:16px;height:12px">
                      <span class="lh-title">Lead Développeur React (StartupFlow)</span>
                    </span>
                    <span class="lh-remove">&#10005;</span>
                  </li>
                  <li>
                    <span class="lh-content">
                      <img src="${ICON_FR}" style="width:16px;height:12px">
                      <span class="lh-title">Développeur Front-End Senior (DigiCraft)</span>
                    </span>
                    <span class="lh-remove">&#10005;</span>
                  </li>
                  <li>
                    <span class="lh-content">
                      <img src="${ICON_FR}" style="width:16px;height:12px">
                      <span class="lh-title">Ingénieur UI/UX React (WebFactory)</span>
                    </span>
                    <span class="lh-remove">&#10005;</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="link-input-row hidden" id="link2-row">
              <div class="link-history-btn" id="link2-history-btn">&#128203;</div>
              <input class="link-input" id="link2-input" type="text" placeholder="${t('genModal.linkPlaceholder')}" readonly>
              <button class="link-remove">&#10005;</button>

              <div class="link-history-dropdown" id="link2-history">
                <div class="lh-header">${t('genModal.recentLinks')}</div>
                <ul>
                  <li>
                    <span class="lh-content">
                      <img src="${ICON_GB}" style="width:16px;height:12px">
                      <span class="lh-title">Senior Frontend Engineer (TechVision)</span>
                    </span>
                    <span class="lh-remove">&#10005;</span>
                  </li>
                  <li id="lh2-item-2">
                    <span class="lh-content">
                      <img src="${ICON_FR}" style="width:16px;height:12px">
                      <span class="lh-title">Lead Développeur React (StartupFlow)</span>
                    </span>
                    <span class="lh-remove">&#10005;</span>
                  </li>
                  <li>
                    <span class="lh-content">
                      <img src="${ICON_FR}" style="width:16px;height:12px">
                      <span class="lh-title">Développeur Front-End Senior (DigiCraft)</span>
                    </span>
                    <span class="lh-remove">&#10005;</span>
                  </li>
                  <li>
                    <span class="lh-content">
                      <img src="${ICON_FR}" style="width:16px;height:12px">
                      <span class="lh-title">Ingénieur UI/UX React (WebFactory)</span>
                    </span>
                    <span class="lh-remove">&#10005;</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div style="display:flex;justify-content:flex-end">
            <div class="add-link-btn" id="add-link-btn">
              <img src="${ICON_ADD}" style="width:12px;height:12px">
              ${t('genModal.addLink')}
            </div>
          </div>

          <div class="form-label">${t('genModal.pdfOffers')}</div>
          <div class="pdf-upload">
            <img src="${ICON_IMPORT}" style="width:20px;height:20px;opacity:0.7">
            ${t('genModal.choosePdf')}
          </div>

          <div class="modal-actions">
            <button class="btn-cancel">${t('genModal.cancel')}</button>
            <button class="btn-validate" id="btn-valider">${t('genModal.validate')}</button>
          </div>
        </div>
      </div>
    </div>`;
}

export function createOptimizationModal() {
  return `
    <div class="modal-overlay" id="optim-modal">
      <div class="modal-backdrop-bg"></div>
      <div class="modal optim-modal">
        <div class="optim-header-section">
          <div class="optim-title-wrap">
            <div class="optim-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            </div>
            <h3>${t('optimModal.title')}</h3>
          </div>
          <button class="modal-close"><svg style="width:20px;height:20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        </div>

        <div class="optim-content">
          <div class="optim-grid">
            <div class="optim-card">
              <h4>&#128202; ${t('optimModal.matchScore')}</h4>
              <div class="score-circle-wrap">
                <svg viewBox="0 0 128 128">
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#f97316"/>
                      <stop offset="100%" stop-color="#ea580c"/>
                    </linearGradient>
                  </defs>
                  <circle cx="64" cy="64" r="56" stroke="#e5e7eb" stroke-width="8" fill="none" opacity="0.2"/>
                  <circle cx="64" cy="64" r="56" stroke="url(#scoreGradient)" stroke-width="8" fill="none"
                    stroke-linecap="round"
                    stroke-dasharray="351.86"
                    stroke-dashoffset="73.89"
                    style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.1))"/>
                </svg>
                <div class="score-center" style="background:var(--orange-500)">
                  <span class="score-num">79</span>
                  <span class="score-den">/100</span>
                </div>
              </div>

              <h4 style="margin-top:8px">&#128203; ${t('optimModal.scoreBreakdown')}</h4>
              <div class="score-breakdown">
                <div class="score-row">
                  <span class="sr-left"><span class="sr-emoji">&#128187;</span><span class="sr-label">${t('optimModal.technicalSkills')}</span></span>
                  <span class="sr-value">26/35</span>
                </div>
                <div class="score-bar-wrap"><div class="score-bar-fill fill-blue" style="width:74%"></div></div>

                <div class="score-row">
                  <span class="sr-left"><span class="sr-emoji">&#128188;</span><span class="sr-label">${t('optimModal.experience')}</span></span>
                  <span class="sr-value">24/30</span>
                </div>
                <div class="score-bar-wrap"><div class="score-bar-fill fill-purple" style="width:80%"></div></div>

                <div class="score-row">
                  <span class="sr-left"><span class="sr-emoji">&#127891;</span><span class="sr-label">${t('optimModal.education')}</span></span>
                  <span class="sr-value">17/20</span>
                </div>
                <div class="score-bar-wrap"><div class="score-bar-fill fill-green" style="width:85%"></div></div>

                <div class="score-row">
                  <span class="sr-left"><span class="sr-emoji">&#128172;</span><span class="sr-label">${t('optimModal.softSkillsLangs')}</span></span>
                  <span class="sr-value">11/15</span>
                </div>
                <div class="score-bar-wrap"><div class="score-bar-fill fill-orange" style="width:73%"></div></div>
              </div>
            </div>

            <div class="optim-card">
              <h4>&#128161; ${t('optimModal.suggestions')}</h4>

              <div class="suggestion-item high" id="suggestion-1">
                <div class="sug-header">
                  <div class="sug-left">
                    <div class="sug-checkbox" id="sug-checkbox-1"></div>
                    <span class="sug-badge high">&#128293; ${t('optimModal.high')}</span>
                  </div>
                  <span class="sug-points">${t('optimModal.points', {n: 5})}</span>
                </div>
                <h5>Highlight Testing &amp; Performance Tools</h5>
                <p>Add specific experience with testing frameworks (Jest, Cypress) and performance monitoring tools (Lighthouse, Web Vitals) to better match the job requirements.</p>
                <div class="sug-context" id="sug-context-1"></div>
              </div>

              <div class="suggestion-item medium">
                <div class="sug-header">
                  <div class="sug-left">
                    <div class="sug-checkbox"></div>
                    <span class="sug-badge medium">&#9889; ${t('optimModal.medium')}</span>
                  </div>
                  <span class="sug-points">${t('optimModal.points', {n: 3})}</span>
                </div>
                <h5>Detail Design System Experience</h5>
                <p>Include explicit examples of building or contributing to design systems and component libraries to align with the role's frontend architecture expectations.</p>
              </div>

            </div>
          </div>

          <div class="optim-grid">
            <div class="missing-skills-card">
              <h4>&#10060; ${t('optimModal.missingSkills')}</h4>
              <div class="skills-tags">
                <span class="skill-tag missing">Web Vitals</span>
                <span class="skill-tag missing">Cypress</span>
                <span class="skill-tag missing">Design Systems</span>
                <span class="skill-tag missing">WCAG Accessibility</span>
                <span class="skill-tag missing">Micro-Frontends</span>
              </div>
            </div>
            <div class="matching-skills-card">
              <h4>&#9989; ${t('optimModal.matchingSkills')}</h4>
              <div class="skills-tags">
                <span class="skill-tag matching"><span class="check">&#10003;</span> React</span>
                <span class="skill-tag matching"><span class="check">&#10003;</span> TypeScript</span>
                <span class="skill-tag matching"><span class="check">&#10003;</span> Component Architecture</span>
                <span class="skill-tag matching"><span class="check">&#10003;</span> Performance Optimization</span>
                <span class="skill-tag matching"><span class="check">&#10003;</span> REST APIs</span>
                <span class="skill-tag matching" style="opacity:0.6">${t('optimModal.moreOthers', {n: 7})}</span>
              </div>
            </div>
          </div>

          <div class="optim-footer-section">
            <button class="btn-improve" id="btn-improve-cv">
              ${t('optimModal.improveCv')}
              <span class="improve-count" id="improve-count">1</span>
            </button>
            <button class="btn-cancel">${t('optimModal.close')}</button>
          </div>
        </div>
      </div>
    </div>`;
}

export function createExportModal() {
  return `
    <div class="modal-overlay" id="export-modal">
      <div class="modal-backdrop-bg"></div>
      <div class="modal export-modal-inner">

        <div id="export-selection-mode">
          <div class="modal-header">
            <span class="modal-title">${t('exportModal.title')}</span>
            <button class="modal-close"><svg style="width:20px;height:20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>

          <div class="export-modal-body" id="export-modal-body">
            <div class="form-label">${t('exportModal.filename')}</div>
            <input class="export-filename" type="text" value="Senior_Frontend_Engineer_TechVision" readonly>

            <div class="form-label" style="margin-top:12px">${t('exportModal.template')}</div>
            <div class="export-template-row">
              <div class="export-template-select">
                <span>Standard Export</span>
                <span style="opacity:0.5;font-size:10px">&#9660;</span>
              </div>
              <div class="export-template-btn" title="${t('exportModal.save')}">
                <svg style="width:14px;height:14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              </div>
              <div class="export-template-btn" title="${t('exportModal.reset')}">
                <svg style="width:14px;height:14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
              </div>
            </div>

            <div class="export-quick-btns" style="margin-top:12px">
              <div class="export-quick-btn">${t('exportModal.selectAll')}</div>
              <div class="export-quick-btn">${t('exportModal.deselectAll')}</div>
            </div>

            <div class="form-label" style="margin-top:12px">${t('exportModal.sections')} <span style="font-weight:400;text-transform:none;letter-spacing:0;color:rgba(255,255,255,0.4);font-size:11px">${t('exportModal.dragHint')}</span></div>

            <div class="export-section-card header-card">
              <span class="export-section-name" style="color:rgba(255,255,255,0.6)">Header</span>
              <span class="export-section-count" style="font-style:italic">${t('exportModal.alwaysIncluded')}</span>
            </div>

            ${['Summary|1 élément', 'Skills|6 éléments', 'Experience|2/2', 'Education|1/1', 'Languages|3 éléments', 'Projects|2/3'].map(s => {
              const [name, count] = s.split('|');
              return `
            <div class="export-section-card">
              <span class="export-drag-handle">&#10303;</span>
              <div class="export-checkbox"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
              <span class="export-section-name">${name}</span>
              <span class="export-section-count">${count}</span>
              <span class="export-section-expand">
                <svg style="width:14px;height:14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </span>
            </div>`;
            }).join('')}
          </div>

          <div class="export-footer">
            <button class="btn-cancel" style="margin-right:auto">${t('exportModal.cancel')}</button>
            <button class="btn-preview-export" id="btn-preview-export">
              <svg style="width:14px;height:14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              ${t('exportModal.preview')}
            </button>
            <button class="btn-word">Word</button>
            <button class="btn-pdf">PDF</button>
          </div>
        </div>

        <div id="export-preview-mode" class="hidden">
          <div class="modal-header">
            <span class="modal-title">${t('exportModal.previewTitle')}</span>
            <button class="modal-close"><svg style="width:20px;height:20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>

          <div class="export-preview-wrapper">
          <div class="export-preview-area" id="export-preview-scroll">
            <div class="pdf-page">

              <div class="pdf-header">
                <div class="pdf-name">John Doe</div>
                <div class="pdf-title">Senior Frontend Engineer</div>
                <div class="pdf-contact">
                  <span>john.doe@email.com</span>
                  <span>+33 6 12 34 56 78</span>
                  <span>Paris, France</span>
                </div>
                <div class="pdf-contact-links">
                  <a href="#">linkedin.com/in/johndoe</a>
                </div>
              </div>

              <div class="pdf-section-title">Summary</div>
              <div class="pdf-summary">
                <div class="pdf-text-line" style="width:100%"></div>
                <div class="pdf-text-line" style="width:100%"></div>
                <div class="pdf-text-line" style="width:94%"></div>
                <div class="pdf-text-line" style="width:55%"></div>
              </div>

              <div class="pdf-section-title">Skills</div>
              <div class="pdf-skills-grid">
                <div class="pdf-skill-category"><strong>Compétences techniques :</strong> React, TypeScript, Next.js, Node.js, GraphQL</div>
                <div class="pdf-skill-category"><strong>Outils :</strong> Tailwind CSS, Jest, Cypress, Docker, AWS</div>
                <div class="pdf-skill-category"><strong>Méthodologies :</strong> Agile, CI/CD, Code Review, Figma</div>
              </div>

              <div class="pdf-section-title">Experience</div>

              <div class="pdf-exp-entry">
                <div class="pdf-exp-header">
                  <div>
                    <div class="pdf-exp-title">Lead Frontend Developer</div>
                    <div class="pdf-exp-company">Acme Corp</div>
                  </div>
                  <span class="pdf-exp-date">Jan 2022 – Present</span>
                </div>
                <div>
                  <div class="pdf-bullet"><div class="pdf-text-line" style="width:100%"></div></div>
                  <div class="pdf-bullet"><div class="pdf-text-line" style="width:96%"></div></div>
                  <div class="pdf-bullet"><div class="pdf-text-line" style="width:100%"></div></div>
                  <div class="pdf-bullet"><div class="pdf-text-line" style="width:82%"></div></div>
                </div>
              </div>

              <div class="pdf-page-break">
                <span>${t('exportModal.pageBreak')}</span>
              </div>

              <div class="pdf-exp-entry" style="margin-top:14px">
                <div class="pdf-exp-header">
                  <div>
                    <div class="pdf-exp-title">Frontend Developer</div>
                    <div class="pdf-exp-company">StartupXYZ</div>
                  </div>
                  <span class="pdf-exp-date">Mar 2019 – Dec 2021</span>
                </div>
                <div>
                  <div class="pdf-bullet"><div class="pdf-text-line" style="width:100%"></div></div>
                  <div class="pdf-bullet"><div class="pdf-text-line" style="width:93%"></div></div>
                  <div class="pdf-bullet"><div class="pdf-text-line" style="width:88%"></div></div>
                </div>
              </div>

              <div class="pdf-section-title">Education</div>
              <div class="pdf-edu-entry">
                <div class="pdf-edu-degree">Master of Computer Science</div>
                <div class="pdf-edu-school">Université Paris-Saclay</div>
                <div class="pdf-exp-date">2017 – 2019</div>
              </div>

              <div class="pdf-section-title">Languages</div>
              <div class="pdf-lang-grid">
                <span class="pdf-lang-item">Français — Natif</span>
                <span class="pdf-lang-item">English — Fluent (C1)</span>
                <span class="pdf-lang-item">Deutsch — Intermediate (B1)</span>
              </div>

              <div class="pdf-section-title">Projects</div>
              <div class="pdf-project-entry">
                <div class="pdf-project-name">OpenSource Dashboard</div>
                <div class="pdf-project-role">React, D3.js, WebSocket — github.com/johndoe/dashboard</div>
                <div style="margin-top:3px">
                  <div class="pdf-bullet"><div class="pdf-text-line" style="width:100%"></div></div>
                  <div class="pdf-bullet"><div class="pdf-text-line" style="width:78%"></div></div>
                </div>
              </div>
              <div class="pdf-project-entry">
                <div class="pdf-project-name">E-Commerce Platform</div>
                <div class="pdf-project-role">Next.js, Stripe, Prisma — github.com/johndoe/ecommerce</div>
                <div style="margin-top:3px">
                  <div class="pdf-bullet"><div class="pdf-text-line" style="width:100%"></div></div>
                  <div class="pdf-bullet"><div class="pdf-text-line" style="width:85%"></div></div>
                </div>
              </div>

            </div>
          </div>
          </div>

          <div class="export-footer">
            <button class="export-preview-back" style="margin-right:auto">
              <svg style="width:14px;height:14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              ${t('exportModal.backToOptions')}
            </button>
            <button class="btn-export-final" id="btn-export-final">${t('exportModal.export')}</button>
          </div>
        </div>

      </div>
    </div>`;
}

export function createImportModal() {
  return `
    <div class="modal-overlay" id="import-modal">
      <div class="modal-backdrop-bg"></div>
      <div class="modal">
        <div class="modal-header">
          <span class="modal-title">${t('importModal.title')}</span>
          <button class="modal-close"><svg style="width:20px;height:20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        </div>
        <div class="modal-body">
          <div style="font-size:13px;color:rgba(255,255,255,0.9);margin-bottom:14px">
            ${t('importModal.desc')}
          </div>
          <div class="form-label">${t('importModal.fileLabel')}</div>
          <div class="import-upload-btn" id="import-upload-btn">
            <svg style="width:18px;height:18px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            <span style="font-weight:500">${t('importModal.choosePdf')}</span>
          </div>
          <div class="import-file-selected" id="import-file-selected">
            <svg style="width:14px;height:14px;color:#6ee7b7;flex-shrink:0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <div style="flex:1;min-width:0">
              <div style="font-weight:600;font-size:12px">${t('importModal.fileSelected')}</div>
              <div style="opacity:0.8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Thomas_Lefevre_CV.pdf</div>
            </div>
          </div>

          <div class="modal-actions">
            <button class="btn-cancel">${t('importModal.cancel')}</button>
            <button class="btn-import-submit disabled" id="btn-import-submit">${t('importModal.import')}</button>
          </div>
        </div>
      </div>
    </div>`;
}
