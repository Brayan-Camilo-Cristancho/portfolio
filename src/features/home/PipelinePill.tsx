import { ChevronUp } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/cn';
import { JenkinsfileView } from './pipeline/JenkinsfileView';
import { PIPELINE_STAGES, statusOf } from './pipeline/stages';
import { StatusIcon } from './pipeline/StatusIcon';
import { usePipeline } from './pipeline/usePipeline';

/** Compact pipeline navigation for screens without room for the side rail. */
export function PipelinePill() {
  const { t } = useTranslation();
  const { activeIndex, total, completed } = usePipeline();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const current = PIPELINE_STAGES[activeIndex]!;
  const visible = activeIndex > 0 || open;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={cn(
        'fixed bottom-4 left-4 z-40 transition-all duration-300 sm:bottom-6 sm:left-6 xl:hidden',
        visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-4 opacity-0',
      )}
    >
      {open && (
        <div
          id={panelId}
          className="border-border bg-void/95 absolute bottom-full left-0 mb-2 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border p-3 shadow-[0_10px_40px_-15px_var(--color-accent)] backdrop-blur-md"
        >
          <JenkinsfileView activeIndex={activeIndex} onNavigate={() => setOpen(false)} />
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={
          completed
            ? `${t('rail.label')}: ${t('rail.success')}`
            : `${t('rail.label')}: ${t(current.labelKey)} (${activeIndex + 1}/${total})`
        }
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'bg-void/85 flex h-12 items-center gap-2 rounded-full border pr-3 pl-2 font-mono text-xs shadow-lg backdrop-blur-md transition-colors duration-500',
          completed ? 'border-success/50' : 'border-border hover:border-accent/50',
        )}
      >
        <StatusIcon status={statusOf(activeIndex, activeIndex)} />
        {completed ? (
          <span aria-hidden className="text-success font-semibold">
            SUCCESS
          </span>
        ) : (
          <span aria-hidden className="text-fg">
            <span className="text-nebula">stage</span>(
            <span className="text-accent">&apos;{current.stage}&apos;</span>)
          </span>
        )}
        <span aria-hidden className="text-fg-subtle">
          {completed ? total : activeIndex + 1}/{total}
        </span>
        <ChevronUp
          aria-hidden
          className={cn('text-fg-subtle size-4 transition-transform', !open && 'rotate-180')}
        />
      </button>
    </div>
  );
}
