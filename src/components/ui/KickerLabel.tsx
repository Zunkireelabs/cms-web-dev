import { cn } from '@/lib/utils';

interface KickerLabelProps {
  children: React.ReactNode;
  className?: string;
  /** When true, renders on dark backgrounds */
  inverted?: boolean;
}

export function KickerLabel({ children, className, inverted = false }: KickerLabelProps) {
  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      <span
        className={cn(
          'h-px w-8 shrink-0',
          inverted ? 'bg-white/40' : 'bg-accent',
        )}
      />
      <span
        className={cn(
          'text-[11px] font-semibold uppercase tracking-[0.22em]',
          inverted ? 'text-white/80' : 'text-accent',
        )}
      >
        {children}
      </span>
    </div>
  );
}
