import { cn } from '@/lib/utils';

interface StatBlockProps {
  value: string;
  label: string;
  description?: string;
  inverted?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: {
    value: 'text-3xl sm:text-4xl',
    label: 'text-xs',
    description: 'text-xs',
  },
  md: {
    value: 'text-4xl sm:text-5xl lg:text-6xl',
    label: 'text-xs sm:text-sm',
    description: 'text-sm',
  },
  lg: {
    value: 'text-5xl sm:text-6xl lg:text-7xl',
    label: 'text-sm',
    description: 'text-sm',
  },
};

export function StatBlock({
  value,
  label,
  description,
  inverted = false,
  size = 'md',
  className,
}: StatBlockProps) {
  const sizes = sizeClasses[size];

  return (
    <div className={cn(className)}>
      <div
        className={cn(
          'font-display font-bold tracking-tight leading-none tabular-nums',
          sizes.value,
          inverted ? 'text-white' : 'text-neutral-charcoal',
        )}
      >
        {value}
      </div>
      <div
        className={cn(
          'mt-3 font-semibold uppercase tracking-[0.16em]',
          sizes.label,
          inverted ? 'text-white/70' : 'text-accent',
        )}
      >
        {label}
      </div>
      {description && (
        <p
          className={cn(
            'mt-3 leading-relaxed',
            sizes.description,
            inverted ? 'text-white/60' : 'text-neutral-600',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
