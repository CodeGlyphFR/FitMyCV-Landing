import { ICON_USER, ICON_TASK, ICON_IMPORT, ICON_FILTER, ICON_OPENAI_SYMBOL, ICON_ADD, ICON_EXPORT, ICON_DELETE, ICON_SEARCH } from './icons.js';

export function createTopBar() {
  return `
    <div class="topbar">
      <div class="tb-btn user-btn" id="btn-user" title="Menu utilisateur">
        <img src="${ICON_USER}" style="width:20px;height:20px">
      </div>
      <div class="tb-btn" id="btn-tasks" title="Gestionnaire de tâches">
        <img src="${ICON_TASK}" style="width:16px;height:16px">
      </div>
      <div class="cv-selector" id="cv-selector">
        <span class="cv-icon-wrap" id="cv-icon-wrap">
          <img id="cv-icon-img" src="${ICON_IMPORT}" style="width:16px;height:16px">
        </span>
        <span class="cv-name" id="cv-name">07/02/2026 &nbsp;Développeur Front-End React</span>
        <span class="cv-arrow">&#9662;</span>
      </div>
      <div class="tb-btn" id="btn-filter" title="Filtres">
        <img src="${ICON_FILTER}" style="width:16px;height:16px">
      </div>
      <div class="tb-btn" id="btn-ai" title="Générer avec l'IA">
        <img src="${ICON_OPENAI_SYMBOL}" style="width:16px;height:16px">
      </div>
      <div class="tb-btn" id="btn-new" title="Nouveau CV">
        <img src="${ICON_ADD}" style="width:16px;height:16px">
      </div>
      <div class="tb-btn" id="btn-import" title="Importer PDF">
        <img src="${ICON_IMPORT}" style="width:16px;height:16px">
      </div>
      <div class="tb-btn" id="btn-export" title="Exporter">
        <img src="${ICON_EXPORT}" style="width:16px;height:16px">
      </div>
      <div class="tb-btn" id="btn-delete" title="Supprimer">
        <img src="${ICON_DELETE}" style="width:16px;height:16px">
      </div>
      <div class="tb-search">
        <img src="${ICON_SEARCH}" class="search-icon" style="width:14px;height:14px;position:absolute;left:8px;opacity:0.5">
        <input type="text" placeholder="Entrez un titre de poste..." readonly>
      </div>
      <div class="credit-counter" id="credit-counter">
        <span class="credit-number" id="credits">61</span>
        <div class="credit-bar"><div class="credit-bar-fill" id="credit-bar-fill" style="width:61%"></div></div>
      </div>
    </div>`;
}
