import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui';
import {
  AboutUs,
  ContactCTA,
  Hero,
  ImpactMetrics,
  ProductsServices,
  ProjectMap,
} from '@/components/sections';

export default function HomePage() {
  return (
    <>
      {/* 1. Identity — cinematic hero */}
      <Hero />

      {/* 2. Story — who we are */}
      <AboutUs />

      {/* 3. Proof — animated counters (dark reset) */}
      {/* <ImpactMetrics /> */}

      {/* 4. Substance — fourteen product domains */}
      <ProductsServices />

      {/* 6. Execution — project map */}
      <Section variant="soft" id="projects-overview">
        <SectionHeader
          kicker="Project Overview"
          title="Projects delivered across Nepal."
          lead="Hospitals, hotels, airports, offices, education, and residential — six sectors, one trusted partner. Hover or tap a marker to view the project list."
          align="center"
          className="mx-auto"
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

      {/* 8. Conversion — single combined CTA (careers folded in) */}
      <ContactCTA />
    </>
  );
}
