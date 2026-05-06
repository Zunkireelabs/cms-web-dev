'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Quote, User2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { KickerLabel } from '@/components/ui/KickerLabel';
import { CHAIRMAN } from '@/data/leadership';
import { fadeUp } from '@/lib/motion';

const PULL_QUOTE =
  'We endeavor to meet the different needs of our esteemed clientele by emphasizing integration and complete solutions — setting new standards in the Nepalese market.';

export function ChairmanMessage() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-white py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-[420px] lg:mx-0">
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl bg-accent/15 -z-10" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-accent-50 to-neutral-100">
                {CHAIRMAN.photo ? (
                  <Image
                    src={CHAIRMAN.photo}
                    alt={CHAIRMAN.name}
                    fill
                    sizes="(max-width: 1024px) 90vw, 420px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <User2 className="h-32 w-32 text-accent/40" strokeWidth={1.2} />
                  </div>
                )}
                {/* Subtle vignette to hold the image to the page */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-charcoal/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Quote + Attribution */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-7"
          >
            <motion.div variants={fadeUp} custom={0.05}>
              <KickerLabel>Chairman&apos;s Message</KickerLabel>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.15} className="mt-6">
              <Quote className="h-10 w-10 text-accent/30" strokeWidth={1.5} />
              <blockquote className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-neutral-charcoal sm:text-3xl lg:text-4xl">
                &ldquo;{PULL_QUOTE}&rdquo;
              </blockquote>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={0.25}
              className="mt-8 flex items-center gap-4"
            >
              <div className="h-px w-10 bg-accent" />
              <div>
                <div className="font-display text-base font-bold text-neutral-charcoal">
                  {CHAIRMAN.name}
                </div>
                <div className="mt-0.5 text-xs uppercase tracking-wider text-neutral-500">
                  {CHAIRMAN.title} · {CHAIRMAN.company}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.3} className="mt-8">
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
      </Container>
    </section>
  );
}
