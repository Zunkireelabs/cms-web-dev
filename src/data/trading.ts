export interface Brand {
  id: string;
  name: string;
  logo?: string;
  description: string;
  country: string;
  website: string;
  catalogue?: string;
  featured?: boolean;
}

export interface TradingCategory {
  slug: string;
  name: string;
  title: string;
  description: string;
  overview: string;
  image?: string;
  brands: Brand[];
}

export const TRADING_CATEGORIES: TradingCategory[] = [
  {
    slug: 'false-ceiling',
    name: 'False Ceiling',
    title: 'False Ceiling Solutions',
    description: 'Premium suspended ceiling systems from world-leading manufacturers.',
    overview: `We supply and install a comprehensive range of false ceiling solutions for commercial, industrial, and residential projects. Our product portfolio includes acoustic ceiling tiles, metal ceilings, gypsum boards, and specialty ceiling systems designed to meet the highest standards of quality, aesthetics, and performance.

Our partnerships with global manufacturers ensure access to cutting-edge ceiling technologies that offer superior sound absorption, fire resistance, moisture resistance, and design flexibility. Whether you need a simple drop ceiling or a complex architectural feature, we have the products and expertise to deliver.`,
    image: '/images/trading/false-ceiling.jpg',
    brands: [
      {
        id: 'armstrong',
        name: 'Armstrong Ceiling Solutions',
        description: 'Global leader in ceiling solutions offering acoustic, metal, and specialty ceilings for commercial spaces.',
        country: 'USA',
        website: 'https://www.armstrongceilings.com',
        catalogue: 'https://www.armstrongceilings.com/commercial/en/resources/literature.html',
        featured: true,
      },
      {
        id: 'rockfon',
        name: 'Rockfon',
        description: 'Stone wool acoustic ceiling solutions providing excellent sound absorption and fire safety.',
        country: 'Denmark',
        website: 'https://www.rockfon.com',
        catalogue: 'https://www.rockfon.com/resources/',
        featured: true,
      },
      {
        id: 'knauf',
        name: 'Knauf AMF',
        description: 'Innovative ceiling systems including mineral, metal, and wood solutions for diverse applications.',
        country: 'Germany',
        website: 'https://www.knaufamf.com',
        catalogue: 'https://www.knaufamf.com/downloads/',
      },
      {
        id: 'saint-gobain',
        name: 'Saint-Gobain Gyproc',
        description: 'Gypsum-based ceiling and drywall solutions for interior construction.',
        country: 'France',
        website: 'https://www.gyproc.com',
        catalogue: 'https://www.gyproc.com/downloads',
      },
    ],
  },
  {
    slug: 'roofing',
    name: 'Roofing',
    title: 'Roofing Systems',
    description: 'High-performance roofing materials for durability and weather protection.',
    overview: `Our roofing division offers complete roofing solutions including metal roofing, waterproofing membranes, insulation systems, and accessories. We partner with industry-leading manufacturers to provide products that withstand extreme weather conditions while maintaining aesthetic appeal.

From large industrial warehouses to commercial complexes, our roofing systems are engineered for longevity, energy efficiency, and low maintenance. Our technical team provides full support from specification to installation, ensuring optimal performance for every project.`,
    image: '/images/trading/roofing.jpg',
    brands: [
      {
        id: 'kingspan',
        name: 'Kingspan',
        description: 'Insulated metal panels and building envelope solutions for energy-efficient construction.',
        country: 'Ireland',
        website: 'https://www.kingspan.com',
        catalogue: 'https://www.kingspan.com/group/resources',
        featured: true,
      },
      {
        id: 'firestone',
        name: 'Firestone Building Products',
        description: 'Commercial roofing systems including EPDM, TPO, and metal roofing solutions.',
        country: 'USA',
        website: 'https://www.firestonebpco.com',
        catalogue: 'https://www.firestonebpco.com/resources/',
        featured: true,
      },
      {
        id: 'sika',
        name: 'Sika Roofing',
        description: 'Waterproofing membranes and roofing systems for flat and low-slope applications.',
        country: 'Switzerland',
        website: 'https://www.sika.com',
        catalogue: 'https://www.sika.com/en/knowledge-hub.html',
      },
      {
        id: 'bluescope',
        name: 'BlueScope Steel',
        description: 'Premium steel roofing and walling products with advanced coating technology.',
        country: 'Australia',
        website: 'https://www.bluescope.com',
        catalogue: 'https://www.bluescope.com/resources/',
      },
    ],
  },
  {
    slug: 'aluminum-doors-windows',
    name: 'Aluminum Doors & Windows',
    title: 'Aluminum Doors & Windows',
    description: 'Architectural aluminum systems for facades, doors, and windows.',
    overview: `We specialize in high-quality aluminum door and window systems designed for modern architecture. Our product range includes curtain walls, sliding systems, folding doors, casement windows, and entrance solutions that combine aesthetic elegance with superior thermal and acoustic performance.

Our aluminum systems meet international standards for energy efficiency, weather resistance, and security. With a wide range of profiles, finishes, and configurations available, we can accommodate any architectural vision from contemporary minimalism to classic elegance.`,
    image: '/images/trading/aluminum.jpg',
    brands: [
      {
        id: 'technal',
        name: 'Technal',
        description: 'Comprehensive aluminum building solutions including windows, doors, and curtain walls.',
        country: 'France',
        website: 'https://www.technal.com',
        catalogue: 'https://www.technal.com/en/documentation/',
        featured: true,
      },
      {
        id: 'reynaers',
        name: 'Reynaers Aluminium',
        description: 'Innovative aluminum solutions for windows, doors, curtain walls, and sun screening.',
        country: 'Belgium',
        website: 'https://www.reynaers.com',
        catalogue: 'https://www.reynaers.com/downloads',
        featured: true,
      },
      {
        id: 'schuco',
        name: 'Schüco',
        description: 'Premium window, door, and facade systems with industry-leading thermal performance.',
        country: 'Germany',
        website: 'https://www.schueco.com',
        catalogue: 'https://www.schueco.com/web2/com/architects/downloads',
      },
      {
        id: 'kawneer',
        name: 'Kawneer',
        description: 'Architectural aluminum systems for commercial building facades and entrances.',
        country: 'USA',
        website: 'https://www.kawneer.com',
        catalogue: 'https://www.kawneer.com/kawneer/north_america/en/literature.asp',
      },
    ],
  },
  {
    slug: 'flooring',
    name: 'Flooring',
    title: 'Flooring Solutions',
    description: 'Commercial and industrial flooring systems for every application.',
    overview: `Our flooring division provides a complete range of flooring solutions for commercial, industrial, healthcare, education, and hospitality sectors. From raised access floors to vinyl tiles, carpet tiles to epoxy coatings, we offer products that meet the demanding requirements of modern spaces.

We focus on durability, safety, and sustainability, partnering with manufacturers who share our commitment to quality. Our flooring solutions are designed for high-traffic environments and come with comprehensive warranties and technical support.`,
    image: '/images/trading/flooring.jpg',
    brands: [
      {
        id: 'interface',
        name: 'Interface',
        description: 'Sustainable modular flooring including carpet tiles and LVT for commercial spaces.',
        country: 'USA',
        website: 'https://www.interface.com',
        catalogue: 'https://www.interface.com/resources',
        featured: true,
      },
      {
        id: 'tarkett',
        name: 'Tarkett',
        description: 'Innovative flooring solutions including vinyl, linoleum, wood, and sports surfaces.',
        country: 'France',
        website: 'https://www.tarkett.com',
        catalogue: 'https://www.tarkett.com/en/downloads',
        featured: true,
      },
      {
        id: 'forbo',
        name: 'Forbo Flooring',
        description: 'Linoleum, vinyl, carpet tiles, and entrance flooring systems for commercial use.',
        country: 'Switzerland',
        website: 'https://www.forbo.com',
        catalogue: 'https://www.forbo.com/flooring/en-gl/downloads/',
      },
      {
        id: 'kingspan-access',
        name: 'Kingspan Access Floors',
        description: 'Raised access flooring systems for offices, data centers, and commercial buildings.',
        country: 'Ireland',
        website: 'https://www.kingspan.com/group/raised-access-floors',
        catalogue: 'https://www.kingspan.com/group/raised-access-floors/resources',
      },
    ],
  },
  {
    slug: 'insulation',
    name: 'Insulation',
    title: 'Thermal & Acoustic Insulation',
    description: 'Energy-efficient insulation solutions for buildings and industrial applications.',
    overview: `We supply high-performance insulation materials for thermal, acoustic, and fire protection applications. Our product range includes mineral wool, glass wool, foam boards, and specialty insulation products designed for walls, roofs, floors, HVAC systems, and industrial equipment.

Energy efficiency is at the core of our insulation solutions. Our products help reduce heating and cooling costs, improve indoor comfort, and contribute to sustainable building certifications like LEED and BREEAM.`,
    image: '/images/trading/insulation.jpg',
    brands: [
      {
        id: 'rockwool',
        name: 'ROCKWOOL',
        description: 'Stone wool insulation for thermal, acoustic, and fire protection in buildings.',
        country: 'Denmark',
        website: 'https://www.rockwool.com',
        catalogue: 'https://www.rockwool.com/downloads/',
        featured: true,
      },
      {
        id: 'owens-corning',
        name: 'Owens Corning',
        description: 'Fiberglass insulation and building materials for residential and commercial construction.',
        country: 'USA',
        website: 'https://www.owenscorning.com',
        catalogue: 'https://www.owenscorning.com/en-us/insulation/resources',
        featured: true,
      },
      {
        id: 'armacell',
        name: 'Armacell',
        description: 'Flexible foam insulation for HVAC, plumbing, and industrial applications.',
        country: 'Luxembourg',
        website: 'https://www.armacell.com',
        catalogue: 'https://www.armacell.com/downloads',
      },
    ],
  },
];

export function getTradingCategory(slug: string): TradingCategory | undefined {
  return TRADING_CATEGORIES.find((category) => category.slug === slug);
}

export function getAllTradingCategories(): TradingCategory[] {
  return TRADING_CATEGORIES;
}

export function getAllTradingSlugs(): string[] {
  return TRADING_CATEGORIES.map((category) => category.slug);
}
