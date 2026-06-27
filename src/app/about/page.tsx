import { fetchCertifications, fetchMilestones, fetchSiteConfig } from '@/lib/cms';
import { AboutClient } from './AboutClient';

export default async function AboutPage() {
  const [certifications, milestones, siteConfig] = await Promise.all([
    fetchCertifications(),
    fetchMilestones(),
    fetchSiteConfig(),
  ]);
  return (
    <AboutClient
      certifications={certifications}
      milestones={milestones}
      siteConfig={siteConfig}
    />
  );
}
