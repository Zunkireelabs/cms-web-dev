'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Building2, Calendar, Users, Globe, LucideIcon } from 'lucide-react';

interface Metric {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

const METRICS: Metric[] = [
  {
    id: 'projects',
    value: 200,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'Successfully completed projects across hospital, hotel, airport, education, office, and residential sectors in Nepal.',
    icon: Building2,
  },
  {
    id: 'years',
    value: 23,
    suffix: '+',
    label: 'Years of Excellence',
    description: 'Founded in 2002 in Kathmandu — over two decades of integrated trading and contracting in Nepal.',
    icon: Calendar,
  },
  {
    id: 'sectors',
    value: 6,
    suffix: '',
    label: 'Sectors Served',
    description: 'Hospital, education, airport, office, hotel, and residence — full-stack finishing and infrastructure.',
    icon: Users,
  },
  {
    id: 'partners',
    value: 60,
    suffix: '+',
    label: 'Global Brand Partners',
    description: 'Authorized distribution and joint ventures with manufacturers from Germany, Italy, Japan, USA, and more.',
    icon: Globe,
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
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

export function ImpactMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative py-8 lg:py-10 overflow-hidden bg-neutral-900">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/videos/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-neutral-900/80" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden"
        >
          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {METRICS.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-5 lg:p-6 ${
                  index < 2 ? 'border-b border-white/10' : ''
                } ${index % 2 === 0 ? 'sm:border-r border-white/10' : ''}`}
              >
                {/* Top row: Category label + Icon */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <div className="flex items-center justify-center h-11 w-11 rounded-full bg-accent/15">
                    <metric.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Large number */}
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-none">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                </div>

                {/* Description */}
                <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-sm">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-5 flex flex-wrap items-center gap-6"
        >
          <a
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors"
          >
            More about our projects &rarr;
          </a>
          <span className="h-4 w-px bg-white/30" />
          <a
            href="/brands"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors"
          >
            More about our partners &rarr;
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
