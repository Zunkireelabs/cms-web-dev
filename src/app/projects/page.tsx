'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { ContactCTA } from '@/components/sections';
import { cn } from '@/lib/utils';
import {
  PROJECTS,
  COMMERCIAL_SECTORS,
  type Project,
  type ProjectType,
  type CommercialSector,
} from '@/data/projects';
import { MapPin, Maximize, Building2, Home } from 'lucide-react';

const SECTOR_IMAGES: Record<string, string> = {
  office: '/images/projects/office.jpg',
  government: '/images/projects/government.jpg',
  hospitality: '/images/projects/hospitality.jpg',
  airports: '/images/projects/airport.jpg',
  healthcare: '/images/projects/healthcare.jpg',
  education: '/images/projects/education.jpg',
  infrastructure: '/images/projects/infrastructure.jpg',
  residential: '/images/projects/residential.jpg',
};

const TABS: { value: ProjectType; label: string; icon: React.ReactNode }[] = [
  { value: 'commercial', label: 'Commercial', icon: <Building2 className="h-4 w-4" /> },
  { value: 'residential', label: 'Residential', icon: <Home className="h-4 w-4" /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
};

function ProjectCard({ project }: { project: Project }) {
  const imageKey = project.sector || project.type;
  const imageSrc = project.image ?? SECTOR_IMAGES[imageKey] ?? SECTOR_IMAGES.office;

  return (
    <motion.div
      variants={itemVariants}
      layout
      className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {project.featured && (
          <span className="absolute top-4 left-4 inline-block rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm">
            Featured
          </span>
        )}
        <span className="absolute top-4 right-4 inline-block rounded-full bg-neutral-charcoal/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          {project.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {project.sector && (
          <span className="inline-block w-fit rounded-full bg-accent-50 px-2.5 py-0.5 text-[11px] font-semibold capitalize text-accent">
            {project.sector}
          </span>
        )}

        <h3 className="mt-3 font-display text-lg font-bold leading-tight text-neutral-charcoal transition-colors group-hover:text-accent sm:text-xl">
          {project.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-neutral-500">{project.client}</p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-neutral-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-accent shrink-0" strokeWidth={1.75} />
            {project.location}
          </span>
          {project.area && (
            <span className="flex items-center gap-1.5">
              <Maximize className="h-3 w-3 text-accent shrink-0" strokeWidth={1.75} />
              {project.area}
            </span>
          )}
        </div>

        <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">
          {project.description}
        </p>

        {project.scope.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.scope.slice(0, 3).map((item) => (
              <span
                key={item}
                className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600"
              >
                {item}
              </span>
            ))}
            {project.scope.length > 3 && (
              <span className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-400">
                +{project.scope.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<ProjectType>('commercial');
  const [activeSector, setActiveSector] = useState<CommercialSector | 'all'>('all');

  const filteredProjects = useMemo(() => {
    let projects = PROJECTS.filter((p) => p.type === activeTab);
    if (activeTab === 'commercial' && activeSector !== 'all') {
      projects = projects.filter((p) => p.sector === activeSector);
    }
    return projects;
  }, [activeTab, activeSector]);

  const handleTabChange = (tab: ProjectType) => {
    setActiveTab(tab);
    setActiveSector('all');
  };

  return (
    <>
      <PageHero
        kicker="Our Portfolio"
        title="Featured projects across Nepal."
        subtitle={`${PROJECTS.length}+ commercial and residential projects delivered through CMS Group ventures — from Tiger Palace Resort and Bir Hospital to NRB headquarters and ICIMOD's green campus.`}
        image="/images/projects/tiger-palace.jpg"
        imageAlt="CMS Group featured projects"
        size="tall"
      />

      {/* Tabs & Filters */}
      <section className="sticky top-16 z-30 border-y border-neutral-200 bg-white/95 backdrop-blur-md lg:top-20">
        <Container>
          <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  className={cn(
                    'relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all',
                    activeTab === tab.value
                      ? 'bg-accent text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200',
                  )}
                >
                  {tab.icon}
                  {tab.label}
                  <span
                    className={cn(
                      'ml-1 rounded-full px-2 py-0.5 text-[11px]',
                      activeTab === tab.value
                        ? 'bg-white/20 text-white'
                        : 'bg-white text-neutral-500',
                    )}
                  >
                    {PROJECTS.filter((p) => p.type === tab.value).length}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'commercial' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-wrap gap-2"
                >
                  <button
                    onClick={() => setActiveSector('all')}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-sm font-medium transition-all',
                      activeSector === 'all'
                        ? 'bg-accent-50 text-accent'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200',
                    )}
                  >
                    All Sectors
                  </button>
                  {COMMERCIAL_SECTORS.map((sector) => {
                    const count = PROJECTS.filter(
                      (p) => p.type === 'commercial' && p.sector === sector.value,
                    ).length;
                    return (
                      <button
                        key={sector.value}
                        onClick={() => setActiveSector(sector.value)}
                        className={cn(
                          'rounded-full px-3 py-1.5 text-sm font-medium transition-all',
                          activeSector === sector.value
                            ? 'bg-accent-50 text-accent'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200',
                        )}
                      >
                        {sector.label}
                        <span className="ml-1 text-xs opacity-60">({count})</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="py-12 lg:py-16 bg-neutral-off-white">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center justify-between"
          >
            <p className="text-sm text-neutral-600">
              Showing{' '}
              <span className="font-semibold text-neutral-charcoal">
                {filteredProjects.length}
              </span>{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'}
              {activeSector !== 'all' && (
                <span>
                  {' '}
                  in{' '}
                  <span className="font-semibold capitalize text-accent">{activeSector}</span>
                </span>
              )}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${activeSector}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center"
            >
              <Building2 className="mx-auto h-16 w-16 text-neutral-300" />
              <h3 className="mt-4 font-display text-lg font-bold text-neutral-charcoal">
                No projects found
              </h3>
              <p className="mt-2 text-neutral-600">Try selecting a different sector or tab.</p>
            </motion.div>
          )}
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
