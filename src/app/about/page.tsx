'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { ContactCTA } from '@/components/sections';
import { CERTIFICATIONS, CERTIFICATIONS_COUNT } from '@/data/certifications';
import {
  Target,
  Eye,
  Shield,
  Users,
  Award,
  Handshake,
  CheckCircle,
  Building2,
  Calendar,
  Globe,
  TrendingUp,
  ScrollText,
  MapPin,
} from 'lucide-react';

const FOUNDED_YEAR = 2002;
const YEARS_IN_BUSINESS = new Date().getFullYear() - FOUNDED_YEAR;

const COMPANY_STATS = [
  { label: 'Years of Experience', value: `${YEARS_IN_BUSINESS}+`, icon: Calendar },
  { label: 'Projects Delivered', value: '200+', icon: Building2 },
  { label: 'Global Brand Partners', value: '60+', icon: Users },
  { label: 'Sectors Served', value: '6', icon: Globe },
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

const LEADERSHIP_TEAM = [
  {
    name: 'Mr. Prashant Agarwal',
    role: 'Chairman, CMS Group',
    bio: 'Founded Construction Materials Group in 2002. Drives the group’s expansion across trading, contracting, industrial development, and e-commerce.',
  },
  {
    name: 'Ms. Rima Lamichhane',
    role: 'Director, CMS Group',
    bio: 'Champions client satisfaction and personalized solutions through cutting-edge technologies and trusted, collaborative partnerships.',
  },
  {
    name: 'Mr. Sandeep Goenka',
    role: 'Director, CMS Group',
    bio: 'Leads the group’s product strategy that blends innovation and environmental sustainability with conventional building offerings.',
  },
  {
    name: 'Mr. Sumit Agarwal',
    role: 'Director, CMS Group',
    bio: 'Builds the group’s competitive edge through state-of-the-art technologies and pioneering construction concepts.',
  },
];

const MILESTONES: { year: string; title: string; description: string; type: 'establishment' | 'trading' | 'brand' }[] = [
  { year: '2002', title: 'Kantipur', description: 'CMS Group founded as Italian Marble & Granite trading firm.', type: 'establishment' },
  { year: '2003', title: 'Bath N Room Trade Concern Pvt. Ltd.', description: 'One-stop solution for building finishing products in the Nepalese market.', type: 'trading' },
  { year: '2010', title: 'Baba Muktinath Fabricators Pvt. Ltd.', description: 'Leading dealer, distributor and fabricator for world-class building systems.', type: 'brand' },
  { year: '2015', title: '4R Technologies Pvt. Ltd.', description: 'Associated with world-renowned brands to provide a wide range of green products.', type: 'brand' },
  { year: '2018', title: 'Cubic Meter Pvt. Ltd.', description: 'Interior finishing and contracting venture serving hotels, hospitals, and corporate offices.', type: 'trading' },
  { year: '2019', title: 'Techwood Pvt. Ltd.', description: 'Quality modular furniture solutions for corporate offices and schools.', type: 'trading' },
  { year: '2021', title: 'Prime Ceramics Pvt. Ltd.', description: 'Ceramic tile manufacturing in Nepal — joint venture with Fortune Ventures Pvt. Ltd.', type: 'brand' },
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

export default function AboutPage() {
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
              About CMS Group
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Delivering Exceptional Construction Solutions Since 2002
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="mt-6 text-xl text-neutral-300"
            >
              Construction Material Solutions — Nepal’s trusted partner for premium building materials, finishing systems, and integrated contracting across six specialized ventures.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-12 z-10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {COMPANY_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="rounded-2xl border border-neutral-border bg-white p-6 text-center shadow-card"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="mt-4 text-3xl font-bold text-neutral-charcoal">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-neutral-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Company Story */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimatedSection>
              <motion.div variants={fadeInUp} custom={0}>
                <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
                  Our Story
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-charcoal sm:text-4xl">
                  Two decades of building trust in Nepal
                </h2>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                custom={0.1}
                className="mt-6 space-y-4 text-neutral-600 leading-relaxed"
              >
                <p>
                  CMS Group is a leading provider of construction materials and building services in Nepal. Since 2002, we have built a solid reputation for reliability, professionalism, and customer satisfaction across the construction sector.
                </p>
                <p>
                  Our core specialization lies in the trading and distribution of premium building and construction materials. We bring forth top-of-the-line items that cater to the needs of industrial clients, builders, architects, interior designers, engineers, and contractors through strategic collaborations with worldwide manufacturers.
                </p>
                <p>
                  Today, the group spans six associated ventures — Bath N Room, Baba Muktinath Fabricators, 4R Technologies, Cubic Meter, Techwood, and Prime Ceramics — serving hospitals, education, airports, offices, hotels, and residential projects across the country.
                </p>
              </motion.div>
            </AnimatedSection>

            {/* Image Placeholder */}
            <AnimatedSection>
              <motion.div
                variants={fadeInUp}
                custom={0.2}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="h-24 w-24 text-brand-200" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-900/80 to-transparent p-6">
                  <p className="text-lg font-semibold text-white">
                    Corporate Headquarters
                  </p>
                  <p className="text-sm text-brand-200">Tara Bhawan, Teku, Kathmandu</p>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="bg-neutral-off-white py-20 lg:py-28">
        <Container>
          <AnimatedSection className="grid gap-8 lg:grid-cols-2">
            {/* Mission */}
            <motion.div
              variants={fadeInUp}
              custom={0}
              className="rounded-2xl border border-neutral-border bg-white p-8 shadow-card lg:p-10"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-neutral-charcoal">
                Our Mission
              </h3>
              <ul className="mt-4 text-neutral-600 leading-relaxed space-y-4 list-disc pl-5">
                <li>To provide competitive excellence through high-quality construction products and services across every venture in the group.</li>
                <li>To deliver on time and at competitive prices for clients at every level — from individual residences to nation-scale infrastructure.</li>
                <li>To cultivate long-term partnerships with clients, suppliers, and stakeholders through reliability and integrated solutions.</li>
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={fadeInUp}
              custom={0.1}
              className="rounded-2xl border border-neutral-border bg-white p-8 shadow-card lg:p-10"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Eye className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-neutral-charcoal">
                Our Vision
              </h3>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                To be Nepal’s leading one-stop solution provider for all building &amp; construction materials. By providing best-in-class materials and comprehensive solutions, we strive to go above and beyond customer expectations, earning their trust as a partner in building.
              </p>
            </motion.div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28">
        <Container>
          <AnimatedSection>
            <motion.div variants={fadeInUp} custom={0} className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
                What Drives Us
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-charcoal sm:text-4xl">
                Our Core Values
              </h2>
              <p className="mt-4 text-neutral-600">
                The principles that guide everything we do
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                custom={index * 0.05}
                className="group rounded-2xl border border-neutral-border bg-white p-6 shadow-card transition-all hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-charcoal">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* Timeline / Milestones */}
      <section className="bg-neutral-charcoal py-20 lg:py-28">
        <Container>
          <AnimatedSection>
            <motion.div variants={fadeInUp} custom={0} className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">
                Our Journey
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Key Milestones
              </h2>
            </motion.div>
          </AnimatedSection>

          <div className="mt-16">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-brand-600/30 lg:left-1/2 lg:-translate-x-0.5" />

              {/* Timeline Items */}
              <div className="space-y-12">
                {MILESTONES.map((milestone, index) => (
                  <AnimatedSection key={milestone.year}>
                    <motion.div
                      variants={fadeInUp}
                      custom={index * 0.1}
                      className={`relative flex items-start gap-8 lg:gap-0 ${
                        index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                      }`}
                    >
                      {/* Content */}
                      <div className={`flex-1 lg:pr-12 ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12 lg:pr-0'}`}>
                        <div className={`rounded-xl bg-white/5 p-6 backdrop-blur-sm ${index % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'} lg:max-w-md`}>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-brand-400">
                              {milestone.year}
                            </span>
                            <span className="rounded-full bg-brand-600/20 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-brand-300">
                              {milestone.type === 'establishment' ? 'Milestone' : milestone.type === 'trading' ? 'Trading' : 'Brand'}
                            </span>
                          </div>
                          <h3 className="mt-2 text-lg font-semibold text-white">
                            {milestone.title}
                          </h3>
                          <p className="mt-2 text-sm text-neutral-400">
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      {/* Dot */}
                      <div className="absolute left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-brand-600 lg:left-1/2">
                        <div className="h-3 w-3 rounded-full bg-white" />
                      </div>

                      {/* Spacer for alternating layout */}
                      <div className="hidden flex-1 lg:block" />
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership Team */}
      <section className="py-20 lg:py-28">
        <Container>
          <AnimatedSection>
            <motion.div variants={fadeInUp} custom={0} className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
                Leadership
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-charcoal sm:text-4xl">
                Meet Our Team
              </h2>
              <p className="mt-4 text-neutral-600">
                Experienced professionals dedicated to delivering excellence
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP_TEAM.map((member, index) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                custom={index * 0.1}
                className="group text-center"
              >
                {/* Avatar Placeholder */}
                <div className="mx-auto h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br from-brand-100 to-brand-50 p-1">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                    <Users className="h-12 w-12 text-brand-300" />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-charcoal">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-brand-600">{member.role}</p>
                <p className="mt-2 text-sm text-neutral-600">{member.bio}</p>
              </motion.div>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* Our Associations / Certifications */}
      <section id="associations" className="bg-neutral-off-white py-20 lg:py-28">
        <Container>
          <AnimatedSection>
            <motion.div variants={fadeInUp} custom={0} className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
                Our Associations
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-charcoal sm:text-4xl">
                Authorised Distribution &amp; Channel Partner Across {CERTIFICATIONS_COUNT} Global Brands
              </h2>
              <p className="mt-4 text-neutral-600">
                Every brand we represent is backed by a current dealership, channel partner,
                or distributorship certificate — so you get authentic products with full
                manufacturer warranty and after-sales support.
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={fadeInUp}
                custom={index * 0.04}
                className="group relative rounded-2xl border border-neutral-border bg-white p-6 shadow-card transition-all hover:shadow-card-hover"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <ScrollText className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  {cert.country && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                      <MapPin className="h-3 w-3" strokeWidth={1.5} />
                      {cert.country}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-bold text-neutral-charcoal leading-tight">
                  {cert.brand}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-600">
                  {cert.type}
                </p>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed line-clamp-3">
                  {cert.scope}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t border-neutral-100">
                  <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500">
                    <CheckCircle className="h-3 w-3 text-brand-600" strokeWidth={1.5} />
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

                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-600 transition-all duration-300 group-hover:w-full" />
              </motion.div>
            ))}
          </AnimatedSection>

          <AnimatedSection className="mt-10 text-center">
            <motion.p variants={fadeInUp} custom={0.4} className="text-sm text-neutral-500">
              Joint-Venture Manufacturing Partner with Fortune Ventures Pvt. Ltd. — Prime Ceramics tile manufacturing in Nepal.
            </motion.p>
          </AnimatedSection>
        </Container>
      </section>

      {/* CTA Section */}
      <ContactCTA />
    </>
  );
}
