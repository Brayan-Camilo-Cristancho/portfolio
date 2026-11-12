import { useEffect } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router';

/**
 * Owns scroll behaviour for client-side navigation:
 * - first load always starts at the top (and drops any stale #hash from the URL),
 * - links with a hash scroll to that section,
 * - other pushes reset to the top; back/forward is left to the browser.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    // React Router gives the initial location the key 'default', which is more reliable
    // than a ref under StrictMode double effects.
    if (key === 'default') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (hash) navigate({ pathname, hash: '' }, { replace: true });
      return;
    }
    if (hash) {
      const frame = requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      });
      return () => cancelAnimationFrame(frame);
    }

    if (navigationType !== 'POP') window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash, key, navigationType, navigate]);

  return null;
}
