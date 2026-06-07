import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const BLUR_PLACEHOLDER = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAAECAACAAMBIgACEQEDEQH/xAAFAAEAAAAAAAAAAAAAAAAAAAAA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABf/2Q==';

interface ContentCardProps {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  /** Top-left chip */
  badge?: string;
  /** Top-right small text */
  meta?: string;
  /** One-line below title */
  subtitle?: string;
  /** Pin icon + text (e.g. project location) */
  location?: string;
  /** When set, the entire card becomes a link */
  href?: string;
  aspect?: 'video' | 'square' | '4/5';
  className?: string;
}

const aspectClasses = {
  video: 'aspect-[16/9]',
  square: 'aspect-square',
  '4/5': 'aspect-[4/5]',
};

function CardInner({
  title,
  description,
  image,
  imageAlt,
  badge,
  meta,
  subtitle,
  location,
  aspect = 'video',
  isLink = false,
}: ContentCardProps & { isLink?: boolean }) {
  return (
    <>
      {/* Image header */}
      <div
        className={cn(
          'relative overflow-hidden bg-neutral-100',
          aspectClasses[aspect],
        )}
      >
        {image && (
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        )}
        {!image && (
          <div className="absolute inset-0 bg-gradient-to-br from-accent-50 to-neutral-100" />
        )}

        {badge && (
          <span className="absolute top-4 left-4 inline-block rounded-full bg-white/95 px-3 py-1 text-xs font-semibold capitalize text-neutral-charcoal shadow-sm">
            {badge}
          </span>
        )}
        {meta && (
          <span className="absolute top-4 right-4 inline-block rounded-full bg-neutral-charcoal/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {meta}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3
          className={cn(
            'font-display text-lg font-bold leading-tight text-neutral-charcoal sm:text-xl',
            isLink && 'transition-colors group-hover:text-accent',
          )}
        >
          {title}
        </h3>

        {subtitle && (
          <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            {subtitle}
          </p>
        )}

        {location && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
            <MapPin className="h-3 w-3 text-accent shrink-0" strokeWidth={1.75} />
            <span>{location}</span>
          </div>
        )}

        {description && (
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">
            {description}
          </p>
        )}

        {isLink && (
          <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            View
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        )}
      </div>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </>
  );
}

export function ContentCard(props: ContentCardProps) {
  const baseClasses = cn(
    'group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
    props.className,
  );

  if (props.href) {
    return (
      <Link href={props.href} className={baseClasses}>
        <CardInner {...props} isLink />
      </Link>
    );
  }

  return (
    <article className={baseClasses}>
      <CardInner {...props} />
    </article>
  );
}
