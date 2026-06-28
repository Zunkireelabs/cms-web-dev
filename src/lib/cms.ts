import type {
  BrandEntry,
  VentureSlug,
  Project,
  ProjectType,
  CommercialSector,
  CMSEvent,
  EventCategory,
  Testimonial,
  ClientType,
  DeliveringVenture,
  Certification,
  CertificationHolder,
  Director,
  Milestone,
  Venture,
  SiteConfig,
  CmsSector,
  HeroSlide,
  Job,
  MapLocation,
} from '@/types/cms'

export type {
  BrandEntry,
  VentureSlug,
  Project,
  ProjectType,
  CommercialSector,
  CMSEvent,
  EventCategory,
  Testimonial,
  ClientType,
  DeliveringVenture,
  Certification,
  CertificationHolder,
  Director,
  Milestone,
  Venture,
  SiteConfig,
  CmsSector,
  HeroSlide,
  Job,
  MapLocation,
}

const CMS_URL = process.env.CMS_URL || 'http://localhost:3001'

function mediaUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined
  if (url.startsWith('http')) return url
  return `${CMS_URL}${url}`
}

async function fetchDocs<T>(path: string, params: Record<string, string> = {}): Promise<T[]> {
  const qs = new URLSearchParams({ limit: '500', depth: '1', ...params }).toString()
  try {
    const res = await fetch(`${CMS_URL}/api/${path}?${qs}`, {
      next: { revalidate: 30, tags: [path.split('?')[0]] },
    })
    if (!res.ok) throw new Error(`CMS ${path}: ${res.status}`)
    const json = await res.json()
    return json.docs ?? []
  } catch (err) {
    console.error(`[cms] fetchDocs(${path}) failed:`, err)
    return []
  }
}

async function fetchGlobal<T>(slug: string): Promise<T | null> {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/${slug}`, {
      next: { revalidate: 60, tags: [`globals/${slug}`] },
    })
    if (!res.ok) throw new Error(`CMS globals/${slug}: ${res.status}`)
    return res.json()
  } catch (err) {
    console.error(`[cms] fetchGlobal(${slug}) failed:`, err)
    return null
  }
}

// ─── Projects ────────────────────────────────────────────────────────────────

export async function fetchProjects(): Promise<Project[]> {
  const docs = await fetchDocs<any>('projects', { sort: '-year' })
  return docs.map((d) => ({
    id: d.slug as string,
    title: d.title as string,
    client: d.client as string,
    location: d.location as string,
    year: d.year as number,
    type: d.type as ProjectType,
    sector: d.sector as CommercialSector | undefined,
    description: d.description as string,
    scope: (d.scope ?? []).map((s: any) => s.value as string),
    area: d.area as string | undefined,
    image: mediaUrl(d.image?.url),
    featured: d.featured as boolean | undefined,
  }))
}

// ─── Brands ──────────────────────────────────────────────────────────────────

export async function fetchBrands(): Promise<BrandEntry[]> {
  const docs = await fetchDocs<any>('brands', { sort: 'name' })
  return docs.map((d) => ({
    name: d.name as string,
    slug: d.slug as string,
    country: d.country as string,
    founded: d.founded as number | undefined,
    segments: (d.segments ?? []).map((s: any) => s.value as string),
    description: d.description as string,
    website: d.website as string | undefined,
    logoUrl: mediaUrl(d.logo?.url),
    viewBrochureUrl: (d.brochureUrl as string | undefined) || undefined,
    downloadBrochureUrl: mediaUrl(d.brochure?.url),
    venture: (d.venture?.slug ?? d.venture) as VentureSlug,
    tradingDomains: (d.tradingDomains ?? []).map((td: any) =>
      typeof td === 'object' ? (td.slug as string) : (td as string)
    ),
  }))
}

// ─── Brand helpers (operate on already-fetched brands array) ─────────────────

export function getBrandsByVenture(brands: BrandEntry[], venture: VentureSlug): BrandEntry[] {
  return brands.filter((b) => b.venture === venture)
}

export function getBrandsByTradingDomain(brands: BrandEntry[], domainSlug: string): BrandEntry[] {
  return brands.filter((b) => b.tradingDomains?.includes(domainSlug))
}

export function getBrandCountByVenture(
  brands: BrandEntry[],
): Record<VentureSlug, number> {
  return brands.reduce(
    (acc, b) => {
      acc[b.venture] = (acc[b.venture] ?? 0) + 1
      return acc
    },
    {
      'bath-n-room': 0,
      'baba-muktinath': 0,
      '4r-technologies': 0,
      techwood: 0,
      'prime-ceramics': 0,
    } as Record<VentureSlug, number>,
  )
}

// ─── Product Domains ─────────────────────────────────────────────────────────

export interface CmsProductDomain {
  id: string
  slug: string
  title: string
  description: string
  image: string
  imagePosition: 'object-center' | 'object-top' | 'object-bottom'
  projectKeywords: string[]
  installedAreaSqFt?: number
  metricLabel?: string
  icon?: string
}

export async function fetchProductDomains(): Promise<CmsProductDomain[]> {
  const docs = await fetchDocs<any>('product-domains', { sort: 'title' })
  return docs.map((d) => ({
    id: d.slug as string,
    slug: d.slug as string,
    title: d.title as string,
    description: d.description as string,
    image: d.externalImageUrl || mediaUrl(d.image?.url) || '',
    imagePosition: (d.imagePosition ?? 'object-center') as CmsProductDomain['imagePosition'],
    projectKeywords: (d.projectKeywords ?? []).map((k: any) => k.value as string),
    installedAreaSqFt: d.installedAreaSqFt as number | undefined,
    metricLabel: d.metricLabel as string | undefined,
    icon: d.icon as string | undefined,
  }))
}

// ─── Leadership ──────────────────────────────────────────────────────────────

export async function fetchLeadership(): Promise<Director[]> {
  const docs = await fetchDocs<any>('leadership', { sort: 'order' })
  return docs.map((d) => ({
    name: d.name as string,
    title: d.title as string,
    company: d.company as string,
    bio: d.bio as string,
    summary: d.summary as string | undefined,
    photo: mediaUrl(d.photo?.url),
    order: d.order as number,
  }))
}

// ─── Ventures ────────────────────────────────────────────────────────────────

export async function fetchVentures(): Promise<Venture[]> {
  const docs = await fetchDocs<any>('ventures', { sort: 'founded' })
  return docs.map((d) => ({
    name: d.name as string,
    shortName: d.shortName as string,
    slug: d.slug as string,
    founded: d.founded as number,
    tagline: d.tagline as string | undefined,
    description: d.description as string,
    logo: mediaUrl(d.logo?.url),
    products: (d.products ?? []).map((p: any) => ({
      name: p.name as string,
      image: mediaUrl(p.image?.url),
    })),
    brands: [],
  }))
}

// ─── Sectors ─────────────────────────────────────────────────────────────────

export async function fetchSectors(): Promise<CmsSector[]> {
  const docs = await fetchDocs<any>('sectors', { sort: 'name' })
  return docs.map((d) => ({
    name: d.name as string,
    slug: d.slug as string,
    icon: d.icon as string,
    summary: d.summary as string,
    description: d.description as string,
  }))
}

// ─── Events ──────────────────────────────────────────────────────────────────

export async function fetchEvents(): Promise<CMSEvent[]> {
  const docs = await fetchDocs<any>('events', { sort: '-year' })
  return docs.map((d) => ({
    id: d.slug as string,
    title: d.title as string,
    month: d.month as string,
    year: d.year as number,
    date: d.date as string,
    category: d.category as EventCategory,
    description: d.description as string,
    image: mediaUrl(d.image?.url),
    featured: d.featured as boolean | undefined,
  }))
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const docs = await fetchDocs<any>('testimonials')
  return docs.map((d) => ({
    id: d.slug as string,
    client: d.client as string,
    clientType: d.clientType as ClientType,
    date: d.date as string,
    deliveredBy: d.deliveredBy as DeliveringVenture,
    subject: d.subject as string,
    scope: (d.scope ?? []).map((s: any) => s.value as string),
    project: d.project as string | undefined,
    location: d.location as string | undefined,
    scanImage: mediaUrl(d.scanImage?.url),
  }))
}

// ─── Certifications ───────────────────────────────────────────────────────────

export async function fetchCertifications(): Promise<Certification[]> {
  // Newest first so a freshly-added cert shows up at the start of the
  // about-page carousel, not buried 18 cards in.
  const docs = await fetchDocs<any>('certifications', { sort: '-createdAt' })
  return docs.map((d) => ({
    id: String(d.id),
    brand: d.brand as string,
    type: d.type as string,
    holder: d.holder as string,
    holderVenture: d.holderVenture as CertificationHolder | undefined,
    scope: d.scope as string,
    country: d.country as string | undefined,
    issued: d.issued as string | undefined,
    validFrom: d.validFrom as string | undefined,
    validUntil: d.validUntil as string | undefined,
    scanImage: mediaUrl(d.scanImage?.url),
  }))
}

// ─── Milestones ───────────────────────────────────────────────────────────────

export async function fetchMilestones(): Promise<Milestone[]> {
  const docs = await fetchDocs<any>('milestones', { sort: 'year' })
  return docs.map((d) => ({
    year: d.year as number,
    venture: d.venture as string,
    title: d.title as string | undefined,
    description: d.description as string,
    icon: d.icon as string | undefined,
    brands: Array.isArray(d.brands) ? d.brands.map((b: any) => b.name as string) : [],
    logo: mediaUrl(d.logo?.url),
  }))
}

// ─── Hero Slides ─────────────────────────────────────────────────────────────

export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  const docs = await fetchDocs<any>('hero-slides', { sort: 'order' })
  return docs.map((d) => ({
    id: d.id as number,
    order: d.order as number,
    title: d.title as string,
    alt: d.alt as string,
    image: mediaUrl(d.image?.url),
    video: mediaUrl(d.video?.url),
  }))
}

// ─── Map Locations ────────────────────────────────────────────────────────────

// Approximate lat/lng → SVG-coord conversion for the hand-drawn Nepal map.
// Anchored on Kathmandu (27.7172°N, 85.3240°E → markerX 650, markerY 375)
// with ~70 px per degree. The SVG is not a true projection, so pins land
// within ~20-50 px of the geographically-exact spot.
function latLngToMarker(lat: number, lng: number): { x: number; y: number } {
  return {
    x: Math.round(650 + (lng - 85.32) * 70),
    y: Math.round(375 + (27.72 - lat) * 70),
  }
}

export async function fetchMapLocations(): Promise<MapLocation[]> {
  const docs = await fetchDocs<any>('map-locations', { sort: 'name' })

  // First pass: compute marker + base label position from lat/lng.
  // If the doc has a non-zero labelOffsetX/Y, use those (user dragged the
  // label in the CMS picker) and skip auto-stacking for that doc.
  const base = docs.map((d) => {
    const lat = Number(d.latitude)
    const lng = Number(d.longitude)
    const { x: markerX, y: markerY } = latLngToMarker(lat, lng)
    const offX = Number(d.labelOffsetX) || 0
    const offY = Number(d.labelOffsetY) || 0
    return {
      id: d.id as number,
      name: d.name as string,
      markerX,
      markerY,
      direction: (d.direction === 'down' ? 'down' : 'up') as 'up' | 'down',
      keywords: Array.isArray(d.keywords)
        ? d.keywords.map((k: any) => String(k.value ?? '').toLowerCase()).filter(Boolean)
        : [],
      _hasUserOffset: offX !== 0 || offY !== 0,
      _baseLabelX: markerX + 90 + offX,
      _baseLabelY: markerY + offY,
    }
  })

  // Second pass: collision-aware label placement.
  // For docs with a user-set offset, we trust the user — no stacking.
  // For docs without an offset, we stack to avoid overlaps in clustered
  // areas like the Kathmandu valley.
  const labelWidth = 130
  const labelHeight = 22
  const verticalGap = 26
  const sorted = [...base].sort((a, b) => a.markerY - b.markerY)
  const placed: MapLocation[] = []

  for (const loc of sorted) {
    let labelX = loc._baseLabelX
    let labelY = loc._baseLabelY

    if (!loc._hasUserOffset) {
      let safety = 0
      while (
        safety < 20 &&
        placed.some(
          (p) =>
            Math.abs(p.labelX - labelX) < labelWidth &&
            Math.abs(p.labelY - labelY) < labelHeight,
        )
      ) {
        labelY += verticalGap
        safety++
      }
    }

    placed.push({
      id: loc.id,
      name: loc.name,
      markerX: loc.markerX,
      markerY: loc.markerY,
      labelX,
      labelY,
      direction: loc.direction,
      keywords: loc.keywords,
    })
  }

  return placed
}

// ─── Jobs ─────────────────────────────────────────────────────────────────────

export async function fetchJobs(): Promise<Job[]> {
  const docs = await fetchDocs<any>('jobs', { sort: '-postedAt' })
  return docs
    .filter((d) => d.active !== false)
    .map((d) => ({
      id: d.id as number,
      title: d.title as string,
      slug: d.slug as string,
      location: d.location as string,
      type: d.type as Job['type'],
      description: d.description as string,
      responsibilities: Array.isArray(d.responsibilities)
        ? d.responsibilities.map((r: any) => r.item as string).filter(Boolean)
        : [],
      postedAt: d.postedAt as string,
      active: d.active !== false,
    }))
}

// ─── Site Config ──────────────────────────────────────────────────────────────

export async function fetchSiteConfig(): Promise<SiteConfig | null> {
  const raw = await fetchGlobal<any>('site-config')
  if (!raw) return null
  // Unwrap Payload array shapes: {point: 'x'} → 'x', {name: 'x'} → 'x'.
  const unwrapStrings = (arr: any[] | undefined, key: string): string[] =>
    Array.isArray(arr) ? arr.map((a) => a?.[key]).filter(Boolean) : []
  return {
    name: raw.name,
    shortName: raw.shortName,
    legalName: raw.legalName,
    tagline: raw.tagline,
    description: raw.description,
    url: raw.url,
    phone: raw.phone,
    phoneSecondary: raw.phoneSecondary,
    phoneMobile: raw.phoneMobile,
    email: raw.email,
    address: raw.address,
    mapsUrl: raw.mapsUrl,
    social: raw.social,
    stats: raw.stats,
    operatingHours: raw.operatingHours,
    showrooms: Array.isArray(raw.showrooms) ? raw.showrooms : [],
    mission: unwrapStrings(raw.mission, 'point'),
    vision: unwrapStrings(raw.vision, 'point'),
    trustPillars: Array.isArray(raw.trustPillars) ? raw.trustPillars : [],
    coreValues: Array.isArray(raw.coreValues) ? raw.coreValues : [],
    storyMeta: Array.isArray(raw.storyMeta) ? raw.storyMeta : [],
    storySectors: unwrapStrings(raw.storySectors, 'name'),
    whyWorkWithUs: Array.isArray(raw.whyWorkWithUs) ? raw.whyWorkWithUs : [],
    employeeStories: Array.isArray(raw.employeeStories) ? raw.employeeStories : [],
    contractingServices: Array.isArray(raw.contractingServices) ? raw.contractingServices : [],
  }
}
