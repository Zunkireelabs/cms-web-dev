import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import {
  getProductDomain,
  getAllProductSlugs,
  type Brand,
} from '@/data/products';
import { ContactCTA } from '@/components/sections';
import { ExternalLink, FileDown, ChevronRight } from 'lucide-react';

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
      title: `${domain.title} | CMS Trading & Contracting`,
      description: domain.description,
    },
  };
}

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-border bg-white shadow-card transition-all duration-300 hover:shadow-card-hover">
      <div className="p-8 lg:p-10">
        {/* Brand Name */}
        <h3 className="text-2xl font-bold text-neutral-charcoal lg:text-3xl">
          {brand.name}
        </h3>

        {/* Country */}
        <p className="mt-1 text-sm text-neutral-400">{brand.country}</p>

        {/* Specialty - bold niche highlight */}
        <p className="mt-4 text-lg font-bold text-brand-700">
          {brand.specialty}
        </p>

        {/* Description */}
        <p className="mt-3 text-neutral-600 leading-relaxed">
          {brand.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          {brand.catalogueUrl && (
            <a
              href={brand.catalogueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              Visit Brand
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <button
            disabled
            className="inline-flex items-center gap-2 rounded-lg border-2 border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-400 cursor-not-allowed"
            title="Brochure coming soon"
          >
            <FileDown className="h-4 w-4" />
            Download Brochure
            <span className="ml-1 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium uppercase">
              Coming Soon
            </span>
          </button>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-600 transition-all duration-300 group-hover:w-full" />
    </div>
  );
}

export default async function TradingSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const domain = getProductDomain(slug);

  if (!domain) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-neutral-charcoal py-20 lg:py-28">
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
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-brand-200">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/trading" className="hover:text-white transition-colors">
              Trading
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{domain.title}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              Trading Division
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {domain.title}
            </h1>
            <p className="mt-6 text-xl text-brand-100">{domain.description}</p>
          </div>
        </Container>
      </section>

      {/* Brands Section */}
      <section className="py-16 lg:py-24 bg-neutral-off-white">
        <Container>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-charcoal sm:text-3xl">
              Our Brand Partners
            </h2>
            <p className="mt-2 text-neutral-600">
              {domain.brands.length === 1
                ? 'Our exclusive partner for this domain'
                : `${domain.brands.length} world-leading brands in ${domain.title.toLowerCase()}`}
            </p>
          </div>

          <div className="space-y-8">
            {domain.brands.map((brand) => (
              <BrandCard key={brand.name} brand={brand} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <ContactCTA />
    </>
  );
}
