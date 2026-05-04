'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "CMS Trading & Contracting delivered exceptional quality on our office renovation project. Their attention to detail and professional approach made the entire process seamless.",
    author: "Rajesh Shrestha",
    position: "Managing Director",
    company: "Himalayan Enterprises",
  },
  {
    id: 2,
    quote: "We've been sourcing construction materials from CMS for over 5 years. Their product range and reliable delivery have made them our trusted partner for all projects.",
    author: "Anita Gurung",
    position: "Project Manager",
    company: "BuildTech Nepal",
  },
  {
    id: 3,
    quote: "The team at CMS demonstrated remarkable expertise in interior fit-out work. They completed our hotel lobby renovation ahead of schedule with outstanding results.",
    author: "Sunil Pradhan",
    position: "Operations Head",
    company: "Hotel Everest View",
  },
  {
    id: 4,
    quote: "Their roofing solutions from IKO have been outstanding. The quality and durability exceeded our expectations, and the installation team was highly professional.",
    author: "Bikash Tamang",
    position: "Chief Engineer",
    company: "Nepal Infrastructure Ltd",
  },
  {
    id: 5,
    quote: "CMS provided excellent facade solutions for our commercial building. The Hunter Douglas products they supplied transformed the entire look of our property.",
    author: "Priya Sharma",
    position: "Property Developer",
    company: "Sharma Constructions",
  },
  {
    id: 6,
    quote: "From ceiling systems to door hardware, CMS has been our one-stop solution. Their technical support and after-sales service are truly commendable.",
    author: "Deepak Maharjan",
    position: "Procurement Manager",
    company: "Kathmandu Mall",
  },
  {
    id: 7,
    quote: "Working with CMS on our hospital project was a pleasure. They understood our strict requirements and delivered medical-grade interiors on time.",
    author: "Dr. Suman Rana",
    position: "Director",
    company: "Nepal Medical Center",
  },
  {
    id: 8,
    quote: "The waterproofing solutions provided by CMS saved our basement from recurring leakage issues. Their Schomburg products are top-notch.",
    author: "Ramesh Adhikari",
    position: "Facility Manager",
    company: "Corporate Tower Nepal",
  },
  {
    id: 9,
    quote: "CMS's contracting team handled our restaurant fit-out with creativity and precision. The final result exceeded our vision for the space.",
    author: "Sita Basnet",
    position: "Owner",
    company: "The Himalayan Kitchen",
  },
];

interface TestimonialCardProps {
  testimonial: typeof TESTIMONIALS[0];
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm h-full flex flex-col">
      {/* Quote icon */}
      <div className="flex justify-end mb-4">
        <Quote className="h-8 w-8 text-accent/30" />
      </div>

      {/* Quote text */}
      <blockquote className="text-base md:text-lg text-neutral-700 leading-relaxed mb-6 flex-grow">
        "{testimonial.quote}"
      </blockquote>

      {/* Author info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-lg">
            {testimonial.author.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-semibold text-neutral-900">
            {testimonial.author}
          </p>
          <p className="text-sm text-neutral-500">
            {testimonial.position}, {testimonial.company}
          </p>
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

  // Number of cards visible at once (responsive)
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

  // Auto-play with slow interval (6 seconds)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Get visible testimonials (3 at a time, wrapping around)
  const getVisibleTestimonials = () => {
    const visible = [];
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-neutral-900">
            What Our Clients Say
          </h2>
          <p className="text-lg text-neutral-600 mt-4">
            Trusted by leading businesses across Nepal
          </p>
        </div>

        <div className="relative">
          {/* Navigation arrows */}
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

          {/* Cards container */}
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

          {/* Dots navigation */}
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

          {/* Counter */}
          <div className="text-center mt-4 text-sm text-neutral-500">
            {currentIndex + 1} / {TESTIMONIALS.length}
          </div>
        </div>
      </Container>
    </section>
  );
}
