import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'white';
}

export function Logo({ className, variant = 'dark' }: LogoProps) {
  return (
    <div
      className={cn(
        'relative h-10 w-auto',
        className
      )}
      aria-hidden="true"
    >
      <Image
        src="/images/logo/cms-logo.png"
        alt="CMS Logo"
        width={120}
        height={40}
        className="h-10 w-auto object-contain transition-all duration-300"
        style={variant === 'white' ? { filter: 'invert(1)' } : undefined}
        priority
      />
    </div>
  );
}
