import { ArrowLeft, BarChart3, ExternalLink } from 'lucide-react';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/Badge';
import { useLocalized } from '@/i18n/useLocalized';
import { cn } from '@/lib/cn';
import type { Project } from '@/types/content';
import { ImpactChart } from './ImpactChart';
import { PipelineStages } from './PipelineStages';

/**
 * Both faces share one grid cell, so the card is always as tall as its tallest face and
 * flipping between summary and metrics never shifts the surrounding grid.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation();
  const l = useLocalized();
  const [showMetrics, setShowMetrics] = useState(false);
  const metricsId = useId();
  const headline = project.impact[0];
  const hasMetrics = project.impact.length > 0;

  const face = (visible: boolean) =>
    cn(
      '[grid-area:1/1] flex flex-col gap-4 transition-[opacity,translate,visibility] duration-300',
      visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0',
    );

  return (
    <li
      className={cn(
        'border-border bg-surface/80 flex flex-col rounded-md border backdrop-blur-sm transition duration-200',
        showMetrics ? 'border-accent/50 shadow-glow' : 'hover:border-border-strong',
      )}
    >
      <div className="border-border flex items-center gap-2 border-b px-4 py-2 font-mono text-xs">
        <Badge tone="success" dot>
          {t('project.passed')}
        </Badge>
        <span className="text-fg-muted truncate">{l(project.context)}</span>
        <span aria-hidden className="text-fg-subtle ml-auto">
          #{String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <h3 className="text-lg leading-snug font-semibold">{l(project.title)}</h3>

        <div className="grid flex-1">
          <div className={face(!showMetrics)} inert={showMetrics}>
            <p className="text-fg-muted text-sm">{l(project.problem)}</p>
            <PipelineStages />
            {headline && (
              <p className="flex flex-wrap items-center gap-2 text-sm">
                <Badge tone="accent">{l(headline.improvement)}</Badge>
                <span className="text-fg-muted">{l(headline.label)}</span>
              </p>
            )}
            <ul aria-label={t('project.stack')} className="mt-auto flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>
          </div>

          <div id={metricsId} className={face(showMetrics)} inert={!showMetrics}>
            <div>
              <p className="text-fg-subtle mb-1.5 font-mono text-xs">
                $ {t('project.stages.solution')}
              </p>
              <p className="text-fg-muted text-sm leading-relaxed">{l(project.solution)}</p>
            </div>
            {hasMetrics ? (
              <ImpactChart key={showMetrics ? 'shown' : 'hidden'} metrics={project.impact} />
            ) : (
              <p className="text-fg-muted text-sm leading-relaxed">{t('project.noMetrics')}</p>
            )}
            {project.links?.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent mt-auto inline-flex w-fit items-center gap-1.5 font-mono text-xs hover:underline"
              >
                <ExternalLink aria-hidden className="size-3.5" />
                {t('project.viewRepo')}
                <span className="sr-only"> ({t('a11y.newTab')})</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={showMetrics}
        aria-controls={metricsId}
        onClick={() => setShowMetrics((value) => !value)}
        className={cn(
          'border-accent/25 bg-accent/5 text-accent flex min-h-11 w-full items-center justify-center gap-2 rounded-b-md border-t px-4 font-mono text-sm font-medium transition-colors',
          showMetrics ? 'bg-accent/15' : 'hover:bg-accent/15',
        )}
      >
        {showMetrics ? (
          <>
            <ArrowLeft aria-hidden className="size-4" />
            {t('project.backToSummary')}
          </>
        ) : (
          <>
            <BarChart3 aria-hidden className="size-4" />
            {t(hasMetrics ? 'project.showMetrics' : 'project.showDetails')}
          </>
        )}
      </button>
    </li>
  );
}
