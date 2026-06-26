import { fetchCertifications, fetchMilestones, fetchSiteConfig, fetchLeadership } from '@/lib/cms';
import { AboutClient } from './AboutClient';

export default async function AboutPage() {
  const [certifications, milestones, siteConfig, leadership] = await Promise.all([
    fetchCertifications(),
    fetchMilestones(),
    fetchSiteConfig(),
    fetchLeadership(),
  ]);
  return (
    <AboutClient
      certifications={certifications}
      milestones={milestones}
      siteConfig={siteConfig}
      leadership={leadership}
    />
  );
}
