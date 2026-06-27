'use client';

import { useMemo, useRef, useState } from 'react';
import nepalPaths from '@/data/nepal-paths.json';

const WIDTH = 1150;
const HEIGHT = 580;

interface ProvincePath {
  id: number;
  name: string;
  d: string;
}

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

export default function MapPickerPage() {
  const { width, height, paths } = nepalPaths as {
    width: number;
    height: number;
    paths: ProvincePath[];
  };

  const svgRef = useRef<SVGSVGElement>(null);

  const [marker, setMarker] = useState<{ x: number; y: number } | null>(null);
  const [labelOffsetX, setLabelOffsetX] = useState(90);
  const [labelOffsetY, setLabelOffsetY] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const mapOffsetX = (WIDTH - width) / 2 + 25;
  const mapOffsetY = (HEIGHT - height) / 2;

  const labelX = marker ? marker.x + labelOffsetX : 0;
  const labelY = marker ? marker.y + labelOffsetY : 0;

  function handleSvgClick(e: React.MouseEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const svgPoint = pt.matrixTransform(ctm.inverse());
    setMarker({ x: Math.round(svgPoint.x), y: Math.round(svgPoint.y) });
  }

  function placeFromLatLng() {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    if (Number.isNaN(latNum) || Number.isNaN(lngNum)) return;
    const mx = Math.round(650 + (lngNum - 85.32) * 70);
    const my = Math.round(375 + (27.72 - latNum) * 70);
    setMarker({ x: mx, y: my });
  }

  async function copy(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 1200);
    } catch {
      // ignore — older browsers without clipboard API
    }
  }

  const allCopyText = marker
    ? `markerX: ${marker.x}\nmarkerY: ${marker.y}\nlabelX: ${labelX}\nlabelY: ${labelY}\ndirection: ${direction}`
    : '';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Map Pin Coordinate Picker</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Click anywhere on the map to place a pin, then copy the coordinates into a new MapLocation at{' '}
          <a
            href="https://admin-cms.zunkireelabs.com/admin/collections/map-locations/create"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline"
          >
            admin-cms.zunkireelabs.com
          </a>
          .
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Map */}
        <div className="rounded-xl border border-neutral-200 bg-[#FAFAF8] overflow-hidden">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="w-full h-auto cursor-crosshair"
            preserveAspectRatio="xMidYMid meet"
            onClick={handleSvgClick}
          >
            <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="#FAFAF8" />

            <g transform={`translate(${mapOffsetX}, ${mapOffsetY})`}>
              {paths.map((province) => (
                <path
                  key={`province-${province.id}`}
                  d={province.d}
                  fill="rgba(212, 168, 75, 0.12)"
                  stroke="rgba(212, 168, 75, 0.5)"
                  strokeWidth={1}
                />
              ))}
            </g>

            {marker && (
              <g>
                <path
                  d={getElbowPath(marker.x, marker.y, labelX, labelY, direction)}
                  stroke="#D4A84B"
                  strokeWidth={1.5}
                  fill="none"
                />
                <circle cx={marker.x} cy={marker.y} r={7} fill="#D4A84B" />
                <circle cx={marker.x} cy={marker.y} r={3} fill="#fff" />
                <rect
                  x={labelX - 4}
                  y={labelY - 14}
                  width={120}
                  height={22}
                  fill="white"
                  stroke="#D4A84B"
                  strokeWidth={1}
                  rx={3}
                />
                <text
                  x={labelX + 4}
                  y={labelY}
                  fontSize="12"
                  fill="#333"
                  fontFamily="sans-serif"
                >
                  ({marker.x}, {marker.y})
                </text>
              </g>
            )}
          </svg>
          {!marker && (
            <div className="px-4 py-3 text-xs uppercase tracking-wider text-neutral-500 border-t border-neutral-200">
              Click anywhere on the map to start
            </div>
          )}
        </div>

        {/* Right panel */}
        <aside className="space-y-4 rounded-xl border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-700">
            Coordinates
          </h2>

          <CoordRow label="markerX" value={marker?.x ?? '—'} copyValue={marker ? String(marker.x) : ''} onCopy={copy} copied={copiedField === 'markerX'} />
          <CoordRow label="markerY" value={marker?.y ?? '—'} copyValue={marker ? String(marker.y) : ''} onCopy={copy} copied={copiedField === 'markerY'} />

          <div className="border-t border-neutral-100 pt-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Label offset
            </div>
            <NumberRow label="labelOffsetX" value={labelOffsetX} onChange={setLabelOffsetX} />
            <NumberRow label="labelOffsetY" value={labelOffsetY} onChange={setLabelOffsetY} />
            <div className="flex items-center justify-between text-sm">
              <label className="text-neutral-700">direction</label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value as 'up' | 'down')}
                className="rounded border border-neutral-300 px-2 py-1 text-sm"
              >
                <option value="up">up</option>
                <option value="down">down</option>
              </select>
            </div>
          </div>

          <div className="border-t border-neutral-100 pt-4 space-y-3">
            <CoordRow label="labelX" value={marker ? labelX : '—'} copyValue={marker ? String(labelX) : ''} onCopy={copy} copied={copiedField === 'labelX'} />
            <CoordRow label="labelY" value={marker ? labelY : '—'} copyValue={marker ? String(labelY) : ''} onCopy={copy} copied={copiedField === 'labelY'} />
          </div>

          <button
            type="button"
            disabled={!marker}
            onClick={() => copy('all', allCopyText)}
            className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copiedField === 'all' ? 'Copied!' : 'Copy all values'}
          </button>

          {marker && (
            <button
              type="button"
              onClick={() => setMarker(null)}
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition hover:bg-neutral-50"
            >
              Clear pin
            </button>
          )}
        </aside>
      </div>

      {/* Lat/lng helper */}
      <section className="mt-8 rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-700">
          Pre-position from Google Maps lat/lng (optional)
        </h2>
        <p className="mt-1 text-xs text-neutral-500">
          Right-click any place in Google Maps → click the lat,lng at the top → paste here.
          The pin will appear at the approximate location. Then click the map to fine-tune.
        </p>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <label className="text-sm">
            <span className="block text-xs uppercase tracking-wider text-neutral-500">latitude</span>
            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="27.7172"
              className="mt-1 w-32 rounded border border-neutral-300 px-2 py-1 text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="block text-xs uppercase tracking-wider text-neutral-500">longitude</span>
            <input
              type="text"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              placeholder="85.3240"
              className="mt-1 w-32 rounded border border-neutral-300 px-2 py-1 text-sm"
            />
          </label>
          <button
            type="button"
            onClick={placeFromLatLng}
            className="rounded-lg bg-neutral-charcoal px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Place pin from lat/lng
          </button>
        </div>
      </section>
    </div>
  );
}

function CoordRow({
  label,
  value,
  copyValue,
  onCopy,
  copied,
}: {
  label: string;
  value: string | number;
  copyValue: string;
  onCopy: (label: string, value: string) => void;
  copied: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-700">{label}</span>
      <div className="flex items-center gap-2">
        <span className="tabular-nums font-mono text-neutral-900">{value}</span>
        <button
          type="button"
          disabled={!copyValue}
          onClick={() => onCopy(label, copyValue)}
          className="rounded border border-neutral-300 px-2 py-0.5 text-xs hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copied ? '✓' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

function NumberRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <label className="text-neutral-700">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-24 rounded border border-neutral-300 px-2 py-1 text-sm tabular-nums"
      />
    </div>
  );
}
