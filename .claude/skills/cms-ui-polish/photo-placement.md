# Photo Placement — CMS Group

The visual quality of the site depends on photos as much as type. Get the aspect ratio, overlay, and caption right and the page reads as premium. Get them wrong and it feels stock.

## Aspect ratios — the full taxonomy

| Aspect | Use | Tailwind |
|---|---|---|
| 16/9 | Project cards, event cards, trading domain cards | `aspect-video` |
| 16/10 | Newsroom event cards (slightly tighter) | `aspect-[16/10]` |
| 4/5 | Portraits (leadership), story-section photos | `aspect-[4/5]` |
| 3/4 | Featured testimonial portrait | `aspect-[3/4]` |
| 1/1 | Product tile thumbnails (in venture grids) | `aspect-square` |
| 21/9 | Cinematic hero overlay (rare) | `aspect-[21/9]` |

**Within a single grid, every photo MUST share the same aspect ratio.** Mixed aspects = the row jitters, looks unprofessional. If your data has photos in mixed ratios, force them into the section's chosen aspect with `object-cover` (and accept the crop).

## Image source rules

```tsx
import Image from 'next/image';

<Image
  src={photo}
  alt={descriptiveAlt}
  fill                          // for aspect-* containers
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover"
/>
```

- **Always use `next/image`.** Never plain `<img>` tags except in cases where Image isn't applicable (logos in static positioning sometimes).
- **Always provide `sizes`** when using `fill` — gets you proper srcset and avoids over-fetching.
- **Always `object-cover`** for content photos. `object-contain` only for logos.
- **Always provide `alt`.** Describe the photo content, not the page context.
- **Use `priority` only on the LCP image** (typically the PageHero background).

## Overlay rules — when text sits on a photo

The signature CMS overlay is a two-layer dark gradient:

```tsx
{/* Vertical gradient — for content overlaying bottom of photo */}
<div className="absolute inset-0 bg-gradient-to-t from-neutral-charcoal/95 via-neutral-charcoal/60 to-neutral-charcoal/40" />
{/* Horizontal gradient — adds left-side darkness for left-aligned text */}
<div className="absolute inset-0 bg-gradient-to-r from-neutral-charcoal/80 via-neutral-charcoal/30 to-transparent" />
```

This is `PageHero`'s built-in treatment. Use the same pattern for any photo card with text overlay.

**For caption-only overlay (no large title):** use a single gradient:
```tsx
<div className="absolute inset-0 bg-gradient-to-t from-neutral-charcoal/70 via-transparent to-transparent" />
```

**Failure modes:**
- Text on photo without any gradient → unreadable on bright photos
- Solid color overlay (`bg-neutral-charcoal/50`) → looks flat, no atmosphere
- Gradient too light (`from-neutral-charcoal/40`) on a busy photo → text still illegible
- Gradient on a photo without text → unnecessary darkness

## Caption positioning

| Photo location | Caption position | Anatomy |
|---|---|---|
| Hero photo | Title overlays bottom-left, kicker above | Already done by `PageHero` |
| Story photo (4/5 portrait) | Bottom overlay, full width of card | KickerLabel + h3 + 1-line meta |
| Project / event card | Badge top-left, year top-right (no bottom caption — title is below image) | `<ContentCard>` handles |
| Leadership portrait | No overlay caption (text below image) | Card body has name/role/summary |
| Featured project card (e.g. in Story section) | Bottom overlay with kicker + title | See `/about` story section |

### Canonical bottom-overlay caption

```tsx
<div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
    Featured Project
  </p>
  <p className="mt-2 font-display text-xl font-bold text-white lg:text-2xl">
    Nepal Rastra Bank — Thapathali
  </p>
  <p className="mt-1 text-sm text-white/70">
    1.5 lakh sq.ft BKB parquet flooring, Armstrong ceiling
  </p>
</div>
```

## Photo "category" rules — what photo to use where

### Page hero photos
- Homepage → wide angle of a flagship project (Tiger Palace, Ncell HQ, etc.)
- /about → office building OR group photo OR a flagship project (currently Bir Hospital)
- /ventures → photo from the venture's industry (e.g. AANSON for trading)
- /brands → photo from a project featuring multiple brand partners
- /trading → wide angle of a sanitary/finishing showroom or a hotel bathroom
- /trading/[domain] → the domain's hero image (already wired in `data/products.ts`)
- /contracting → an interior fit-out in progress or finished (e.g. Dusit Thani)
- /services → a photo of one of the sectors (currently grande-hospital.jpg for hospital reference)
- /projects → wide angle of the most recognizable project (Tiger Palace)
- /newsroom → an event hall / community gathering photo (Lumbini Convention)
- /contact → the office exterior or interior (currently icimod.jpg as placeholder)
- /career → group / team photo OR an open-office shot (currently ncell-hq.jpg as placeholder)

### Story section photos
- Should show a *project* that backs up the company's claims
- Always include a caption that names the project + scope
- Use a different project than the hero photo (avoid repetition)

### Leadership portraits
- Always 4/5 aspect, headshot framing
- Background should be neutral (gradient placeholder is fine when real isn't available)
- Do NOT crop too tight — 1.5 to 2 head-heights of headroom

### Project / event cards
- Always 16/9 (use `aspect="video"` on `<ContentCard>`)
- Crop should show the building / event, not the surroundings
- For events without photos, use the category-tinted gradient + icon (defined in `/newsroom/page.tsx`)

## Accent rule placement on photos

The 8px accent rule (`h-px w-8 bg-accent`) is the kicker visual signature. When it appears over a photo:
- Use `bg-white/40` instead of `bg-accent` (better contrast on dark gradient)
- Pair with `text-white/80` on the kicker text
- `<KickerLabel inverted>` does this automatically

## Logo treatment (brand logos)

Logos are displayed as monochrome or in their original color depending on context.

### On `/brands` page (small grid)
- Logo box: `h-32 w-48` or similar, `bg-neutral-off-white`, `rounded-xl`, padded `p-4`
- Image: `<Image fill object-contain>` so logos preserve aspect
- Fallback: lucide `Building2` icon when logo not yet uploaded

### On `/trading/[slug]` (1-per-card large)
- Logo box: same `h-32 w-48`, hidden on mobile (`hidden lg:flex`), shown on desktop right side of brand card
- Same fallback pattern

## Photos pending vs. placeholder rules

When photos haven't been delivered:
1. **Leadership:** lucide `User2` icon centered on `bg-gradient-to-br from-accent-50 to-neutral-100` placeholder
2. **Brand logos:** lucide `Building2` icon + "Logo" caption on neutral box
3. **Event photos:** category-tinted gradient + category icon (already implemented in `/newsroom`)
4. **Project photos:** sector-themed image fallback (already implemented in `/projects`)
5. **Trading domain heroes:** AI-generated placeholders are in place per the TNC docx instruction

**Don't ship unless** the placeholder is itself styled — empty `<div>`s or broken image icons are unacceptable.

## When real photos arrive (the swap workflow)

1. Drop the photo into the appropriate `/public/images/<category>/` directory
2. Update the `image` or `photo` field in the corresponding data file
3. Verify the `imageAlt` is still descriptive of the new photo (not the placeholder)
4. Verify aspect ratio crops cleanly — adjust `object-position` if face/subject is off-center
5. Build + visually verify
6. Commit as `assets: real <category> photo for <subject>`

This swap should never require code changes beyond the data file.
