'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Layers, Home, DoorOpen, Footprints } from 'lucide-react';

const DOMAIN_METRICS = [
  { id: 'ceiling',   value: 200000, label: 'False Ceiling Installed',    icon: Layers   },
  { id: 'roofing',   value: 300000, label: 'Roofing Installed',          icon: Home     },
  { id: 'aluminium', value: 90000,  label: 'Aluminium Doors & Windows',  icon: DoorOpen },
  { id: 'flooring',  value: 250000, label: 'Flooring Installed',         icon: Footprints },
];

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, { stiffness: 45, damping: 28 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, spring, value]);

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
    </span>
  );
}

export function DomainMetricsStrip() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-100 bg-neutral-50 py-10 lg:py-12">
      {/* Subtle accent line at top */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Kicker */}
        <p className="mb-8 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
          Proven Track Record &mdash; Area Installed
        </p>

        <div className="grid grid-cols-2 gap-px bg-neutral-200 lg:grid-cols-4">
          {DOMAIN_METRICS.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative flex flex-col items-center bg-neutral-50 px-3 py-5 text-center transition-colors duration-200 hover:bg-white sm:px-6 sm:py-7"
              >
                {/* Icon badge */}
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>

                {/* Number */}
                <div className="font-display text-2xl font-bold leading-none tracking-tight text-neutral-charcoal tabular-nums sm:text-3xl lg:text-[2.6rem]">
                  <AnimatedCounter value={metric.value} />
                  <span className="text-accent">+</span>
                </div>

                {/* Unit */}
                <div className="mt-1 text-xs font-semibold text-neutral-400">sq.ft</div>

                {/* Label */}
                <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:text-[11px]">
                  {metric.label}
                </div>

                {/* Hover bottom accent */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
