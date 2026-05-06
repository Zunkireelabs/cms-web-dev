export type ClientType =
  | 'hotel'
  | 'hospital'
  | 'construction'
  | 'architecture'
  | 'industrial'
  | 'government'
  | 'international'
  | 'residential';

export type DeliveringVenture =
  | 'cubic-meter'
  | 'baba-muktinath'
  | '4r-technologies'
  | 'green-building-technologies'
  | 'cms-group';

export interface Testimonial {
  id: string;
  client: string;
  clientType: ClientType;
  date: string;
  deliveredBy: DeliveringVenture;
  subject: string;
  scope: string[];
  project?: string;
  location?: string;
  scanImage?: string;
}

export const DELIVERING_VENTURE_LABELS: Record<DeliveringVenture, string> = {
  'cubic-meter': 'Cubic Meter',
  'baba-muktinath': 'Baba Muktinath Fabricators',
  '4r-technologies': '4R Technologies',
  'green-building-technologies': 'Green Building Technologies',
  'cms-group': 'CMS Group',
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'ziec-bir-hospital',
    client: 'ZIEC – Sharma – Rasuwa',
    clientType: 'construction',
    date: '2022-03-31',
    deliveredBy: 'cubic-meter',
    subject: 'Various interior finishing work — Bir Hospital Expansion (Surgical Block)',
    scope: [
      'Sintex Sewage Treatment Plant',
      'Dormakaba Acodor sliding & swing doors',
      'RAK Ceramic Tiles & Granite',
      'Tarkett Vinyl Flooring',
      'SCG Dry Wall Cement Board',
      'Armstrong Acoustic False Ceiling',
      'American Standard Sanitary Fixtures',
      'Antimicrobial Hospital Bed Curtain',
      'Handrails & Corner Guards',
      'Nursing Station with Solid Surface',
    ],
    project: 'Bir Hospital Expansion',
    location: 'Mahaboudha, Kathmandu',
  },
  {
    id: 'airtech-tiger-palace',
    client: 'Airtech Industries Pvt. Ltd.',
    clientType: 'industrial',
    date: '2017-10-23',
    deliveredBy: 'green-building-technologies',
    subject: '10 KLD Sintex Brand Sewage Treatment Plant',
    scope: ['Sintex 10 KLD STP'],
    project: 'Tiger Palace Resort',
    location: 'Bhairahawa, Lumbini',
  },
  {
    id: 'icimod',
    client: 'ICIMOD',
    clientType: 'international',
    date: '2021-08-16',
    deliveredBy: 'cubic-meter',
    subject: 'Supply and installation of Dormakaba Acoustic Movable Partitions',
    scope: ['Dormakaba Acoustic Movable Partitions'],
    project: 'ICIMOD Head Office',
    location: 'Khumaltar, Lalitpur',
  },
  {
    id: 'kedia-construction',
    client: 'Kedia Construction',
    clientType: 'construction',
    date: '2022-06-23',
    deliveredBy: 'baba-muktinath',
    subject: 'Pre-engineered aluminium doors, windows & façade — TOSTEM',
    scope: ['TOSTEM Aluminium Doors', 'TOSTEM Windows', 'TOSTEM Façade Solution'],
    project: 'Kedia House',
    location: 'Sanepa, Lalitpur',
  },
  {
    id: 'basera-boutique',
    client: 'Basera Boutique Hotel',
    clientType: 'hotel',
    date: '2021-08-16',
    deliveredBy: 'cubic-meter',
    subject: 'Dormakaba Acoustic Movable Partitions + Automatic Glass Sliding Sensor Door',
    scope: [
      'Dormakaba Acoustic Movable Partitions',
      'Dormakaba Automatic Glass Sliding Sensor Door',
    ],
    project: 'Basera Boutique Hotel by Emaro Plaza',
    location: 'Babarmahal, Kathmandu',
  },
  {
    id: 'adrisiya-nirman',
    client: 'Adrisiya Nirman Sewa Pvt. Ltd.',
    clientType: 'construction',
    date: '2021-08-16',
    deliveredBy: 'cubic-meter',
    subject: 'Dormakaba Acoustic Movable Partitions',
    scope: ['Dormakaba Acoustic Movable Partitions'],
    project: 'European Union to Nepal Project',
    location: 'Lazimpath, Kathmandu',
  },
  {
    id: 'de-architects',
    client: "de' Architects Pvt. Ltd.",
    clientType: 'architecture',
    date: '2022-05-03',
    deliveredBy: 'cubic-meter',
    subject: 'Waterproofing services using Schomburg chemicals',
    scope: ['Schomburg Waterproofing Chemicals — terraces & bathrooms'],
    project: 'Mr. Kumar Gurung Residence',
    location: 'Bhangal, Lalitpur',
  },
  {
    id: 'hilltake',
    client: 'Hilltake Health & Home Pvt. Ltd.',
    clientType: 'hotel',
    date: '2021-08-16',
    deliveredBy: 'baba-muktinath',
    subject: 'Onity RFID Locks, Onity Minibar, Room Safe',
    scope: ['Onity RFID Locks', 'Onity Minibar', 'Onity Room Safe'],
    project: 'Hotel Hilltake',
    location: 'Sanga, Nepal',
  },
  {
    id: 'hotel-barahi',
    client: 'Barahi Hospitality Group — Hotel Barahi',
    clientType: 'hotel',
    date: '2021-08-16',
    deliveredBy: 'baba-muktinath',
    subject: 'Onity RFID Locks, Onity Minibar, Room Safe',
    scope: ['Onity RFID Locks', 'Onity Minibar', 'Onity Room Safe'],
    project: 'Hotel Barahi',
    location: 'Lakeside, Pokhara-6',
  },
  {
    id: 'hotel-da-flamingo',
    client: 'Hotel Da Flamingo Pvt. Ltd.',
    clientType: 'hotel',
    date: '2021-09-03',
    deliveredBy: 'baba-muktinath',
    subject: 'Onity RFID Locks',
    scope: ['Onity RFID Locks'],
    project: 'Hotel Da Flamingo',
    location: 'Bhutwal, Nepal',
  },
  {
    id: 'mila-hotel',
    client: 'Mila Hotel Pvt. Ltd.',
    clientType: 'hotel',
    date: '2022-03-25',
    deliveredBy: 'baba-muktinath',
    subject: 'Onity Tru Locks',
    scope: ['Onity Tru Locks'],
    project: 'Mila Hotel',
    location: 'Chhetrapati, Kathmandu',
  },
  {
    id: 'sarangkot-mountain',
    client: 'Sarangkot Mountain Resort & Spa',
    clientType: 'hotel',
    date: '2021-08-16',
    deliveredBy: 'baba-muktinath',
    subject: 'Onity RFID Locks, Onity Minibar, Room Safe',
    scope: ['Onity RFID Locks', 'Onity Minibar', 'Onity Room Safe'],
    project: 'Sarangkot Mountain Lodge',
    location: 'Pokhara, Nepal',
  },
  {
    id: 'diyalo-lords-plaza',
    client: 'Diyalo Lords Plaza',
    clientType: 'hotel',
    date: '2021-08-01',
    deliveredBy: 'baba-muktinath',
    subject: 'Onity Products — RFID Locks, Minibar, Room Safe',
    scope: ['Onity RFID Locks', 'Onity Minibar', 'Onity Room Safe'],
    project: 'Diyalo Lords Plaza',
    location: 'Adarsh Nagar, Birgunj',
  },
  {
    id: 'kemtex-nepal',
    client: 'Kemtex Nepal Pvt. Ltd.',
    clientType: 'industrial',
    date: '2021-08-20',
    deliveredBy: 'baba-muktinath',
    subject: 'ICA PU, Lamination & Floor Coatings',
    scope: ['ICA PU Coatings', 'ICA Lamination Coatings', 'ICA Floor Coatings'],
    project: 'Kemtex Nepal Office',
    location: 'Jorpati Chowk, Jhamsikhel',
  },
  {
    id: 'living-things-design',
    client: 'Living Things Design Pvt. Ltd.',
    clientType: 'architecture',
    date: '2021-08-19',
    deliveredBy: 'baba-muktinath',
    subject: 'ICA Italian Premium Wood Coatings',
    scope: ['ICA Italian Premium Wood Coatings — Special Effect & Clear Range'],
    project: 'Several Residential Projects',
  },
  {
    id: 'himalayan-builders',
    client: 'Himalayan Builders & Engineers Pvt. Ltd.',
    clientType: 'construction',
    date: '2021-03-14',
    deliveredBy: 'green-building-technologies',
    subject: 'Sub Contractor for Fuel Storage Tank, Sewage Treatment Plant & Storage Tank',
    scope: ['10,000 ltrs Fuel Storage Tank', 'Sewage Treatment Plant', 'Water Storage Tank'],
    project: 'Norwegian Embassy Project',
    location: 'Bakhundole, Lalitpur',
  },
  {
    id: 'maruti-cements',
    client: 'Maruti Cements Limited',
    clientType: 'industrial',
    date: '2021-02-10',
    deliveredBy: 'green-building-technologies',
    subject: 'Supply, delivery & installation of 16,000 ltrs Water Storage Tank',
    scope: ['16,000 ltrs Water Storage Tank'],
    project: 'Maruti Cements Plant',
    location: 'Chandraudaipur Village, Sarlahi District',
  },
  {
    id: 'nanc-police',
    client: 'NANC (Nepal Armoured Nirman Co.)',
    clientType: 'government',
    date: '2017-11-20',
    deliveredBy: 'green-building-technologies',
    subject: 'Sintex septic tanks (30 users / 6,000 ltrs) for Police Buildings',
    scope: [
      '6 Police Buildings — Nawalparasi & Rupandehi',
      '6 Police Buildings — Kapilvastu & Dang',
      '4 Police Buildings — Snake & Saptari',
    ],
    project: 'Nepal Police Buildings',
    location: 'Six districts across Nepal',
  },
  {
    id: 'hama-iron-steel',
    client: 'Hama Iron & Steel Industries Pvt. Ltd.',
    clientType: 'industrial',
    date: '2017-11-01',
    deliveredBy: 'green-building-technologies',
    subject: 'Letter of appreciation — quality of service and product accountability',
    scope: ['Sintex Industrial Storage Solutions'],
  },
];

export const TESTIMONIALS_COUNT = TESTIMONIALS.length;
