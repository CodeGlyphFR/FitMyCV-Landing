<div align="center">

<img src="public/icons/logo.png" alt="FitMyCV Logo" width="400" />

# Landing Page

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/) [![License](https://img.shields.io/badge/License-Private-red)]()

[**fitmycv.io**](https://www.fitmycv.io) · [**app.fitmycv.io**](https://app.fitmycv.io)

<br />

<img src="public/workflow-demo.gif" alt="FitMyCV Workflow Demo" width="720" />

</div>

---

## À propos de FitMyCV

FitMyCV est un SaaS qui optimise votre CV grâce à l'IA pour maximiser vos chances face aux filtres ATS des recruteurs. Contrairement à ChatGPT, l'IA ne fabrique rien : elle reformule et réorganise uniquement votre parcours réel.

### Workflow en 3 phases

| Phase | Étapes | Description |
|-------|--------|-------------|
| **Import** | Import PDF | L'IA extrait compétences, expériences et formations |
| **IA** | Génération → Revue → Score → Optimisation → Validation | Variantes sur mesure par offre, diff visuel, score de matching, suggestions ciblées |
| **Export** | PDF / Word | CV finalisé, prêt à envoyer |

### Fonctionnalités clés

- **Un CV par offre** — Collez l'URL d'une offre, l'IA adapte votre CV automatiquement
- **Compatible ATS** — Structure, mots-clés et hiérarchie optimisés pour les systèmes de tri
- **Score de matching** — Mesure l'adéquation CV/offre et guide les améliorations
- **Contrôle total** — Mode révision : acceptez ou refusez chaque modification
- **Multi-offres** — Générez jusqu'à 10 CV en parallèle (~35s par offre)
- **4 langues** — Français, Anglais, Allemand, Espagnol
- **Historique & versioning** — Restaurez n'importe quelle version en un clic
- **Éditeur intégré** — Modifiez chaque section directement dans l'app
- **Sans abonnement** — Système de crédits, 15 offerts à l'inscription

### Tarification

Pas d'abonnement : les crédits sont achetés à la carte et n'expirent jamais.

| Pack | Prix | Par crédit | Réduction |
|------|------|------------|-----------|
| Starter | 4,99 € | 0,33 € | — |
| Pro | 14,99 € | 0,30 € | −10 % |
| Expert | 26,99 € | 0,27 € | −20 % |
| Ultimate | 35,99 € | 0,24 € | −30 % |

15 crédits offerts à l'inscription, sans carte bancaire. Paiement sécurisé via Stripe (Visa, MC, Apple Pay).

### Section Reviews (désactivée)

La section Reviews existe (`src/components/landing/Reviews.tsx`) mais est commentée dans `page.tsx`. Pour l'activer, décommenter la ligne dans `src/app/(main)/page.tsx` et rétablir l'import :

```tsx
import Reviews from "@/components/landing/Reviews";
// …
<Pricing />
<Reviews />    {/* ← décommenter */}
<FAQ />
```

---

## Getting Started

### Développement local (sans Docker)

```bash
npm install
npm run dev
```

Accessible sur [http://localhost:3001](http://localhost:3001) avec Turbopack hot reload.

### Docker

```bash
# Production (image optimisée ~240 MB)
docker compose up prod        # → http://localhost:3333

# Développement (hot reload)
docker compose up dev          # → http://localhost:3001

# Build production uniquement
docker compose build prod
```

> **Note :** `node_modules` est géré dans le conteneur Docker (volume anonyme). Exécuter les commandes npm via Docker :
> ```bash
> docker compose exec dev npm install
> docker compose exec dev npm run build:mockups
> ```

---

## Structure du projet

```
src/
├── app/
│   ├── (main)/             # Landing page + /support
│   ├── (legal)/            # /terms, /privacy
│   └── api/                # Routes API (promo-remaining)
├── components/
│   ├── landing/            # Sections : Hero, HowItWorks, Features,
│   │                       #   Pricing, Reviews, FAQ, Header, Footer…
│   ├── how-it-works/       # Composants spécifiques How It Works
│   ├── pricing/            # Composants spécifiques Pricing
│   ├── showcase/           # Showcase mockups interactifs (iframes)
│   └── ui/                 # Composants UI réutilisables
├── styles/
│   └── landing.css         # Styles landing page
public/
├── icons/                  # Logo, icônes PNG/SVG
├── mockups/
│   ├── src/                # Sources des mockups (JS/HTML)
│   │   ├── html/           # Templates HTML, icônes, composants
│   │   └── js/             # Logique d'animation, steps 1-7
│   ├── *.bundle.js         # Bundles générés (esbuild IIFE)
│   ├── workflow-demo.html  # Démo workflow complet
│   └── step[1-7].html      # Démo de chaque étape
```

---

## Build des mockups

Les mockups sont des fichiers HTML autonomes avec CSS inline et JS bundlé (esbuild IIFE), embarqués dans la page via iframes :

```bash
docker compose exec dev npm run build:mockups
```

Génère `workflow-demo.html` + `step1.html` à `step7.html` dans `public/mockups/`.

---

## Architecture Docker

```
┌─────────────────────────────────────────────┐
│                 Dockerfile                   │
│                                              │
│  ┌─────────┐   ┌──────┐   ┌─────────┐       │
│  │  base   │──▶│ deps │──▶│ builder │       │
│  │ alpine  │   │npm ci│   │npm build│       │
│  └─────────┘   └──────┘   └─────────┘       │
│                    │            │             │
│                    ▼            ▼             │
│               dev target   ┌────────┐        │
│              (+ volumes)   │ runner │        │
│                            │standalone│      │
│                            └────────┘        │
└─────────────────────────────────────────────┘
```

| Service | Target | Port | Usage |
|---------|--------|------|-------|
| `dev` | `deps` | 3001 | Hot reload, volumes montés |
| `prod` | `runner` | 3333 | Image standalone optimisée |

---

## Déploiement

```
Internet ──▶ Cloudflare ──▶ Caddy (TLS) ──▶ Docker :3333
                              │
         www.fitmycv.io ──────┘
         fitmycv.io ─── 301 ──▶ www.fitmycv.io
```
