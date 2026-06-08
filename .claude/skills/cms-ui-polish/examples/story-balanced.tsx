/**
 * EXAMPLE — Balanced Story Section
 *
 * The canonical "Our Story" section composition:
 * - Left column: kicker + h2 + lead + 4-cell meta grid + 1 supporting paragraph
 * - Right column: 4/5 portrait photo with bottom-overlay caption
 *
 * Use this when you need to break a 3-paragraph wall into something
 * that respects the reader.
 *
 * NOT FOR DIRECT IMPORT — copy the relevant pattern into your page.
 */

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { KickerLabel } from '@/components/ui/KickerLabel';
import { fadeUp } from '@/lib/motion';

export function StoryBalancedExample() {
  return (
    <Section variant="light">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Content column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          custom={0}
        >
          <KickerLabel>Our Story</KickerLabel>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-neutral-charcoal sm:text-4xl lg:text-5xl">
            Two decades of building trust in Nepal.
          </h2>

          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            CMS Group is a leading provider of construction materials and building services in
            Nepal. Since 2002, we have built a reputation for reliability, professionalism,
            and customer satisfaction across the construction sector.
          </p>

          {/* Meta grid — breaks the wall of text */}
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                Founded
              </dt>
              <dd className="mt-1 font-display text-xl font-bold text-neutral-charcoal">
                2002
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                Head Office
              </dt>
              <dd className="mt-1 font-display text-xl font-bold text-neutral-charcoal">
                Kathmandu
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                Ventures
              </dt>
              <dd className="mt-1 font-display text-xl font-bold text-neutral-charcoal">
                6
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                Sectors
              </dt>
              <dd className="mt-1 font-display text-xl font-bold text-neutral-charcoal">
                Hospital · Education · Airport · Office · Hotel · Residence
              </dd>
            </div>
          </dl>

          <p className="mt-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Today, the group spans six associated ventures — Bath N Room, Baba Muktinath
            Fabricators, 4R Technologies, Cubic Meter, Techwood, and Prime Ceramics —
            serving hospitals, education, airports, offices, hotels, and residential projects
            across the country.
          </p>
        </motion.div>

        {/* Photo column with bottom-overlay caption */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          custom={0.1}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl"
        >
          <Image
            src="/images/projects/nrb-thapathali.jpg"
            alt="Nepal Rastra Bank — Thapathali — flagship CMS Group project"
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover"
            priority={false}
          />
          {/* Single vertical gradient — caption is short, no need for double */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-charcoal/85 via-neutral-charcoal/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Featured Project
            </p>
            <p className="mt-2 font-display text-xl font-bold text-white lg:text-2xl">
              Nepal Rastra Bank — Thapathali
            </p>
            <p className="mt-1 text-sm text-white/70">
              1.5 lakh sq.ft BKB parquet flooring, Armstrong ceiling, Dormakaba hardware
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
