---
name: cms-ui-polish
description: The CMS Group design rulebook. Use this skill whenever editing or enhancing any page in src/app/**/page.tsx, any section in src/components/sections/*, or any primitive in src/components/ui/*. It locks the design system (accent-* / brand-* / Manrope / motion variants), section composition rules, photo placement conventions, animation recipes, and the pre-commit enhancement checklist for client-ready presentation quality. Invoke before redesigning, restructuring, or polishing any UI on this site so the visual register stays consistent across every page.
---

# CMS Group — UI Polish Skill

**Project:** CMS Group corporate website (Trading & Contracting, 6 ventures, 55+ brand partners, 500+ projects)
**Aesthetic:** Premium corporate / architectural — photo-rich, generous whitespace, warm orange accent, confident sans-serif typography. Reference register: Hunter Douglas, IKO, Tarkett, Grohe brand sites.

## When to use this skill

Read this file (and the relevant linked reference files below) before:

- Editing any file under `src/app/**/page.tsx`
- Editing any section component in `src/components/sections/*`
- Editing any primitive in `src/components/ui/*`
- Restructuring section order or composition on any page
- Adding new pages or new section components
- Polishing micro-spacing, animations, or photo treatments
- Reviewing any UI PR before commit

## How this skill is organised

This `SKILL.md` is a navigation hub, not the rulebook itself. The actual rules live in topic files. **Read only the file you need** — they're independent, dense, and structured for fast reference.

| Topic | When to read | File |
|---|---|---|
| Color tokens, type scale, spacing constants | Any styling decision | [design-tokens.md](design-tokens.md) |
| How to compose each section type (hero, story, leadership, etc.) | Page restructuring or new section | [section-patterns.md](section-patterns.md) |
| Animation timing, viewport thresholds, hover behaviors | Adding motion to anything | [motion-recipes.md](motion-recipes.md) |
| Photo aspect ratios, overlays, captions, accent placement | Adding/swapping any image | [photo-placement.md](photo-placement.md) |
| Section ordering, bg alternation, breath sections | Designing the flow of a page | [density-rhythm.md](density-rhythm.md) |
| Pre-commit pass — 50 yes/no items | **Before every commit** that touches UI | [enhancement-checklist.md](enhancement-checklist.md) |
| Reference JSX (real, copy-paste-ready) | When unsure how a section actually composes | [examples/](examples/) |

## The non-negotiables (always true on this site)

These five rules override anything else. If a proposed change violates one of them, push back instead of implementing.

1. **Headings use `font-display` (Manrope), never `font-serif`, never the default sans.** No exceptions.
2. **Primary CTAs use `bg-accent` (orange), never `bg-brand-*` (teal).** Teal is for placeholder backgrounds, hover bg-tints, and inverted-context accents only.
3. **Every page has a `PageHero` and ends with `<ContactCTA />` (or equivalent dark CTA section).** The structural bookends are constant.
4. **No animation re-fires on scroll.** Every `motion.X` with `whileInView` or `useInView` uses `once: true`. Re-firing animations are forbidden.
5. **Every image has `alt` text and lives behind a dark gradient if any text overlays it.** Legibility over decoration.

## The default workflow when polishing a page

1. **Read the current page file** — get a complete picture, no assumptions.
2. **Read [section-patterns.md](section-patterns.md)** for each section type the page contains.
3. **Identify weaknesses** — density imbalance, wrong section count, broken grid math, missing photo overlay, asymmetric content blocks, etc. (See [enhancement-checklist.md](enhancement-checklist.md).)
4. **Propose changes section-by-section to the user** with concrete moves and why each one helps. Never implement without showing the plan first.
5. **After approval, edit the page** following the rules in the reference files.
6. **Run the [enhancement-checklist.md](enhancement-checklist.md)** before committing.
7. **Build + smoke-test** every changed route returns 200 and renders expected copy.
8. **Commit with a `PR NN: enhance /<page> — ...` message** that calls out the specific moves made.
9. **Deploy to cms-dev** if stacking PRs is not in flight.

## Naming the changes

Use `enhance` (not `redesign` or `polish`) in commit messages — this signals incremental quality work on top of the locked Phase 2 system, not another foundation overhaul.

Example: `PR 33: enhance /about — chairman-hero leadership, story meta-grid, certs collapsible`

## Scope discipline

- Don't change global components (Header, Footer, MobileMenu, globals.css) inside a per-page enhancement PR. Those get their own dedicated PR.
- Don't introduce new color tokens, fonts, or motion variants without updating [design-tokens.md](design-tokens.md) or [motion-recipes.md](motion-recipes.md) in the same PR.
- Don't add new primitive components inside a per-page PR. Section-level components yes; new `ui/*` primitives no — those need their own PR for review.
- Don't fix unrelated bugs in the same PR. Stay scoped.

## What "client-ready" means on this site

The bar isn't "matches the design system." The bar is "the chairman would show this to a Grohe rep without apology."

Things that fail that bar:
- A 6-row identical card grid (visual fatigue)
- A 3-paragraph wall with no break (reading fatigue)
- A 4-col grid showing 7 items (one orphaned)
- A photo with text on top and no gradient (illegible)
- A timeline with floating cards and huge negative space (looks unfinished)
- Symmetric structural cards with asymmetric content density (looks broken)
- Mission/vision/values mashed into a 3-card row when they're three different concepts

Things that pass:
- Asymmetric layouts with intentional emphasis
- Content density that varies by section
- Photos with consistent aspect ratios across a row
- "Show all N" toggles instead of walls of cards
- Pull-quotes / stat callouts breaking long copy
- A chairman card that's distinct from director cards
- Section bg alternation that has a dark "reset" in the middle

That register is encoded in [section-patterns.md](section-patterns.md) and [density-rhythm.md](density-rhythm.md). Read those.
