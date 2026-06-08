import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/ui/ContentCard';
import { ContactCTA } from '@/components/sections';
import {
  getProductDomain,
  getAllProductSlugs,
  type Brand,
  type ProductDomain,
} from '@/data/products';
import { PROJECTS, type Project } from '@/data/projects';
import Link from 'next/link';
import { ArrowLeft, Building2, ExternalLink, Eye, FileDown, Sparkles } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const domain = getProductDomain(slug);

  if (!domain) {
    return { title: 'Not Found' };
  }

  return {
    title: `${domain.title} | Trading`,
    description: domain.description,
    openGraph: {
      title: `${domain.title} | CMS Group`,
      description: domain.description,
    },
  };
}

function getRelatedProjects(domain: ProductDomain): Project[] {
  if (!domain.projectKeywords || domain.projectKeywords.length === 0) return [];
  const lowerKeywords = domain.projectKeywords.map((k) => k.toLowerCase());
  return PROJECTS.filter((p) => {
    const haystack = [p.description, ...p.scope, p.title].join(' ').toLowerCase();
    return lowerKeywords.some((kw) => haystack.includes(kw));
  }).slice(0, 6);
}

function PartnerCard({ brand }: { brand: Brand }) {
  const hasBrochure = Boolean(brand.brochureUrl) && brand.brochureUrl !== '#';

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-border bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:p-10">
        <div>
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-neutral-charcoal lg:text-3xl">
            {brand.name}
          </h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
            {brand.country}
          </p>
          <p className="mt-4 text-base font-semibold text-accent">{brand.specialty}</p>
          <p className="mt-3 leading-relaxed text-neutral-600">{brand.description}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            {brand.catalogueUrl && (
              <a
                href={brand.catalogueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-700"
              >
                Visit Brand
                <ExternalLink className="h-4 w-4" />
              </a>
            )}

            {hasBrochure ? (
              <>
                <a
                  href={brand.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-charcoal transition-colors hover:border-accent/40 hover:bg-accent-50 hover:text-accent"
                >
                  <Eye className="h-4 w-4" />
                  View Brochure
                </a>
                <a
                  href={brand.brochureUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-charcoal transition-colors hover:border-accent/40 hover:bg-accent-50 hover:text-accent"
                >
                  <FileDown className="h-4 w-4" />
                  Download Brochure
                </a>
              </>
            ) : (
              <>
                <button
                  disabled
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-400 cursor-not-allowed"
                  title="Brochure coming soon"
                >
                  <Eye className="h-4 w-4" />
                  View Brochure
                  <span className="ml-1 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium uppercase">
                    Soon
                  </span>
                </button>
                <button
                  disabled
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-400 cursor-not-allowed"
                  title="Brochure coming soon"
                >
                  <FileDown className="h-4 w-4" />
                  Download Brochure
                </button>
              </>
            )}
          </div>
        </div>

        {/* Logo box */}
        <div className="hidden lg:flex h-32 w-48 shrink-0 items-center justify-center rounded-xl bg-white p-4">
          {brand.logo ? (
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              width={160}
              height={80}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-1 text-neutral-300">
              <Building2 className="h-7 w-7" strokeWidth={1.25} />
              <span className="text-[10px] uppercase tracking-wider font-medium">Logo</span>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </div>
  );
}

export default async function TradingSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const domain = getProductDomain(slug);

  if (!domain) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(domain);
  const partnerCount = domain.brands.length;

  return (
    <>
      <PageHero
        kicker="Trading Domain"
        title={domain.title}
        subtitle={domain.description}
        image={domain.image}
        imageAlt={domain.title}
        imagePosition={domain.imagePosition}
        size="compact"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Trading', href: '/trading' },
          { label: domain.title },
        ]}
      />

      {/* Brand Partners */}
      <Section variant="soft">
        <SectionHeader
          kicker="Brand Partners"
          title={
            partnerCount === 0
              ? 'Brand partners coming soon.'
              : `World-leading brands in ${domain.title.toLowerCase()}.`
          }
          lead="Authentic products with full manufacturer warranty, technical support, and after-sales service — sourced through CMS Group's authorised distribution channels."
        />

        {partnerCount > 0 ? (
          <div className="mt-12 space-y-8">
            {domain.brands.map((brand) => (
              <PartnerCard key={brand.name} brand={brand} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-neutral-300 bg-white px-8 py-12 text-center lg:py-16">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-accent">
              <Sparkles className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-neutral-charcoal">
              Brand partners coming soon
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
              We&apos;re finalising authorised distribution arrangements for this domain.
              Reach out to discuss specific product requirements.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-700"
            >
              Get in touch
            </Link>
          </div>
        )}
      </Section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <Section variant="light">
          <SectionHeader
            kicker="Featured Projects"
            title={`Projects featuring ${domain.title.toLowerCase()}.`}
            lead={`Recent CMS Group projects that supplied or installed ${domain.title.toLowerCase()} across hospitality, healthcare, education, and corporate sectors.`}
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((project) => (
              <ContentCard
                key={project.id}
                image={project.image}
                imageAlt={project.title}
                title={project.title}
                description={project.description}
                badge={project.sector ?? (project.type === 'residential' ? 'Residential' : undefined)}
                meta={String(project.year)}
                location={project.location}
                aspect="video"
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/trading"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-neutral-charcoal transition-colors hover:border-accent/40 hover:bg-accent-50 hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              All Trading Domains
            </Link>
          </div>
        </Section>
      )}

      <ContactCTA />
    </>
  );
}
