'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { KickerLabel } from '@/components/ui/KickerLabel';
import { ContactCTA } from '@/components/sections';
import {
  CERTIFICATIONS,
  CERTIFICATIONS_COUNT,
  type Certification,
} from '@/data/certifications';
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
  Sparkles,
  Bath,
  Wrench,
  Recycle,
  Boxes,
  Armchair,
  Factory,
  Building2,
  Globe,
  Layers,
  Quote,
  type LucideIcon,
} from 'lucide-react';
type CertificationItem = Certification;

const FOUNDED_YEAR = 2002;
const YEARS_IN_BUSINESS = new Date().getFullYear() - FOUNDED_YEAR;

const COMPANY_STATS: { value: number; suffix: string; label: string; icon: LucideIcon }[] = [
  { value: YEARS_IN_BUSINESS, suffix: '+', label: 'Years of Experience', icon: Calendar },
  { value: 500, suffix: '+', label: 'Projects Delivered', icon: Building2 },
  { value: 50, suffix: '+', label: 'Global Brand Partners', icon: Globe },
  { value: 6, suffix: '', label: 'Sectors Served', icon: Layers },
];

const TRUST_PILLARS = [
  'Since 2002',
  '6 Ventures',
  '50+ Global Brands',
  '500+ Projects',
];

const STORY_META = [
  { label: 'Founded', value: '2002' },
  { label: 'Head Office', value: 'Kathmandu' },
  { label: 'Ventures', value: '6' },
];

const STORY_SECTORS = ['Hospital', 'Education', 'Airport', 'Office', 'Hotel', 'Residence'];

const MISSION_POINTS = [
  'To deliver end-to-end trading and contracting solutions by combining globally recognized products with precise project execution.',
  'To uphold the highest standards of quality, safety, and integrity in every stage of our operations.',
  'To build long-term partnerships with clients, suppliers, and stakeholders through reliability and performance.',
];

const VISION_POINTS = [
  'To be a trusted and preferred trading and contracting partner, recognized for delivering integrated building solutions with technical excellence, global brand partnerships, and sustainable value across every project we undertake.',
];

const CORE_VALUES = [
  {
    icon: Shield,
    title: 'Integrity',
    description:
      'Honesty, integrity, and moral behaviour are the cornerstone of our commercial operations — incorporated into every facet of how the organisation operates.',
    practice: 'Single source-of-truth pricing across all six ventures',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      'Competitive excellence through high-quality products and services, maintaining worldwide quality standards across every venture in the group.',
    practice: 'ISO-aligned quality control on every brand we distribute',
  },
  {
    icon: Users,
    title: 'Customer Satisfaction',
    description:
      'Customer satisfaction is our top priority — we exceed expectations, cultivate long-term partnerships, and constantly improve services for clients at every level.',
    practice: 'Dedicated account manager assigned to every active project',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description:
      'We foster growth through creativity and innovation, continuously seeking new ideas, technologies, and techniques that drive progress and add client value.',
    practice: 'Annual factory visits with international brand partners',
  },
  {
    icon: Handshake,
    title: 'Trust & Partnership',
    description:
      'Strong, long-lasting partnerships are the keystone of our business. We earn trust by keeping commitments and exceeding expectations.',
    practice: '55+ brand partnerships maintained over two decades',
  },
  {
    icon: CheckCircle,
    title: 'Sustainability',
    description:
      'We actively engage in sourcing materials from sustainable and eco-friendly sources, aligning operations with responsible practices and contributing to a greener future.',
    practice: 'Eco-friendly material sourcing across all six ventures',
  },
];

const MILESTONES: {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  brands: string[];
}[] = [
  {
    year: '2002',
    title: 'T&C Division Established',
    description:
      'CMS Group founded as a construction trade firm. Trading & Contracting Division commences operations in Nepal.',
    icon: Sparkles,
    brands: [],
  },
  {
    year: '2003',
    title: 'First Brand Collaborations',
    description:
      'Bath N Room Trade Concern established — first authorised partnerships with global sanitaryware and bathroom solution leaders.',
    icon: Bath,
    brands: ['American Standard', 'Grohe'],
  },
  {
    year: '2010',
    title: 'Major Brand Expansion',
    description:
      'Baba Muktinath Fabricators established — onboarding world-class roofing, ceiling, facade, hardware, and waterproofing brands.',
    icon: Wrench,
    brands: ['IKO', 'Kalzip', 'Armstrong', 'Hunter Douglas', 'Tostem', 'Dormakaba', 'ICA', 'Zolon', 'Navair', 'Schomburg'],
  },
  {
    year: '2015',
    title: 'Sustainability & Water Management',
    description:
      '4R Technologies established — expanding into ecologically friendly wastewater management and treatment solutions.',
    icon: Recycle,
    brands: ['Sintex'],
  },
  {
    year: '2019',
    title: 'Flooring & Furniture Portfolio',
    description:
      'Techwood established — adding premium flooring and modular office furniture brands to the T&C Division portfolio.',
    icon: Armchair,
    brands: ['AGT', 'Tarkett', 'Argil', 'KLK', 'Welspun', 'SOS'],
  },
];

const CHAIRMAN_QUOTE =
  'We endeavour to meet the different needs of our esteemed clientele by emphasising integration and complete solutions — setting new standards in the Nepalese market.';

const DIRECTOR_EXPERTISE: Record<string, string[]> = {
  'Mr. Prashant Agarwal': ['Group Strategy', 'Sustainability', 'Expansion'],
  'Ms. Rima Lamichhane': ['Client Relations', 'Service Quality', 'Partnerships'],
  'Mr. Sandeep Goenka': ['Product Strategy', 'Innovation', 'Sustainability'],
  'Mr. Sumit Agarwal': ['Technology', 'Construction Concepts', 'Global Partners'],
  'Mr. Sanjeev Goyal': ['Two-Decade Tenure', 'Materials & Services', 'Strategic Growth'],
  'Mr. Kumud Nepal': ['Product Curation', 'Hotels & Hospitals', 'One-Stop Solutions'],
  'Mr. Ram Dahal': ['Techwood Operations', 'Modular Furniture', 'Customer Trust'],
};

const CERTS_PREVIEW_COUNT = 6;

type CertGroupKey = 'distributor' | 'channel' | 'authorisation';

function getCertGroup(cert: CertificationItem): CertGroupKey {
  const t = cert.type.toLowerCase();
  if (t.includes('distribut')) return 'distributor';
  if (t.includes('channel') || t.includes('dealer')) return 'channel';
  return 'authorisation';
}

const CERT_GROUP_META: Record<CertGroupKey, { label: string; description: string }> = {
  distributor: {
    label: 'Distributorships',
    description: 'Authorised distributors with exclusive territory rights.',
  },
  channel: {
    label: 'Channel Partners & Dealerships',
    description: 'Authorised channel partners and dealer network certifications.',
  },
  authorisation: {
    label: 'Authorisations & Letters',
    description: 'Letters of authority, partnership certificates, and project authorisations.',
  },
};

const CERT_GROUP_ORDER: CertGroupKey[] = ['distributor', 'channel', 'authorisation'];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, { stiffness: 50, damping: 30 });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, spring, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export default function AboutPage() {
  const [showAllCerts, setShowAllCerts] = useState(false);

  // Group certifications
  const certsByGroup = CERTIFICATIONS.reduce<Record<CertGroupKey, CertificationItem[]>>(
    (acc, cert) => {
      const group = getCertGroup(cert);
      acc[group].push(cert);
      return acc;
    },
    { distributor: [], channel: [], authorisation: [] },
  );

  const visibleCertCount = showAllCerts ? CERTIFICATIONS.length : CERTS_PREVIEW_COUNT;
  let runningCount = 0;
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

      {/* Trust strip directly below hero */}
      <section className="border-b border-neutral-200 bg-white py-5 lg:py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 sm:gap-x-10">
          {TRUST_PILLARS.map((pillar, idx) => (
            <div key={pillar} className="flex items-center gap-3 sm:gap-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-charcoal sm:text-xs">
                {pillar}
              </span>
              {idx < TRUST_PILLARS.length - 1 && (
                <span className="hidden h-3 w-px bg-accent/50 sm:inline-block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stats anchor — animated counters with icons */}
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-12"
        >
          {COMPANY_STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={idx * 0.06}
              className="border-l border-accent/40 pl-5 lg:pl-6"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent">
                <stat.icon className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <div className="font-display text-4xl font-bold leading-none tracking-tight text-neutral-charcoal tabular-nums sm:text-5xl lg:text-6xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Story — magazine-style with framed photo */}
      <Section variant="light">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="lg:col-span-6"
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

            {/* Tight 3-col meta strip */}
            <dl className="mt-8 grid grid-cols-3 gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
              {STORY_META.map((item) => (
                <div key={item.label} className="border-l-2 border-accent/40 pl-4">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {item.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-bold leading-none text-neutral-charcoal tabular-nums">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Sectors as inline pill chips */}
            <div className="mt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                Sectors served
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {STORY_SECTORS.map((sector) => (
                  <span
                    key={sector}
                    className="inline-block rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-700"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
              The group spans six associated ventures — Bath N Room, Baba Muktinath
              Fabricators, 4R Technologies, Cubic Meter, Techwood, and Prime Ceramics —
              delivering integrated solutions across the country.
            </p>
          </motion.div>

          {/* Photo with offset accent rectangle, top caption, and floating badge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0.1}
            className="relative lg:col-span-6"
          >
            {/* Offset accent rectangle peeking from behind */}
            <div className="absolute -right-3 -top-3 hidden h-full w-full rounded-2xl border-2 border-accent/30 lg:block" />

            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 shadow-2xl">
              <Image
                src="/images/projects/nrb-thapathali.jpg"
                alt="Nepal Rastra Bank — Thapathali — flagship CMS Group project"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />

              {/* Top caption — visible immediately on first paint */}
              <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-neutral-charcoal/90 via-neutral-charcoal/40 to-transparent p-6 lg:p-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                  Featured Project
                </span>
                <p className="mt-3 font-display text-lg font-bold leading-tight text-white lg:text-xl">
                  Nepal Rastra Bank — Thapathali
                </p>
              </div>

              {/* Bottom scope strip */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-charcoal/90 via-neutral-charcoal/40 to-transparent p-6 lg:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                  Scope
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/85">
                  1.5 lakh sq.ft BKB parquet flooring · Armstrong ceiling · Dormakaba
                  hardware
                </p>
              </div>
            </div>

            {/* Floating "Years Strong" stat card */}
            <div className="absolute -bottom-6 -left-4 z-10 rounded-2xl border border-neutral-200 bg-white px-6 py-5 shadow-xl lg:-left-6">
              <p className="font-display text-4xl font-bold leading-none tracking-tight text-accent tabular-nums">
                {YEARS_IN_BUSINESS}+
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Years Strong
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
          {/* Mission */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 lg:p-10"
          >
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br from-accent-50 to-transparent opacity-70" />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-white">
                <Target className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold leading-tight text-neutral-charcoal">
                Our Mission
              </h3>
              <ul className="mt-5 space-y-4">
                {MISSION_POINTS.map((point, idx) => (
                  <li key={point} className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-50 font-display text-[10px] font-bold tabular-nums text-accent">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-relaxed text-neutral-600">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            variants={fadeUp}
            custom={0.1}
            className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 lg:p-10"
          >
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br from-accent-50 to-transparent opacity-70" />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-white">
                <Eye className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold leading-tight text-neutral-charcoal">
                Our Vision
              </h3>
              <ul className="mt-5 space-y-4">
                {VISION_POINTS.map((point, idx) => (
                  <li key={point} className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-50 font-display text-[10px] font-bold tabular-nums text-accent">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-relaxed text-neutral-600">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Core Values — prominent numerals + hover "in practice" reveal */}
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
                <span className="font-display text-5xl font-bold leading-none text-accent/60 tabular-nums">
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
              <div className="mt-5 flex items-start gap-2 border-t border-neutral-100 pt-4 text-[11px]">
                <span className="font-semibold uppercase tracking-[0.18em] text-accent">
                  In practice
                </span>
                <span className="text-neutral-500">{value.practice}</span>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Milestones — DARK reset, with year-watermarks + per-milestone icons */}
      <Section variant="dark">
        <SectionHeader
          kicker="Our Journey"
          title="Key milestones."
          lead="From our establishment in 2002 to 19 global brand partnerships — a year-wise record of every brand collaboration."
          align="center"
          inverted
          className="mx-auto"
        />

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-accent/30 lg:left-1/2 lg:-translate-x-px" />

          <div className="space-y-12 lg:space-y-16">
            {MILESTONES.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              const Icon = milestone.icon;
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
                      <div
                        className={`flex items-center gap-3 ${
                          isLeft ? 'lg:flex-row-reverse' : ''
                        }`}
                      >
                        <span className="font-display text-3xl font-bold tracking-tight text-accent tabular-nums">
                          {milestone.year}
                        </span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
                          <Icon className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-bold leading-tight text-white">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        {milestone.description}
                      </p>
                      {milestone.brands.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {milestone.brands.map((brand) => (
                            <span
                              key={brand}
                              className="inline-block rounded-full bg-accent/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent"
                            >
                              {brand}
                            </span>
                          ))}
                        </div>
                      )}
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

      {/* Leadership — Chairman hero + 3-col directors with expertise chips */}
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
          className="mt-16 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card-hover"
        >
          <div className="grid lg:grid-cols-5">

            {/* Photo column — clean white so cutout portrait blends seamlessly */}
            <div className="relative lg:col-span-2 bg-white border-b border-neutral-100 lg:border-b-0 lg:border-r lg:border-neutral-200">

              {/* Accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-accent z-10" />

              {/* Portrait — sits at bottom of column */}
              <div className="relative aspect-[3/4] lg:aspect-auto lg:absolute lg:inset-0 flex items-end justify-center overflow-hidden">
                {CHAIRMAN.photo ? (
                  <Image
                    src={CHAIRMAN.photo}
                    alt={CHAIRMAN.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-contain object-bottom"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Users className="h-16 w-16 text-accent/40" strokeWidth={1.25} />
                  </div>
                )}
                {/* Bottom fade so portrait blends into the card */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
              </div>

              {/* Chairman badge — bottom of column */}
              <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center">
                <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                  Chairman · CMS Group
                </span>
              </div>
            </div>

            {/* Content column */}
            <div className="flex flex-col gap-0 p-8 lg:col-span-3 lg:p-12 lg:pt-10 lg:pb-10">

              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                {CHAIRMAN.title} · {CHAIRMAN.company}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-neutral-charcoal sm:text-3xl lg:text-4xl">
                {CHAIRMAN.name}
              </h3>

              {/* Credential strip */}
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  Founded CMS Group, 2002
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  {new Date().getFullYear() - 2002}+ Years of Leadership
                </span>
              </div>

              {/* Expertise chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {(DIRECTOR_EXPERTISE[CHAIRMAN.name] ?? []).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-accent/20 bg-accent-50 px-3 py-1 text-[11px] font-semibold text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p className="mt-5 text-sm leading-relaxed text-neutral-600 sm:text-base">
                {chairmanBioParas[0]}
              </p>

              {/* Divider */}
              <div className="mt-6 h-px w-12 bg-accent/40" />

              {/* Pull-quote */}
              <div className="mt-5 relative">
                <Quote className="absolute -top-2 -left-1 h-8 w-8 text-accent/15" strokeWidth={1} />
                <blockquote className="pl-4 border-l-2 border-accent font-display text-base font-bold leading-snug tracking-tight text-neutral-charcoal sm:text-lg lg:text-xl">
                  &ldquo;{CHAIRMAN_QUOTE}&rdquo;
                </blockquote>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Tier 2 — Directors grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-12 grid gap-6 grid-cols-2 lg:grid-cols-3"
        >
          {DIRECTORS.map((member, index) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              custom={index * 0.04}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-50 to-neutral-100">
                    <Users className="h-12 w-12 text-accent/40" strokeWidth={1.25} />
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                  {member.title} · {member.company}
                </p>
                <h4 className="mt-1.5 font-display text-lg font-bold leading-tight text-neutral-charcoal">
                  {member.name}
                </h4>

                {/* Expertise chips */}
                {DIRECTOR_EXPERTISE[member.name] && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {DIRECTOR_EXPERTISE[member.name].slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded-full border border-accent/20 bg-accent-50 px-2.5 py-0.5 text-[10px] font-semibold text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                  {member.summary ?? member.bio.split('.')[0] + '.'}
                </p>
              </div>

              {/* Accent bottom bar on hover */}
              <div className="h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Associations — Grouped by certification type */}
      <Section variant="soft" id="associations">
        <SectionHeader
          kicker="Our Associations"
          title={`Authorised distribution across ${CERTIFICATIONS_COUNT} global brands.`}
          lead="Every brand we represent is backed by a current dealership, channel-partner, or distributorship certificate — authentic products with full manufacturer warranty and after-sales support."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 space-y-12">
          {CERT_GROUP_ORDER.map((groupKey) => {
            const groupCerts = certsByGroup[groupKey];
            if (groupCerts.length === 0) return null;

            // Slice based on running cap
            const remaining = visibleCertCount - runningCount;
            if (remaining <= 0) return null;
            const visibleInGroup = showAllCerts
              ? groupCerts
              : groupCerts.slice(0, remaining);
            runningCount += visibleInGroup.length;

            const meta = CERT_GROUP_META[groupKey];

            return (
              <div key={groupKey}>
                <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-neutral-200 pb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold leading-tight text-neutral-charcoal sm:text-2xl">
                      {meta.label}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">{meta.description}</p>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {groupCerts.length} {groupCerts.length === 1 ? 'partner' : 'partners'}
                  </span>
                </div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={stagger}
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {visibleInGroup.map((cert, index) => (
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
                      <h4 className="mt-4 font-display text-lg font-bold leading-tight text-neutral-charcoal">
                        {cert.brand}
                      </h4>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">
                        {cert.type}
                      </p>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600">
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
              </div>
            );
          })}
        </div>

        {!showAllCerts && CERTIFICATIONS_COUNT > CERTS_PREVIEW_COUNT && (
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

      <ContactCTA />
    </>
  );
}
