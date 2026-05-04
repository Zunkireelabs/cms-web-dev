'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { ContactCTA } from '@/components/sections';
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
} from 'lucide-react';

const WHY_WORK_WITH_US = [
  {
    icon: Shield,
    title: 'Safety-First Culture',
    description:
      'Your safety is our top priority. We maintain rigorous safety standards and provide comprehensive training to ensure a secure work environment for all team members.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Opportunities',
    description:
      'We invest in our people through continuous learning programs, mentorship, and clear career advancement paths to help you reach your full potential.',
  },
  {
    icon: Users,
    title: 'Collaborative Team',
    description:
      'Join a diverse team of professionals who work together, share knowledge, and support each other to achieve exceptional results.',
  },
  {
    icon: Heart,
    title: 'Work-Life Balance',
    description:
      'We believe in maintaining a healthy balance between work and personal life, offering flexible arrangements and supportive policies.',
  },
  {
    icon: Award,
    title: 'Competitive Benefits',
    description:
      'Enjoy competitive salaries, comprehensive health coverage, and additional perks that recognize your valuable contributions.',
  },
  {
    icon: Building2,
    title: 'Impactful Projects',
    description:
      'Work on meaningful projects that shape communities and infrastructure, making a lasting impact on the built environment.',
  },
];

const CURRENT_OPENINGS = [
  {
    title: 'Senior Project Manager',
    department: 'Construction',
    location: 'Kathmandu, Nepal',
    type: 'Full-time',
    description: 'Lead and manage large-scale construction projects from inception to completion.',
  },
  {
    title: 'Civil Engineer',
    department: 'Engineering',
    location: 'Kathmandu, Nepal',
    type: 'Full-time',
    description: 'Design and oversee construction of infrastructure projects including roads and buildings.',
  },
  {
    title: 'Safety Officer',
    department: 'Health & Safety',
    location: 'Kathmandu, Nepal',
    type: 'Full-time',
    description: 'Implement and monitor safety protocols across all project sites.',
  },
  {
    title: 'Procurement Specialist',
    department: 'Trading',
    location: 'Kathmandu, Nepal',
    type: 'Full-time',
    description: 'Manage supplier relationships and procurement of construction materials.',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', phone: '', position: '', message: '' });
    setSelectedFile(null);
  };

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
              Careers
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Build Your Career With Us
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="mt-6 text-xl text-neutral-300 leading-relaxed"
            >
              We believe our people are our greatest strength. At our company, you&apos;ll find
              opportunities to learn, grow, and make a real impact in the construction and
              building solutions industry.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="mt-4 text-lg text-neutral-400"
            >
              Whether you&apos;re a skilled professional or a passionate learner, we offer a
              supportive work environment, hands-on experience, and the chance to build a
              career that grows with the company.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="mt-4 text-lg font-medium text-brand-300"
            >
              Join us and be part of a team that builds more than structures—we build futures.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="mt-8"
            >
              <a
                href="#openings"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
              >
                View Open Positions
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 lg:py-28">
        <Container>
          <AnimatedSection>
            <motion.div variants={fadeInUp} custom={0} className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
                Why Join Us
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-charcoal sm:text-4xl">
                Why Work With CMS Trading & Contracting
              </h2>
              <p className="mt-4 text-neutral-600">
                Discover what makes us a great place to build your career
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_WORK_WITH_US.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                custom={index * 0.05}
                className="group rounded-2xl border border-neutral-border bg-white p-6 shadow-card transition-all hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* Current Openings */}
      <section id="openings" className="bg-neutral-off-white py-20 lg:py-28">
        <Container>
          <AnimatedSection>
            <motion.div variants={fadeInUp} custom={0} className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
                Join Our Team
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-charcoal sm:text-4xl">
                Current Openings
              </h2>
              <p className="mt-4 text-neutral-600">
                Explore our available positions and find your next opportunity
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="mt-12 space-y-4">
            {CURRENT_OPENINGS.map((job, index) => (
              <motion.div
                key={job.title}
                variants={fadeInUp}
                custom={index * 0.1}
                className="group rounded-2xl border border-neutral-border bg-white p-6 shadow-card transition-all hover:shadow-card-hover"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-charcoal group-hover:text-brand-600 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-neutral-500">{job.department}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-neutral-600">{job.description}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600">
                        <Clock className="h-3.5 w-3.5" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <a
                      href="#apply"
                      className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-brand-700"
                    >
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatedSection>

          <AnimatedSection className="mt-8 text-center">
            <motion.p variants={fadeInUp} custom={0.4} className="text-neutral-600">
              Don&apos;t see a position that matches your skills?{' '}
              <a href="#apply" className="font-semibold text-brand-600 hover:underline">
                Submit your CV
              </a>{' '}
              and we&apos;ll keep you in mind for future opportunities.
            </motion.p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Upload CV Section */}
      <section id="apply" className="py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <motion.div variants={fadeInUp} custom={0} className="text-center">
                <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
                  Apply Now
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-charcoal sm:text-4xl">
                  Upload Your CV
                </h2>
                <p className="mt-4 text-neutral-600">
                  Take the first step towards joining our team. Submit your application below.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection className="mt-12">
              {submitSuccess ? (
                <motion.div
                  variants={fadeInUp}
                  custom={0}
                  className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-green-800">
                    Application Submitted Successfully!
                  </h3>
                  <p className="mt-2 text-green-700">
                    Thank you for your interest in joining CMS Trading & Contracting.
                    Our HR team will review your application and contact you soon.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-green-700"
                  >
                    Submit Another Application
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  variants={fadeInUp}
                  custom={0.1}
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-neutral-border bg-white p-8 shadow-card"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1.5 block w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-neutral-900 placeholder-neutral-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1.5 block w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-neutral-900 placeholder-neutral-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1.5 block w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-neutral-900 placeholder-neutral-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                        placeholder="+977 98XXXXXXXX"
                      />
                    </div>

                    {/* Position */}
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-neutral-700">
                        Position Applied For
                      </label>
                      <select
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="mt-1.5 block w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-neutral-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
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

                  {/* Message */}
                  <div className="mt-6">
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
                      Cover Letter / Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="mt-1.5 block w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-neutral-900 placeholder-neutral-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      placeholder="Tell us about yourself and why you'd like to join our team..."
                    />
                  </div>

                  {/* File Upload */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-neutral-700">
                      Upload CV/Resume <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1.5">
                      <label
                        htmlFor="cv-upload"
                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-8 transition-colors hover:border-brand-400 hover:bg-brand-50"
                      >
                        {selectedFile ? (
                          <>
                            <FileText className="h-10 w-10 text-brand-600" />
                            <p className="mt-2 text-sm font-medium text-neutral-900">
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
                              className="mt-2 text-sm text-brand-600 hover:underline"
                            >
                              Choose a different file
                            </button>
                          </>
                        ) : (
                          <>
                            <Upload className="h-10 w-10 text-neutral-400" />
                            <p className="mt-2 text-sm text-neutral-600">
                              <span className="font-semibold text-brand-600">Click to upload</span> or drag and drop
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

                  {/* Submit Button */}
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="h-5 w-5 animate-spin\" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
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

                  <p className="mt-4 text-center text-sm text-neutral-500">
                    By submitting this form, you agree to our privacy policy and consent to
                    being contacted about job opportunities.
                  </p>
                </motion.form>
              )}
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <ContactCTA />
    </>
  );
}
