export type EventCategory =
  | 'training'
  | 'partnership'
  | 'csr'
  | 'trade-show'
  | 'internal';

export interface CMSEvent {
  id: string;
  title: string;
  month: string;
  year: number;
  date: string;
  category: EventCategory;
  description: string;
  featured?: boolean;
}

export const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
  training: 'Training & Seminars',
  partnership: 'Partnership',
  csr: 'Community & CSR',
  'trade-show': 'Trade Shows',
  internal: 'Company',
};

export const EVENTS: CMSEvent[] = [
  {
    id: 'tostem-thailand-2022',
    title: 'Tostem Thailand Factory Visit',
    month: 'Jul',
    year: 2022,
    date: 'July 2022',
    category: 'partnership',
    description:
      'CMS team visited the Tostem manufacturing facility in Thailand to deepen technical understanding of pre-engineered aluminium window and door systems.',
    featured: true,
  },
  {
    id: 'marketing-vision-quest-2022',
    title: 'Marketing Meet & Vision Quest',
    month: 'Jul',
    year: 2022,
    date: 'July 2022',
    category: 'internal',
    description:
      'Group-wide marketing strategy meet aligning the sales and BD teams across all CMS Group ventures on the next-cycle vision.',
  },
  {
    id: 'technician-meet-2022',
    title: "Technician's Meet",
    month: 'Jun',
    year: 2022,
    date: 'June 2022',
    category: 'training',
    description:
      'Hands-on technician training session at Bath N Room facility — focused on installation standards for partner brand product lines.',
  },
  {
    id: 'annual-day-2022',
    title: 'CMS Group Annual Day',
    month: 'Jun',
    year: 2022,
    date: 'June 2022',
    category: 'internal',
    description:
      'Annual celebration bringing the entire CMS Group team together — recognition, team activities, and the year-ahead announcements.',
  },
  {
    id: 'blood-donation-2022',
    title: 'Blood Donation Campaign',
    month: 'Jun',
    year: 2022,
    date: 'June 2022',
    category: 'csr',
    description:
      "Annual CSR initiative — CMS Group team donates blood as part of the 'Gift of Blood is Gift of Life' campaign.",
  },
  {
    id: 'womens-day-2022',
    title: "International Women's Day",
    month: 'Mar',
    year: 2022,
    date: 'March 2022',
    category: 'internal',
    description:
      'Group-wide celebration honouring the women across CMS Group ventures who power our daily operations and client relationships.',
  },
  {
    id: 'christmas-new-year-2019',
    title: 'Christmas & New Year Celebration',
    month: 'Dec',
    year: 2019,
    date: 'December 2019',
    category: 'internal',
    description:
      'End-of-year celebration with the CMS team marking another successful year and welcoming the year ahead.',
  },
  {
    id: 'blood-donation-2019',
    title: 'Blood Donation Camp 2019',
    month: 'Dec',
    year: 2019,
    date: 'December 2019',
    category: 'csr',
    description:
      'CMS Group Blood Donation Camp — community contribution by employees and partners.',
  },
  {
    id: 'buildcon-2019',
    title: '5th Buildcon Exhibition',
    month: 'Feb',
    year: 2019,
    date: 'February 2019',
    category: 'trade-show',
    description:
      'CMS Group exhibited at the 5th Buildcon — Nepal\'s leading construction and building materials trade exhibition. One-Stop Solutions for Construction Finishing Materials.',
  },
  {
    id: 'blood-donation-2018',
    title: 'Blood Donation Camp 2018',
    month: 'Dec',
    year: 2018,
    date: 'December 2018',
    category: 'csr',
    description:
      "Inaugural CMS Group Blood Donation Camp — 'Save a life, Give blood.' Held at Signature Apartment Hall.",
  },
  {
    id: 'plumbers-meet-2018',
    title: "Plumbers' Meet",
    month: 'Aug',
    year: 2018,
    date: 'August 2018',
    category: 'training',
    description:
      "Technical meet for plumbing partners — product walkthrough and Q&A on Bath N Room's sanitary fixture range.",
  },
  {
    id: 'iko-launch-2018',
    title: 'IKO Roofing Product Launch',
    month: 'Aug',
    year: 2018,
    date: 'August 2018',
    category: 'partnership',
    description:
      'Official launch of IKO premium roofing systems for the Nepali market at Hotel Soaltee Crowne Plaza, Kathmandu — bringing world-class asphalt roofing to local projects.',
    featured: true,
  },
  {
    id: 'armstrong-seminar-2017',
    title: 'Armstrong Ceiling Solutions Seminar',
    month: 'Jun',
    year: 2017,
    date: 'June 2017',
    category: 'training',
    description:
      'Industry seminar on Armstrong ceiling systems hosted at Hotel Annapurna, Kathmandu — bringing together architects, contractors, and consultants.',
  },
];
