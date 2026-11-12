import { useEffect, useState } from 'react';

/** Page scroll progress (0-1) and offset, updated at most once per animation frame. */
export function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, y: 0 });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setState({ progress: max > 0 ? Math.min(window.scrollY / max, 1) : 0, y: window.scrollY });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return state;
}
