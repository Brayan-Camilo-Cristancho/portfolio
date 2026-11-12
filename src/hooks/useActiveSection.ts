import { useEffect, useState } from 'react';

const isAtBottom = () =>
  window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

/**
 * Scroll-spy. Returns the id of the section crossing a thin band in the middle of the
 * viewport. At the very bottom of the page the last section wins, since a short final
 * section may never reach that band.
 */
export function useActiveSection(ids: readonly string[], resetKey?: string): string | null {
  const [observed, setObserved] = useState<string | null>(null);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    setObserved(null);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setObserved(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    elements.forEach((el) => observer.observe(el));

    let frame = 0;
    const check = () => {
      frame = 0;
      setAtBottom(isAtBottom());
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, resetKey]);

  return atBottom ? (ids.at(-1) ?? observed) : observed;
}
