'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { ContactCTA } from '@/components/sections';
import { getBrandsByVenture } from '@/lib/cms';
import { fadeUp, stagger, inViewOptions } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { Venture, BrandEntry } from '@/types/cms';
import type { VentureSlug } from '@/types/cms';
import {
  ArrowRight,
  Armchair,
  Bath,
  Boxes,
  Calendar,
  ChevronDown,
  DoorClosed,
  Droplets,
  Grid2x2,
  Grid3x3,
  Hammer,
  HardHat,
  Home,
  Layers,
  Leaf,
  Mountain,
  Recycle,
  ShowerHead,
  Sparkles,
  Square,
  TreePine,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

const VENTURE_ICONS: Record<string, LucideIcon> = {
  'bath-n-room': Bath,
  'baba-muktinath': Wrench,
  '4r-technologies': Recycle,
  'cubic-meter': Boxes,
  techwood: Armchair,
  'prime-ceramics': Grid3x3,
};

const DISTRIBUTING_VENTURE_SLUGS: VentureSlug[] = [
  'bath-n-room',
  'baba-muktinath',
  '4r-technologies',
  'techwood',
];

function isDistributingVenture(slug: string): slug is VentureSlug {
  return DISTRIBUTING_VENTURE_SLUGS.includes(slug as VentureSlug);
}

const CUBIC_METER_CAPABILITIES: { name: string; icon: LucideIcon }[] = [
  { name: 'Interior Contracting & Fit-Out', icon: Hammer },
  { name: 'Project Execution & Management', icon: HardHat },
  { name: 'Renovation & Sustainable Solutions', icon: Leaf },
];

function getProductIcon(name: string, ventureSlug: string): LucideIcon {
  const n = name.toLowerCase();
  if (n.includes('mosaic')) return Grid2x2;
  if (n.includes('tile')) return Grid3x3;
  if (/marble|granite|stone/.test(n)) return Mountain;
  if (/wood|parquet|laminat/.test(n)) return TreePine;
  if (/shower|sanitary|whirlpool|bathtub|jacuzzi|sauna/.test(n)) return ShowerHead;
  if (/toilet|cubicle|partition|door/.test(n)) return DoorClosed;
  if (/window|glass/.test(n)) return Square;
  if (/ceiling|roof|façade|facade/.test(n)) return Home;
  if (n.includes('floor')) return Layers;
  if (/drain|flush|pipe|sewage|effluent|fountain|pool|filter|treatment|water/.test(n)) return Droplets;
  if (/furniture|workstation|table|chair|carpet|desk/.test(n)) return Armchair;
  if (/fitting|fixture|sink|chimney|hub|sensor|valve|mixer/.test(n)) return Wrench;
  if (ventureSlug === 'prime-ceramics') return Grid3x3;
  if (ventureSlug === 'techwood') return Armchair;
  if (ventureSlug === '4r-technologies') return Recycle;
  if (ventureSlug === 'bath-n-room') return Bath;
  return Boxes;
}

function Kpi({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white px-3.5 py-3 sm:px-4 sm:py-3.5">
      <div className="font-display text-2xl font-extrabold leading-none tracking-tight text-neutral-charcoal sm:text-3xl">
        {value}
      </div>
      <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500 sm:text-[11px]">
        {label}
      </div>
    </div>
  );
}

function ProductRow({
  product,
  ventureSlug,
  index,
}: {
  product: Venture['products'][number];
  ventureSlug: string;
  index: number;
}) {
  const ProductIcon = getProductIcon(product.name, ventureSlug);
  return (
    <motion.li
      variants={fadeUp}
      custom={Math.min(index * 0.03, 0.36)}
      className="group relative flex items-center gap-3 border-b border-neutral-100 px-5 py-3.5 transition-colors last:border-0 hover:bg-accent-50/70 sm:gap-4 sm:px-6 sm:py-4"
    >
      <span
        aria-hidden
        className="absolute left-0 top-2 bottom-2 w-[3px] origin-center scale-y-0 rounded-r-sm bg-accent transition-transform duration-200 group-hover:scale-y-100"
      />
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-50 to-neutral-100 text-accent sm:h-12 sm:w-12">
        <ProductIcon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <p className="min-w-0 flex-1 text-[14px] font-semibold leading-snug text-neutral-charcoal sm:text-[15px]">
        {product.name}
      </p>
    </motion.li>
  );
}

function ServiceRow({
  capability,
  index,
}: {
  capability: { name: string; icon: LucideIcon };
  index: number;
}) {
  const Icon = capability.icon;
  return (
    <motion.li
      variants={fadeUp}
      custom={Math.min(index * 0.03, 0.36)}
      className="group relative flex items-center gap-3 border-b border-neutral-100 px-5 py-3.5 transition-colors last:border-0 hover:bg-accent-50/70 sm:gap-4 sm:px-6 sm:py-4"
    >
      <span
        aria-hidden
        className="absolute left-0 top-2 bottom-2 w-[3px] origin-center scale-y-0 rounded-r-sm bg-accent transition-transform duration-200 group-hover:scale-y-100"
      />
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-50 to-neutral-100 text-accent sm:h-12 sm:w-12">
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <p className="min-w-0 flex-1 text-[14px] font-semibold leading-snug text-neutral-charcoal sm:text-[15px]">
        {capability.name}
      </p>
    </motion.li>
  );
}

function VentureSection({
  venture,
  index,
  allBrands,
}: {
  venture: Venture;
  index: number;
  allBrands: BrandEntry[];
}) {
  const Icon = VENTURE_ICONS[venture.slug] ?? Layers;
  const isEven = index % 2 === 0;
  const [expanded, setExpanded] = useState(false);

  const brandCount = isDistributingVenture(venture.slug)
    ? getBrandsByVenture(allBrands, venture.slug as VentureSlug).length
    : 0;

  const isContractingVenture = venture.slug === 'cubic-meter';
  const isJointVenture = venture.slug === 'prime-ceramics';
  const hasProducts = venture.products.length > 0;

  return (
    <Section variant={isEven ? 'light' : 'soft'} id={venture.slug}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={inViewOptions}
        className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16"
      >
        {/* Identity column — sticky on lg+ */}
        <motion.aside
          variants={fadeUp}
          custom={0}
          className="border-l-[3px] border-accent pl-6 lg:col-span-5 lg:sticky lg:top-36 lg:pl-7"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent-50 text-accent">
            <Icon className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            <Calendar className="h-3 w-3" strokeWidth={1.75} />
            Founded {venture.founded}
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-tight text-neutral-charcoal sm:text-4xl lg:text-5xl">
            {venture.shortName}
          </h2>
          {venture.tagline && (
            <p className="mt-3 text-base font-semibold leading-snug text-accent sm:text-lg">
              {venture.tagline}
            </p>
          )}

          {/* KPI strip */}
          <dl
            className={cn(
              'mt-6 grid gap-2.5',
              (hasProducts || isContractingVenture) && brandCount > 0
                ? 'grid-cols-3'
                : hasProducts || isContractingVenture || brandCount > 0
                ? 'grid-cols-2'
                : 'grid-cols-1',
            )}
          >
            <Kpi value={venture.founded} label="Founded" />
            {hasProducts && <Kpi value={venture.products.length} label="Categories" />}
            {isContractingVenture && (
              <Kpi value={CUBIC_METER_CAPABILITIES.length} label="Capabilities" />
            )}
            {brandCount > 0 && <Kpi value={brandCount} label="Brands" />}
          </dl>

          {/* Description with line-clamp + Read more */}
          <p
            className={cn(
              'mt-6 text-sm leading-relaxed text-neutral-600 sm:text-[15px]',
              !expanded && 'line-clamp-4',
            )}
          >
            {venture.description}
          </p>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent transition-colors hover:text-accent-700"
          >
            {expanded ? 'Read less' : 'Read more'}
            <ChevronDown
              className={cn('h-3 w-3 transition-transform', expanded && 'rotate-180')}
              strokeWidth={2}
            />
          </button>

          {/* Cross-links */}
          <div className="mt-7 flex flex-wrap gap-2.5">
            {brandCount > 0 && (
              <Link
                href={`/brands#${venture.slug}`}
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm transition-colors hover:border-accent/40 hover:bg-accent-50"
              >
                <Sparkles className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
                <span className="font-semibold text-neutral-700">
                  {brandCount} brand partners
                </span>
                <ArrowRight className="h-3 w-3 text-neutral-400" />
              </Link>
            )}
            {isContractingVenture && (
              <Link
                href="/contracting"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-700"
              >
                Contracting Services
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
            {isJointVenture && (
              <span className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span className="font-semibold text-amber-700">JV with Fortune Ventures</span>
              </span>
            )}
          </div>
        </motion.aside>

        {/* Right column — product feed (or service-venture card) */}
        <motion.div variants={fadeUp} custom={0.1} className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-neutral-border bg-white shadow-card">
            {hasProducts ? (
              <>
                <div className="flex items-baseline justify-between border-b border-neutral-100 px-5 py-4 sm:px-6 sm:py-5">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                    Product Range
                  </h3>
                  <span className="text-xs font-medium text-neutral-400">
                    {venture.products.length} categories
                  </span>
                </div>
                <motion.ul variants={stagger} initial="hidden" whileInView="visible" viewport={inViewOptions}>
                  {venture.products.map((product, i) => (
                    <ProductRow
                      key={product.name}
                      product={product}
                      ventureSlug={venture.slug}
                      index={i}
                    />
                  ))}
                </motion.ul>
              </>
            ) : isContractingVenture ? (
              <>
                <div className="flex items-baseline justify-between border-b border-neutral-100 px-5 py-4 sm:px-6 sm:py-5">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                    Service Capabilities
                  </h3>
                  <span className="text-xs font-medium text-neutral-400">
                    {CUBIC_METER_CAPABILITIES.length} pillars
                  </span>
                </div>
                <motion.ul variants={stagger} initial="hidden" whileInView="visible" viewport={inViewOptions}>
                  {CUBIC_METER_CAPABILITIES.map((capability, i) => (
                    <ServiceRow key={capability.name} capability={capability} index={i} />
                  ))}
                </motion.ul>
                <div className="border-t border-neutral-100 bg-neutral-off-white/60 px-5 py-4 sm:px-6">
                  <Link
                    href="/contracting"
                    className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent transition-colors hover:text-accent-700"
                  >
                    See full contracting services
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="px-6 py-14 text-center sm:px-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-50 text-accent">
                  <Boxes className="h-7 w-7" strokeWidth={1.4} />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-neutral-charcoal">
                  Service Venture
                </h3>
                <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-neutral-500">
                  {venture.shortName} delivers end-to-end services through sister ventures and
                  authorised partner brands.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

export function VenturesClient({
  ventures,
  brands,
}: {
  ventures: Venture[];
  brands: BrandEntry[];
}) {
  const totalProducts = ventures.reduce((sum, v) => sum + v.products.length, 0);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const closest = visible.reduce((a, b) =>
          Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top) ? a : b,
        );
        setActiveId(closest.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    );
    ventures.forEach((v) => {
      const el = document.getElementById(v.slug);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ventures]);

  return (
    <>
      <PageHero
        kicker="Associated Ventures"
        title="Six ventures, one CMS Group."
        subtitle={`From Italian marble in 2002 to ceramic-tile manufacturing in 2021 — six specialised businesses covering ${totalProducts}+ product categories across trading, contracting, and manufacturing.`}
        image="/images/projects/aanson.jpg"
        imageAlt="CMS Group ventures"
        size="tall"
      />

      {/* Sticky jump-nav with active-section highlight */}
      <section className="sticky top-16 z-30 border-y border-neutral-200 bg-white/95 backdrop-blur-md lg:top-20">
        <Container>
          <div className="flex flex-wrap items-center gap-2 py-3 sm:gap-3 sm:py-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 sm:mr-2">
              Jump to
            </span>
            {ventures.map((venture) => {
              const Icon = VENTURE_ICONS[venture.slug] ?? Layers;
              const isActive = activeId === venture.slug;
              return (
                <a
                  key={venture.slug}
                  href={`#${venture.slug}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm',
                    isActive
                      ? 'border-accent bg-accent-50 text-accent-700 shadow-[0_0_0_3px_rgba(212,168,75,0.12)]'
                      : 'border-neutral-200 text-neutral-700 hover:border-accent/40 hover:bg-accent-50 hover:text-accent',
                  )}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {venture.shortName}
                </a>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Per-venture deep-dives */}
      {ventures.map((venture, index) => (
        <VentureSection
          key={venture.slug}
          venture={venture}
          index={index}
          allBrands={brands}
        />
      ))}

      <ContactCTA />
    </>
  );
}
