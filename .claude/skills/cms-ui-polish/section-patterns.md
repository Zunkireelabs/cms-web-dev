# Section Patterns — CMS Group

Each section type below has a **canonical structure**, a **content density rule**, and a list of **failure modes** to avoid. When composing or restructuring a section, find the matching pattern below and follow it.

If the section type you need isn't listed, default to a 2-column split or a 3-card grid with `Section` + `SectionHeader`. Don't invent new section types ad-hoc.

---

## 1. PageHero — top of every page

**Primitive:** `<PageHero>` from `@/components/ui`

**Content density:** kicker (1-3 words) + title (1 sentence) + subtitle (1-2 sentences max) + optional CTAs + optional breadcrumbs.

**Variants:**
- `size="tall"` — landing pages (homepage, /about, /trading, /ventures, /brands, etc.)
- `size="compact"` — detail pages with breadcrumbs (`/trading/[slug]`, `/contact`, etc.)

**Always include:**
- `image` — never run a hero without a real photo. The gradient-only fallback is for emergency only.
- `imageAlt` — describe the photo, not the page

**Failure modes:**
- Subtitle longer than 2 sentences → push detail into the first content section
- Multiple H1s on the page → only the PageHero may be H1
- Photo that's a *project* photo on a page that's not about projects (e.g. /about hero with Bir Hospital is acceptable, but "/career" should use a team/group photo)
- No accent kicker → looks unbranded

---

## 2. Stat anchor — context-setting numbers below the hero

**Primitive:** `<Section variant="soft" compact>` containing a 2-col-mobile / 4-col-desktop grid of `<StatBlock>` with `border-l border-accent/40 pl-5 lg:pl-6` left rules.

**Content density:** 3 to 4 stats. Never 5+ (cluttered) or 2 (looks empty).

**Canonical layout:**
```tsx
<Section variant="soft" compact>
  <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-12">
    {STATS.map((stat) => (
      <div key={stat.label} className="border-l border-accent/40 pl-5 lg:pl-6">
        <StatBlock value={stat.value} label={stat.label} size="md" />
      </div>
    ))}
  </div>
</Section>
```

**Optional kicker above the strip:** when the stats need context, wrap them in a kicker + lead block. But this section earns its place even without one.

**Failure modes:**
- Using `border-l` without the accent color → loses brand signal
- Stats without `tabular-nums` (built into StatBlock) → digits drift
- Mixing 2-col mobile with 3-col desktop → orphans on tablet

---

## 3. Story / split-content — content + photo side by side

**Structure:** `<Section variant="light">` with `grid items-center gap-12 lg:grid-cols-2 lg:gap-16`

**Content column (left):**
- `<KickerLabel>` (mt-0)
- `<h2>` (mt-5)
- Lead paragraph (mt-6, `text-base sm:text-lg leading-relaxed text-neutral-600`)
- **Optional 2x2 meta grid** (Founded / HQ / Sectors / Ventures) — breaks the wall of text
- 1 supporting paragraph (mt-6) — and that's it

**Photo column (right):**
- `aspect-[4/5]` portrait, `rounded-2xl`, `overflow-hidden`
- `<Image fill object-cover>`
- Bottom-overlay gradient + caption (kicker + title + 1-line meta)

**Density rule:** never more than **2 paragraphs** in the content column. If you have 3+ paragraphs of copy, break with a meta grid, pull-quote, or stat callout.

**Failure modes:**
- 3+ dense paragraphs → reading fatigue
- Photo without an overlay caption → orphaned image
- Symmetric column heights but asymmetric content density → looks unbalanced
- Project photo without it being labelled as such → user thinks it's stock

---

## 4. Mission & Vision (or any 2-card "two pillars" block)

**Structure:** `<Section variant="soft">` + `<SectionHeader align="center">` + 2-col card grid.

**Density rule:** **The two cards must be visually symmetric.** If Mission has 3 bullets, Vision has 3 bullets. If Vision is a paragraph, Mission is a paragraph. Mismatch = looks unfinished.

**Canonical card:**
```tsx
<div className="rounded-2xl border border-neutral-200 bg-white p-8 lg:p-10">
  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-white">
    <Icon className="h-7 w-7" strokeWidth={1.75} />
  </div>
  <h3 className="mt-6 font-display text-2xl font-bold text-neutral-charcoal">
    Title
  </h3>
  {/* Either bulleted list OR paragraph — match the other card */}
</div>
```

**Failure modes:**
- One card is bullets, other is paragraph → fix the asymmetry
- Cards with different padding → standardize to `p-8 lg:p-10`
- Both icons the same color/shape → vary the icons but keep treatment consistent
- More than 2 cards in this pattern → switch to a 3-or-6 grid (Core Values pattern)

---

## 5. Values / principles grid (3-col or 6-card)

**Structure:** `<Section variant="light">` + center-aligned `<SectionHeader>` + 3-col grid.

**Density rule:** 3, 6, or 9 cards (clean math). Never 4, 5, 7, 8.

**Canonical card:**
```tsx
<div className="group rounded-xl border border-neutral-200 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-lg">
  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-50 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
    <Icon className="h-5 w-5" strokeWidth={1.75} />
  </div>
  <h3 className="mt-6 font-display text-lg font-bold leading-tight text-neutral-charcoal">
    {value.title}
  </h3>
  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{value.description}</p>
</div>
```

**Variation when count is 6+:** consider visually elevating the top 3 (larger card, bigger icon, longer description) and the bottom 3 as denser chips. Avoid 6 identical cards if any of the values has clear primacy.

**Failure modes:**
- 6 cards all identical and all equally important → flatness, no hierarchy
- 4 cards in a 3-col grid → orphan in row 2
- Tiny `p-5` or huge `p-10` cards → use `p-7` standard

---

## 6. Timeline / milestones (vertical alternating)

**Structure:** `<Section variant="dark">` + center-aligned inverted `<SectionHeader>` + alternating L/R cards along a vertical accent rule.

**Why dark:** the milestones section is the "reset" of the page — a strong visual interrupt between content sections. Always use `variant="dark"` here.

**Density rule:** 5 to 8 milestones. Less feels sparse, more drags.

**Canonical structure:** see `examples/milestones-timeline.tsx` if needed (or current `/about` page).

**Critical detail:** the dot at each milestone should ring the dark bg color so it appears to sit on the rule. `ring-4 ring-neutral-charcoal`.

**Improvement opportunity over the current implementation:** add a subtle year-label tick on the empty side of each row so the timeline feels more substantial. Don't ship floating cards in empty space.

**Failure modes:**
- Light bg behind the timeline → loses the visual reset role
- Empty negative space on the alternating side → feels unfinished (add subtle year tick or year stamp)
- 4 milestones (sparse) or 12 (drags) → cut or merge

---

## 7. Leadership grid (Chairman + Directors)

**Structure:** `<Section variant="light">` + center-aligned `<SectionHeader>` + **two-tier layout**:

### Tier 1 — Chairman (always visually distinct)
- Full-width row OR a 2-col split (large portrait left, full bio right) — never a card identical to the directors
- Photo: `aspect-[4/5]` or `aspect-[3/4]`, larger than the director cards
- Full bio rendered (not line-clamped)
- "Chairman" badge top-left of photo

### Tier 2 — Directors (3-col or 4-col grid based on count)
- 3 directors → 3-col
- 6 directors → 3-col (2 rows)
- 4 or 5 directors → 4-col with one centered second row, OR drop to 3-col with one orphan in row 2 (avoid this — restructure to 3 or 6)
- 7 directors → 3-col (3 rows of 2 + 1 → bad math; either group two as deputies, or 4-col first row + 3-col second row)

**Canonical director card:**
```tsx
<div className="group">
  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100">
    <Image src={member.photo} alt={member.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
  </div>
  <h3 className="mt-5 font-display text-base font-bold text-neutral-charcoal">{member.name}</h3>
  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">{member.title} · {member.company}</p>
  <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-4">{member.summary}</p>
</div>
```

**Failure modes:**
- Chairman in same card style as directors → hierarchy collapsed
- 4-col grid with 7 directors → orphan card
- All summaries `line-clamp-4` regardless of length → truncated mid-sentence
- Photos with mixed aspect ratios → row drifts

---

## 8. Brand / partners grid (logo wall or detailed cards)

**Two modes — pick based on context:**

### Mode A: detailed (used on `/trading/[slug]` brand partners section)
- 1-col stack of full-width cards
- Each card: brand name (display font), country meta, specialty (accent), description, dual brochure CTAs (View + Download), logo box on the right
- Use when fewer than ~6 brands per domain
- Canonical card structure exists in `src/app/trading/[slug]/page.tsx::PartnerCard`

### Mode B: dense logo grid (used on `/brands` page when many brands)
- 4-col grid of compact cards: brand name, country, segments
- Use when grouping by venture (5+ ventures × 5-15 brands each)
- Canonical card structure exists in `src/app/brands/page.tsx::BrandCard`

**Failure modes:**
- Mixing Mode A and Mode B in the same section → visual inconsistency
- Logos at varying sizes → enforce uniform logo box (`h-32 w-48` or similar) with `object-contain`
- Dense mode with >12 brands per row group → split into venture sub-sections

---

## 9. Project / portfolio grid

**Structure:** `<Section>` + `<SectionHeader>` + 3-col grid of `<ContentCard>`.

**Card props mapping:**
- `image` → `project.image`
- `imageAlt` → `project.title`
- `title` → `project.title`
- `description` → `project.description`
- `badge` → `project.sector` (lowercase, will display capitalized)
- `meta` → `String(project.year)`
- `location` → `project.location`
- `aspect` → `'video'`

**Sticky filter bar above grid:**
- Use when count > 12 projects
- 2 levels: type tabs (Commercial / Residential) + sector chips
- Active state: `bg-accent text-white`
- Inactive: `bg-neutral-100 text-neutral-600 hover:bg-neutral-200`
- Sticky positioning: `sticky top-16 z-30 border-y border-neutral-200 bg-white/95 backdrop-blur-md lg:top-20`

**Failure modes:**
- Custom project card instead of `<ContentCard>` → drift from the system
- Sector chips in `bg-brand-100 text-brand-700` → use accent-50 / accent

---

## 10. Newsroom / events grid

Same as Project grid (use `<ContentCard>`), but:
- `aspect="video"` (16:10 also acceptable)
- When event has no photo, render a category-tinted gradient + icon (defined in `/newsroom/page.tsx::CATEGORY_GRADIENTS`)
- Date stamp overlay on bottom-left of image: rounded accent block with month/year

**Featured event** at the top: 2-col split card (photo left, content right), wrapped in a `<Section variant="soft" compact>` for visual separation.

---

## 11. Certifications / association proofs

**Default:** 3-col grid with `<ContentCard>`-style cards (icon, brand name, type, scope).

**When count > 9:** Show first 6 + "Show all N certifications" toggle button.

**Toggle pattern:**
```tsx
const [showAll, setShowAll] = useState(false);
const visible = showAll ? CERTIFICATIONS : CERTIFICATIONS.slice(0, 6);
// ...
{!showAll && CERTIFICATIONS.length > 6 && (
  <div className="mt-12 text-center">
    <button
      onClick={() => setShowAll(true)}
      className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-neutral-charcoal transition-colors hover:border-accent/40 hover:bg-accent-50 hover:text-accent"
    >
      Show all {CERTIFICATIONS.length} certifications
      <ChevronDown className="h-4 w-4" />
    </button>
  </div>
)}
```

**Failure modes:**
- 18 identical cards in 6 rows → visual fatigue (the failure mode this pattern fixes)
- Icon variation (`Award`, `Shield`, etc.) per card → looks busy, keep one icon
- No country/date meta → cards look interchangeable

---

## 12. Testimonials

**Use the existing `<Testimonials>` component** from `@/components/sections`. It's a curated wall of letter-style cards. Don't reimplement.

If you need a single testimonial as a pull-quote inside another page, use:
```tsx
<blockquote className="rounded-2xl border border-neutral-200 bg-white p-8 lg:p-10">
  <p className="font-display text-xl leading-relaxed text-neutral-charcoal lg:text-2xl">
    &ldquo;Quote text here.&rdquo;
  </p>
  <footer className="mt-6 flex items-center gap-3">
    <div className="h-10 w-10 rounded-full bg-accent-50" />
    <div>
      <p className="font-semibold text-neutral-charcoal">Name</p>
      <p className="text-xs text-neutral-500">Role · Company</p>
    </div>
  </footer>
</blockquote>
```

---

## 13. Contact / lead-gen sections

**Use `<ContactCTA>` from `@/components/sections`** for the page-end CTA. Don't reimplement.

For mid-page lead capture (form):
- Wrap in `<Section variant="light">`
- 2-col split: form left, contact info / map right
- Form on `rounded-2xl border bg-white p-8 lg:p-10 shadow-card`
- Inputs: `rounded-lg border border-neutral-300 px-4 py-3 focus:border-accent focus:ring-2 focus:ring-accent/30`
- Submit: full-width on mobile, `sm:w-auto` on desktop, `bg-accent hover:bg-accent-700` uppercase tracking-wider

---

## Cross-cutting rule: section bookends

Every page ends with:
1. (optional) Testimonials section
2. `<ContactCTA />`

No exceptions. The footer doesn't count as a CTA — every page needs an explicit "talk to us" surface above the footer.
