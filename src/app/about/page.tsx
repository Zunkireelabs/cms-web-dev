import { fetchCertifications } from '@/lib/cms';
import { AboutClient } from './AboutClient';

export default async function AboutPage() {
  const certifications = await fetchCertifications();
  return <AboutClient certifications={certifications} />;
}
