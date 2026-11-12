import { useTranslation } from 'react-i18next';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { experience } from '@/data/experience';
import { useLocalized } from '@/i18n/useLocalized';
import { formatYearMonth } from '@/lib/date';
import { shortHash } from '@/lib/hash';
import { RingedPlanet } from '@/components/space/planets';

export function ExperienceSection() {
  const { t, i18n } = useTranslation();
  const l = useLocalized();
  const lang = i18n.resolvedLanguage ?? 'es';

  return (
    <Section
      id="experience"
      eyebrow="git log --graph"
      title={t('sections.experience.title')}
      decor={
        <RingedPlanet
          palette="teal"
          tilt={18}
          className="animate-float-slow absolute top-6 right-2 w-28 opacity-85 sm:right-[5%] sm:w-36"
        />
      }
    >
      <ol className="border-border relative ml-2 flex flex-col gap-10 border-l pl-6 sm:ml-3 sm:pl-8">
        {experience.map((job, index) => (
          <li key={`${job.org.en}-${job.start}`} className="relative">
            <span
              aria-hidden
              className={`absolute top-1 -left-[31px] size-3 rounded-full border-2 sm:-left-[39px] ${
                index === 0
                  ? 'border-accent bg-accent shadow-glow'
                  : 'border-border-strong bg-canvas'
              }`}
            />
            <p aria-hidden className="mb-1.5 font-mono text-xs">
              <span className="text-nebula">commit {shortHash(job.org.en + job.start)}</span>
              {index === 0 && (
                <span className="text-fg-muted">
                  {' ('}
                  <span className="text-accent">HEAD</span>
                  {' -> '}
                  <span className="text-success">main</span>
                  {')'}
                </span>
              )}
            </p>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="text-lg font-semibold">
                {l(job.role)} <span className="text-fg-muted font-normal">· {l(job.org)}</span>
              </h3>

              <p className="text-fg-muted shrink-0 font-mono text-sm">
                <time dateTime={job.start}>{formatYearMonth(job.start, lang)}</time>
                {' — '}
                {job.end ? (
                  <time dateTime={job.end}>{formatYearMonth(job.end, lang)}</time>
                ) : (
                  t('sections.experience.present')
                )}
              </p>
            </div>
            <ul className="text-fg-muted mt-3 flex flex-col gap-1.5 text-sm">
              {l(job.highlights).map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="text-success font-mono">
                    +
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <ul aria-label={t('project.stack')} className="mt-3 flex flex-wrap gap-1.5">
              {job.stack.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
