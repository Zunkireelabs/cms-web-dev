import Image from 'next/image';
import { Building2, ExternalLink, Eye, FileDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BrandCardProps {
  name: string;
  country?: string;
  founded?: number;
  specialty?: string;
  description?: string;
  logoUrl?: string;
  websiteUrl?: string;
  brochureUrl?: string;
  className?: string;
}

export function BrandCard({
  name,
  country,
  founded,
  specialty,
  description,
  logoUrl,
  websiteUrl,
  brochureUrl,
  className,
}: BrandCardProps) {
  const hasBrochure = Boolean(brochureUrl) && brochureUrl !== '#';

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg',
        className,
      )}
    >
      <div className="grid gap-8 p-8 lg:grid-cols-[200px_1fr] lg:p-10">
        {/* Logo box */}
        <div className="flex h-32 lg:h-full items-center justify-center rounded-xl border border-neutral-200 bg-neutral-off-white p-6">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`${name} logo`}
              width={200}
              height={120}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-neutral-300">
              <Building2 className="h-8 w-8" strokeWidth={1.25} />
              <span className="text-[10px] uppercase tracking-wider font-medium">
                Logo
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <h3 className="font-display text-2xl font-bold text-neutral-charcoal lg:text-3xl">
              {name}
            </h3>
            {founded && (
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Est. {founded}
              </span>
            )}
          </div>

          {country && <p className="mt-1 text-sm text-neutral-500">{country}</p>}

          {specialty && (
            <p className="mt-4 text-sm font-bold uppercase tracking-wider text-accent">
              {specialty}
            </p>
          )}

          {description && (
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {description}
            </p>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-700"
              >
                Visit Brand
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}

            {hasBrochure ? (
              <>
                <a
                  href={brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-accent/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-accent transition-colors hover:bg-accent-50"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View
                </a>
                <a
                  href={brochureUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-accent/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-accent transition-colors hover:bg-accent-50"
                >
                  <FileDown className="h-3.5 w-3.5" />
                  Download
                </a>
              </>
            ) : (
              <button
                disabled
                className="inline-flex items-center gap-2 rounded-lg border-2 border-neutral-200 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-400 cursor-not-allowed"
                title="Brochure coming soon"
              >
                <FileDown className="h-3.5 w-3.5" />
                Brochure
                <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[9px] font-medium uppercase">
                  Soon
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </div>
  );
}
