import type { Metadata } from 'next';
import { fetchSiteConfig, fetchJobs } from '@/lib/cms';
import { CareerClient } from './CareerClient';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join CMS Trading & Contracting — explore open positions, learn about our culture, and grow your career in Nepal\'s construction and building materials industry.',
};

export default async function CareerPage() {
  const [siteConfig, jobs] = await Promise.all([fetchSiteConfig(), fetchJobs()]);

  return <CareerClient jobs={jobs} siteConfig={siteConfig} />;
}
