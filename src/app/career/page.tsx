'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContactCTA } from '@/components/sections';
import { fadeUp } from '@/lib/motion';
import {
  Shield,
  TrendingUp,
  Users,
  Heart,
  Award,
  Building2,
  MapPin,
  Clock,
  Briefcase,
  Upload,
  CheckCircle,
  ArrowRight,
  FileText,
  Loader2,
} from 'lucide-react';

const WHY_WORK_WITH_US = [
  {
    icon: Building2,
    title: 'Six Specialised Ventures',
    description:
      'Move across Bath N Room, Baba Muktinath, 4R Technologies, Cubic Meter, Techwood, and Prime Ceramics — broaden your scope without leaving the group.',
  },
  {
    icon: Award,
    title: 'World-Class Brand Exposure',
    description:
      'Work alongside 50+ global brand partners — Grohe, Duravit, Hunter Douglas, Dormakaba, IKO, Tarkett, Armstrong, and more — with vendor training built in.',
  },
  {
    icon: Users,
    title: 'Marquee Project Portfolio',
    description:
      "Contribute to projects like Bir Hospital, Tiger Palace, Nepal Rastra Bank, AANSON, Mediciti, Dusit Thani — work that shapes Nepal's built environment.",
  },
  {
    icon: TrendingUp,
    title: 'Growth & Mentorship',
    description:
      'Continuous training programmes including factory visits with international partners (Tostem Thailand, Armstrong, IKO) — invest in your craft.',
  },
  {
    icon: Heart,
    title: 'Community-First Culture',
    description:
      "Annual blood-donation drives, Women's Day celebrations, technician meets — the CMS Group culture is built on people and contribution, not just deliverables.",
  },
  {
    icon: Shield,
    title: 'Twenty-Three Years Strong',
    description:
      'Join a group founded in 2002 with a deep-rooted reputation — your career has the runway of a stable, growing organisation behind it.',
  },
];

const CURRENT_OPENINGS = [
  {
    title: 'Sales Executive — Sanitaryware & Tiles',
    department: 'Bath N Room',
    location: 'Kathmandu, Nepal',
    type: 'Full-time',
    description:
      'Build client relationships across hospitality, residential, and institutional projects — distributing Grohe, Duravit, RAK, American Standard, and more.',
  },
  {
    title: 'Site Supervisor — Interior Contracting',
    department: 'Cubic Meter',
    location: 'Kathmandu, Nepal',
    type: 'Full-time',
    description:
      'Oversee on-site execution of interior fit-out projects from material delivery through commissioning, ensuring quality and timeline adherence.',
  },
  {
    title: 'Technical Specialist — Building Systems',
    department: 'Baba Muktinath Fabricators',
    location: 'Kathmandu, Nepal',
    type: 'Full-time',
    description:
      'Specify and support installation of roofing, ceilings, doors, hardware, and façade systems from international partners.',
  },
  {
    title: 'Project Engineer — Water & Wastewater',
    department: '4R Technologies',
    location: 'Kathmandu, Nepal',
    type: 'Full-time',
    description:
      'Design and commission STP / ETP plants, water storage, and pool systems — Sintex, Pentair, Kingspan Rhino, Oase product lines.',
  },
];

const inputBase =
  'mt-1.5 block w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-neutral-charcoal placeholder-neutral-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30';

export default function CareerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', phone: '', position: '', message: '' });
    setSelectedFile(null);
  };

  return (
    <>
      <PageHero
        kicker="Careers"
        title="Build your career with us."
        subtitle="Six specialised ventures. 50+ global brand partners. 500+ delivered projects across hospitals, hotels, banks, airports, and homes in Nepal — career breadth a single firm rarely offers. We've been building Nepal since 2002. Help us build the next chapter."
        image="/images/projects/ncell-hq.jpg"
        imageAlt="CMS Group team"
        primaryCta={{ label: 'View Open Positions', href: '#openings' }}
        size="tall"
      />

      {/* Why Join Us */}
      <Section variant="light">
        <SectionHeader
          kicker="Why Join Us"
          title="Why work with CMS Group."
          lead="A career that spans six ventures, fifty brand partners, and the most demanding construction projects in Nepal — anchored by a culture that prizes people, not just deliverables."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_WORK_WITH_US.map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              custom={index * 0.05}
              className="group rounded-2xl border border-neutral-border bg-white p-7 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <item.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-lg font-bold leading-tight tracking-tight text-neutral-charcoal sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Current Openings */}
      <Section variant="soft" id="openings">
        <SectionHeader
          kicker="Join Our Team"
          title="Roles we recruit for."
          lead="Representative positions across our six ventures — submit your CV below and we'll match you to current openings."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 space-y-4">
          {CURRENT_OPENINGS.map((job, index) => (
            <motion.div
              key={job.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              custom={index * 0.05}
              className="group rounded-2xl border border-neutral-border bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover lg:p-8"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent">
                      <Briefcase className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold leading-tight text-neutral-charcoal transition-colors group-hover:text-accent sm:text-xl">
                        {job.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                        {job.department}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                    {job.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
                      <Clock className="h-3 w-3" />
                      {job.type}
                    </span>
                  </div>
                </div>
                <div className="shrink-0">
                  <a
                    href="#apply"
                    className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-700"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-neutral-600">
          Don&apos;t see a position that matches your skills?{' '}
          <a href="#apply" className="font-semibold text-accent hover:underline">
            Submit your CV
          </a>{' '}
          and we&apos;ll keep you in mind for future opportunities.
        </p>
      </Section>

      {/* Apply / Upload CV */}
      <Section variant="light" id="apply">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            kicker="Apply Now"
            title="Upload your CV."
            lead="Take the first step towards joining our team. Submit your application below."
            align="center"
            className="mx-auto"
          />

          <div className="mt-12">
            {submitSuccess ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0}
                className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-green-800">
                  Application submitted successfully!
                </h3>
                <p className="mt-3 text-green-700">
                  Thank you for your interest in joining CMS Group. Our HR team will review
                  your application and contact you soon.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-7 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-green-700"
                >
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                custom={0.1}
                onSubmit={handleSubmit}
                className="rounded-2xl border border-neutral-border bg-white p-8 shadow-card lg:p-10"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-neutral-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={inputBase}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-neutral-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={inputBase}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={inputBase}
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="position" className="block text-sm font-semibold text-neutral-700">
                      Position Applied For
                    </label>
                    <select
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className={inputBase}
                    >
                      <option value="">Select a position (optional)</option>
                      {CURRENT_OPENINGS.map((job) => (
                        <option key={job.title} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                      <option value="Other">Other / General Application</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="message" className="block text-sm font-semibold text-neutral-700">
                    Cover Letter / Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={inputBase}
                    placeholder="Tell us about yourself and why you'd like to join our team..."
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-neutral-700">
                    Upload CV/Resume <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1.5">
                    <label
                      htmlFor="cv-upload"
                      className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-off-white p-8 transition-colors hover:border-accent/40 hover:bg-accent-50"
                    >
                      {selectedFile ? (
                        <>
                          <FileText className="h-10 w-10 text-accent" strokeWidth={1.5} />
                          <p className="mt-2 text-sm font-semibold text-neutral-charcoal">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedFile(null);
                            }}
                            className="mt-2 text-sm font-semibold text-accent hover:underline"
                          >
                            Choose a different file
                          </button>
                        </>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-neutral-400" strokeWidth={1.5} />
                          <p className="mt-3 text-sm text-neutral-600">
                            <span className="font-semibold text-accent">Click to upload</span>{' '}
                            or drag and drop
                          </p>
                          <p className="text-xs text-neutral-500">PDF, DOC, or DOCX (Max. 5MB)</p>
                        </>
                      )}
                      <input
                        id="cv-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        required={!selectedFile}
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-4 text-center text-xs text-neutral-500">
                  By submitting this form, you agree to our privacy policy and consent to
                  being contacted about job opportunities.
                </p>
              </motion.form>
            )}
          </div>
        </div>
      </Section>

      <ContactCTA />
    </>
  );
}
