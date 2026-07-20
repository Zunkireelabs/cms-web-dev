'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { ArrowRight } from 'lucide-react';

interface HighlightItem {
  id: string;
  label: string;
  image: string;
  link: string;
}

const HIGHLIGHTS: HighlightItem[] = [
  {
    id: 'global-brands',
    label: '50+ Global Brands',
    image: '/images/products/facade.jpg',
    link: '/brands',
  },
  {
    id: 'projects-delivered',
    label: '500+ Projects Delivered',
    image: '/images/hero/project-1.jpg',
    link: '/projects',
  },
  {
    id: 'hospitality',
    label: 'Hotel & Hospitality',
    image: '/images/projects/hospitality.jpg',
    link: '/projects',
  },
  {
    id: 'contracting-division',
    label: 'Contracting Division',
    image: '/images/hero/project-5.jpg',
    link: '/contracting',
  },
  {
    id: 'sectors-served',
    label: '6 Sectors Served',
    image: '/images/hero/project-3.jpg',
    link: '/services',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function HighlightCard({ item }: { item: HighlightItem }) {
  return (
    <Link href={item.link} className="group relative block h-full overflow-hidden rounded-xl">
      {/* Image */}
      <div className="absolute inset-0 bg-neutral-900">
        <Image
          src={item.image}
          alt={item.label}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Subtle bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Bottom bar: label + arrow */}
      <div className="relative h-full flex items-end p-5 sm:p-6">
        <div className="flex w-full items-center justify-between">
          <span className="text-sm sm:text-base font-semibold text-white">
            {item.label}
          </span>
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm transition-colors group-hover:bg-white/30">
            <ArrowRight className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Highlights() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <Container>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 auto-rows-[260px] sm:auto-rows-[280px]"
        >
          {/* Text Block - Top Left */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="flex flex-col justify-between p-2 sm:p-4"
          >
            <div>
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Latest Highlights
                </span>
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight leading-[1.1] text-neutral-charcoal sm:text-4xl">
                Recent activity across the group.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-neutral-600 sm:text-base">
                Brand partnerships, sector focus, contracting milestones — what&apos;s
                been happening across CMS Group lately.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/newsroom"
                className="inline-flex items-center gap-2 rounded-full border-2 border-neutral-800 px-5 py-2.5 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                Know More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Image Card 1 - Top Middle */}
          <motion.div variants={fadeUp} custom={0.1}>
            <HighlightCard item={HIGHLIGHTS[0]} />
          </motion.div>

          {/* Image Card 2 - Top Right */}
          <motion.div variants={fadeUp} custom={0.2}>
            <HighlightCard item={HIGHLIGHTS[1]} />
          </motion.div>

          {/* Image Card 3 - Bottom Left */}
          <motion.div variants={fadeUp} custom={0.3}>
            <HighlightCard item={HIGHLIGHTS[2]} />
          </motion.div>

          {/* Image Card 4 - Bottom Middle */}
          <motion.div variants={fadeUp} custom={0.4}>
            <HighlightCard item={HIGHLIGHTS[3]} />
          </motion.div>

          {/* Image Card 5 - Bottom Right */}
          <motion.div variants={fadeUp} custom={0.5}>
            <HighlightCard item={HIGHLIGHTS[4]} />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
