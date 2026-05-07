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
  // Healthcare
  {
    id: 'bir-hospital',
    title: 'Bir Hospital',
    client: 'Government of Nepal',
    location: 'Mahaboudha, Kathmandu',
    year: 2020,
    type: 'commercial',
    sector: 'healthcare',
    description:
      "Nepal's oldest and largest public hospital. Supplied 2,20,000 sq.ft of SCG cement fibre wall partitions along with ceiling, flooring, hardware, and sanitary fixtures.",
    scope: ['SCG Cement Fibre Wall Partition', 'Armstrong Ceiling', 'Tarkett Vinyl Flooring', 'Dormakaba Hardware', 'American Standard Sanitaryware'],
    area: '2,20,000 sq.ft',
    image: '/images/projects/bir-hospital.jpg',
    featured: true,
  },
  {
    id: 'grande-hospital',
    title: 'Grande International Hospital',
    client: 'Grande International Hospital',
    location: 'Tokha, Kathmandu',
    year: 2018,
    type: 'commercial',
    sector: 'healthcare',
    description:
      'Tertiary-care multi-specialty hospital. Supplied complete sewage treatment plant for hospital-grade wastewater management.',
    scope: ['Sintex Sewage Treatment Plant'],
    image: '/images/projects/grande-hospital.jpg',
  },
  {
    id: 'mediciti-hospital',
    title: 'Mediciti (Ashwini Medical)',
    client: 'Nepal Mediciti Hospital',
    location: 'Nakhu, Lalitpur',
    year: 2019,
    type: 'commercial',
    sector: 'healthcare',
    description:
      'Major specialty hospital with research and teaching facilities. Installed 1,50,000 sq.ft of Armstrong acoustic false ceiling.',
    scope: ['Armstrong Acoustic False Ceiling'],
    area: '1,50,000 sq.ft',
    image: '/images/projects/mediciti-hospital.jpg',
    featured: true,
  },
  {
    id: 'frontline-hospital',
    title: 'Frontline Hospital',
    client: 'Frontline Hospital',
    location: 'Maitidevi, Kathmandu',
    year: 2021,
    type: 'commercial',
    sector: 'healthcare',
    description:
      'Multi-disciplinary hospital project. Supplied 20,000 sq.ft of Armstrong ceiling, windows, sewage treatment plant, false ceiling, and parquet flooring.',
    scope: ['Dormakaba Hardware', 'Sintex STP', 'Armstrong Ceiling', 'Spacewood Furniture'],
    area: '20,000 sq.ft',
    image: '/images/projects/frontline-hospital.jpg',
  },

  // Education
  {
    id: 'kmc',
    title: 'Kathmandu Model College (KMC)',
    client: 'Kathmandu Model College',
    location: 'Bagbazar, Kathmandu',
    year: 2019,
    type: 'commercial',
    sector: 'education',
    description:
      'Higher education campus. Supplied and installed 30,000 sq.ft of Tarkett vinyl flooring along with Armstrong false ceiling.',
    scope: ['Tarkett Vinyl Flooring', 'Armstrong False Ceiling'],
    area: '30,000 sq.ft',
  },
  {
    id: 'ullens-school',
    title: 'Ullens School',
    client: 'Ullens School',
    location: 'Khumaltar, Lalitpur',
    year: 2018,
    type: 'commercial',
    sector: 'education',
    description:
      'International K-12 school campus. Supplied windows and false ceiling systems for academic blocks.',
    scope: ['Dormakaba Windows & Hardware', 'Armstrong False Ceiling'],
  },

  // Hospitality
  {
    id: 'tiger-palace',
    title: 'Tiger Palace Resort',
    client: 'Silver Heritage Group',
    location: 'Bhairahawa, Lumbini',
    year: 2018,
    type: 'commercial',
    sector: 'hospitality',
    description:
      'Integrated resort and casino with 5-star hotel rooms. Supplied sanitary and CP fittings for 128 bathrooms plus 2,230 cum swimming pool system.',
    scope: ['Grohe / Duravit / Viega Sanitary Fittings (128 bathrooms)', 'Pentair 2,230 cum Swimming Pool'],
    image: '/images/projects/tiger-palace.jpg',
    featured: true,
  },
  {
    id: 'dusit-thani',
    title: 'Dusit Thani Himalayan Resort',
    client: 'Dusit International',
    location: 'Kavre, Namo Buddha',
    year: 2023,
    type: 'commercial',
    sector: 'hospitality',
    description:
      'Luxury 5-star Himalayan retreat. Supplied 42,000 sq.ft of premium Mountain Slate roofing from the Royal Estate Series.',
    scope: ['Mountain Slate Roofing — Royal Estate Series'],
    area: '42,000 sq.ft',
    image: '/images/projects/dusit-thani.jpg',
    featured: true,
  },
  {
    id: 'country-villa',
    title: 'Country Villa Resort',
    client: 'Country Villa',
    location: 'Nagarkot, Bhaktapur',
    year: 2020,
    type: 'commercial',
    sector: 'hospitality',
    description:
      'Hill-top resort with panoramic Himalayan views. Supplied tiles, sewage treatment plant, parquet flooring, and 4,000 sq.ft of IKO asphalt roofing shingles.',
    scope: ['Onity', 'Sintex STP', 'IKO Asphalt Shingles', 'BKB Parquet'],
    area: '4,000 sq.ft (roofing)',
    image: '/images/projects/country-villa.jpg',
  },

  // Government
  {
    id: 'nrb-thapathali',
    title: 'Nepal Rastra Bank — Thapathali',
    client: 'Nepal Rastra Bank',
    location: 'Thapathali, Kathmandu',
    year: 2021,
    type: 'commercial',
    sector: 'government',
    description:
      "Central bank's main office. Installed 1.5 lakh sq.ft of BKB parquet flooring and Armstrong ceiling systems.",
    scope: ['BKB Parquet Flooring', 'Armstrong Ceiling', 'Dormakaba Hardware'],
    area: '1,50,000 sq.ft',
    image: '/images/projects/nrb-thapathali.jpg',
    featured: true,
  },
  {
    id: 'nrb-baluwatar',
    title: 'Nepal Rastra Bank — Baluwatar',
    client: 'Nepal Rastra Bank',
    location: 'Baluwatar, Kathmandu',
    year: 2022,
    type: 'commercial',
    sector: 'government',
    description:
      'Central bank annex building. Installed 86,000 sq.ft of BKB parquet flooring with Armstrong ceiling and Dormakaba hardware.',
    scope: ['BKB Parquet Flooring', 'Armstrong Ceiling', 'Dormakaba Hardware'],
    area: '86,000 sq.ft',
  },
  {
    id: 'dept-of-road',
    title: 'Department of Roads',
    client: 'Government of Nepal',
    location: 'Kathmandu',
    year: 2020,
    type: 'commercial',
    sector: 'government',
    description:
      'Federal road infrastructure agency headquarters. Supplied false ceiling, windows, doors, furniture, tiles, and sewage treatment plant.',
    scope: ['Armstrong Ceiling', 'Dormakaba Hardware', 'Spacewood Furniture', 'RAK Tiles', 'STP System'],
  },
  {
    id: 'attorney-general',
    title: 'Office of the Attorney General',
    client: 'Government of Nepal',
    location: 'Putalisadak, Kathmandu',
    year: 2021,
    type: 'commercial',
    sector: 'government',
    description:
      "Federal legal authority's office complex. Supplied 1.5 lakh sq.ft of Armstrong ceiling along with sanitaryware, tiles, and hardware.",
    scope: ['Armstrong Ceiling (1.5 lakh sq.ft)', 'Duravit / Grohe Sanitaryware', 'SCG', 'Dormakaba Hardware'],
    area: '1,50,000 sq.ft',
    image: '/images/projects/attorney-general.jpg',
  },
  {
    id: 'icimod',
    title: 'ICIMOD Headquarters',
    client: 'International Centre for Integrated Mountain Development',
    location: 'Satdobato, Lalitpur',
    year: 2019,
    type: 'commercial',
    sector: 'government',
    description:
      "Regional intergovernmental knowledge centre's head office. Installed Dormakaba acoustic movable wall partition for flexible workspace zones.",
    scope: ['Dormakaba Acoustic Movable Wall Partition'],
    image: '/images/projects/icimod.jpg',
  },

  // Office
  {
    id: 'ncell-hq',
    title: 'Ncell Head Office',
    client: 'Ncell Pvt. Ltd.',
    location: 'Lazimpat, Kathmandu',
    year: 2020,
    type: 'commercial',
    sector: 'office',
    description:
      "Corporate headquarters for Nepal's leading telecommunications company. Complete interior fit-out with movable walls, fire-rated doors, toilet cubicles, and tiles.",
    scope: ['Dormakaba Movable Walls', 'Dormakaba Hardware', 'Navair Fire Doors', 'Stylam Toilet Cubicles', 'RAK Tiles'],
    image: '/images/projects/ncell-hq.jpg',
    featured: true,
  },

  // Airports
  {
    id: 'aanson',
    title: 'Civil Aviation Authority of Nepal (AANSON)',
    client: 'Civil Aviation Authority of Nepal',
    location: 'Airport Road, Kathmandu',
    year: 2022,
    type: 'commercial',
    sector: 'airports',
    description:
      "Airport & Air Navigation Services of Nepal head office. Comprehensive fit-out: 45,200 sq.ft Tarkett vinyl, 30,750 sq.ft Welspun SPC, 13,990 sq.ft KLK engineering hardwood, plus full interior package.",
    scope: [
      'Tarkett Vinyl (45,200 sq.ft)',
      'Welspun SPC (30,750 sq.ft)',
      'KLK Hardwood (13,990 sq.ft)',
      'Spacewood Office Furniture',
      'Dormakaba Glass Partition & Sensor Doors',
      'Armstrong Ceiling',
      'Navair Fire & Shaft Doors',
      'American Standard Sanitaryware',
      'Stylam Toilet Cubicles',
      'BKB Engineered Wood',
      'RAK UAE Tiles',
    ],
    image: '/images/projects/aanson.jpg',
    featured: true,
  },

  // Infrastructure
  {
    id: 'cg-brewery',
    title: 'CG Brewery',
    client: 'Chaudhary Group',
    location: 'Nawalparasi',
    year: 2019,
    type: 'commercial',
    sector: 'infrastructure',
    description:
      'Industrial brewery facility. Installed 950 KLD effluent treatment plant for brewery wastewater compliance.',
    scope: ['Effluent Treatment Plant — 950 KLD capacity'],
    area: '950 KLD ETP',
  },
  {
    id: 'lumbini-convention',
    title: 'Lumbini Convention Center',
    client: 'Lumbini Development Trust',
    location: 'Lumbini',
    year: 2023,
    type: 'commercial',
    sector: 'infrastructure',
    description:
      'International convention center at the birthplace of Buddha. Supplied roofing, ceiling systems, and Dormakaba automatic sensor doors.',
    scope: ['Roofing Systems', 'Ceiling Systems', 'Dormakaba Automatic Sensor Doors'],
    image: '/images/projects/lumbini-convention.jpg',
  },

  // Residential
  {
    id: 'kcl-colony',
    title: 'KCL Colony',
    client: 'Kantipur Colony Limited',
    location: 'Budhanilkantha, Kathmandu',
    year: 2020,
    type: 'residential',
    description:
      'Premium residential colony. Supplied 9,000 sq.ft of IKO Earthtone Cedar asphalt roofing shingles.',
    scope: ['IKO Earthtone Cedar Asphalt Shingles'],
    area: '9,000 sq.ft',
  },
  {
    id: 'green-hill-city',
    title: 'Green Hill City',
    client: 'Green Hill City Developers',
    location: 'Kathmandu Valley',
    year: 2019,
    type: 'residential',
    description:
      'Gated residential development. Installed sanitary and CP fittings for 100 bathrooms plus sewage treatment plant.',
    scope: ['Grohe Sanitaryware', 'Duravit Sanitaryware', 'STP System'],
    image: '/images/projects/green-hill-city.jpg',
  },
  {
    id: 'padma-colony',
    title: 'Padma Colony Phase I',
    client: 'Padma Colony',
    location: 'Sitapaila, Kathmandu',
    year: 2018,
    type: 'residential',
    description:
      'Residential colony with traditional Nepali roofing aesthetics. Supplied premium German sanitaryware throughout.',
    scope: ['Grohe Sanitaryware', 'Duravit Sanitaryware'],
    image: '/images/projects/padma-colony.jpg',
  },
];
