'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Container } from './Container';
import { KickerLabel } from './KickerLabel';
import { cn } from '@/lib/utils';

const BLUR_PLACEHOLDER = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAAECAACAAMBIgACEQEDEQH/xAAFAAEAAAAAAAAAAAAAAAAAAAAA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABf/2Q==';

interface CTAProps {
  label: string;
  href: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  /** Background image — full-bleed with dark gradient overlay */
  image?: string;
  imageAlt?: string;
  primaryCta?: CTAProps;
  secondaryCta?: CTAProps;
  breadcrumbs?: BreadcrumbItem[];
  /** "tall" for landing pages, "compact" for slug/detail pages */
  size?: 'tall' | 'compact';
  /** CSS object-position for the background image */
  imagePosition?: 'object-center' | 'object-top' | 'object-bottom';
  className?: string;
}

export function PageHero({
  kicker,
  title,
  subtitle,
  image,
  imageAlt,
  primaryCta,
  secondaryCta,
  breadcrumbs,
  size = 'tall',
  imagePosition = 'object-center',
  className,
}: PageHeroProps) {
  const heightClasses =
    size === 'tall'
      ? 'min-h-[480px] py-24 lg:py-32 lg:min-h-[560px]'
      : 'min-h-[320px] py-16 lg:py-24 lg:min-h-[400px]';

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-neutral-charcoal',
        heightClasses,
        className,
      )}
    >
      {/* Background image */}
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            priority
            sizes="100vw"
            className={`object-cover opacity-90 ${imagePosition}`}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-charcoal/95 via-neutral-charcoal/60 to-neutral-charcoal/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-charcoal/80 via-neutral-charcoal/30 to-transparent" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-charcoal via-neutral-800 to-neutral-charcoal" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </>
      )}

      <Container className="relative z-10 flex h-full flex-col justify-end">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 text-white/40" strokeWidth={1.75} />
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="max-w-3xl">
          {kicker && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              <KickerLabel inverted>{kicker}</KickerLabel>
            </motion.div>
          )}

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.08}
            className={cn(
              'mt-5 font-display font-bold tracking-tight text-white leading-[1.05]',
              size === 'tall'
                ? 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl'
                : 'text-3xl sm:text-4xl lg:text-5xl',
            )}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.16}
              className={cn(
                'mt-6 text-white/80 leading-relaxed',
                size === 'tall' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg',
              )}
            >
              {subtitle}
            </motion.p>
          )}

          {(primaryCta || secondaryCta) && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.24}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="group inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-700"
                >
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="group inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10"
                >
                  {secondaryCta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
