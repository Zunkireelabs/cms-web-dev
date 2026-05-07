'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Armchair,
  Bath,
  Boxes,
  Grid3x3,
  Layers,
  type LucideIcon,
  Recycle,
  Wrench,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { KickerLabel } from '@/components/ui/KickerLabel';
import { fadeUp, stagger } from '@/lib/motion';
import { VENTURES } from '@/data/ventures';

const VENTURE_ICONS: Record<string, LucideIcon> = {
  'bath-n-room': Bath,
  'baba-muktinath': Wrench,
  '4r-technologies': Recycle,
  'cubic-meter': Boxes,
  techwood: Armchair,
  'prime-ceramics': Grid3x3,
};

type VentureType = 'Trading' | 'Manufacturing' | 'Contracting' | 'Joint Venture';

const VENTURE_TYPES: Record<string, VentureType> = {
  'bath-n-room': 'Trading',
  'baba-muktinath': 'Trading',
  '4r-technologies': 'Manufacturing',
  'cubic-meter': 'Contracting',
  techwood: 'Trading',
  'prime-ceramics': 'Joint Venture',
};

const TYPE_STYLES: Record<VentureType, string> = {
  Trading: 'bg-accent/10 text-accent',
  Manufacturing: 'bg-emerald-50 text-emerald-700',
  Contracting: 'bg-blue-50 text-blue-700',
  'Joint Venture': 'bg-amber-50 text-amber-700',
};

export function Ventures() {
  return (
    <Section variant="light">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
        custom={0}
        className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-2xl">
          <KickerLabel>Associated Ventures</KickerLabel>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-neutral-charcoal sm:text-4xl lg:text-5xl">
            Six specialised businesses,
            <br />
            one CMS Group.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            From Italian marble in 2002 to ceramic-tile manufacturing in 2021 — each venture
            serves a distinct slice of the construction value chain.
          </p>
        </div>
        <span className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
          2002 — 2021
        </span>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6 lg:grid-cols-3"
      >
        {VENTURES.map((venture, index) => {
          const Icon = VENTURE_ICONS[venture.slug] ?? Layers;
          const type = VENTURE_TYPES[venture.slug] ?? 'Trading';
          const productCount = venture.products.length;

          return (
            <motion.div key={venture.slug} variants={fadeUp} custom={index * 0.06}>
              <Link
                href={`/ventures#${venture.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-7 lg:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-[3px] hover:border-accent/30 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)]"
              >
                {/* Soft radial glow on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-accent/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Top accent stripe on hover */}
                <span className="absolute inset-x-0 top-0 h-[2px] origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                {/* Header row: Icon + Est badge */}
                <div className="relative mb-7 flex items-start justify-between gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/10 via-accent/[0.07] to-transparent ring-1 ring-inset ring-accent/15 transition-all duration-500 group-hover:from-accent/15 group-hover:ring-accent/30">
                    <Icon
                      className="h-[26px] w-[26px] text-accent transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                    <span className="h-1 w-1 rounded-full bg-neutral-400" />
                    Est. {venture.founded}
                  </span>
                </div>

                {/* Type chip */}
                <div className="relative mb-3">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${TYPE_STYLES[type]}`}
                  >
                    {type}
                  </span>
                </div>

                {/* Name */}
                <h3 className="relative font-display text-[1.35rem] font-bold leading-[1.15] tracking-tight text-neutral-charcoal sm:text-2xl">
                  {venture.shortName}
                </h3>

                {/* Tagline */}
                {venture.tagline && (
                  <p className="relative mt-2.5 line-clamp-2 text-[0.9rem] leading-relaxed text-neutral-500">
                    {venture.tagline}
                  </p>
                )}

                {/* Spacer to push footer down */}
                <div className="flex-1" />

                {/* Footer row */}
                <div className="relative mt-7 flex items-center justify-between border-t border-neutral-100 pt-5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                    {productCount > 0
                      ? `${productCount} product${productCount === 1 ? '' : 's'}`
                      : 'Service venture'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                    Learn more
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                      <ArrowUpRight
                        className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px"
                        strokeWidth={2}
                      />
                    </span>
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
