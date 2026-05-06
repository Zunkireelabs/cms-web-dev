'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { ContactCTA } from '@/components/sections';
import Link from 'next/link';
import {
  BRANDS,
  TOTAL_BRAND_COUNT,
  VENTURE_LABELS,
  getBrandsByVenture,
  type BrandEntry,
  type VentureSlug,
} from '@/data/brands';
import { VENTURES } from '@/data/ventures';
import { ArrowRight, Globe2, MapPin, Calendar, Sparkles } from 'lucide-react';

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
  'prime-ceramics': 'In-house tile manufacturing — Prime Tiles, made in Nepal with European technology',
};

const COUNTRY_COUNT = new Set(BRANDS.map((b) => b.country.split(' ')[0])).size;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BrandCard({ brand }: { brand: BrandEntry }) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={0}
      className="group relative h-full rounded-xl border border-neutral-border bg-white p-5 transition-all hover:border-brand-300 hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-base font-semibold text-neutral-charcoal group-hover:text-brand-700 transition-colors leading-tight">
          {brand.name}
        </h4>
        {brand.founded && (
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            Est. {brand.founded}
          </span>
        )}
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
        <MapPin className="h-3 w-3 text-brand-600" strokeWidth={1.5} />
        <span>{brand.country}</span>
      </div>
      {brand.segments.length > 0 && (
        <p className="mt-3 text-xs text-neutral-600 leading-relaxed line-clamp-2">
          {brand.segments.slice(0, 2).join(' • ')}
          {brand.segments.length > 2 && ` +${brand.segments.length - 2}`}
        </p>
      )}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-600 transition-all duration-300 group-hover:w-full" />
    </motion.div>
  );
}

function VentureSection({ ventureSlug }: { ventureSlug: VentureSlug }) {
  const venture = VENTURES.find((v) => v.slug === ventureSlug);
  const brands = getBrandsByVenture(ventureSlug);

  return (
    <AnimatedSection className="rounded-2xl border border-neutral-border bg-white p-6 shadow-card lg:p-10">
      {/* Venture Header */}
      <motion.div variants={fadeInUp} custom={0} className="mb-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-neutral-charcoal sm:text-3xl">
              {VENTURE_LABELS[ventureSlug]}
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-neutral-600 leading-relaxed">
              {VENTURE_TAGLINES[ventureSlug]}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            {venture?.founded && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-brand-600" strokeWidth={1.5} />
                <span>Since {venture.founded}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-brand-600" strokeWidth={1.5} />
              <span className="font-semibold text-neutral-700">{brands.length} brands</span>
            </div>
            <Link
              href={`/ventures#${ventureSlug}`}
              className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700 transition-colors"
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
    </AnimatedSection>
  );
}

export default function BrandsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-charcoal via-neutral-800 to-brand-900 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
            >
              Our Partners
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Global Brand Partners
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="mt-6 text-xl text-neutral-300 leading-relaxed"
            >
              {TOTAL_BRAND_COUNT}+ world-renowned brands across four CMS Group ventures —
              authorized distribution, joint ventures, and exclusive partnerships powering
              construction projects across Nepal.
            </motion.p>

            {/* Stat strip */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="mt-10 flex flex-wrap justify-center gap-8 sm:gap-12"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white sm:text-4xl">{TOTAL_BRAND_COUNT}+</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-neutral-400">
                  Brand Partners
                </div>
              </div>
              <div className="hidden h-12 w-px bg-white/20 sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white sm:text-4xl">4</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-neutral-400">
                  Distributing Ventures
                </div>
              </div>
              <div className="hidden h-12 w-px bg-white/20 sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white sm:text-4xl">{COUNTRY_COUNT}+</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-neutral-400">
                  Countries of Origin
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Brands Grouped by Venture */}
      <section className="py-20 lg:py-28 bg-neutral-off-white">
        <Container>
          <AnimatedSection>
            <motion.div variants={fadeInUp} custom={0} className="mx-auto max-w-2xl text-center mb-16">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
                <Globe2 className="h-3.5 w-3.5" />
                Organized by Venture
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-charcoal sm:text-4xl">
                Quality Products from Industry Leaders
              </h2>
              <p className="mt-4 text-neutral-600">
                Each CMS Group venture maintains exclusive partnerships with manufacturers
                in its specialized domain — ensuring authentic products with full warranty
                and after-sales support.
              </p>
            </motion.div>
          </AnimatedSection>

          <div className="space-y-10">
            {VENTURE_ORDER.map((ventureSlug) => (
              <VentureSection key={ventureSlug} ventureSlug={ventureSlug} />
            ))}
          </div>
        </Container>
      </section>

      {/* Partnership CTA */}
      <ContactCTA />
    </>
  );
}
