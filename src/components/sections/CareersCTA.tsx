'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Building2, Calendar, Globe } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const TRUST_STATS = [
  { icon: Building2, label: '500+ Projects' },
  { icon: Calendar, label: '20+ Years' },
  { icon: Globe, label: '13 Global Brands' },
];

export function CareersCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden px-8 sm:px-10 lg:px-14 py-10 lg:py-12"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero/project-4.jpg"
              alt="CMS team at work"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          </div>

          {/* Top: Heading + Button */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left: Text */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-tight"
              >
                Build Your Future With Us
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-2 text-sm sm:text-base text-white/50 max-w-md"
              >
                Join a team shaping Nepal&apos;s most iconic structures.
              </motion.p>
            </div>

            {/* Right: CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="shrink-0"
            >
              <Link
                href="/career"
                className="inline-flex items-center gap-3 rounded-lg bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-accent-600"
              >
                View Opportunities
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Bottom: Trust Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-10"
          >
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2.5">
                <stat.icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
                <span className="text-xs sm:text-sm font-medium text-white/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
