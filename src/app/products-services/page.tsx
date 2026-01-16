'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

export default function ProductsServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-charcoal via-neutral-800 to-neutral-900 py-32 lg:py-44">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/project-3.jpg"
            alt="Products and Services"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-black/60 via-neutral-black/50 to-neutral-black/70" />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-white">CMST</span>
                <span className="text-white">NC</span>
                <span className="text-brand-400">.com</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-widest text-white"
            >
              TRADING & CONTRACTING
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-lg sm:text-xl tracking-wider text-neutral-400"
            >
              BUILDING THE FUTURE
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/products-services/contracting"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                Explore Contracting
              </Link>
              <Link
                href="/products-services/trading"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-all duration-300"
              >
                Explore Trading
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Brief Overview Section */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Trading Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-neutral-off-white rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Trading</h2>
              <p className="text-neutral-600 mb-6">
                Premium construction materials from world-leading brands. We supply roofing, facades, doors & windows, coatings, hardware, and more.
              </p>
              <Link
                href="/products-services/trading"
                className="inline-flex items-center text-brand-600 font-semibold hover:text-brand-700 transition-colors"
              >
                View All Products
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* Contracting Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-neutral-off-white rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Contracting</h2>
              <p className="text-neutral-600 mb-6">
                Full-service contracting solutions including interior fit-outs, project management, renovations, and sustainable building practices.
              </p>
              <Link
                href="/products-services/contracting"
                className="inline-flex items-center text-brand-600 font-semibold hover:text-brand-700 transition-colors"
              >
                View Our Services
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-900">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Need a Custom Solution?
            </h2>
            <p className="mt-4 text-brand-100 max-w-2xl mx-auto">
              Our team of experts is ready to help you find the perfect products and services for your project requirements.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-brand-900 font-semibold hover:bg-brand-50 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                View Projects
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
