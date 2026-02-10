export function createBrowserFrame(viewportContent) {
  return `
<div class="mockup-frame">
  <div class="browser-bar">
    <div class="browser-dot r"></div>
    <div class="browser-dot y"></div>
    <div class="browser-dot g"></div>
    <div class="browser-url">
      <svg style="width:12px;height:12px;color:#10b981" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="7" width="10" height="7" rx="1.5"/><path d="M5 7V5a3 3 0 0 1 6 0v2" stroke-linecap="round"/></svg>
      app.fitmycv.io
    </div>
  </div>
  <div class="mockup-viewport" id="viewport">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    ${viewportContent}
  </div>
</div>`;
}
