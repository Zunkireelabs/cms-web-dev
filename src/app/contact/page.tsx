'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SITE_CONFIG } from '@/lib/constants';
import { SECTORS } from '@/data/sectors';
import { fadeUp } from '@/lib/motion';
import { cn } from '@/lib/utils';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Store,
} from 'lucide-react';

const SERVICE_OPTIONS = [
  { value: '', label: 'Select an inquiry type' },
  { value: 'trading', label: 'Trading — Material Supply' },
  { value: 'contracting', label: 'Contracting — Interior Fit-Out' },
  ...SECTORS.map((s) => ({ value: s.slug, label: `Sector: ${s.name}` })),
  { value: 'partnership', label: 'Brand Partnership / Distribution' },
  { value: 'other', label: 'Other' },
];

const CONTACT_INFO = [
  {
    icon: Phone,
    label: 'Office',
    value: `${SITE_CONFIG.phone}${SITE_CONFIG.phoneSecondary ? ` · ${SITE_CONFIG.phoneSecondary}` : ''}`,
    href: `tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`,
  },
  ...(SITE_CONFIG.phoneMobile
    ? [
        {
          icon: Phone,
          label: 'Mobile',
          value: SITE_CONFIG.phoneMobile,
          href: `tel:${SITE_CONFIG.phoneMobile.replace(/\s/g, '')}`,
        },
      ]
    : []),
  {
    icon: Mail,
    label: 'Email',
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: MapPin,
    label: 'Head Office',
    value: `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.country}`,
    href: SITE_CONFIG.mapsUrl ?? null,
  },
  {
    icon: Store,
    label: 'TOSTEM Studio Showroom',
    value: 'Kathmandu — experiential studio for TOSTEM aluminium window & door systems (opened June 2023)',
    href: null,
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Sun – Thu: 8:00 AM – 5:00 PM',
    href: null,
  },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const inputBase =
  'mt-2 block w-full rounded-lg border bg-white px-4 py-3 text-neutral-charcoal placeholder-neutral-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30';

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.phone && !/^[+]?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus('submitting');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <PageHero
        kicker="Get in Touch"
        title="Let's talk."
        subtitle="Material supply, interior contracting, brand partnerships, or general inquiries — drop us a line and our team responds within one working day."
        image="/images/projects/icimod.jpg"
        imageAlt="CMS Group head office"
        primaryCta={{ label: 'Send a Message', href: '#contact-form' }}
        secondaryCta={{ label: `Call ${SITE_CONFIG.phone}`, href: `tel:${SITE_CONFIG.phone.replace(/\s/g, '')}` }}
        size="compact"
      />

      <Section variant="light" id="contact-form">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-neutral-border bg-white p-8 shadow-card lg:p-10">
              <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-neutral-charcoal sm:text-3xl">
                Send us a message.
              </h2>
              <p className="mt-3 text-neutral-600">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-start gap-3 rounded-lg bg-green-50 p-4 text-green-800"
                >
                  <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="mt-1 text-sm text-green-700">
                      Thank you for contacting us. We&apos;ll get back to you soon.
                    </p>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-start gap-3 rounded-lg bg-red-50 p-4 text-red-800"
                >
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                  <div>
                    <p className="font-semibold">Something went wrong</p>
                    <p className="mt-1 text-sm text-red-700">
                      Please try again later or contact us directly.
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                      onChange={handleChange}
                      className={cn(
                        inputBase,
                        errors.name
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-neutral-border',
                      )}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
                    )}
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
                      onChange={handleChange}
                      className={cn(
                        inputBase,
                        errors.email
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-neutral-border',
                      )}
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={cn(
                        inputBase,
                        errors.phone
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-neutral-border',
                      )}
                      placeholder="+977 98XXXXXXXX"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-neutral-700">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={cn(inputBase, 'border-neutral-border')}
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-neutral-700">
                    Inquiry Type
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={cn(inputBase, 'border-neutral-border')}
                  >
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-neutral-700">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={cn(
                      inputBase,
                      'resize-none',
                      errors.message
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-neutral-border',
                    )}
                    placeholder="Tell us about your project requirements..."
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0.1}
            className="lg:col-span-2"
          >
            <div className="space-y-5">
              {CONTACT_INFO.map((item) => (
                <div
                  key={item.label}
                  className="group rounded-xl border border-neutral-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                      <item.icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-neutral-charcoal">
                        {item.label}
                      </h3>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-1 block text-sm leading-relaxed text-neutral-600 transition-colors hover:text-accent"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {SITE_CONFIG.mapsUrl && (
                <a
                  href={SITE_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-xl border border-neutral-border transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card"
                >
                  <div className="flex h-48 items-center justify-center bg-gradient-to-br from-accent-50 to-neutral-100">
                    <div className="text-center">
                      <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-card transition-transform group-hover:scale-110">
                        <MapPin className="h-7 w-7 text-accent" strokeWidth={1.75} />
                      </div>
                      <p className="mt-3 font-display text-sm font-bold text-neutral-charcoal">
                        View on Google Maps
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
                      </p>
                    </div>
                  </div>
                </a>
              )}

              <div className="rounded-xl bg-accent-50 p-6">
                <h3 className="font-display text-base font-bold text-neutral-charcoal">
                  Quick Response
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                  Our team typically responds within 24 hours during business days. For
                  urgent inquiries, please call us directly.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Talk to Us CTA */}
      <Section variant="dark">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Prefer to talk?
          </h2>
          <p className="mt-4 leading-relaxed text-white/70">
            Our team is available during business hours to discuss your project
            requirements.
          </p>
          <a
            href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-700"
          >
            <Phone className="h-5 w-5" />
            {SITE_CONFIG.phone}
          </a>
        </div>
      </Section>
    </>
  );
}
