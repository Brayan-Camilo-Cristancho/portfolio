import { useEffect, useRef, useState } from 'react';

/** Turns true once the element comes within `margin` of the viewport, and stays true. */
export function useNearViewport<T extends HTMLElement>(margin = '400px') {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || near) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setNear(true);
      },
      { rootMargin: margin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [margin, near]);

  return [ref, near] as const;
}
