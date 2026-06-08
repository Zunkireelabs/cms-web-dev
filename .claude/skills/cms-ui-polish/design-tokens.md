# Design Tokens — CMS Group

The locked color, type, spacing, and shape contract. Every styling decision references this file. **No new tokens without updating this file in the same PR.**

## Color contract

### `accent-*` (orange — the primary action color)
Used for: primary CTAs, kicker rules, kicker text, active nav state, hover lifts on cards, focus rings, accent edges.

| Token | Hex (approx) | Use |
|---|---|---|
| `accent-50` | `#FFF4ED` | Soft accent backgrounds, hover-tint, icon-tile bg |
| `accent` (alias of `accent-500/600`) | `#F47B27` | Default orange — primary CTA bg, kicker text, accent rules |
| `accent-700` | `#C95E18` | CTA hover, deeper accent text |

**Examples:**
- `bg-accent text-white hover:bg-accent-700` — primary button
- `text-accent` — kicker label text, link hover state
- `bg-accent-50 text-accent` — icon tile (matched for `group-hover:bg-accent group-hover:text-white`)
- `border-accent/40` — hover border for cards
- `ring-accent` — focus rings

### `brand-*` (deep teal — the supporting cool tone)
**Reserved use only.** Do not use brand-* for primary CTAs, headings, or active states.

Used for:
- Light tint backgrounds (`brand-50`, `brand-100`) on placeholder image gradients
- Light icon placeholders (`brand-200`, `brand-300`) on empty states
- Inverted-context accents on the dark milestones section

| Token | Use |
|---|---|
| `brand-50` | Placeholder gradient start — `from-brand-50 to-neutral-100` |
| `brand-100` | Tint backgrounds on gradient hero placeholders |
| `brand-200` / `brand-300` | Empty-state icon colors only |

**Forbidden** in `src/app/**` and `src/components/**` (except `src/data/**`):
- `bg-brand-600`, `bg-brand-700`, `bg-brand-900`
- `text-brand-600`, `text-brand-700`, `text-brand-900`
- `hover:bg-brand-*`, `hover:text-brand-600`
- `ring-brand-500`

If you find any of these, swap them to `accent-*` equivalents.

### `neutral-*` (grays — the structural color)

| Token | Use |
|---|---|
| `neutral-charcoal` | All body text headings, dark CTAs, dark hero overlays |
| `neutral-600` | Body copy default |
| `neutral-500` | Meta text (locations, dates, secondary captions) |
| `neutral-400` | Tertiary meta (very faint labels) |
| `neutral-300` | Form input borders default |
| `neutral-200` | Card borders default |
| `neutral-100` | Subtle backgrounds, scope-tag chip bg |
| `neutral-off-white` | `Section variant="soft"` background |
| `neutral-border` | Alias for `neutral-200` (preferred for cards) |
| `neutral-surface` | Alias for hover bg on neutral buttons |

Body copy hierarchy:
- Hero subtitle: `text-white/80` on dark bg, or `text-neutral-600` on light
- Section lead: `text-neutral-600 leading-relaxed`
- Card description: `text-sm leading-relaxed text-neutral-600`
- Caption / meta: `text-xs text-neutral-500` or `text-[11px]` for tighter

## Type scale

All headings use `font-display` (Manrope, 700). Body copy uses default sans (Inter or system).

### Heading sizes

| Element | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| Hero h1 (tall) | `text-4xl sm:text-5xl lg:text-6xl xl:text-7xl` | `font-bold` | `tracking-tight` | `leading-[1.05]` |
| Hero h1 (compact) | `text-3xl sm:text-4xl lg:text-5xl` | `font-bold` | `tracking-tight` | `leading-tight` |
| Section h2 | `text-3xl sm:text-4xl lg:text-5xl` | `font-bold` | `tracking-tight` | `leading-[1.1]` |
| Card h3 (large) | `text-xl sm:text-2xl` or `text-2xl sm:text-3xl` | `font-bold` | `tracking-tight` | `leading-tight` |
| Card h3 (small) | `text-lg sm:text-xl` | `font-bold` | (none) | `leading-tight` |
| Display numerals (stats, year) | `text-3xl sm:text-4xl` to `text-5xl sm:text-6xl lg:text-7xl` | `font-bold` | `tracking-tight` | `leading-none` (and `tabular-nums`) |

### Kicker (small uppercase label above heading)

The signature CMS Group element. Always `<KickerLabel>` from `@/components/ui`.

```tsx
<KickerLabel>Our Story</KickerLabel>
```

Renders as: 8px accent rule (`h-px w-8 bg-accent`) + 11px text uppercase 0.22em tracking semibold accent.

For dark backgrounds: `<KickerLabel inverted>Our Story</KickerLabel>` — switches to `bg-white/40` rule + `text-white/80` text.

### Body copy

| Use | Class |
|---|---|
| Section lead | `text-base leading-relaxed text-neutral-600 sm:text-lg` |
| Card description | `text-sm leading-relaxed text-neutral-600` |
| Meta / caption | `text-xs text-neutral-500` |
| Tiny meta | `text-[11px] text-neutral-400` or `text-[10px]` for badges |
| Hero subtitle | `text-lg sm:text-xl leading-relaxed text-white/80` (dark hero) or `text-neutral-600` (light) |

### Link / inline accent text
`text-accent hover:text-accent-700` with `font-semibold` — never underline by default; underline only on hover with `hover:underline-offset-4 hover:underline`.

## Spacing rhythm

Vertical rhythm is the strongest visual signature. Don't improvise.

### Within a section (kicker → title → lead → content)

```
KickerLabel
  ↓ mt-5
<h2>
  ↓ mt-5  (or mt-4 if no kicker, mt-6 if title is short and breathing room helps)
<lead paragraph>
  ↓ mt-12 to mt-14  (the breath before the content grid/cards)
<content (cards / grid / split layout)>
```

### Section vertical padding (provided by `<Section>`)

| Variant | Class |
|---|---|
| Default | `py-20 lg:py-28` |
| `compact` | `py-12 lg:py-16` |
| Hero `tall` | `min-h-[480px] py-24 lg:py-32 lg:min-h-[560px]` |
| Hero `compact` | `min-h-[320px] py-16 lg:py-24 lg:min-h-[400px]` |

### Card internal padding

| Card type | Padding |
|---|---|
| Tight card (small icon-tile + text) | `p-6` |
| Standard content card | `p-7` |
| Large feature card / form card | `p-8 lg:p-10` |
| Inside-image content card (below the image) | `p-6` |

**Standardize within a single grid.** Mixed `p-6` and `p-7` cards in the same grid is a smell.

### Grid gaps

| Grid type | Gap |
|---|---|
| Primary content card grid (3-col) | `gap-6` |
| Tight card grid (4-col compact) | `gap-5` |
| Stat strip / metric row | `gap-x-6 gap-y-12 lg:gap-12` |
| Split layout (2-col content/image) | `gap-12 lg:gap-16` |

### Internal element spacing in cards

```
Icon tile (12x12 / 14x14)
  ↓ mt-5 (small card) or mt-6 (large card)
<h3 card title>
  ↓ mt-1.5 if subtitle, otherwise mt-3 to mt-5 if going to body
<subtitle (optional, accent uppercase)>
  ↓ mt-3
<description body>
```

## Border radius

| Element | Radius |
|---|---|
| Buttons, inputs, chips | `rounded-lg` |
| Standard cards, list items | `rounded-xl` |
| Feature cards, hero cards, photo cards, form containers | `rounded-2xl` |
| Pill chips, badges | `rounded-full` |

**Never `rounded-md` or `rounded-3xl`** — those don't match the system.

## Shadow

| Use | Class |
|---|---|
| Default card shadow | `shadow-card` |
| Hovered card shadow | `shadow-card-hover` (or `shadow-lg` on translate-y hovers) |
| Photo card overlays | `shadow-lg` |
| Stat strip / sticky bars | `shadow-sm` |

Both `shadow-card` and `shadow-card-hover` are project tokens — do not invent new shadow scales.

## Opacity & overlay rules

| Surface | Overlay |
|---|---|
| Photo behind text (any) | `bg-gradient-to-t from-neutral-charcoal/95 via-neutral-charcoal/60 to-neutral-charcoal/40` plus `bg-gradient-to-r from-neutral-charcoal/80 via-neutral-charcoal/30 to-transparent` |
| Photo behind no text (decorative) | None — let the photo breathe |
| Backdrop blur (sticky bars) | `bg-white/95 backdrop-blur-md` (light) or `bg-white/5 backdrop-blur-sm` (dark/glassmorph card) |

## Font-feature-settings

Use `tabular-nums` on stat numerals, year stamps, version numbers, anything where digit alignment matters.
