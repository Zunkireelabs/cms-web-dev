export type VentureSlug =
  | 'bath-n-room'
  | 'baba-muktinath'
  | '4r-technologies'
  | 'techwood';

export interface BrandEntry {
  name: string;
  slug: string;
  country: string;
  founded?: number;
  segments: string[];
  venture: VentureSlug;
  tradingDomains?: string[];
}

export const BRANDS: BrandEntry[] = [
  // 4R Technologies
  {
    name: 'Sintex — Aqua Nishihara',
    slug: 'sintex',
    country: 'Japan',
    founded: 1931,
    segments: ['Sewage Treatment Plant'],
    venture: '4r-technologies',
    tradingDomains: ['wastewater-management'],
  },
  {
    name: 'Oase',
    slug: 'oase',
    country: 'Germany',
    founded: 1949,
    segments: ['Water Fountain'],
    venture: '4r-technologies',
    tradingDomains: ['wastewater-management'],
  },
  {
    name: 'Pentair',
    slug: 'pentair',
    country: 'USA',
    founded: 1966,
    segments: ['Swimming Pool Solution'],
    venture: '4r-technologies',
    tradingDomains: ['wastewater-management'],
  },
  {
    name: 'Kingspan Rhino',
    slug: 'kingspan-rhino',
    country: 'Australia',
    founded: 1993,
    segments: ['Water Storage'],
    venture: '4r-technologies',
    tradingDomains: ['wastewater-management'],
  },

  // Bath n Room — Sanitary Fixtures
  {
    name: 'American Standard',
    slug: 'american-standard',
    country: 'USA',
    founded: 1929,
    segments: ['Sanitary Fixtures'],
    venture: 'bath-n-room',
    tradingDomains: ['sanitaryware'],
  },
  {
    name: 'Grohe',
    slug: 'grohe',
    country: 'Germany',
    founded: 1936,
    segments: ['Sanitary Fixtures'],
    venture: 'bath-n-room',
    tradingDomains: ['sanitaryware'],
  },
  {
    name: 'Duravit',
    slug: 'duravit',
    country: 'Germany',
    founded: 1817,
    segments: ['Sanitary Fixtures'],
    venture: 'bath-n-room',
    tradingDomains: ['sanitaryware'],
  },
  {
    name: 'RAK Ceramics',
    slug: 'rak',
    country: 'UAE',
    founded: 1989,
    segments: ['Sanitary Fixtures', 'Flooring'],
    venture: 'bath-n-room',
    tradingDomains: ['sanitaryware'],
  },
  {
    name: 'Acquaviva',
    slug: 'acquaviva',
    country: 'India',
    founded: 1958,
    segments: ['Sanitary Fixtures'],
    venture: 'bath-n-room',
    tradingDomains: ['sanitaryware'],
  },
  {
    name: 'Viega',
    slug: 'viega',
    country: 'Germany',
    founded: 1899,
    segments: ['Sanitary Fixtures'],
    venture: 'bath-n-room',
    tradingDomains: ['sanitaryware'],
  },
  {
    name: 'Schell',
    slug: 'schell',
    country: 'Germany',
    founded: 1932,
    segments: ['Sanitary Fixtures'],
    venture: 'bath-n-room',
    tradingDomains: ['sanitaryware'],
  },
  {
    name: 'VRH',
    slug: 'vrh',
    country: 'Thailand',
    founded: 1958,
    segments: ['Sanitary Fixtures'],
    venture: 'bath-n-room',
    tradingDomains: ['sanitaryware'],
  },
  {
    name: 'Parryware',
    slug: 'parryware',
    country: 'India',
    founded: 1958,
    segments: ['Sanitary Fixtures'],
    venture: 'bath-n-room',
    tradingDomains: ['sanitaryware'],
  },
  {
    name: 'Plato',
    slug: 'plato',
    country: 'India',
    founded: 1990,
    segments: ['Sanitary Fixtures'],
    venture: 'bath-n-room',
    tradingDomains: ['sanitaryware'],
  },
  {
    name: 'Huida',
    slug: 'huida',
    country: 'China',
    founded: 1982,
    segments: ['Sanitary Fixtures'],
    venture: 'bath-n-room',
    tradingDomains: ['sanitaryware'],
  },
  {
    name: 'Essel',
    slug: 'essel',
    country: 'India',
    founded: 1998,
    segments: ['Sanitary Fixtures'],
    venture: 'bath-n-room',
    tradingDomains: ['sanitaryware'],
  },

  // Bath n Room — Flooring
  {
    name: 'Somany',
    slug: 'somany',
    country: 'India',
    founded: 1968,
    segments: ['Flooring'],
    venture: 'bath-n-room',
  },
  {
    name: 'Nitco',
    slug: 'nitco',
    country: 'India',
    founded: 1966,
    segments: ['Flooring'],
    venture: 'bath-n-room',
  },
  {
    name: 'Ardey Endura',
    slug: 'ardey-endura',
    country: 'Germany',
    founded: 1949,
    segments: ['Flooring'],
    venture: 'bath-n-room',
  },
  {
    name: 'Ecoflex',
    slug: 'ecoflex-bnr',
    country: 'Netherlands',
    founded: 1920,
    segments: ['Flooring'],
    venture: 'bath-n-room',
  },
  {
    name: 'Marble & Granite',
    slug: 'marble-granite',
    country: 'Natural Resources',
    segments: ['Flooring'],
    venture: 'bath-n-room',
  },
  {
    name: 'AGT',
    slug: 'agt',
    country: 'Turkey',
    founded: 1984,
    segments: ['Flooring'],
    venture: 'bath-n-room',
  },
  {
    name: 'Piccolo',
    slug: 'piccolo',
    country: 'India',
    founded: 1987,
    segments: ['Flooring'],
    venture: 'bath-n-room',
  },

  // Baba Muktinath — Roofing
  {
    name: 'IKO',
    slug: 'iko',
    country: 'Canada',
    founded: 1951,
    segments: ['Asphalt Roofing'],
    venture: 'baba-muktinath',
    tradingDomains: ['roofing'],
  },
  {
    name: 'Kalzip',
    slug: 'kalzip',
    country: 'Germany',
    founded: 1968,
    segments: ['Metal Roofing'],
    venture: 'baba-muktinath',
    tradingDomains: ['roofing'],
  },
  {
    name: 'Kingspan',
    slug: 'kingspan',
    country: 'Ireland',
    founded: 1913,
    segments: ['Metal Roofing'],
    venture: 'baba-muktinath',
    tradingDomains: ['roofing'],
  },
  {
    name: 'SCG',
    slug: 'scg',
    country: 'Thailand',
    founded: 1966,
    segments: ['Ceramic Concrete Roofing'],
    venture: 'baba-muktinath',
    tradingDomains: ['roofing'],
  },
  {
    name: 'First Corp',
    slug: 'first-corp',
    country: 'Italy',
    segments: ['UPVC Roofing'],
    venture: 'baba-muktinath',
    tradingDomains: ['roofing'],
  },

  // Baba Muktinath — Ceilings & Facade
  {
    name: 'Armstrong',
    slug: 'armstrong',
    country: 'USA',
    founded: 1891,
    segments: ['False Ceiling and Wall Panel'],
    venture: 'baba-muktinath',
    tradingDomains: ['ceiling-systems'],
  },
  {
    name: 'Hunter Douglas',
    slug: 'hunter-douglas',
    country: 'Germany',
    founded: 1919,
    segments: ['False Ceiling and Wall Panel', 'Facade', 'Window Blinds'],
    venture: 'baba-muktinath',
    tradingDomains: ['ceiling-systems', 'facade-solutions'],
  },
  {
    name: 'Rucca',
    slug: 'rucca',
    country: 'China',
    founded: 2010,
    segments: ['False Ceiling and Wall Panel', 'Wall Cladding'],
    venture: 'baba-muktinath',
    tradingDomains: ['ceiling-systems', 'facade-solutions'],
  },
  {
    name: 'Eurolux',
    slug: 'eurolux',
    country: 'India',
    founded: 2008,
    segments: ['Stretch Ceiling'],
    venture: 'baba-muktinath',
    tradingDomains: ['ceiling-systems'],
  },

  // Baba Muktinath — Doors, Windows, Coatings, Hardware
  {
    name: 'Tostem',
    slug: 'tostem',
    country: 'Japan',
    founded: 1967,
    segments: ['Pre-Engineered Aluminium Windows, Doors, Facade, Levers'],
    venture: 'baba-muktinath',
    tradingDomains: ['aluminum-doors-windows'],
  },
  {
    name: 'Navair',
    slug: 'navair',
    country: 'India',
    founded: 1982,
    segments: ['Wooden / Acoustic / Metal Fire Doors'],
    venture: 'baba-muktinath',
    tradingDomains: ['door-hardware'],
  },
  {
    name: 'Sumai',
    slug: 'sumai',
    country: 'India',
    founded: 1996,
    segments: ['Wooden / Acoustic / Metal Fire Doors'],
    venture: 'baba-muktinath',
    tradingDomains: ['door-hardware'],
  },
  {
    name: 'ICA',
    slug: 'ica',
    country: 'Italy',
    founded: 1971,
    segments: ['Wood Coating'],
    venture: 'baba-muktinath',
    tradingDomains: ['wood-glass-metal-coating'],
  },
  {
    name: 'Zolon',
    slug: 'zolon',
    country: 'India',
    founded: 2015,
    segments: ['Glass Railing'],
    venture: 'baba-muktinath',
    tradingDomains: ['architectural-railings'],
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
    venture: 'baba-muktinath',
    tradingDomains: ['door-hardware', 'aluminum-doors-windows'],
  },
  {
    name: 'Gunnebo',
    slug: 'gunnebo',
    country: 'Sweden',
    founded: 1764,
    segments: ['Security Products'],
    venture: 'baba-muktinath',
  },
  {
    name: 'Wöhr',
    slug: 'wohr',
    country: 'Germany',
    founded: 1902,
    segments: ['Parking Solution'],
    venture: 'baba-muktinath',
  },
  {
    name: 'Stylam',
    slug: 'stylam',
    country: 'India',
    founded: 1991,
    segments: ['Toilet Cubicles'],
    venture: 'baba-muktinath',
  },

  // Baba Muktinath — Waterproofing & Specialty
  {
    name: 'Schomburg',
    slug: 'schomburg',
    country: 'Germany',
    founded: 1966,
    segments: ['Waterproofing, Epoxy, Construction Chemicals'],
    venture: 'baba-muktinath',
    tradingDomains: ['waterproofing'],
  },
  {
    name: 'Shalimar Tar Products',
    slug: 'shalimar',
    country: 'India',
    founded: 1935,
    segments: ['Waterproofing, Epoxy, Construction Chemicals'],
    venture: 'baba-muktinath',
    tradingDomains: ['waterproofing'],
  },
  {
    name: 'Ardex Endura',
    slug: 'ardex-endura',
    country: 'Germany — India',
    founded: 1997,
    segments: ['Waterproofing, Epoxy, Construction Chemicals'],
    venture: 'baba-muktinath',
    tradingDomains: ['waterproofing'],
  },
  {
    name: 'Construction Specialities',
    slug: 'construction-specialities',
    country: 'USA',
    founded: 1948,
    segments: ['Expansion Joints, Acrovyn, Louvers, Entrance Flooring'],
    venture: 'baba-muktinath',
  },
  {
    name: 'Unitile',
    slug: 'unitile',
    country: 'India',
    founded: 2007,
    segments: ['Raised Access Flooring'],
    venture: 'baba-muktinath',
  },
  {
    name: 'Ecoflex (Sports)',
    slug: 'ecoflex-sports',
    country: 'India',
    founded: 1959,
    segments: ['Premium Synthetic Safety and Sports Flooring'],
    venture: 'baba-muktinath',
  },
  {
    name: 'Nowofill Ginni Spectra',
    slug: 'nowofill',
    country: 'India',
    founded: 1992,
    segments: ['Geotextiles & Non-Woven Insulations'],
    venture: 'baba-muktinath',
  },
  {
    name: 'SICO',
    slug: 'sico',
    country: 'India',
    segments: ['Micro Silica'],
    venture: 'baba-muktinath',
  },

  // Techwood
  {
    name: 'Spacewood',
    slug: 'spacewood',
    country: 'India',
    founded: 1996,
    segments: ['Office Furniture'],
    venture: 'techwood',
  },
  {
    name: 'Tarkett',
    slug: 'tarkett',
    country: 'France',
    founded: 1997,
    segments: ['Flooring'],
    venture: 'techwood',
  },
  {
    name: 'Unitile (Flooring)',
    slug: 'unitile-flooring',
    country: 'India',
    segments: ['Flooring'],
    venture: 'techwood',
  },
  {
    name: 'BKB',
    slug: 'bkb',
    country: 'Malaysia',
    founded: 1994,
    segments: ['Flooring'],
    venture: 'techwood',
  },
  {
    name: 'Welspun',
    slug: 'welspun',
    country: 'India',
    founded: 1985,
    segments: ['Flooring'],
    venture: 'techwood',
  },
  {
    name: 'Brazilian Wood',
    slug: 'brazilian-wood',
    country: 'Brazil',
    segments: ['Seasoned Wood'],
    venture: 'techwood',
  },
];

export const VENTURE_LABELS: Record<VentureSlug, string> = {
  'bath-n-room': 'Bath N Room',
  'baba-muktinath': 'Baba Muktinath Fabricators',
  '4r-technologies': '4R Technologies',
  techwood: 'Techwood',
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
    { 'bath-n-room': 0, 'baba-muktinath': 0, '4r-technologies': 0, techwood: 0 } as Record<VentureSlug, number>,
  );
}

export const TOTAL_BRAND_COUNT = BRANDS.length;
