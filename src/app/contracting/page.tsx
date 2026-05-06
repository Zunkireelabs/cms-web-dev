import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ContactCTA } from '@/components/sections';
import { PROJECTS } from '@/data/projects';
import { SECTORS } from '@/data/sectors';
import {
  ArrowRight,
  Building2,
  Hammer,
  HardHat,
  Leaf,
  MapPin,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contracting Division',
  description:
    'Comprehensive interior contracting through Cubic Meter — full-service partner for hotels, hospitals, offices, airports, and residential projects across Nepal.',
};

const SERVICES = [
  {
    icon: Hammer,
    title: 'Interior Contracting & Fit-Out',
    description:
      'End-to-end interior fit-out for commercial, hospitality, and institutional projects — flooring, ceiling, partitions, doors, hardware, sanitaryware, and bespoke finishes.',
  },
  {
    icon: HardHat,
    title: 'Project Execution & Management',
    description:
      'Globally trained installers, structured project management, and stringent quality control. We deliver on time and to specification, from material procurement through commissioning.',
  },
  {
    icon: Leaf,
    title: 'Renovation & Sustainable Solutions',
    description:
      'Renovation contracting that brings ageing assets up to current codes, with eco-friendly material sourcing and energy-efficient systems aligned to green-building standards.',
  },
];

const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured).slice(0, 6);

export default function ContractingPage() {
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
              Interior Contracting, End to End
            </h1>
            <p className="mt-6 text-xl text-neutral-300 leading-relaxed">
              Through{' '}
              <span className="font-semibold text-white">Cubic Meter Pvt. Ltd.</span> — our
              dedicated interior contracting venture — we translate client visions into
              tangible spaces. Material supply, installation, and on-site execution under
              one accountable partner.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
              What We Do
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-charcoal sm:text-4xl">
              Our Contracting Services
            </h2>
            <p className="mt-4 text-neutral-600">
              From a single bathroom retrofit to a 1,50,000 sq.ft office fit-out — same
              standard of execution.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-neutral-border bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-neutral-charcoal">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Sectors We Serve */}
      <section className="bg-neutral-off-white py-20 lg:py-28">
        <Container>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
              Sectors
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-charcoal sm:text-4xl">
              Sectors We Serve
            </h2>
            <p className="mt-4 text-neutral-600">
              Six specialised sectors with distinct technical requirements — covered by
              tailored contracting playbooks.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map((sector) => (
              <Link
                key={sector.slug}
                href={`/services#${sector.slug}`}
                className="group flex items-start gap-4 rounded-xl border border-neutral-border bg-white p-6 transition-all hover:border-brand-300 hover:shadow-card"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <sector.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-charcoal group-hover:text-brand-700 transition-colors">
                    {sector.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
                    {sector.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
                Track Record
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-charcoal sm:text-4xl">
                Featured Contracting Projects
              </h2>
              <p className="mt-4 max-w-2xl text-neutral-600">
                A selection of recent work across hospitals, hotels, banks, and airports
                in Nepal.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl border border-neutral-border bg-white p-6 shadow-card transition-all hover:shadow-card-hover"
              >
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
                <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
                  <MapPin className="h-3 w-3 text-brand-600" strokeWidth={1.5} />
                  <span>{project.location}</span>
                </div>
                {project.area && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
                    <Building2 className="h-3 w-3 text-brand-600" strokeWidth={1.5} />
                    <span>{project.area}</span>
                  </div>
                )}
                <p className="mt-4 text-sm text-neutral-600 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
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
