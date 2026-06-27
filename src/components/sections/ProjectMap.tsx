'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import nepalPaths from '@/data/nepal-paths.json';
import type { Project, MapLocation } from '@/types/cms';
import { Calendar, MapPin, Maximize2, X } from 'lucide-react';

interface ProvincePath {
  id: number;
  name: string;
  d: string;
}

interface LocationConfig {
  marker: [number, number];
  label: [number, number];
  direction: 'up' | 'down';
}

const WIDTH = 1150;
const HEIGHT = 580;

// Fallback location set — used only when the CMS returns no map-locations,
// so the map is never empty in dev or during a CMS outage.
const FALLBACK_LOCATIONS: Record<string, LocationConfig> = {
  'Nepalgunj, Nepal': { marker: [345, 330], label: [155, 275], direction: 'up' },
  'Pokhara, Nepal': { marker: [500, 300], label: [380, 225], direction: 'up' },
  'Gorkha, Nepal': { marker: [555, 310], label: [555, 235], direction: 'up' },
  'Bhairahawa, Nepal': { marker: [470, 380], label: [340, 440], direction: 'down' },
  'Chitwan, Nepal': { marker: [560, 385], label: [500, 450], direction: 'down' },
  'Dhulikhel, Nepal': { marker: [690, 360], label: [780, 275], direction: 'up' },
  'Kathmandu, Nepal': { marker: [650, 375], label: [780, 340], direction: 'up' },
  'Bhaktapur, Nepal': { marker: [675, 388], label: [780, 395], direction: 'down' },
  'Lalitpur, Nepal': { marker: [645, 400], label: [780, 450], direction: 'down' },
  'Biratnagar, Nepal': { marker: [840, 460], label: [920, 405], direction: 'up' },
};

const FALLBACK_KEYWORDS: Record<string, string[]> = {
  'Bhairahawa, Nepal': ['lumbini', 'bhairahawa'],
  'Chitwan, Nepal':    ['nawalparasi'],
  'Dhulikhel, Nepal':  ['namo buddha', 'kavre'],
  'Bhaktapur, Nepal':  ['nagarkot'],
};

const SECTOR_CHIP: Record<string, { bg: string; text: string }> = {
  healthcare: { bg: 'bg-rose-50', text: 'text-rose-700' },
  education: { bg: 'bg-blue-50', text: 'text-blue-700' },
  airports: { bg: 'bg-violet-50', text: 'text-violet-700' },
  office: { bg: 'bg-amber-50', text: 'text-amber-700' },
  hospitality: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  government: { bg: 'bg-neutral-100', text: 'text-neutral-700' },
  infrastructure: { bg: 'bg-orange-50', text: 'text-orange-700' },
  residential: { bg: 'bg-teal-50', text: 'text-teal-700' },
};

function getElbowPath(
  mx: number, my: number, lx: number, ly: number,
  direction: 'up' | 'down',
): string {
  if (direction === 'up') {
    const bendY = ly + 8;
    return `M ${mx},${my} L ${mx},${bendY} L ${lx - 4},${bendY}`;
  }
  const bendY = ly - 2;
  return `M ${mx},${my} L ${mx},${bendY} L ${lx - 4},${bendY}`;
}

function resolveMapAnchor(
  location: string,
  locations: Record<string, LocationConfig>,
  keywords: Record<string, string[]>,
): string | null {
  if (locations[location]) return location;
  const lower = location.toLowerCase();
  for (const [anchor, kws] of Object.entries(keywords)) {
    if (kws.some((kw) => lower.includes(kw))) return anchor;
  }
  for (const key of Object.keys(locations)) {
    const city = key.split(',')[0].trim().toLowerCase();
    if (lower.includes(city)) return key;
  }
  return null;
}

function getProjectLocations(
  projects: Project[],
  locations: Record<string, LocationConfig>,
  keywords: Record<string, string[]>,
) {
  const locationMap = new Map<string, { projects: Project[] }>();
  projects.forEach((project) => {
    const anchor = resolveMapAnchor(project.location, locations, keywords);
    if (!anchor) return;
    const existing = locationMap.get(anchor);
    if (existing) existing.projects.push(project);
    else locationMap.set(anchor, { projects: [project] });
  });
  return Array.from(locationMap.entries()).map(([location, data]) => ({
    location,
    config: locations[location],
    projects: data.projects,
  }));
}

interface PopoverPlacement {
  left: number;
  top: number;
  origin: 'top' | 'bottom';
}

function ProjectPopover({
  location,
  projects,
  markerScreenX,
  markerScreenY,
  containerRect,
  pinned,
  onClose,
}: {
  location: string;
  projects: Project[];
  markerScreenX: number;
  markerScreenY: number;
  containerRect: DOMRect;
  pinned: boolean;
  onClose: () => void;
}) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<PopoverPlacement | null>(null);
  const cityName = location.replace(', Nepal', '');

  // Smart positioning — flip above/below based on space
  useLayoutEffect(() => {
    if (!popoverRef.current) return;
    const node = popoverRef.current;
    const popRect = node.getBoundingClientRect();
    const popH = popRect.height;
    const popW = popRect.width;
    const margin = 12;

    const spaceAbove = markerScreenY - containerRect.top;
    const placeAbove = spaceAbove >= popH + 24;

    let left = markerScreenX - popW / 2 - containerRect.left;
    const minLeft = margin;
    const maxLeft = containerRect.width - popW - margin;
    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;

    const top = placeAbove
      ? markerScreenY - containerRect.top - popH - 16
      : markerScreenY - containerRect.top + 22;

    setPlacement({ left, top, origin: placeAbove ? 'bottom' : 'top' });
  }, [markerScreenX, markerScreenY, containerRect, projects.length]);

  return (
    <motion.div
      ref={popoverRef}
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute z-50 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl"
      style={{
        left: placement?.left ?? -9999,
        top: placement?.top ?? -9999,
        transformOrigin: placement?.origin === 'bottom' ? 'bottom center' : 'top center',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-neutral-100 bg-gradient-to-br from-accent-50/50 to-white">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-accent shrink-0" strokeWidth={1.75} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              District
            </span>
          </div>
          <h3 className="mt-1 text-base font-bold text-neutral-900 leading-tight">
            {cityName}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2.5 rounded-full bg-accent text-white text-xs font-bold">
            {projects.length}
          </span>
          {pinned && (
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5 text-neutral-500" strokeWidth={2.25} />
            </button>
          )}
        </div>
      </div>

      {/* Project list — capped + scrollable */}
      <ul className="max-h-[300px] overflow-y-auto divide-y divide-neutral-100">
        {projects.map((project) => {
          const sector = project.sector ?? project.type;
          const chip = SECTOR_CHIP[sector] ?? SECTOR_CHIP.office;
          return (
            <li
              key={project.id}
              className="group relative px-5 py-3 transition-colors hover:bg-neutral-50"
            >
              <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-sm font-semibold text-neutral-900 leading-tight group-hover:text-accent transition-colors">
                  {project.title}
                </h4>
                <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  <Calendar className="h-3 w-3" strokeWidth={1.5} />
                  {project.year}
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px]">
                <span
                  className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold capitalize ${chip.bg} ${chip.text}`}
                >
                  {sector}
                </span>
                {project.area && (
                  <span className="inline-flex items-center gap-1 text-neutral-500">
                    <Maximize2 className="h-2.5 w-2.5" strokeWidth={1.75} />
                    {project.area}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer hint when pinned */}
      {pinned && (
        <div className="px-5 py-2.5 text-[10px] uppercase tracking-wider text-neutral-400 border-t border-neutral-100 bg-neutral-50/50">
          Click outside or press Esc to close
        </div>
      )}
    </motion.div>
  );
}

export function ProjectMap({
  projects,
  mapLocations,
}: {
  projects: Project[];
  mapLocations?: MapLocation[];
}) {
  const { width, height, paths } = nepalPaths as {
    width: number;
    height: number;
    paths: ProvincePath[];
  };

  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [pinnedLocation, setPinnedLocation] = useState<string | null>(null);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const [markerScreen, setMarkerScreen] = useState<{ x: number; y: number } | null>(null);

  const { locations, keywords } = useMemo(() => {
    if (!mapLocations || mapLocations.length === 0) {
      return { locations: FALLBACK_LOCATIONS, keywords: FALLBACK_KEYWORDS };
    }
    const locs: Record<string, LocationConfig> = {};
    const kws: Record<string, string[]> = {};
    for (const l of mapLocations) {
      locs[l.name] = {
        marker: [l.markerX, l.markerY],
        label: [l.labelX, l.labelY],
        direction: l.direction,
      };
      if (l.keywords.length > 0) kws[l.name] = l.keywords;
    }
    return { locations: locs, keywords: kws };
  }, [mapLocations]);

  const projectLocations = useMemo(
    () => getProjectLocations(projects, locations, keywords),
    [projects, locations, keywords],
  );

  const mapOffsetX = (WIDTH - width) / 2 + 25;
  const mapOffsetY = (HEIGHT - height) / 2;

  const activeLocation = pinnedLocation ?? hoveredLocation;
  const activeData = activeLocation
    ? projectLocations.find((l) => l.location === activeLocation)
    : null;

  // Track marker SVG → screen position whenever active changes / on resize
  useLayoutEffect(() => {
    if (!activeLocation || !svgRef.current || !containerRef.current) {
      setMarkerScreen(null);
      setContainerRect(null);
      return;
    }
    const svg = svgRef.current;
    const container = containerRef.current;
    const config = locations[activeLocation];
    if (!config) return;

    function update() {
      if (!svg || !container) return;
      const rect = container.getBoundingClientRect();
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const pt = svg.createSVGPoint();
      pt.x = config.marker[0];
      pt.y = config.marker[1];
      const screen = pt.matrixTransform(ctm);
      setMarkerScreen({ x: screen.x, y: screen.y });
      setContainerRect(rect);
    }

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [activeLocation]);

  // Outside click + Escape close pinned popover
  useEffect(() => {
    if (!pinnedLocation) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setPinnedLocation(null);
    }
    function handleClick(e: MouseEvent) {
      const target = e.target as Element;
      if (target.closest('[data-map-marker]')) return;
      if (target.closest('[data-map-popover]')) return;
      setPinnedLocation(null);
    }
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [pinnedLocation]);

  return (
    <div ref={ref} className="relative w-full">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="relative w-full overflow-hidden rounded-xl border border-neutral-200 bg-[#FAFAF8]"
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="#FAFAF8" />

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

          <defs>
            <style>{`
              @keyframes mapPulse {
                0% { r: 5; opacity: 0.4; }
                100% { r: 16; opacity: 0; }
              }
              .pulse-ring { animation: mapPulse 2.5s ease-out infinite; }
            `}</style>
          </defs>

          {/* Connector lines */}
          {projectLocations.map(({ location, config }) => {
            const [mx, my] = config.marker;
            const [lx, ly] = config.label;
            const isHovered = activeLocation === location;
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
            const isHovered = activeLocation === location;
            const cityName = location.replace(', Nepal', '');
            const count = projects.length;
            const primaryName = projects[0].title;
            const labelText = count > 1 ? `${primaryName} +${count - 1}` : primaryName;

            return (
              <g
                key={`loc-${location}`}
                data-map-marker
                onMouseEnter={() => setHoveredLocation(location)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() =>
                  setPinnedLocation((cur) => (cur === location ? null : location))
                }
                style={{ cursor: 'pointer' }}
              >
                <g
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateY(0)' : 'translateY(8px)',
                    transition: `opacity 0.5s ease ${0.3 + index * 0.08}s, transform 0.5s ease ${0.3 + index * 0.08}s`,
                  }}
                >
                  <circle
                    cx={mx} cy={my} r={5}
                    fill="none" stroke="#D4A84B" strokeWidth={1.5}
                    className="pulse-ring"
                    opacity={isHovered ? 0 : 0.4}
                  />
                  {isHovered && (
                    <circle cx={mx} cy={my} r={16} fill="rgba(212,168,75,0.12)" />
                  )}
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

        {/* Popover */}
        <AnimatePresence>
          {activeData && markerScreen && containerRect && (
            <div
              data-map-popover
              onMouseEnter={() => {
                if (!pinnedLocation) setHoveredLocation(activeLocation);
              }}
              onMouseLeave={() => {
                if (!pinnedLocation) setHoveredLocation(null);
              }}
            >
              <ProjectPopover
                key={activeLocation}
                location={activeData.location}
                projects={activeData.projects}
                markerScreenX={markerScreen.x}
                markerScreenY={markerScreen.y}
                containerRect={containerRect}
                pinned={pinnedLocation === activeLocation}
                onClose={() => setPinnedLocation(null)}
              />
            </div>
          )}
        </AnimatePresence>
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
    </div>
  );
}
