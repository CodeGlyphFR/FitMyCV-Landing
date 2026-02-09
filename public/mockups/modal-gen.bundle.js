"use strict";
(() => {
  // public/mockups/src/html/icons.js
  var ICON_ADD = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA+VemSAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAE8GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDMgNzkuOTY5MGE4NywgMjAyNS8wMy8wNi0xOToxMjowMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjUtMTAtMTVUMTU6Mjc6MDYrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI1LTEwLTE1VDE1OjMyOjU0KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI1LTEwLTE1VDE1OjMyOjU0KzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MTg1ZDBlZC00NDNjLTU3NDgtYTg3Zi03NGVhYmUwODQyNmUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODE4NWQwZWQtNDQzYy01NzQ4LWE4N2YtNzRlYWJlMDg0MjZlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ODE4NWQwZWQtNDQzYy01NzQ4LWE4N2YtNzRlYWJlMDg0MjZlIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MTg1ZDBlZC00NDNjLTU3NDgtYTg3Zi03NGVhYmUwODQyNmUiIHN0RXZ0OndoZW49IjIwMjUtMTAtMTVUMTU6Mjc6MDYrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNi4xMSAoV2luZG93cykiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Of3CrgAAAu5JREFUeJzt1TEOAyEMAEET3f+/TMpcXgArzVSUlvDKa+89XOX2D1mnB+Dn83oDMQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFD2DMz+/QQpNiXi7jAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUPYMzPr9BD82XM3+3IRFxjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAobp+gIsGgjgcBm6OgAAAABJRU5ErkJggg==";
  var ICON_FR = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CclipPath%20id%3D%22circleClip%22%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22256%22%20cy%3D%22256%22%20r%3D%22256%22%2F%3E%0A%20%20%20%20%3C%2FclipPath%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23circleClip)%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22172%22%20height%3D%22512%22%20fill%3D%22%23002395%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%22170%22%20y%3D%220%22%20width%3D%22172%22%20height%3D%22512%22%20fill%3D%22%23fff%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%22340%22%20y%3D%220%22%20width%3D%22172%22%20height%3D%22512%22%20fill%3D%22%23ED2939%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Ccircle%20cx%3D%22256%22%20cy%3D%22256%22%20r%3D%22253%22%20fill%3D%22none%22%20stroke%3D%22%2300000022%22%20stroke-width%3D%226%22%2F%3E%0A%3C%2Fsvg%3E%0A";
  var ICON_GB = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CclipPath%20id%3D%22circleClip%22%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22256%22%20cy%3D%22256%22%20r%3D%22256%22%2F%3E%0A%20%20%20%20%3C%2FclipPath%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23circleClip)%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22512%22%20height%3D%22512%22%20fill%3D%22%23012169%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%2C0%20L512%2C512%20M512%2C0%20L0%2C512%22%20stroke%3D%22%23fff%22%20stroke-width%3D%2260%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%2C0%20L512%2C512%20M512%2C0%20L0%2C512%22%20stroke%3D%22%23C8102E%22%20stroke-width%3D%2240%22%20stroke-linecap%3D%22square%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M256%2C0%20v512%20M0%2C256%20h512%22%20stroke%3D%22%23fff%22%20stroke-width%3D%22100%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M256%2C0%20v512%20M0%2C256%20h512%22%20stroke%3D%22%23C8102E%22%20stroke-width%3D%2260%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Ccircle%20cx%3D%22256%22%20cy%3D%22256%22%20r%3D%22253%22%20fill%3D%22none%22%20stroke%3D%22%2300000022%22%20stroke-width%3D%226%22%2F%3E%0A%3C%2Fsvg%3E%0A";
  var ICON_IMPORT = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA+VemSAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAE8GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDMgNzkuOTY5MGE4NywgMjAyNS8wMy8wNi0xOToxMjowMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjUtMTAtMTVUMTU6MjY6MjMrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI1LTEwLTE1VDE1OjMyOjU3KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI1LTEwLTE1VDE1OjMyOjU3KzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjN2Q4YzY1Zi0zMzU4LWEyNDItOTNlYy1mOTE5MjM4YjE1ZmYiIHhtcE1NOkRvY3VtZW50SUQ9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";

  // public/mockups/src/html/modals.js
  function createGeneratorModal() {
    return `
    <div class="modal-overlay" id="generator-modal">
      <div class="modal-backdrop-bg"></div>
      <div class="modal" id="generator-content">
        <div class="modal-header">
          <span class="modal-title">G\xE9n\xE9rer un CV avec l'IA</span>
          <button class="modal-close"><svg style="width:20px;height:20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        </div>

        <div class="modal-body">
          <div class="form-label">CV de r\xE9f\xE9rence</div>
          <div class="form-select" id="gen-cv-select">
            <span class="select-icon-wrap"><img src="${ICON_IMPORT}" style="width:16px;height:16px"></span>
            <span id="gen-cv-name">07/02/2026 &nbsp;D\xE9veloppeur Full-Stack JavaScript</span>
            <span style="margin-left:4px"><img src="${ICON_FR}" style="width:16px;height:12px"></span>
            <span class="select-arrow">&#9662;</span>

            <div class="modal-dropdown" id="gen-cv-dropdown">
              <ul>
                <li style="color:var(--emerald-light);font-weight:500">
                  <span style="font-size:18px">&#10024;</span>
                  <span>Cr\xE9er un nouveau mod\xE8le de CV</span>
                </li>
                <li class="separator"></li>
                <li>
                  <span class="dd-icon-wrap"><img src="${ICON_IMPORT}" style="width:16px;height:16px"></span>
                  <span style="font-size:11px;color:var(--text-dimmer)">07/02/2026</span>
                  <span class="dd-name">D\xE9veloppeur Front-End React</span>
                  <span style="margin-left:auto"><img src="${ICON_FR}" style="width:16px;height:12px"></span>
                </li>
                <li class="selected">
                  <span class="dd-icon-wrap"><img src="${ICON_IMPORT}" style="width:16px;height:16px"></span>
                  <span style="font-size:11px;color:var(--text-dimmer)">07/02/2026</span>
                  <span class="dd-name">D\xE9veloppeur Full-Stack JavaScript</span>
                  <span style="margin-left:auto"><img src="${ICON_FR}" style="width:16px;height:12px"></span>
                </li>
                <li id="gen-cv-data-option">
                  <span class="dd-icon-wrap"><img src="${ICON_IMPORT}" style="width:16px;height:16px"></span>
                  <span style="font-size:11px;color:var(--text-dimmer)">07/02/2026</span>
                  <span class="dd-name">Ing\xE9nieur UI/UX Front-End</span>
                  <span style="margin-left:auto"><img src="${ICON_FR}" style="width:16px;height:12px"></span>
                </li>
              </ul>
            </div>
          </div>

          <div class="form-label">Liens vers les offres d'emploi</div>

          <div id="link-fields">
            <div class="link-input-row">
              <div class="link-history-btn" id="link1-history-btn">&#128203;</div>
              <input class="link-input" id="link1-input" type="text" placeholder="https://... (lien vers l'offre d'emploi)" readonly>
              <button class="link-remove">&#10005;</button>

              <div class="link-history-dropdown" id="link1-history">
                <div class="lh-header">Liens r\xE9cents</div>
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
                      <span class="lh-title">Lead D\xE9veloppeur React (StartupFlow)</span>
                    </span>
                    <span class="lh-remove">&#10005;</span>
                  </li>
                  <li>
                    <span class="lh-content">
                      <img src="${ICON_FR}" style="width:16px;height:12px">
                      <span class="lh-title">D\xE9veloppeur Front-End Senior (DigiCraft)</span>
                    </span>
                    <span class="lh-remove">&#10005;</span>
                  </li>
                  <li>
                    <span class="lh-content">
                      <img src="${ICON_FR}" style="width:16px;height:12px">
                      <span class="lh-title">Ing\xE9nieur UI/UX React (WebFactory)</span>
                    </span>
                    <span class="lh-remove">&#10005;</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="link-input-row hidden" id="link2-row">
              <div class="link-history-btn" id="link2-history-btn">&#128203;</div>
              <input class="link-input" id="link2-input" type="text" placeholder="https://... (lien vers l'offre d'emploi)" readonly>
              <button class="link-remove">&#10005;</button>

              <div class="link-history-dropdown" id="link2-history">
                <div class="lh-header">Liens r\xE9cents</div>
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
                      <span class="lh-title">Lead D\xE9veloppeur React (StartupFlow)</span>
                    </span>
                    <span class="lh-remove">&#10005;</span>
                  </li>
                  <li>
                    <span class="lh-content">
                      <img src="${ICON_FR}" style="width:16px;height:12px">
                      <span class="lh-title">D\xE9veloppeur Front-End Senior (DigiCraft)</span>
                    </span>
                    <span class="lh-remove">&#10005;</span>
                  </li>
                  <li>
                    <span class="lh-content">
                      <img src="${ICON_FR}" style="width:16px;height:12px">
                      <span class="lh-title">Ing\xE9nieur UI/UX React (WebFactory)</span>
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
              Ajouter un lien
            </div>
          </div>

          <div class="form-label">Offres d'emploi PDF</div>
          <div class="pdf-upload">
            <img src="${ICON_IMPORT}" style="width:20px;height:20px;opacity:0.7">
            Choisir un fichier PDF
          </div>

          <div class="modal-actions">
            <button class="btn-cancel">Annuler</button>
            <button class="btn-validate" id="btn-valider">Valider</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  // public/mockups/src/html/cursor-and-indicator.js
  function createCursor() {
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

  // public/mockups/src/js/dom-helpers.js
  var $ = (id) => document.getElementById(id);
  function getElCenter(viewport2, id) {
    const el = typeof id === "string" ? $(id) : id;
    if (!el) return { x: 450, y: 300 };
    const vr = viewport2.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    return {
      x: er.left - vr.left + er.width / 2,
      y: er.top - vr.top + er.height / 2
    };
  }
  function moveCursor(cursor2, x, y) {
    cursor2.style.left = x + "px";
    cursor2.style.top = y + "px";
  }
  function moveToEl(viewport2, cursor2, id) {
    const pos = getElCenter(viewport2, id);
    moveCursor(cursor2, pos.x, pos.y);
  }
  function clickEffect(cursor2) {
    cursor2.classList.add("clicking");
    setTimeout(() => cursor2.classList.remove("clicking"), 400);
  }
  var _paused = false;
  var _resumeResolve = null;
  function waitForResume() {
    if (!_paused) return Promise.resolve();
    return new Promise((r) => {
      _resumeResolve = r;
    });
  }
  function wait(ms) {
    return new Promise((r) => setTimeout(r, ms)).then(() => waitForResume());
  }

  // public/mockups/src/modal-gen-index.js
  var MOCKUP_W = 420;
  var MOCKUP_H = 402;
  var style = document.createElement("style");
  style.textContent = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin:0; padding:0; overflow:hidden; background:var(--modal-bg); }
  #modal-viewport {
    position:relative;
    width:${MOCKUP_W}px; height:${MOCKUP_H}px;
    transform-origin:0 0;
  }

  #generator-modal {
    display:block !important;
    position:static !important;
    opacity:1 !important;
    pointer-events:auto !important;
  }
  #generator-modal > .modal-backdrop-bg { display:none !important; }
  #generator-modal > .modal {
    width:${MOCKUP_W}px !important;
    max-width:none !important;
    max-height:none !important;
    transform:none !important;
    opacity:1 !important;
    border:none !important;
    border-radius:0 !important;
    box-shadow:none !important;
  }
  .modal-close { display:none !important; }
  #gen-cv-name { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; min-width:0; }

  /* Link2: space always reserved, just toggle visibility */
  #link2-row.hidden {
    display:flex !important;
    visibility:hidden !important;
  }
`;
  document.head.appendChild(style);
  var app = document.getElementById("app");
  app.innerHTML = `
  <div id="modal-viewport">
    ${createGeneratorModal()}
    ${createCursor()}
  </div>
`;
  $("generator-modal").classList.add("visible");
  var viewport = $("modal-viewport");
  var cursor = $("cursor");
  function resetModal() {
    $("gen-cv-name").innerHTML = "07/02/2026 &nbsp;D\xE9veloppeur Full-Stack JavaScript";
    $("gen-cv-dropdown").classList.remove("visible");
    if ($("gen-cv-data-option")) $("gen-cv-data-option").classList.remove("highlighted");
    $("link1-input").value = "";
    $("link2-input").value = "";
    $("link1-history").classList.remove("visible");
    if ($("link2-history")) $("link2-history").classList.remove("visible");
    if ($("lh-item-1")) $("lh-item-1").classList.remove("highlighted");
    if ($("lh2-item-2")) $("lh2-item-2").classList.remove("highlighted");
    $("link2-row").classList.add("hidden");
  }
  var firstRun = true;
  async function animate() {
    try {
      if (firstRun) {
        firstRun = false;
        resetModal();
        cursor.style.opacity = "0";
        await wait(600);
      } else {
        $("link2-row").classList.add("hidden");
        cursor.style.opacity = "0";
        viewport.style.transition = "opacity 0.4s ease";
        viewport.style.opacity = "0";
        await wait(500);
        viewport.style.transition = "none";
        resetModal();
        viewport.offsetHeight;
        viewport.style.transition = "opacity 0.4s ease";
        viewport.style.opacity = "1";
        await wait(500);
      }
      cursor.style.opacity = "1";
      moveToEl(viewport, cursor, "gen-cv-select");
      await wait(600);
      clickEffect(cursor);
      await wait(300);
      $("gen-cv-dropdown").classList.add("visible");
      await wait(500);
      moveToEl(viewport, cursor, "gen-cv-data-option");
      await wait(500);
      $("gen-cv-data-option").classList.add("highlighted");
      await wait(500);
      clickEffect(cursor);
      await wait(300);
      $("gen-cv-dropdown").classList.remove("visible");
      $("gen-cv-data-option").classList.remove("highlighted");
      $("gen-cv-name").innerHTML = "07/02/2026 &nbsp;Ing\xE9nieur UI/UX Front-End";
      await wait(500);
      moveToEl(viewport, cursor, "link1-history-btn");
      await wait(600);
      clickEffect(cursor);
      await wait(300);
      $("link1-history").classList.add("visible");
      await wait(500);
      moveToEl(viewport, cursor, "lh-item-1");
      await wait(500);
      $("lh-item-1").classList.add("highlighted");
      await wait(500);
      clickEffect(cursor);
      await wait(300);
      $("link1-history").classList.remove("visible");
      $("lh-item-1").classList.remove("highlighted");
      $("link1-input").value = "https://welcometothejungle.com/fr/companies/techvision/jobs/senior-frontend";
      await wait(500);
      moveToEl(viewport, cursor, "add-link-btn");
      await wait(600);
      clickEffect(cursor);
      await wait(300);
      $("link2-row").classList.remove("hidden");
      await wait(400);
      moveToEl(viewport, cursor, "link2-history-btn");
      await wait(600);
      clickEffect(cursor);
      await wait(300);
      $("link2-history").classList.add("visible");
      await wait(500);
      moveToEl(viewport, cursor, "lh2-item-2");
      await wait(500);
      $("lh2-item-2").classList.add("highlighted");
      await wait(500);
      clickEffect(cursor);
      await wait(300);
      $("link2-history").classList.remove("visible");
      $("lh2-item-2").classList.remove("highlighted");
      $("link2-input").value = "https://indeed.com/viewjob?jk=a8f3c2d1e9b74560";
      await wait(500);
      moveToEl(viewport, cursor, "btn-valider");
      await wait(600);
      clickEffect(cursor);
      await wait(600);
    } catch (e) {
    }
    setTimeout(animate, 200);
  }
  window.addEventListener("load", () => {
    setTimeout(animate, 500);
  });
})();
