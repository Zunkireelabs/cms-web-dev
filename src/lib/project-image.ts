import type { Project } from '@/data/projects';

const SECTOR_IMAGES: Record<string, string> = {
  office: '/images/projects/office.jpg',
  hospitality: '/images/projects/hospitality.jpg',
  airports: '/images/projects/airport.jpg',
  healthcare: '/images/projects/healthcare.jpg',
  education: '/images/projects/education.jpg',
  residential: '/images/projects/residential.jpg',
};

export function getProjectImageSrc(project: Project): string {
  const imageKey = project.sector || project.type;
  return project.image ?? SECTOR_IMAGES[imageKey] ?? SECTOR_IMAGES.office;
}
