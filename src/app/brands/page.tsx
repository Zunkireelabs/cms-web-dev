'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Section } from '@/components/ui/Section';
import { StatBlock } from '@/components/ui/StatBlock';
import { ContactCTA } from '@/components/sections';
import { fadeUp, stagger } from '@/lib/motion';
import {
  BRANDS,
  TOTAL_BRAND_COUNT,
  VENTURE_LABELS,
  getBrandsByVenture,
  type BrandEntry,
  type VentureSlug,
} from '@/data/brands';
import { VENTURES } from '@/data/ventures';
import { ArrowRight, MapPin, Calendar, Sparkles, Factory } from 'lucide-react';

const VENTURE_ORDER: VentureSlug[] = [
  'bath-n-room',
  'baba-muktinath',
  '4r-technologies',
  'techwood',
  'prime-ceramics',
];

const VENTURE_TAGLINES: Record<VentureSlug, string> = {
  'bath-n-room': 'Sanitary fixtures, flooring, and bathroom solutions from global leaders',
  'baba-muktinath': 'Roofing, ceilings, doors, hardware, and waterproofing systems',
  '4r-technologies': 'Sustainable water management, treatment plants, and pool solutions',
  techwood: 'Modular office furniture and flooring for corporate and education sectors',
  'prime-ceramics':
    'In-house tile manufacturing — Prime Tiles, made in Nepal with European technology',
};

const COUNTRY_COUNT = new Set(BRANDS.map((b) => b.country.split(' ')[0])).size;

function BrandCard({ brand }: { brand: BrandEntry }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={0}
      className="group relative h-full rounded-xl border border-neutral-border bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-base font-bold leading-tight text-neutral-charcoal transition-colors group-hover:text-accent">
          {brand.name}
        </h4>
        {brand.founded && (
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            Est. {brand.founded}
          </span>
        )}
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
        <MapPin className="h-3 w-3 text-accent" strokeWidth={1.5} />
        <span>{brand.country}</span>
      </div>
      {brand.segments.length > 0 && (
        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-neutral-600">
          {brand.segments.slice(0, 2).join(' • ')}
          {brand.segments.length > 2 && ` +${brand.segments.length - 2}`}
        </p>
      )}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </motion.div>
  );
}

function VentureSection({ ventureSlug }: { ventureSlug: VentureSlug }) {
  const venture = VENTURES.find((v) => v.slug === ventureSlug);
  const brands = getBrandsByVenture(ventureSlug);
  const isManufacturing = ventureSlug === 'prime-ceramics';

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={stagger}
      className="rounded-2xl border border-neutral-border bg-white p-6 shadow-card lg:p-10"
    >
      {/* Venture Header */}
      <motion.div variants={fadeUp} custom={0} className="mb-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-neutral-charcoal sm:text-3xl">
                {VENTURE_LABELS[ventureSlug]}
              </h3>
              {isManufacturing && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                  <Factory className="h-3 w-3" strokeWidth={1.75} />
                  In-house
                </span>
              )}
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
              {VENTURE_TAGLINES[ventureSlug]}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            {venture?.founded && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
                <span>Since {venture.founded}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
              <span className="font-semibold text-neutral-700">{brands.length} brands</span>
            </div>
            <Link
              href={`/ventures#${ventureSlug}`}
              className="inline-flex items-center gap-1 font-semibold uppercase tracking-wider text-accent transition-colors hover:text-accent-700"
            >
              View venture
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Brand Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {brands.map((brand) => (
          <BrandCard key={brand.slug} brand={brand} />
        ))}
      </div>
    </motion.div>
  );
}

export default function BrandsPage() {
  return (
    <>
      <PageHero
        kicker="Brand Partners"
        title="World-renowned brands, distributed in Nepal."
        subtitle={`${TOTAL_BRAND_COUNT}+ authorised partner brands across five CMS Group ventures — Grohe, Duravit, Hunter Douglas, Dormakaba, IKO, Tarkett, Armstrong, and more.`}
        image="/images/projects/tiger-palace.jpg"
        imageAlt="Tiger Palace Resort — featuring Grohe, Duravit, Viega"
        size="tall"
      />

      {/* Stat anchor */}
      <Section variant="soft" compact>
        <div className="grid grid-cols-3 gap-x-6 gap-y-12 sm:gap-12">
          <div className="border-l border-accent/40 pl-5 lg:pl-6">
            <StatBlock value={`${TOTAL_BRAND_COUNT}+`} label="Brand Partners" size="md" />
          </div>
          <div className="border-l border-accent/40 pl-5 lg:pl-6">
            <StatBlock value="5" label="Distributing Ventures" size="md" />
          </div>
          <div className="border-l border-accent/40 pl-5 lg:pl-6">
            <StatBlock value={`${COUNTRY_COUNT}+`} label="Countries of Origin" size="md" />
          </div>
        </div>
      </Section>

      {/* Brands Grouped by Venture */}
      <Section variant="light">
        <SectionHeader
          kicker="Organised by Venture"
          title="Quality products from industry leaders."
          lead="Each CMS Group venture maintains exclusive partnerships with manufacturers in its specialised domain — authentic products with full manufacturer warranty and after-sales support."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 space-y-10">
          {VENTURE_ORDER.map((ventureSlug) => (
            <VentureSection key={ventureSlug} ventureSlug={ventureSlug} />
          ))}
        </div>
      </Section>

      <ContactCTA />
    </>
  );
}
