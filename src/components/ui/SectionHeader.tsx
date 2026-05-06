'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { KickerLabel } from './KickerLabel';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  inverted?: boolean;
  className?: string;
  /** Render as h1 instead of the default h2 (use for page heroes only) */
  as?: 'h1' | 'h2';
}

export function SectionHeader({
  kicker,
  title,
  lead,
  align = 'left',
  inverted = false,
  className,
  as: Heading = 'h2',
}: SectionHeaderProps) {
  const alignClasses = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn('max-w-3xl', alignClasses, className)}
    >
      {kicker && (
        <motion.div
          variants={fadeUp}
          custom={0}
          className={align === 'center' ? 'flex justify-center' : ''}
        >
          <KickerLabel inverted={inverted}>{kicker}</KickerLabel>
        </motion.div>
      )}
      <motion.div variants={fadeUp} custom={kicker ? 0.08 : 0}>
        <Heading
          className={cn(
            'mt-4 font-display text-3xl font-bold tracking-tight leading-[1.1] sm:text-4xl lg:text-5xl',
            inverted ? 'text-white' : 'text-neutral-charcoal',
          )}
        >
          {title}
        </Heading>
      </motion.div>
      {lead && (
        <motion.p
          variants={fadeUp}
          custom={0.16}
          className={cn(
            'mt-5 text-base leading-relaxed sm:text-lg',
            inverted ? 'text-white/70' : 'text-neutral-600',
          )}
        >
          {lead}
        </motion.p>
      )}
    </motion.div>
  );
}
