'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import nepalPaths from '@/data/nepal-paths.json';
import { PROJECTS, type Project } from '@/data/projects';
import { MapPin, X } from 'lucide-react';

interface ProvincePath {
  id: number;
  name: string;
  d: string;
}

interface LocationConfig {
  marker: [number, number];
}

const WIDTH = 1150;
const HEIGHT = 580;

const LOCATIONS: Record<string, LocationConfig> = {
  'Nepalgunj, Nepal': { marker: [345, 330] },
  'Pokhara, Nepal': { marker: [500, 300] },
  'Gorkha, Nepal': { marker: [555, 310] },
  'Bhairahawa, Nepal': { marker: [470, 380] },
  'Chitwan, Nepal': { marker: [560, 385] },
  'Dhulikhel, Nepal': { marker: [690, 360] },
  'Kathmandu, Nepal': { marker: [650, 375] },
  'Bhaktapur, Nepal': { marker: [675, 388] },
  'Lalitpur, Nepal': { marker: [645, 400] },
  'Biratnagar, Nepal': { marker: [840, 460] },
};

function resolveMapAnchor(location: string): string | null {
  if (LOCATIONS[location]) return location;
  const lower = location.toLowerCase();
  if (lower.includes('lumbini') || lower.includes('bhairahawa')) return 'Bhairahawa, Nepal';
  if (lower.includes('nagarkot')) return 'Bhaktapur, Nepal';
  if (lower.includes('namo buddha') || lower.includes('kavre')) return 'Dhulikhel, Nepal';
  if (lower.includes('nawalparasi')) return 'Chitwan, Nepal';
  for (const key of Object.keys(LOCATIONS)) {
    const city = key.split(',')[0].trim().toLowerCase();
    if (lower.includes(city)) return key;
  }
  return null;
}

function getProjectLocations() {
  const locationMap = new Map<string, { projects: Project[] }>();
  PROJECTS.forEach((project) => {
    const anchor = resolveMapAnchor(project.location);
    if (!anchor) return;
    const existing = locationMap.get(anchor);
    if (existing) existing.projects.push(project);
    else locationMap.set(anchor, { projects: [project] });
  });
  return Array.from(locationMap.entries())
    .map(([location, data]) => ({
      location,
      config: LOCATIONS[location],
      projects: data.projects,
    }))
    .sort((a, b) => b.projects.length - a.projects.length);
}

export function ProjectMap() {
  const { width, height, paths } = nepalPaths as {
    width: number;
    height: number;
    paths: ProvincePath[];
  };

  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const projectLocations = useMemo(() => getProjectLocations(), []);

  const mapOffsetX = (WIDTH - width) / 2 + 25;
  const mapOffsetY = (HEIGHT - height) / 2;

  const activeData = activeLocation
    ? projectLocations.find((l) => l.location === activeLocation)
    : null;
  const activeConfig = activeLocation ? LOCATIONS[activeLocation] : null;

  // Close popover on outside click / Escape
  useEffect(() => {
    if (!activeLocation) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActiveLocation(null);
    }
    function handleClick(e: MouseEvent) {
      if (!containerRef.current) return;
      const target = e.target as Element;
      if (target.closest('[data-map-marker]')) return;
      if (target.closest('[data-map-popover]')) return;
      setActiveLocation(null);
    }
    document.addEventListener('keydown', handleKey);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('click', handleClick);
    };
  }, [activeLocation]);

  return (
    <div ref={ref} className="relative w-full">
      {/* Stat strip above the map */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-600">
          <span className="font-semibold text-neutral-900">
            {PROJECTS.length}+ projects
          </span>{' '}
          delivered across{' '}
          <span className="font-semibold text-neutral-900">
            {projectLocations.length} districts
          </span>{' '}
          in Nepal — tap a marker to view the project list.
        </p>
      </div>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="relative w-full overflow-hidden rounded-xl border border-neutral-200 bg-[#FAFAF8]"
      >
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="#FAFAF8" />

          {/* Province paths */}
          <g transform={`translate(${mapOffsetX}, ${mapOffsetY})`}>
            {paths.map((province: ProvincePath) => (
              <path
                key={`province-${province.id}`}
                d={province.d}
                fill="rgba(212, 168, 75, 0.12)"
                stroke="rgba(212, 168, 75, 0.35)"
                strokeWidth={1}
                className="transition-colors duration-300"
              />
            ))}
          </g>

          <defs>
            <style>{`
              @keyframes mapPulse {
                0% { r: 8; opacity: 0.5; }
                100% { r: 30; opacity: 0; }
              }
              .pulse-ring { animation: mapPulse 2.5s ease-out infinite; transform-origin: center; }
            `}</style>
          </defs>

          {/* Markers */}
          {projectLocations.map(({ location, config, projects }, index) => {
            const [mx, my] = config.marker;
            const count = projects.length;
            const isActive = activeLocation === location;
            const isMulti = count > 1;
            const radius = isMulti ? Math.min(14 + Math.log2(count) * 4, 22) : 7;

            return (
              <g
                key={`loc-${location}`}
                data-map-marker
                onClick={() => setActiveLocation(isActive ? null : location)}
                style={{ cursor: 'pointer' }}
              >
                <g
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateY(0)' : 'translateY(8px)',
                    transition: `opacity 0.5s ease ${0.3 + index * 0.08}s, transform 0.5s ease ${0.3 + index * 0.08}s`,
                  }}
                >
                  {/* Pulse ring (only when not active) */}
                  {!isActive && (
                    <circle
                      cx={mx}
                      cy={my}
                      r={radius}
                      fill="none"
                      stroke="#D4A84B"
                      strokeWidth={1.5}
                      className="pulse-ring"
                    />
                  )}

                  {/* Active glow */}
                  {isActive && (
                    <circle cx={mx} cy={my} r={radius + 12} fill="rgba(212,168,75,0.18)" />
                  )}

                  {/* Marker circle */}
                  <circle
                    cx={mx}
                    cy={my}
                    r={radius}
                    fill={isActive ? '#D4A84B' : isMulti ? '#1e3a5f' : '#1e3a5f'}
                    stroke="#ffffff"
                    strokeWidth={2.5}
                    className="transition-all duration-200"
                  />

                  {/* Count badge text (only for multi) */}
                  {isMulti && (
                    <text
                      x={mx}
                      y={my}
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{
                        fontSize: count >= 10 ? '13px' : '15px',
                        fontWeight: 700,
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fill: '#ffffff',
                        pointerEvents: 'none',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {count}
                    </text>
                  )}

                  {/* Inner dot for singletons */}
                  {!isMulti && (
                    <circle cx={mx} cy={my} r={2.5} fill="#ffffff" />
                  )}

                  {/* City label below marker */}
                  <text
                    x={mx}
                    y={my + radius + 14}
                    textAnchor="middle"
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fill: isActive ? '#D4A84B' : '#1a1a1a',
                      letterSpacing: '0.02em',
                      pointerEvents: 'none',
                    }}
                  >
                    {location.replace(', Nepal', '')}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Subtle shadow */}
      <div
        className="mx-auto h-3 -mt-0.5"
        style={{
          width: '60%',
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.05) 0%, transparent 70%)',
          filter: 'blur(4px)',
        }}
      />

      {/* Popover — desktop floats near marker; mobile becomes bottom sheet */}
      <AnimatePresence>
        {activeData && activeConfig && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 sm:hidden"
              onClick={() => setActiveLocation(null)}
            />

            <motion.div
              data-map-popover
              key={activeLocation}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="
                fixed bottom-0 left-0 right-0 z-50 max-h-[70vh] overflow-y-auto
                rounded-t-2xl border-t border-neutral-200 bg-white shadow-2xl p-5
                sm:absolute sm:bottom-auto sm:left-auto sm:right-auto sm:rounded-2xl
                sm:max-h-[420px] sm:w-[320px] sm:border sm:p-5 sm:shadow-xl
              "
              style={
                typeof window !== 'undefined' && window.innerWidth >= 640
                  ? {
                      left: `${(activeConfig.marker[0] / WIDTH) * 100}%`,
                      top: `${(activeConfig.marker[1] / HEIGHT) * 100}%`,
                      transform: 'translate(-50%, calc(-100% - 24px))',
                    }
                  : undefined
              }
            >
              <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-neutral-100">
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" strokeWidth={1.5} />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
                      District
                    </span>
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-neutral-900">
                    {activeData.location.replace(', Nepal', '')}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {activeData.projects.length}{' '}
                    {activeData.projects.length === 1 ? 'project' : 'projects'} delivered
                  </p>
                </div>
                <button
                  onClick={() => setActiveLocation(null)}
                  className="p-1 -m-1 rounded-md hover:bg-neutral-100 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4 text-neutral-400" strokeWidth={2} />
                </button>
              </div>

              <ul className="space-y-3">
                {activeData.projects.map((project) => (
                  <li key={project.id} className="group">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold text-neutral-900 group-hover:text-accent transition-colors">
                        {project.title}
                      </span>
                      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                        {project.year}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-neutral-500">
                      {project.sector && (
                        <span className="capitalize text-accent">{project.sector}</span>
                      )}
                      {project.area && (
                        <>
                          <span>·</span>
                          <span>{project.area}</span>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
