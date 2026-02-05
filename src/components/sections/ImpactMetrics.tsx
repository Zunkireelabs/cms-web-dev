'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { LayoutGrid, Home, DoorOpen, Layers, LucideIcon } from 'lucide-react';

interface Metric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
  icon: LucideIcon;
}

const METRICS: Metric[] = [
  {
    id: 'false-ceiling',
    label: 'False Ceiling',
    value: 200,
    suffix: '+',
    description: 'Sq.ft installed across commercial and residential projects (in 000s)',
    icon: LayoutGrid,
  },
  {
    id: 'roofing',
    label: 'Roofing',
    value: 300,
    suffix: '+',
    description: 'Sq.ft of quality roofing solutions delivered (in 000s)',
    icon: Home,
  },
  {
    id: 'aluminum',
    label: 'Aluminum Works',
    value: 90,
    suffix: '+',
    description: 'Sq.ft of doors and windows fabricated and installed (in 000s)',
    icon: DoorOpen,
  },
  {
    id: 'flooring',
    label: 'Flooring',
    value: 250,
    suffix: '+',
    description: 'Sq.ft of premium flooring completed (in 000s)',
    icon: Layers,
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
      className="p-6 sm:p-8 lg:p-10 bg-[#F4F4F4] border border-neutral-200 rounded-lg shadow-sm"
    >
      {/* Content wrapper with flex */}
      <div className="flex items-center justify-between gap-4 lg:gap-6">
        <div className="flex-1 min-w-0">
          {/* Label */}
          <span className="text-xs sm:text-sm font-medium text-neutral-500 uppercase tracking-wide">
            {metric.label}
          </span>

          {/* Large stat number */}
          <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-charcoal tracking-tight mt-4 lg:mt-6">
            <AnimatedCounter value={metric.value} suffix={metric.suffix} />
          </div>
          {/* Description */}
          <p className="mt-3 lg:mt-4 text-neutral-600 text-xs sm:text-sm lg:text-base">
            {metric.description}
          </p>
        </div>

        {/* Icon - vertically centered */}
        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white shadow-sm">
          <metric.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-brand-600" strokeWidth={1.5} />
        </div>
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
      className="relative overflow-hidden bg-white py-20 lg:py-28"
    >
      <Container className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
            Our Impact
          </span>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-neutral-charcoal sm:text-4xl lg:text-5xl">
            Proven Track Record
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Excellence measured in results that speak for themselves.
          </p>
        </motion.div>

        {/* Metrics Grid - 2x2 layout */}
        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          {METRICS.map((metric, index) => (
            <MetricCard key={metric.id} metric={metric} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
