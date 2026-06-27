'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { KickerLabel } from '@/components/ui/KickerLabel';
import { ContactCTA } from '@/components/sections';
import type { Certification, Milestone, SiteConfig } from '@/types/cms';
import { resolveIcon } from '@/lib/icon-map';
import { SITE_CONFIG_FALLBACK } from '@/lib/constants';
import { fadeUp, stagger } from '@/lib/motion';
import {
  Target,
  Eye,
  MapPin,
  Calendar,
  Building2,
  Globe,
  Layers,
  X,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';

const FOUNDED_YEAR = 2002;
const YEARS_IN_BUSINESS = new Date().getFullYear() - FOUNDED_YEAR;

// ─── Fallback constants (used when CMS fields are absent) ────────────────────

const defaultTrustPillars = [
  { title: 'Since 2002', description: '' },
  { title: 'Global Brands', description: '' },
  { title: 'Projects Delivered', description: '' },
];

const defaultCoreValues = [
  {
    icon: 'Shield',
    title: 'Integrity',
    description:
      'Honesty, integrity, and moral behaviour are the cornerstone of our commercial operations — incorporated into every facet of how the organisation operates.',
    practice: 'Single source-of-truth pricing across all six ventures',
  },
  {
    icon: 'Award',
    title: 'Excellence',
    description:
      'Competitive excellence through high-quality products and services, maintaining worldwide quality standards across every venture in the group.',
    practice: 'ISO-aligned quality control on every brand we distribute',
  },
  {
    icon: 'Users',
    title: 'Customer Satisfaction',
    description:
      'Customer satisfaction is our top priority — we exceed expectations, cultivate long-term partnerships, and constantly improve services for clients at every level.',
    practice: 'Dedicated account manager assigned to every active project',
  },
  {
    icon: 'TrendingUp',
    title: 'Innovation',
    description:
      'We foster growth through creativity and innovation, continuously seeking new ideas, technologies, and techniques that drive progress and add client value.',
    practice: 'Annual factory visits with international brand partners',
  },
  {
    icon: 'Handshake',
    title: 'Trust & Partnership',
    description:
      'Strong, long-lasting partnerships are the keystone of our business. We earn trust by keeping commitments and exceeding expectations.',
    practice: '55+ brand partnerships maintained over two decades',
  },
  {
    icon: 'CheckCircle',
    title: 'Sustainability',
    description:
      'We actively engage in sourcing materials from sustainable and eco-friendly sources, aligning operations with responsible practices and contributing to a greener future.',
    practice: 'Eco-friendly material sourcing across all six ventures',
  },
];

// Milestones come from the CMS via fetchMilestones(); see /about/page.tsx.

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

function CertCarousel({
  certifications,
  onOpen,
}: {
  certifications: Certification[];
  onOpen: (index: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector('[data-cert-card]') as HTMLElement | null;
    const amount = card ? card.offsetWidth + 16 : 280;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const card = el.querySelector('[data-cert-card]') as HTMLElement | null;
      const cardWidth = card ? card.offsetWidth + 16 : 280;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, certifications.length - 1));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [certifications.length]);

  return (
    <Section variant="soft" id="associations">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <SectionHeader
            kicker="Our Associations"
            title="Authorised distribution across our global brands."
            lead="Every brand we represent is backed by a current dealership, channel-partner, or distributorship certificate."
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => scroll('left')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-colors hover:border-accent/40 hover:text-accent"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-colors hover:border-accent/40 hover:text-accent"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {certifications.map((cert, index) => (
          <div
            key={cert.id}
            data-cert-card
            onClick={() => onOpen(index)}
            className="group shrink-0 w-60 cursor-pointer overflow-hidden rounded-xl border border-neutral-200 bg-white snap-start transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Certificate image */}
            <div className="relative h-44 overflow-hidden bg-neutral-100">
              {cert.scanImage ? (
                <>
                  <Image
                    src={cert.scanImage}
                    alt={`${cert.brand} certificate`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="240px"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/25">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-700 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      View certificate
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Building2 className="h-10 w-10 text-neutral-300" strokeWidth={1} />
                </div>
              )}
              {cert.country && (
                <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-neutral-600 shadow-sm">
                  <MapPin className="h-2.5 w-2.5 text-accent" strokeWidth={1.5} />
                  {cert.country}
                </div>
              )}
            </div>

            {/* Card body */}
            <div className="p-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-accent">
                {cert.type}
              </p>
              <h4 className="mt-0.5 font-display text-sm font-bold leading-tight text-neutral-charcoal transition-colors group-hover:text-accent">
                {cert.brand}
              </h4>
              <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-neutral-500">
                {cert.scope}
              </p>
              <div className="mt-2.5 flex items-center gap-1 border-t border-neutral-100 pt-2.5 text-[10px] text-neutral-400">
                <Calendar className="h-3 w-3 text-accent" strokeWidth={1.5} />
                <span className="truncate">
                  {cert.validUntil
                    ? `Valid till ${cert.validUntil}`
                    : cert.issued ?? cert.validFrom ?? ''}
                </span>
              </div>
            </div>
            <div className="h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-1.5">
        {certifications.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const card = scrollRef.current?.querySelector('[data-cert-card]') as HTMLElement | null;
              const cardWidth = card ? card.offsetWidth + 16 : 280;
              scrollRef.current?.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-4 bg-accent' : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'
            }`}
            aria-label={`Go to ${certifications[i].brand}`}
          />
        ))}
      </div>
    </Section>
  );
}

function CertLightbox({
  certs,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  certs: Certification[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const cert = certs[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl lg:flex-row"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Counter */}
          <div className="absolute left-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
            {index + 1} / {certs.length}
          </div>

          {/* Image */}
          <div className="relative min-h-[260px] w-full bg-neutral-100 lg:w-1/2 lg:min-h-[480px]">
            {cert.scanImage ? (
              <Image
                src={cert.scanImage}
                alt={`${cert.brand} certificate`}
                fill
                className="object-contain p-4"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Building2 className="h-16 w-16 text-neutral-300" strokeWidth={1} />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-1 flex-col justify-center p-7 lg:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              {cert.type}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-neutral-charcoal lg:text-3xl">
              {cert.brand}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">{cert.scope}</p>
            <div className="mt-6 space-y-2 border-t border-neutral-100 pt-5">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <MapPin className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
                <span>{cert.holder}</span>
              </div>
              {cert.country && (
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Globe className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
                  <span>{cert.country}</span>
                </div>
              )}
              {(cert.validUntil || cert.issued) && (
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Calendar className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
                  <span>
                    {cert.validUntil ? `Valid till ${cert.validUntil}` : cert.issued}
                  </span>
                </div>
              )}
            </div>

            {/* Nav buttons */}
            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={onPrev}
                disabled={index === 0}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-600 transition-colors hover:border-accent/40 hover:text-accent disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                {index > 0 ? certs[index - 1].brand : 'Previous'}
              </button>
              <button
                onClick={onNext}
                disabled={index === certs.length - 1}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-600 transition-colors hover:border-accent/40 hover:text-accent disabled:pointer-events-none disabled:opacity-30"
              >
                {index < certs.length - 1 ? certs[index + 1].brand : 'Next'}
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function AboutClient({
  certifications,
  milestones,
  siteConfig,
}: {
  certifications: Certification[];
  milestones: Milestone[];
  siteConfig: SiteConfig | null;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((idx: number) => {
    document.body.style.overflow = 'hidden';
    setLightboxIndex(idx);
  }, []);

  const closeLightbox = useCallback(() => {
    document.body.style.overflow = '';
    setLightboxIndex(null);
  }, []);

  const prevCert = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  const nextCert = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i < certifications.length - 1 ? i + 1 : i));
  }, [certifications.length]);

  // ─── Derive values from CMS siteConfig, falling back to hardcoded defaults ──
  const cfg = siteConfig ?? SITE_CONFIG_FALLBACK;

  const companyStats: { value: number; suffix: string; label: string; icon: LucideIcon }[] = [
    {
      value: cfg.stats?.yearsOfExcellence ?? YEARS_IN_BUSINESS,
      suffix: '+',
      label: cfg.stats?.yearsOfExcellenceLabel ?? 'Years of Experience',
      icon: Calendar,
    },
    {
      value: cfg.stats?.projectsDelivered ?? 500,
      suffix: '+',
      label: cfg.stats?.projectsDeliveredLabel ?? 'Projects Delivered',
      icon: Building2,
    },
    {
      value: cfg.stats?.brandPartners ?? 50,
      suffix: '+',
      label: cfg.stats?.brandPartnersLabel ?? 'Global Brand Partners',
      icon: Globe,
    },
    {
      value: cfg.stats?.sectorsServed ?? 6,
      suffix: '',
      label: cfg.stats?.sectorsServedLabel ?? 'Sectors Served',
      icon: Layers,
    },
  ];

  const trustPillars = cfg.trustPillars?.length ? cfg.trustPillars : defaultTrustPillars;

  const storyMeta = cfg.storyMeta?.length
    ? cfg.storyMeta
    : [
        { label: 'Founded', value: '2002' },
        { label: 'Head Office', value: 'Kathmandu' },
      ];

  const storySectors = cfg.storySectors?.length
    ? cfg.storySectors
    : ['Hospitality', 'Education', 'Airport', 'Office Spaces', 'Healthcare', 'Residence'];

  const missionPoints = cfg.mission?.length
    ? cfg.mission
    : [
        'To deliver end-to-end trading and contracting solutions by combining globally recognized products with precise project execution.',
        'To uphold the highest standards of quality, safety, and integrity in every stage of our operations.',
        'To build long-term partnerships with clients, suppliers, and stakeholders through reliability and performance.',
      ];

  const visionPoints = cfg.vision?.length
    ? cfg.vision
    : [
        'To be a trusted and preferred trading and contracting partner, recognized for delivering integrated building solutions with technical excellence, global brand partnerships, and sustainable value across every project we undertake.',
      ];

  const coreValues = cfg.coreValues?.length ? cfg.coreValues : defaultCoreValues;


  return (
    <>
      <PageHero
        kicker="About CMS Group"
        title="Construction Material Solutions, since 2002."
        subtitle="Nepal's trusted partner for premium building materials, finishing systems, and integrated contracting."
        image="/images/projects/bir-hospital.jpg"
        imageAlt="Bir Hospital — a flagship CMS Group project"
        size="tall"
      />

      {/* Trust strip */}
      <section className="border-b border-neutral-200 bg-white py-5 lg:py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 sm:gap-x-10">
          {trustPillars.map((pillar, idx) => (
            <div key={pillar.title} className="flex items-center gap-3 sm:gap-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-charcoal sm:text-xs">
                {pillar.title}
              </span>
              {idx < trustPillars.length - 1 && (
                <span className="hidden h-3 w-px bg-accent/50 sm:inline-block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
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

            <dl className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
              {storyMeta.map((item) => (
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

            <div className="mt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                Sectors served
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {storySectors.map((sector, i) => (
                  <span
                    key={`${sector}-${i}`}
                    className="inline-block rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-700"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
              The group spans six associated ventures, delivering integrated solutions
              across the country.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0.1}
            className="relative lg:col-span-6"
          >
            <div className="absolute -right-3 -top-3 hidden h-full w-full rounded-2xl border-2 border-accent/30 lg:block" />

            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 shadow-2xl">
              <Image
                src="/images/projects/nrb-thapathali.jpg"
                alt="Nepal Rastra Bank — Thapathali — flagship CMS Group project"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Mission & Vision */}
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
                {missionPoints.map((point, idx) => (
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
                {visionPoints.map((point, idx) => (
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

      {/* Core Values */}
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
          {coreValues.map((value, index) => {
            const Icon = resolveIcon(value.icon ?? 'Award');
            return (
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
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold leading-tight text-neutral-charcoal">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {value.description}
                </p>
                {value.practice && (
                  <div className="mt-5 flex items-start gap-2 border-t border-neutral-100 pt-4 text-[11px]">
                    <span className="font-semibold uppercase tracking-[0.18em] text-accent">
                      In practice
                    </span>
                    <span className="text-neutral-500">{value.practice}</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </motion.div>
            );
          })}
        </motion.div>
      </Section>

      {/* Milestones */}
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
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              const Icon = resolveIcon(milestone.icon ?? 'Sparkles');
              return (
                <motion.div
                  key={`${milestone.year}-${milestone.venture}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={fadeUp}
                  custom={index * 0.04}
                  className={`relative flex items-center gap-8 lg:gap-0 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
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
                        {milestone.title || milestone.venture}
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

                  <div className="absolute left-4 top-6 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-accent ring-4 ring-neutral-charcoal lg:left-1/2 lg:top-auto" />

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

      {/* Associations — horizontal certificate carousel + lightbox */}
      <CertCarousel certifications={certifications} onOpen={openLightbox} />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <CertLightbox
          certs={certifications}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevCert}
          onNext={nextCert}
        />
      )}

      <ContactCTA />
    </>
  );
}
