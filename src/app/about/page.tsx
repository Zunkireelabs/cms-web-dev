import { fetchCertifications, fetchMilestones } from '@/lib/cms';
import { AboutClient } from './AboutClient';

export default async function AboutPage() {
  const [certifications, milestones] = await Promise.all([
    fetchCertifications(),
    fetchMilestones(),
  ]);
  return <AboutClient certifications={certifications} milestones={milestones} />;
}
