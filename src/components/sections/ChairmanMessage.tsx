'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Quote, User2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { CHAIRMAN } from '@/data/leadership';

const PULL_QUOTE =
  'We endeavor to meet the different needs of our esteemed clientele by emphasizing integration and complete solutions — setting new standards in the Nepalese market.';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function ChairmanMessage() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-white py-20 lg:py-28">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Portrait */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
            className="lg:col-span-4 flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/10 rounded-2xl -z-10" />
              <div className="relative h-56 w-56 sm:h-64 sm:w-64 rounded-2xl bg-gradient-to-br from-accent-50 to-neutral-100 flex items-center justify-center overflow-hidden">
                {CHAIRMAN.photo ? (
                  <Image
                    src={CHAIRMAN.photo}
                    alt={CHAIRMAN.name}
                    fill
                    sizes="(max-width: 640px) 224px, 256px"
                    className="object-cover"
                  />
                ) : (
                  <User2 className="h-24 w-24 text-accent/40" strokeWidth={1.2} />
                )}
              </div>
            </div>
          </motion.div>

          {/* Quote + Attribution */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-8"
          >
            <motion.div variants={fadeUp} custom={0.05}>
              <div className="h-[3px] w-12 bg-accent mb-5" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
                Chairman&apos;s Message
              </span>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.15} className="mt-5">
              <Quote className="h-8 w-8 text-accent/30" strokeWidth={1.5} />
              <blockquote className="mt-3 font-display text-2xl sm:text-3xl lg:text-[32px] font-medium text-neutral-900 leading-snug tracking-tight">
                {PULL_QUOTE}
              </blockquote>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.25} className="mt-7 flex items-center gap-4">
              <div className="h-px w-10 bg-accent" />
              <div>
                <div className="font-semibold text-neutral-900 text-sm">{CHAIRMAN.name}</div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 mt-0.5">
                  {CHAIRMAN.title}, {CHAIRMAN.company}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.3} className="mt-7">
              <Link
                href="/about#leadership"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-700 transition-colors"
              >
                Read full message
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
