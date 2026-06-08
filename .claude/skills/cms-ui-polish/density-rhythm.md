# Density & Rhythm — CMS Group

How to compose a *page* (not a single section). Order, alternation, breath, count.

## Section background alternation

The default rhythm is **light → soft → light → soft**. Insert one **dark** section as a visual reset somewhere in the middle of long pages.

### Allowed sequences

For a 5-section page:
```
hero (dark) → soft → light → soft → light(CTA)
```

For an 8+ section page:
```
hero (dark) → soft → light → soft → DARK → light → soft → light(CTA)
```

The single dark section is the **strongest visual moment** of the page. Use it for:
- A timeline (milestones)
- A signature quote / testimonial
- A "by the numbers" stat block (when scaled up)
- A hero secondary image with an overlaid statement

### Forbidden sequences

- Two dark sections back-to-back → too heavy
- Light → light → light → light (no variation) → flat, one-note
- Soft → light → soft → light → soft → light (every section the same alternation, no dark anchor) → polite but forgettable
- Dark section as the first content section after the hero → confusing visual weight

## Section count target

| Page type | Target section count |
|---|---|
| Homepage | 6-7 |
| Landing pages (/about, /ventures, /trading, /brands) | 6-8 |
| Detail pages (/trading/[slug], /career) | 4-6 |
| Form pages (/contact, /career apply) | 3-5 |

If a page is hitting 9+ sections, **consolidate**. Common merges:
- Mission + Vision + Values → "What we stand for" (one section, three internal columns)
- Story + Stats anchor → "Our story" with embedded metrics
- Certifications + Brand partners (when both exist) → "Authorised distribution" with subsections

## "Breath" sections

Every 2-3 dense content sections, insert a **breath section**:
- A single quote (full-width, large display type)
- A full-bleed photo with a one-line statement
- A centered stat (single big number with a kicker and a one-sentence context)
- A dark "reset" section (already counted in the dark allowance above)

Breath sections feel **deliberate emptiness**. Padding generous, text minimal.

### Canonical "single quote" breath section

```tsx
<Section variant="soft" compact>
  <div className="mx-auto max-w-3xl text-center">
    <KickerLabel className="justify-center">In our chairman's words</KickerLabel>
    <blockquote className="mt-8 font-display text-2xl font-bold leading-snug tracking-tight text-neutral-charcoal sm:text-3xl lg:text-4xl">
      &ldquo;We endeavour to meet the different needs of our esteemed clientele
      by emphasising integration and complete solutions.&rdquo;
    </blockquote>
    <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-accent">
      Mr. Prashant Agarwal · Chairman
    </p>
  </div>
</Section>
```

### Canonical "single stat" breath section

```tsx
<Section variant="dark" compact>
  <div className="mx-auto max-w-3xl text-center">
    <KickerLabel inverted className="justify-center">Our scale</KickerLabel>
    <p className="mt-6 font-display text-7xl font-bold tracking-tight text-white sm:text-8xl lg:text-9xl tabular-nums">
      500+
    </p>
    <p className="mt-4 text-base font-semibold uppercase tracking-[0.22em] text-white/70">
      Projects delivered across Nepal since 2002
    </p>
  </div>
</Section>
```

## Mobile rhythm

On mobile, "rhythm" mostly comes from section padding (the bg alternation is less impactful when you're scrolling one column). Compensate by:
- Tightening per-section padding (default `py-20 lg:py-28` is fine; don't go bigger on mobile)
- Sticky filter bars are extra valuable on mobile — let users skip ahead
- Hero image must be sized for mobile (hero photos that were chosen for landscape framing crop poorly to portrait — verify visually)

## Within-section density

Inside a section, content density should match the section type:

| Section type | Card / item count |
|---|---|
| Stats anchor | 3-4 |
| Values / principles grid | 3 or 6 (clean math) |
| Brand / partner grid | 3-12 per group |
| Project / event grid | 6-21 (with filter when 12+) |
| Leadership grid | 3-6 directors + 1 chairman tier |
| Certifications | 6 default + show-all toggle for 7+ |
| Mission/Vision card pair | exactly 2 |
| Trading domain grid | 12 (the canonical count) |

## "Page narrative" arc

Every page should follow this loose narrative arc top to bottom:

1. **Identity** (hero) — who we are
2. **Proof** (stats / one signature stat) — by the numbers
3. **Story** (split content) — what we've done
4. **Substance** (multiple grids of values, services, brands, projects) — what we offer
5. **Reset** (dark section — timeline, quote, signature stat) — the visual anchor
6. **People** (leadership, testimonials) — who's behind it
7. **Conversion** (ContactCTA) — what to do next

Not every page needs all 7 — short detail pages collapse 3-4 of these. But the order is the order.

## Indentation / micro-spacing standards (cross-section)

These apply to all sections. Do not vary.

| Pair | Spacing class |
|---|---|
| Kicker → h2 | `mt-4` (small) or `mt-5` (default) |
| h2 → lead paragraph | `mt-5` to `mt-6` |
| Lead → content grid | `mt-12` to `mt-14` |
| h3 → body in cards | `mt-3` (default) or `mt-5` if there's a subtitle inbetween |
| Body → meta in cards | `mt-2` to `mt-4` |
| Section → section | handled by `<Section>` padding — don't add extra |

## Container widths

Default content max-width is provided by `<Container>`. Inside a Section:
- Body copy, lead paragraphs: `max-w-3xl` for centered, full container for split
- SectionHeader: `max-w-3xl` (built into `<SectionHeader>`)
- Quote / breath sections: `max-w-3xl text-center mx-auto`

If a section needs a wider content area (e.g. a 4-col grid on desktop), don't constrain. If it needs a narrower one (long-form reading), constrain to `max-w-prose` or `max-w-2xl`.

## When breaking the rules is OK

- **Hero variation:** the homepage hero can deviate from the standard `PageHero` — it's allowed to use a custom Hero.tsx with a more dramatic treatment. Other pages must use `PageHero`.
- **Sticky filter bars:** when a page has filters (`/projects`, `/newsroom`), the sticky bar breaks normal flow — that's expected.
- **Featured single item:** when one item in a list deserves visual primacy (e.g. featured event in /newsroom, chairman in leadership), break the grid pattern intentionally.

In all other cases, follow the rules. Variation looks like sloppiness when not earned.
