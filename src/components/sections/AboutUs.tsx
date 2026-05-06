'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const STATS = [
  { value: '23+', label: 'Years' },
  { value: '500+', label: 'Projects' },
  { value: '50+', label: 'Global Brands' },
];

export function AboutUs() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expanded, setExpanded] = useState(false);

  return (
    <section ref={ref} className="relative overflow-hidden bg-accent-50 py-20 lg:py-28">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text - Left Side */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col justify-center"
          >
          {/* Gold Accent Line */}
          <motion.div variants={fadeUp} custom={0}>
            <div className="h-[3px] w-12 bg-accent mb-5" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            custom={0.1}
            className="font-display text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight text-neutral-900 leading-tight"
          >
            About Us
          </motion.h2>

          {/* Lead Paragraph - slightly bolder */}
          <motion.p
            variants={fadeUp}
            custom={0.15}
            className="mt-5 text-[15px] leading-relaxed text-neutral-700"
          >
            The Trading &amp; Contracting Division of CMS Group is a specialized business unit delivering integrated solutions across facets of building and infrastructure domains. With strong capabilities in both trading and contract execution, we support projects from material supply through to on-site implementation, ensuring consistency, quality, and reliability at every stage.
          </motion.p>

          {/* Inline Stats Strip */}
          <motion.div
            variants={fadeUp}
            custom={0.2}
            className="my-6 flex items-center gap-6 sm:gap-8 py-5 border-y border-neutral-200"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <span className="block font-display text-2xl sm:text-3xl font-semibold text-accent">
                  {stat.value}
                </span>
                <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Expandable Details */}
          <motion.div variants={fadeUp} custom={0.25}>
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="text-[13px] leading-relaxed text-neutral-500">
                    Our division operates across key sectors including roofing systems, facade solutions, ceilings, aluminum doors and windows, wood and glass coating, door hardware, architectural railings, office furnitures, waterproofing systems, wastewater management solutions, and sanitaryware. We work with reputed international brands and globally recognized manufacturers, enabling us to supply high-quality, compliant products that meet international standards and project specifications.
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-neutral-500">
                    Backed by the corporate strength and governance of CMS Group, we combine established global supplier partnerships with experienced technical and project teams. Our operations are driven by structured processes, safety-focused execution, and stringent quality control, allowing us to deliver dependable outcomes across commercial, residential, industrial, and infrastructure projects.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent hover:text-accent-700 transition-colors"
            >
              {expanded ? 'Read Less' : 'Read More'}
              {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} custom={0.3} className="mt-7">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3 text-sm font-semibold text-white uppercase tracking-wider transition-colors hover:bg-accent-700"
            >
              Know More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

          {/* Image - Right Side */}
          <div className="relative aspect-[4/3] lg:aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/hero/project-3.jpg"
              alt="CMS Group project showcase"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
