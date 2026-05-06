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
            <div className="h-[3px] w-12 bg-accent mb-5" />
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-neutral-900 tracking-tight">
              Our Ventures
            </h2>
            <p className="mt-3 text-neutral-500 text-base">
              Six specialized businesses under the CMS Group umbrella
            </p>
          </div>
          <span className="text-sm text-neutral-400 font-medium">
            Founded 2002 — 2021
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
                  href="/about"
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
