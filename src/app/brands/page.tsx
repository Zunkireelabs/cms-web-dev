'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { ContactCTA } from '@/components/sections';
import {
  PaintBucket,
  Armchair,
  Grid3X3,
  Home,
  DoorOpen,
  Droplets,
  Trash2,
  LayoutGrid,
  Building,
  Fence,
  Bath,
  ExternalLink,
} from 'lucide-react';

const BRAND_CATEGORIES = [
  {
    category: 'Wood Coatings',
    icon: PaintBucket,
    brands: [
      {
        name: 'ICA Pidilite',
        description: 'Premium wood coatings and finishing solutions for furniture and interiors.',
        url: 'https://www.icapidilite.com/',
      },
    ],
  },
  {
    category: 'Office Furniture & Flooring',
    icon: Armchair,
    brands: [
      {
        name: 'SOS Office',
        description: 'Ergonomic office furniture solutions designed for modern workspaces.',
        url: 'https://www.sosoffice.in/products/',
      },
      {
        name: 'AGT',
        description: 'Premium wood-based panels and flooring products for interior design.',
        url: 'https://www.agtwood.com/',
      },
    ],
  },
  {
    category: 'Ceiling Systems',
    icon: Grid3X3,
    brands: [
      {
        name: 'Armstrong Ceiling',
        description: 'Industry-leading commercial ceiling systems and solutions.',
        url: 'https://www.armstrongceilings.com/commercial/en/',
      },
    ],
  },
  {
    category: 'Roofing',
    icon: Home,
    brands: [
      {
        name: 'IKO',
        description: 'Global leader in roofing, waterproofing, and insulation products.',
        url: 'https://www.iko.com/',
      },
    ],
  },
  {
    category: 'Door Hardware & Access Solutions',
    icon: DoorOpen,
    brands: [
      {
        name: 'Dormakaba',
        description: 'Smart and secure access solutions for buildings worldwide.',
        url: 'https://www.dormakabagroup.com/en',
      },
    ],
  },
  {
    category: 'Waterproofing Systems',
    icon: Droplets,
    brands: [
      {
        name: 'Schomburg',
        description: 'Professional waterproofing and building protection systems.',
        url: 'https://www.schomburg.com/de/en',
      },
    ],
  },
  {
    category: 'Wastewater Management',
    icon: Trash2,
    brands: [
      {
        name: 'Sintex',
        description: 'Innovative wastewater management and plastic solutions.',
        url: 'https://www.sintexonline.com/',
      },
    ],
  },
  {
    category: 'Aluminum Doors & Windows',
    icon: LayoutGrid,
    brands: [
      {
        name: 'Tostem',
        description: 'High-quality aluminum doors and windows for residential and commercial use.',
        url: 'https://www.tostem.com/en/',
      },
    ],
  },
  {
    category: 'Facade Solutions',
    icon: Building,
    brands: [
      {
        name: 'Hunter Douglas',
        description: 'Architectural products including facades, ceilings, and sun control systems.',
        url: 'https://www.hunterdouglas.com/',
      },
    ],
  },
  {
    category: 'Architectural Railings',
    icon: Fence,
    brands: [
      {
        name: 'Zolon',
        description: 'Premium architectural railing systems and hardware solutions.',
        url: 'https://zolonhardware.com/',
      },
    ],
  },
  {
    category: 'Sanitaryware & Bathroom Solutions',
    icon: Bath,
    brands: [
      {
        name: 'American Standard',
        description: 'Trusted bathroom and kitchen fixtures with innovative designs.',
        url: 'https://www.americanstandard-us.com/',
      },
      {
        name: 'Grohe',
        description: 'Leading global brand for premium bathroom fittings and kitchen taps.',
        url: 'https://www.grohe.com/en-GB',
      },
    ],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function BrandsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-charcoal via-neutral-800 to-brand-900 py-20 lg:py-32">
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
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
            >
              Our Partners
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Global Brand Partners
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="mt-6 text-xl text-neutral-300 leading-relaxed"
            >
              We partner with world-renowned brands to deliver premium quality products
              and solutions for your construction and interior needs.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Brands Grid */}
      <section className="py-20 lg:py-28">
        <Container>
          <AnimatedSection>
            <motion.div variants={fadeInUp} custom={0} className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
                Trusted Brands
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-charcoal sm:text-4xl">
                Quality Products from Industry Leaders
              </h2>
              <p className="mt-4 text-neutral-600">
                We are authorized distributors of leading international brands,
                ensuring you receive authentic products with full manufacturer support.
              </p>
            </motion.div>
          </AnimatedSection>

          <div className="mt-16 space-y-12">
            {BRAND_CATEGORIES.map((category, categoryIndex) => (
              <AnimatedSection key={category.category}>
                <motion.div
                  variants={fadeInUp}
                  custom={categoryIndex * 0.05}
                  className="rounded-2xl border border-neutral-border bg-white p-6 shadow-card lg:p-8"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 border-b border-neutral-100 pb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-charcoal">
                      {category.category}
                    </h3>
                  </div>

                  {/* Brands in Category */}
                  <div className={`mt-6 grid gap-6 ${category.brands.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                    {category.brands.map((brand) => (
                      <a
                        key={brand.name}
                        href={brand.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-5 transition-all hover:border-brand-300 hover:bg-brand-50 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-neutral-charcoal group-hover:text-brand-700 transition-colors">
                              {brand.name}
                            </h4>
                            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                              {brand.description}
                            </p>
                          </div>
                          <ExternalLink className="h-5 w-5 flex-shrink-0 text-neutral-400 group-hover:text-brand-600 transition-colors ml-4" />
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-600">
                          <span>Visit Website</span>
                          <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Partnership CTA */}
      <ContactCTA />
    </>
  );
}
