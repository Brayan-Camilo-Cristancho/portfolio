import type { ReactNode } from 'react';
import { useSvgId } from '@/hooks/useSvgId';

type Stop = readonly [offset: string, color: string];

interface SphereProps {
  cx: number;
  cy: number;
  r: number;
  stops: readonly Stop[];
  glow: string;
  atmosphere?: number;
  light?: { cx: string; cy: string };
  behind?: ReactNode;
  children?: ReactNode;
}

/**
 * Shared planet body. Draw order: atmosphere, `behind` layer, body, clipped surface
 * details, night-side shade. Anything that passes in front goes after this component.
 */
export function Sphere({
  cx,
  cy,
  r,
  stops,
  glow,
  atmosphere = 1.18,
  light = { cx: '35%', cy: '30%' },
  behind,
  children,
}: SphereProps) {
  const id = useSvgId('sphere');
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-body`} cx={light.cx} cy={light.cy} r="75%">
          {stops.map(([offset, color]) => (
            <stop key={offset} offset={offset} stopColor={color} />
          ))}
        </radialGradient>
        <radialGradient id={`${id}-shade`} cx={light.cx} cy={light.cy} r="85%">
          <stop offset="52%" stopColor="#02030a" stopOpacity="0" />
          <stop offset="100%" stopColor="#02030a" stopOpacity="0.85" />
        </radialGradient>
        <radialGradient id={`${id}-atmo`}>
          <stop offset={`${(1 / atmosphere) * 100 - 2}%`} stopColor={glow} stopOpacity="0.35" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-clip`}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>
      <circle cx={cx} cy={cy} r={r * atmosphere} fill={`url(#${id}-atmo)`} />
      {behind}
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-body)`} />
      {children && <g clipPath={`url(#${id}-clip)`}>{children}</g>}
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-shade)`} />
    </g>
  );
}

const RING_PALETTES = {
  violet: {
    stops: [
      ['0%', '#c4b5fd'],
      ['45%', '#7c3aed'],
      ['100%', '#1e1147'],
    ] as const,
    glow: '#a78bfa',
    ring: ['#38bdf8', '#bae6fd', '#c4b5fd', '#a78bfa'],
    bands: ['#ddd6fe', '#38bdf8', '#4c1d95', '#ddd6fe'],
  },
  teal: {
    stops: [
      ['0%', '#ccfbf1'],
      ['45%', '#14b8a6'],
      ['100%', '#042f2e'],
    ] as const,
    glow: '#2dd4bf',
    ring: ['#a78bfa', '#ccfbf1', '#99f6e4', '#38bdf8'],
    bands: ['#f0fdfa', '#0f766e', '#5eead4', '#134e4a'],
  },
};

/**
 * The ring is one ellipse clipped twice: the back half is drawn before the planet and
 * the front half after it, so it appears to wrap around the body.
 */
export function RingedPlanet({
  className,
  palette = 'violet',
  tilt = -16,
}: {
  className?: string;
  palette?: keyof typeof RING_PALETTES;
  tilt?: number;
}) {
  const id = useSvgId('ringed');
  const p = RING_PALETTES[palette];
  const R = 88;

  const ring = (half: 'back' | 'front') => (
    <g transform={`translate(200 200) rotate(${tilt})`}>
      <g clipPath={`url(#${id}-${half})`}>
        <ellipse rx={172} ry={38} fill="none" stroke={`url(#${id}-ring)`} strokeWidth="10" />
        <ellipse
          rx={156}
          ry={33}
          fill="none"
          stroke={`url(#${id}-ring)`}
          strokeWidth="4"
          opacity="0.6"
        />
      </g>
    </g>
  );

  return (
    <svg viewBox="0 0 400 400" className={className}>
      <defs>
        <linearGradient id={`${id}-ring`} x1="0" x2="1">
          <stop offset="0%" stopColor={p.ring[0]} stopOpacity="0.15" />
          <stop offset="35%" stopColor={p.ring[1]} stopOpacity="0.75" />
          <stop offset="65%" stopColor={p.ring[2]} stopOpacity="0.75" />
          <stop offset="100%" stopColor={p.ring[3]} stopOpacity="0.15" />
        </linearGradient>
        <clipPath id={`${id}-back`}>
          <rect x="-250" y="-250" width="500" height="250" />
        </clipPath>
        <clipPath id={`${id}-front`}>
          <rect x="-250" y="0" width="500" height="250" />
        </clipPath>
      </defs>
      <Sphere cx={200} cy={200} r={R} stops={p.stops} glow={p.glow} behind={ring('back')}>
        <g transform={`rotate(${tilt} 200 200)`} opacity="0.35">
          <rect x="90" y="150" width="220" height="14" fill={p.bands[0]} />
          <rect x="90" y="178" width="220" height="8" fill={p.bands[1]} />
          <rect x="90" y="206" width="220" height="20" fill={p.bands[2]} />
          <rect x="90" y="238" width="220" height="6" fill={p.bands[3]} />
        </g>
      </Sphere>
      {ring('front')}
    </svg>
  );
}

export function Moon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <Sphere
        cx={50}
        cy={50}
        r={36}
        atmosphere={1.33}
        stops={[
          ['0%', '#e0f2fe'],
          ['50%', '#38bdf8'],
          ['100%', '#0c2a45'],
        ]}
        glow="#38bdf8"
      >
        <g fill="#0c2a45" opacity="0.35">
          <circle cx="38" cy="40" r="6" />
          <circle cx="60" cy="58" r="8" />
          <circle cx="56" cy="34" r="3.5" />
          <circle cx="40" cy="64" r="4" />
        </g>
      </Sphere>
    </svg>
  );
}

export function RockyPlanet({ className }: { className?: string }) {
  const craters = [
    [80, 78, 12],
    [118, 102, 18],
    [86, 124, 8],
    [124, 70, 6],
    [104, 140, 10],
  ] as const;
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <Sphere
        cx={100}
        cy={100}
        r={56}
        stops={[
          ['0%', '#f1f5f9'],
          ['40%', '#94a3b8'],
          ['80%', '#334155'],
          ['100%', '#0f172a'],
        ]}
        glow="#a5b4fc"
      >
        {craters.map(([x, y, r]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x - r * 0.12} cy={y - r * 0.12} r={r} fill="#e2e8f0" opacity="0.25" />
            <circle cx={x} cy={y} r={r} fill="#1e293b" opacity="0.45" />
          </g>
        ))}
      </Sphere>
    </svg>
  );
}

export function IcePlanet({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <Sphere
        cx={100}
        cy={100}
        r={60}
        stops={[
          ['0%', '#f0f9ff'],
          ['45%', '#7dd3fc'],
          ['85%', '#0e7490'],
          ['100%', '#04202b'],
        ]}
        glow="#67e8f9"
      >
        <ellipse cx="100" cy="44" rx="46" ry="14" fill="#f8fafc" opacity="0.75" />
        <ellipse cx="100" cy="158" rx="38" ry="10" fill="#f8fafc" opacity="0.45" />
        {[78, 100, 122].map((y) => (
          <ellipse
            key={y}
            cx="100"
            cy={y}
            rx="62"
            ry="6"
            fill="none"
            stroke="#f0f9ff"
            strokeOpacity="0.18"
          />
        ))}
      </Sphere>
    </svg>
  );
}

export function BandedGiant({ className }: { className?: string }) {
  const bands = [
    [62, 10, '#fef3c7', 0.45],
    [82, 7, '#92400e', 0.4],
    [100, 12, '#fde68a', 0.35],
    [122, 8, '#78350f', 0.45],
    [140, 9, '#fef3c7', 0.3],
  ] as const;
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <Sphere
        cx={100}
        cy={100}
        r={70}
        stops={[
          ['0%', '#fef3c7'],
          ['40%', '#f59e0b'],
          ['80%', '#78350f'],
          ['100%', '#1c0a02'],
        ]}
        glow="#fbbf24"
      >
        <g transform="rotate(-8 100 100)">
          {bands.map(([y, h, color, opacity]) => (
            <ellipse key={y} cx="100" cy={y} rx="90" ry={h} fill={color} opacity={opacity} />
          ))}

          <ellipse cx="122" cy="118" rx="16" ry="8" fill="#c2410c" opacity="0.75" />
          <ellipse
            cx="122"
            cy="118"
            rx="16"
            ry="8"
            fill="none"
            stroke="#fed7aa"
            strokeOpacity="0.5"
          />
        </g>
      </Sphere>
    </svg>
  );
}

/** A huge planet seen from orbit: only the lit upper rim is visible. */
export function HorizonPlanet({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className}>
      <Sphere
        cx={200}
        cy={200}
        r={190}
        atmosphere={1.05}
        light={{ cx: '50%', cy: '0%' }}
        stops={[
          ['0%', '#c7d2fe'],
          ['18%', '#6366f1'],
          ['45%', '#1e1b4b'],
          ['100%', '#02030a'],
        ]}
        glow="#818cf8"
      >
        <g opacity="0.15" fill="#e0e7ff">
          <ellipse cx="150" cy="28" rx="70" ry="5" />
          <ellipse cx="260" cy="40" rx="55" ry="4" />
        </g>
      </Sphere>
    </svg>
  );
}

const ORBIT = 'M20,100 A80,22 0 1,1 180,100 A80,22 0 1,1 20,100';

/**
 * The moon is drawn on top of the planet but masked out over the upper half of the disc,
 * so it disappears behind it. SMIL ignores prefers-reduced-motion, hence `animate`.
 */
export function CoralPlanet({ className, animate }: { className?: string; animate: boolean }) {
  const id = useSvgId('coral');
  const R = 46;
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <defs>
        <radialGradient id={`${id}-moon`} cx="35%" cy="30%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#64748b" />
        </radialGradient>
        <mask
          id={`${id}-occlusion`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="200"
          height="200"
        >
          <rect width="200" height="200" fill="white" />
          <path d={`M${100 - R},100 A${R},${R} 0 0,1 ${100 + R},100 Z`} fill="black" />
        </mask>
      </defs>
      <Sphere
        cx={100}
        cy={100}
        r={R}
        atmosphere={1.2}
        stops={[
          ['0%', '#ffe4e6'],
          ['40%', '#fb7185'],
          ['80%', '#881337'],
          ['100%', '#2a0412'],
        ]}
        glow="#fb7185"
        behind={
          <path d={ORBIT} fill="none" stroke="#fda4af" strokeOpacity="0.25" strokeDasharray="2 4" />
        }
      >
        <g transform="rotate(-12 100 100)">
          <ellipse cx="88" cy="82" rx="40" ry="5" fill="#fff1f2" opacity="0.3" />
          <ellipse cx="118" cy="96" rx="30" ry="3.5" fill="#fff1f2" opacity="0.22" />
          <rect x="40" y="108" width="120" height="7" fill="#fbbf24" opacity="0.2" />
          <ellipse cx="96" cy="126" rx="34" ry="4" fill="#fff1f2" opacity="0.18" />
        </g>
      </Sphere>
      <path
        d="M20,100 A80,22 0 0,0 180,100"
        fill="none"
        stroke="#fda4af"
        strokeOpacity="0.35"
        strokeDasharray="2 4"
      />
      <g mask={`url(#${id}-occlusion)`}>
        <circle r="6" fill={`url(#${id}-moon)`} cx={animate ? 0 : 168} cy={animate ? 0 : 112}>
          {animate && <animateMotion dur="16s" repeatCount="indefinite" path={ORBIT} />}
        </circle>
      </g>
    </svg>
  );
}
