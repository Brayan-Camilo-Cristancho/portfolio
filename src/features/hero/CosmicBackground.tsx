import { useEffect, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Planets } from './Planets';

/** Hero-only nebulae and planets. Mouse parallax runs only while the hero is visible. */
export function CosmicBackground() {
  const planetsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    const layer = planetsRef.current;
    if (!layer || reducedMotion) return;

    let frameId = 0;
    const pointer = { x: 0, y: 0 };
    const offset = { x: 0, y: 0 };

    const loop = () => {
      offset.x += (pointer.x - offset.x) * 0.05;
      offset.y += (pointer.y - offset.y) * 0.05;
      layer.style.transform = `translate3d(${-offset.x * 24}px, ${-offset.y * 16}px, 0)`;
      frameId = requestAnimationFrame(loop);
    };
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
    };

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frameId);
      frameId = entry?.isIntersecting ? requestAnimationFrame(loop) : 0;
    });
    observer.observe(layer);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [reducedMotion]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-accent/15 absolute -top-48 left-[10%] size-[28rem] rounded-full blur-3xl sm:size-[40rem]" />
      <div className="bg-nebula/20 absolute top-24 -right-32 size-[24rem] rounded-full blur-3xl sm:size-[34rem]" />
      <div ref={planetsRef} className="absolute inset-0 will-change-transform">
        <Planets />
      </div>
    </div>
  );
}
