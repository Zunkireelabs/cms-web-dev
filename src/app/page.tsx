import Link from 'next/link';
import { Container } from '@/components/ui/Container';
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
      {/* Hero Section */}
      <Hero />

      {/* CMS Highlights Section */}
      <Highlights />

      {/* About Us Section */}
      <AboutUs />

      {/* Chairman's Message Section */}
      <ChairmanMessage />

      {/* Products & Services Section */}
      <ProductsServices />

      {/* Our Ventures Section */}
      <Ventures />

      {/* Impact Metrics Section */}
      <ImpactMetrics />

      {/* Project Overview Section */}
      <section className="py-16 lg:py-20 bg-white border-t-[3px] border-accent">
        <Container>
          {/* Header */}
          <div className="mb-8 lg:mb-10">
            <div className="h-[3px] w-12 bg-accent mb-5" />
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-neutral-900 tracking-tight">
              Project Overview
            </h2>
            <p className="mt-2 text-neutral-500 text-base">
              200+ projects delivered across Nepal — spanning hospitals, hotels, airports, offices, education, and residential sectors
            </p>
          </div>

          <ProjectMap />

          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 bg-accent text-white font-semibold transition-colors hover:bg-accent-700 text-sm uppercase tracking-wider"
            >
              View All Projects
            </Link>
          </div>
        </Container>
      </section>

      {/* Careers CTA Section */}
      <CareersCTA />

      {/* Contact CTA Section */}
      <ContactCTA />
    </>
  );
}
