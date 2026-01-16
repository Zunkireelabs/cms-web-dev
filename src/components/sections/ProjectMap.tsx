'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ProjectLocation {
  id: string;
  name: string;
  location: string;
  x: number;
  y: number;
  type: 'commercial' | 'residential';
  sector?: string;
}

// Project locations using percentage-based coordinates (0-100)
const PROJECT_LOCATIONS: ProjectLocation[] = [
  // Kathmandu Valley (Central)
  { id: 'kumari-bank', name: 'Kumari Bank', location: 'Kathmandu', x: 62, y: 48, type: 'commercial', sector: 'Office' },
  { id: 'nrb', name: 'Nepal Rastra Bank (NRB)', location: 'Kathmandu', x: 60, y: 45, type: 'commercial', sector: 'Government' },
  { id: 'ncell', name: 'Ncell Head Office', location: 'Kathmandu', x: 64, y: 46, type: 'commercial', sector: 'Office' },
  { id: 'parliament', name: 'Parliament House', location: 'Kathmandu', x: 61, y: 50, type: 'commercial', sector: 'Government' },
  { id: 'indian-embassy', name: 'Indian Embassy', location: 'Kathmandu', x: 63, y: 49, type: 'commercial', sector: 'Government' },
  { id: 'bir-hospital', name: 'Bir Hospital', location: 'Kathmandu', x: 59, y: 47, type: 'commercial', sector: 'Healthcare' },
  { id: 'cg-villa', name: 'CG Villa', location: 'Kathmandu', x: 65, y: 51, type: 'residential' },

  // Lalitpur
  { id: 'un-office', name: 'UN Head Office', location: 'Lalitpur', x: 61, y: 55, type: 'commercial', sector: 'Office' },
  { id: 'mediciti', name: 'Mediciti Hospital', location: 'Lalitpur', x: 59, y: 58, type: 'commercial', sector: 'Healthcare' },
  { id: 'ullens', name: 'Ullens School', location: 'Lalitpur', x: 63, y: 57, type: 'commercial', sector: 'Education' },

  // Bhaktapur
  { id: 'green-hill', name: 'Green Hill City', location: 'Bhaktapur', x: 68, y: 47, type: 'residential' },

  // Dhulikhel
  { id: 'dusit-thani', name: 'Dusit Thani Himalayan Resort', location: 'Dhulikhel', x: 72, y: 42, type: 'commercial', sector: 'Hospitality' },

  // Pokhara (Gandaki)
  { id: 'fewa-prince', name: 'Fewa Prince Residency', location: 'Pokhara', x: 40, y: 35, type: 'residential' },

  // Gorkha
  { id: 'manakamana', name: 'Manakamana Cable Car', location: 'Gorkha', x: 48, y: 30, type: 'commercial', sector: 'Infrastructure' },

  // Chitwan (Narayani)
  { id: 'bhangeri', name: 'Bhangeri Durbar Resort', location: 'Chitwan', x: 52, y: 72, type: 'commercial', sector: 'Hospitality' },

  // Bhairahawa (Lumbini)
  { id: 'tiger-palace', name: 'Tiger Palace Hotel', location: 'Bhairahawa', x: 38, y: 78, type: 'commercial', sector: 'Hospitality' },

  // Nepalgunj (Bheri)
  { id: 'nepalgunj-airport', name: 'Nepalgunj Airport', location: 'Nepalgunj', x: 18, y: 52, type: 'commercial', sector: 'Airport' },

  // Biratnagar (Koshi/Mechi)
  { id: 'biratnagar-airport', name: 'Biratnagar Airport', location: 'Biratnagar', x: 92, y: 72, type: 'commercial', sector: 'Airport' },
];

export function ProjectMap() {
  const [activeProject, setActiveProject] = useState<ProjectLocation | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="relative w-full">
      {/* Map Container */}
      <div className="relative w-full bg-white rounded-2xl border border-neutral-200 overflow-hidden p-6 md:p-10">
        <div className="relative w-full" style={{ aspectRatio: '2.5/1' }}>
          {/* Nepal Map SVG - Clean outline */}
          <svg
            viewBox="0 0 1000 400"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="mapFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <filter id="mapShadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15"/>
              </filter>
            </defs>

            {/* Nepal outline - single clean path */}
            <path
              d={`
                M 50,200
                C 55,185 60,170 70,155
                L 85,135
                C 100,115 120,95 145,78
                L 175,60
                C 210,45 250,32 295,25
                L 350,20
                C 400,18 455,20 510,28
                L 570,40
                C 625,55 680,75 735,95
                L 790,118
                C 840,138 885,162 920,190
                L 945,215
                C 960,238 968,265 965,295
                L 958,330
                C 948,358 930,378 905,390
                L 870,398
                C 830,402 785,400 740,392
                L 685,380
                C 625,365 565,348 505,335
                L 435,322
                C 370,312 305,310 245,318
                L 185,332
                C 140,345 100,362 70,378
                L 55,385
                C 48,378 45,365 48,345
                L 55,310
                C 62,270 65,235 58,205
                L 50,200
                Z
              `}
              fill="url(#mapFill)"
              stroke="#64748b"
              strokeWidth="2"
              filter="url(#mapShadow)"
            />

            {/* Project markers */}
            {PROJECT_LOCATIONS.map((project) => {
              const cx = (project.x / 100) * 1000;
              const cy = (project.y / 100) * 400;
              const isHovered = hoveredProject === project.id;
              const isActive = activeProject?.id === project.id;

              return (
                <g
                  key={project.id}
                  className="cursor-pointer"
                  onClick={() => setActiveProject(project)}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Pulse animation on hover */}
                  {isHovered && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r="20"
                      fill="none"
                      stroke={project.type === 'commercial' ? '#1e3a5f' : '#059669'}
                      strokeWidth="2"
                    >
                      <animate attributeName="r" from="12" to="28" dur="1s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.8" to="0" dur="1s" repeatCount="indefinite" />
                    </circle>
                  )}

                  {/* Marker dot */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered || isActive ? 10 : 8}
                    fill={project.type === 'commercial' ? '#1e3a5f' : '#059669'}
                    stroke="white"
                    strokeWidth="3"
                    className="transition-all duration-200"
                  />

                  {/* Inner dot */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r="3"
                    fill="white"
                  />
                </g>
              );
            })}
          </svg>

          {/* Hover tooltips */}
          {PROJECT_LOCATIONS.map((project) => (
            <div
              key={`tooltip-${project.id}`}
              className={`absolute transform -translate-x-1/2 -translate-y-full pointer-events-none transition-all duration-200 z-20 ${
                hoveredProject === project.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{
                left: `${project.x}%`,
                top: `${project.y - 5}%`,
              }}
            >
              <div className="bg-neutral-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                <div className="font-semibold">{project.name}</div>
                <div className="text-neutral-400 text-[10px]">{project.location}, Nepal</div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-neutral-900 rotate-45"></div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#1e3a5f] border-2 border-white shadow"></div>
            <span className="text-sm text-neutral-600">Commercial Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow"></div>
            <span className="text-sm text-neutral-600">Residential Projects</span>
          </div>
          <div className="text-sm text-neutral-500 font-medium">
            {PROJECT_LOCATIONS.length} Projects Across Nepal
          </div>
        </div>
      </div>

      {/* Project info panel */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-24 left-4 right-4 md:left-auto md:right-8 md:bottom-28 md:w-80 bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden z-30"
          >
            <div className={`h-2 ${activeProject.type === 'commercial' ? 'bg-[#1e3a5f]' : 'bg-emerald-600'}`}></div>
            <div className="p-4">
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="pr-8">
                <h4 className="font-bold text-neutral-900 text-lg leading-tight">{activeProject.name}</h4>
                <p className="text-sm text-neutral-500 mt-1">{activeProject.location}, Nepal</p>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {activeProject.sector && (
                    <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${
                      activeProject.type === 'commercial' ? 'bg-slate-100 text-slate-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {activeProject.sector}
                    </span>
                  )}
                  <span className="inline-block text-xs px-2.5 py-1 rounded-full font-medium bg-neutral-100 text-neutral-600">
                    {activeProject.type === 'commercial' ? 'Commercial' : 'Residential'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
