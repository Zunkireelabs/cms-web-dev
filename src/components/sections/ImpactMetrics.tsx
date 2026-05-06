'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { KickerLabel } from '@/components/ui/KickerLabel';
import { ArrowUpRight } from 'lucide-react';

interface Metric {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

const METRICS: Metric[] = [
  { id: 'projects', value: 500, suffix: '+', label: 'Projects Delivered' },
  { id: 'years', value: 23, suffix: '+', label: 'Years of Excellence' },
  { id: 'sectors', value: 6, suffix: '', label: 'Sectors Served' },
  { id: 'partners', value: 50, suffix: '+', label: 'Global Brand Partners' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, { stiffness: 50, damping: 30, duration: 2000 });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, spring, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export function ImpactMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-charcoal py-20 lg:py-28"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      >
        <source src="/images/videos/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-charcoal/60 via-neutral-charcoal/85 to-neutral-charcoal" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <KickerLabel inverted>The Numbers</KickerLabel>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Two decades of trusted execution in Nepal.
          </h2>
        </motion.div>

        {/* Stat strip */}
        <div className="mt-14 grid grid-cols-2 gap-y-12 lg:mt-20 lg:grid-cols-4 lg:gap-12">
          {METRICS.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.08 }}
              className="border-l border-white/15 pl-5 lg:pl-6"
            >
              <div className="font-display text-5xl font-bold leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center gap-6 border-t border-white/10 pt-8 lg:gap-10"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-accent"
          >
            Explore our projects
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </Link>
          <span className="h-4 w-px bg-white/20" />
          <Link
            href="/brands"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-accent"
          >
            See our brand partners
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
