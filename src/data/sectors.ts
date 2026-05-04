import { Building2, GraduationCap, Plane, Briefcase, Hotel, Home } from 'lucide-react';
import type { Sector } from '@/types';

export const SECTORS: Sector[] = [
  {
    name: 'Hospital',
    slug: 'hospital',
    icon: Building2,
    summary: 'High-quality services for hospital construction and finishing.',
    description:
      'We provide various solutions to Hospitals, as we meet our standard of providing high quality services such as Water proofing, Expansion Joint, STP, Windows & Sensor Doors, Facade, Wooden/Fire/Acoustic Doors, Ceiling, Epoxy flooring, Vinyl flooring, verified tiles, toilet cubicle, door hardware, automatic censor doors, Sanitary fixtures, Fire rated metal doors for emergency exit, Wooden doors for common toilet, Alexa demountable partition, Windows Toilet cubicle, Parking Lift, fountain and water features, commercial storage tank, Fire Tank, engineering wood, laminate, carpet, SPC Floor Laminate, Solid wood.',
  },
  {
    name: 'Education',
    slug: 'education',
    icon: GraduationCap,
    summary: 'Quality finishing and infrastructure for education sector.',
    description:
      'We provide quality service and products to all education sectors. We have been providing services such as Water proofing, Expansion joint, Sewage Treatment Plant, Windows & Doors, Wooden/Fire/Acoustic Doors, Ceiling, Flooring, wood coating, toilet cubicle, Aluminum & Glass railing, door hardware, automatic censor doors, Sanitary fixtures, office furniture, Alexa Partitions, Epoxy flooring, Vinyl flooring, chair, desk, fountain and water features, commercial storage tank, engineering wood, laminate, carpet, SPC Floor Laminate, Solid wood, Fire tank.',
  },
  {
    name: 'Airport',
    slug: 'airport',
    icon: Plane,
    summary: 'End-to-end finishing solutions for airport infrastructure.',
    description:
      'We provide all types of services to Airports to cater high quality service to end consumers. Services we provide to Airports are such as security, Water proofing, Expansion joint, Sewage Treatment Plant, Roofing, Façade, Windows & Doors, Wooden/Fire/Acoustic Doors, Ceiling, Flooring, Emergency Exit, wood coating, toilet cubicle, Aluminum & Glass railing, door hardware, automatic censor doors, Sanitary fixtures, security products, office furniture, Parking Lifts, Alexa Partition, Verified tiles, fountain and water features, commercial storage tank, engineering wood, laminate, carpet, SPC Floor Laminate, Solid wood, Fire Tank.',
  },
  {
    name: 'Office',
    slug: 'office',
    icon: Briefcase,
    summary: 'Modern, efficient interiors for corporate workspaces.',
    description:
      'Our Company also provides services to Offices. We provide various services such as Office furniture, Office Partition, Expansion joint, Sewage Treatment Plant, Windows, Façade, Wooden/Fire/Acoustic Doors, Ceiling, Flooring, wood coating, toilet cubicle, Aluminum & Glass railing, digital & RFID locks, door hardware, acoustic movable walls, automatic censor doors, Sanitary fixtures, Water proofing, Verified tiles, fountain and water features, commercial storage tank, Fire Tank, engineering wood, laminate, carpet, SPC Floor Laminate, and Solid wood.',
  },
  {
    name: 'Hotel',
    slug: 'hotel',
    icon: Hotel,
    summary: 'Premium finishes and systems for hospitality projects.',
    description:
      'We also provide services to Hotels with our high quality products and services such as Furniture, Windows & Sensor Doors, acoustic movable walls, automatic censor doors, Facade, Wooden/Fire/Acoustic Doors, Ceiling, Flooring, wood coating, toilet cubicle, Aluminum & Glass railing, digital & RFID locks, door hardware, Sanitary fixtures, Water proofing, Expansion joint, Sewage Treatment Plant, Roofing, Sanitary fixtures, Parking Lifts, Verified tiles, fountain and water features, commercial storage tank, engineering wood, laminate, Carpet, SPC Floor Laminate, Solid wood, and Fire Tank.',
  },
  {
    name: 'Residence',
    slug: 'residence',
    icon: Home,
    summary: 'Comprehensive residential construction and finishing.',
    description:
      'We provide various services to Residences such as Water proofing, Sewage Treatment Plant, Roofing, Doors & Windows, Ceiling (Hunter Douglas), Flooring, wood coating, Aluminum & Glass railing, digital & RFID locks, door hardware, Sanitary fixtures, Verified tiles, fountain and water features, commercial storage tank, engineering wood, laminate, carpet, SPC Floor Laminate, Solid wood, Sewage Treatment Plant, Roofing, Sanitary fixtures, and Parking Lifts.',
  },
];
