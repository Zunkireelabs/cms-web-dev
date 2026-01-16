'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { CONTRACTING_SERVICES } from '@/data/products';
import { ArrowLeft, Building2, ClipboardCheck, Leaf, ChevronRight } from 'lucide-react';

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  interior: <Building2 className="h-6 w-6" />,
  execution: <ClipboardCheck className="h-6 w-6" />,
  renovation: <Leaf className="h-6 w-6" />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function ContractingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-charcoal via-neutral-800 to-brand-900 py-16 lg:py-24">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <Container className="relative">
          {/* Back Link */}
          <Link
            href="/products-services"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Products & Services</span>
          </Link>

          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block rounded-full bg-brand-600/20 px-4 py-1.5 text-sm font-medium text-brand-300 backdrop-blur-sm mb-4"
            >
              Contracting Division
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            >
              Domains We Cover - Contracting
            </motion.h1>
          </div>
        </Container>
      </section>

      {/* Services List Section */}
      <section className="py-16 lg:py-24 bg-neutral-off-white">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4 max-w-3xl mx-auto"
          >
            {CONTRACTING_SERVICES.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="flex items-center gap-4 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                  {SERVICE_ICONS[service.id] || <Building2 className="h-6 w-6" />}
                </div>
                <h3 className="text-lg font-semibold text-neutral-charcoal">
                  {service.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-t border-neutral-200">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-charcoal">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-neutral-600">
              Let&apos;s discuss how we can bring your vision to life with our comprehensive contracting services.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
              >
                Get a Quote
              </Link>
              <Link
                href="/products-services/trading"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Explore Trading
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
