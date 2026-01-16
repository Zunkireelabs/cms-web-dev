'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

interface Metric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  unit: string;
  icon: React.ReactNode;
}

const METRICS: Metric[] = [
  {
    id: 'false-ceiling',
    label: 'False Ceiling',
    value: 200000,
    suffix: '+',
    unit: 'Sq.ft',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    id: 'roofing',
    label: 'Roofing',
    value: 300000,
    suffix: '+',
    unit: 'Sq.ft',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    id: 'aluminum',
    label: 'Aluminum Doors & Windows',
    value: 90000,
    suffix: '+',
    unit: 'Sq.ft',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>
    ),
  },
  {
    id: 'flooring',
    label: 'Flooring',
    value: 250000,
    suffix: '+',
    unit: 'Sq.ft',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
    duration: 2000,
  });

  const display = useTransform(spring, (current) => {
    return Math.floor(current).toLocaleString();
  });

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

interface MetricCardProps {
  metric: Metric;
  index: number;
}

function MetricCard({ metric, index }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-neutral-border bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover">
        {/* Background accent */}
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-50 opacity-50 transition-transform duration-300 group-hover:scale-150" />

        {/* Icon */}
        <div className="relative mb-6 inline-flex rounded-xl bg-brand-50 p-3 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
          {metric.icon}
        </div>

        {/* Value */}
        <div className="relative">
          <div className="text-4xl font-bold tracking-tight text-neutral-charcoal sm:text-5xl">
            <AnimatedCounter value={metric.value} suffix={metric.suffix} />
          </div>
          <div className="mt-1 text-lg font-medium text-brand-600">
            {metric.unit}
          </div>
        </div>

        {/* Label */}
        <div className="mt-4 text-neutral-600">
          {metric.label}
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-600 transition-all duration-300 group-hover:w-full" />
      </div>
    </motion.div>
  );
}

export function ImpactMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-off-white py-20 lg:py-28"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.3) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <Container className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
            Our Impact
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-charcoal sm:text-4xl lg:text-5xl">
            Proven Track Record
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Delivering excellence across every project, measured in results that speak for themselves.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric, index) => (
            <MetricCard key={metric.id} metric={metric} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-neutral-600">
            Ready to add your project to our portfolio?
          </p>
          <a
            href="/contact"
            className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            Get in touch
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
