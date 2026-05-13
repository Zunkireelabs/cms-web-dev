export type VentureSlug =
  | 'bath-n-room'
  | 'baba-muktinath'
  | '4r-technologies'
  | 'techwood'
  | 'prime-ceramics';

export interface BrandEntry {
  name: string;
  slug: string;
  country: string;
  founded?: number;
  segments: string[];
  description: string;
  venture: VentureSlug;
  tradingDomains?: string[];
  website?: string;
  logoUrl?: string;
}

export const BRANDS: BrandEntry[] = [
  // 4R Technologies
  {
    name: 'Sintex — Aqua Nishihara',
    slug: 'sintex',
    country: 'Japan',
    founded: 1931,
    segments: ['Sewage Treatment Plant'],
    description:
      'A trusted name in wastewater management, Sintex — Aqua Nishihara delivers advanced sewage treatment plant solutions for residential, commercial, and industrial projects, ensuring clean and compliant water disposal.',
    venture: '4r-technologies',
    tradingDomains: ['wastewater-management'],
    website: 'https://www.sintexonline.com',
  },

  // Bath n Room — Sanitaryware
  {
    name: 'American Standard',
    slug: 'american-standard',
    country: 'USA',
    founded: 1929,
    segments: ['Sanitary Fixtures'],
    description:
      'A globally recognised leader in bathroom and kitchen products, American Standard delivers premium sanitary fixtures combining durability, hygiene, and modern design for residential and commercial spaces.',
    venture: 'bath-n-room',
    tradingDomains: ['sanitaryware'],
    website: 'https://www.americanstandard-us.com',
    logoUrl: '/images/brands/american-standard.png',
  },
  {
    name: 'Grohe',
    slug: 'grohe',
    country: 'Germany',
    founded: 1936,
    segments: ['Sanitary Fixtures'],
    description:
      'German engineering meets refined design — Grohe offers world-class faucets, showers, and bathroom systems built for precision, longevity, and an elevated user experience.',
    venture: 'bath-n-room',
    tradingDomains: ['sanitaryware'],
    website: 'https://www.grohe.com/en-GB',
    logoUrl: '/images/brands/grohe.png',
  },

  // Baba Muktinath — Roofing
  {
    name: 'IKO',
    slug: 'iko',
    country: 'Canada',
    founded: 1951,
    segments: ['Asphalt Roofing'],
    description:
      'IKO is a leading manufacturer of high-performance asphalt roofing shingles, engineered for superior weather resistance and long-lasting protection across residential and commercial buildings.',
    venture: 'baba-muktinath',
    tradingDomains: ['roofing'],
    website: 'https://www.iko.com',
    logoUrl: '/images/brands/iko.png',
  },
  {
    name: 'Kalzip',
    slug: 'kalzip',
    country: 'Germany',
    founded: 1968,
    segments: ['Metal Roofing'],
    description:
      'Kalzip specialises in premium standing seam metal roofing and facade systems, widely used on large-scale commercial, industrial, and landmark architectural projects worldwide.',
    venture: 'baba-muktinath',
    tradingDomains: ['roofing'],
    website: 'https://www.kalzip.com/us/products/roof-systems/',
    logoUrl: '/images/brands/kalzip.png',
  },

  // Baba Muktinath — Ceilings & Facade
  {
    name: 'Armstrong',
    slug: 'armstrong',
    country: 'USA',
    founded: 1891,
    segments: ['False Ceiling and Wall Panel'],
    description:
      'The world\'s leading ceiling manufacturer, Armstrong offers an extensive range of mineral fiber, metal, and wood ceiling solutions trusted in offices, hospitals, airports, and hotels globally.',
    venture: 'baba-muktinath',
    tradingDomains: ['ceiling-systems'],
    website: 'https://www.armstrongceilings.com/commercial/en/',
    logoUrl: '/images/brands/armstrong.png',
  },
  {
    name: 'Hunter Douglas',
    slug: 'hunter-douglas',
    country: 'Germany',
    founded: 1919,
    segments: ['False Ceiling and Wall Panel', 'Facade', 'Window Blinds'],
    description:
      'A global innovator in architectural products, Hunter Douglas delivers high-performance ceiling systems, facade solutions, and solar shading trusted on landmark commercial and residential projects worldwide.',
    venture: 'baba-muktinath',
    tradingDomains: ['ceiling-systems', 'facade-solutions'],
    website: 'https://www.hunterdouglas.com',
    logoUrl: '/images/brands/hunter-douglas.png',
  },

  // Baba Muktinath — Doors, Windows, Coatings, Hardware
  {
    name: 'Tostem',
    slug: 'tostem',
    country: 'Japan',
    founded: 1967,
    segments: ['Pre-Engineered Aluminium Windows, Doors, Facade, Levers'],
    description:
      'Japan\'s premier manufacturer of precision-engineered aluminium doors, windows, and facade systems — Tostem combines cutting-edge technology with sleek design for residential and commercial construction.',
    venture: 'baba-muktinath',
    tradingDomains: ['aluminum-doors-windows'],
    website: 'https://www.tostem.com/en/',
    logoUrl: '/images/brands/tostem.png',
  },
  {
    name: 'Navair',
    slug: 'navair',
    country: 'India',
    founded: 1982,
    segments: ['Wooden / Acoustic / Metal Fire Doors'],
    description:
      'Navair is a specialist manufacturer of fire rated doors — available in steel, wooden, acoustic, and glass variants — meeting international fire safety standards for emergency exits, stairwells, and corridors.',
    venture: 'baba-muktinath',
    tradingDomains: ['fire-rated-doors'],
    website: 'https://navairindia.com/',
    logoUrl: '/images/brands/navair.png',
  },
  {
    name: 'ICA',
    slug: 'ica',
    country: 'Italy',
    founded: 1971,
    segments: ['Wood Coating'],
    description:
      'An Italian leader in surface finishing, ICA brings over 50 years of expertise in wood, glass, and metal coating systems — delivering durable, high-quality finishes for residential and commercial applications.',
    venture: 'baba-muktinath',
    tradingDomains: ['wood-glass-metal-coating'],
    website: 'https://www.icapidilite.com',
    logoUrl: '/images/brands/ica.png',
  },
  {
    name: 'Zolon',
    slug: 'zolon',
    country: 'India',
    founded: 2015,
    segments: ['Glass Railing'],
    description:
      'Zolon offers premium stainless steel and glass railing systems that combine structural safety with contemporary aesthetics — ideal for balconies, staircases, and facade applications.',
    venture: 'baba-muktinath',
    tradingDomains: ['architectural-railings'],
    website: 'https://zolonhardware.com',
    logoUrl: '/images/brands/zolon.png',
  },
  {
    name: 'Dormakaba',
    slug: 'dormakaba',
    country: 'Germany',
    founded: 1862,
    segments: [
      'Digital and RFID Locks',
      'Acoustic Movable Walls',
      'Architectural Hardware',
      'Automatic Sensor Sliding / Revolving Doors',
      'Glass Facade / Canopy / Skylite',
      'Internal Acoustic Glass Partitions',
      'Glass Shower Cubicles',
    ],
    description:
      'A global leader in access and security solutions, Dormakaba provides digital locks, movable walls, automatic doors, and architectural hardware — trusted across hotels, hospitals, offices, and institutions worldwide.',
    venture: 'baba-muktinath',
    tradingDomains: ['door-hardware', 'aluminum-doors-windows'],
    website: 'https://www.dormakabagroup.com/en',
    logoUrl: '/images/brands/dormakaba.png',
  },

  // Baba Muktinath — Waterproofing
  {
    name: 'Schomburg',
    slug: 'schomburg',
    country: 'Germany',
    founded: 1966,
    segments: ['Waterproofing, Epoxy, Construction Chemicals'],
    description:
      'Schomburg is a German manufacturer of professional waterproofing, epoxy, and construction chemical systems — providing long-lasting structural protection for basements, terraces, wet areas, and facades.',
    venture: 'baba-muktinath',
    tradingDomains: ['waterproofing'],
    website: 'https://www.schomburg.com/de/en',
    logoUrl: '/images/brands/schomburg.png',
  },

  // Techwood — Flooring & Furniture
  {
    name: 'AGT',
    slug: 'agt',
    country: 'Turkey',
    founded: 1984,
    segments: ['Wooden Flooring', 'Engineered Wood'],
    description:
      'AGT is a leading Turkish manufacturer of premium laminate and engineered wood flooring, combining European technology with stylish finishes suited for both residential and high-traffic commercial spaces.',
    venture: 'techwood',
    tradingDomains: ['flooring'],
    website: 'https://www.agtwood.com',
    logoUrl: '/images/brands/agt.jpg',
  },
  {
    name: 'Tarkett',
    slug: 'tarkett',
    country: 'France',
    founded: 1997,
    segments: ['Vinyl Flooring', 'Commercial Flooring'],
    description:
      'A French flooring innovator, Tarkett offers a wide range of commercial vinyl and luxury flooring solutions designed for durability, aesthetics, and sustainability in high-traffic environments.',
    venture: 'techwood',
    tradingDomains: ['flooring'],
    website: 'https://commercial.tarkett.com',
    logoUrl: '/images/brands/tarkett.png',
  },
  {
    name: 'Argil',
    slug: 'argil',
    country: 'India',
    segments: ['Wide Plank Flooring'],
    description:
      'Argil specialises in wide plank flooring, delivering natural hardwood and engineered wood floors with a distinctive architectural aesthetic for premium residential and commercial interiors.',
    venture: 'techwood',
    tradingDomains: ['flooring'],
    website: 'https://wideplankflooring.com/our-floors/',
  },
  {
    name: 'KLK Hardwood Flooring',
    slug: 'klk-hardwood',
    country: 'Malaysia',
    segments: ['Engineered Hardwood Flooring'],
    description:
      'KLK produces certified engineered hardwood flooring crafted from sustainably sourced timber — offering natural beauty, structural stability, and long-lasting performance for commercial and residential spaces.',
    venture: 'techwood',
    tradingDomains: ['flooring'],
    website: 'https://klkflooring.com',
  },
  {
    name: 'Welspun',
    slug: 'welspun',
    country: 'India',
    founded: 1985,
    segments: ['Flooring'],
    description:
      'Welspun is one of India\'s leading flooring brands, offering a diverse range of carpet tiles, rugs, and specialty flooring solutions for residential, hospitality, and commercial projects.',
    venture: 'techwood',
    tradingDomains: ['flooring'],
    website: 'https://welspunflooring.com',
    logoUrl: '/images/brands/welspun.png',
  },
  {
    name: 'SOS',
    slug: 'sos',
    country: 'India',
    segments: ['Office Furniture'],
    description:
      'SOS provides ergonomic, modular office furniture solutions designed for modern corporate environments — from executive workstations to collaborative open-plan setups, combining functionality with contemporary design.',
    venture: 'techwood',
    tradingDomains: ['office-furnitures'],
    website: 'https://www.sosoffice.in/products/',
  },
];

export const VENTURE_LABELS: Record<VentureSlug, string> = {
  'bath-n-room': 'Bath N Room',
  'baba-muktinath': 'Baba Muktinath Fabricators',
  '4r-technologies': '4R Technologies',
  techwood: 'Techwood',
  'prime-ceramics': 'Prime Ceramics',
};

export function getBrandsByVenture(venture: VentureSlug): BrandEntry[] {
  return BRANDS.filter((b) => b.venture === venture);
}

export function getBrandsByTradingDomain(domainSlug: string): BrandEntry[] {
  return BRANDS.filter((b) => b.tradingDomains?.includes(domainSlug));
}

export function getBrandCountByVenture(): Record<VentureSlug, number> {
  return BRANDS.reduce(
    (acc, b) => {
      acc[b.venture] = (acc[b.venture] ?? 0) + 1;
      return acc;
    },
    {
      'bath-n-room': 0,
      'baba-muktinath': 0,
      '4r-technologies': 0,
      techwood: 0,
      'prime-ceramics': 0,
    } as Record<VentureSlug, number>,
  );
}

export const TOTAL_BRAND_COUNT = BRANDS.length;
