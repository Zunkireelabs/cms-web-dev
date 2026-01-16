import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { getProductDomain, getAllProductSlugs, type Brand } from '@/data/products';
import { ArrowLeft, ExternalLink, Download } from 'lucide-react';

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: { slug: string };
}

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image Side */}
        <div className="relative h-64 md:h-auto bg-gradient-to-br from-brand-100 to-brand-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-brand-300">{brand.name}</span>
          </div>
        </div>

        {/* Content Side */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">
            {brand.name}
          </h2>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            {brand.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-700 text-white font-semibold rounded-lg hover:bg-brand-800 transition-colors"
              >
                <span>LEARN MORE</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {brand.catalogueUrl && (
              <a
                href={brand.catalogueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-brand-700 text-brand-700 font-semibold rounded-lg hover:bg-brand-50 transition-colors"
              >
                <span>View Catalogue</span>
                <Download className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDomainPage({ params }: PageProps) {
  const domain = getProductDomain(params.slug);

  if (!domain) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-charcoal via-neutral-800 to-brand-900 py-16 lg:py-24">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <Container className="relative">
          {/* Back Link */}
          <Link
            href="/products-services/trading"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Trading</span>
          </Link>

          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {domain.title}
            </h1>
            <p className="mt-6 text-xl text-neutral-300 leading-relaxed">
              {domain.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Brands Section */}
      <section className="py-16 lg:py-24 bg-neutral-off-white">
        <Container>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-charcoal">
              Our Brand Partners
            </h2>
            <p className="mt-2 text-neutral-600">
              We work with world-leading brands to deliver exceptional quality
            </p>
          </div>

          <div className="space-y-8">
            {domain.brands.map((brand, index) => (
              <BrandCard key={index} brand={brand} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-t border-neutral-200">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-charcoal">
              Need More Information?
            </h2>
            <p className="mt-4 text-neutral-600">
              Our team is ready to help you find the right {domain.title.toLowerCase()} solution for your project.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
              >
                Request a Quote
              </Link>
              <Link
                href="/products-services/trading"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Explore Other Products
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
