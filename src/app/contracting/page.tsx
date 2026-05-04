import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ContactCTA } from '@/components/sections';
import { getAllBrandsWithDomain } from '@/data/products';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interior Contracting',
  description:
    'Interior contracting services powered by 13 world-leading brand partners across ceiling systems, roofing, facades, and more.',
};

export default function ContractingPage() {
  const brands = getAllBrandsWithDomain();

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
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              Contracting Division
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Interior Contracting
            </h1>
            <p className="mt-6 text-xl text-neutral-300 leading-relaxed">
              We deliver full-service interior contracting powered by{' '}
              <span className="font-semibold text-white">{brands.length} world-leading brand partners</span>.
              From ceiling systems to bathroom solutions, our contracting division
              brings together the best products for exceptional project execution.
            </p>
          </div>
        </Container>
      </section>

      {/* Brands Grid */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="mb-12 max-w-2xl">
            <h2 className="text-2xl font-bold text-neutral-charcoal sm:text-3xl">
              Our Brand Partners
            </h2>
            <p className="mt-4 text-neutral-600">
              Every contracting project is backed by premium products from our authorized
              brand partners, ensuring quality and reliability.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <div
                key={`${brand.domainSlug}-${brand.name}`}
                className="group relative overflow-hidden rounded-2xl border border-neutral-border bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover"
              >
                {/* Domain category label */}
                <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
                  {brand.domainTitle}
                </span>

                {/* Brand name */}
                <h3 className="mt-4 text-xl font-bold text-neutral-charcoal group-hover:text-brand-600 transition-colors">
                  {brand.name}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-3">
                  {brand.description}
                </p>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                  >
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/trading/${brand.domainSlug}`}
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    View Products
                  </Link>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-600 transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <ContactCTA />
    </>
  );
}
