// ─── Projects ────────────────────────────────────────────────────────────────

export type ProjectType = 'commercial' | 'residential'

export type CommercialSector =
  | 'healthcare'
  | 'education'
  | 'airports'
  | 'office'
  | 'hospitality'
  | 'industrial'

export interface Project {
  id: string
  title: string
  client: string
  location: string
  year: number
  type: ProjectType
  sector?: CommercialSector
  description: string
  scope: string[]
  area?: string
  image?: string
  featured?: boolean
}

// ─── Brands ──────────────────────────────────────────────────────────────────

export type VentureSlug =
  | 'bath-n-room'
  | 'baba-muktinath'
  | '4r-technologies'
  | 'techwood'
  | 'prime-ceramics'

export interface BrandEntry {
  name: string
  slug: string
  country: string
  founded?: number
  segments: string[]
  description: string
  venture: VentureSlug
  tradingDomains?: string[]
  website?: string
  logoUrl?: string
  viewBrochureUrl?: string       // external link → "View Brochure" button (falls back to the uploaded PDF if unset)
  downloadBrochureUrl?: string   // uploaded PDF → "Download Brochure" button
}

// ─── Events ──────────────────────────────────────────────────────────────────

export type EventCategory =
  | 'training'
  | 'partnership'
  | 'csr'
  | 'trade-show'
  | 'internal'
  | 'milestone'

export interface CMSEvent {
  id: string
  title: string
  month: string
  year: number
  date: string
  category: EventCategory
  description: string
  image?: string
  featured?: boolean
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export type ClientType =
  | 'hotel'
  | 'hospital'
  | 'construction'
  | 'architecture'
  | 'industrial'
  | 'government'
  | 'international'
  | 'residential'

export type DeliveringVenture =
  | 'cubic-meter'
  | 'baba-muktinath'
  | '4r-technologies'
  | 'green-building-technologies'
  | 'cms-group'

export interface Testimonial {
  id: string
  client: string
  clientType: ClientType
  date: string
  deliveredBy: DeliveringVenture
  subject: string
  scope: string[]
  project?: string
  location?: string
  scanImage?: string
}

// ─── Certifications ───────────────────────────────────────────────────────────

export type CertificationHolder =
  | 'cms-group'
  | 'bath-n-room'
  | 'baba-muktinath'
  | '4r-technologies'
  | 'cubic-meter'
  | 'techwood'
  | 'prime-ceramics'
  | 'shree-swastik'
  | 'green-building-technologies'

export interface Certification {
  id: string
  brand: string
  type: string
  holder: string
  holderVenture?: CertificationHolder
  scope: string
  country?: string
  issued?: string
  validFrom?: string
  validUntil?: string
  scanImage?: string
}

// ─── Leadership / Director ────────────────────────────────────────────────────

export interface Director {
  name: string
  title: string
  company: string
  bio: string
  summary?: string
  photo?: string
  order: number
}

// ─── Milestones ───────────────────────────────────────────────────────────────

export interface Milestone {
  year: number
  venture: string
  title?: string
  description: string
  icon?: string
  brands: string[]
  logo?: string
}

// ─── Ventures ────────────────────────────────────────────────────────────────

export interface VentureProduct {
  name: string
  image?: string
}

export interface Venture {
  name: string
  shortName: string
  slug: string
  founded: number
  tagline?: string
  description: string
  logo?: string
  products: VentureProduct[]
  brands: string[]
}

// ─── Site Config ──────────────────────────────────────────────────────────────

export interface Address {
  street: string
  city: string
  country: string
  postal?: string
}

export interface SiteConfigStats {
  projectsDelivered?: number
  projectsDeliveredLabel?: string
  yearsOfExcellence?: number
  yearsOfExcellenceLabel?: string
  brandPartners?: number
  brandPartnersLabel?: string
  sectorsServed?: number
  sectorsServedLabel?: string
}

export interface Showroom {
  name: string
  description?: string
  address?: string
}

export interface CoreValue {
  icon?: string
  title: string
  description: string
  practice?: string
}

export interface TrustPillar {
  title: string
  description: string
}

export interface StoryMetaItem {
  label: string
  value: string
}

export interface WhyWorkWithUsItem {
  icon?: string
  title: string
  description: string
}

export interface EmployeeStory {
  name: string
  role: string
  tenure?: string
  quote: string
}

export interface ContractingService {
  icon?: string
  title: string
  description: string
}

export interface SiteConfig {
  name: string
  shortName: string
  legalName: string
  tagline: string
  description: string
  url: string
  phone: string
  phoneSecondary?: string
  phoneMobile?: string
  email: string
  address: Address
  mapsUrl?: string
  social?: {
    instagram?: string
    facebook?: string
    tiktok?: string
    linkedin?: string
  }
  stats?: SiteConfigStats
  operatingHours?: string
  showrooms?: Showroom[]
  mission?: string[]
  vision?: string[]
  trustPillars?: TrustPillar[]
  coreValues?: CoreValue[]
  storyMeta?: StoryMetaItem[]
  storySectors?: string[]
  whyWorkWithUs?: WhyWorkWithUsItem[]
  employeeStories?: EmployeeStory[]
  contractingServices?: ContractingService[]
}

// ─── Sectors (CMS shape — icon is a string, not a component) ─────────────────

export interface CmsSector {
  name: string
  slug: string
  icon: string
  summary: string
  description: string
}

// ─── Hero Slides ──────────────────────────────────────────────────────────────

export interface HeroSlide {
  id: number
  order: number
  title: string
  alt: string
  image?: string  // resolved URL from mediaUrl()
  video?: string  // resolved URL from mediaUrl()
}

// ─── Map Locations ────────────────────────────────────────────────────────────

export interface MapLocation {
  id: number
  name: string
  markerX: number
  markerY: number
  labelX: number
  labelY: number
  direction: 'up' | 'down'
  keywords: string[]
}

// ─── Jobs ─────────────────────────────────────────────────────────────────────

export interface Job {
  id: number
  title: string
  slug: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  description: string
  responsibilities: string[]
  postedAt: string
  active: boolean
}
