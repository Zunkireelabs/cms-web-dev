import { fetchProjects } from '@/lib/cms';
import { ProjectsClient } from './ProjectsClient';

export default async function ProjectsPage() {
  const projects = await fetchProjects();
  return <ProjectsClient projects={projects} />;
}
