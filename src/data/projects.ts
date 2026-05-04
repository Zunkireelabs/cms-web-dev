export type ProjectType = 'commercial' | 'residential';

export type CommercialSector =
  | 'healthcare'
  | 'education'
  | 'airports'
  | 'office'
  | 'hospitality'
  | 'government'
  | 'infrastructure';

export interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  year: number;
  type: ProjectType;
  sector?: CommercialSector;
  description: string;
  scope: string[];
  area?: string;
  image?: string;
  featured?: boolean;
}

export const COMMERCIAL_SECTORS: { value: CommercialSector; label: string }[] = [
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'airports', label: 'Airports' },
  { value: 'office', label: 'Office' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'government', label: 'Government' },
  { value: 'infrastructure', label: 'Infrastructure' },
];

export const PROJECTS: Project[] = [
  // Commercial - Office/Banking
  {
    id: 'proj-001',
    title: 'Kumari Bank',
    client: 'Kumari Bank Ltd.',
    location: 'Kathmandu, Nepal',
    year: 2023,
    type: 'commercial',
    sector: 'office',
    description: 'Modern banking headquarters with state-of-the-art facilities and customer service areas.',
    scope: ['Interior Fit-Out', 'MEP Systems', 'False Ceiling', 'Flooring'],
    featured: true,
  },
  {
    id: 'proj-002',
    title: 'Nepal Rastra Bank (NRB)',
    client: 'Nepal Rastra Bank',
    location: 'Kathmandu, Nepal',
    year: 2022,
    type: 'commercial',
    sector: 'government',
    description: 'Central bank headquarters featuring premium finishes and high-security infrastructure.',
    scope: ['General Contracting', 'MEP Systems', 'Interior Fit-Out', 'Security Systems'],
    featured: true,
  },
  {
    id: 'proj-003',
    title: 'Ncell Head Office',
    client: 'Ncell Pvt. Ltd.',
    location: 'Kathmandu, Nepal',
    year: 2021,
    type: 'commercial',
    sector: 'office',
    description: 'Corporate headquarters for Nepal\'s leading telecommunications company.',
    scope: ['Interior Fit-Out', 'MEP Systems', 'Data Center', 'False Ceiling'],
    featured: true,
  },
  {
    id: 'proj-004',
    title: 'UN Head Office',
    client: 'United Nations Nepal',
    location: 'Lalitpur, Nepal',
    year: 2020,
    type: 'commercial',
    sector: 'office',
    description: 'United Nations country office with modern conference facilities and workspace.',
    scope: ['General Contracting', 'MEP Systems', 'Interior Fit-Out', 'Landscaping'],
  },

  // Commercial - Government
  {
    id: 'proj-005',
    title: 'Parliament House',
    client: 'Government of Nepal',
    location: 'Kathmandu, Nepal',
    year: 2021,
    type: 'commercial',
    sector: 'government',
    description: 'Federal Parliament building of Nepal with traditional Nepali architectural elements.',
    scope: ['General Contracting', 'MEP Systems', 'Interior Fit-Out', 'Roofing'],
    featured: true,
  },
  {
    id: 'proj-006',
    title: 'Indian Embassy',
    client: 'Embassy of India',
    location: 'Kathmandu, Nepal',
    year: 2019,
    type: 'commercial',
    sector: 'government',
    description: 'Diplomatic mission building with high-security features and premium finishes.',
    scope: ['General Contracting', 'MEP Systems', 'Security Systems', 'Interior Fit-Out'],
  },
  {
    id: 'proj-007',
    title: 'Department of Roads',
    client: 'Government of Nepal',
    location: 'Kathmandu, Nepal',
    year: 2020,
    type: 'commercial',
    sector: 'government',
    description: 'Government administrative building for road infrastructure management.',
    scope: ['General Contracting', 'MEP Systems', 'Interior Fit-Out'],
  },

  // Commercial - Hospitality
  {
    id: 'proj-008',
    title: 'Dusit Thani Himalayan Resort',
    client: 'Dusit International',
    location: 'Dhulikhel, Nepal',
    year: 2022,
    type: 'commercial',
    sector: 'hospitality',
    description: 'Luxury 5-star resort with panoramic Himalayan views and world-class spa facilities.',
    scope: ['General Contracting', 'MEP Systems', 'Interior Fit-Out', 'Pool Systems', 'Landscaping'],
    featured: true,
  },
  {
    id: 'proj-009',
    title: 'Tiger Palace Hotel',
    client: 'Silver Heritage Group',
    location: 'Bhairahawa, Nepal',
    year: 2018,
    type: 'commercial',
    sector: 'hospitality',
    description: 'Integrated resort and casino with luxury hotel rooms and entertainment facilities.',
    scope: ['General Contracting', 'MEP Systems', 'Interior Fit-Out', 'Gaming Infrastructure'],
  },
  {
    id: 'proj-010',
    title: 'Bhangeri Durbar Resort',
    client: 'Private Developer',
    location: 'Chitwan, Nepal',
    year: 2021,
    type: 'commercial',
    sector: 'hospitality',
    description: 'Heritage-style resort offering authentic Nepali hospitality experience.',
    scope: ['General Contracting', 'MEP Systems', 'Interior Fit-Out', 'Landscaping'],
  },

  // Commercial - Airports
  {
    id: 'proj-011',
    title: 'Nepalgunj Airport',
    client: 'Civil Aviation Authority of Nepal',
    location: 'Nepalgunj, Nepal',
    year: 2023,
    type: 'commercial',
    sector: 'airports',
    description: 'Regional airport terminal expansion with modern passenger facilities.',
    scope: ['General Contracting', 'MEP Systems', 'Interior Fit-Out', 'Roofing'],
    featured: true,
  },
  {
    id: 'proj-012',
    title: 'Biratnagar Airport',
    client: 'Civil Aviation Authority of Nepal',
    location: 'Biratnagar, Nepal',
    year: 2022,
    type: 'commercial',
    sector: 'airports',
    description: 'Domestic airport terminal with upgraded facilities and passenger amenities.',
    scope: ['General Contracting', 'MEP Systems', 'Interior Fit-Out', 'Flooring'],
  },

  // Commercial - Infrastructure
  {
    id: 'proj-013',
    title: 'Manakamana Cable Car',
    client: 'Manakamana Darshan Pvt. Ltd.',
    location: 'Gorkha, Nepal',
    year: 2019,
    type: 'commercial',
    sector: 'infrastructure',
    description: 'Iconic cable car station facilities connecting pilgrims to Manakamana Temple.',
    scope: ['General Contracting', 'MEP Systems', 'Interior Fit-Out', 'Structural Works'],
  },

  // Commercial - Healthcare
  {
    id: 'proj-014',
    title: 'Mediciti Hospital',
    client: 'Mediciti Hospital Pvt. Ltd.',
    location: 'Lalitpur, Nepal',
    year: 2020,
    type: 'commercial',
    sector: 'healthcare',
    description: 'Multi-specialty hospital with advanced medical facilities and patient care units.',
    scope: ['General Contracting', 'MEP Systems', 'Medical Gas Installation', 'Interior Fit-Out'],
    featured: true,
  },
  {
    id: 'proj-015',
    title: 'Bir Hospital',
    client: 'Government of Nepal',
    location: 'Kathmandu, Nepal',
    year: 2019,
    type: 'commercial',
    sector: 'healthcare',
    description: 'Historic government hospital renovation and expansion project.',
    scope: ['Renovation', 'MEP Systems', 'Interior Fit-Out', 'Medical Infrastructure'],
  },

  // Commercial - Education
  {
    id: 'proj-016',
    title: 'Ullens School',
    client: 'Ullens Education Foundation',
    location: 'Lalitpur, Nepal',
    year: 2021,
    type: 'commercial',
    sector: 'education',
    description: 'Premium international school campus with modern educational facilities.',
    scope: ['General Contracting', 'MEP Systems', 'Interior Fit-Out', 'Sports Facilities'],
  },

  // Residential Projects
  {
    id: 'proj-017',
    title: 'CG Villa',
    client: 'Chaudhary Group',
    location: 'Kathmandu, Nepal',
    year: 2022,
    type: 'residential',
    description: 'Ultra-luxury private residence with premium finishes and smart home systems.',
    scope: ['General Contracting', 'MEP Systems', 'Interior Fit-Out', 'Landscaping', 'Pool Construction'],
    featured: true,
  },
  {
    id: 'proj-018',
    title: 'Country Villa',
    client: 'Private Developer',
    location: 'Kathmandu, Nepal',
    year: 2021,
    type: 'residential',
    description: 'Exclusive villa complex offering serene living environment.',
    scope: ['General Contracting', 'MEP Systems', 'Interior Fit-Out', 'Landscaping'],
  },
  {
    id: 'proj-019',
    title: 'Green Hill City',
    client: 'Green Hill Development',
    location: 'Bhaktapur, Nepal',
    year: 2023,
    type: 'residential',
    description: 'Modern residential township with eco-friendly design and community amenities.',
    scope: ['General Contracting', 'MEP Systems', 'Infrastructure', 'Landscaping'],
    featured: true,
  },
  {
    id: 'proj-020',
    title: 'Fewa Prince Residency',
    client: 'Private Developer',
    location: 'Pokhara, Nepal',
    year: 2022,
    type: 'residential',
    description: 'Lakeside residential complex with stunning views of Fewa Lake and Himalayas.',
    scope: ['General Contracting', 'MEP Systems', 'Interior Fit-Out', 'Landscaping'],
  },
  {
    id: 'proj-021',
    title: 'KCL Colony',
    client: 'KCL Group',
    location: 'Kathmandu, Nepal',
    year: 2020,
    type: 'residential',
    description: 'Premium housing colony with modern amenities and secure environment.',
    scope: ['General Contracting', 'MEP Systems', 'Infrastructure', 'Landscaping'],
  },
];

export function getProjectsByType(type: ProjectType): Project[] {
  return PROJECTS.filter((project) => project.type === type);
}

export function getProjectsBySector(sector: CommercialSector): Project[] {
  return PROJECTS.filter((project) => project.sector === sector);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((project) => project.featured);
}
