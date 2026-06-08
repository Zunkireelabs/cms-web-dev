# Enhancement Checklist — CMS Group

Run through this checklist **before every commit** that touches `src/app/**/page.tsx`, `src/components/sections/*`, or `src/components/ui/*`. Yes/no questions. If any answer is "no", fix before commit.

## Tokens

- [ ] All headings use `font-display` (no `font-serif`, no default sans)
- [ ] All primary CTAs use `bg-accent` (no `bg-brand-600`, no `bg-brand-700`)
- [ ] All accent text uses `text-accent` (no `text-brand-600`, no `text-brand-700`, no `text-brand-900`)
- [ ] All focus rings use `ring-accent` (no `ring-brand-500`)
- [ ] All link hovers use `hover:text-accent` (no `hover:text-brand-600`)
- [ ] All hover backgrounds use `hover:bg-accent` or `hover:bg-accent-50` (no `hover:bg-brand-*`)

## Type & spacing

- [ ] Hero h1 uses the correct size class for `tall` or `compact` variant
- [ ] All section h2s are `font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight`
- [ ] All kickers use `<KickerLabel>` from `@/components/ui` (not inline custom kicker)
- [ ] Kicker → h2 spacing is `mt-4` or `mt-5` (consistent within section)
- [ ] h2 → lead spacing is `mt-5` or `mt-6` (consistent within section)
- [ ] Lead → content grid spacing is `mt-12` or `mt-14` (consistent within section)
- [ ] Card padding is `p-6`, `p-7`, or `p-8 lg:p-10` (chosen consistently within a single grid)
- [ ] Grid gaps are `gap-5` (tight) or `gap-6` (default) (consistent within a single grid)
- [ ] Card border-radius is `rounded-xl` (standard) or `rounded-2xl` (feature) (consistent within a grid)

## Section composition

- [ ] Page starts with `<PageHero>` (not a custom hero, except homepage)
- [ ] Page ends with `<ContactCTA />` (above the footer)
- [ ] Section bg alternation has variety (not all `light` or all `soft`)
- [ ] If page has 6+ sections, exactly one is `variant="dark"`
- [ ] No two `variant="dark"` sections back-to-back
- [ ] All sections use `<Section>` primitive (not raw `<section>` with custom padding)
- [ ] All section headers use `<SectionHeader>` primitive (not inline custom heading)

## Grid math

- [ ] Card count divides cleanly into column count (e.g. 6 cards / 3 cols, not 7 cards / 3 cols)
- [ ] Mobile: grid drops to 1-col cleanly without orphaned cells
- [ ] Tablet: if `sm:grid-cols-2` is used, count must be even
- [ ] Featured items break the grid pattern intentionally (e.g. chairman vs directors)
- [ ] Lists with 9+ identical items use a "Show all" toggle

## Photos

- [ ] All photos use `next/image` with `fill` (not plain `<img>` tags)
- [ ] All `<Image>` have descriptive `alt` (describes content, not page context)
- [ ] All `<Image fill>` have a `sizes` prop
- [ ] Photo aspect ratios match within a grid (e.g. all `aspect-[4/5]` in a leadership grid)
- [ ] Photos with text overlay have the canonical dark gradient (vertical + horizontal)
- [ ] Hero photos are real, not placeholder gradient (unless asset still pending)
- [ ] Caption position is consistent (badge top-left, year top-right, narrative bottom-left)

## Motion

- [ ] All `whileInView` and `useInView` use `once: true`
- [ ] Section entries use `fadeUp` from `@/lib/motion` (not inline variants)
- [ ] Stagger delays use `index * 0.04` for grids, `0.06` for timelines
- [ ] Hover transitions use `transition-all duration-300` (consistent)
- [ ] Photo hover uses `duration-500` scale-[1.04] (subtle, slow)
- [ ] No bouncy springs on body content (springs only on menus/sticky bars)

## Hover signals

- [ ] Cards with `group` parent have a bottom-edge accent line `bg-accent` on hover
- [ ] Icon tiles `bg-accent-50 text-accent` swap to `group-hover:bg-accent group-hover:text-white` when card hovers
- [ ] Card headings have `group-hover:text-accent` if card is clickable

## Content density

- [ ] Story / split sections have 2 paragraphs max in content column (or break with meta grid / pull-quote)
- [ ] Symmetric card pairs (Mission/Vision) have symmetric content density (both bullets or both paragraphs)
- [ ] Values grids are 3, 6, or 9 cards (not 4, 5, 7, 8)
- [ ] Leadership: chairman is visually distinct from directors
- [ ] Long lists (12+) have a sticky filter bar above
- [ ] Empty states have icon + heading + helper text, not just text

## Indentation in code (TSX hygiene)

- [ ] No mixed indent (all 2-space or all tab — match project default of 2-space)
- [ ] No trailing whitespace
- [ ] `className` strings are sorted: layout → spacing → typography → color → state (Tailwind convention; not enforced by linter but consistent)
- [ ] Multi-line `className` strings broken on logical clusters with `cn()` from `@/lib/utils`
- [ ] No commented-out code blocks
- [ ] No `console.log` left in
- [ ] Imports sorted: react/next → external libs → `@/` paths → relative paths

## Accessibility

- [ ] Every form input has a `<label htmlFor>` matching its `id`
- [ ] Every interactive element with no visible text has `aria-label`
- [ ] Keyboard focus is visible (don't `outline-none` without `focus:ring`)
- [ ] Color contrast on text ≥ 4.5:1 (don't use `text-white/30` on body copy, only on tertiary meta)
- [ ] Heading order is hierarchical (no h2 → h4 jumps)

## Build & smoke-test

- [ ] `npm run build` exits with no errors
- [ ] All routes return 200 on `npm run dev` (curl check)
- [ ] Spot-checked rendered HTML for expected copy on at least one route
- [ ] No new TypeScript errors
- [ ] No new ESLint warnings introduced

## Commit hygiene

- [ ] Commit message starts with `PR NN: enhance /<page> — <summary>`
- [ ] Commit message lists 2-4 specific moves (not just "polish")
- [ ] Commit message includes `Co-Authored-By: Claude Opus 4.7` line
- [ ] Co-authored line is the LAST line of the message body
- [ ] No unrelated changes bundled in the commit (forms backend, asset swaps, dependency updates, etc.)

## Final sanity

- [ ] Could the chairman show this page to a Grohe rep without apology? If no, what's the weakest moment? Fix it.
- [ ] Is there any section that feels visually identical to another? If yes, vary one.
- [ ] Is there any moment where the eye gets tired? (6+ identical cards, 3+ dense paragraphs, repeated photo aspects). If yes, break it.
