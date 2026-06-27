import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui';
import {
  AboutUs,
  ContactCTA,
  Hero,
  ProductsServices,
  ProjectMap,
} from '@/components/sections';
import { fetchProjects, fetchHeroSlides, fetchMapLocations } from '@/lib/cms';

export default async function HomePage() {
  const [projects, heroSlides, mapLocations] = await Promise.all([
    fetchProjects(),
    fetchHeroSlides(),
    fetchMapLocations(),
  ]);

  return (
    <>
      {/* 1. Identity — cinematic hero */}
      <Hero slides={heroSlides} />

      {/* 2. Story — who we are */}
      <AboutUs />

      {/* 4. Substance — fourteen product domains */}
      <ProductsServices />

      {/* 5. Impact metrics — hidden */}
      {/* <ImpactMetrics stats={siteConfig?.stats} /> */}

      {/* 6. Execution — project map */}
      <Section variant="soft" id="projects-overview">
        <SectionHeader
          kicker="Project Overview"
          title="Projects delivered across Nepal."
          lead="Health Care, Hospitality, Offices, Airports, Education and Residential"
          align="center"
          className="mx-auto"
        />

        <div className="mt-12">
          <ProjectMap projects={projects} mapLocations={mapLocations} />
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-700"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* 8. Conversion — single combined CTA (careers folded in) */}
      <ContactCTA />
    </>
  );
}
