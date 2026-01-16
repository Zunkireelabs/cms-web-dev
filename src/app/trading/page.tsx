import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getAllTradingCategories } from '@/data/trading';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trading Division',
  description:
    'Explore our trading division - premium building materials from world-leading manufacturers including false ceilings, roofing, aluminum systems, flooring, and insulation.',
};

export default function TradingPage() {
  const categories = getAllTradingCategories();

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
            <p className="mt-6 text-xl text-brand-100">
              We partner with world-leading manufacturers to supply high-quality
              construction materials for projects of all scales.
            </p>
          </div>
        </Container>
      </section>

      {/* Categories Grid */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/trading/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-neutral-border bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative">
                  {/* Category number */}
                  <span className="text-5xl font-bold text-neutral-100 transition-colors group-hover:text-brand-100">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Category name */}
                  <h2 className="mt-4 text-2xl font-bold text-neutral-charcoal transition-colors group-hover:text-brand-700">
                    {category.name}
                  </h2>

                  {/* Description */}
                  <p className="mt-2 text-neutral-600">{category.description}</p>

                  {/* Brands count */}
                  <p className="mt-4 text-sm text-neutral-400">
                    {category.brands.length} Partner Brands
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
      <section className="bg-neutral-off-white py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-neutral-charcoal sm:text-3xl">
              Can&apos;t Find What You Need?
            </h2>
            <p className="mt-4 text-neutral-600">
              Our procurement team can source specialized materials from our global network of suppliers.
            </p>
            <Link href="/contact" className="btn-primary mt-8 inline-flex">
              Contact Our Team
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
