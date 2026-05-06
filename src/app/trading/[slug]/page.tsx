import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import {
  getProductDomain,
  getAllProductSlugs,
  type Brand,
  type ProductDomain,
} from '@/data/products';
import { PROJECTS, type Project } from '@/data/projects';
import { ContactCTA } from '@/components/sections';
import {
  Building2,
  ChevronRight,
  ExternalLink,
  Eye,
  FileDown,
  MapPin,
  Maximize,
} from 'lucide-react';

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

function getRelatedProjects(domain: ProductDomain): Project[] {
  if (!domain.projectKeywords || domain.projectKeywords.length === 0) return [];
  const lowerKeywords = domain.projectKeywords.map((k) => k.toLowerCase());
  return PROJECTS.filter((p) => {
    const haystack = [
      p.description,
      ...p.scope,
      p.title,
    ]
      .join(' ')
      .toLowerCase();
    return lowerKeywords.some((kw) => haystack.includes(kw));
  }).slice(0, 6);
}

function BrandCard({ brand }: { brand: Brand }) {
  const hasBrochure = Boolean(brand.brochureUrl) && brand.brochureUrl !== '#';

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-border bg-white shadow-card transition-all duration-300 hover:shadow-card-hover">
      <div className="grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:p-10">
        <div>
          <h3 className="text-2xl font-bold text-neutral-charcoal lg:text-3xl">
            {brand.name}
          </h3>
          <p className="mt-1 text-sm text-neutral-400">{brand.country}</p>
          <p className="mt-4 text-lg font-bold text-brand-700">{brand.specialty}</p>
          <p className="mt-3 text-neutral-600 leading-relaxed">{brand.description}</p>

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

          {/* Brochure: View + Download dual buttons */}
          {hasBrochure ? (
            <>
              <a
                href={brand.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-300 px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
              >
                <Eye className="h-4 w-4" />
                View Brochure
              </a>
              <a
                href={brand.brochureUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-300 px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
              >
                <FileDown className="h-4 w-4" />
                Download Brochure
              </a>
            </>
          ) : (
            <>
              <button
                disabled
                className="inline-flex items-center gap-2 rounded-lg border-2 border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-400 cursor-not-allowed"
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
                className="inline-flex items-center gap-2 rounded-lg border-2 border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-400 cursor-not-allowed"
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
        <div className="hidden lg:flex h-32 w-48 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-off-white p-4">
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
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-600 transition-all duration-300 group-hover:w-full" />
    </div>
  );
}

function RelatedProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-2xl border border-neutral-border bg-white p-6 shadow-card transition-all hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-3 mb-3">
        {project.sector && (
          <span className="inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium capitalize text-brand-700">
            {project.sector}
          </span>
        )}
        <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
          {project.year}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-neutral-charcoal group-hover:text-brand-700 transition-colors leading-tight">
        {project.title}
      </h3>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-neutral-500">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3 text-brand-600" strokeWidth={1.5} />
          {project.location}
        </span>
        {project.area && (
          <span className="flex items-center gap-1.5">
            <Maximize className="h-3 w-3 text-brand-600" strokeWidth={1.5} />
            {project.area}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm text-neutral-600 leading-relaxed line-clamp-3">
        {project.description}
      </p>
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
            <p className="mt-6 text-xl text-brand-100 leading-relaxed">{domain.description}</p>
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
              {domain.brands.length === 0
                ? 'Brand partners coming soon for this domain'
                : domain.brands.length === 1
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

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <Container>
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-bold text-neutral-charcoal sm:text-3xl">
                  Projects Featuring {domain.title}
                </h2>
                <p className="mt-2 text-neutral-600">
                  Recent CMS Group projects that supplied or installed{' '}
                  {domain.title.toLowerCase()}.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
              >
                View All Projects
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <RelatedProjectCard key={project.id} project={project} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <ContactCTA />
    </>
  );
}
