'use client';

import { useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import nepalPaths from '@/data/nepal-paths.json';
import { PROJECTS } from '@/data/projects';

interface ProvincePath {
  id: number;
  name: string;
  d: string;
}

interface LocationConfig {
  marker: [number, number];
  label: [number, number];
  // 'up' = connector goes up from marker to label, 'down' = goes down
  direction: 'up' | 'down';
}

// SVG viewBox — extra padding for labels
const WIDTH = 1150;
const HEIGHT = 580;

// Carefully positioned markers & labels
// Markers are placed ON the map, labels are offset to avoid overlap
// The Nepal map SVG paths are 1000x500, translated by (mapOffsetX, mapOffsetY)
// mapOffsetX = (1150 - 1000)/2 + 25 = 100, mapOffsetY = (580 - 500)/2 = 40
// So map occupies SVG coords roughly: x(100–1100), y(40–540)

const LOCATIONS: Record<string, LocationConfig> = {
  'Nepalgunj, Nepal': {
    marker: [345, 330],
    label: [155, 275],
    direction: 'up',
  },
  'Pokhara, Nepal': {
    marker: [500, 300],
    label: [380, 225],
    direction: 'up',
  },
  'Gorkha, Nepal': {
    marker: [555, 310],
    label: [555, 235],
    direction: 'up',
  },
  'Bhairahawa, Nepal': {
    marker: [470, 380],
    label: [340, 440],
    direction: 'down',
  },
  'Chitwan, Nepal': {
    marker: [560, 385],
    label: [500, 450],
    direction: 'down',
  },
  'Dhulikhel, Nepal': {
    marker: [690, 360],
    label: [780, 275],
    direction: 'up',
  },
  'Kathmandu, Nepal': {
    marker: [650, 375],
    label: [780, 340],
    direction: 'up',
  },
  'Bhaktapur, Nepal': {
    marker: [675, 388],
    label: [780, 395],
    direction: 'down',
  },
  'Lalitpur, Nepal': {
    marker: [645, 400],
    label: [780, 450],
    direction: 'down',
  },
  'Biratnagar, Nepal': {
    marker: [840, 460],
    label: [920, 405],
    direction: 'up',
  },
};

function getElbowPath(
  mx: number, my: number,
  lx: number, ly: number,
  direction: 'up' | 'down'
): string {
  // 2-segment L-shaped connector
  if (direction === 'up') {
    // Go up from marker, then horizontal to label
    const bendY = ly + 8;
    return `M ${mx},${my} L ${mx},${bendY} L ${lx - 4},${bendY}`;
  } else {
    // Go down from marker, then horizontal to label
    const bendY = ly - 2;
    return `M ${mx},${my} L ${mx},${bendY} L ${lx - 4},${bendY}`;
  }
}

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
  const locationMap = new Map<string, { projects: typeof PROJECTS }>();

  PROJECTS.forEach((project) => {
    const anchor = resolveMapAnchor(project.location);
    if (!anchor) return;
    const existing = locationMap.get(anchor);
    if (existing) {
      existing.projects.push(project);
    } else {
      locationMap.set(anchor, { projects: [project] });
    }
  });

  return Array.from(locationMap.entries()).map(([location, data]) => ({
    location,
    config: LOCATIONS[location],
    projects: data.projects,
  }));
}

export function ProjectMap() {
  const { width, height, paths } = nepalPaths as {
    width: number;
    height: number;
    paths: ProvincePath[];
  };

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const projectLocations = useMemo(() => getProjectLocations(), []);

  const mapOffsetX = (WIDTH - width) / 2 + 25;
  const mapOffsetY = (HEIGHT - height) / 2;

  const hoveredData = hoveredLocation
    ? projectLocations.find((l) => l.location === hoveredLocation)
    : null;

  const hoveredConfig = hoveredLocation ? LOCATIONS[hoveredLocation] : null;

  return (
    <div ref={ref} className="relative w-full">
      <motion.div
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
                className="transition-colors duration-300 hover:fill-[rgba(212,168,75,0.22)]"
              />
            ))}
          </g>

          {/* Pulse animation */}
          <defs>
            <style>{`
              @keyframes mapPulse {
                0% { r: 5; opacity: 0.4; }
                100% { r: 16; opacity: 0; }
              }
              .pulse-ring { animation: mapPulse 2.5s ease-out infinite; }
            `}</style>
          </defs>

          {/* Connector lines (behind markers) */}
          {projectLocations.map(({ location, config }) => {
            const [mx, my] = config.marker;
            const [lx, ly] = config.label;
            const isHovered = hoveredLocation === location;

            return (
              <path
                key={`line-${location}`}
                d={getElbowPath(mx, my, lx, ly, config.direction)}
                fill="none"
                stroke={isHovered ? 'rgba(212,168,75,0.6)' : 'rgba(0,0,0,0.1)'}
                strokeWidth={0.8}
                className="transition-all duration-200"
              />
            );
          })}

          {/* Markers + Labels */}
          {projectLocations.map(({ location, config, projects }, index) => {
            const [mx, my] = config.marker;
            const [lx, ly] = config.label;
            const isHovered = hoveredLocation === location;
            const cityName = location.replace(', Nepal', '');
            const count = projects.length;
            const primaryName = projects[0].title;
            const labelText = count > 1 ? `${primaryName} +${count - 1}` : primaryName;

            return (
              <g
                key={`loc-${location}`}
                onMouseEnter={() => setHoveredLocation(location)}
                onMouseLeave={() => setHoveredLocation(null)}
                style={{ cursor: 'pointer' }}
              >
                <g
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateY(0)' : 'translateY(8px)',
                    transition: `opacity 0.5s ease ${0.3 + index * 0.08}s, transform 0.5s ease ${0.3 + index * 0.08}s`,
                  }}
                >
                  {/* Pulse ring */}
                  <circle
                    cx={mx} cy={my} r={5}
                    fill="none" stroke="#D4A84B" strokeWidth={1.5}
                    className="pulse-ring"
                    opacity={isHovered ? 0 : 0.4}
                  />

                  {/* Hover glow */}
                  {isHovered && (
                    <circle cx={mx} cy={my} r={16} fill="rgba(212,168,75,0.12)" />
                  )}

                  {/* Marker dot */}
                  <circle
                    cx={mx} cy={my}
                    r={isHovered ? 6 : 4.5}
                    fill={isHovered ? '#D4A84B' : '#1e3a5f'}
                    stroke={isHovered ? '#D4A84B' : '#1e3a5f'}
                    strokeWidth={1.5}
                    className="transition-all duration-200"
                  />
                  <circle
                    cx={mx} cy={my}
                    r={isHovered ? 2 : 1.5}
                    fill="#FAFAF8"
                  />

                  {/* Project name */}
                  <text
                    x={lx} y={ly}
                    textAnchor="start"
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fill: isHovered ? '#D4A84B' : '#1a1a1a',
                      letterSpacing: '0.01em',
                    }}
                    className="transition-all duration-200"
                  >
                    {labelText}
                  </text>

                  {/* City name */}
                  <text
                    x={lx} y={ly + 13}
                    textAnchor="start"
                    style={{
                      fontSize: '9px',
                      fontWeight: 500,
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fill: '#D4A84B',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {cityName}
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
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.05) 0%, transparent 70%)',
          filter: 'blur(4px)',
        }}
      />

      {/* Hover Detail Card — near hovered marker */}
      {hoveredData && hoveredConfig && (
        <div
          className="absolute z-50 min-w-[220px] max-w-[280px] p-4 rounded-xl border border-neutral-200 bg-white shadow-xl pointer-events-none"
          style={{
            left: `${(hoveredConfig.marker[0] / WIDTH) * 100}%`,
            top: `${Math.max(8, (hoveredConfig.marker[1] / HEIGHT) * 100 - 6)}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent mb-2"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {hoveredData.location.replace(', Nepal', '')}
          </div>
          <ul className="space-y-1.5">
            {hoveredData.projects.map((project) => (
              <li key={project.id}>
                <span className="block text-[13px] font-medium text-neutral-900">
                  {project.title}
                </span>
                <span className="text-[11px] text-neutral-400">
                  {project.sector ? project.sector.charAt(0).toUpperCase() + project.sector.slice(1) : project.type} · {project.year}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
