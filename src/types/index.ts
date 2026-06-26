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

// Re-export CMS types for backward-compat (consumers that import from '@/types')
export type {
  Address,
  SiteConfig,
  Director,
  Milestone,
  Venture,
  VentureProduct,
  CmsSector as Sector,
} from '@/types/cms'
