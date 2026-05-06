'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  CalendarDays,
  Quote,
  type LucideIcon,
  Building2,
  Hospital,
  HardHat,
  PencilRuler,
  Factory,
  Landmark,
  Globe2,
  Home,
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

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const Icon = CLIENT_TYPE_ICONS[testimonial.clientType];

  return (
    <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col border border-neutral-100 overflow-hidden">
      {/* Letter scan thumbnail */}
      {testimonial.scanImage && (
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-50 border-b border-neutral-100">
          <Image
            src={testimonial.scanImage}
            alt={`${testimonial.client} testimonial letter`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-3"
          />
        </div>
      )}

      <div className="p-6 md:p-8 flex flex-col flex-1">
        {/* Top: client + type */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-neutral-900 text-sm leading-tight truncate">
                {testimonial.client}
              </p>
              <p className="text-[11px] uppercase tracking-wider text-neutral-400 mt-0.5">
                {CLIENT_TYPE_LABELS[testimonial.clientType]}
              </p>
            </div>
          </div>
          <Quote className="h-6 w-6 text-accent/20 shrink-0" />
        </div>

        {/* Subject */}
        <h3 className="text-base font-semibold text-neutral-900 leading-snug">
          {testimonial.subject}
        </h3>

        {/* Scope */}
        <ul className="mt-4 space-y-1.5 flex-grow">
          {testimonial.scope.slice(0, 4).map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-neutral-600">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
          {testimonial.scope.length > 4 && (
            <li className="text-[11px] text-neutral-400 pl-3">
              + {testimonial.scope.length - 4} more
            </li>
          )}
        </ul>

        {/* Project + location */}
        {(testimonial.project || testimonial.location) && (
          <div className="mt-5 pt-4 border-t border-neutral-100 space-y-1.5">
            {testimonial.project && (
              <p className="text-xs font-medium text-neutral-700 leading-tight">
                {testimonial.project}
              </p>
            )}
            {testimonial.location && (
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                <MapPin className="h-3 w-3" strokeWidth={1.5} />
                <span>{testimonial.location}</span>
              </div>
            )}
          </div>
        )}

        {/* Footer: delivered by + date */}
        <div className="mt-4 flex items-center justify-between gap-3 text-[10px] uppercase tracking-wider">
          <span className="font-semibold text-accent">
            via {DELIVERING_VENTURE_LABELS[testimonial.deliveredBy]}
          </span>
          <span className="flex items-center gap-1 text-neutral-400">
            <CalendarDays className="h-3 w-3" strokeWidth={1.5} />
            {formatDate(testimonial.date)}
          </span>
        </div>
      </div>
    </div>
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
    <section className="py-20 lg:py-28 bg-neutral-100">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
            Client References
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-medium text-neutral-900">
            What Our Clients Say
          </h2>
          <p className="text-lg text-neutral-600 mt-4">
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-neutral-600 hover:text-accent hover:shadow-xl transition-all"
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
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-neutral-600 hover:text-accent hover:shadow-xl transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="overflow-hidden px-8 md:px-16">
            <div
              ref={trackRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ease-in-out"
            >
              {visibleTestimonials.map((testimonial, idx) => (
                <div
                  key={`${testimonial.id}-${currentIndex}-${idx}`}
                  className="animate-fade-in"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-10">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-accent w-8'
                    : 'bg-neutral-300 hover:bg-neutral-400 w-2.5'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-4 text-sm text-neutral-500">
            {currentIndex + 1} / {TESTIMONIALS.length}
          </div>
        </div>
      </Container>
    </section>
  );
}
