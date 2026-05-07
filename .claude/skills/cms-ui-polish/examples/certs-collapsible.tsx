/**
 * EXAMPLE — Collapsible certifications section
 *
 * Solves the failure mode of 18 identical cards in 6 rows (visual fatigue).
 * Shows first 6 cards expanded with a "Show all 18" toggle.
 *
 * NOT FOR DIRECT IMPORT — copy the pattern into your page.
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { fadeUp, stagger } from '@/lib/motion';
import { ChevronDown, ScrollText, MapPin, CheckCircle, Calendar } from 'lucide-react';
import type { Certification } from '@/types';

interface CertsProps {
  certifications: Certification[];
}

const PREVIEW_COUNT = 6;

export function CertsCollapsibleExample({ certifications }: CertsProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? certifications : certifications.slice(0, PREVIEW_COUNT);
  const hiddenCount = certifications.length - PREVIEW_COUNT;

  return (
    <Section variant="soft" id="associations">
      <SectionHeader
        kicker="Our Associations"
        title={`Authorised distribution across ${certifications.length} global brands.`}
        lead="Every brand we represent is backed by a current dealership, channel-partner, or distributorship certificate — authentic products with full manufacturer warranty and after-sales support."
        align="center"
        className="mx-auto"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((cert, index) => (
          <motion.div
            key={cert.id}
            variants={fadeUp}
            custom={index * 0.03}
            className="group relative rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent">
                <ScrollText className="h-5 w-5" strokeWidth={1.5} />
              </div>
              {cert.country && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  <MapPin className="h-3 w-3" strokeWidth={1.5} />
                  {cert.country}
                </span>
              )}
            </div>
            <h3 className="mt-4 font-display text-lg font-bold leading-tight text-neutral-charcoal">
              {cert.brand}
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">
              {cert.type}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-3">
              {cert.scope}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-4">
              <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500">
                <CheckCircle className="h-3 w-3 text-accent" strokeWidth={1.5} />
                {cert.holder}
              </span>
              {(cert.validFrom || cert.validUntil || cert.issued) && (
                <span className="inline-flex items-center gap-1 text-[11px] text-neutral-400">
                  <Calendar className="h-3 w-3" strokeWidth={1.5} />
                  {cert.validUntil
                    ? `Valid till ${cert.validUntil}`
                    : cert.issued ?? cert.validFrom}
                </span>
              )}
            </div>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
          </motion.div>
        ))}
      </motion.div>

      {/* Toggle — only show when there are hidden certs */}
      {!showAll && hiddenCount > 0 && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-neutral-charcoal transition-colors hover:border-accent/40 hover:bg-accent-50 hover:text-accent"
          >
            Show all {certifications.length} certifications
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </Section>
  );
}
