'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Section } from '@/components/ui/Section';
import { StatBlock } from '@/components/ui/StatBlock';
import { ContactCTA } from '@/components/sections';
import { fadeUp, stagger } from '@/lib/motion';
import {
  BRANDS,
  TOTAL_BRAND_COUNT,
  DOMAIN_LABELS,
  DOMAIN_ORDER,
  getBrandsByTradingDomain,
  type BrandEntry,
  type TradingDomainSlug,
} from '@/data/brands';
import {
  Building2,
  ExternalLink,
  MapPin,
} from 'lucide-react';

const COUNTRY_COUNT = new Set(BRANDS.map((b) => b.country.split(' ')[0])).size;

function BrandCard({ brand }: { brand: BrandEntry }) {
  const hasWebsite = Boolean(brand.website) && brand.website !== '#';
  const Wrapper = hasWebsite ? 'a' : 'div';
  const wrapperProps = hasWebsite
    ? {
        href: brand.website,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `Visit ${brand.name} website`,
      }
    : {};

  return (
    <motion.div variants={fadeUp} custom={0} className="h-full">
      <Wrapper
        {...wrapperProps}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-neutral-border bg-white transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-hover"
      >
        {/* Logo plate */}
        <div className="relative flex h-24 items-center justify-center border-b border-neutral-100 bg-neutral-off-white px-4 py-3">
          {brand.logoUrl ? (
            <Image
              src={brand.logoUrl}
              alt={`${brand.name} logo`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 220px"
              className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex flex-col items-center gap-1 text-neutral-300">
              <Building2 className="h-6 w-6" strokeWidth={1.25} />
              <span className="text-[9px] font-medium uppercase tracking-[0.16em]">
                {brand.name.split(' ')[0]}
              </span>
            </div>
          )}
          {hasWebsite && (
            <span className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-neutral-400 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
              <ExternalLink className="h-3 w-3" strokeWidth={2} />
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-display text-[15px] font-bold leading-tight text-neutral-charcoal transition-colors group-hover:text-accent">
              {brand.name}
            </h4>
            {brand.founded && (
              <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Est. {brand.founded}
              </span>
            )}
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-neutral-500">
            <MapPin className="h-3 w-3 text-accent" strokeWidth={1.5} />
            <span>{brand.country}</span>
          </div>
          {brand.description && (
            <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-neutral-600">
              {brand.description}
            </p>
          )}
        </div>

        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
      </Wrapper>
    </motion.div>
  );
}

function DomainSection({ domainSlug }: { domainSlug: TradingDomainSlug }) {
  const brands = getBrandsByTradingDomain(domainSlug);
  if (brands.length === 0) return null;

  return (
    <motion.div
      id={domainSlug}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={stagger}
      className="scroll-mt-28 rounded-2xl border border-neutral-border bg-white p-6 shadow-card lg:p-10"
    >
      {/* Domain Header */}
      <motion.div variants={fadeUp} custom={0} className="mb-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-neutral-charcoal sm:text-3xl">
              {DOMAIN_LABELS[domainSlug]}
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <Link
              href={`/trading/${domainSlug}`}
              className="inline-flex items-center gap-1 font-semibold uppercase tracking-wider text-accent transition-colors hover:text-accent-700"
            >
              View domain →
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Brand Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {brands.map((brand) => (
          <BrandCard key={brand.slug} brand={brand} />
        ))}
      </div>
    </motion.div>
  );
}

export default function BrandsPage() {
  return (
    <>
      <PageHero
        kicker="Brand Partners"
        title="World-renowned brands, distributed in Nepal."
        subtitle="Authorised partner brands across fourteen trading domains — Grohe, Hunter Douglas, Dormakaba, IKO, Tarkett, Armstrong, and more."
        image="/images/projects/tiger-palace.jpg"
        imageAlt="Tiger Palace Resort — featuring Grohe, American Standard, Dormakaba"
        size="tall"
      />

      {/* Stat anchor — hidden */}

      {/* Brands Grouped by Trading Domain */}
      <Section variant="light">
        <SectionHeader
          kicker="Organised by Domain"
          title="Quality products from industry leaders."
          lead="Each trading domain is served by exclusive partnerships with global manufacturers — authentic products with full manufacturer warranty and after-sales support."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 space-y-10">
          {DOMAIN_ORDER.map((domainSlug) => (
            <DomainSection key={domainSlug} domainSlug={domainSlug} />
          ))}
        </div>
      </Section>

      <ContactCTA />
    </>
  );
}
