'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import {
  ArrowRight,
  Home,
  Building,
  Layers,
  Building2,
  PaintBucket,
  Lock,
  Fence,
  Droplets,
  Trash2,
  Bath,
  Grid3x3,
  Footprints,
  LucideIcon,
} from 'lucide-react';

interface Product {
  title: string;
  icon: LucideIcon;
  image: string;
  link: string;
}

const PRODUCTS: Product[] = [
  { title: 'Roofing Systems', icon: Home, image: '/images/products/roofing-new.jpg', link: '/trading/roofing' },
  { title: 'Facade Solutions', icon: Building, image: '/images/products/facade-new.jpg', link: '/trading/facade-solutions' },
  { title: 'Ceiling Systems', icon: Layers, image: '/images/products/ceiling.jpg', link: '/trading/ceiling-systems' },
  { title: 'Aluminium Doors & Windows', icon: Building2, image: '/images/products/aluminum-dw.jpg', link: '/trading/aluminum-doors-windows' },
  { title: 'Wood & Glass Coating', icon: PaintBucket, image: '/images/products/wood-glass.jpg', link: '/trading/wood-glass-metal-coating' },
  { title: 'Access Control Solutions', icon: Lock, image: '/images/products/door-hardware.jpg', link: '/trading/door-hardware' },
  { title: 'Architectural Railings', icon: Fence, image: '/images/products/railings.jpg', link: '/trading/architectural-railings' },
  { title: 'Waterproofing Systems', icon: Droplets, image: '/images/products/waterproofing.jpg', link: '/trading/waterproofing' },
  { title: 'Wastewater Management', icon: Trash2, image: '/images/products/wastewater.jpg', link: '/trading/wastewater-management' },
  { title: 'Sanitaryware', icon: Bath, image: '/images/products/sanitaryware.jpg', link: '/trading/sanitaryware' },
  { title: 'Tiles', icon: Grid3x3, image: '/images/products/sanitaryware.jpg', link: '/trading/tiles' },
  { title: 'Flooring', icon: Footprints, image: '/images/products/wood-glass.jpg', link: '/trading/flooring' },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={product.link} className="group block bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
        {/* Image with gold bottom border */}
        <div className="relative aspect-[6/5] overflow-hidden bg-neutral-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Hover overlay content */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-white text-xs font-medium uppercase tracking-wider opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <span>Explore</span>
            <ArrowRight className="h-3 w-3" />
          </div>

          {/* Gold bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
        </div>

        {/* Title below image */}
        <div className="flex items-center gap-2.5 px-3.5 py-3.5">
          <product.icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
          <span className="text-sm font-medium text-neutral-700 leading-tight group-hover:text-accent transition-colors">
            {product.title}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductsServices() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-neutral-50">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                Products &amp; Services
              </span>
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight leading-[1.1] text-neutral-charcoal sm:text-4xl lg:text-5xl">
              Twelve specialised domains.
              <br />
              50+ global brand partners.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              Integrated building solutions distributed in Nepal — from roofing and
              facades to sanitaryware, tiles, and access control.
            </p>
          </div>
          <span className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            12 Domains
          </span>
        </motion.div>

        {/* 4x3 Grid (12 domains) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.title} product={product} index={index} />
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/trading"
            className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 bg-accent text-white font-semibold transition-colors hover:bg-accent-700 text-sm uppercase tracking-wider"
          >
            Trading Division
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contracting"
            className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 border-2 border-accent text-accent font-semibold transition-all hover:bg-accent hover:text-white text-sm uppercase tracking-wider"
          >
            Contracting Division
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
