'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatBlock } from '@/components/ui/StatBlock';
import { KickerLabel } from '@/components/ui/KickerLabel';
import { ContactCTA, Testimonials } from '@/components/sections';
import { CERTIFICATIONS, CERTIFICATIONS_COUNT } from '@/data/certifications';
import { CHAIRMAN, DIRECTORS } from '@/data/leadership';
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
  ChevronDown,
} from 'lucide-react';

const FOUNDED_YEAR = 2002;
const YEARS_IN_BUSINESS = new Date().getFullYear() - FOUNDED_YEAR;

const COMPANY_STATS = [
  { label: 'Years of Experience', value: `${YEARS_IN_BUSINESS}+` },
  { label: 'Projects Delivered', value: '500+' },
  { label: 'Global Brand Partners', value: '50+' },
  { label: 'Sectors Served', value: '6' },
];

const STORY_META = [
  { label: 'Founded', value: '2002' },
  { label: 'Head Office', value: 'Kathmandu' },
  { label: 'Ventures', value: '6' },
  { label: 'Sectors', value: 'Hospital · Education · Airport · Office · Hotel · Residence' },
];

const MISSION_POINTS = [
  'Provide competitive excellence through high-quality construction products and services across every venture.',
  'Deliver on time and at competitive prices for clients at every level — from individual residences to nation-scale infrastructure.',
  'Cultivate long-term partnerships with clients, suppliers, and stakeholders through reliability and integrated solutions.',
];

const VISION_POINTS = [
  "Be Nepal's leading one-stop solution provider for all building & construction materials.",
  'Deliver best-in-class materials and comprehensive integrated solutions, going beyond customer expectations.',
  'Earn long-term client trust as a partner in building, not just a supplier.',
];

const CORE_VALUES = [
  {
    icon: Shield,
    title: 'Integrity',
    description:
      'Honesty, integrity, and moral behaviour are the cornerstone of our commercial operations — incorporated into every facet of how the organisation operates.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      'Competitive excellence through high-quality products and services, maintaining worldwide quality standards across every venture in the group.',
  },
  {
    icon: Users,
    title: 'Customer Satisfaction',
    description:
      'Customer satisfaction is our top priority — we exceed expectations, cultivate long-term partnerships, and constantly improve services for clients at every level.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description:
      'We foster growth through creativity and innovation, continuously seeking new ideas, technologies, and techniques that drive progress and add client value.',
  },
  {
    icon: Handshake,
    title: 'Trust & Partnership',
    description:
      'Strong, long-lasting partnerships are the keystone of our business. We earn trust by keeping commitments and exceeding expectations.',
  },
  {
    icon: CheckCircle,
    title: 'Sustainability',
    description:
      'We actively engage in sourcing materials from sustainable and eco-friendly sources, aligning operations with responsible practices and contributing to a greener future.',
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

const CERTS_PREVIEW_COUNT = 6;

export default function AboutPage() {
  const [showAllCerts, setShowAllCerts] = useState(false);
  const visibleCerts = showAllCerts
    ? CERTIFICATIONS
    : CERTIFICATIONS.slice(0, CERTS_PREVIEW_COUNT);
  const hiddenCertsCount = CERTIFICATIONS.length - CERTS_PREVIEW_COUNT;

  const chairmanBioParas = CHAIRMAN.bio.split('\n\n');

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

      {/* Stats anchor — now with kicker context */}
      <Section variant="soft" compact>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <KickerLabel>By the numbers</KickerLabel>
          </div>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Twenty-three years of compounding scale — across ventures, partners, projects,
            and sectors served.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-12">
          {COMPANY_STATS.map((stat) => (
            <div key={stat.label} className="border-l border-accent/40 pl-5 lg:pl-6">
              <StatBlock value={stat.value} label={stat.label} size="md" />
            </div>
          ))}
        </div>
      </Section>

      {/* Story — meta-grid pattern */}
      <Section variant="light">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
          >
            <KickerLabel>Our Story</KickerLabel>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-neutral-charcoal sm:text-4xl lg:text-5xl">
              Two decades of building trust in Nepal.
            </h2>

            <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
              CMS Group is a leading provider of construction materials and building services
              in Nepal. Since 2002, we have built a reputation for reliability,
              professionalism, and customer satisfaction across the construction sector.
            </p>

            {/* Meta grid — breaks the wall of text */}
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
              {STORY_META.map((item) => (
                <div key={item.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {item.label}
                  </dt>
                  <dd className="mt-1 font-display text-xl font-bold leading-tight text-neutral-charcoal">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Today, the group spans six associated ventures — Bath N Room, Baba Muktinath
              Fabricators, 4R Technologies, Cubic Meter, Techwood, and Prime Ceramics —
              serving hospitals, education, airports, offices, hotels, and residential
              projects across the country.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0.1}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/projects/nrb-thapathali.jpg"
              alt="Nepal Rastra Bank — Thapathali — flagship CMS Group project"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-charcoal/85 via-neutral-charcoal/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Featured Project
              </p>
              <p className="mt-2 font-display text-xl font-bold text-white lg:text-2xl">
                Nepal Rastra Bank — Thapathali
              </p>
              <p className="mt-1 text-sm text-white/70">
                1.5 lakh sq.ft BKB parquet flooring, Armstrong ceiling, Dormakaba hardware
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Mission & Vision — symmetric (both 3 bullets) */}
      <Section variant="soft">
        <SectionHeader
          kicker="Direction"
          title="Mission & Vision"
          lead="Where we are today, and where we are going."
          align="center"
          className="mx-auto"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-14 grid gap-6 lg:grid-cols-2"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="rounded-2xl border border-neutral-200 bg-white p-8 lg:p-10"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-white">
              <Target className="h-7 w-7" strokeWidth={1.75} />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold leading-tight text-neutral-charcoal">
              Our Mission
            </h3>
            <ul className="mt-5 space-y-4 text-neutral-600 leading-relaxed">
              {MISSION_POINTS.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{point}</span>
                </li>
              ))}
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
            <h3 className="mt-6 font-display text-2xl font-bold leading-tight text-neutral-charcoal">
              Our Vision
            </h3>
            <ul className="mt-5 space-y-4 text-neutral-600 leading-relaxed">
              {VISION_POINTS.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Section>

      {/* Core Values — editorial 01-06 numerals */}
      <Section variant="light">
        <SectionHeader
          kicker="What Drives Us"
          title="Our core values."
          lead="The principles that guide everything we do — from material sourcing to client handover."
          align="center"
          className="mx-auto"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CORE_VALUES.map((value, index) => (
            <motion.div
              key={value.title}
              variants={fadeUp}
              custom={index * 0.04}
              className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-3xl font-bold leading-none text-accent/30 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-50 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <value.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
              </div>
              <h3 className="mt-6 font-display text-lg font-bold leading-tight text-neutral-charcoal">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {value.description}
              </p>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Milestones — DARK reset, with year-watermarks on empty side */}
      <Section variant="dark">
        <SectionHeader
          kicker="Our Journey"
          title="Key milestones."
          lead="From a single Italian marble trading firm in 2002 to six specialised ventures today."
          align="center"
          inverted
          className="mx-auto"
        />

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-accent/30 lg:left-1/2 lg:-translate-x-px" />

          <div className="space-y-12 lg:space-y-16">
            {MILESTONES.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={milestone.year}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={fadeUp}
                  custom={index * 0.04}
                  className={`relative flex items-center gap-8 lg:gap-0 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Card */}
                  <div className={`flex-1 ${isLeft ? 'lg:pr-14 lg:text-right' : 'lg:pl-14'}`}>
                    <div
                      className={`rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:max-w-md ${
                        isLeft ? 'lg:ml-auto' : 'lg:mr-auto'
                      }`}
                    >
                      <span className="font-display text-3xl font-bold tracking-tight text-accent tabular-nums">
                        {milestone.year}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-bold leading-tight text-white">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-4 top-6 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-accent ring-4 ring-neutral-charcoal lg:left-1/2 lg:top-auto" />

                  {/* Year watermark on empty side (desktop only) */}
                  <div
                    className={`hidden flex-1 lg:flex ${
                      isLeft ? 'lg:pl-14' : 'lg:pr-14 lg:justify-end'
                    }`}
                  >
                    <span className="font-display text-7xl font-bold tracking-tight text-white/[0.04] tabular-nums lg:text-8xl">
                      {milestone.year}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Leadership — Chairman hero + 3-col directors */}
      <Section variant="light" id="leadership">
        <SectionHeader
          kicker="Leadership"
          title="The team steering CMS Group."
          lead="Chairman and six directors steering the group across trading, contracting, and manufacturing."
          align="center"
          className="mx-auto"
        />

        {/* Tier 1 — Chairman hero */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          custom={0}
          className="mt-16 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card"
        >
          <div className="grid lg:grid-cols-5">
            <div className="relative aspect-[4/5] lg:col-span-2 lg:aspect-auto">
              {CHAIRMAN.photo ? (
                <Image
                  src={CHAIRMAN.photo}
                  alt={CHAIRMAN.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-50 to-neutral-100">
                  <Users className="h-16 w-16 text-accent/40" strokeWidth={1.25} />
                </div>
              )}
              <span className="absolute top-5 left-5 inline-block rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                Chairman
              </span>
            </div>

            <div className="flex flex-col justify-center p-8 lg:col-span-3 lg:p-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                {CHAIRMAN.title} · {CHAIRMAN.company}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-neutral-charcoal sm:text-3xl lg:text-4xl">
                {CHAIRMAN.name}
              </h3>
              <p className="mt-6 leading-relaxed text-neutral-600">
                {chairmanBioParas[0]}
              </p>
              {chairmanBioParas[1] && (
                <p className="mt-4 leading-relaxed text-neutral-600">{chairmanBioParas[1]}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tier 2 — Directors grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {DIRECTORS.map((member, index) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              custom={index * 0.04}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-50 to-neutral-100">
                    <Users className="h-12 w-12 text-accent/40" strokeWidth={1.25} />
                  </div>
                )}
              </div>
              <h4 className="mt-5 font-display text-base font-bold text-neutral-charcoal">
                {member.name}
              </h4>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">
                {member.title} · {member.company}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-4">
                {member.summary ?? member.bio.split('.')[0] + '.'}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Associations — Show 6 + toggle */}
      <Section variant="soft" id="associations">
        <SectionHeader
          kicker="Our Associations"
          title={`Authorised distribution across ${CERTIFICATIONS_COUNT} global brands.`}
          lead="Every brand we represent is backed by a current dealership, channel-partner, or distributorship certificate — authentic products with full manufacturer warranty and after-sales support."
          align="center"
          className="mx-auto"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleCerts.map((cert, index) => (
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
              <h3 className="mt-4 font-display text-lg font-bold leading-tight text-neutral-charcoal">
                {cert.brand}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">
                {cert.type}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-3">
                {cert.scope}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-4">
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
        </motion.div>

        {!showAllCerts && hiddenCertsCount > 0 && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShowAllCerts(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-neutral-charcoal transition-colors hover:border-accent/40 hover:bg-accent-50 hover:text-accent"
            >
              Show all {CERTIFICATIONS_COUNT} certifications
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}

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

      <Testimonials />

      <ContactCTA />
    </>
  );
}
