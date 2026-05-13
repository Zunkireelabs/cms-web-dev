'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContactCTA } from '@/components/sections';
import { fadeUp, stagger } from '@/lib/motion';
import { Quote, Star, Building2 } from 'lucide-react';

interface Testimonial {
  name: string;
  designation: string;
  company: string;
  quote: string;
  domain: string;
  rating: number;
}

const DOMAINS = [
  'All',
  'Roofing Systems',
  'Ceiling Systems',
  'Aluminium Doors & Windows',
  'Flooring',
  'Waterproofing',
  'Sanitaryware',
  'Door Hardware',
  'Facade Solutions',
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ramesh Adhikari',
    designation: 'Project Manager',
    company: 'Mediciti Hospital',
    domain: 'Ceiling Systems',
    rating: 5,
    quote:
      'The Armstrong ceiling systems supplied by CMS were installed across 1,50,000 sq.ft of our hospital. The quality and finish exceeded our expectations — the team was professional and delivered on time.',
  },
  {
    name: 'Sushil Bajracharya',
    designation: 'Chief Engineer',
    company: 'Nepal Rastra Bank',
    domain: 'Flooring',
    rating: 5,
    quote:
      'CMS delivered premium parquet flooring for our main office complex. The product quality was outstanding and the installation team handled the project with great precision and minimal disruption.',
  },
  {
    name: 'Anita Gurung',
    designation: 'Procurement Head',
    company: 'Dusit Thani Hotel',
    domain: 'Sanitaryware',
    rating: 5,
    quote:
      'We specified Grohe and American Standard fixtures throughout the hotel. CMS provided expert guidance on product selection and ensured smooth supply and after-sales support throughout the project.',
  },
  {
    name: 'Bikash Thapa',
    designation: 'Site Engineer',
    company: 'Ncell Head Office',
    domain: 'Door Hardware',
    rating: 5,
    quote:
      'Dormakaba movable walls and hardware were installed across the entire office. The flexibility and acoustic performance are excellent. CMS coordinated perfectly from supply to final installation.',
  },
  {
    name: 'Deepak Shrestha',
    designation: 'Director',
    company: 'KCL Colony',
    domain: 'Roofing Systems',
    rating: 5,
    quote:
      'IKO asphalt roofing shingles were used across our residential colony. The product has performed exceptionally well through multiple monsoon seasons. We would confidently recommend CMS for any roofing project.',
  },
  {
    name: 'Manish Lal Shrestha',
    designation: 'Construction Manager',
    company: 'Tiger Palace Resort',
    domain: 'Facade Solutions',
    rating: 5,
    quote:
      'Hunter Douglas facade systems transformed the exterior of our resort. CMS provided excellent technical support and the installation was completed ahead of schedule. The result is visually stunning.',
  },
  {
    name: 'Pradeep Koirala',
    designation: 'Technical Director',
    company: 'Bir Hospital',
    domain: 'Waterproofing',
    rating: 5,
    quote:
      'Schomburg waterproofing systems were applied across critical areas of the hospital. The chemical quality and application guidance from CMS ensured a leak-free structure that has held up over years.',
  },
  {
    name: 'Sanjay Agarwal',
    designation: 'Project Director',
    company: 'Green Hill City',
    domain: 'Aluminium Doors & Windows',
    rating: 5,
    quote:
      'Tostem aluminium windows and doors were installed across all units of our residential project. The precision engineering, thermal performance, and clean aesthetic finish added tremendous value to the development.',
  },
  {
    name: 'Laxmi Prasad Gautam',
    designation: 'General Manager',
    company: 'Fewa Prince Residency',
    domain: 'Flooring',
    rating: 5,
    quote:
      'AGT engineered wood flooring was used throughout our hotel rooms and corridors. CMS guided us through product selection and the end result is exactly the premium feel we wanted for our guests.',
  },
];

export default function TestimonialsPage() {
  const [activeDomain, setActiveDomain] = useState('All');

  const filtered =
    activeDomain === 'All'
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.domain === activeDomain);

  return (
    <>
      <PageHero
        kicker="Testimonials"
        title="What our clients say."
        subtitle="Trusted by hospitals, hotels, banks, airports, and residences across Nepal — here is what our clients have to say about working with CMS Trading & Contracting."
        image="/images/projects/ncell-hq.jpg"
        imageAlt="CMS Group projects"
        size="compact"
      />

      <Section variant="light">
        <SectionHeader
          kicker="Client Feedback"
          title="Testimonials across domains."
          lead="Real feedback from clients across every sector we serve — roofing, ceilings, flooring, hardware, facades, and more."
          align="center"
          className="mx-auto"
        />

        {/* Domain filter */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {DOMAINS.map((domain) => (
            <button
              key={domain}
              onClick={() => setActiveDomain(domain)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                activeDomain === domain
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:border-accent hover:text-accent'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Testimonial cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDomain}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={fadeUp}
                custom={index * 0.06}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-card"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-accent text-accent"
                      strokeWidth={0}
                    />
                  ))}
                </div>

                {/* Quote */}
                <Quote className="mt-4 h-6 w-6 text-accent/20" strokeWidth={1.5} />
                <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent">
                    <Building2 className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-neutral-charcoal">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {testimonial.designation}, {testimonial.company}
                    </p>
                    <span className="mt-1 inline-block rounded-full bg-accent-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                      {testimonial.domain}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Section>

      <ContactCTA />
    </>
  );
}
