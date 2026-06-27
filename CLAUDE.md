# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server on localhost:3000
npm run build        # production build (required before Docker)
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run type-check   # tsc --noEmit
```

No test suite exists. Validate changes with `type-check` + `lint`, then check the dev server visually.

## Architecture

Next.js 14 App Router, `output: 'standalone'`, deployed as a Docker container behind Traefik.

### Two-layer data pattern

Every content type has a **static layer** and an optional **CMS layer**:

- **`src/data/*.ts`** — static TypeScript arrays and types. Always work, no network required. Used directly by pages that don't yet have CMS data (most trading/brand content) or as fallback shape.
- **`src/lib/cms.ts`** — fetches from a Payload CMS backend (`CMS_URL`, default `http://localhost:3001`). All `fetchDocs` / `fetchGlobal` calls are wrapped in try/catch and return `[]` / `null` on failure, so the site never crashes without the CMS. Fetch calls use `next: { revalidate: 30, tags: [collection] }` for ISR.

Pages decide which layer to use. Currently most pages read from static data; `src/lib/cms.ts` exports are wired in incrementally as the CMS backend is ready.

### On-demand revalidation

`POST /api/revalidate` — `Authorization: Bearer <REVALIDATE_SECRET>`. Body `{ "collection": "projects" }` revalidates that tag; omit body to revalidate all collections. Called by the CMS on content save.

### Component layers

- `src/components/ui/` — primitives: `Section`, `SectionHeader`, `PageHero`, `KickerLabel`, `ContentCard`, `BrandCard`, `StatBlock`, `Container`. Nearly always composable without props drilling.
- `src/components/sections/` — full page sections (Hero, AboutUs, ProductsServices, ProjectMap, …). Each is a self-contained server or client component.
- `src/components/layout/` — `Header`, `Footer`, `MobileMenu`.

### Routing

All pages live under `src/app/`. The only dynamic route is `/trading/[slug]` — slugs come from `getAllProductSlugs()` in `src/data/products.ts` and are statically generated via `generateStaticParams`.

### Design tokens

Tailwind custom theme (see `tailwind.config.ts`):
- `accent` = `#D4A84B` (golden/mustard) — primary interactive color
- `neutral-charcoal` = `#171717` — default text
- `font-display` = Manrope, `font-sans` = Source Sans 3 (both loaded via `next/font/google`)
- `shadow-card` / `shadow-card-hover` for card components
- Animation variants (`fadeUp`, `fadeIn`, `scaleIn`) are pre-defined in `src/lib/motion.ts` for use with Framer Motion

### Project images fallback

`src/lib/project-image.ts::getProjectImageSrc` — if `project.image` is absent, falls back to a sector-keyed static image in `/public/images/projects/`.

## Deployment

Push to `main` → GitHub Actions (`deploy-dev.yml`) → SSH into VPS → `deploy.sh` runs:
1. `npm run build` on the VPS (required — Dockerfile copies the pre-built `.next/standalone`)
2. `docker compose -f docker-compose.dev.yml build --no-cache`
3. Container restart → Traefik serves `cms-dev.zunkireelabs.com`

Env vars needed at runtime: `CMS_URL` (Payload backend URL), `REVALIDATE_SECRET`.
`next.config.mjs` lists all allowed `remotePatterns` for `next/image` — add new image hosts there.
