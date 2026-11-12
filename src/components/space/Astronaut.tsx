import { useSvgId } from '@/hooks/useSvgId';

/**
 * Flat, geometric astronaut in the site's palette: realistic proportions, one light
 * source (top left), suit segmentation instead of outlines, and accent colour only on
 * the visor, the chest unit and the mission patch. The right hand is raised toward the
 * viewer, drawn slightly larger than the rest because it is closer.
 */
export function Astronaut({ className }: { className?: string }) {
  const id = useSvgId('astro');
  const lit = '#dfe6f0';
  const mid = '#b8c4d8';
  const dark = '#7a89ab';
  const seam = '#5f6d8c';

  return (
    <svg viewBox="0 0 120 140" className={className} overflow="visible">
      <defs>
        <radialGradient id={`${id}-helmet`} cx="32%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#f4f7fb" />
          <stop offset="60%" stopColor="#c9d3e3" />
          <stop offset="100%" stopColor="#8b9ab3" />
        </radialGradient>
        <linearGradient id={`${id}-torso`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#eef2f8" />
          <stop offset="65%" stopColor="#c9d3e3" />
          <stop offset="100%" stopColor="#9aa8c2" />
        </linearGradient>
        <linearGradient id={`${id}-visor`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c4a6e" />
          <stop offset="55%" stopColor="#1e1147" />
          <stop offset="100%" stopColor="#02030a" />
        </linearGradient>
        <linearGradient id={`${id}-accent`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id={`${id}-glove`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d4dce8" />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
      </defs>

      {/* Tether */}
      <path
        d="M38 72 C 20 80, 6 58, -30 68 S -80 62, -120 72"
        fill="none"
        stroke={dark}
        strokeWidth="1.2"
        strokeDasharray="2 4"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Life-support pack */}
      <rect x="38" y="44" width="46" height="48" rx="7" fill={seam} />
      <rect x="38" y="44" width="46" height="5" rx="2.5" fill={dark} />

      {/* Legs and boots */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="13">
        <path d="M55 96 L 51 110 L 52.5 119" stroke={lit} />
        <path d="M67 96 L 72 110 L 70.5 119" stroke={mid} />
      </g>
      <g stroke={dark} strokeWidth="1.2" strokeLinecap="round" opacity="0.7">
        <path d="M46.2 105.4 L 57.8 108.6" />
        <path d="M65.4 109 L 76.6 105" />
      </g>
      <rect x="45" y="118" width="15" height="9" rx="3" fill={dark} />
      <rect x="63" y="118" width="15" height="9" rx="3" fill={seam} />
      <rect x="45" y="125" width="15" height="2.5" rx="1.2" fill={seam} />
      <rect x="63" y="125" width="15" height="2.5" rx="1.2" fill="#46526e" />

      {/* Torso */}
      <rect x="45" y="56" width="32" height="36" rx="8" fill={`url(#${id}-torso)`} />
      <rect x="46" y="88" width="30" height="7" rx="3" fill={mid} />
      <path
        d="M50 75 C 45 81, 46 88, 52 89"
        fill="none"
        stroke={dark}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="48"
        y="64"
        width="18"
        height="11"
        rx="2"
        fill="#1c2540"
        stroke="#2a3658"
        strokeWidth="0.8"
      />
      <rect x="51" y="67" width="5" height="1.8" rx="0.9" fill="#38bdf8" />
      <rect x="51" y="70.5" width="9" height="1.6" rx="0.8" fill={dark} />
      <circle cx="62.5" cy="68" r="1.2" fill="#3fb950" />
      <circle cx="69" cy="83" r="2.6" fill={`url(#${id}-accent)`} />

      {/* Left arm, relaxed */}
      <path
        d="M47 62 L 38 79 L 39 92"
        fill="none"
        stroke={lit}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.8 73.7 L 44.2 78.3"
        stroke={dark}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="39" cy="93" r="5" fill={dark} />

      {/* Helmet */}
      <rect x="45" y="52" width="32" height="7" rx="3.5" fill={mid} />
      <circle cx="61" cy="38" r="17" fill={`url(#${id}-helmet)`} />
      <rect x="55" y="20.5" width="12" height="3" rx="1.5" fill={dark} />
      <rect x="44" y="33" width="4" height="8" rx="1.5" fill={dark} />
      <rect
        x="47"
        y="28"
        width="28"
        height="19"
        rx="9.5"
        fill="none"
        stroke={dark}
        strokeWidth="1.5"
      />
      <rect x="48" y="29" width="26" height="17" rx="8.5" fill={`url(#${id}-visor)`} />
      <path
        d="M52 34.5 Q 55.5 31 61 31"
        fill="none"
        stroke={`url(#${id}-accent)`}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <rect x="64.5" y="41" width="5" height="1.5" rx="0.8" fill="#e0f2fe" opacity="0.5" />

      {/* Right arm, hand raised toward the viewer */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M75 62 L 87 79" stroke={mid} strokeWidth="11" />
        <path d="M87 79 L 85 68" stroke={lit} strokeWidth="12.5" />
      </g>
      <path
        d="M81.5 72.5 L 91 71"
        stroke={dark}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <rect x="78.5" y="62.5" width="13" height="5" rx="2.5" fill={mid} />
      <g fill={`url(#${id}-glove)`}>
        <rect x="77.6" y="47" width="3.6" height="10" rx="1.8" />
        <rect x="81.4" y="46" width="3.6" height="11" rx="1.8" />
        <rect x="85.2" y="46.5" width="3.6" height="10.5" rx="1.8" />
        <rect x="89" y="48.5" width="3.4" height="9" rx="1.7" />
        <rect x="73" y="53" width="4" height="9" rx="2" transform="rotate(-30 75 57.5)" />
        <rect x="77.5" y="52" width="15" height="12" rx="5" />
      </g>
      <path
        d="M80 58 Q 85 60.5 90 58"
        fill="none"
        stroke={seam}
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}
