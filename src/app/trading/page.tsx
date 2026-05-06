import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ContactCTA } from '@/components/sections';
import { PRODUCT_DOMAINS } from '@/data/products';
import { TOTAL_BRAND_COUNT } from '@/data/brands';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trading Division',
  description: `CMS Group Trading — premium building materials from ${TOTAL_BRAND_COUNT}+ global brand partners across ${PRODUCT_DOMAINS.length} specialized domains, distributed in Nepal through Bath N Room and Baba Muktinath Fabricators.`,
};

export default function TradingPage() {
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
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              Trading Division
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Premium Building Materials
            </h1>
            <p className="mt-6 text-xl text-brand-100 leading-relaxed">
              {TOTAL_BRAND_COUNT}+ global brand partners across {PRODUCT_DOMAINS.length} specialized
              domains, distributed in Nepal through our{' '}
              <Link href="/brands" className="font-semibold text-white underline-offset-4 hover:underline">
                Bath N Room
              </Link>{' '}
              and{' '}
              <Link href="/brands" className="font-semibold text-white underline-offset-4 hover:underline">
                Baba Muktinath
              </Link>{' '}
              ventures.
            </p>
          </div>
        </Container>
      </section>

      {/* Domains Grid */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_DOMAINS.map((domain, index) => (
              <Link
                key={domain.slug}
                href={`/trading/${domain.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-neutral-border bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative">
                  {/* Domain number */}
                  <span className="text-5xl font-bold text-neutral-100 transition-colors group-hover:text-brand-100">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Domain title */}
                  <h2 className="mt-4 text-2xl font-bold text-neutral-charcoal transition-colors group-hover:text-brand-700">
                    {domain.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-2 line-clamp-2 text-neutral-600">{domain.description}</p>

                  {/* Brands count */}
                  <p className="mt-4 text-sm text-neutral-400">
                    {domain.brands.length} {domain.brands.length === 1 ? 'Brand Partner' : 'Brand Partners'}
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-2 font-semibold text-brand-600">
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <ContactCTA />
    </>
  );
}
