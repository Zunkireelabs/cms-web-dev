'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { KickerLabel } from '@/components/ui/KickerLabel';
import { ContactCTA } from '@/components/sections';
import { VENTURES } from '@/data/ventures';
import { getBrandsByVenture, type VentureSlug } from '@/data/brands';
import { fadeUp } from '@/lib/motion';
import {
  ArrowRight,
  Armchair,
  Bath,
  Boxes,
  Calendar,
  CheckCircle2,
  Grid3x3,
  Layers,
  Recycle,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { Venture } from '@/types';

const VENTURE_ICONS: Record<string, LucideIcon> = {
  'bath-n-room': Bath,
  'baba-muktinath': Wrench,
  '4r-technologies': Recycle,
  'cubic-meter': Boxes,
  techwood: Armchair,
  'prime-ceramics': Grid3x3,
};

function isDistributingVenture(slug: string): slug is VentureSlug {
  return ['bath-n-room', 'baba-muktinath', '4r-technologies', 'techwood'].includes(slug);
}

function VentureSection({ venture, index }: { venture: Venture; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;
  const Icon = VENTURE_ICONS[venture.slug] ?? Layers;

  const brandCount = isDistributingVenture(venture.slug)
    ? getBrandsByVenture(venture.slug).length
    : 0;

  const isContractingVenture = venture.slug === 'cubic-meter';
  const isJointVenture = venture.slug === 'prime-ceramics';

  return (
    <section
      ref={ref}
      id={venture.slug}
      className={`scroll-mt-24 py-20 lg:py-28 ${isEven ? 'bg-white' : 'bg-neutral-off-white'}`}
    >
      <Container>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16"
        >
          {/* Left — Identity */}
          <motion.div variants={fadeUp} custom={0} className="lg:col-span-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent-50 text-accent">
              <Icon className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              <Calendar className="h-3 w-3" strokeWidth={1.75} />
              Founded {venture.founded}
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-neutral-charcoal sm:text-4xl lg:text-5xl">
              {venture.shortName}
            </h2>
            {venture.tagline && (
              <p className="mt-4 text-base font-medium leading-snug text-accent sm:text-lg">
                {venture.tagline}
              </p>
            )}
            <p className="mt-5 text-sm leading-relaxed text-neutral-600 sm:text-base">
              {venture.description}
            </p>

            {/* Cross-links */}
            <div className="mt-7 flex flex-wrap gap-3">
              {brandCount > 0 && (
                <Link
                  href="/brands"
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
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
                >
                  Contracting Services
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
              {isJointVenture && (
                <span className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span className="font-semibold text-amber-700">
                    JV with Fortune Ventures
                  </span>
                </span>
              )}
            </div>
          </motion.div>

          {/* Right — Products grid OR contracting message */}
          <motion.div variants={fadeUp} custom={0.1} className="lg:col-span-8">
            <div className="rounded-2xl border border-neutral-border bg-white p-6 shadow-card lg:p-8">
              {venture.products.length > 0 ? (
                <>
                  <div className="flex items-baseline justify-between mb-5">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                      Product Range
                    </h3>
                    <span className="text-xs text-neutral-400">
                      {venture.products.length} categories
                    </span>
                  </div>
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                    {venture.products.map((product) => (
                      <div
                        key={product.name}
                        className="group/tile overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow hover:shadow-card"
                      >
                        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-brand-50 to-neutral-100">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                              className="object-cover transition-transform duration-500 group-hover/tile:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-brand-300">
                              <CheckCircle2 className="h-8 w-8" strokeWidth={1.25} />
                            </div>
                          )}
                        </div>
                        <p className="px-2.5 py-2 text-[11px] font-medium leading-tight text-neutral-700">
                          {product.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <Boxes className="mx-auto h-12 w-12 text-brand-200" strokeWidth={1.2} />
                  <h3 className="mt-4 text-base font-semibold text-neutral-charcoal">
                    Service Venture — Contracting Only
                  </h3>
                  <p className="mt-2 text-sm text-neutral-500 max-w-md mx-auto">
                    {venture.shortName} delivers end-to-end interior contracting using
                    products supplied by sister ventures and authorised partner brands.
                  </p>
                  <Link
                    href="/contracting"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
                  >
                    See contracting services
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default function VenturesPage() {
  const totalProducts = VENTURES.reduce((sum, v) => sum + v.products.length, 0);

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

      {/* Quick-jump Nav */}
      <section className="sticky top-16 z-30 border-y border-neutral-200 bg-white/95 backdrop-blur-md lg:top-20">
        <Container>
          <div className="flex flex-wrap items-center gap-2 py-3 sm:gap-3 sm:py-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 sm:mr-2">
              Jump to
            </span>
            {VENTURES.map((venture) => {
              const Icon = VENTURE_ICONS[venture.slug] ?? Layers;
              return (
                <a
                  key={venture.slug}
                  href={`#${venture.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-accent/40 hover:bg-accent-50 hover:text-accent sm:text-sm"
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
      {VENTURES.map((venture, index) => (
        <VentureSection key={venture.slug} venture={venture} index={index} />
      ))}

      {/* CTA */}
      <ContactCTA />
    </>
  );
}
