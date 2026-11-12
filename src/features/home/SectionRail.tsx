import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { sectionTo } from '@/app/navigation';
import { cn } from '@/lib/cn';
import { PIPELINE_STAGES, statusOf } from './pipeline/stages';
import { StatusIcon } from './pipeline/StatusIcon';
import { usePipeline } from './pipeline/usePipeline';

const unfold =
  'max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity] duration-300 group-hover/rail:max-w-64 group-hover/rail:opacity-100 group-focus-within/rail:max-w-64 group-focus-within/rail:opacity-100';

/**
 * Section navigation styled as a CI pipeline. Collapsed it shows status nodes; on hover
 * or keyboard focus it unfolds into a Jenkinsfile. Each row is a single link, so the
 * tab order has no duplicates.
 */
export function SectionRail() {
  const { t } = useTranslation();
  const { activeIndex, total, completed } = usePipeline();
  const progress = activeIndex / (total - 1);

  return (
    <nav
      aria-label={t('rail.label')}
      className="group/rail fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div
        className={cn(
          'bg-void/85 rounded-2xl border p-2 font-mono text-xs backdrop-blur-md transition-colors duration-500',

          completed
            ? 'border-success/50 shadow-[0_10px_40px_-15px_var(--color-success)]'
            : 'border-border hover:border-accent/40 focus-within:border-accent/40 shadow-[0_10px_40px_-15px_var(--color-accent)]',
        )}
      >
        <div className="border-border mb-1.5 flex items-center border-b px-1.5 pb-2">
          <span
            aria-hidden
            className="bg-accent/15 text-accent grid size-5 shrink-0 place-items-center rounded text-[0.55rem] font-bold"
          >
            CI
          </span>
          <span aria-hidden className={cn(unfold, 'text-fg-subtle')}>
            <span className="pl-2">
              <span className="text-nebula">agent</span> label{' '}
              <span className="text-accent">&apos;portfolio&apos;</span>
            </span>
          </span>
        </div>

        <ol className="relative">
          <span aria-hidden className="bg-border absolute top-4 bottom-4 left-4 w-px" />
          <span
            aria-hidden
            className="bg-success/60 absolute top-4 left-4 w-px transition-[height] duration-500"
            style={{ height: `calc((100% - 2rem) * ${progress})` }}
          />
          {PIPELINE_STAGES.map((stage, i) => {
            const status = statusOf(i, activeIndex);
            return (
              <li key={stage.id}>
                <Link
                  to={sectionTo(stage.id)}
                  aria-current={status === 'running' ? 'location' : undefined}
                  aria-label={`${t(stage.labelKey)}, ${t(`rail.status.${status}`)}`}
                  className={cn(
                    'relative flex min-h-8 items-center rounded-md px-1.5 transition-colors',
                    status === 'running' ? 'bg-accent/10' : 'hover:bg-elevated',
                  )}
                >
                  <span className="bg-void relative rounded-full">
                    <StatusIcon status={status} />
                  </span>
                  <span aria-hidden className={unfold}>
                    <span className="flex items-center gap-3 pl-2">
                      <span className={status === 'pending' ? 'text-fg-subtle' : 'text-fg'}>
                        <span className="text-nebula">stage</span>(
                        <span className="text-accent">&apos;{stage.stage}&apos;</span>)
                      </span>
                      <span
                        className={cn(
                          'ml-auto text-[0.65rem]',
                          status === 'passed' && 'text-success',
                          status === 'running' && 'text-accent',
                          status === 'pending' && 'text-fg-subtle',
                        )}
                      >
                        {status}
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        <p
          aria-hidden
          className="border-border text-fg-subtle mt-1.5 flex items-center justify-center border-t pt-2 text-[0.65rem]"
        >
          {completed ? (
            <span className="text-success flex items-center font-semibold">
              ✓<span className={unfold}>&nbsp;SUCCESS · {t('rail.success')}</span>
            </span>
          ) : (
            <>
              <span className="text-fg">{activeIndex + 1}</span>/{total}
            </>
          )}
        </p>

        <p className="sr-only" aria-live="polite">
          {completed ? t('rail.success') : ''}
        </p>
      </div>
    </nav>
  );
}
