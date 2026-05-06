import { BRANDS, getBrandsByTradingDomain, type BrandEntry } from './brands';

export interface Brand {
  name: string;
  description: string;
  specialty: string;
  website?: string;
  catalogueUrl?: string;
  brochureUrl: string;
  country: string;
  logo?: string;
}

export interface ProductDomain {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  brands: Brand[];
}

export interface ContractingService {
  id: string;
  title: string;
  description: string;
  features: string[];
}

function entryToBrand(entry: BrandEntry): Brand {
  return {
    name: entry.name,
    specialty: entry.segments[0] ?? '',
    description: entry.founded
      ? `${entry.country} • Established ${entry.founded}${entry.segments.length > 1 ? ` • ${entry.segments.slice(1).join(', ')}` : ''}`
      : entry.country,
    brochureUrl: '#',
    country: entry.country,
  };
}

interface ProductDomainMeta {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
}

const PRODUCT_DOMAIN_META: ProductDomainMeta[] = [
  {
    id: 'roofing',
    slug: 'roofing',
    title: 'Roofing Systems',
    description:
      'Premium roofing solutions for commercial, industrial, and residential projects — asphalt shingles, metal sheets, ceramic concrete tiles, and UPVC roofing for every climate.',
    image: '/images/products/roofing.jpg',
  },
  {
    id: 'facade',
    slug: 'facade-solutions',
    title: 'Facade Solutions',
    description:
      'Architectural facade systems combining aesthetics with thermal and acoustic performance. Cladding, sun control, and curtain wall solutions for commercial buildings.',
    image: '/images/products/facade.jpg',
  },
  {
    id: 'ceiling',
    slug: 'ceiling-systems',
    title: 'Ceiling Systems',
    description:
      'Commercial and acoustic ceiling solutions including metal, mineral fiber, wood, and stretch ceilings — engineered for offices, hotels, hospitals, and airports.',
    image: '/images/products/ceiling.jpg',
  },
  {
    id: 'aluminum',
    slug: 'aluminum-doors-windows',
    title: 'Aluminium Doors and Windows',
    description:
      'Pre-engineered aluminium window and door systems delivering thermal efficiency, acoustic isolation, and structural performance for residential and commercial use.',
    image: '/images/products/aluminum.jpg',
  },
  {
    id: 'coating',
    slug: 'wood-glass-metal-coating',
    title: 'Wood, Glass, and Metal Coating',
    description:
      'Italian-engineered surface coatings for wood, glass, and metal — polyurethane, water-based, and UV-cured systems for interior and exterior applications.',
    image: '/images/products/coating.jpg',
  },
  {
    id: 'hardware',
    slug: 'door-hardware',
    title: 'Door Hardware and Access',
    description:
      'Door hardware, digital and RFID locks, automatic sensor doors, glass shower cubicles, and acoustic movable walls — complete access and partition systems.',
    image: '/images/products/hardware.jpg',
  },
  {
    id: 'railings',
    slug: 'architectural-railings',
    title: 'Architectural Railings',
    description:
      'Glass, aluminium, and stainless steel railing systems for balconies, staircases, and terraces — combining safety regulations with modern architectural design.',
    image: '/images/products/railings.jpg',
  },
  {
    id: 'waterproofing',
    slug: 'waterproofing',
    title: 'Waterproofing Systems',
    description:
      'Comprehensive waterproofing and construction chemicals — for basements, roofs, bathrooms, expansion joints, and foundations across every project scale.',
    image: '/images/products/waterproofing.jpg',
  },
  {
    id: 'wastewater',
    slug: 'wastewater-management',
    title: 'Wastewater & Water Management',
    description:
      'Sewage and effluent treatment plants, bulk water storage tanks, fountains, and swimming pool solutions from world-renowned manufacturers.',
    image: '/images/products/wastewater.jpg',
  },
  {
    id: 'sanitaryware',
    slug: 'sanitaryware',
    title: 'Sanitaryware and Bathroom Solutions',
    description:
      'Premium sanitary fixtures, faucets, bathtubs, and bathroom accessories from Europe, USA, and Asia — for residences, hotels, hospitals, and commercial projects.',
    image: '/images/products/sanitaryware.jpg',
  },
];

export const PRODUCT_DOMAINS: ProductDomain[] = PRODUCT_DOMAIN_META.map((meta) => ({
  ...meta,
  brands: getBrandsByTradingDomain(meta.slug).map(entryToBrand),
}));

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
];

export function getProductDomain(slug: string): ProductDomain | undefined {
  return PRODUCT_DOMAINS.find((domain) => domain.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return PRODUCT_DOMAINS.map((domain) => domain.slug);
}

export function getContractingService(id: string): ContractingService | undefined {
  return CONTRACTING_SERVICES.find((service) => service.id === id);
}

export interface BrandWithDomain extends Brand {
  domainTitle: string;
  domainSlug: string;
}

export function getAllBrandsWithDomain(): BrandWithDomain[] {
  return PRODUCT_DOMAINS.flatMap((domain) =>
    domain.brands.map((brand) => ({
      ...brand,
      domainTitle: domain.title,
      domainSlug: domain.slug,
    })),
  );
}

export { BRANDS };
