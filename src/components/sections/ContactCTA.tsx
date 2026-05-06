'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Mail,
  Phone,
  MapPin,
  FileText,
  Shield,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SITE_CONFIG } from '@/lib/constants';

const TRUST_POINTS = [
  { icon: MapPin, title: 'Site Assessment', desc: 'Free on-site survey' },
  { icon: FileText, title: 'Free Quotation', desc: 'Detailed estimate' },
  { icon: Shield, title: '500+ Projects', desc: 'Across Nepal' },
];

export function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-accent-50 py-14 lg:py-16">
      <Container>
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          {/* Left — Text (3 cols) */}
          <div className="lg:col-span-3">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-medium text-accent uppercase tracking-wider">
                Now Accepting Projects 2026
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold text-neutral-900 tracking-tight leading-[1.15]"
            >
              Ready to Start Your{' '}
              <span className="text-accent">Project?</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-sm sm:text-base text-neutral-500 max-w-lg leading-relaxed"
            >
              From material procurement to on-site execution — let&apos;s bring your vision to life.
            </motion.p>

            {/* Trust Points — inline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center gap-5"
            >
              {TRUST_POINTS.map((point) => (
                <div key={point.title} className="flex items-center gap-2">
                  <point.icon className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
                  <span className="text-xs font-medium text-neutral-600">
                    {point.title}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Action Cards (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-3"
          >
            {/* Main Card — Schedule Consultation */}
            <div className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10">
                  <Calendar className="h-4 w-4 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-semibold text-neutral-900 tracking-tight">
                  Schedule a Consultation
                </h3>
              </div>
              <p className="text-[13px] text-neutral-500 leading-relaxed">
                Book a free call to discuss your project requirements and get expert recommendations.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-700 transition-colors"
              >
                Book your slot
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Email & Call — compact row */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2.5 bg-white p-4 rounded-xl border border-neutral-100 shadow-sm hover:border-accent/30 transition-colors"
              >
                <Mail className="h-4 w-4 text-accent shrink-0" strokeWidth={1.5} />
                <div className="min-w-0">
                  <span className="block text-xs font-semibold text-neutral-900">Email Us</span>
                  <span className="block text-[10px] text-neutral-400 truncate">
                    {SITE_CONFIG.email}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-2.5 bg-white p-4 rounded-xl border border-neutral-100 shadow-sm hover:border-accent/30 transition-colors"
              >
                <Phone className="h-4 w-4 text-accent shrink-0" strokeWidth={1.5} />
                <div className="min-w-0">
                  <span className="block text-xs font-semibold text-neutral-900">Call Us</span>
                  <span className="block text-[10px] text-neutral-400 truncate">
                    {SITE_CONFIG.phone}
                  </span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
