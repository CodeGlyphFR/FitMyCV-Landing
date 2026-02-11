# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Dev server on port 3001 (Turbopack)
npm run build            # Build mockups then Next.js
npm run build:mockups    # esbuild mockup bundles only
npm run start            # Production server on port 3333
npm run lint             # ESLint
```

Docker:
```bash
docker compose up dev    # Dev with volume mounts (port 3001)
docker compose up prod   # Production standalone (port 3333)
```

**Important:** `node_modules` is managed inside Docker (anonymous volume). Run npm commands via Docker:
```bash
docker compose exec dev npm run build:mockups    # Build mockups inside container
docker compose exec dev npm install              # Install deps inside container
```

## Architecture

**Stack:** Next.js 15.3 (App Router, standalone output) + React 19 + Tailwind 4 + TypeScript 5

**Layout:**
- `src/app/(main)/` — Single-page app with route group layout (metadata, Inter font)
- `src/components/showcase/` — Main `Showcase.tsx` client component + CSS
- `public/mockups/` — Self-contained animated mockup demos loaded via iframes

### Mockup System

The showcase page embeds 8 animated HTML mockups (workflow-demo + steps 1-7) in iframes. These are **not** React — they are plain HTML/JS built with esbuild.

**Source structure:**
```
public/mockups/src/
├── html/       # HTML generators returning template strings
│   └── icons.js    # Data URIs auto-generated from public/icons/
├── js/         # Animation logic + step implementations
│   └── steps/  # step1.js–step7.js (each exports setup + run)
└── styles/     # variables.css + components.css (inlined into HTML)
```

**Build process** (`build-mockups.mjs`):
1. esbuild bundles `index.js` → `index.bundle.js` (workflow demo) and `step-index.js` → `step-index.bundle.js` (individual steps) as IIFE
2. CSS from `variables.css` + `components.css` is inlined into `<style>` tags
3. Generates 8 HTML files with inline CSS + `<script src="*.bundle.js">`

**Two modes:**
- `workflow-demo.html` — runs all 7 steps sequentially in a loop
- `step{N}.html` — reads `data-step` attribute, loops only that step

**Step pattern:** Each step exports `setupStepN(cursor)` and `async runStepN(cursor)`. Steps use shared helpers: `$()` (getElementById), `moveToEl()`, `clickEffect()`, `wait()`, `typeText()`, `animateCounter()`.

### Iframe Loading

`Showcase.tsx` uses IntersectionObserver with lazy loading (max 2 concurrent iframes). Iframes scale from 960px base width to viewport. Blur/shimmer filters applied while loading.

## Deployment

Production: standalone Next.js in multi-stage Docker (node:22-alpine) behind Cloudflare → Caddy → Docker :3333. Domain: www.fitmycv.io.

## Conventions

- Path alias: `@/*` → `./src/*`
- Mockup DOM IDs: kebab-case (`btn-import`, `cv-dropdown`, `import-modal`)
- Mockup generators: `createXxx()` functions returning HTML strings
- Icons in mockups: imported as ES module data URI constants from `icons.js`
- No test framework configured
- Site language: English layout, French mockup content
