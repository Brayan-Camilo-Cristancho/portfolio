import { useSvgId } from '@/hooks/useSvgId';

/**
 * Flat, geometric astronaut in the site's palette: realistic proportions, one light
 * source (top left), suit segmentation instead of outlines, and accent colour only on
 * the visor, the chest unit and the mission patch. The right hand is raised toward the
 * viewer, drawn slightly larger than the rest because it is closer.
 *
 * Shading uses masks: a shape minus a copy of itself shifted toward the light leaves a
 * crescent on the side away from it.
 */
export function Astronaut({ className }: { className?: string }) {
  const id = useSvgId('astro');
  const lit = '#dfe6f0';
  const mid = '#b8c4d8';
  const dark = '#7a89ab';
  const seam = '#5f6d8c';
  const deep = '#46526e';
  const shade = '#3b4766';

  return (
    <svg viewBox="0 0 120 140" className={className} overflow="visible">
      <defs>
        <radialGradient id={`${id}-helmet`} cx="32%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#f8fafd" />
          <stop offset="60%" stopColor="#ccd5e4" />
          <stop offset="100%" stopColor="#8b9ab3" />
        </radialGradient>
        <linearGradient id={`${id}-torso`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#eef2f8" />
          <stop offset="65%" stopColor="#c9d3e3" />
          <stop offset="100%" stopColor="#9aa8c2" />
        </linearGradient>
        <linearGradient id={`${id}-pack`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={dark} />
          <stop offset="100%" stopColor={deep} />
        </linearGradient>
        <linearGradient id={`${id}-visor`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c4a6e" />
          <stop offset="50%" stopColor="#1e1147" />
          <stop offset="100%" stopColor="#02030a" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor={seam} />
        </linearGradient>
        <linearGradient id={`${id}-accent`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id={`${id}-glove`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d4dce8" />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>

        <clipPath id={`${id}-visor-clip`}>
          <rect x="48" y="29" width="26" height="17" rx="8.5" />
        </clipPath>
        <mask id={`${id}-helmet-shade`}>
          <circle cx="61" cy="38" r="17" fill="#fff" />
          <circle cx="57" cy="34" r="17.5" fill="#000" />
        </mask>
        <mask id={`${id}-torso-shade`}>
          <rect x="45" y="56" width="32" height="36" rx="8" fill="#fff" />
          <rect x="41" y="53" width="32" height="36" rx="8" fill="#000" />
        </mask>
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
      <rect x="35.5" y="69.5" width="4" height="5" rx="1" fill={seam} />

      {/* Life-support pack: body, top cap, vents and a short antenna */}
      <path d="M80 46 L 83 36" stroke={dark} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="83.2" cy="35.4" r="1.3" fill="#38bdf8" />
      <rect x="38" y="44" width="46" height="48" rx="7" fill={`url(#${id}-pack)`} />
      <rect x="38" y="44" width="46" height="5" rx="2.5" fill={dark} />
      <g stroke={shade} strokeWidth="1.4" strokeLinecap="round">
        <path d="M79.5 58 L 79.5 66" />
        <path d="M82 58 L 82 66" />
      </g>

      {/* Legs: fill, shaded edge, knee joints, thigh pocket */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M55 96 L 51 110 L 52.5 119" stroke={lit} strokeWidth="13" />
        <path d="M67 96 L 72 110 L 70.5 119" stroke={mid} strokeWidth="13" />
        <path d="M60 97 L 56.5 110 L 57.5 118" stroke={dark} strokeWidth="2.6" opacity="0.45" />
        <path d="M73 97 L 77.5 110 L 76 118" stroke={shade} strokeWidth="2.6" opacity="0.35" />
      </g>
      <g stroke={dark} strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
        <path d="M46.2 105.4 L 57.8 108.6" />
        <path d="M46 108.2 L 57.4 111.4" />
        <path d="M65.4 109 L 76.6 105" />
        <path d="M66.2 111.8 L 77.2 107.8" />
      </g>
      <rect x="66.5" y="99" width="6" height="5" rx="1" fill={dark} opacity="0.55" />

      {/* Boots: shaft, toe pointing outward, toe cap, strap, ankle ring and treaded sole.
          The right boot mirrors the left one (x' = 123.2 - x). */}
      <path
        d="M46.4 116 L 59 116 L 59.6 126.2 L 43 126.2 C 40.6 126.2 40 123.4 42 122.2 L 46.2 120.4 Z"
        fill={dark}
        stroke={seam}
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <path
        d="M42 122.2 L 46.2 120.4 L 47.6 126.2 L 43 126.2 C 40.6 126.2 40 123.4 42 122.2 Z"
        fill={mid}
        opacity="0.55"
      />
      <path
        d="M76.8 116 L 64.2 116 L 63.6 126.2 L 80.2 126.2 C 82.6 126.2 83.2 123.4 81.2 122.2 L 77 120.4 Z"
        fill={seam}
        stroke={deep}
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <path
        d="M81.2 122.2 L 77 120.4 L 75.6 126.2 L 80.2 126.2 C 82.6 126.2 83.2 123.4 81.2 122.2 Z"
        fill={dark}
        opacity="0.55"
      />
      <g stroke={deep} strokeWidth="0.8" strokeLinecap="round" opacity="0.8">
        <path d="M48 120.2 L 58.6 120.2" />
        <path d="M64.6 120.2 L 75.2 120.2" />
      </g>
      <path
        d="M42.4 126 L 59.8 126 L 59.8 127.6 C 59.8 128.4 59.2 129 58.4 129 L 43.2 129 C 41.6 129 41 127.4 42.4 126 Z"
        fill={seam}
      />
      <path
        d="M80.8 126 L 63.4 126 L 63.4 127.6 C 63.4 128.4 64 129 64.8 129 L 80 129 C 81.6 129 82.2 127.4 80.8 126 Z"
        fill={deep}
      />
      <g stroke={shade} strokeWidth="0.8" opacity="0.9">
        <path d="M46 127.3 L 46 128.8" />
        <path d="M50 127.3 L 50 128.8" />
        <path d="M54 127.3 L 54 128.8" />
        <path d="M58 127.3 L 58 128.8" />
        <path d="M65.2 127.3 L 65.2 128.8" />
        <path d="M69.2 127.3 L 69.2 128.8" />
        <path d="M73.2 127.3 L 73.2 128.8" />
        <path d="M77.2 127.3 L 77.2 128.8" />
      </g>
      <rect x="45.8" y="114.8" width="13.8" height="3.4" rx="1.7" fill={mid} />
      <rect x="45.8" y="114.8" width="13.8" height="1.2" rx="0.6" fill={lit} />
      <rect x="63.6" y="114.8" width="13.8" height="3.4" rx="1.7" fill={dark} />
      <rect x="63.6" y="114.8" width="13.8" height="1.2" rx="0.6" fill={mid} />

      {/* Torso: shell, shade, centre seam, waist ring */}
      <rect x="45" y="56" width="32" height="36" rx="8" fill={`url(#${id}-torso)`} />
      <rect
        x="45"
        y="56"
        width="32"
        height="36"
        rx="8"
        fill={shade}
        opacity="0.28"
        mask={`url(#${id}-torso-shade)`}
      />
      <path d="M61 77 L 61 88" stroke={dark} strokeWidth="0.9" opacity="0.5" />
      <rect x="46" y="88" width="30" height="7" rx="3" fill={mid} />
      <rect x="46" y="88" width="30" height="2" rx="1" fill={lit} opacity="0.7" />
      <rect x="58" y="89.5" width="6" height="4" rx="1" fill={dark} />

      {/* Hose from the chest unit to the waist */}
      <path
        d="M50 75 C 45 81, 46 88, 52 89"
        fill="none"
        stroke={seam}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M50 75 C 45 81, 46 88, 52 89"
        fill="none"
        stroke={mid}
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeDasharray="1 1.6"
      />

      {/* Chest control unit */}
      <rect
        x="48"
        y="63.5"
        width="18"
        height="12"
        rx="2"
        fill="#1c2540"
        stroke="#2a3658"
        strokeWidth="0.8"
      />
      <rect x="49.5" y="65" width="9" height="5" rx="1" fill="#0b1020" />
      <rect x="50.5" y="66.2" width="5" height="1.4" rx="0.7" fill="#38bdf8" />
      <rect x="50.5" y="68.2" width="3" height="0.9" rx="0.45" fill="#38bdf8" opacity="0.5" />
      <circle cx="61.5" cy="66.8" r="1.2" fill="#3fb950" />
      <circle cx="64" cy="66.8" r="0.9" fill={dark} />
      <rect x="49.5" y="71.5" width="15" height="1.4" rx="0.7" fill={seam} />
      <circle cx="52" cy="73.8" r="0.7" fill={dark} />
      <circle cx="55" cy="73.8" r="0.7" fill={dark} />
      <circle cx="58" cy="73.8" r="0.7" fill={dark} />

      {/* Mission patch */}
      <circle cx="69" cy="83" r="3" fill={lit} />
      <circle cx="69" cy="83" r="2.4" fill={`url(#${id}-accent)`} />
      <path d="M67.4 83.6 L 69 81.6 L 70.6 83.6" fill="none" stroke="#fff" strokeWidth="0.6" />

      {/* Left arm, relaxed. A wider seam-coloured stroke underneath acts as the outline
          that separates the sleeve from the torso. */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M47 62 L 38 79 L 39 90" stroke={seam} strokeWidth="12.4" />
        <path d="M47 62 L 38 79" stroke={lit} strokeWidth="11" />
        <path d="M38 79 L 39 90" stroke={mid} strokeWidth="10.4" />
        <path d="M43.4 63.2 L 35.2 78.6" stroke="#fff" strokeWidth="1.4" opacity="0.45" />
        <path d="M42.6 81 L 43.4 88.6" stroke={shade} strokeWidth="2" opacity="0.3" />
      </g>
      <circle cx="47" cy="62" r="5.8" fill="none" stroke={mid} strokeWidth="1.2" />
      <g stroke={dark} strokeWidth="1.1" strokeLinecap="round" opacity="0.75">
        <path d="M37.6 66.8 L 46.4 71.4" />
        <path d="M34.4 84.6 L 43.8 84" />
      </g>
      <ellipse cx="38.2" cy="79" rx="4" ry="3.2" fill={mid} stroke={seam} strokeWidth="0.6" />
      <ellipse cx="37.4" cy="78.2" rx="1.8" ry="1" fill={lit} opacity="0.8" />
      {/* Left glove, relaxed: closed fingers seen from the back, thumb toward the body */}
      <path
        d="M34.6 90.4 L 43.6 90.4 C 44.6 93 44.6 96.5 43 98.6 C 41.6 100.4 37.6 100.6 35.8 99 C 34.2 97.4 33.9 93.6 34.6 90.4 Z"
        fill={`url(#${id}-glove)`}
        stroke={seam}
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <g fill="none" stroke={seam} strokeWidth="0.55" strokeLinecap="round" opacity="0.7">
        <path d="M35.2 94.6 Q 39 95.8 43.9 94.6" />
        <path d="M35.8 97.4 Q 39 98.4 43 97.4" />
      </g>
      <path
        d="M42.6 91.6 C 45.6 92 46.4 95 44.6 96.8 C 43.8 97.6 42.6 97 42.6 96 Z"
        fill={`url(#${id}-glove)`}
        stroke={seam}
        strokeWidth="0.55"
        strokeLinejoin="round"
      />
      <rect x="33.4" y="86" width="11.2" height="4.8" rx="2.4" fill={mid} />
      <rect x="33.4" y="86" width="11.2" height="1.6" rx="0.8" fill={lit} />

      {/* Helmet: neck ring, shell, shade, lights, visor */}
      <rect x="45" y="52" width="32" height="7" rx="3.5" fill={mid} />
      <rect x="45" y="52" width="32" height="2.2" rx="1.1" fill={lit} />
      <circle cx="61" cy="38" r="17" fill={`url(#${id}-helmet)`} />
      <circle
        cx="61"
        cy="38"
        r="17"
        fill={shade}
        opacity="0.22"
        mask={`url(#${id}-helmet-shade)`}
      />
      <rect x="55" y="20.5" width="12" height="3" rx="1.5" fill={dark} />
      <rect x="57" y="21.3" width="3" height="1.4" rx="0.7" fill="#e0f2fe" />
      <rect x="62" y="21.3" width="3" height="1.4" rx="0.7" fill="#e0f2fe" />
      <rect x="43.6" y="32.5" width="4.4" height="9" rx="1.6" fill={dark} />
      <circle cx="45.8" cy="35" r="0.8" fill="#38bdf8" />

      <rect x="46.8" y="27.8" width="28.4" height="19.4" rx="9.7" fill={`url(#${id}-rim)`} />
      <rect x="48" y="29" width="26" height="17" rx="8.5" fill={`url(#${id}-visor)`} />
      <g clipPath={`url(#${id}-visor-clip)`}>
        {/* Reflections: the planet's curve and a few stars */}
        <ellipse cx="72" cy="52" rx="20" ry="9" fill="#a78bfa" opacity="0.18" />
        <path
          d="M54 46 Q 64 39 76 41"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <circle cx="66" cy="33" r="0.6" fill="#fff" opacity="0.8" />
        <circle cx="70" cy="36" r="0.4" fill="#fff" opacity="0.6" />
        <circle cx="58" cy="40" r="0.4" fill="#fff" opacity="0.5" />
      </g>
      <path
        d="M52 34.5 Q 55.5 31 61 31"
        fill="none"
        stroke={`url(#${id}-accent)`}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M51 38 Q 51 36.5 51.6 35.6"
        fill="none"
        stroke="#e0f2fe"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Right arm, hand raised toward the viewer */}
      {/* Upper arm out to the side, forearm up in front of it */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M75 62 L 90 77" stroke={seam} strokeWidth="12.4" />
        <path d="M75 62 L 90 77" stroke={mid} strokeWidth="11" />
        <path d="M72 65.2 L 86.6 80" stroke={shade} strokeWidth="2" opacity="0.3" />
        <path d="M90 77 L 86 66.5" stroke={seam} strokeWidth="13.4" />
        <path d="M90 77 L 86 66.5" stroke={lit} strokeWidth="12" />
        <path d="M82.4 71.4 L 80.6 66.8" stroke="#fff" strokeWidth="1.4" opacity="0.45" />
        <path d="M93.7 75.6 L 90.4 66.4" stroke={shade} strokeWidth="2" opacity="0.3" />
      </g>
      <circle cx="75" cy="62" r="5.8" fill="none" stroke={dark} strokeWidth="1.2" opacity="0.8" />
      <g stroke={dark} strokeWidth="1.1" strokeLinecap="round" opacity="0.75">
        <path d="M78.5 72.5 L 85.5 65.5" />
        <path d="M83.2 74.8 L 93.6 70.8" />
      </g>
      <ellipse cx="90.4" cy="77.6" rx="3.8" ry="3.2" fill={mid} stroke={seam} strokeWidth="0.6" />
      <ellipse cx="89.6" cy="76.8" rx="1.7" ry="1" fill={lit} opacity="0.8" />

      {/* Right glove, palm toward the viewer. Thumb and index finger are separate, the
          other three fingers form one block: reads clearly even at small sizes. */}
      <path
        d="M79.2 63.6 L 78.4 58.4 C 76.8 57.8 75.2 56.4 74.2 54.6 C 73.4 53.2 74.8 51.6 76.2 52.4 L 78.4 54.4 L 78.4 49.2 C 78.4 46.8 82 46.8 82 49.2 L 82 53.2 L 82.6 53.2 L 82.6 48.4 C 82.6 46.6 85.6 46.2 86 47.8 C 86.4 46.4 89.2 46.6 89.4 48.2 C 89.8 47.6 92.4 48 92.4 50 L 92.4 57.4 C 92.4 61.4 90.6 63.6 87.6 63.6 Z"
        fill={`url(#${id}-glove)`}
        stroke={seam}
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      <g fill="none" stroke={seam} strokeWidth="0.6" strokeLinecap="round" opacity="0.75">
        <path d="M86 48.6 L 86 52.8" />
        <path d="M89.4 49 L 89.4 53" />
        <path d="M78.6 54.2 Q 85.5 55.8 92.2 54" />
        <path d="M76.6 55.8 Q 78 57.4 79.8 57.8" />
      </g>
      <path
        d="M79.4 48.8 L 79.4 52.4"
        stroke="#fff"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.4"
      />
      <rect x="80.4" y="56.4" width="9.6" height="5" rx="2.4" fill={dark} opacity="0.3" />
      {/* Wrist cuff over the glove */}
      <rect x="77.8" y="62.4" width="14.4" height="5.4" rx="2.6" fill={mid} />
      <rect x="77.8" y="62.4" width="14.4" height="1.7" rx="0.85" fill={lit} />
      <rect x="83.2" y="64.6" width="3.6" height="1.6" rx="0.8" fill="#38bdf8" opacity="0.8" />
    </svg>
  );
}
