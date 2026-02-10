import { ICON_INFOS, ICON_FR, ICON_GB, ICON_ANALYZER } from './icons.js';

export function createCvAreas() {
  return `
    <!-- ===== CV CONTENT: Développeur Front-End React ===== -->
    <div class="cv-area" id="cv-react">
      <div class="cv-header">
        <div>
          <h2>Thomas Lefèvre</h2>
          <div class="subtitle">Développeur Front-End React</div>
          <div class="contact">
            thomas.lefevre@email.com<br>
            +33 6 45 78 12 34<br>
            Lyon, Auvergne-Rhône-Alpes, France<br>
            <a href="#">LinkedIn</a> &nbsp; <a href="#">GitHub</a> &nbsp; <a href="#">Portfolio</a>
          </div>
        </div>
        <div class="header-actions">
          <div class="header-actions-inner">
            <div class="ha-info"><img src="${ICON_INFOS}" style="width:16px;height:16px;opacity:0.7"></div>
          </div>
        </div>
        <div class="ha-lang">
          <img src="${ICON_FR}" style="width:24px;height:24px">
        </div>
      </div>

      <div class="cv-section-nobg">
        <h3>Résumé</h3>
        <div class="cv-section-content">
          Développeur Front-End avec 4 ans d'expérience dans la conception d'applications web performantes en React et TypeScript. Passionné par l'UI/UX, l'optimisation des performances et les architectures front-end modernes.
        </div>
      </div>

      <div class="cv-section">
        <h3>Compétences</h3>
        <div class="cv-subsection-title">Techniques</div>
        <div class="skill-grid">
          <div class="skill-item"><span class="skill-name">React</span> <span class="skill-level">• Avancé</span></div>
          <div class="skill-item"><span class="skill-name">TypeScript</span> <span class="skill-level">• Avancé</span></div>
          <div class="skill-item"><span class="skill-name">CSS / Tailwind</span> <span class="skill-level">• Avancé</span></div>
          <div class="skill-item"><span class="skill-name">Redux</span> <span class="skill-level">• Compétent</span></div>
          <div class="skill-item"><span class="skill-name">REST APIs</span> <span class="skill-level">• Avancé</span></div>
          <div class="skill-item"><span class="skill-name">Git</span> <span class="skill-level">• Avancé</span></div>
        </div>
      </div>
    </div>

    <!-- ===== CV CONTENT: Développeur Full-Stack JavaScript ===== -->
    <div class="cv-area hidden" id="cv-fullstack">
      <div class="cv-header">
        <div>
          <h2>Thomas Lefèvre</h2>
          <div class="subtitle">Développeur Full-Stack JavaScript</div>
          <div class="contact">
            thomas.lefevre@email.com<br>
            +33 6 45 78 12 34<br>
            Lyon, Auvergne-Rhône-Alpes, France<br>
            <a href="#">LinkedIn</a> &nbsp; <a href="#">GitHub</a> &nbsp; <a href="#">Portfolio</a>
          </div>
        </div>
        <div class="header-actions">
          <div class="header-actions-inner">
            <div class="ha-info"><img src="${ICON_INFOS}" style="width:16px;height:16px;opacity:0.7"></div>
          </div>
        </div>
        <div class="ha-lang">
          <img src="${ICON_FR}" style="width:24px;height:24px">
        </div>
      </div>

      <div class="cv-section-nobg">
        <h3>Résumé</h3>
        <div class="cv-section-content">
          Développeur Full-Stack JavaScript avec 4 ans d'expérience en Node.js et React. Compétent dans la conception d'APIs, la gestion de bases de données relationnelles et NoSQL, et le déploiement d'applications conteneurisées.
        </div>
      </div>

      <div class="cv-section" id="fs-skills">
        <h3>Compétences</h3>
        <div class="skill-subsection-card">
          <h4>Compétences techniques</h4>
          <div class="skill-grid">
            <div class="skill-item"><span class="skill-name">JavaScript</span> <span class="skill-level">• Avancé</span></div>
            <div class="skill-item"><span class="skill-name">TypeScript</span> <span class="skill-level">• Avancé</span></div>
            <div class="skill-item"><span class="skill-name">Node.js</span> <span class="skill-level">• Avancé</span></div>
            <div class="skill-item"><span class="skill-name">React</span> <span class="skill-level">• Avancé</span></div>
            <div class="skill-item"><span class="skill-name">PostgreSQL</span> <span class="skill-level">• Compétent</span></div>
            <div class="skill-item"><span class="skill-name">MongoDB</span> <span class="skill-level">• Compétent</span></div>
            <div class="skill-item"><span class="skill-name">Docker</span> <span class="skill-level">• Compétent</span></div>
            <div class="skill-item"><span class="skill-name">AWS</span> <span class="skill-level">• Intermédiaire</span></div>
          </div>
        </div>
        <div class="skills-two-col">
          <div class="skill-subsection-card">
            <h4>Outils</h4>
            <div class="skill-grid" style="grid-template-columns:1fr">
              <div class="skill-item"><span class="skill-name">Git / GitHub</span> <span class="skill-level">• Avancé</span></div>
              <div class="skill-item"><span class="skill-name">VS Code</span> <span class="skill-level">• Avancé</span></div>
              <div class="skill-item"><span class="skill-name">Figma</span> <span class="skill-level">• Compétent</span></div>
              <div class="skill-item"><span class="skill-name">Jira</span> <span class="skill-level">• Compétent</span></div>
              <div class="skill-item"><span class="skill-name">Postman</span> <span class="skill-level">• Compétent</span></div>
            </div>
          </div>
          <div class="skill-subsection-card">
            <h4>Méthodologies</h4>
            <div style="display:flex;flex-wrap:wrap;gap:4px">
              <span class="skill-badge">Agile / Scrum</span>
              <span class="skill-badge">CI/CD</span>
              <span class="skill-badge">TDD</span>
              <span class="skill-badge">Code Review</span>
              <span class="skill-badge">REST API Design</span>
            </div>
          </div>
        </div>
        <div style="margin-top:8px">
          <div class="cv-subsection-title">Soft Skills</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px">
            <span class="skill-badge">Travail en équipe</span>
            <span class="skill-badge">Communication</span>
            <span class="skill-badge">Résolution de problèmes</span>
            <span class="skill-badge">Autonomie</span>
            <span class="skill-badge">Adaptabilité</span>
          </div>
        </div>
      </div>

      <div class="cv-section" id="fs-experience">
        <h3>Expérience</h3>
        <div class="exp-card">
          <div style="display:flex;align-items:baseline;justify-content:space-between">
            <span class="exp-title">Développeur Full-Stack &bull; TechVision</span>
            <span class="exp-duration">janv. 2022 — Présent</span>
          </div>
          <div class="exp-location">Lyon, France</div>
          <ul class="exp-responsibilities">
            <li>Conception et développement d'une plateforme SaaS B2B en React/Node.js</li>
            <li>Mise en place de l'architecture microservices et intégration Stripe</li>
            <li>Déploiement Docker/AWS et gestion d'une API REST servant 15k requêtes/jour</li>
            <li>Mentorat de 2 développeurs juniors et revues de code hebdomadaires</li>
          </ul>
          <div class="exp-skills-used">
            <span class="skill-badge">React</span>
            <span class="skill-badge">Node.js</span>
            <span class="skill-badge">PostgreSQL</span>
            <span class="skill-badge">Docker</span>
            <span class="skill-badge">AWS</span>
            <span class="skill-badge">Stripe</span>
          </div>
        </div>
        <div class="exp-card">
          <div style="display:flex;align-items:baseline;justify-content:space-between">
            <span class="exp-title">Développeur Front-End &bull; WebAgency</span>
            <span class="exp-duration">sept. 2020 — déc. 2021</span>
          </div>
          <div class="exp-location">Lyon, France</div>
          <ul class="exp-responsibilities">
            <li>Développement d'interfaces client en React et Vue.js pour des projets e-commerce</li>
            <li>Intégration de maquettes Figma et optimisation des performances (Lighthouse +30 pts)</li>
            <li>Mise en place de tests unitaires et d'intégration avec Jest et Cypress</li>
          </ul>
          <div class="exp-skills-used">
            <span class="skill-badge">React</span>
            <span class="skill-badge">Vue.js</span>
            <span class="skill-badge">Jest</span>
            <span class="skill-badge">Cypress</span>
            <span class="skill-badge">Figma</span>
          </div>
        </div>
      </div>

      <div class="cv-section">
        <h3>Formation</h3>
        <div class="edu-grid">
          <div class="edu-card">
            <div style="display:flex;align-items:baseline;justify-content:space-between">
              <span class="edu-institution">Université Claude Bernard Lyon 1</span>
              <span class="edu-dates">2018 — 2020</span>
            </div>
            <div class="edu-location">Villeurbanne, France</div>
            <div class="edu-degree">Master &bull; Informatique</div>
          </div>
          <div class="edu-card">
            <div style="display:flex;align-items:baseline;justify-content:space-between">
              <span class="edu-institution">Université Jean Moulin Lyon 3</span>
              <span class="edu-dates">2015 — 2018</span>
            </div>
            <div class="edu-location">Lyon, France</div>
            <div class="edu-degree">Licence &bull; Informatique</div>
          </div>
        </div>
      </div>

      <div class="cv-section" id="fs-langues">
        <h3>Langues</h3>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          <span class="lang-pill"><span class="lang-name">Français</span> <span class="lang-level">Natif</span></span>
          <span class="lang-pill"><span class="lang-name">Anglais</span> <span class="lang-level">Courant (B2)</span></span>
          <span class="lang-pill"><span class="lang-name">Espagnol</span> <span class="lang-level">Notions (A2)</span></span>
        </div>
      </div>

      <div class="cv-section">
        <h3>Informations complémentaires</h3>
        <div class="extras-badges">
          <span class="lang-pill"><span class="lang-name">Sport</span> <span class="lang-level">Course à pied, trail</span></span>
          <span class="lang-pill"><span class="lang-name">Loisirs</span> <span class="lang-level">Photographie urbaine</span></span>
          <span class="lang-pill"><span class="lang-name">Open Source</span> <span class="lang-level">Contributeur actif GitHub</span></span>
        </div>
      </div>

      <div class="cv-section">
        <h3>Projets</h3>
        <div class="project-grid">
          <div class="project-card">
            <div class="project-name">TaskFlow</div>
            <div class="project-role">Lead Developer</div>
            <div class="project-summary">Application de gestion de projet avec authentification OAuth, drag &amp; drop Kanban et notifications en temps réel via WebSocket.</div>
            <div class="project-tech">
              <span class="skill-badge">React</span>
              <span class="skill-badge">Node.js</span>
              <span class="skill-badge">WebSocket</span>
              <span class="skill-badge">OAuth</span>
            </div>
          </div>
          <div class="project-card">
            <div class="project-name">CryptoTracker</div>
            <div class="project-role">Développeur principal</div>
            <div class="project-summary">Dashboard de suivi crypto en temps réel avec graphiques interactifs, intégration API CoinGecko et alertes personnalisées.</div>
            <div class="project-tech">
              <span class="skill-badge">React</span>
              <span class="skill-badge">D3.js</span>
              <span class="skill-badge">CoinGecko API</span>
              <span class="skill-badge">WebSocket</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== CV CONTENT: Review Mode (Senior Frontend Engineer) ===== -->
    <div class="cv-area hidden" id="cv-review">
      <div class="cv-header">
        <div>
          <h2>Thomas Lefèvre
            <svg class="file-text-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </h2>
          <div class="subtitle">Senior Frontend Engineer</div>
          <div class="contact">
            thomas.lefevre@email.com<br>
            +33 6 45 78 12 34<br>
            Lyon, Auvergne-Rhône-Alpes, France<br>
            <a href="#">LinkedIn</a>
          </div>
        </div>
        <div class="header-actions">
          <div class="header-actions-inner">
            <div class="ha-info"><img src="${ICON_INFOS}" style="width:16px;height:16px;opacity:0.7"></div>
            <div class="ha-score">
              <div class="score-badge" id="score-badge">
                <svg class="score-refresh" id="score-refresh" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                <span class="score-num hidden" id="score-num">79</span>
              </div>
            </div>
            <div class="ha-optimize hidden" id="btn-optimize">
              <img src="${ICON_ANALYZER}" style="width:14px;height:14px">
            </div>
          </div>
        </div>
        <div class="ha-lang">
          <img src="${ICON_GB}" style="width:24px;height:24px">
        </div>
      </div>

      <div class="cv-section-nobg" id="review-summary">
        <h3>
          Summary
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="section-review-bar" id="review-bar-summary">
              <span class="accept" id="btn-tout-accepter">
                <svg style="width:12px;height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                Tout accepter
              </span>
              <span class="separator">&bull;</span>
              <span class="refuse">
                <svg style="width:12px;height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Tout refuser
              </span>
            </div>
            <div class="version-selector">
              <svg class="vs-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>v2</span>
              <svg class="vs-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
        </h3>
        <div class="cv-section-content" style="position:relative">
          <span class="highlight-modified" id="summary-highlight">
            Frontend engineer with 4+ years of experience building high-performance web applications using React and TypeScript. Specialized in performance optimization, component architecture, and delivering polished user experiences at scale.
          </span>
          <div class="change-popover hidden" id="change-popover">
            <div>
              <p class="popover-label">Texte précédent :</p>
              <p class="old-text">Développeur Full-Stack JavaScript avec 4 ans d'expérience en Node.js et React. Compétent dans la conception d'APIs et le déploiement d'applications conteneurisées.</p>
            </div>
            <div class="popover-reason">
              <span class="popover-reason-label">Raison : </span>
              Recentré sur le front-end React/TypeScript et l'optimisation des performances pour correspondre au poste Senior Frontend Engineer.
            </div>
            <div class="change-actions">
              <button class="btn-accept" id="btn-accept-change">
                <svg style="width:12px;height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                Accepter
              </button>
              <span class="popover-separator">&bull;</span>
              <button class="btn-reject" id="btn-reject-change">
                <svg style="width:12px;height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Rejeter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="cv-section" id="review-skills">
        <h3>
          Skills
          <div class="section-review-bar" id="review-bar-skills">
            <span class="accept">
              <svg style="width:12px;height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>
              Tout accepter
            </span>
            <span class="separator">&bull;</span>
            <span class="refuse">
              <svg style="width:12px;height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Tout refuser
            </span>
          </div>
        </h3>
        <div class="cv-subsection-title">Technical</div>
        <div class="skill-grid">
          <div class="skill-item">
            <span class="highlight-modified"><span class="skill-name">Performance Optimization</span> <span class="skill-level">• Advanced</span></span>
          </div>
          <div class="skill-item" id="skill-change-mgmt">
            <span class="highlight-modified"><span class="skill-name">Component Architecture</span> <span class="skill-level">• Advanced</span></span>
          </div>
          <div class="skill-item" id="skill-data">
            <span class="highlight-added"><span class="skill-name">Testing &amp; CI/CD</span> <span class="skill-level">• Proficient</span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== CV CONTENT: Clean (after accept all) ===== -->
    <div class="cv-area hidden" id="cv-clean">
      <div class="cv-header">
        <div>
          <h2>Thomas Lefèvre
            <svg class="file-text-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </h2>
          <div class="subtitle">Senior Frontend Engineer</div>
          <div class="contact">
            thomas.lefevre@email.com<br>
            +33 6 45 78 12 34<br>
            Lyon, Auvergne-Rhône-Alpes, France<br>
            <a href="#">LinkedIn</a>
          </div>
        </div>
        <div class="header-actions">
          <div class="header-actions-inner">
            <div class="ha-info"><img src="${ICON_INFOS}" style="width:16px;height:16px;opacity:0.7"></div>
            <div class="ha-score">
              <div class="score-badge" id="score-badge-clean">
                <svg class="score-refresh" id="score-refresh-clean" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                <span class="score-num hidden" id="score-num-clean">79</span>
              </div>
            </div>
            <div class="ha-optimize hidden" id="btn-optimize-clean">
              <img src="${ICON_ANALYZER}" style="width:14px;height:14px">
            </div>
          </div>
        </div>
        <div class="ha-lang">
          <img src="${ICON_GB}" style="width:24px;height:24px">
        </div>
      </div>

      <div class="cv-section-nobg">
        <h3>
          Summary
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="version-selector">
              <svg class="vs-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span id="clean-version">v2</span>
              <svg class="vs-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
        </h3>
        <div class="cv-section-content">
          Frontend engineer with 4+ years of experience building high-performance web applications using React and TypeScript. Specialized in performance optimization, component architecture, and delivering polished user experiences at scale.
        </div>
      </div>

      <div class="cv-section">
        <h3>Skills</h3>
        <div class="cv-subsection-title">Technical</div>
        <div class="skill-grid">
          <div class="skill-item"><span class="skill-name">Performance Optimization</span> <span class="skill-level">• Advanced</span></div>
          <div class="skill-item"><span class="skill-name">Component Architecture</span> <span class="skill-level">• Advanced</span></div>
          <div class="skill-item"><span class="skill-name">Testing &amp; CI/CD</span> <span class="skill-level">• Proficient</span></div>
        </div>
      </div>
    </div>

    <!-- ===== CV CONTENT: Optim Review (post-optimization, v3) ===== -->
    <div class="cv-area hidden" id="cv-optim-review">
      <div class="cv-header">
        <div>
          <h2>Thomas Lefèvre
            <svg class="file-text-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </h2>
          <div class="subtitle">Senior Frontend Engineer</div>
          <div class="contact">
            thomas.lefevre@email.com<br>
            +33 6 45 78 12 34<br>
            Lyon, Auvergne-Rhône-Alpes, France<br>
            <a href="#">LinkedIn</a>
          </div>
        </div>
        <div class="header-actions">
          <div class="header-actions-inner">
            <div class="ha-info"><img src="${ICON_INFOS}" style="width:16px;height:16px;opacity:0.7"></div>
            <div class="ha-score">
              <div class="score-badge" id="score-badge-optim">
                <svg class="score-refresh" id="score-refresh-optim" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                <span class="score-num hidden" id="score-num-optim">87</span>
              </div>
            </div>
            <div class="ha-optimize hidden" id="btn-optimize-optim">
              <img src="${ICON_ANALYZER}" style="width:14px;height:14px">
            </div>
          </div>
        </div>
        <div class="ha-lang">
          <img src="${ICON_GB}" style="width:24px;height:24px">
        </div>
      </div>

      <div class="cv-section-nobg" id="optim-review-summary">
        <h3>
          Summary
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="section-review-bar" id="review-bar-optim-summary">
              <span class="accept" id="btn-tout-accepter-optim">
                <svg style="width:12px;height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                Tout accepter
              </span>
              <span class="separator">&bull;</span>
              <span class="refuse">
                <svg style="width:12px;height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Tout refuser
              </span>
            </div>
            <div class="version-selector">
              <svg class="vs-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span id="optim-version">v3</span>
              <svg class="vs-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
        </h3>
        <div class="cv-section-content" style="position:relative">
          <span class="highlight-modified" id="optim-summary-highlight">
            Frontend engineer with 4+ years of experience building high-performance web applications using React and TypeScript. Specialized in performance optimization, component architecture, testing (Jest, Cypress), and delivering polished user experiences at scale.
          </span>
          <div class="change-popover hidden" id="optim-change-popover">
            <div>
              <p class="popover-label">Texte précédent :</p>
              <p class="old-text">Frontend engineer with 4+ years of experience building high-performance web applications using React and TypeScript. Specialized in performance optimization, component architecture, and delivering polished user experiences at scale.</p>
            </div>
            <div class="popover-reason">
              <span class="popover-reason-label">Raison : </span>
              Ajout de l'expertise en testing (Jest, Cypress) et monitoring de performances pour mieux correspondre aux exigences du poste.
            </div>
            <div class="change-actions">
              <button class="btn-accept" id="btn-accept-optim-change">
                <svg style="width:12px;height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                Accepter
              </button>
              <span class="popover-separator">&bull;</span>
              <button class="btn-reject" id="btn-reject-optim-change">
                <svg style="width:12px;height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Rejeter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="cv-section" id="optim-review-skills">
        <h3>
          Skills
          <div class="section-review-bar" id="review-bar-optim-skills">
            <span class="accept">
              <svg style="width:12px;height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>
              Tout accepter
            </span>
            <span class="separator">&bull;</span>
            <span class="refuse">
              <svg style="width:12px;height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Tout refuser
            </span>
          </div>
        </h3>
        <div class="cv-subsection-title">Technical</div>
        <div class="skill-grid">
          <div class="skill-item">
            <span class="highlight-modified"><span class="skill-name">Performance Optimization</span> <span class="skill-level">• Advanced</span></span>
          </div>
          <div class="skill-item">
            <span class="highlight-modified"><span class="skill-name">Testing, Performance &amp; CI/CD</span> <span class="skill-level">• Advanced</span></span>
          </div>
          <div class="skill-item">
            <span class="highlight-added"><span class="skill-name">Jest</span> <span class="skill-level">• Proficient</span></span>
          </div>
          <div class="skill-item">
            <span class="highlight-added"><span class="skill-name">Cypress</span> <span class="skill-level">• Proficient</span></span>
          </div>
        </div>
      </div>
    </div>`;
}
