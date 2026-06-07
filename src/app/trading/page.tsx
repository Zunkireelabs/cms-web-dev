import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatBlock } from '@/components/ui/StatBlock';
import { ContentCard } from '@/components/ui/ContentCard';
import { ContactCTA } from '@/components/sections';
import { PRODUCT_DOMAINS } from '@/data/products';
import { BRANDS, TOTAL_BRAND_COUNT } from '@/data/brands';

const COUNTRY_COUNT = new Set(BRANDS.map((b) => b.country.split(' ')[0])).size;

export const metadata: Metadata = {
  title: 'Trading Division',
  description: `CMS Group Trading — premium building materials from ${TOTAL_BRAND_COUNT}+ global brand partners across ${PRODUCT_DOMAINS.length} specialized domains, distributed in Nepal through Bath N Room, Baba Muktinath Fabricators, 4R Technologies, Techwood, and Prime Ceramics.`,
};

export default function TradingPage() {
  return (
    <>
      <PageHero
        kicker="Trading Division"
        title="Premium building materials, distributed in Nepal."
        subtitle={`${TOTAL_BRAND_COUNT}+ authorised partner brands across ${PRODUCT_DOMAINS.length} specialised domains — sanitary, roofing, ceilings, hardware, flooring, tiles, and more.`}
        image="/images/products/sanitaryware.jpg"
        imageAlt="CMS Group Trading — premium building materials"
        primaryCta={{ label: 'Explore Domains', href: '#domains' }}
        secondaryCta={{ label: 'Contracting Division', href: '/contracting' }}
        size="tall"
      />

      {/* Stat anchor */}
      <Section variant="soft" compact>
        <div className="grid grid-cols-3 gap-x-6 gap-y-12 sm:gap-12">
          <div className="border-l border-accent/40 pl-5 lg:pl-6">
            <StatBlock value={`${TOTAL_BRAND_COUNT}+`} label="Brand Partners" size="md" />
          </div>
          <div className="border-l border-accent/40 pl-5 lg:pl-6">
            <StatBlock value={`${PRODUCT_DOMAINS.length}`} label="Product Domains" size="md" />
          </div>
          <div className="border-l border-accent/40 pl-5 lg:pl-6">
            <StatBlock value={`${COUNTRY_COUNT}+`} label="Countries of Origin" size="md" />
          </div>
        </div>
      </Section>

      {/* Domains Grid */}
      <Section variant="light" id="domains">
        <SectionHeader
          kicker="Specialised Domains"
          title="Fourteen product domains, one trusted source."
          lead="Each domain is anchored by world-leading manufacturers — chosen for engineering pedigree, design fidelity, and proven reliability across the projects we deliver."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_DOMAINS.map((domain) => (
            <ContentCard
              key={domain.slug}
              href={`/trading/${domain.slug}`}
              image={domain.image}
              imageAlt={domain.title}
              title={domain.title}
              description={domain.description}
              subtitle={
                domain.brands.length === 0
                  ? 'Coming soon'
                  : domain.brands.length === 1
                    ? '1 brand partner'
                    : `${domain.brands.length} brand partners`
              }
              aspect="video"
            />
          ))}
        </div>
      </Section>

      <ContactCTA />
    </>
  );
}
