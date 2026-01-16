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
  description: string;
  url: string;
  phone: string;
  email: string;
  address: Address;
}
