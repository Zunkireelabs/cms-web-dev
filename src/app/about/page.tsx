'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatBlock } from '@/components/ui/StatBlock';
import { KickerLabel } from '@/components/ui/KickerLabel';
import { ContactCTA, Testimonials } from '@/components/sections';
import { CERTIFICATIONS, CERTIFICATIONS_COUNT } from '@/data/certifications';
import { LEADERSHIP } from '@/data/leadership';
import { fadeUp, stagger } from '@/lib/motion';
import {
  Target,
  Eye,
  Shield,
  Users,
  Award,
  Handshake,
  CheckCircle,
  TrendingUp,
  ScrollText,
  MapPin,
  Calendar,
} from 'lucide-react';

const FOUNDED_YEAR = 2002;
const YEARS_IN_BUSINESS = new Date().getFullYear() - FOUNDED_YEAR;

const COMPANY_STATS = [
  { label: 'Years of Experience', value: `${YEARS_IN_BUSINESS}+` },
  { label: 'Projects Delivered', value: '500+' },
  { label: 'Global Brand Partners', value: '50+' },
  { label: 'Sectors Served', value: '6' },
];

const CORE_VALUES = [
  {
    icon: Shield,
    title: 'Integrity',
    description:
      'Honesty, integrity, and moral behavior are the cornerstone of our commercial operations. These ideals are incorporated into every facet of how our organization operates.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      'We are committed to providing competitive excellence through high-quality products and services, maintaining worldwide quality standards across every venture in the group.',
  },
  {
    icon: Users,
    title: 'Customer Satisfaction',
    description:
      'Customer satisfaction is our top priority. We strive to exceed expectations, cultivate long-term partnerships, and constantly improve our services for clients at every level.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description:
      'We foster growth through creativity and innovation, continuously seeking new ideas, technologies, and techniques that drive progress and add value for our clients.',
  },
  {
    icon: Handshake,
    title: 'Trust & Partnership',
    description:
      'Building strong and long-lasting partnerships is key to our business. We win our clients’ trust by keeping our commitments and exceeding their expectations.',
  },
  {
    icon: CheckCircle,
    title: 'Sustainability',
    description:
      'We actively engage in sourcing materials from sustainable and eco-friendly sources, aligning our operations with responsible practices and contributing to a greener future.',
  },
];

const MILESTONES: { year: string; title: string; description: string }[] = [
  {
    year: '2002',
    title: 'Kantipur — CMS Group founded',
    description: 'Italian Marble & Granite trading firm — the founding venture.',
  },
  {
    year: '2003',
    title: 'Bath N Room Trade Concern Pvt. Ltd.',
    description: 'One-stop solution for building finishing products in the Nepalese market.',
  },
  {
    year: '2010',
    title: 'Baba Muktinath Fabricators Pvt. Ltd.',
    description: 'Leading dealer, distributor and fabricator for world-class building systems.',
  },
  {
    year: '2015',
    title: '4R Technologies Pvt. Ltd.',
    description: 'Associated with world-renowned brands to provide a wide range of green products.',
  },
  {
    year: '2018',
    title: 'Cubic Meter Pvt. Ltd.',
    description:
      'Interior finishing and contracting venture serving hotels, hospitals, and corporate offices.',
  },
  {
    year: '2019',
    title: 'Techwood Pvt. Ltd.',
    description: 'Quality modular furniture solutions for corporate offices and schools.',
  },
  {
    year: '2021',
    title: 'Prime Ceramics Pvt. Ltd.',
    description:
      'Ceramic tile manufacturing in Nepal — joint venture with Fortune Ventures Pvt. Ltd.',
  },
];

function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About CMS Group"
        title="Construction Material Solutions, since 2002."
        subtitle="Nepal's trusted partner for premium building materials, finishing systems, and integrated contracting — across six specialised ventures."
        image="/images/projects/bir-hospital.jpg"
        imageAlt="Bir Hospital — a flagship CMS Group project"
        size="tall"
      />

      {/* Stats anchor */}
      <Section variant="soft" compact>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-12">
          {COMPANY_STATS.map((stat) => (
            <div key={stat.label} className="border-l border-accent/40 pl-5 lg:pl-6">
              <StatBlock value={stat.value} label={stat.label} size="md" />
            </div>
          ))}
        </div>
      </Section>

      {/* Story */}
      <Section variant="light">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection>
            <motion.div variants={fadeUp} custom={0}>
              <KickerLabel>Our Story</KickerLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={0.08}
              className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-neutral-charcoal sm:text-4xl lg:text-5xl"
            >
              Two decades of building trust in Nepal.
            </motion.h2>
            <motion.div
              variants={fadeUp}
              custom={0.16}
              className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600 sm:text-lg"
            >
              <p>
                CMS Group is a leading provider of construction materials and building
                services in Nepal. Since 2002, we have built a solid reputation for
                reliability, professionalism, and customer satisfaction across the
                construction sector.
              </p>
              <p>
                Our core specialisation lies in trading and distributing premium building
                materials — strategic collaborations with worldwide manufacturers serving
                industrial clients, builders, architects, interior designers, engineers,
                and contractors.
              </p>
              <p>
                Today, the group spans six associated ventures — Bath N Room, Baba
                Muktinath Fabricators, 4R Technologies, Cubic Meter, Techwood, and Prime
                Ceramics — serving hospitals, education, airports, offices, hotels, and
                residential projects across the country.
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection>
            <motion.div
              variants={fadeUp}
              custom={0.1}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <Image
                src="/images/projects/nrb-thapathali.jpg"
                alt="Nepal Rastra Bank — CMS Group project"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-charcoal/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Featured Project
                </p>
                <p className="mt-2 font-display text-xl font-bold text-white lg:text-2xl">
                  Nepal Rastra Bank — Thapathali
                </p>
                <p className="mt-1 text-sm text-white/70">
                  1.5 lakh sq.ft BKB parquet flooring, Armstrong ceiling, Dormakaba
                  hardware
                </p>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section variant="soft">
        <SectionHeader
          kicker="Direction"
          title="Mission &amp; Vision"
          lead="Where we are today, and where we are going."
          align="center"
          className="mx-auto"
        />

        <AnimatedSection className="mt-14 grid gap-6 lg:grid-cols-2">
          <motion.div
            variants={fadeUp}
            custom={0}
            className="rounded-2xl border border-neutral-200 bg-white p-8 lg:p-10"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-white">
              <Target className="h-7 w-7" strokeWidth={1.75} />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-neutral-charcoal">
              Our Mission
            </h3>
            <ul className="mt-5 space-y-4 text-neutral-600 leading-relaxed">
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>
                  Provide competitive excellence through high-quality construction products
                  and services across every venture.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>
                  Deliver on time and at competitive prices for clients at every level —
                  from individual residences to nation-scale infrastructure.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>
                  Cultivate long-term partnerships with clients, suppliers, and
                  stakeholders through reliability and integrated solutions.
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.1}
            className="rounded-2xl border border-neutral-200 bg-white p-8 lg:p-10"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-white">
              <Eye className="h-7 w-7" strokeWidth={1.75} />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-neutral-charcoal">
              Our Vision
            </h3>
            <p className="mt-5 text-neutral-600 leading-relaxed">
              To be Nepal&apos;s leading one-stop solution provider for all building &amp;
              construction materials. By providing best-in-class materials and
              comprehensive solutions, we strive to go above and beyond customer
              expectations, earning their trust as a partner in building.
            </p>
          </motion.div>
        </AnimatedSection>
      </Section>

      {/* Core Values */}
      <Section variant="light">
        <SectionHeader
          kicker="What Drives Us"
          title="Our Core Values"
          lead="The principles that guide everything we do."
          align="center"
          className="mx-auto"
        />

        <AnimatedSection className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((value, index) => (
            <motion.div
              key={value.title}
              variants={fadeUp}
              custom={index * 0.04}
              className="group rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-50 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <value.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-neutral-charcoal">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </AnimatedSection>
      </Section>

      {/* Milestones */}
      <Section variant="dark">
        <SectionHeader
          kicker="Our Journey"
          title="Key Milestones"
          lead="From a single Italian marble trading firm in 2002 to six specialised ventures today."
          align="center"
          inverted
          className="mx-auto"
        />

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-accent/30 lg:left-1/2 lg:-translate-x-px" />

          <div className="space-y-10 lg:space-y-14">
            {MILESTONES.map((milestone, index) => (
              <AnimatedSection key={milestone.year}>
                <motion.div
                  variants={fadeUp}
                  custom={index * 0.06}
                  className={`relative flex items-start gap-8 lg:gap-0 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? 'lg:pr-14 lg:text-right' : 'lg:pl-14'
                    }`}
                  >
                    <div
                      className={`rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:max-w-md ${
                        index % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'
                      }`}
                    >
                      <div
                        className={`flex items-center gap-3 ${
                          index % 2 === 0 ? 'lg:justify-end' : ''
                        }`}
                      >
                        <span className="font-display text-3xl font-bold text-accent">
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-bold text-white">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-4 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-accent ring-4 ring-neutral-charcoal lg:left-1/2 lg:translate-y-3" />

                  <div className="hidden flex-1 lg:block" />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </Section>

      {/* Leadership Team */}
      <Section variant="light" id="leadership">
        <SectionHeader
          kicker="Leadership"
          title="The team steering CMS Group."
          lead="Chairman and six directors steering the group across trading, contracting, and manufacturing."
          align="center"
          className="mx-auto"
        />

        <AnimatedSection className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {LEADERSHIP.map((member, index) => {
            const isChairman = member.title === 'Chairman';
            const summary = member.summary ?? `${member.bio.split('.')[0]}.`;
            return (
              <motion.div
                key={member.name}
                variants={fadeUp}
                custom={index * 0.06}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-50 to-neutral-100">
                      <Users className="h-12 w-12 text-accent/40" strokeWidth={1.25} />
                    </div>
                  )}
                  {isChairman && (
                    <span className="absolute top-4 left-4 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Chairman
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-base font-bold text-neutral-charcoal">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  {member.title} · {member.company}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-4">
                  {summary}
                </p>
              </motion.div>
            );
          })}
        </AnimatedSection>
      </Section>

      {/* Associations / Certifications */}
      <Section variant="soft" id="associations">
        <SectionHeader
          kicker="Our Associations"
          title={`Authorised distribution across ${CERTIFICATIONS_COUNT} global brands.`}
          lead="Every brand we represent is backed by a current dealership, channel-partner, or distributorship certificate — authentic products with full manufacturer warranty and after-sales support."
          align="center"
          className="mx-auto"
        />

        <AnimatedSection className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={fadeUp}
              custom={index * 0.03}
              className="group relative rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent">
                  <ScrollText className="h-5 w-5" strokeWidth={1.5} />
                </div>
                {cert.country && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    <MapPin className="h-3 w-3" strokeWidth={1.5} />
                    {cert.country}
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-neutral-charcoal leading-tight">
                {cert.brand}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">
                {cert.type}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-3">
                {cert.scope}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t border-neutral-100">
                <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500">
                  <CheckCircle className="h-3 w-3 text-accent" strokeWidth={1.5} />
                  {cert.holder}
                </span>
                {(cert.validFrom || cert.validUntil || cert.issued) && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-neutral-400">
                    <Calendar className="h-3 w-3" strokeWidth={1.5} />
                    {cert.validUntil
                      ? `Valid till ${cert.validUntil}`
                      : cert.issued ?? cert.validFrom}
                  </span>
                )}
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </AnimatedSection>

        <div className="mt-12 text-center">
          <p className="text-sm text-neutral-500">
            Joint-Venture Manufacturing Partner with{' '}
            <span className="font-semibold text-neutral-700">
              Fortune Ventures Pvt. Ltd.
            </span>{' '}
            — Prime Ceramics tile manufacturing in Nepal.
          </p>
        </div>
      </Section>

      {/* Client Testimonials */}
      <Testimonials />

      {/* CTA */}
      <ContactCTA />
    </>
  );
}
