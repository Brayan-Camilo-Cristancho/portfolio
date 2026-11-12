import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { sectionTo } from '@/app/navigation';
import { cn } from '@/lib/cn';
import { isComplete, PIPELINE_STAGES, statusOf } from './stages';
import { StatusIcon } from './StatusIcon';

interface JenkinsfileViewProps {
  activeIndex: number;
  onNavigate?: () => void;
}

const Kw = ({ children }: { children: string }) => <span className="text-nebula">{children}</span>;
const Str = ({ children }: { children: string }) => (
  <span className="text-accent">&apos;{children}&apos;</span>
);

export function JenkinsfileView({ activeIndex, onNavigate }: JenkinsfileViewProps) {
  const { t } = useTranslation();

  return (
    <div className="font-mono text-xs leading-6">
      <p aria-hidden>
        <Kw>pipeline</Kw> <span className="text-fg-subtle">{'{'}</span>
      </p>
      <p aria-hidden className="pl-3">
        <Kw>agent</Kw> <span className="text-fg-subtle">{'{'}</span> label <Str>portfolio</Str>{' '}
        <span className="text-fg-subtle">{'}'}</span>
      </p>
      <p aria-hidden className="pl-3">
        <Kw>stages</Kw> <span className="text-fg-subtle">{'{'}</span>
      </p>
      <ol className="pl-4">
        {PIPELINE_STAGES.map((stage, i) => {
          const status = statusOf(i, activeIndex);
          return (
            <li key={stage.id}>
              <Link
                to={sectionTo(stage.id)}
                onClick={onNavigate}
                aria-current={status === 'running' ? 'location' : undefined}
                aria-label={`${t(stage.labelKey)}, ${t(`rail.status.${status}`)}`}
                className={cn(
                  'flex min-h-8 items-center gap-2 rounded-md px-1.5 transition-colors',
                  status === 'running' ? 'bg-accent/10' : 'hover:bg-elevated',
                )}
              >
                <StatusIcon status={status} />
                <span aria-hidden className={status === 'pending' ? 'text-fg-subtle' : 'text-fg'}>
                  <Kw>stage</Kw>(<Str>{stage.stage}</Str>)
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'ml-auto pl-3 text-[0.65rem]',
                    status === 'passed' && 'text-success',
                    status === 'running' && 'text-accent',
                    status === 'pending' && 'text-fg-subtle',
                  )}
                >
                  {status}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
      <p aria-hidden className="text-fg-subtle pl-3">
        {'}'}
      </p>

      {isComplete(activeIndex) && (
        <p className="text-success pl-3">
          <Kw>post</Kw> {'{ '}
          <Kw>success</Kw> {'{ '}echo <Str>{t('rail.success')}</Str>
          {' } }'}
        </p>
      )}
      <p aria-hidden className="text-fg-subtle">
        {'}'}
      </p>
    </div>
  );
}
