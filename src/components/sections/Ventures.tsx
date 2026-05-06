'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Armchair,
  Bath,
  Boxes,
  Grid3x3,
  Layers,
  LucideIcon,
  Recycle,
  Wrench,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
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
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                Associated Ventures
              </span>
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight leading-[1.1] text-neutral-charcoal sm:text-4xl lg:text-5xl">
              Six specialised businesses,
              <br />
              one CMS Group.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              From Italian marble in 2002 to ceramic-tile manufacturing in 2021 — each
              venture serves a distinct slice of the construction value chain.
            </p>
          </div>
          <span className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            2002 — 2021
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VENTURES.map((venture, index) => {
            const Icon = VENTURE_ICONS[venture.slug] ?? Layers;
            return (
              <motion.div
                key={venture.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
              >
                <Link
                  href={`/ventures#${venture.slug}`}
                  className="group relative block h-full p-6 lg:p-7 bg-white border border-neutral-200 rounded-xl hover:border-accent hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                      Est. {venture.founded}
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-neutral-900 leading-tight tracking-tight">
                    {venture.shortName}
                  </h3>
                  {venture.tagline && (
                    <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                      {venture.tagline}
                    </p>
                  )}
                  <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-accent uppercase tracking-wider">
                    Learn more
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
