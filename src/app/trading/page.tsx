import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { ContentCard } from '@/components/ui/ContentCard';
import { ContactCTA } from '@/components/sections';
import { fetchProductDomains, fetchBrands } from '@/lib/cms';
import { DomainsKicker } from './DomainsKicker';

export const metadata: Metadata = {
  title: 'Trading Division',
  description:
    'CMS Group Trading — premium building materials from global brand partners across specialized domains, distributed in Nepal through Bath N Room, Baba Muktinath Fabricators, 4R Technologies, Techwood, and Prime Ceramics.',
};

export default async function TradingPage() {
  const [domains, brands] = await Promise.all([fetchProductDomains(), fetchBrands()]);
  const totalBrandCount = brands.length;

  return (
    <>
      <PageHero
        kicker="Trading Division"
        title="Premium building materials, distributed in Nepal."
        subtitle={`${totalBrandCount}+ authorised partner brands across ${domains.length} specialised domains — sanitary, roofing, ceilings, hardware, flooring, tiles, and more.`}
        image="/images/products/sanitaryware.jpg"
        imageAlt="CMS Group Trading — premium building materials"
        primaryCta={{ label: 'Explore Domains', href: '#domains' }}
        size="tall"
      />

      {/* Domains Grid */}
      <Section variant="light" id="domains">
        <DomainsKicker />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain) => {
            const domainBrands = brands.filter((b) => b.tradingDomains?.includes(domain.slug));
            return (
              <ContentCard
                key={domain.slug}
                href={`/trading/${domain.slug}`}
                image={domain.image}
                imageAlt={domain.title}
                title={domain.title}
                description={domain.description}
                subtitle={
                  domainBrands.length === 0
                    ? 'Coming soon'
                    : domainBrands.length === 1
                      ? '1 brand partner'
                      : `${domainBrands.length} brand partners`
                }
                aspect="video"
              />
            );
          })}
        </div>
      </Section>

      <ContactCTA />
    </>
  );
}
