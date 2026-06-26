import type { NavItem } from '@/types'
import type { SiteConfig, CommercialSector, EventCategory, DeliveringVenture, VentureSlug } from '@/types/cms'

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
  mapsUrl: 'https://maps.google.com/?q=Tara+Bhawan+Teku+Kathmandu+Nepal',
  social: {
    instagram: 'https://www.instagram.com/cmsgroup_official',
    facebook: 'https://www.facebook.com/share/1D22PUVwS5/',
    tiktok: 'https://www.tiktok.com/@cms.group.official',
    linkedin: 'https://www.linkedin.com/company/cmsgrp',
  },
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products & Services', href: '/trading' },
  { label: 'Our Brands', href: '/brands' },
  { label: 'Our Projects', href: '/projects' },
  { label: 'Build a Career', href: '/career' },
]

export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/career' },
    { label: 'Newsroom', href: '/newsroom' },
  ],
  services: [
    { label: 'Hospitality', href: '/services#hospitality' },
    { label: 'Education', href: '/services#education' },
    { label: 'Airport', href: '/services#airport' },
    { label: 'Office', href: '/services#office' },
  ],
}

// ─── Enum label maps (mirror CMS select field options) ────────────────────────

export const COMMERCIAL_SECTORS: { value: CommercialSector; label: string }[] = [
  { value: 'healthcare', label: 'Health Care' },
  { value: 'education', label: 'Education' },
  { value: 'airports', label: 'Airport' },
  { value: 'office', label: 'Office Space' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'industrial', label: 'Industrial' },
]

export const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
  training: 'Training & Seminars',
  partnership: 'Partnership',
  csr: 'Community & CSR',
  'trade-show': 'Trade Shows',
  internal: 'Company',
  milestone: 'Milestones',
}

export const DELIVERING_VENTURE_LABELS: Record<DeliveringVenture, string> = {
  'cubic-meter': 'Cubic Meter',
  'baba-muktinath': 'Baba Muktinath Fabricators',
  '4r-technologies': '4R Technologies',
  'green-building-technologies': 'Green Building Technologies',
  'cms-group': 'CMS Group',
}

export const VENTURE_LABELS: Record<VentureSlug, string> = {
  'bath-n-room': 'Bath N Room',
  'baba-muktinath': 'Baba Muktinath Fabricators',
  '4r-technologies': '4R Technologies',
  techwood: 'Techwood',
  'prime-ceramics': 'Prime Ceramics',
}

export type TradingDomainSlug =
  | 'roofing'
  | 'facade-solutions'
  | 'ceiling-systems'
  | 'aluminum-doors-windows'
  | 'wood-glass-metal-coating'
  | 'door-hardware'
  | 'architectural-railings'
  | 'waterproofing'
  | 'wastewater-management'
  | 'sanitaryware'
  | 'office-furnitures'
  | 'flooring'
  | 'tiles'
  | 'fire-rated-doors'

export const DOMAIN_LABELS: Record<TradingDomainSlug, string> = {
  'roofing': 'Roofing Systems',
  'facade-solutions': 'Facade Solutions',
  'ceiling-systems': 'Ceiling Systems',
  'aluminum-doors-windows': 'Aluminium Doors & Windows',
  'wood-glass-metal-coating': 'Wood, Glass & Metal Coating',
  'door-hardware': 'Access Control Solutions',
  'architectural-railings': 'Architectural Railings',
  'waterproofing': 'Waterproofing Systems',
  'wastewater-management': 'Wastewater Management',
  'sanitaryware': 'Sanitaryware & Bathroom Solutions',
  'office-furnitures': 'Office Furnitures',
  'flooring': 'Flooring',
  'tiles': 'Tiles',
  'fire-rated-doors': 'Fire Rated Doors',
}

export const DOMAIN_ORDER: TradingDomainSlug[] = [
  'roofing',
  'facade-solutions',
  'ceiling-systems',
  'aluminum-doors-windows',
  'wood-glass-metal-coating',
  'door-hardware',
  'architectural-railings',
  'waterproofing',
  'wastewater-management',
  'sanitaryware',
  'office-furnitures',
  'flooring',
  'tiles',
  'fire-rated-doors',
]

// ─── Static contracting services (not in CMS) ─────────────────────────────────

export interface ContractingService {
  id: string
  title: string
  description: string
  features: string[]
}

export const CONTRACTING_SERVICES: ContractingService[] = [
  {
    id: 'interior',
    title: 'Interior Contracting & Full-Service Solutions',
    description: '',
    features: [],
  },
  {
    id: 'execution',
    title: 'High-Quality Execution & Project Management',
    description: '',
    features: [],
  },
  {
    id: 'renovation',
    title: 'Renovation, Technology & Sustainable Practices',
    description: '',
    features: [],
  },
]
