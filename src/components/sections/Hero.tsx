'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';

interface HeroSlide {
  id: number;
  image: string;
  alt: string;
  title?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: '/images/hero/project-1.jpg',
    alt: 'Construction workers at project site',
    title: 'Construction Excellence',
  },
  {
    id: 2,
    image: '/images/hero/project-3.jpg',
    alt: 'Modern glass skyscraper',
    title: 'Commercial Development',
  },
  {
    id: 3,
    image: '/images/hero/project-5.jpg',
    alt: 'Industrial construction site',
    title: 'Industrial Projects',
  },
  {
    id: 4,
    image: '/images/hero/project-6.jpg',
    alt: 'Modern residential development',
    title: 'Property Development',
  },
];

const SLIDE_DURATION = 6000;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const paginate = useCallback((newDirection: number) => {
    setCurrentSlide((prev) => {
      const nextSlide = prev + newDirection;
      if (nextSlide < 0) return HERO_SLIDES.length - 1;
      if (nextSlide >= HERO_SLIDES.length) return 0;
      return nextSlide;
    });
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      paginate(1);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isAutoPlaying, paginate]);

  return (
    <section
      className="relative h-screen min-h-[600px] w-full overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Slides with Zoom-Out Animation */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Image with Zoom-Out Effect */}
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{
              duration: SLIDE_DURATION / 1000,
              ease: 'easeOut',
            }}
            className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-neutral-charcoal"
          >
            <Image
              src={HERO_SLIDES[currentSlide].image}
              alt={HERO_SLIDES[currentSlide].alt}
              fill
              priority={currentSlide === 0}
              className="object-cover"
              sizes="100vw"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-black/60 via-neutral-black/50 to-neutral-black/70" />

      {/* Content */}
      <Container className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        {/* CMS Group Branding */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-6"
        >
          <h1 className="text-6xl font-black tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
            CMS <span className="text-brand-400">Group</span>
          </h1>
        </motion.div>

        {/* Full Form */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="mb-8"
        >
          <p className="text-xl font-medium tracking-[0.2em] text-white/80 uppercase sm:text-2xl md:text-3xl">
            Construction Material Solutions
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.15}
          className="mb-8 h-px w-24 bg-gradient-to-r from-transparent via-brand-400 to-transparent sm:w-32"
        />

        {/* Services */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mb-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {[
            'Manufacturing',
            'Constructions',
            'Renewable Energy',
            'Mining',
            'Developer',
            'E-commerce',
            'Contracting',
          ].map((service) => (
            <span
              key={service}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-brand-400/50 hover:bg-brand-400/20 sm:px-5 sm:py-2.5 sm:text-base"
            >
              {service}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="mt-4 flex flex-col gap-4 sm:flex-row sm:gap-6"
        >
          <Link
            href="/trading"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-brand-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            <span className="relative z-10">Explore Trading</span>
            <motion.div
              className="absolute inset-0 bg-brand-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ type: 'tween', duration: 0.3 }}
            />
          </Link>

          <Link
            href="/contracting"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            <span className="relative z-10">Explore Contracting</span>
          </Link>
        </motion.div>

        {/* Current Project Label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-10 text-sm text-white/60"
          >
            {HERO_SLIDES[currentSlide].title}
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={cn(
              'group relative h-2 overflow-hidden rounded-full transition-all duration-300',
              index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            )}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          >
            {index === currentSlide && isAutoPlaying && (
              <motion.div
                key={`progress-${currentSlide}`}
                className="absolute inset-0 origin-left bg-brand-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 sm:left-8"
        aria-label="Previous slide"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 sm:right-8"
        aria-label="Next slide"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 right-8 z-20 hidden flex-col items-center gap-2 text-white/60 lg:flex"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="h-6 w-4 rounded-full border-2 border-white/40 p-1"
        >
          <div className="h-1 w-1 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
