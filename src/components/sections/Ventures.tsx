'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
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
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {VENTURES.map((venture, index) => {
          const Icon = VENTURE_ICONS[venture.slug] ?? Layers;
          return (
            <motion.div key={venture.slug} variants={fadeUp} custom={index * 0.06}>
              <Link
                href={`/ventures#${venture.slug}`}
                className="group relative block h-full rounded-xl border border-neutral-200 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Est. {venture.founded}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-neutral-charcoal sm:text-xl">
                  {venture.shortName}
                </h3>
                {venture.tagline && (
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                    {venture.tagline}
                  </p>
                )}
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                  Learn more
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
