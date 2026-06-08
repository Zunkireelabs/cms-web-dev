'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { KickerLabel } from '@/components/ui/KickerLabel';
import {
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Factory,
  Globe2,
  HardHat,
  Home,
  Hospital,
  Landmark,
  MapPin,
  PencilRuler,
  Quote,
  type LucideIcon,
} from 'lucide-react';
import {
  TESTIMONIALS,
  DELIVERING_VENTURE_LABELS,
  type Testimonial,
  type ClientType,
} from '@/data/testimonials';

const CLIENT_TYPE_ICONS: Record<ClientType, LucideIcon> = {
  hotel: Building2,
  hospital: Hospital,
  construction: HardHat,
  architecture: PencilRuler,
  industrial: Factory,
  government: Landmark,
  international: Globe2,
  residential: Home,
};

const CLIENT_TYPE_LABELS: Record<ClientType, string> = {
  hotel: 'Hospitality',
  hospital: 'Healthcare',
  construction: 'Construction',
  architecture: 'Architecture',
  industrial: 'Industrial',
  government: 'Government',
  international: 'International',
  residential: 'Residential',
};

// Sector-themed bright fallback photos per client type
const CLIENT_TYPE_PHOTO: Record<ClientType, string> = {
  hotel: '/images/projects/hospitality.jpg',
  hospital: '/images/projects/healthcare.jpg',
  construction: '/images/projects/country-villa.jpg',
  architecture: '/images/projects/residential.jpg',
  industrial: '/images/projects/infrastructure.jpg',
  government: '/images/projects/government.jpg',
  international: '/images/projects/icimod.jpg',
  residential: '/images/projects/residential.jpg',
};

// Direct project matches override the sector fallback
const TESTIMONIAL_PHOTO_OVERRIDE: Record<string, string> = {
  'ziec-bir-hospital': '/images/projects/bir-hospital.jpg',
  'airtech-tiger-palace': '/images/projects/tiger-palace.jpg',
  icimod: '/images/projects/icimod.jpg',
  'adrisiya-nirman': '/images/projects/attorney-general.jpg',
  'himalayan-builders': '/images/projects/government.jpg',
  'maruti-cements': '/images/projects/infrastructure.jpg',
  'nanc-police': '/images/projects/government.jpg',
  'hama-iron-steel': '/images/projects/infrastructure.jpg',
  'kemtex-nepal': '/images/projects/ncell-hq.jpg',
  'kedia-construction': '/images/projects/country-villa.jpg',
};

// Use the actual signed reference letter scan when available; fall back to project photo
function getTestimonialPhoto(t: Testimonial): { src: string; isLetter: boolean } {
  if (t.scanImage) return { src: t.scanImage, isLetter: true };
  const fallback = TESTIMONIAL_PHOTO_OVERRIDE[t.id] ?? CLIENT_TYPE_PHOTO[t.clientType];
  return { src: fallback, isLetter: false };
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const Icon = CLIENT_TYPE_ICONS[testimonial.clientType];
  const { src: photoSrc, isLetter } = getTestimonialPhoto(testimonial);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Visual header — actual letter scan (portrait) or project photo (wide) */}
      <div
        className={`relative overflow-hidden bg-neutral-100 ${
          isLetter ? 'aspect-[4/5]' : 'aspect-[16/10]'
        }`}
      >
        <Image
          src={photoSrc}
          alt={`${testimonial.client} — ${
            isLetter ? 'signed reference letter' : testimonial.project ?? testimonial.subject
          }`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={
            isLetter
              ? 'object-contain p-3'
              : 'object-cover transition-transform duration-500 group-hover:scale-[1.04]'
          }
        />

        {/* For project photos: gradient overlay + project badge. For letters: clean overlay-free presentation. */}
        {!isLetter && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-charcoal/85 via-neutral-charcoal/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                {CLIENT_TYPE_LABELS[testimonial.clientType]}
              </p>
              {testimonial.project && (
                <p className="mt-1 truncate font-display text-base font-bold leading-tight text-white">
                  {testimonial.project}
                </p>
              )}
            </div>
          </>
        )}

        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-sm">
          Signed Reference
        </span>
      </div>

      <div className="relative flex flex-1 flex-col p-6 lg:p-7">
        {/* Faint Quote watermark */}
        <Quote
          className="pointer-events-none absolute right-5 top-5 h-10 w-10 text-accent/15"
          strokeWidth={1.25}
        />

        {/* Subject */}
        <h3 className="font-display text-base font-bold leading-snug text-neutral-charcoal lg:text-lg">
          {testimonial.subject}
        </h3>

        {/* Scope */}
        {testimonial.scope.length > 0 && (
          <ul className="mt-4 space-y-2">
            {testimonial.scope.slice(0, 4).map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-600"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
            {testimonial.scope.length > 4 && (
              <li className="pl-4 text-xs text-neutral-400">
                + {testimonial.scope.length - 4} more
              </li>
            )}
          </ul>
        )}

        <div className="flex-1" />

        {/* Footer: client + via venture + date */}
        <div className="mt-5 flex items-end justify-between gap-3 border-t border-neutral-100 pt-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-white">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-bold leading-tight text-neutral-charcoal">
                {testimonial.client}
              </p>
              {testimonial.location && (
                <p className="mt-0.5 flex items-center gap-1 text-[10px] text-neutral-500">
                  <MapPin className="h-2.5 w-2.5" strokeWidth={1.75} />
                  {testimonial.location}
                </p>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              via {DELIVERING_VENTURE_LABELS[testimonial.deliveredBy]}
            </p>
            <p className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-neutral-400">
              <CalendarDays className="h-2.5 w-2.5" strokeWidth={1.75} />
              {formatDate(testimonial.date)}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </article>
  );
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const visibleCards = 3;
  const totalSlides = TESTIMONIALS.length;

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [totalSlides, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [totalSlides, isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => {
      setIsTransitioning(false);
      setIsAutoPlaying(true);
    }, 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const getVisibleTestimonials = () => {
    const visible: (Testimonial & { displayIndex: number })[] = [];
    for (let i = 0; i < visibleCards; i++) {
      const index = (currentIndex + i) % totalSlides;
      visible.push({ ...TESTIMONIALS[index], displayIndex: index });
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section className="bg-neutral-off-white py-20 lg:py-28">
      <Container>
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="flex justify-center">
            <KickerLabel>Client References</KickerLabel>
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-neutral-charcoal sm:text-4xl lg:text-5xl">
            What our clients say.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            {totalSlides} signed reference letters from hotels, hospitals, government
            offices, and contractors across Nepal.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => {
              prevSlide();
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 5000);
            }}
            className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-600 shadow-lg transition-all hover:text-accent hover:shadow-xl md:-translate-x-4"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => {
              nextSlide();
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 5000);
            }}
            className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 translate-x-2 items-center justify-center rounded-full bg-white text-neutral-600 shadow-lg transition-all hover:text-accent hover:shadow-xl md:translate-x-4"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="overflow-hidden px-8 md:px-16">
            <div
              ref={trackRef}
              className="grid grid-cols-1 gap-6 transition-all duration-700 ease-in-out md:grid-cols-3"
            >
              {visibleTestimonials.map((testimonial, idx) => (
                <div key={`${testimonial.id}-${currentIndex}-${idx}`} className="animate-fade-in">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-accent'
                    : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
            {currentIndex + 1} / {TESTIMONIALS.length}
          </div>
        </div>
      </Container>
    </section>
  );
}
