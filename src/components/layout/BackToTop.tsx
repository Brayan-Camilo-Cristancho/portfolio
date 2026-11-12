import { Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { cn } from '@/lib/cn';

const RADIUS = 21;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BackToTop() {
  const { t } = useTranslation();
  const { progress, y } = useScrollProgress();
  const visible = y > 600;

  // Moving focus as well keeps keyboard users in sync with the new scroll position.
  const goTop = () => {
    window.scrollTo({ top: 0 });
    document.getElementById('main')?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label={t('backToTop')}
      className={cn(
        'group border-border bg-surface/80 hover:border-accent/60 hover:shadow-glow fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full border backdrop-blur-md transition-all duration-300 sm:right-6 sm:bottom-6',
        visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-4 opacity-0',
      )}
    >
      <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="url(#fuel)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
        <defs>
          <linearGradient id="fuel" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-nebula)" />
          </linearGradient>
        </defs>
      </svg>

      <Rocket
        aria-hidden
        className="text-accent size-5 -rotate-45 transition-transform duration-300 group-hover:-translate-y-1 group-active:-translate-y-2"
      />
    </button>
  );
}
