'use client';

import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { ContactCTA } from '@/components/sections';
import {
  EVENTS,
  EVENT_CATEGORY_LABELS,
  type CMSEvent,
  type EventCategory,
} from '@/data/events';
import {
  Calendar,
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

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

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
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg"
    >
      {/* Visual block — real event photo, fall back to gradient+icon */}
      <div className={`relative aspect-[16/10] overflow-hidden ${event.image ? '' : `bg-gradient-to-br ${CATEGORY_GRADIENTS[event.category]} bg-neutral-900`}`}>
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="h-16 w-16 text-white/40" strokeWidth={1.2} />
          </div>
        )}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block px-3 py-1 bg-white/95 text-neutral-900 text-xs font-semibold rounded-full">
            {EVENT_CATEGORY_LABELS[event.category]}
          </span>
        </div>
        {/* Date badge — overlay style matching PDF gallery cards */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="flex items-center bg-accent text-white rounded-lg overflow-hidden shadow-lg">
            <div className="px-3 py-2 text-center border-r border-white/20">
              <div className="text-[10px] font-semibold uppercase tracking-wider opacity-90">
                {event.month}
              </div>
              <div className="text-lg font-bold leading-none">{event.year}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 leading-tight group-hover:text-accent transition-colors">
          {event.title}
        </h3>
        <p className="mt-3 text-sm text-neutral-600 leading-relaxed flex-1">
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

  const categoryEntries = (Object.entries(EVENT_CATEGORY_LABELS) as [EventCategory, string][]).map(
    ([value, label]) => ({ value, label }),
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-neutral-900 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
            >
              Newsroom
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Events, Training &amp; Community
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-xl text-neutral-300 leading-relaxed"
            >
              Product launches, partner training, trade shows, and CSR initiatives —
              moments from across CMS Group ventures since 2017.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="py-12 lg:py-16 bg-neutral-50">
          <Container>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-lg"
            >
              <div className="grid lg:grid-cols-2">
                <div className={`relative aspect-[16/10] lg:aspect-auto bg-gradient-to-br ${CATEGORY_GRADIENTS[featuredEvent.category]} bg-neutral-900`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {(() => {
                      const Icon = CATEGORY_ICONS[featuredEvent.category];
                      return <Icon className="h-24 w-24 text-white/40" strokeWidth={1.2} />;
                    })()}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-4 py-1.5 bg-accent text-white text-sm font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                </div>

                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-sm text-neutral-500 mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 rounded-full">
                      {EVENT_CATEGORY_LABELS[featuredEvent.category]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredEvent.date}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4 group-hover:text-accent transition-colors">
                    {featuredEvent.title}
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    {featuredEvent.description}
                  </p>
                </div>
              </div>
            </motion.article>
          </Container>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-6 bg-white border-b border-neutral-200 sticky top-16 z-20 lg:top-20">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory(ALL_FILTER)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
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
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
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
      <section className="py-16 lg:py-20 bg-neutral-50">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-500">No events found in this category.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Stay Informed</h2>
            <p className="text-neutral-600 mb-8">
              Get notified about upcoming events, product launches, and CSR initiatives
              across CMS Group ventures.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <ContactCTA />
    </>
  );
}
