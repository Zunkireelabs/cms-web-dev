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

export const PRODUCT_DOMAINS: ProductDomain[] = [
  {
    id: 'roofing',
    slug: 'roofing',
    title: 'Roofing Systems',
    description: 'Premium roofing solutions for commercial, industrial, and residential projects. Our roofing systems offer superior weather protection, durability, and aesthetic appeal.',
    image: '/images/products/roofing.jpg',
    brands: [
      {
        name: 'IKO',
        specialty: 'Bituminous Roofing & Waterproofing Membranes',
        description: 'Experience the excellence of IKO, a global leader in roofing and waterproofing solutions, known for innovative design and lasting performance.',
        website: 'https://www.iko.com',
        catalogueUrl: 'https://www.iko.com/commercial/products/',
        brochureUrl: '#',
        country: 'Canada',
      },
    ],
  },
  {
    id: 'facade',
    slug: 'facade-solutions',
    title: 'Facade Solutions',
    description: 'Innovative facade systems that combine aesthetics with functionality. Transform building exteriors with our premium cladding and curtain wall solutions.',
    image: '/images/products/facade.jpg',
    brands: [
      {
        name: 'Hunter Douglas',
        specialty: 'Architectural Facades & Sun Control Systems',
        description: 'Discover Hunter Douglas, the world-renowned leader in architectural products and custom window coverings, offering exceptional design and innovation.',
        website: 'https://www.hunterdouglas.com',
        catalogueUrl: 'https://www.hunterdouglas.com/architectural',
        brochureUrl: '#',
        country: 'Netherlands',
      },
    ],
  },
  {
    id: 'ceiling',
    slug: 'ceiling-systems',
    title: 'Ceiling Systems',
    description: 'Professional ceiling solutions for commercial and residential spaces. Our ceiling systems offer superior acoustics, aesthetics, and functionality.',
    image: '/images/products/ceiling.jpg',
    brands: [
      {
        name: 'Armstrong',
        specialty: 'Commercial Ceiling Systems & Acoustic Solutions',
        description: 'Trust Armstrong, the global leader in ceiling solutions, providing innovative ceiling systems that enhance acoustics, aesthetics, and sustainability.',
        website: 'https://www.armstrongceilings.com',
        catalogueUrl: 'https://www.armstrongceilings.com/commercial/en/',
        brochureUrl: '#',
        country: 'USA',
      },
    ],
  },
  {
    id: 'aluminum',
    slug: 'aluminum-doors-windows',
    title: 'Aluminum Doors and Windows',
    description: 'High-performance aluminum door and window systems that deliver superior thermal insulation, acoustic performance, and design flexibility.',
    image: '/images/products/aluminum.jpg',
    brands: [
      {
        name: 'Tostem',
        specialty: 'High-Performance Aluminum Housing Solutions',
        description: 'Experience the precision of Tostem, global leader in high-performance aluminum housing solutions, known for premium quality and durability.',
        website: 'https://www.tostem.co.jp/english/',
        catalogueUrl: 'https://www.tostem.co.jp/english/products/',
        brochureUrl: '#',
        country: 'Japan',
      },
    ],
  },
  {
    id: 'coating',
    slug: 'wood-glass-metal-coating',
    title: 'Wood, Glass, and Metal Coating',
    description: 'Advanced coating solutions for wood, glass, and metal surfaces, providing protection, enhancement, and longevity for interior and exterior applications.',
    image: '/images/products/coating.jpg',
    brands: [
      {
        name: 'ICA',
        specialty: 'Italian Wood, Glass & Metal Coatings',
        description: 'Trust ICA, the Italian leader in wood coatings, offering innovative solutions for wood, glass, and metal with superior protection and aesthetics.',
        website: 'https://www.icaspa.com',
        catalogueUrl: 'https://www.icaspa.com/en/products',
        brochureUrl: '#',
        country: 'Italy',
      },
    ],
  },
  {
    id: 'hardware',
    slug: 'door-hardware',
    title: 'Door Hardware and Accessories',
    description: 'Complete range of door hardware and accessories including locks, hinges, handles, and access control systems for commercial and residential applications.',
    image: '/images/products/hardware.jpg',
    brands: [
      {
        name: 'Dormakaba',
        specialty: 'Smart Access & Door Control Solutions',
        description: 'Rely on Dormakaba, the premium door technology brand offering innovative solutions for door control, automatic doors, and access systems worldwide.',
        website: 'https://www.dormakaba.com',
        catalogueUrl: 'https://www.dormakaba.com/products-solutions',
        brochureUrl: '#',
        country: 'Switzerland',
      },
    ],
  },
  {
    id: 'railings',
    slug: 'architectural-railings',
    title: 'Architectural Railings',
    description: 'Premium railing systems for balconies, staircases, and terraces. Combining safety with elegant design for modern architectural projects.',
    image: '/images/products/railings.jpg',
    brands: [
      {
        name: 'Zolon',
        specialty: 'Premium Architectural Railing Systems',
        description: 'Discover Zolon, the leader in premium railing systems, offering innovative designs for balustrades, handrails, and glass railings.',
        website: 'https://www.zolon.com',
        catalogueUrl: 'https://www.zolon.com/products/',
        brochureUrl: '#',
        country: 'India',
      },
    ],
  },
  {
    id: 'waterproofing',
    slug: 'waterproofing',
    title: 'Waterproofing Systems',
    description: 'Comprehensive waterproofing solutions for basements, roofs, bathrooms, and foundations. Protect your structures from water damage.',
    image: '/images/products/waterproofing.jpg',
    brands: [
      {
        name: 'Schomburg',
        specialty: 'Construction Chemicals & Waterproofing Solutions',
        description: 'Trust Schomburg, the German leader in waterproofing and construction chemicals, providing reliable protection for buildings and infrastructure.',
        website: 'https://www.schomburg.com',
        catalogueUrl: 'https://www.schomburg.com/products',
        brochureUrl: '#',
        country: 'Germany',
      },
    ],
  },
  {
    id: 'wastewater',
    slug: 'wastewater-management',
    title: 'Wastewater Management Solutions',
    description: 'Efficient wastewater treatment and management systems for commercial, industrial, and municipal applications.',
    image: '/images/products/wastewater.jpg',
    brands: [
      {
        name: 'Sintex',
        specialty: 'Water Storage & Wastewater Management Systems',
        description: 'Partner with Sintex, the leader in water storage and wastewater management solutions, offering advanced systems for all applications.',
        website: 'https://www.sintex.in',
        catalogueUrl: 'https://www.sintex.in/products',
        brochureUrl: '#',
        country: 'India',
      },
    ],
  },
  {
    id: 'sanitaryware',
    slug: 'sanitaryware',
    title: 'Sanitaryware and Bathroom Solutions',
    description: 'Premium bathroom fixtures and sanitaryware from leading global brands. Complete solutions for modern, luxurious bathrooms.',
    image: '/images/products/sanitaryware.jpg',
    brands: [
      {
        name: 'American Standard',
        specialty: 'Bathroom Fixtures & Kitchen Solutions',
        description: 'Experience American Standard, a premier sanitaryware brand, offering innovative bathroom solutions with cutting-edge technology and elegant design.',
        website: 'https://www.americanstandard.com',
        catalogueUrl: 'https://www.americanstandard.com/products',
        brochureUrl: '#',
        country: 'USA',
      },
      {
        name: 'Grohe',
        specialty: 'Premium Bathroom Fittings & Technology',
        description: 'Discover Grohe, the German leader in premium bathroom fittings, known for exceptional quality, technology, and design.',
        website: 'https://www.grohe.com',
        catalogueUrl: 'https://www.grohe.com/en/products',
        brochureUrl: '#',
        country: 'Germany',
      },
    ],
  },
  {
    id: 'furniture',
    slug: 'office-furniture-flooring',
    title: 'Office Furnitures and Flooring',
    description: 'Ergonomic and stylish office furniture and flooring solutions for modern workplaces. Create productive and comfortable work environments.',
    image: '/images/products/furniture.jpg',
    brands: [
      {
        name: 'SOS',
        specialty: 'Ergonomic Office Furniture Solutions',
        description: 'Choose SOS for innovative office furniture solutions designed for the modern workplace, combining style with functionality.',
        website: 'https://www.sosfurniture.com',
        catalogueUrl: 'https://www.sosfurniture.com/products/',
        brochureUrl: '#',
        country: 'India',
      },
      {
        name: 'AGT',
        specialty: 'Premium Wood-Based Flooring Products',
        description: 'Trust AGT, the leader in premium flooring solutions, offering durable and stylish flooring for commercial and residential spaces.',
        website: 'https://www.agt.com.tr',
        catalogueUrl: 'https://www.agt.com.tr/en/products',
        brochureUrl: '#',
        country: 'Turkey',
      },
    ],
  },
];

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
    }))
  );
}
