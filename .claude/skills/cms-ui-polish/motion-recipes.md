# Motion Recipes — CMS Group

Animation should feel **confident, not playful**. Single, slow fade-up on entry. Subtle hover lift. No bouncy springs on content. No re-firing on scroll.

## The variants library

All variants live in `@/lib/motion`. Import from there — never define new ones inline.

```ts
import { fadeUp, fadeIn, scaleIn, slideRight, stagger, inViewOptions } from '@/lib/motion';
```

| Variant | Use |
|---|---|
| `fadeUp` | Default for almost everything. Section entries, card grids, paragraphs. |
| `fadeIn` | When `y: 0` makes more sense (e.g. opacity-only fade for a section header that doesn't move) |
| `scaleIn` | Featured cards, photo reveals, modal-like entries |
| `slideRight` | Side-pull on detail content — use sparingly |
| `stagger` | Wrap a parent that staggers its children's `fadeUp` (typical for card grids) |

## When to use what

### Section entry (heading → lead → content)

```tsx
<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} custom={0}>
  <KickerLabel>Our Story</KickerLabel>
</motion.div>
```

`SectionHeader` already wraps this — prefer it over re-rolling the motion wrapper.

### Card grid stagger

Wrap parent in `stagger`, each child in `fadeUp` with `custom={index * 0.04}`:

```tsx
<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
  {items.map((item, i) => (
    <motion.div key={item.id} variants={fadeUp} custom={i * 0.04}>
      ...
    </motion.div>
  ))}
</motion.div>
```

Stagger offset by `index * 0.04` for grids. `0.06` for timelines. `0.1` for split layouts (only 2-3 columns).

### Hero entry (always animate, no `whileInView` because it's already in view)

```tsx
<motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={0.08}>
  ...
</motion.h1>
```

`PageHero` already does this. Don't re-wrap.

## Viewport thresholds

Always pass viewport to `whileInView` for visibility-aware animation.

| Threshold | Use |
|---|---|
| `viewport={{ once: true, margin: '-80px' }}` | Default for content sections |
| `viewport={{ once: true, margin: '-100px' }}` | Hero-adjacent sections (let them load before scroll triggers) |
| `viewport={{ once: true, margin: '-50px' }}` | Dense card grids where you want earlier reveal |

**`once: true` is mandatory.** Animations that re-fire on scroll back are forbidden — they distract and make the page feel restless.

## Hover behaviors

### Cards
- Standard content card: `hover:-translate-y-0.5 hover:shadow-card-hover`
- Feature card / clickable card: `hover:-translate-y-1 hover:shadow-lg`
- Card with `group` parent: hover lift + bottom-edge accent line (the canonical CMS hover signal)

```tsx
<div className="group relative ... transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
  ...
  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
</div>
```

### Icon tiles in cards
- `bg-accent-50 text-accent` → `group-hover:bg-accent group-hover:text-white`
- Always wrap parent in `group` so hover state cascades

### Photo cards
- `<Image ... className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />` — subtle, slow scale. Never `scale-110` (too much).

### Buttons
- Color shift only — no transform. `hover:bg-accent-700` from `bg-accent`.

### Links
- `hover:text-accent` from `text-neutral-600` on body links
- `hover:text-accent-700` from `text-accent` on already-accent links
- Underline only with `hover:underline-offset-4 hover:underline` and only when context demands it

## Timing & easing

Eased curve: `[0.25, 0.46, 0.45, 0.94]` — exported as `ease` constant in `@/lib/motion`.

| Animation | Duration |
|---|---|
| Section fade-up | 0.6s |
| Stagger child | 0.5-0.6s with index-based delay |
| Hover transform | 300ms (`transition-all duration-300`) |
| Hover scale on photo | 500ms (`duration-500`) |
| Bottom-edge accent line | 300ms |
| Modal/overlay fade | 0.15s (snappy) |

## Spring usage (very limited)

Springs are only acceptable on:
- Mobile menu open/close
- Sticky filter bar entry
- `layoutId` shared element transitions

**Forbidden** on content sections, cards, hero — those use eased curves only.

If you need a spring: `transition={{ type: 'spring', stiffness: 300, damping: 24 }}`.

## Forbidden patterns

- ❌ Re-firing animations (`once: false` or no `once`)
- ❌ Multiple competing animations on the same element
- ❌ Springs on body content
- ❌ Transform-based animations on text (causes blur on retina)
- ❌ `delay` chains that exceed 1.5s — visitors won't wait
- ❌ Different easing curves in the same section
- ❌ Inline variants when `@/lib/motion` exports already exist

## Accessibility

Respect `prefers-reduced-motion`. Framer Motion does this by default if you use `useReducedMotion()` — when adding new motion, wire that hook to skip the transform component:

```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduce = useReducedMotion();
const variants = shouldReduce ? fadeIn : fadeUp;
```

This is not yet implemented site-wide — it's a polish opportunity. Worth adding when you next touch a motion-heavy section.
