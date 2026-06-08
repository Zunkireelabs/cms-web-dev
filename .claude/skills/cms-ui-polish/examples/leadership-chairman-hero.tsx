/**
 * EXAMPLE — Leadership section with Chairman-hero treatment
 *
 * Solves the failure mode where chairman + directors all sit in
 * a uniform 4-col grid. Chairman gets a 2-col split (large portrait
 * + full bio + signature pull-quote), directors get a clean 3-col grid below.
 *
 * NOT FOR DIRECT IMPORT — copy the pattern into your page.
 */

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { fadeUp, stagger } from '@/lib/motion';
import { Users } from 'lucide-react';
import type { Director } from '@/types';

interface LeadershipProps {
  chairman: Director;
  directors: Director[];
}

export function LeadershipChairmanHeroExample({ chairman, directors }: LeadershipProps) {
  return (
    <Section variant="light" id="leadership">
      <SectionHeader
        kicker="Leadership"
        title="The team steering CMS Group."
        lead="Chairman and six directors steering the group across trading, contracting, and manufacturing."
        align="center"
        className="mx-auto"
      />

      {/* Tier 1 — Chairman hero */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
        custom={0}
        className="mt-16 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card"
      >
        <div className="grid lg:grid-cols-5">
          {/* Portrait — 40% on desktop */}
          <div className="relative aspect-[4/5] lg:col-span-2 lg:aspect-auto">
            {chairman.photo ? (
              <Image
                src={chairman.photo}
                alt={chairman.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-50 to-neutral-100">
                <Users className="h-16 w-16 text-accent/40" strokeWidth={1.25} />
              </div>
            )}
            <span className="absolute top-5 left-5 inline-block rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
              Chairman
            </span>
          </div>

          {/* Bio — 60% on desktop */}
          <div className="flex flex-col justify-center p-8 lg:col-span-3 lg:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              {chairman.title} · {chairman.company}
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-neutral-charcoal sm:text-3xl lg:text-4xl">
              {chairman.name}
            </h3>
            <p className="mt-6 leading-relaxed text-neutral-600">
              {chairman.bio.split('\n\n')[0]}
            </p>
            {chairman.bio.split('\n\n').length > 1 && (
              <p className="mt-4 leading-relaxed text-neutral-600">
                {chairman.bio.split('\n\n')[1]}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tier 2 — Directors grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {directors.map((member, index) => (
          <motion.div key={member.name} variants={fadeUp} custom={index * 0.04} className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-50 to-neutral-100">
                  <Users className="h-12 w-12 text-accent/40" strokeWidth={1.25} />
                </div>
              )}
            </div>
            <h4 className="mt-5 font-display text-base font-bold text-neutral-charcoal">
              {member.name}
            </h4>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">
              {member.title} · {member.company}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-4">
              {member.summary ?? member.bio.split('.')[0] + '.'}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
