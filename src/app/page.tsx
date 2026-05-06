import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui';
import {
  AboutUs,
  CareersCTA,
  ChairmanMessage,
  ContactCTA,
  Hero,
  Highlights,
  ImpactMetrics,
  ProductsServices,
  ProjectMap,
  Ventures,
} from '@/components/sections';

export default function HomePage() {
  return (
    <>
      {/* Hero — untouched */}
      <Hero />

      {/* Identity: who we are */}
      <AboutUs />

      {/* Proof: anchor stats */}
      <ImpactMetrics />

      {/* Structure: six ventures */}
      <Ventures />

      {/* Offerings: 12 product domains */}
      <ProductsServices />

      {/* Voice: chairman's message */}
      <ChairmanMessage />

      {/* Execution: project overview + Nepal map (map locked) */}
      <Section variant="light" id="projects-overview">
        <SectionHeader
          kicker="Project Overview"
          title="500+ Projects Delivered Across Nepal"
          lead="Hospitals, hotels, airports, offices, education, and residential — six sectors, one trusted partner. Hover or tap a marker to view the project list."
        />

        <div className="mt-12">
          <ProjectMap />
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

      {/* Recent activity */}
      <Highlights />

      {/* Engage */}
      <CareersCTA />
      <ContactCTA />
    </>
  );
}
