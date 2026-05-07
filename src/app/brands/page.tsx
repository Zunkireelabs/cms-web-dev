'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowUpRight,
  Award,
  Globe2,
  MapPin,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ContactCTA } from '@/components/sections';
import {
  BRANDS,
  TOTAL_BRAND_COUNT,
  VENTURE_LABELS,
  type BrandEntry,
  type VentureSlug,
} from '@/data/brands';

const CURRENT_YEAR = 2026;

const VENTURE_ORDER: VentureSlug[] = [
  'bath-n-room',
  'baba-muktinath',
  '4r-technologies',
  'techwood',
];

const VENTURE_TAGLINES: Record<VentureSlug, string> = {
  'bath-n-room':
    'Sanitary fixtures, flooring, and bathroom solutions from global leaders.',
  'baba-muktinath':
    'Roofing, ceilings, doors, hardware, and waterproofing systems.',
  '4r-technologies':
    'Sustainable water management, treatment plants, and pool solutions.',
  techwood:
    'Modular office furniture and flooring for corporate and education sectors.',
};

const VENTURE_PILL_STYLES: Record<VentureSlug, string> = {
  'bath-n-room': 'bg-blue-50 text-blue-700 ring-blue-100',
  'baba-muktinath': 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  '4r-technologies': 'bg-cyan-50 text-cyan-700 ring-cyan-100',
  techwood: 'bg-amber-50 text-amber-700 ring-amber-100',
};

const COUNTRY_FLAGS: Record<string, string> = {
  USA: '🇺🇸',
  Germany: '🇩🇪',
  Japan: '🇯🇵',
  India: '🇮🇳',
  UAE: '🇦🇪',
  China: '🇨🇳',
  France: '🇫🇷',
  Italy: '🇮🇹',
  Netherlands: '🇳🇱',
  Turkey: '🇹🇷',
  Canada: '🇨🇦',
  Ireland: '🇮🇪',
  Thailand: '🇹🇭',
  Sweden: '🇸🇪',
  Australia: '🇦🇺',
  Malaysia: '🇲🇾',
  Brazil: '🇧🇷',
};

function flagFor(country: string): string {
  if (COUNTRY_FLAGS[country]) return COUNTRY_FLAGS[country];
  // Compound countries like "Germany — India"
  const parts = country.split(/\s*[—–-]\s*/);
  if (parts.length > 1) {
    return parts
      .map((p) => COUNTRY_FLAGS[p.trim()] ?? '')
      .filter(Boolean)
      .join(' ');
  }
  return '';
}

const COUNTRIES = Array.from(new Set(BRANDS.map((b) => b.country))).sort();
const COUNTRY_COUNT = new Set(BRANDS.flatMap((b) => b.country.split(/\s*[—–-]\s*/)))
  .size;

const HERITAGE_COUNT = BRANDS.filter(
  (b) => b.founded && CURRENT_YEAR - b.founded >= 50,
).length;

type VentureFilter = 'all' | VentureSlug;

const VENTURE_FILTERS: { slug: VentureFilter; label: string; short: string }[] = [
  { slug: 'all', label: 'All ventures', short: 'All' },
  { slug: 'bath-n-room', label: 'Bath N Room', short: 'Bath N Room' },
  { slug: 'baba-muktinath', label: 'Baba Muktinath', short: 'Baba Muktinath' },
  { slug: '4r-technologies', label: '4R Technologies', short: '4R Tech' },
  { slug: 'techwood', label: 'Techwood', short: 'Techwood' },
];

export default function BrandsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <BrandsPageInner />
    </Suspense>
  );
}

function PageSkeleton() {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-neutral-50/40 to-white">
      <Container>
        <div className="h-10 w-72 bg-neutral-100 rounded-md animate-pulse" />
      </Container>
    </section>
  );
}

function BrandsPageInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialVenture = (searchParams.get('venture') as VentureFilter) || 'all';
  const initialCountry = searchParams.get('country') || 'all';
  const initialSearch = searchParams.get('q') || '';

  const [venture, setVenture] = useState<VentureFilter>(
    VENTURE_FILTERS.some((v) => v.slug === initialVenture) ? initialVenture : 'all',
  );
  const [country, setCountry] = useState<string>(
    initialCountry === 'all' || COUNTRIES.includes(initialCountry)
      ? initialCountry
      : 'all',
  );
  const [search, setSearch] = useState(initialSearch);

  // URL sync
  useEffect(() => {
    const params = new URLSearchParams();
    if (venture !== 'all') params.set('venture', venture);
    if (country !== 'all') params.set('country', country);
    if (search.trim()) params.set('q', search.trim());
    const qs = params.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    router.replace(url, { scroll: false });
  }, [venture, country, search, pathname, router]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return BRANDS.filter((b) => {
      if (venture !== 'all' && b.venture !== venture) return false;
      if (country !== 'all' && b.country !== country) return false;
      if (q) {
        const hay = `${b.name} ${b.country} ${b.segments.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [venture, country, search]);

  const grouped = useMemo(() => {
    const groups = new Map<VentureSlug, BrandEntry[]>();
    for (const slug of VENTURE_ORDER) groups.set(slug, []);
    for (const b of filtered) groups.get(b.venture)?.push(b);
    return groups;
  }, [filtered]);

  const hasActiveFilter =
    venture !== 'all' || country !== 'all' || search.trim().length > 0;

  const clearAll = () => {
    setVenture('all');
    setCountry('all');
    setSearch('');
  };

  return (
    <>
      <Hero />
      <FilterBar
        venture={venture}
        setVenture={setVenture}
        country={country}
        setCountry={setCountry}
        search={search}
        setSearch={setSearch}
        resultCount={filtered.length}
        hasActiveFilter={hasActiveFilter}
        clearAll={clearAll}
      />
      <BrandsExplorer
        venture={venture}
        filtered={filtered}
        grouped={grouped}
        hasActiveFilter={hasActiveFilter}
        clearAll={clearAll}
      />
      <ContactCTA />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: `${TOTAL_BRAND_COUNT}+`, label: 'Brand partners' },
    { value: '4', label: 'Distributing ventures' },
    { value: `${COUNTRY_COUNT}+`, label: 'Countries of origin' },
    { value: `${HERITAGE_COUNT}`, label: '50+ year legacy' },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white via-neutral-50/40 to-white pt-20 pb-16 lg:pt-28 lg:pb-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-[3px] w-12 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Global Brand Partners
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-neutral-900 tracking-tight leading-[1.05]">
            <span className="text-accent">{TOTAL_BRAND_COUNT}+</span> world-class
            brands.
            <br className="hidden sm:block" /> One trusted partner in Nepal.
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-neutral-600 leading-relaxed">
            Authorized distribution, joint ventures, and exclusive partnerships
            across four CMS Group ventures &mdash; powering construction projects
            from sanitaryware in 1817 to ceramic-tile manufacturing today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 divide-x divide-neutral-200 rounded-2xl border border-neutral-200 bg-white"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="px-4 py-5 sm:px-6 sm:py-6">
              <div className="font-display text-2xl sm:text-3xl font-semibold text-neutral-900 tabular-nums">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Filter Bar                                                                 */
/* -------------------------------------------------------------------------- */

interface FilterBarProps {
  venture: VentureFilter;
  setVenture: (v: VentureFilter) => void;
  country: string;
  setCountry: (c: string) => void;
  search: string;
  setSearch: (s: string) => void;
  resultCount: number;
  hasActiveFilter: boolean;
  clearAll: () => void;
}

function FilterBar({
  venture,
  setVenture,
  country,
  setCountry,
  search,
  setSearch,
  resultCount,
  hasActiveFilter,
  clearAll,
}: FilterBarProps) {
  return (
    <div className="sticky top-0 z-30 border-y border-neutral-200 bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <Container>
        <div className="flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:gap-4">
          {/* Search */}
          <div className="relative flex-1 lg:max-w-sm">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              strokeWidth={1.75}
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search brands, segments, or countries…"
              aria-label="Search brands"
              className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-9 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Venture chips */}
          <div className="flex flex-1 items-center gap-1.5 overflow-x-auto scrollbar-hide -mx-1 px-1">
            {VENTURE_FILTERS.map((v) => {
              const active = venture === v.slug;
              return (
                <button
                  key={v.slug}
                  type="button"
                  onClick={() => setVenture(v.slug)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                  }`}
                >
                  {v.short}
                </button>
              );
            })}
          </div>

          {/* Country select */}
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              aria-label="Filter by country"
              className="h-10 rounded-lg border border-neutral-200 bg-white px-3 pr-8 text-sm text-neutral-700 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="all">All countries</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result count + clear */}
        <div className="flex items-center justify-between gap-3 pb-3 text-xs text-neutral-500">
          <span className="tabular-nums">
            <span className="font-semibold text-neutral-900">{resultCount}</span>
            {' of '}
            <span className="tabular-nums">{TOTAL_BRAND_COUNT}</span> brands
            {hasActiveFilter && ' matching filters'}
          </span>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1 font-semibold text-accent hover:text-accent/80"
            >
              <X className="h-3 w-3" />
              Clear all
            </button>
          )}
        </div>
      </Container>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Explorer (grouped vs flat)                                                 */
/* -------------------------------------------------------------------------- */

interface ExplorerProps {
  venture: VentureFilter;
  filtered: BrandEntry[];
  grouped: Map<VentureSlug, BrandEntry[]>;
  hasActiveFilter: boolean;
  clearAll: () => void;
}

function BrandsExplorer({
  venture,
  filtered,
  grouped,
  hasActiveFilter,
  clearAll,
}: ExplorerProps) {
  return (
    <section className="bg-neutral-50/40 py-14 lg:py-20">
      <Container>
        {filtered.length === 0 ? (
          <EmptyState clearAll={clearAll} />
        ) : venture === 'all' ? (
          <div className="space-y-14 lg:space-y-20">
            {VENTURE_ORDER.map((slug) => {
              const brands = grouped.get(slug) ?? [];
              if (brands.length === 0) return null;
              return <VentureSection key={slug} ventureSlug={slug} brands={brands} />;
            })}
          </div>
        ) : (
          <FlatGrid brands={filtered} />
        )}

        {hasActiveFilter && filtered.length > 0 && (
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold text-neutral-700 hover:border-accent hover:text-accent"
            >
              <X className="h-3.5 w-3.5" />
              Clear filters &amp; see all {TOTAL_BRAND_COUNT}
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

function EmptyState({ clearAll }: { clearAll: () => void }) {
  return (
    <div className="mx-auto max-w-md text-center py-16">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
        <Search className="h-5 w-5 text-neutral-400" strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-xl font-semibold text-neutral-900">
        No brands match those filters
      </h3>
      <p className="mt-2 text-sm text-neutral-500">
        Try a different search term, broaden the country, or pick another venture.
      </p>
      <button
        type="button"
        onClick={clearAll}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
      >
        <X className="h-3.5 w-3.5" />
        Clear filters
      </button>
    </div>
  );
}

function VentureSection({
  ventureSlug,
  brands,
}: {
  ventureSlug: VentureSlug;
  brands: BrandEntry[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ring-inset ${VENTURE_PILL_STYLES[ventureSlug]}`}
          >
            {brands.length} {brands.length === 1 ? 'brand' : 'brands'}
          </span>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
            {VENTURE_LABELS[ventureSlug]}
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm text-neutral-500">
            {VENTURE_TAGLINES[ventureSlug]}
          </p>
        </div>
        <Link
          href={`/ventures#${ventureSlug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent hover:text-accent/80"
        >
          View venture
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <FlatGrid brands={brands} compact />
    </motion.div>
  );
}

function FlatGrid({
  brands,
  compact = false,
}: {
  brands: BrandEntry[];
  compact?: boolean;
}) {
  return (
    <div
      className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
        compact ? '' : 'lg:gap-5'
      }`}
    >
      {brands.map((b, i) => (
        <BrandCard key={b.slug} brand={b} index={i} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Brand Card                                                                 */
/* -------------------------------------------------------------------------- */

function BrandCard({ brand, index }: { brand: BrandEntry; index: number }) {
  const isHeritage = brand.founded && CURRENT_YEAR - brand.founded >= 50;
  const isCentury = brand.founded && CURRENT_YEAR - brand.founded >= 100;
  const flag = flagFor(brand.country);
  const extraSegs = brand.segments.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
    >
      <Link
        href={`/ventures#${brand.venture}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)]"
      >
        {/* Top accent stripe on hover */}
        <span className="absolute inset-x-0 top-0 h-[2px] bg-accent scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />

        {/* Top row: venture pill + heritage / est */}
        <div className="mb-4 flex items-start justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ring-inset ${VENTURE_PILL_STYLES[brand.venture]}`}
          >
            {VENTURE_LABELS[brand.venture]}
          </span>
          {isCentury ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
              <Award className="h-3 w-3" strokeWidth={2} />
              {CURRENT_YEAR - (brand.founded ?? 0)} yrs
            </span>
          ) : isHeritage ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              Heritage
            </span>
          ) : brand.founded ? (
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-neutral-400 tabular-nums">
              Est. {brand.founded}
            </span>
          ) : null}
        </div>

        {/* Brand name */}
        <h3 className="font-display text-lg font-semibold text-neutral-900 leading-tight tracking-tight transition-colors group-hover:text-accent">
          {brand.name}
        </h3>

        {/* Country with flag */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-600">
          {flag ? (
            <span className="text-base leading-none" aria-hidden>
              {flag}
            </span>
          ) : (
            <MapPin className="h-3 w-3 text-neutral-400" strokeWidth={1.5} />
          )}
          <span>{brand.country}</span>
        </div>

        {/* Segments */}
        {brand.segments.length > 0 && (
          <p className="mt-3 text-xs text-neutral-500 leading-relaxed line-clamp-2">
            {brand.segments[0]}
            {extraSegs > 0 && (
              <span className="font-medium text-neutral-700"> +{extraSegs} more</span>
            )}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-400">
            <Globe2 className="h-3 w-3" strokeWidth={1.75} />
            Authorized partner
          </span>
          <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent">
            View
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
