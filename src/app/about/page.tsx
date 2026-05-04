'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { ContactCTA } from '@/components/sections';
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
} from 'lucide-react';

const COMPANY_STATS = [
  { label: 'Years of Experience', value: '20+', icon: Calendar },
  { label: 'Projects Completed', value: '500+', icon: Building2 },
  { label: 'Satisfied Clients', value: '200+', icon: Users },
  { label: 'Countries Served', value: '5+', icon: Globe },
];

const CORE_VALUES = [
  {
    icon: Shield,
    title: 'Integrity',
    description:
      'We conduct our business with the highest ethical standards, ensuring transparency and honesty in every interaction.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      'We strive for excellence in every project, maintaining rigorous quality standards and continuous improvement.',
  },
  {
    icon: Users,
    title: 'Teamwork',
    description:
      'We believe in the power of collaboration, fostering strong partnerships with clients, suppliers, and team members.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description:
      'We embrace new technologies and methodologies to deliver cutting-edge solutions that exceed expectations.',
  },
  {
    icon: Handshake,
    title: 'Commitment',
    description:
      'We are dedicated to delivering on our promises, completing projects on time and within budget.',
  },
  {
    icon: CheckCircle,
    title: 'Safety',
    description:
      'We prioritize the health and safety of our workforce, maintaining zero-tolerance policies for unsafe practices.',
  },
];

const LEADERSHIP_TEAM = [
  {
    name: 'Ahmed Al-Mansouri',
    role: 'Chief Executive Officer',
    bio: 'Over 25 years of experience in construction and project management across Nepal.',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Chief Operations Officer',
    bio: 'Expert in operational excellence with a track record of delivering complex infrastructure projects.',
  },
  {
    name: 'Mohammed Hassan',
    role: 'Technical Director',
    bio: 'Licensed engineer specializing in MEP systems and sustainable building technologies.',
  },
  {
    name: 'James Wilson',
    role: 'Commercial Director',
    bio: 'Strategic leader with extensive experience in trading and supply chain management.',
  },
];

const CERTIFICATIONS = [
  'Grade A Contractor Classification',
  'Nepal Chamber of Commerce Member',
  'ASHRAE Member Organization',
];

const MILESTONES: { year: string; title: string; description: string; type: 'establishment' | 'trading' | 'brand' }[] = [
  { year: '2002', title: 'Company Established', description: 'CMS Trading & Contracting founded in Nepal.', type: 'establishment' },
  { year: '2004', title: 'Trading Division Commenced', description: 'Launched dedicated trading operations to supply quality building materials.', type: 'trading' },
  { year: '2006', title: 'Armstrong Ceiling', description: 'First brand collaboration — premium ceiling systems.', type: 'brand' },
  { year: '2007', title: 'IKO', description: 'Partnered for roofing solutions.', type: 'brand' },
  { year: '2008', title: 'Hunter Douglas', description: 'Introduced facade solutions.', type: 'brand' },
  { year: '2010', title: 'Dormakaba', description: 'Door hardware & access solutions.', type: 'brand' },
  { year: '2011', title: 'Schomburg', description: 'Waterproofing systems.', type: 'brand' },
  { year: '2012', title: 'Tostem', description: 'Aluminum doors & windows.', type: 'brand' },
  { year: '2014', title: 'ICA Pidilite', description: 'Wood coatings.', type: 'brand' },
  { year: '2015', title: 'American Standard', description: 'Sanitaryware.', type: 'brand' },
  { year: '2016', title: 'Grohe', description: 'Bathroom fittings.', type: 'brand' },
  { year: '2017', title: 'Sintex', description: 'Wastewater management.', type: 'brand' },
  { year: '2018', title: 'SOS Office', description: 'Office furniture.', type: 'brand' },
  { year: '2019', title: 'AGT', description: 'Flooring.', type: 'brand' },
  { year: '2020', title: 'Zolon', description: 'Architectural railings.', type: 'brand' },
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
              About Us
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Building Excellence Since 2002
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="mt-6 text-xl text-neutral-300"
            >
              CMS Trading & Contracting is a leading construction and trading company
              delivering world-class projects across Nepal.
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
                  Two Decades of Building Trust
                </h2>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                custom={0.1}
                className="mt-6 space-y-4 text-neutral-600 leading-relaxed"
              >
                <p>
                  Founded in 2002, CMS Trading & Contracting began with a vision to deliver
                  quality construction and trading services in Nepal. Over the years, we
                  have grown into a diversified company offering comprehensive contracting
                  and trading solutions.
                </p>
                <p>
                  Our journey has been marked by continuous growth, strategic partnerships,
                  and an unwavering commitment to excellence. Today, we serve clients across
                  multiple sectors including healthcare, education, hospitality, and
                  commercial real estate.
                </p>
                <p>
                  With a team of over 500 professionals and a portfolio of 500+ completed
                  projects, we have established ourselves as a trusted partner for
                  construction and trading needs in Nepal.
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
                  <p className="text-sm text-brand-200">Tara Bhawan, Kathmandu</p>
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
                <li>To deliver end-to-end trading and contracting solutions by combining globally recognized products with precise project execution.</li>
                <li>To uphold the highest standards of quality, safety, and integrity in every stage of our operations.</li>
                <li>To build long-term partnerships with clients, suppliers, and stakeholders through reliability and performance.</li>
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
                To be a trusted and preferred trading and contracting partner, recognized for delivering integrated building solutions with technical excellence, global brand partnerships, and sustainable value across every project we undertake.
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

      {/* Certifications */}
      <section className="bg-neutral-off-white py-20 lg:py-28">
        <Container>
          <AnimatedSection>
            <motion.div variants={fadeInUp} custom={0} className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
                Credentials
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-charcoal sm:text-4xl">
                Certifications & Accreditations
              </h2>
              <p className="mt-4 text-neutral-600">
                Recognized standards of quality and excellence
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="mt-12">
            <motion.div
              variants={fadeInUp}
              custom={0.1}
              className="flex flex-wrap justify-center gap-4"
            >
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-2 rounded-full border border-neutral-border bg-white px-4 py-2 shadow-sm"
                >
                  <CheckCircle className="h-4 w-4 text-brand-600" />
                  <span className="text-sm font-medium text-neutral-700">{cert}</span>
                </div>
              ))}
            </motion.div>
          </AnimatedSection>
        </Container>
      </section>

      {/* CTA Section */}
      <ContactCTA />
    </>
  );
}
