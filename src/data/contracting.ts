export interface Project {
  id: string;
  name: string;
  client: string;
  location: string;
  year: number;
  description: string;
  image?: string;
}

export interface Capability {
  title: string;
  description: string;
}

export interface ContractingCategory {
  slug: string;
  name: string;
  title: string;
  description: string;
  overview: string;
  image?: string;
  capabilities: Capability[];
  projects: Project[];
  certifications?: string[];
}

export const CONTRACTING_CATEGORIES: ContractingCategory[] = [
  {
    slug: 'general-contracting',
    name: 'General Contracting',
    title: 'General Contracting Services',
    description: 'Full-service construction management from groundbreaking to handover.',
    overview: `CMS Trading & Contracting offers comprehensive general contracting services for commercial, industrial, and institutional projects. As your single point of responsibility, we manage all aspects of construction including planning, coordination, quality control, and project delivery.

Our experienced project managers and site teams ensure seamless execution while maintaining the highest standards of safety, quality, and schedule adherence. We leverage our extensive network of specialized subcontractors and suppliers to deliver projects on time and within budget.

From new construction to major renovations, our general contracting division has the expertise and resources to handle projects of any scale and complexity.`,
    image: '/images/contracting/general.jpg',
    capabilities: [
      {
        title: 'Design-Build Services',
        description: 'Integrated design and construction approach for streamlined project delivery.',
      },
      {
        title: 'Construction Management',
        description: 'Professional oversight and coordination of all construction activities.',
      },
      {
        title: 'Value Engineering',
        description: 'Cost optimization without compromising quality or functionality.',
      },
      {
        title: 'Quality Assurance',
        description: 'Rigorous inspection and testing protocols throughout construction.',
      },
      {
        title: 'Safety Management',
        description: 'Comprehensive HSE programs ensuring zero-incident worksites.',
      },
      {
        title: 'Schedule Control',
        description: 'Advanced planning and monitoring for on-time project completion.',
      },
    ],
    projects: [
      {
        id: 'gc-001',
        name: 'Al Rayyan Commercial Complex',
        client: 'Al Rayyan Holdings',
        location: 'Doha, Qatar',
        year: 2024,
        description: 'Mixed-use development featuring retail, office, and hospitality spaces across 45,000 sqm.',
      },
      {
        id: 'gc-002',
        name: 'Industrial Logistics Hub',
        client: 'Qatar Logistics Co.',
        location: 'Mesaieed, Qatar',
        year: 2023,
        description: 'State-of-the-art warehouse and distribution facility with automated systems.',
      },
      {
        id: 'gc-003',
        name: 'Corporate Headquarters Tower',
        client: 'National Energy Corp.',
        location: 'West Bay, Qatar',
        year: 2023,
        description: '25-story office tower with LEED Gold certification and smart building features.',
      },
    ],
    certifications: ['ISO 9001:2015', 'ISO 14001:2015', 'OHSAS 18001'],
  },
  {
    slug: 'mep-services',
    name: 'MEP Services',
    title: 'MEP Engineering Services',
    description: 'Mechanical, electrical, and plumbing solutions for modern buildings.',
    overview: `Our MEP division delivers comprehensive mechanical, electrical, and plumbing services for buildings of all types. From HVAC systems to electrical distribution, fire protection to plumbing networks, we provide end-to-end solutions that ensure comfort, safety, and energy efficiency.

Our team of licensed engineers and certified technicians brings decades of combined experience in designing, installing, and maintaining complex MEP systems. We utilize the latest technologies including BIM coordination, energy modeling, and smart building integration.

Whether it's a new installation, system upgrade, or ongoing maintenance, our MEP services are designed to optimize building performance while minimizing operational costs.`,
    image: '/images/contracting/mep.jpg',
    capabilities: [
      {
        title: 'HVAC Systems',
        description: 'Heating, ventilation, and air conditioning design and installation.',
      },
      {
        title: 'Electrical Systems',
        description: 'Power distribution, lighting, and low-voltage system installation.',
      },
      {
        title: 'Plumbing & Drainage',
        description: 'Water supply, sanitary systems, and stormwater management.',
      },
      {
        title: 'Fire Protection',
        description: 'Sprinkler systems, fire alarms, and suppression systems.',
      },
      {
        title: 'BMS Integration',
        description: 'Building management systems for centralized monitoring and control.',
      },
      {
        title: 'Energy Optimization',
        description: 'Energy audits and efficiency improvements for existing systems.',
      },
    ],
    projects: [
      {
        id: 'mep-001',
        name: 'Healthcare Complex MEP',
        client: 'Ministry of Health',
        location: 'Al Wakrah, Qatar',
        year: 2024,
        description: 'Complete MEP installation for 200-bed hospital including medical gas systems.',
      },
      {
        id: 'mep-002',
        name: 'Data Center Infrastructure',
        client: 'Tech Solutions Qatar',
        location: 'Qatar Science Park',
        year: 2023,
        description: 'Critical power and cooling systems for Tier III data center facility.',
      },
      {
        id: 'mep-003',
        name: 'Shopping Mall Retrofit',
        client: 'Doha Retail Group',
        location: 'Doha, Qatar',
        year: 2023,
        description: 'HVAC system upgrade and energy optimization for 80,000 sqm retail space.',
      },
    ],
    certifications: ['ISO 9001:2015', 'ASHRAE Member', 'NFPA Certified'],
  },
  {
    slug: 'interior-fit-out',
    name: 'Interior Fit-Out',
    title: 'Interior Fit-Out Services',
    description: 'Turnkey interior solutions for commercial and hospitality spaces.',
    overview: `CMS Interior Fit-Out division specializes in transforming empty shells into fully functional, aesthetically stunning spaces. We handle all aspects of interior construction including partitions, ceilings, flooring, joinery, and MEP coordination.

Our portfolio spans corporate offices, retail stores, restaurants, hotels, and healthcare facilities. We work closely with architects and designers to bring their visions to life while ensuring compliance with building codes and accessibility requirements.

From concept to completion, our fit-out teams deliver spaces that reflect brand identity, enhance user experience, and stand the test of time.`,
    image: '/images/contracting/fitout.jpg',
    capabilities: [
      {
        title: 'Office Fit-Out',
        description: 'Modern workplace environments designed for productivity and collaboration.',
      },
      {
        title: 'Retail Interiors',
        description: 'Brand-focused retail spaces that enhance customer experience.',
      },
      {
        title: 'Hospitality Fit-Out',
        description: 'Hotels, restaurants, and entertainment venue interiors.',
      },
      {
        title: 'Custom Joinery',
        description: 'Bespoke millwork and furniture manufacturing.',
      },
      {
        title: 'Ceiling & Partition',
        description: 'Acoustic ceilings, glass partitions, and drywall systems.',
      },
      {
        title: 'Flooring Installation',
        description: 'Premium flooring solutions including raised floors and specialty finishes.',
      },
    ],
    projects: [
      {
        id: 'fit-001',
        name: 'International Bank HQ',
        client: 'Global Banking Corp.',
        location: 'West Bay, Qatar',
        year: 2024,
        description: 'Premium office fit-out across 12 floors featuring custom joinery and smart systems.',
      },
      {
        id: 'fit-002',
        name: 'Luxury Hotel Renovation',
        client: 'Hospitality Partners',
        location: 'The Pearl, Qatar',
        year: 2023,
        description: 'Complete renovation of 150 rooms and public areas in 5-star property.',
      },
      {
        id: 'fit-003',
        name: 'Fashion Retail Flagship',
        client: 'European Fashion House',
        location: 'Villaggio Mall',
        year: 2023,
        description: 'High-end retail fit-out with custom fixtures and lighting design.',
      },
    ],
    certifications: ['ISO 9001:2015', 'BIFMA Member'],
  },
  {
    slug: 'facility-management',
    name: 'Facility Management',
    title: 'Facility Management Services',
    description: 'Comprehensive building maintenance and operations management.',
    overview: `Our Facility Management division provides integrated services to maintain, operate, and optimize building assets. We offer both hard services (technical maintenance) and soft services (cleaning, security, landscaping) under unified management.

Our approach combines preventive maintenance programs, 24/7 helpdesk support, and data-driven asset management to maximize building performance and extend equipment lifespan. We serve commercial offices, industrial facilities, residential compounds, and institutional buildings.

With our facility management partnership, property owners benefit from reduced operational costs, improved tenant satisfaction, and preserved asset value.`,
    image: '/images/contracting/facility.jpg',
    capabilities: [
      {
        title: 'Preventive Maintenance',
        description: 'Scheduled maintenance programs to prevent equipment failures.',
      },
      {
        title: 'Reactive Maintenance',
        description: '24/7 response for emergency repairs and breakdowns.',
      },
      {
        title: 'Energy Management',
        description: 'Monitoring and optimization of energy consumption.',
      },
      {
        title: 'Cleaning Services',
        description: 'Professional cleaning and janitorial services.',
      },
      {
        title: 'Security Services',
        description: 'Access control, CCTV monitoring, and security personnel.',
      },
      {
        title: 'Landscaping',
        description: 'Grounds maintenance and irrigation management.',
      },
    ],
    projects: [
      {
        id: 'fm-001',
        name: 'Corporate Campus FM',
        client: 'Qatar Petroleum',
        location: 'Dafna, Qatar',
        year: 2024,
        description: 'Full facility management for 5-building corporate campus with 2,000+ occupants.',
      },
      {
        id: 'fm-002',
        name: 'Residential Compound',
        client: 'Compound Management LLC',
        location: 'Al Waab, Qatar',
        year: 2023,
        description: 'Integrated FM services for 200-villa residential community.',
      },
      {
        id: 'fm-003',
        name: 'Industrial Complex',
        client: 'Manufacturing Corp.',
        location: 'Industrial Area, Qatar',
        year: 2023,
        description: 'Technical maintenance and operations for 150,000 sqm manufacturing facility.',
      },
    ],
    certifications: ['ISO 41001:2018', 'ISO 9001:2015', 'IFMA Member'],
  },
  {
    slug: 'civil-works',
    name: 'Civil Works',
    title: 'Civil Engineering Works',
    description: 'Infrastructure and civil construction for demanding projects.',
    overview: `Our Civil Works division undertakes infrastructure projects including earthworks, foundations, structural concrete, roads, and utilities. We bring heavy construction expertise to projects ranging from building foundations to large-scale infrastructure developments.

Our fleet of modern equipment and experienced crews enable efficient execution of civil works while maintaining strict quality standards. We coordinate closely with consultants and authorities to ensure compliance with engineering specifications and regulatory requirements.

From site preparation to final handover, our civil teams deliver the solid foundations that every successful project requires.`,
    image: '/images/contracting/civil.jpg',
    capabilities: [
      {
        title: 'Earthworks',
        description: 'Excavation, grading, and soil stabilization.',
      },
      {
        title: 'Foundations',
        description: 'Deep and shallow foundation systems.',
      },
      {
        title: 'Structural Concrete',
        description: 'Reinforced concrete structures and precast elements.',
      },
      {
        title: 'Roads & Paving',
        description: 'Asphalt and concrete pavement construction.',
      },
      {
        title: 'Utilities',
        description: 'Underground services including water, sewer, and electrical.',
      },
      {
        title: 'Drainage Systems',
        description: 'Stormwater management and drainage infrastructure.',
      },
    ],
    projects: [
      {
        id: 'cw-001',
        name: 'Industrial Park Infrastructure',
        client: 'Economic Zones Authority',
        location: 'Ras Laffan, Qatar',
        year: 2024,
        description: 'Complete infrastructure for 500-hectare industrial development.',
      },
      {
        id: 'cw-002',
        name: 'Highway Interchange',
        client: 'Ashghal',
        location: 'Al Khor, Qatar',
        year: 2023,
        description: 'Complex highway interchange with bridges and underpasses.',
      },
      {
        id: 'cw-003',
        name: 'Port Expansion',
        client: 'Qatar Ports Authority',
        location: 'Hamad Port',
        year: 2023,
        description: 'Marine civil works including quay walls and paving.',
      },
    ],
    certifications: ['ISO 9001:2015', 'Grade A Contractor License'],
  },
];

export function getContractingCategory(slug: string): ContractingCategory | undefined {
  return CONTRACTING_CATEGORIES.find((category) => category.slug === slug);
}

export function getAllContractingCategories(): ContractingCategory[] {
  return CONTRACTING_CATEGORIES;
}

export function getAllContractingSlugs(): string[] {
  return CONTRACTING_CATEGORIES.map((category) => category.slug);
}
