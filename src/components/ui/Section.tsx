import { Container } from './Container';
import { cn } from '@/lib/utils';

type SectionVariant = 'light' | 'soft' | 'dark';

interface SectionProps {
  children: React.ReactNode;
  variant?: SectionVariant;
  id?: string;
  /** Tighten vertical padding (e.g. for narrow sections) */
  compact?: boolean;
  /** Remove the inner Container wrapper for full-bleed sections */
  noContainer?: boolean;
  className?: string;
  containerClassName?: string;
}

const variantClasses: Record<SectionVariant, string> = {
  light: 'bg-white',
  soft: 'bg-neutral-off-white',
  dark: 'bg-neutral-charcoal text-white',
};

export function Section({
  children,
  variant = 'light',
  id,
  compact = false,
  noContainer = false,
  className,
  containerClassName,
}: SectionProps) {
  const padding = compact ? 'py-12 lg:py-16' : 'py-20 lg:py-28';

  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-24',
        variantClasses[variant],
        padding,
        className,
      )}
    >
      {noContainer ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
