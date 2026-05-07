'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { ContactCTA } from '@/components/sections';
import { fadeUp } from '@/lib/motion';
import { SECTORS } from '@/data/sectors';
import { CheckCircle2 } from 'lucide-react';

function SectorSection({ sector, index }: { sector: (typeof SECTORS)[number]; index: number }) {
  const isEven = index % 2 === 0;

  // Split the long PDF description into a bullet list of services
  const items = sector.description
    .replace(/^.*?such as /i, '')
    .replace(/\.$/, '')
    .split(/,\s*/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && s.length < 60);

  return (
    <Section variant={isEven ? 'light' : 'soft'} id={sector.slug}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16"
      >
        {/* Header column */}
        <motion.div variants={fadeUp} custom={0} className="lg:col-span-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent-50 text-accent">
            <sector.icon className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <span className="mt-6 inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            Sector {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-neutral-charcoal sm:text-4xl lg:text-5xl">
            {sector.name}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-neutral-600 sm:text-base">
            {sector.summary}
          </p>
        </motion.div>

        {/* Services column */}
        <motion.div variants={fadeUp} custom={0.1} className="lg:col-span-8">
          <div className="rounded-2xl border border-neutral-border bg-white p-6 shadow-card lg:p-8">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              What we typically supply &amp; install
            </h3>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-relaxed text-neutral-700"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    strokeWidth={1.75}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Service Areas"
        title="Six sectors. One standard."
        subtitle="CMS Group serves Nepal's most demanding construction sectors with tailored material supply and on-site execution playbooks for each environment — from hospital sterility codes to airport throughput, hotel finish quality, and home-grade durability."
        image="/images/projects/grande-hospital.jpg"
        imageAlt="CMS Group service sectors"
        size="tall"
      />

      {/* Quick-jump Nav */}
      <section className="sticky top-16 z-30 border-y border-neutral-200 bg-white/95 backdrop-blur-md lg:top-20">
        <Container>
          <div className="flex flex-wrap items-center gap-2 py-3 sm:gap-3 sm:py-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 sm:mr-2">
              Jump to
            </span>
            {SECTORS.map((sector) => (
              <a
                key={sector.slug}
                href={`#${sector.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-accent/40 hover:bg-accent-50 hover:text-accent sm:text-sm"
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

      <ContactCTA />
    </>
  );
}
