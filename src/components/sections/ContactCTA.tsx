'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  FileText,
  Mail,
  MapPin,
  Phone,
  Shield,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SITE_CONFIG } from '@/lib/constants';
import { fadeUp } from '@/lib/motion';

const TRUST_POINTS = [
  { icon: MapPin, title: 'Free Site Assessment' },
  { icon: FileText, title: 'Detailed Quotation' },
  { icon: Shield, title: '500+ Projects Delivered' },
];

export function ContactCTA() {
  return (
    <section className="bg-accent-50 py-14 lg:py-16">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid items-center gap-10 lg:grid-cols-5 lg:gap-12"
        >
          {/* Left — Text (3 cols) */}
          <div className="lg:col-span-3">
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                  Now Accepting Projects 2026
                </span>
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={0.08}
              className="mt-6 font-display text-3xl font-bold leading-[1.15] tracking-tight text-neutral-charcoal sm:text-4xl lg:text-5xl"
            >
              Ready to start your <span className="text-accent">project</span>?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.16}
              className="mt-4 max-w-lg text-base leading-relaxed text-neutral-600"
            >
              From material procurement to on-site execution — let&apos;s bring your vision
              to life.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={0.22}
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              {TRUST_POINTS.map((point) => (
                <div key={point.title} className="flex items-center gap-2">
                  <point.icon className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                    {point.title}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Action Cards (2 cols) */}
          <motion.div
            variants={fadeUp}
            custom={0.1}
            className="space-y-3 lg:col-span-2"
          >
            {/* Primary card — Schedule */}
            <Link
              href="/contact"
              className="group block rounded-xl border border-neutral-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Calendar className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-lg font-bold tracking-tight text-neutral-charcoal">
                  Schedule a Consultation
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-neutral-500">
                Book a free call to discuss your project requirements and get expert
                recommendations.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors group-hover:text-accent-700">
                Book your slot
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>

            {/* Compact row — Email + Call */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2.5 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm transition-colors hover:border-accent/30"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                <div className="min-w-0">
                  <span className="block text-xs font-bold text-neutral-charcoal">
                    Email Us
                  </span>
                  <span className="block truncate text-[10px] text-neutral-400">
                    {SITE_CONFIG.email}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-2.5 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm transition-colors hover:border-accent/30"
              >
                <Phone className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                <div className="min-w-0">
                  <span className="block text-xs font-bold text-neutral-charcoal">
                    Call Us
                  </span>
                  <span className="block truncate text-[10px] text-neutral-400">
                    {SITE_CONFIG.phone}
                  </span>
                </div>
              </a>
            </div>

            {/* Careers cross-link (slim band, full-width) */}
            <Link
              href="/career"
              className="group flex items-center justify-between gap-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="h-4 w-4 text-accent" strokeWidth={1.75} />
                <div>
                  <span className="block text-xs font-bold text-neutral-charcoal">
                    Build your career with us
                  </span>
                  <span className="block text-[10px] text-neutral-400">
                    Six ventures, 50+ partners — find your fit
                  </span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
