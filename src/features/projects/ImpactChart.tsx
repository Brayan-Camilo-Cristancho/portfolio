import { m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/Badge';
import { useLocalized } from '@/i18n/useLocalized';
import type { ImpactMetric } from '@/types/content';

/** Before/after bars. Each metric is scaled to its own "before" value. */
export function ImpactChart({ metrics }: { metrics: ImpactMetric[] }) {
  const { t } = useTranslation();
  const l = useLocalized();

  return (
    <ul className="flex flex-col gap-6">
      {metrics.map((metric) => {
        const afterPct = metric.minutes
          ? Math.max((metric.minutes.after / metric.minutes.before) * 100, 1.5)
          : null;
        const rows = [
          {
            key: 'before',
            label: t('project.before'),
            value: l(metric.before),
            pct: metric.minutes ? 100 : null, // non-numeric metrics render as text only
          },
          { key: 'after', label: t('project.after'), value: l(metric.after), pct: afterPct },
        ];

        return (
          <li key={metric.label.es} className="flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-fg text-sm font-medium">{l(metric.label)}</h4>
              <Badge tone="accent">{metric.improvement}</Badge>
            </div>
            <dl className="flex flex-col gap-1.5 font-mono text-xs">
              {rows.map((row) => (
                <div key={row.key} className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
                  <dt className="text-fg-muted">{row.label}</dt>
                  <dd className="flex min-w-0 items-center gap-3">
                    {row.pct !== null && (
                      <span
                        aria-hidden
                        className="bg-elevated h-2.5 flex-1 overflow-hidden rounded-sm"
                      >
                        <m.span
                          className={`block h-full origin-left rounded-r-sm ${
                            row.key === 'before' ? 'bg-fg-subtle/60' : 'bg-accent'
                          }`}
                          style={{ width: `${row.pct}%` }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.8,
                            ease: 'easeOut',
                            delay: row.key === 'after' ? 0.2 : 0,
                          }}
                        />
                      </span>
                    )}
                    <span className="text-fg shrink-0">{row.value}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        );
      })}
    </ul>
  );
}
