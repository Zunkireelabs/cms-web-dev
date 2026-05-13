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
  imagePosition?: 'object-center' | 'object-top' | 'object-bottom';
  brands: Brand[];
  projectKeywords?: string[];
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
    brochureUrl: entry.website ?? '#',
    country: entry.country,
    website: entry.website,
    catalogueUrl: entry.website,
    logo: entry.logoUrl,
  };
}

interface ProductDomainMeta {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: 'object-center' | 'object-top' | 'object-bottom';
  projectKeywords?: string[];
}

const PRODUCT_DOMAIN_META: ProductDomainMeta[] = [
  {
    id: 'roofing',
    slug: 'roofing',
    title: 'Roofing Systems',
    description:
      'IKO roofing systems offer a reliable and high-performance solution for both residential and commercial buildings in Nepal. Manufactured in Canada and now available locally, IKO specializes in durable asphalt shingles designed to withstand diverse weather conditions, from heavy rainfall to intense sunlight. These shingles combine strong waterproofing, long-lasting protection, and modern aesthetic appeal — making them an ideal choice for projects that prioritise quality, efficiency, and visual finish, whether for new construction or renovation.',
    image: '/images/products/roofing-new.jpg',
    projectKeywords: ['Roofing', 'IKO', 'Kalzip', 'Slate', 'Shingle'],
  },
  {
    id: 'facade',
    slug: 'facade-solutions',
    title: 'Facade Solutions',
    description:
      'Hunter Douglas façade solutions are now available in Nepal, bringing globally trusted design and engineering to modern building exteriors. Known for innovative architectural systems, Hunter Douglas offers high-performance façades that enhance aesthetics while improving energy efficiency, ventilation, and sun control. Designed for both commercial and residential projects, these systems combine durability with sleek, contemporary finishes — ideal for visually striking and functional building envelopes.',
    image: '/images/products/facade-new.jpg',
    projectKeywords: ['Facade', 'Façade', 'Hunter Douglas', 'Cladding'],
  },
  {
    id: 'ceiling',
    slug: 'ceiling-systems',
    title: 'Ceiling Systems',
    description:
      'Commercial and acoustic ceiling solutions including metal, mineral fiber, wood, and stretch ceilings — engineered for offices, hotels, hospitals, and airports.',
    image: '/images/products/ceiling.jpg',
    imagePosition: 'object-top',
    projectKeywords: ['Ceiling', 'Armstrong'],
  },
  {
    id: 'aluminum',
    slug: 'aluminum-doors-windows',
    title: 'Aluminium Doors and Windows',
    description:
      'Premium aluminium doors and windows crafted for strength, durability, and modern design. Built with high-quality materials and long-lasting performance, they are perfect for residential and commercial spaces — providing excellent functionality, low maintenance, and a sleek architectural finish.',
    image: '/images/products/aluminum.jpg',
    projectKeywords: ['Tostem', 'Aluminium', 'Aluminum', 'Windows', 'Door'],
  },
  {
    id: 'coating',
    slug: 'wood-glass-metal-coating',
    title: 'Wood, Glass, and Metal Coating',
    description:
      'ICA Group wood coatings bring premium Italian technology to Nepal, offering advanced surface-finishing solutions for wood, metal, and glass. Known for durability and refined aesthetics, ICA coatings enhance the natural look of wood while providing strong protection against wear, moisture, and environmental damage. The expanding services in Nepal now include high-performance metal and glass coatings — ensuring a consistent, long-lasting finish across different materials for residential and commercial applications.',
    image: '/images/products/coating-hero.png',
    projectKeywords: ['ICA', 'Coating'],
  },
  {
    id: 'hardware',
    slug: 'door-hardware',
    title: 'Door Hardware & Accessories',
    description:
      'A complete range of solutions including door hardware, access control systems, movable walls, glass partitions, and digital security — designed to enhance functionality, safety, and modern aesthetics. Ideal for residential, commercial, and institutional spaces, providing seamless integration of security, flexibility, and contemporary design.',
    image: '/images/products/door-hardware.jpg',
    projectKeywords: ['Dormakaba', 'Hardware', 'Onity', 'Movable', 'Sensor', 'RFID'],
  },
  {
    id: 'railings',
    slug: 'architectural-railings',
    title: 'Architectural Railings',
    description:
      'Zolon is a modern architectural solutions brand known for premium railing systems, glass fittings, and hardware used in residential and commercial spaces. Originating from Rajkot, Zolon focuses on combining durability, safety, and sleek contemporary design using stainless steel and glass. Now available in Nepal, Zolon brings internationally styled railing solutions — from balcony and stair railings to façade systems — to local projects.',
    image: '/images/products/railings.jpg',
    imagePosition: 'object-top',
    projectKeywords: ['Railing', 'Zolon', 'Handrail', 'Balustrade'],
  },
  {
    id: 'waterproofing',
    slug: 'waterproofing',
    title: 'Waterproofing Systems',
    description:
      'Premium waterproofing solutions using high-quality chemicals designed to deliver long-lasting protection for decades. Our systems are ideal for residential, commercial, and industrial structures — ensuring durability, leak prevention, and enhanced structural life in all weather conditions.',
    image: '/images/products/waterproofing.jpg',
    projectKeywords: ['Waterproof', 'Schomburg', 'Ardex'],
  },
  {
    id: 'wastewater',
    slug: 'wastewater-management',
    title: 'Wastewater Management',
    description:
      'Wastewater management — the systematic collection, treatment, and safe disposal or reuse of used water from households, industries, and commercial activities to protect public health and the environment. We deliver Sewage Treatment Plants (STP) for domestic wastewater and Effluent Treatment Plants (ETP) for industrial discharge, removing harmful chemicals, solids, and pollutants before release or reuse. Our systems also enable recycling, resource recovery, and sustainable practices that reduce water scarcity and pollution.',
    image: '/images/products/wastewater.jpg',
    projectKeywords: ['STP', 'ETP', 'Sintex', 'Sewage', 'Effluent', 'Storage Tank', 'Water Tank'],
  },
  {
    id: 'sanitaryware',
    slug: 'sanitaryware',
    title: 'Sanitaryware and Bathroom Solutions',
    description:
      'Premium sanitary ware solutions designed for durability, hygiene, and modern aesthetics — ideal for hotels, hospitals, residential, and commercial spaces. Our range combines high-quality materials with innovative designs to ensure reliability, easy maintenance, and a refined finish that enhances both functionality and overall space appeal.',
    image: '/images/products/sanitaryware.jpg',
    imagePosition: 'object-top',
    projectKeywords: ['Sanitary', 'Grohe', 'Duravit', 'American Standard', 'Bathroom', 'CP Fitting'],
  },
  {
    id: 'flooring',
    slug: 'flooring',
    title: 'Flooring',
    description:
      'A wide range of premium flooring options including wooden flooring, parquet, vinyl, engineered hardwood, and other modern finishes. Designed for durability and style, our flooring solutions enhance both residential and commercial spaces — featuring AGT, KLK Hardwood, and Tarkett with a perfect blend of elegance, comfort, and long-lasting performance.',
    image: '/images/products/flooring-hero.png',
    projectKeywords: ['Flooring', 'Tarkett', 'BKB', 'Welspun', 'Parquet', 'Vinyl', 'SPC'],
  },
  {
    id: 'fire-rated-doors',
    slug: 'fire-rated-doors',
    title: 'Fire Rated Doors',
    description:
      'High-performance fire rated doors engineered to contain fire and smoke, protecting lives and property across commercial, industrial, and residential projects. Navair fire rated doors meet international safety standards and are available in steel, wooden, acoustic, and glass variants — suitable for emergency exits, stairwells, corridors, and shaft openings.',
    image: '/images/products/door-hardware.jpg',
    projectKeywords: ['Fire Door', 'Navair', 'Fire Rated', 'Emergency Exit'],
  },
  {
    id: 'office-furnitures',
    slug: 'office-furnitures',
    title: 'Office Furnitures',
    description:
      'Premium office furniture solutions designed for modern workspaces — from executive offices to open-plan environments. SOS office furniture combines ergonomic design, durability, and contemporary aesthetics to create productive and visually refined work environments for commercial and institutional projects.',
    image: '/images/products/ceiling.jpg',
    projectKeywords: ['Office Furniture', 'SOS', 'Furniture', 'Workstation'],
  },
];

export const PRODUCT_DOMAINS: ProductDomain[] = PRODUCT_DOMAIN_META.map((meta) => ({
  ...meta,
  imagePosition: meta.imagePosition,
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
