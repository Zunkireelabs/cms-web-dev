'use client';

import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { ContactCTA } from '@/components/sections';
import { fadeUp } from '@/lib/motion';
import {
  EVENTS,
  EVENT_CATEGORY_LABELS,
  type CMSEvent,
  type EventCategory,
} from '@/data/events';
import {
  Calendar,
  CalendarOff,
  Flag,
  GraduationCap,
  Handshake,
  Heart,
  Megaphone,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

const CATEGORY_ICONS: Record<EventCategory, LucideIcon> = {
  training: GraduationCap,
  partnership: Handshake,
  csr: Heart,
  'trade-show': Megaphone,
  internal: Sparkles,
  milestone: Flag,
};

const CATEGORY_GRADIENTS: Record<EventCategory, string> = {
  training: 'from-blue-500/20 to-blue-700/40',
  partnership: 'from-amber-500/20 to-amber-700/40',
  csr: 'from-rose-500/20 to-rose-700/40',
  'trade-show': 'from-violet-500/20 to-violet-700/40',
  internal: 'from-emerald-500/20 to-emerald-700/40',
  milestone: 'from-orange-500/30 to-orange-700/50',
};

const ALL_FILTER = 'all' as const;
type FilterValue = EventCategory | typeof ALL_FILTER;

function EventCard({ event, index }: { event: CMSEvent; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = CATEGORY_ICONS[event.category];

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={index * 0.04}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className={`relative aspect-[16/10] overflow-hidden ${
          event.image ? '' : `bg-gradient-to-br ${CATEGORY_GRADIENTS[event.category]} bg-neutral-charcoal`
        }`}
      >
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="h-16 w-16 text-white/40" strokeWidth={1.2} />
          </div>
        )}

        <span className="absolute top-4 left-4 z-10 inline-block rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-neutral-charcoal shadow-sm">
          {EVENT_CATEGORY_LABELS[event.category]}
        </span>

        {/* Date stamp — accent block */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center overflow-hidden rounded-lg bg-accent text-white shadow-lg">
          <div className="px-3 py-2 text-center">
            <div className="text-[10px] font-semibold uppercase tracking-wider opacity-90">
              {event.month}
            </div>
            <div className="font-display text-lg font-bold leading-none">{event.year}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold leading-tight text-neutral-charcoal transition-colors group-hover:text-accent sm:text-xl">
          {event.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
          {event.description}
        </p>
        <div className="mt-5 flex items-center gap-2 text-xs text-neutral-400">
          <Calendar className="h-3.5 w-3.5" />
          {event.date}
        </div>
      </div>
    </motion.article>
  );
}

export default function NewsroomPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilterValue>(ALL_FILTER);

  const featuredEvent = EVENTS.find((e) => e.featured);
  const filteredEvents = useMemo(
    () =>
      EVENTS.filter((e) => {
        if (e.featured) return false;
        if (selectedCategory === ALL_FILTER) return true;
        return e.category === selectedCategory;
      }),
    [selectedCategory],
  );

  const categoryEntries = (
    Object.entries(EVENT_CATEGORY_LABELS) as [EventCategory, string][]
  ).map(([value, label]) => ({ value, label }));

  return (
    <>
      <PageHero
        kicker="Newsroom"
        title="Events, training & community."
        subtitle="Product launches, partner training, trade shows, and CSR initiatives — moments from across CMS Group ventures since 2017."
        image="/images/projects/lumbini-convention.jpg"
        imageAlt="CMS Group events and community"
        size="tall"
      />

      {/* Featured Event */}
      {featuredEvent && (
        <Section variant="soft" compact>
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card"
          >
            <div className="grid lg:grid-cols-2">
              <div
                className={`relative aspect-[16/10] bg-gradient-to-br lg:aspect-auto ${CATEGORY_GRADIENTS[featuredEvent.category]} bg-neutral-charcoal`}
              >
                {featuredEvent.image ? (
                  <Image
                    src={featuredEvent.image}
                    alt={featuredEvent.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {(() => {
                      const Icon = CATEGORY_ICONS[featuredEvent.category];
                      return <Icon className="h-24 w-24 text-white/40" strokeWidth={1.2} />;
                    })()}
                  </div>
                )}
                <span className="absolute top-4 left-4 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-white shadow-sm">
                  Featured
                </span>
              </div>

              <div className="flex flex-col justify-center p-8 lg:p-10">
                <div className="mb-4 flex items-center gap-3 text-sm text-neutral-500">
                  <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                    {EVENT_CATEGORY_LABELS[featuredEvent.category]}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {featuredEvent.date}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold leading-tight text-neutral-charcoal transition-colors group-hover:text-accent sm:text-3xl lg:text-4xl">
                  {featuredEvent.title}
                </h2>
                <p className="mt-5 leading-relaxed text-neutral-600">
                  {featuredEvent.description}
                </p>
              </div>
            </div>
          </motion.article>
        </Section>
      )}

      {/* Category Filter */}
      <section className="sticky top-16 z-20 border-y border-neutral-200 bg-white/95 py-4 backdrop-blur-md lg:top-20">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory(ALL_FILTER)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                selectedCategory === ALL_FILTER
                  ? 'bg-accent text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              All Events
              <span className="ml-1.5 text-xs opacity-70">
                ({EVENTS.filter((e) => !e.featured).length})
              </span>
            </button>
            {categoryEntries.map(({ value, label }) => {
              const count = EVENTS.filter((e) => !e.featured && e.category === value).length;
              if (count === 0) return null;
              return (
                <button
                  key={value}
                  onClick={() => setSelectedCategory(value)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === value
                      ? 'bg-accent text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {label}
                  <span className="ml-1.5 text-xs opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Events Grid */}
      <Section variant="soft">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-8 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-accent">
              <CalendarOff className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-neutral-charcoal">
              No events in this category
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
              Try a different category, or browse all events.
            </p>
          </div>
        )}
      </Section>

      {/* Newsletter CTA */}
      <Section variant="light" compact>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-neutral-charcoal sm:text-4xl">
            Stay informed.
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-600">
            Get notified about upcoming events, product launches, and CSR initiatives across
            CMS Group ventures.
          </p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-neutral-300 px-5 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Section>

      <ContactCTA />
    </>
  );
}
