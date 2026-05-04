import {
  Building2,
  Wrench,
  Truck,
  HardHat,
  Warehouse,
  PaintBucket,
} from 'lucide-react';
import type { NavItem, Service, SiteConfig } from '@/types';

export const SITE_CONFIG: SiteConfig = {
  name: 'CMS Trading & Contracting',
  shortName: 'CMS T&C',
  description:
    'Delivering excellence in construction, contracting, and trading services. Your trusted partner for commercial and industrial projects.',
  url: 'https://cmstc.com',
  phone: '+974 4444 5555',
  email: 'info@cmstc.com',
  address: {
    street: 'Tara Bhawan',
    city: 'Kathmandu',
    country: 'Nepal',
  },
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products & Services', href: '/trading' },
  { label: 'Brands', href: '/brands' },
  { label: 'Projects', href: '/projects' },
  { label: 'Career', href: '/career' },
  { label: 'Contact', href: '/contact' },
];

export const SERVICES: Service[] = [
  {
    name: 'General Contracting',
    slug: 'general-contracting',
    description: 'Full-service construction management and general contracting.',
    icon: Building2,
  },
  {
    name: 'MEP Services',
    slug: 'mep-services',
    description: 'Mechanical, electrical, and plumbing installation and maintenance.',
    icon: Wrench,
  },
  {
    name: 'Trading & Supply',
    slug: 'trading-supply',
    description: 'Quality construction materials and equipment supply.',
    icon: Truck,
  },
  {
    name: 'Project Management',
    slug: 'project-management',
    description: 'Professional project oversight from conception to completion.',
    icon: HardHat,
  },
  {
    name: 'Facility Management',
    slug: 'facility-management',
    description: 'Comprehensive building maintenance and management services.',
    icon: Warehouse,
  },
  {
    name: 'Interior Fit-Out',
    slug: 'interior-fit-out',
    description: 'Commercial and residential interior finishing solutions.',
    icon: PaintBucket,
  },
];

export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about#team' },
    { label: 'Careers', href: '/career' },
    { label: 'News', href: '/news' },
  ],
  services: SERVICES.slice(0, 4).map((service) => ({
    label: service.name,
    href: `/services#${service.slug}`,
  })),
};
