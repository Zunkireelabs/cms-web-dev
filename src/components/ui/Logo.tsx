import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'light';
  className?: string;
}

export function Logo({ variant = 'default', className }: LogoProps) {
  return (
    <div
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-lg',
        variant === 'light' ? 'bg-white/10' : 'bg-brand-600',
        className
      )}
      aria-hidden="true"
    >
      <span className="text-lg font-bold text-white">CMS</span>
    </div>
  );
}
