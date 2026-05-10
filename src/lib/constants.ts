import type { NavItem, Service, SiteConfig } from '@/types';
import { SECTORS } from '@/data/sectors';

export const SITE_CONFIG: SiteConfig = {
  name: 'CMS Group',
  shortName: 'CMS Group',
  legalName: 'Construction Material Solutions',
  tagline: 'Delivering Exceptional Construction Solutions since 2002',
  description:
    "CMS Group is Nepal's leading provider of construction materials and building finishing solutions. Trusted partner since 2002 across hospital, education, airport, office, hotel, and residential projects.",
  url: 'https://cmsgrps.com',
  phone: '+977-1-4100235',
  phoneSecondary: '+977-1-4100236',
  phoneMobile: '+977-9820271896',
  email: 'info@cmsgrps.com',
  address: {
    street: 'Tara Bhawan, Near Teku Hospital (behind Prakash Pharmacia), Teku',
    city: 'Kathmandu',
    country: 'Nepal',
  },
  mapsUrl:
    'https://maps.google.com/?q=Tara+Bhawan+Teku+Kathmandu+Nepal',
  social: {
    instagram: 'https://www.instagram.com/cmsgroup_official',
    facebook: 'https://www.facebook.com/share/1D22PUVwS5/',
    tiktok: 'https://www.tiktok.com/@cms.group.official',
    linkedin: 'https://www.linkedin.com/company/cmsgrp',
  },
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Ventures', href: '/ventures' },
  { label: 'Products & Services', href: '/trading' },
  { label: 'Brands', href: '/brands' },
  { label: 'Projects', href: '/projects' },
  { label: 'Career', href: '/career' },
];

export const SERVICES: Service[] = SECTORS.map((sector) => ({
  name: sector.name,
  slug: sector.slug,
  description: sector.summary,
  icon: sector.icon,
}));

export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about#leadership' },
    { label: 'Careers', href: '/career' },
    { label: 'Newsroom', href: '/newsroom' },
  ],
  services: SERVICES.slice(0, 4).map((service) => ({
    label: service.name,
    href: `/services#${service.slug}`,
  })),
};
