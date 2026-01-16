import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getAllContractingCategories } from '@/data/contracting';
import { ArrowRight, Building2, Wrench, PaintBucket, Settings, HardHat } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contracting Division',
  description:
    'Professional contracting services including general contracting, MEP, interior fit-out, facility management, and civil works.',
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'general-contracting': <Building2 className="h-8 w-8" />,
  'mep-services': <Wrench className="h-8 w-8" />,
  'interior-fit-out': <PaintBucket className="h-8 w-8" />,
  'facility-management': <Settings className="h-8 w-8" />,
  'civil-works': <HardHat className="h-8 w-8" />,
};

export default function ContractingPage() {
  const categories = getAllContractingCategories();

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
              Construction Excellence
            </h1>
            <p className="mt-6 text-xl text-neutral-300">
              From concept to completion, we deliver projects that exceed expectations.
              Our experienced teams bring expertise, innovation, and dedication to every build.
            </p>
          </div>
        </Container>
      </section>

      {/* Categories Grid */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="space-y-6">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/contracting/${category.slug}`}
                className="group block overflow-hidden rounded-2xl border border-neutral-border bg-white shadow-card transition-all duration-300 hover:shadow-card-hover"
              >
                <div className="grid lg:grid-cols-12">
                  {/* Left Section */}
                  <div className="flex flex-col justify-center p-8 lg:col-span-7 lg:p-12">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                        {CATEGORY_ICONS[category.slug] || <Building2 className="h-8 w-8" />}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-neutral-charcoal transition-colors group-hover:text-brand-600 sm:text-3xl">
                          {category.name}
                        </h2>
                        <p className="mt-2 text-neutral-600">{category.description}</p>
                      </div>
                    </div>

                    {/* Capabilities Preview */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {category.capabilities.slice(0, 4).map((cap, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-neutral-surface px-3 py-1 text-sm text-neutral-600"
                        >
                          {cap.title}
                        </span>
                      ))}
                      {category.capabilities.length > 4 && (
                        <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-600">
                          +{category.capabilities.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Link */}
                    <div className="mt-6 flex items-center gap-2 font-semibold text-brand-600">
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Right Section - Stats */}
                  <div className="border-t border-neutral-border bg-neutral-surface/50 p-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:p-12">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-3xl font-bold text-neutral-charcoal">
                          {category.projects.length}
                        </div>
                        <div className="mt-1 text-sm text-neutral-600">
                          Featured Projects
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-neutral-charcoal">
                          {category.capabilities.length}
                        </div>
                        <div className="mt-1 text-sm text-neutral-600">
                          Core Capabilities
                        </div>
                      </div>
                      {category.certifications && (
                        <div className="col-span-2">
                          <div className="text-sm text-neutral-400">Certifications</div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {category.certifications.slice(0, 2).map((cert) => (
                              <span
                                key={cert}
                                className="rounded bg-white px-2 py-1 text-xs font-medium text-neutral-600"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="h-1 w-0 bg-brand-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-600 py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Have a Project in Mind?
            </h2>
            <p className="mt-4 text-brand-100">
              Our team is ready to discuss your requirements and provide tailored solutions.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-brand-600 transition-colors hover:bg-brand-50"
              >
                Request Consultation
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
