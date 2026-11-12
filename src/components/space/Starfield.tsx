import { useEffect, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const LAYERS = [
  { density: 0.00014, radius: [0.3, 0.8], alpha: [0.25, 0.55], depth: 0.25, glow: 0 },
  { density: 0.00006, radius: [0.7, 1.3], alpha: [0.4, 0.8], depth: 0.6, glow: 0.15 },
  { density: 0.00002, radius: [1.2, 2], alpha: [0.7, 1], depth: 1, glow: 0.6 },
] as const;

const STAR_COLORS = [
  [230, 237, 247, 0.65],
  [186, 230, 253, 0.17],
  [221, 214, 254, 0.12],
  [254, 235, 200, 0.06],
] as const;

const SPARKLES_PER_PX = 0.000004;
const POINTER_RANGE = 30;
const SCROLL_FACTOR = 0.12;
const DRIFT_SPEED = 3;
const METEOR_INTERVAL = [4, 9] as const;

type Rgb = readonly [number, number, number];
const rgba = ([r, g, b]: Rgb, a: number) => `rgba(${r},${g},${b},${a})`;
const random = (min: number, max: number) => min + Math.random() * (max - min);

function pickColor(): number {
  let roll = Math.random();
  for (let i = 0; i < STAR_COLORS.length; i++) {
    roll -= STAR_COLORS[i]![3];
    if (roll <= 0) return i;
  }
  return 0;
}

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  twinkleSpeed: number;
  phase: number;
  depth: number;
  color: number;
  kind: 'dot' | 'glow' | 'sparkle';
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  length: number;
}

function createStars(width: number, height: number): Star[] {
  const stars: Star[] = LAYERS.flatMap((layer) =>
    Array.from({ length: Math.round(width * height * layer.density) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: random(layer.radius[0], layer.radius[1]),
      alpha: random(layer.alpha[0], layer.alpha[1]),
      twinkleSpeed: random(0.5, 1.8),
      phase: Math.random() * Math.PI * 2,
      depth: layer.depth,
      color: pickColor(),
      kind: Math.random() < layer.glow ? ('glow' as const) : ('dot' as const),
    })),
  );
  const sparkles = Math.min(10, Math.max(3, Math.round(width * height * SPARKLES_PER_PX)));
  for (let i = 0; i < sparkles; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: random(1.4, 2.2),
      alpha: 1,
      twinkleSpeed: random(0.3, 0.8),
      phase: Math.random() * Math.PI * 2,
      depth: 1,
      color: Math.random() < 0.5 ? 0 : 1,
      kind: 'sparkle',
    });
  }
  return stars;
}

// Rendered once and stamped many times: far cheaper than a gradient per star per frame.
function createGlowSprite(color: Rgb): HTMLCanvasElement {
  const size = 64;
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = size;
  const ctx = sprite.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, rgba(color, 1));
  g.addColorStop(0.12, rgba(color, 0.55));
  g.addColorStop(0.4, rgba(color, 0.12));
  g.addColorStop(1, rgba(color, 0));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

function createSparkleSprite(color: Rgb): HTMLCanvasElement {
  const size = 128;
  const c = size / 2;
  const out = document.createElement('canvas');
  out.width = out.height = size;
  const ctx = out.getContext('2d')!;
  ctx.drawImage(createGlowSprite(color), c - 20, c - 20, 40, 40);
  for (const [x1, y1, x2, y2] of [
    [0, c, size, c],
    [c, 0, c, size],
  ] as const) {
    const g = ctx.createLinearGradient(x1, y1, x2, y2);
    g.addColorStop(0, rgba(color, 0));
    g.addColorStop(0.5, rgba(color, 0.9));
    g.addColorStop(1, rgba(color, 0));
    ctx.strokeStyle = g;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  return out;
}

/**
 * Page-wide animated starfield on a single fixed canvas. Stars are split into depth
 * layers with mouse and scroll parallax; glows are pre-rendered sprites copied with
 * drawImage. Animation state lives outside React, and the loop pauses on hidden tabs.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const colors = STAR_COLORS.map(([r, g, b]) => [r, g, b] as const);
    const glowSprites = colors.map(createGlowSprite);
    const sparkleSprites = colors.map(createSparkleSprite);

    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let nextMeteorAt = random(...METEOR_INTERVAL);
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastTime = 0;
    const pointer = { x: 0, y: 0 };
    const offset = { x: 0, y: 0 };

    const spawnMeteor = () => {
      const angle = random(0.35, 0.7);
      const direction = Math.random() < 0.5 ? -1 : 1;
      const speed = random(550, 850);
      meteors.push({
        x: random(width * 0.15, width * 0.85),
        y: random(0, height * 0.4),
        vx: Math.cos(angle) * speed * direction,
        vy: Math.sin(angle) * speed,
        age: 0,
        life: random(0.7, 1.2),
        length: random(90, 170),
      });
    };

    const drawMeteors = () => {
      for (const m of meteors) {
        const fade = Math.sin(Math.PI * (m.age / m.life));
        const speed = Math.hypot(m.vx, m.vy);
        const tailX = m.x - (m.vx / speed) * m.length;
        const tailY = m.y - (m.vy / speed) * m.length;
        const g = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        g.addColorStop(0, `rgba(230,237,247,${0.9 * fade})`);
        g.addColorStop(0.3, `rgba(186,230,253,${0.4 * fade})`);
        g.addColorStop(1, 'rgba(186,230,253,0)');
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.globalAlpha = fade;
        ctx.drawImage(glowSprites[1]!, m.x - 8, m.y - 8, 16, 16);
        ctx.globalAlpha = 1;
      }
    };

    const draw = (seconds: number) => {
      ctx.clearRect(0, 0, width, height);
      const scroll = window.scrollY * SCROLL_FACTOR;
      for (const star of stars) {
        const twinkle = reducedMotion
          ? 1
          : star.kind === 'sparkle'
            ? 0.55 + 0.45 * Math.sin(seconds * star.twinkleSpeed + star.phase)
            : 0.6 + 0.4 * Math.sin(seconds * star.twinkleSpeed + star.phase);
        const dx = (offset.x * POINTER_RANGE + seconds * DRIFT_SPEED) * star.depth;
        const dy = (offset.y * POINTER_RANGE + scroll) * star.depth;

        const x = (((star.x - dx) % width) + width) % width;
        const y = (((star.y - dy) % height) + height) % height;
        const alpha = star.alpha * twinkle;

        if (star.kind === 'sparkle') {
          const size = star.r * 14 * (0.75 + 0.25 * twinkle);
          ctx.globalAlpha = alpha;
          ctx.drawImage(sparkleSprites[star.color]!, x - size / 2, y - size / 2, size, size);
          continue;
        }
        if (star.kind === 'glow') {
          const size = star.r * 9;
          ctx.globalAlpha = alpha * 0.55;
          ctx.drawImage(glowSprites[star.color]!, x - size / 2, y - size / 2, size, size);
        }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = rgba(colors[star.color]!, 1);
        ctx.beginPath();
        ctx.arc(x, y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      drawMeteors();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = createStars(width, height);
      draw(performance.now() / 1000);
    };

    const loop = (time: number) => {
      const seconds = time / 1000;

      const dt = lastTime ? Math.min(seconds - lastTime, 0.1) : 0;
      lastTime = seconds;
      offset.x += (pointer.x - offset.x) * 0.05;
      offset.y += (pointer.y - offset.y) * 0.05;

      nextMeteorAt -= dt;
      if (nextMeteorAt <= 0) {
        spawnMeteor();
        nextMeteorAt = random(...METEOR_INTERVAL);
      }
      for (const m of meteors) {
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        m.age += dt;
      }
      meteors = meteors.filter((m) => m.age < m.life);

      draw(seconds);
      frameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (frameId || reducedMotion || document.hidden) return;
      lastTime = 0;
      frameId = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
    };
    const onVisibilityChange = () => (document.hidden ? stop() : start());

    const onScroll = () => {
      if (reducedMotion) draw(0);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [reducedMotion]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="bg-nebula/[0.07] absolute -bottom-40 -left-40 size-[36rem] rounded-full blur-3xl" />
      <div className="bg-accent/[0.05] absolute top-1/3 -right-48 size-[30rem] rounded-full blur-3xl" />
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
