'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { ContactCTA } from '@/components/sections';
import { SECTORS } from '@/data/sectors';
import { CheckCircle2 } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function SectorSection({ sector, index }: { sector: (typeof SECTORS)[number]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  // Split the long PDF description into a bullet list of services
  const items = sector.description
    .replace(/^.*?such as /i, '')
    .replace(/\.$/, '')
    .split(/,\s*/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && s.length < 60);

  return (
    <section
      ref={ref}
      id={sector.slug}
      className={`scroll-mt-24 py-16 lg:py-24 ${isEven ? 'bg-white' : 'bg-neutral-off-white'}`}
    >
      <Container>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start"
        >
          {/* Header column */}
          <motion.div variants={fadeUp} custom={0} className="lg:col-span-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <sector.icon className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <span className="mt-5 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
              Sector {String(index + 1).padStart(2, '0')}
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-charcoal sm:text-4xl">
              {sector.name}
            </h2>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed">
              {sector.summary}
            </p>
          </motion.div>

          {/* Services column */}
          <motion.div variants={fadeUp} custom={0.1} className="lg:col-span-8">
            <div className="rounded-2xl border border-neutral-border bg-white p-6 shadow-card lg:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                What we typically supply &amp; install
              </h3>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-neutral-700 leading-relaxed"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-brand-600" strokeWidth={1.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-charcoal via-neutral-800 to-brand-900 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
            >
              Service Areas
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Six Sectors. One Standard.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-xl text-neutral-300 leading-relaxed"
            >
              CMS Group serves Nepal&apos;s most demanding construction sectors with
              tailored material supply and on-site execution playbooks for each
              environment.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Quick-jump Nav */}
      <section className="sticky top-16 z-30 border-y border-neutral-border bg-white/95 backdrop-blur-md lg:top-20">
        <Container>
          <div className="flex flex-wrap items-center gap-2 py-3 sm:gap-3 sm:py-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 sm:mr-2">
              Jump to
            </span>
            {SECTORS.map((sector) => (
              <a
                key={sector.slug}
                href={`#${sector.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 sm:text-sm"
              >
                <sector.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                {sector.name}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Sector Sections */}
      {SECTORS.map((sector, index) => (
        <SectorSection key={sector.slug} sector={sector} index={index} />
      ))}

      {/* CTA */}
      <ContactCTA />
    </>
  );
}
