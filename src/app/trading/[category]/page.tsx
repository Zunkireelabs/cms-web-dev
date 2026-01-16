import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import {
  getTradingCategory,
  getAllTradingSlugs,
  type Brand,
} from '@/data/trading';
import { ExternalLink, Globe, FileText, ChevronRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllTradingSlugs();
  return slugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getTradingCategory(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: category.title,
    description: category.description,
    openGraph: {
      title: `${category.title} | CMS Trading & Contracting`,
      description: category.description,
    },
  };
}

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-border bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover">
      {/* Featured Badge */}
      {brand.featured && (
        <div className="absolute right-4 top-4">
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            Featured Partner
          </span>
        </div>
      )}

      {/* Brand Header */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-neutral-charcoal group-hover:text-brand-600 transition-colors">
          {brand.name}
        </h3>
        <p className="mt-1 text-sm text-neutral-400">{brand.country}</p>
      </div>

      {/* Description */}
      <p className="text-neutral-600 leading-relaxed">{brand.description}</p>

      {/* Links */}
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={brand.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-100"
        >
          <Globe className="h-4 w-4" />
          Website
          <ExternalLink className="h-3 w-3" />
        </a>

        {brand.catalogue && (
          <a
            href={brand.catalogue}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-border bg-white px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-surface hover:text-neutral-charcoal"
          >
            <FileText className="h-4 w-4" />
            Catalogue
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-600 transition-all duration-300 group-hover:w-full" />
    </div>
  );
}

export default async function TradingCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getTradingCategory(slug);

  if (!category) {
    notFound();
  }

  const featuredBrands = category.brands.filter((b) => b.featured);
  const otherBrands = category.brands.filter((b) => !b.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-neutral-charcoal py-20 lg:py-28">
        {/* Background Pattern */}
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
            <span className="text-white">{category.name}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              Trading Division
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {category.title}
            </h1>
            <p className="mt-6 text-xl text-brand-100">{category.description}</p>
          </div>
        </Container>
      </section>

      {/* Overview Section */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold text-neutral-charcoal sm:text-3xl">
                Category Overview
              </h2>
              <div className="mt-6 space-y-4 text-neutral-600 leading-relaxed">
                {category.overview.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Stats / Quick Info */}
            <div className="lg:pl-8">
              <div className="rounded-2xl border border-neutral-border bg-neutral-surface p-8">
                <h3 className="text-lg font-semibold text-neutral-charcoal">
                  Quick Facts
                </h3>
                <dl className="mt-6 space-y-4">
                  <div className="flex justify-between border-b border-neutral-border pb-4">
                    <dt className="text-neutral-600">Partner Brands</dt>
                    <dd className="font-semibold text-neutral-charcoal">
                      {category.brands.length}
                    </dd>
                  </div>
                  <div className="flex justify-between border-b border-neutral-border pb-4">
                    <dt className="text-neutral-600">Featured Partners</dt>
                    <dd className="font-semibold text-neutral-charcoal">
                      {featuredBrands.length}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-600">Global Coverage</dt>
                    <dd className="font-semibold text-neutral-charcoal">
                      {new Set(category.brands.map((b) => b.country)).size} Countries
                    </dd>
                  </div>
                </dl>

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="btn-primary w-full justify-center"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Brands Section */}
      {featuredBrands.length > 0 && (
        <section className="bg-neutral-off-white py-16 lg:py-20">
          <Container>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-neutral-charcoal sm:text-3xl">
                Featured Partners
              </h2>
              <p className="mt-2 text-neutral-600">
                Our primary partners for {category.name.toLowerCase()} solutions
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {featuredBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* All Brands Section */}
      {otherBrands.length > 0 && (
        <section className="py-16 lg:py-20">
          <Container>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-neutral-charcoal sm:text-3xl">
                All Partner Brands
              </h2>
              <p className="mt-2 text-neutral-600">
                Complete range of {category.name.toLowerCase()} suppliers
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-brand-600 py-16">
        <Container>
          <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Need {category.name} for Your Project?
              </h2>
              <p className="mt-2 text-brand-100">
                Contact our team for product specifications, samples, and competitive pricing.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-brand-600 transition-colors hover:bg-brand-50"
              >
                Get in Touch
              </Link>
              <Link
                href="/trading"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                View All Categories
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
