'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { PRODUCT_DOMAINS } from '@/data/products';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import {
  Home,
  Building,
  DoorOpen,
  PaintBucket,
  Lock,
  Fence,
  Droplets,
  Trash2,
  Bath,
  Armchair,
  Layers,
} from 'lucide-react';

const DOMAIN_ICONS: Record<string, React.ReactNode> = {
  roofing: <Home className="h-8 w-8" />,
  facade: <Building className="h-8 w-8" />,
  ceiling: <Layers className="h-8 w-8" />,
  aluminum: <DoorOpen className="h-8 w-8" />,
  coating: <PaintBucket className="h-8 w-8" />,
  hardware: <Lock className="h-8 w-8" />,
  railings: <Fence className="h-8 w-8" />,
  waterproofing: <Droplets className="h-8 w-8" />,
  wastewater: <Trash2 className="h-8 w-8" />,
  sanitaryware: <Bath className="h-8 w-8" />,
  furniture: <Armchair className="h-8 w-8" />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

export default function TradingPage() {
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
              Trading Division
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            >
              Domains We Cover - Trading
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-xl text-neutral-300 leading-relaxed"
            >
              Premium construction materials from world-leading brands. Click on any domain to explore our product offerings and brand partnerships.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Domains List Section */}
      <section className="py-16 lg:py-24 bg-neutral-off-white">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {PRODUCT_DOMAINS.map((domain) => (
              <motion.div key={domain.id} variants={itemVariants}>
                <Link
                  href={`/products-services/${domain.slug}`}
                  className="group flex items-center justify-between p-6 bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-lg hover:border-brand-300 transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 group-hover:bg-brand-100 transition-colors">
                      {DOMAIN_ICONS[domain.id] || <Building className="h-8 w-8" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-charcoal group-hover:text-brand-600 transition-colors">
                        {domain.title}
                      </h3>
                      <p className="mt-1 text-neutral-500">
                        {domain.brands.map(b => b.name).join(', ')}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-neutral-400 group-hover:text-brand-600 transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                </Link>
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
              Need Product Information?
            </h2>
            <p className="mt-4 text-neutral-600">
              Our team is ready to help you find the right products for your project requirements.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
              >
                Request a Quote
              </Link>
              <Link
                href="/products-services/contracting"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Explore Contracting
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
