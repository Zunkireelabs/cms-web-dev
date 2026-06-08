import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/ui/ContentCard';
import { ContactCTA } from '@/components/sections';
import { PROJECTS } from '@/data/projects';
import { SECTORS } from '@/data/sectors';
import { ArrowRight, Hammer, HardHat, Leaf } from 'lucide-react';

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
      <PageHero
        kicker="Contracting Division"
        title="Interior contracting, end to end."
        subtitle="Through Cubic Meter Pvt. Ltd. — our dedicated interior contracting venture — we translate client visions into tangible spaces. Material supply, installation, and on-site execution under one accountable partner."
        image="/images/projects/dusit-thani.jpg"
        imageAlt="Cubic Meter contracting projects"
        primaryCta={{ label: 'View Services', href: '#services' }}
        secondaryCta={{ label: 'Trading Division', href: '/trading' }}
        size="tall"
      />

      {/* What We Do */}
      <Section variant="light" id="services">
        <SectionHeader
          kicker="What We Do"
          title="Contracting services, scaled to fit."
          lead="From a single bathroom retrofit to a 1,50,000 sq.ft office fit-out — same standard of execution, same accountability, same end-to-end ownership."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-neutral-border bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent">
                <service.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold leading-tight tracking-tight text-neutral-charcoal">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Sectors */}
      <Section variant="soft" id="sectors">
        <SectionHeader
          kicker="Sectors"
          title="Six sectors we serve."
          lead="Each sector has distinct technical requirements — covered by tailored contracting playbooks, dedicated project teams, and matched material specifications."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((sector) => (
            <Link
              key={sector.slug}
              href={`/services#${sector.slug}`}
              className="group flex items-start gap-4 rounded-xl border border-neutral-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent">
                <sector.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold leading-tight text-neutral-charcoal transition-colors group-hover:text-accent">
                  {sector.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                  {sector.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Featured Projects */}
      <Section variant="light">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            kicker="Track Record"
            title="Featured contracting projects."
            lead="A selection of recent work across hospitals, hotels, banks, and airports in Nepal — delivered through Cubic Meter and partner ventures."
          />
          <Link
            href="/projects"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-neutral-charcoal transition-colors hover:border-accent/40 hover:bg-accent-50 hover:text-accent"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project) => (
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
      </Section>

      <ContactCTA />
    </>
  );
}
