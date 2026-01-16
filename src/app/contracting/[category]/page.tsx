import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import {
  getContractingCategory,
  getAllContractingSlugs,
  type Project,
  type Capability,
} from '@/data/contracting';
import { ChevronRight, CheckCircle, MapPin, Calendar, Building2 } from 'lucide-react';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllContractingSlugs();
  return slugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getContractingCategory(slug);

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

function CapabilityCard({ capability, index }: { capability: Capability; index: number }) {
  return (
    <div className="group flex gap-4 rounded-xl border border-neutral-border bg-white p-6 transition-all hover:border-brand-200 hover:shadow-card">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <CheckCircle className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-semibold text-neutral-charcoal">{capability.title}</h3>
        <p className="mt-1 text-sm text-neutral-600">{capability.description}</p>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-border bg-white shadow-card transition-all duration-300 hover:shadow-card-hover">
      {/* Project Header */}
      <div className="border-b border-neutral-border bg-neutral-surface/50 px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-neutral-charcoal group-hover:text-brand-600 transition-colors">
              {project.name}
            </h3>
            <p className="mt-1 text-sm text-neutral-600">{project.client}</p>
          </div>
          <span className="shrink-0 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            {project.year}
          </span>
        </div>
      </div>

      {/* Project Body */}
      <div className="p-6">
        <p className="text-neutral-600">{project.description}</p>

        <div className="mt-4 flex items-center gap-2 text-sm text-neutral-400">
          <MapPin className="h-4 w-4" />
          <span>{project.location}</span>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-600 transition-all duration-300 group-hover:w-full" />
    </div>
  );
}

export default async function ContractingCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getContractingCategory(slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-charcoal via-neutral-800 to-brand-900 py-20 lg:py-28">
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
          <nav className="mb-8 flex items-center gap-2 text-sm text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/contracting" className="hover:text-white transition-colors">
              Contracting
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{category.name}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              Contracting Division
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {category.title}
            </h1>
            <p className="mt-6 text-xl text-neutral-300">{category.description}</p>

            {/* Certifications */}
            {category.certifications && category.certifications.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {category.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white/80"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Overview Section */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-neutral-charcoal sm:text-3xl">
                Service Overview
              </h2>
              <div className="mt-6 space-y-4 text-neutral-600 leading-relaxed">
                {category.overview.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Stats Sidebar */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-neutral-border bg-neutral-surface p-8">
                <h3 className="text-lg font-semibold text-neutral-charcoal">
                  At a Glance
                </h3>
                <dl className="mt-6 space-y-4">
                  <div className="flex justify-between border-b border-neutral-border pb-4">
                    <dt className="text-neutral-600">Core Capabilities</dt>
                    <dd className="font-semibold text-neutral-charcoal">
                      {category.capabilities.length}
                    </dd>
                  </div>
                  <div className="flex justify-between border-b border-neutral-border pb-4">
                    <dt className="text-neutral-600">Featured Projects</dt>
                    <dd className="font-semibold text-neutral-charcoal">
                      {category.projects.length}
                    </dd>
                  </div>
                  {category.certifications && (
                    <div className="flex justify-between">
                      <dt className="text-neutral-600">Certifications</dt>
                      <dd className="font-semibold text-neutral-charcoal">
                        {category.certifications.length}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="btn-primary w-full justify-center"
                  >
                    Request Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Capabilities Section */}
      <section className="bg-neutral-off-white py-16 lg:py-20">
        <Container>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-charcoal sm:text-3xl">
              Our Capabilities
            </h2>
            <p className="mt-2 text-neutral-600">
              Comprehensive {category.name.toLowerCase()} expertise
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.capabilities.map((capability, index) => (
              <CapabilityCard key={index} capability={capability} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Projects Section */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-charcoal sm:text-3xl">
                Featured Projects
              </h2>
              <p className="mt-2 text-neutral-600">
                Recent {category.name.toLowerCase()} projects delivered
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden items-center gap-2 font-semibold text-brand-600 hover:text-brand-700 sm:flex"
            >
              View All Projects
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-semibold text-brand-600"
            >
              View All Projects
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-charcoal py-16">
        <Container>
          <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to Discuss Your Project?
              </h2>
              <p className="mt-2 text-neutral-400">
                Our {category.name.toLowerCase()} team is ready to help bring your vision to life.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Start a Conversation
              </Link>
              <Link
                href="/contracting"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                All Services
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
