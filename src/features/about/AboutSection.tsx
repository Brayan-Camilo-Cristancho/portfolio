import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '@/components/layout/Section';
import { TerminalWindow } from '@/components/ui/TerminalWindow';
import { certifications } from '@/data/certifications';
import { education, experience } from '@/data/experience';
import { profile } from '@/data/profile';
import { useLocalized } from '@/i18n/useLocalized';
import { cn } from '@/lib/cn';
import { BandedGiant } from '@/components/space/planets';

const ASCII_LOGO = String.raw`██████╗  ██████╗
██╔══██╗██╔════╝
██████╔╝██║
██╔══██╗██║
██████╔╝╚██████╗
╚═════╝  ╚═════╝`;

const COLOR_BLOCKS = [
  'bg-danger',
  'bg-warning',
  'bg-success',
  'bg-accent',
  'bg-nebula',
  'bg-fg-muted',
  'bg-border-strong',
  'bg-fg',
];

const START_YEAR = Math.min(...experience.map((job) => Number(job.start.slice(0, 4))));

const toFileName = (name: string) =>
  `${name
    .toLowerCase()
    .replace(/[():]/g, '')
    .trim()
    .replace(/[\s/]+/g, '-')}.crt`;

const toOwner = (issuer: string) =>
  issuer
    .replace(/^the\s+/i, '')
    .split(' ')[0]!
    .toLowerCase();

function Neofetch() {
  const { t } = useTranslation();
  const l = useLocalized();
  const edu = education[0];
  const years = new Date().getFullYear() - START_YEAR;

  const rows: [string, string][] = [
    ['role', profile.role],
    ['location', l(profile.location)],
    ['uptime', t('sections.about.neo.uptime', { count: years })],
    ...(edu
      ? ([['education', `${l(edu.degree)} · ${edu.institution}`]] as [string, string][])
      : []),
    ['shell', 'bash · python · typescript'],
    ['stack', 'kubernetes · helm · jenkins · aws · azure'],
    ['langs', t('sections.about.neo.langs')],
  ];

  return (
    <TerminalWindow title="brayan@portfolio: ~">
      <p aria-hidden className="text-fg-subtle mb-4 font-mono text-xs">
        <span className="text-success">brayan@portfolio</span>:
        <span className="text-accent">~</span>$ <span className="text-fg">neofetch</span>
      </p>
      <div className="flex gap-6">
        <pre
          aria-hidden
          className="from-accent to-nebula hidden shrink-0 bg-linear-to-b bg-clip-text font-mono text-[0.55rem] leading-[1.15] text-transparent sm:block lg:text-[0.6rem] xl:text-[0.7rem]"
        >
          {ASCII_LOGO}
        </pre>

        <div className="min-w-0 flex-1 font-mono text-xs sm:text-sm">
          <p className="text-fg font-semibold">
            <span className="text-accent">brayan</span>@
            <span className="text-nebula">portfolio</span>
          </p>
          <p aria-hidden className="text-fg-subtle">
            ----------------
          </p>
          <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5">
            {rows.map(([key, value]) => (
              <div key={key} className="contents">
                <dt className="text-accent">{key}:</dt>
                <dd className="text-fg-muted break-words">{value}</dd>
              </div>
            ))}
            <div className="contents">
              <dt className="text-accent">status:</dt>
              <dd className="text-success">● {t('hero.available')}</dd>
            </div>
          </dl>
          <div aria-hidden className="mt-4 flex flex-wrap gap-1">
            {COLOR_BLOCKS.map((color) => (
              <span key={color} className={cn('h-3 w-6 rounded-[1px]', color)} />
            ))}
          </div>
        </div>
      </div>
    </TerminalWindow>
  );
}

function Readme() {
  const { t } = useTranslation();
  const l = useLocalized();
  const focus = [
    t('sections.about.focus.cicd'),
    t('sections.about.focus.k8s'),
    t('sections.about.focus.cloud'),
  ];

  return (
    <TerminalWindow title="~/README.md" bodyClassName="flex flex-col gap-4">
      <p aria-hidden className="text-fg-subtle font-mono text-xs">
        $ <span className="text-fg">cat README.md</span>
      </p>
      <p aria-hidden className="text-accent font-mono text-sm">
        # brayan-cristancho
      </p>
      <p className="text-fg-muted leading-relaxed">{l(profile.summary)}</p>
      <div>
        <p aria-hidden className="text-nebula mb-2 font-mono text-sm">
          ## focus
        </p>
        <ul className="flex flex-col gap-1.5 text-sm">
          {focus.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden className="text-accent font-mono">
                -
              </span>
              <span className="text-fg">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </TerminalWindow>
  );
}

function CertsListing() {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const tableId = useId();
  const featured = certifications.filter((c) => c.featured);
  const visible = showAll ? certifications : featured;

  return (
    <TerminalWindow title="~/certs" className="mt-6" bodyClassName="flex flex-col gap-3">
      <h3 className="sr-only">{t('sections.about.certifications')}</h3>
      <p aria-hidden className="text-fg-subtle font-mono text-xs">
        $ <span className="text-fg">ls -la ~/certs{showAll ? ' --all' : ''}</span>
      </p>
      <p aria-hidden className="text-fg-subtle font-mono text-xs">
        total {visible.length}
      </p>

      <div className="overflow-x-auto">
        <table id={tableId} className="w-full font-mono text-xs sm:text-sm">
          <thead className="sr-only">
            <tr>
              <th scope="col">{t('sections.about.cols.perms')}</th>
              <th scope="col">{t('sections.about.cols.issuer')}</th>
              <th scope="col">{t('sections.about.cols.date')}</th>
              <th scope="col">{t('sections.about.cols.name')}</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((cert) => (
              <tr key={cert.name} className="hover:bg-elevated/60 align-top transition-colors">
                <td aria-hidden className="text-fg-subtle hidden py-0.5 pr-4 sm:table-cell">
                  {cert.inProgress ? '-rw-r--r--' : '-r--r--r--'}
                </td>
                <td className="text-nebula py-0.5 pr-4">{toOwner(cert.issuer)}</td>
                <td className="text-fg-subtle py-0.5 pr-4 whitespace-nowrap">{cert.date}</td>
                <td className="py-0.5 break-all">
                  <span aria-hidden className={cert.inProgress ? 'text-warning' : 'text-fg'}>
                    {toFileName(cert.name)}
                  </span>
                  <span className="sr-only">{cert.name}</span>
                  {cert.inProgress && (
                    <span className="text-warning"> ({t('sections.about.inProgress')})</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        aria-expanded={showAll}
        aria-controls={tableId}
        onClick={() => setShowAll((value) => !value)}
        className="border-accent/25 bg-accent/5 text-accent hover:bg-accent/15 mt-1 flex min-h-10 w-full items-center gap-2 rounded-md border px-3 text-left font-mono text-xs transition-colors sm:w-fit"
      >
        <span aria-hidden className="text-fg-subtle">
          $
        </span>
        {showAll ? 'ls -la ~/certs' : 'ls -la ~/certs --all'}
        <span className="text-fg-subtle">
          #{' '}
          {showAll
            ? t('sections.about.showFeatured')
            : t('sections.about.showAll', { count: certifications.length })}
        </span>
      </button>
    </TerminalWindow>
  );
}

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <Section
      id="about"
      eyebrow="whoami"
      title={t('sections.about.title')}
      decor={
        <BandedGiant className="animate-float-slow absolute top-[22%] -right-28 hidden w-72 opacity-80 lg:block" />
      }
    >
      <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Readme />
        <Neofetch />
      </div>
      <CertsListing />
    </Section>
  );
}
