'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { ArrowRight } from 'lucide-react';

interface HeroSlide {
  id: number;
  image?: string;
  video?: string;
  alt: string;
  title?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    video: '/images/videos/307398.mp4',
    alt: 'CMS Construction Excellence',
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
      duration: 0.7,
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
      className="relative h-screen min-h-[600px] w-full overflow-hidden -mt-16 lg:-mt-20"
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
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{
              duration: SLIDE_DURATION / 1000,
              ease: 'easeOut',
            }}
            className="absolute inset-0 bg-neutral-900"
          >
            {HERO_SLIDES[currentSlide].video ? (
              <video
                src={HERO_SLIDES[currentSlide].video}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image
                src={HERO_SLIDES[currentSlide].image!}
                alt={HERO_SLIDES[currentSlide].alt}
                fill
                priority={currentSlide === 0}
                className="object-cover"
                sizes="100vw"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Gradient Overlay - heavier at bottom for text, darker at top for navbar */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Content - Bottom Left Aligned */}
      <Container className="relative z-10 flex h-full flex-col justify-end pb-28 sm:pb-32 lg:pb-36">
        <div className="max-w-2xl">
          {/* Gold Accent Line */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <div className="mb-6 h-[3px] w-16 bg-accent" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            CMS <span className="text-accent">Group</span>
          </motion.h1>

          {/* Subtitle - Full Form */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="mt-4 text-sm font-medium uppercase tracking-[0.25em] text-white/70 sm:text-base md:text-lg"
          >
            Construction Material Solutions
          </motion.p>

          {/* Sub-subtitle */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.25}
            className="mt-2 text-base font-normal text-white/50 sm:text-lg"
          >
            Trading and Contracting
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.35}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5"
          >
            <Link
              href="/trading"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-accent/90"
            >
              Trading Division
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contracting"
              className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10"
            >
              Contracting Division
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Current Slide Label */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlide}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-10 text-xs font-medium uppercase tracking-widest text-white/40"
            >
              {HERO_SLIDES[currentSlide].title}
            </motion.p>
          </AnimatePresence>
        </div>
      </Container>

      {/* Slide Indicators - Bottom Center */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={cn(
              'group relative h-[3px] overflow-hidden transition-all duration-300',
              index === currentSlide ? 'w-10 bg-white/40' : 'w-5 bg-white/20 hover:bg-white/30'
            )}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          >
            {index === currentSlide && isAutoPlaying && (
              <motion.div
                key={`progress-${currentSlide}`}
                className="absolute inset-0 origin-left bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Scroll Indicator - Right Side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 right-8 z-20 hidden flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-white/20 pt-1.5"
        >
          <div className="h-1.5 w-0.5 bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
