import { useSvgId } from '@/hooks/useSvgId';

export function Astronaut({ className }: { className?: string }) {
  const id = useSvgId('astro');
  const limb = '#d7dfeb';
  const shadow = '#8b9ab3';

  return (
    <svg viewBox="0 0 120 140" className={className} overflow="visible">
      <defs>
        <radialGradient id={`${id}-suit`} cx="35%" cy="25%" r="85%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#d7dfeb" />
          <stop offset="100%" stopColor="#7d8bab" />
        </radialGradient>
        <linearGradient id={`${id}-visor`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c4a6e" />
          <stop offset="55%" stopColor="#1e1147" />
          <stop offset="100%" stopColor="#02030a" />
        </linearGradient>
        <linearGradient id={`${id}-reflection`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={`${id}-patch`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>

      <path
        d="M36 76 C 14 84, 4 60, -30 70 S -80 64, -120 74"
        fill="none"
        stroke="#94a3c0"
        strokeWidth="1.6"
        strokeDasharray="3 3"
        strokeLinecap="round"
        opacity="0.7"
      />

      <rect x="32" y="56" width="18" height="40" rx="6" fill={shadow} />
      <rect x="35" y="62" width="4" height="10" rx="2" fill="#5f6d8c" />

      <g strokeLinecap="round" fill="none">
        <path d="M56 100 L 50 122" stroke={limb} strokeWidth="13" />
        <path d="M72 100 L 82 120" stroke={limb} strokeWidth="13" />
      </g>
      <ellipse cx="49" cy="126" rx="8" ry="5" fill={shadow} />
      <ellipse cx="84" cy="124" rx="8" ry="5" fill={shadow} transform="rotate(-20 84 124)" />

      <path d="M48 70 L 34 90" stroke={limb} strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="33" cy="92" r="6" fill={shadow} />

      <rect x="44" y="60" width="40" height="46" rx="15" fill={`url(#${id}-suit)`} />

      <rect x="55" y="74" width="20" height="13" rx="3" fill="#1e293b" />
      <circle cx="59.5" cy="80.5" r="1.8" fill="#3fb950" />
      <circle cx="65" cy="80.5" r="1.8" fill="#38bdf8" />
      <circle cx="70.5" cy="80.5" r="1.8" fill="#f85149" />

      <circle cx="78" cy="68" r="3.5" fill={`url(#${id}-patch)`} />

      <path d="M80 70 L 96 52" stroke={limb} strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="98" cy="49" r="6.5" fill={shadow} />

      <circle cx="63" cy="40" r="25" fill={`url(#${id}-suit)`} />
      <circle cx="40" cy="42" r="4.5" fill="#c3cddd" />

      <ellipse cx="67" cy="41" rx="17" ry="14" fill={`url(#${id}-visor)`} />
      <path
        d="M56 34 Q 64 27 75 30"
        fill="none"
        stroke={`url(#${id}-reflection)`}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="77" cy="47" r="1.6" fill="#e0f2fe" opacity="0.8" />

      <path d="M52 17 L 48 8" stroke="#94a3c0" strokeWidth="2" strokeLinecap="round" />
      <circle cx="47.5" cy="7" r="2.2" fill="#38bdf8" />
    </svg>
  );
}
