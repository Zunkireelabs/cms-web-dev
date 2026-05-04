'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { ContactCTA } from '@/components/sections';
import { cn } from '@/lib/utils';
import {
  PROJECTS,
  COMMERCIAL_SECTORS,
  type Project,
  type ProjectType,
  type CommercialSector,
} from '@/data/projects';
import Image from 'next/image';
import { MapPin, Calendar, Maximize, Building2, Home } from 'lucide-react';

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
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

function ProjectCard({ project }: { project: Project }) {
  const imageKey = project.sector || project.type;
  const imageSrc = SECTOR_IMAGES[imageKey] || SECTOR_IMAGES.office;

  return (
    <motion.div
      variants={itemVariants}
      layout
      className="group relative overflow-hidden rounded-2xl border border-neutral-border bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-brand-100 to-brand-50">
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
              Featured
            </span>
          </div>
        )}

        {/* Year Badge */}
        <div className="absolute right-4 top-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-charcoal backdrop-blur-sm">
            {project.year}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brand-900/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-full flex-col items-center justify-center p-4 text-center">
            <p className="text-sm text-white/90">{project.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Sector Tag */}
        {project.sector && (
          <span className="inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium capitalize text-brand-700">
            {project.sector}
          </span>
        )}

        <h3 className="mt-3 text-lg font-semibold text-neutral-charcoal transition-colors group-hover:text-brand-600">
          {project.title}
        </h3>

        <p className="mt-1 text-sm text-neutral-600">{project.client}</p>

        {/* Meta Info */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>{project.location}</span>
          </div>
          {project.area && (
            <div className="flex items-center gap-1.5">
              <Maximize className="h-3.5 w-3.5" />
              <span>{project.area}</span>
            </div>
          )}
        </div>

        {/* Scope Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.scope.slice(0, 3).map((item) => (
            <span
              key={item}
              className="rounded bg-neutral-surface px-2 py-0.5 text-xs text-neutral-600"
            >
              {item}
            </span>
          ))}
          {project.scope.length > 3 && (
            <span className="rounded bg-neutral-surface px-2 py-0.5 text-xs text-neutral-400">
              +{project.scope.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-600 transition-all duration-300 group-hover:w-full" />
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-charcoal via-neutral-800 to-brand-900 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
            >
              Our Portfolio
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Featured Projects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-xl text-neutral-300"
            >
              Explore our diverse portfolio of commercial and residential projects
              delivered across Nepal.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Tabs & Filters */}
      <section className="sticky top-16 z-30 border-b border-neutral-border bg-white/95 backdrop-blur-md lg:top-20">
        <Container>
          <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Tabs */}
            <div className="flex gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  className={cn(
                    'relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                    activeTab === tab.value
                      ? 'bg-brand-600 text-white'
                      : 'bg-neutral-surface text-neutral-600 hover:bg-neutral-200'
                  )}
                >
                  {tab.icon}
                  {tab.label}
                  <span
                    className={cn(
                      'ml-1 rounded-full px-2 py-0.5 text-xs',
                      activeTab === tab.value
                        ? 'bg-white/20 text-white'
                        : 'bg-neutral-200 text-neutral-500'
                    )}
                  >
                    {PROJECTS.filter((p) => p.type === tab.value).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Sector Filters (Commercial only) */}
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
                        ? 'bg-brand-100 text-brand-700'
                        : 'bg-neutral-surface text-neutral-600 hover:bg-neutral-200'
                    )}
                  >
                    All Sectors
                  </button>
                  {COMMERCIAL_SECTORS.map((sector) => {
                    const count = PROJECTS.filter(
                      (p) => p.type === 'commercial' && p.sector === sector.value
                    ).length;
                    return (
                      <button
                        key={sector.value}
                        onClick={() => setActiveSector(sector.value)}
                        className={cn(
                          'rounded-full px-3 py-1.5 text-sm font-medium transition-all',
                          activeSector === sector.value
                            ? 'bg-brand-100 text-brand-700'
                            : 'bg-neutral-surface text-neutral-600 hover:bg-neutral-200'
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
      <section className="py-12 lg:py-16">
        <Container>
          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center justify-between"
          >
            <p className="text-neutral-600">
              Showing{' '}
              <span className="font-semibold text-neutral-charcoal">
                {filteredProjects.length}
              </span>{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'}
              {activeSector !== 'all' && (
                <span>
                  {' '}
                  in{' '}
                  <span className="font-semibold capitalize text-brand-600">
                    {activeSector}
                  </span>
                </span>
              )}
            </p>
          </motion.div>

          {/* Grid */}
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

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center"
            >
              <Building2 className="mx-auto h-16 w-16 text-neutral-300" />
              <h3 className="mt-4 text-lg font-semibold text-neutral-charcoal">
                No projects found
              </h3>
              <p className="mt-2 text-neutral-600">
                Try selecting a different sector or tab.
              </p>
            </motion.div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <ContactCTA />
    </>
  );
}
