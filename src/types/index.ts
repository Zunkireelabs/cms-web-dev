import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Address {
  street: string;
  city: string;
  country: string;
  postal?: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  phone: string;
  phoneSecondary?: string;
  email: string;
  address: Address;
}

export interface Director {
  name: string;
  title: string;
  company: string;
  bio: string;
  summary?: string;
  photo?: string;
  order: number;
}

export interface Milestone {
  year: number;
  venture: string;
  description: string;
  logo?: string;
}

export interface Sector {
  name: string;
  slug: string;
  icon: LucideIcon;
  summary: string;
  description: string;
}

export interface VentureProduct {
  name: string;
  image?: string;
}

export interface Venture {
  name: string;
  shortName: string;
  slug: string;
  founded: number;
  tagline?: string;
  description: string;
  logo?: string;
  products: VentureProduct[];
  brands: string[];
}

export interface Brand {
  name: string;
  slug: string;
  logo?: string;
  countryOfOrigin?: string;
  founded?: number;
  segments: string[];
  ventures: string[];
}

export interface Project {
  name: string;
  slug: string;
  location: string;
  sector: string;
  image?: string;
  supplied?: string;
  brands?: string[];
  description?: string;
}

export interface Testimonial {
  client: string;
  quote?: string;
  letterImage?: string;
  subject?: string;
  date?: string;
  sector?: string;
}

export interface EventItem {
  title: string;
  date: string;
  description?: string;
  images?: string[];
  category?: string;
}

export interface Certificate {
  partner: string;
  title?: string;
  validity?: string;
  image?: string;
}
