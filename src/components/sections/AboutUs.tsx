'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { KickerLabel } from '@/components/ui/KickerLabel';
import { fadeUp } from '@/lib/motion';

const STATS = [
  { value: '23+', label: 'Years' },
  { value: '500+', label: 'Projects' },
  { value: '50+', label: 'Global Brands' },
];

export function AboutUs() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Section variant="soft">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Content column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col justify-center"
        >
          <motion.div variants={fadeUp} custom={0}>
            <KickerLabel>About CMS Group</KickerLabel>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={0.08}
            className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-neutral-charcoal sm:text-4xl lg:text-5xl"
          >
            Two decades of building Nepal.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.16}
            className="mt-6 text-base leading-relaxed text-neutral-700 sm:text-lg"
          >
            The Trading & Contracting Division of CMS Group is a specialized business unit delivering
            integrated solutions across facets of building and infrastructure domains. With strong
            capabilities in both trading and contracting execution, we support projects from material supply
            through to on-site implementation, ensuring consistency, quality, and reliability at every
            stage.
          </motion.p>


          {/* Expandable details */}
          <motion.div variants={fadeUp} custom={0.28}>
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="text-sm leading-relaxed text-neutral-600">
                    Our division operates across key sectors including roofing systems, facade solutions,
                    ceilings, aluminum doors and windows, wood and glass coating, door hardware,
                    architectural railings, office furnitures, waterproofing systems, wastewater management
                    solutions, and sanitaryware. We work with reputed international brands and globally
                    recognized manufacturers, enabling us to supply high-quality, compliant products that meet
                    international standards and project specifications.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    Backed by the corporate strength and governance of CMS Group, we combine established
                    global supplier partnerships with experienced technical and project teams. Our operations
                    are driven by structured processes, safety-focused execution, and stringent quality control,
                    allowing us to deliver dependable outcomes across commercial, residential, industrial, and
                    infrastructure projects.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-700"
            >
              {expanded ? 'Read less' : 'Read more'}
              {expanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.34} className="mt-7">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-700"
            >
              Know More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Photo column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          custom={0.1}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl"
        >
          <Image
            src="/images/hero/project-3.jpg"
            alt="CMS Group project showcase"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </motion.div>
      </div>
    </Section>
  );
}
