import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContactCTA } from '@/components/sections';
import { fetchTestimonials } from '@/lib/cms';
import { DELIVERING_VENTURE_LABELS } from '@/lib/constants';
import { Building2, Quote, MapPin } from 'lucide-react';

export default async function TestimonialsPage() {
  const testimonials = await fetchTestimonials();

  return (
    <>
      <PageHero
        kicker="Testimonials"
        title="What our clients say."
        subtitle="Trusted by hospitals, hotels, banks, airports, and residences across Nepal — here is what our clients have to say about working with CMS Trading & Contracting."
        image="/images/projects/ncell-hq.jpg"
        imageAlt="CMS Group projects"
        size="compact"
      />

      <Section variant="light">
        <SectionHeader
          kicker="Client Feedback"
          title="Testimonials across sectors."
          lead="Real feedback from clients across every sector we serve."
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-card"
            >
              <Quote className="h-6 w-6 text-accent/20" strokeWidth={1.5} />
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 italic">
                &ldquo;{t.subject}&rdquo;
              </p>

              {t.scope.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.scope.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent">
                  <Building2 className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-neutral-charcoal truncate">
                    {t.client}
                  </p>
                  {t.location && (
                    <p className="flex items-center gap-1 text-xs text-neutral-500">
                      <MapPin className="h-3 w-3" />
                      {t.location}
                    </p>
                  )}
                  <span className="mt-1 inline-block rounded-full bg-accent-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                    via {DELIVERING_VENTURE_LABELS[t.deliveredBy]}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <ContactCTA />
    </>
  );
}
