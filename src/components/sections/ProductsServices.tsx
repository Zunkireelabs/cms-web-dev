'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bath,
  Building,
  Building2,
  Droplets,
  Fence,
  Footprints,
  Grid3x3,
  Home,
  Layers,
  Lock,
  type LucideIcon,
  PaintBucket,
  Package,
  ShieldAlert,
  Sofa,
  Trash2,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { KickerLabel } from '@/components/ui/KickerLabel';
import { fadeUp, stagger } from '@/lib/motion';
import type { CmsProductDomain } from '@/lib/cms';
import { tradingHref } from '@/lib/routes';

// The CMS has no icon field on Product Domains — icons are a design choice,
// not editorial content, so they're kept here and matched by slug. New
// domains without an entry fall back to a generic icon rather than crashing.
const ICONS_BY_SLUG: Record<string, LucideIcon> = {
  'roofing': Home,
  'facade-solutions': Building,
  'ceiling-systems': Layers,
  'aluminum-doors-windows': Building2,
  'wood-glass-metal-coating': PaintBucket,
  'door-hardware': Lock,
  'architectural-railings': Fence,
  'waterproofing': Droplets,
  'wastewater-management': Trash2,
  'sanitaryware': Bath,
  'flooring': Footprints,
  'tiles': Grid3x3,
  'fire-rated-doors': ShieldAlert,
  'office-furnitures': Sofa,
};
const FALLBACK_ICON = Package;

function ProductCard({ product, index }: { product: CmsProductDomain; index: number }) {
  const Icon = ICONS_BY_SLUG[product.slug] ?? FALLBACK_ICON;

  return (
    <motion.div variants={fadeUp} custom={index * 0.04}>
      <Link
        href={tradingHref(product.slug)}
        className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
      >
        <div className="relative aspect-[6/5] overflow-hidden bg-neutral-100">
          {product.image && (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute bottom-3 left-3 right-3 flex translate-y-2 items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span>Explore</span>
            <ArrowRight className="h-3 w-3" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
        </div>

        <div className="flex items-center gap-2.5 px-3.5 py-3.5">
          <Icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
          <span className="text-sm font-semibold leading-tight text-neutral-700 transition-colors group-hover:text-accent">
            {product.title}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductsServices({ products }: { products: CmsProductDomain[] }) {
  return (
    <Section variant="soft">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
        custom={0}
        className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-2xl">
          <KickerLabel>Products & Services</KickerLabel>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-neutral-charcoal sm:text-4xl lg:text-5xl">
            Leading Building Solutions.
            <br />
            Global Brand Partners
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Integrated building solutions distributed in Nepal — from roofing and facades to
            sanitaryware, flooring, and door hardware.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5"
      >
        {products.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} />
        ))}
      </motion.div>

    </Section>
  );
}
