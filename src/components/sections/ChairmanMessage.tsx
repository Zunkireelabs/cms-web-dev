'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Quote, User2 } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { KickerLabel } from '@/components/ui/KickerLabel';
import { fadeUp } from '@/lib/motion';
import type { Director } from '@/types/cms';

const PULL_QUOTE =
  'We endeavour to meet the different needs of our esteemed clientele by emphasising integration and complete solutions — setting new standards in the Nepalese market.';

export function ChairmanMessage({ chairman }: { chairman: Director }) {
  return (
    <Section variant="light">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        {/* Portrait */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          custom={0}
          className="lg:col-span-4"
        >
          <div className="group relative mx-auto w-full max-w-[320px] lg:mx-0">
            {/* Offset accent block */}
            <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl bg-accent/15 transition-transform duration-500 group-hover:-bottom-4 group-hover:-right-4" />
            {/* Thin accent corner detail */}
            <div className="absolute -left-2 -top-2 z-10 h-8 w-8 rounded-tl-lg border-l-2 border-t-2 border-accent" />

            <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-charcoal/5">
              {chairman.photo ? (
                <Image
                  src={chairman.photo}
                  alt={chairman.name}
                  fill
                  sizes="(max-width: 1024px) 80vw, 320px"
                  className="object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User2 className="h-24 w-24 text-accent/40" strokeWidth={1.2} />
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-charcoal/25 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Quote + Attribution */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative lg:col-span-8"
        >
          {/* Decorative watermark quote mark */}
          <Quote
            aria-hidden="true"
            className="pointer-events-none absolute -left-2 -top-6 h-32 w-32 text-accent/[0.07] lg:-left-4 lg:-top-8 lg:h-40 lg:w-40"
            strokeWidth={1}
          />

          <motion.div variants={fadeUp} custom={0.05} className="relative">
            <KickerLabel>Chairman&apos;s Message</KickerLabel>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.15} className="relative mt-5">
            <Quote className="h-8 w-8 text-accent/40" strokeWidth={1.5} />
            <blockquote className="mt-4 font-display text-xl font-bold leading-[1.25] tracking-tight text-neutral-charcoal sm:text-2xl lg:text-[1.875rem]">
              &ldquo;{PULL_QUOTE}&rdquo;
            </blockquote>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.25}
            className="mt-8 flex items-center gap-4"
          >
            <div className="h-px w-12 bg-accent" />
            <div>
              <div className="font-display text-base font-bold text-neutral-charcoal">
                {chairman.name}
              </div>
              <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                {chairman.title} · {chairman.company}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.32} className="mt-8">
            <Link
              href="/about#leadership"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent transition-colors hover:text-accent-700"
            >
              Read full message
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
