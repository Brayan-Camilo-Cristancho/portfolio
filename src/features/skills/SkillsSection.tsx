import { m } from 'motion/react';
import { useId, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '@/components/layout/Section';
import { TechIcon } from '@/components/ui/TechIcon';
import { skillCategories } from '@/data/skills';
import { brandHex } from '@/data/techIcons';
import { useLocalized } from '@/i18n/useLocalized';
import { cn } from '@/lib/cn';
import { readableOnDark } from '@/lib/color';
import { DevOpsLoop } from './DevOpsLoop';
import { LOOP_STAGES } from './loop';
import { IcePlanet } from '@/components/space/planets';

const ORDER = LOOP_STAGES.map((stage) => stage.id);
const TOTAL_SKILLS = skillCategories.reduce((sum, c) => sum + c.skills.length, 0);

export function SkillsSection() {
  const { t } = useTranslation();
  const l = useLocalized();
  const baseId = useId();
  const [activeId, setActiveId] = useState<string>('containers');

  const panelId = `${baseId}-panel`;
  const desktopTabId = (id: string) => `${baseId}-loop-${id}`;
  const mobileTabId = (id: string) => `${baseId}-chip-${id}`;

  const index = ORDER.indexOf(activeId as (typeof ORDER)[number]);
  const category = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0]!;

  // WAI-ARIA tabs: arrow keys move between stages and wrap around, like the loop itself.
  const handleKeyDown =
    (tabId: (id: string) => string) => (event: KeyboardEvent<HTMLButtonElement>) => {
      const moves: Record<string, number> = {
        ArrowRight: index + 1,
        ArrowDown: index + 1,
        ArrowLeft: index - 1,
        ArrowUp: index - 1,
        Home: 0,
        End: ORDER.length - 1,
      };
      const target = moves[event.key];
      if (target === undefined) return;
      event.preventDefault();
      const next = ORDER[(target + ORDER.length) % ORDER.length]!;
      setActiveId(next);
      document.getElementById(tabId(next))?.focus();
    };

  return (
    <Section
      id="skills"
      eyebrow="devops --loop"
      decor={
        <IcePlanet className="animate-float absolute top-8 right-4 w-20 opacity-90 sm:right-[8%] sm:w-28" />
      }
      title={t('sections.skills.title')}
      description={t('sections.skills.description')}
    >
      {/* min-w-0 on grid children stops the scrollable chip row from widening the page. */}
      <div className="grid items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10 [&>*]:min-w-0">
        <div className="flex flex-col gap-5">
          <DevOpsLoop
            activeId={activeId}
            onSelect={setActiveId}
            tabId={desktopTabId}
            panelId={panelId}
            onTabKeyDown={handleKeyDown(desktopTabId)}
          />

          <div
            role="tablist"
            aria-label={t('sections.skills.tablist')}
            className="-mx-4 flex snap-x [scrollbar-width:none] gap-2 overflow-x-auto px-4 pb-1 md:hidden"
          >
            {LOOP_STAGES.map((stage, i) => {
              const active = stage.id === activeId;
              return (
                <button
                  key={stage.id}
                  id={mobileTabId(stage.id)}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={panelId}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setActiveId(stage.id)}
                  onKeyDown={handleKeyDown(mobileTabId)}
                  className={cn(
                    'min-h-10 shrink-0 snap-start rounded-full border px-4 font-mono text-xs transition-colors',
                    active
                      ? 'border-accent/60 bg-accent/15 text-accent'
                      : 'border-border text-fg-muted',
                  )}
                >
                  <span className="text-fg-subtle">{i + 1}·</span>{' '}
                  {t(`sections.skills.stages.${stage.id}.short`)}
                </button>
              );
            })}
          </div>

          <p className="text-fg-subtle text-center font-mono text-xs">
            {t('sections.skills.summary', { skills: TOTAL_SKILLS, stages: ORDER.length })}
          </p>
        </div>

        <div
          id={panelId}
          role="tabpanel"
          aria-label={l(category.label)}
          tabIndex={0}
          className="border-border from-surface/90 to-void/40 relative overflow-hidden rounded-2xl border bg-linear-to-br p-5 shadow-[0_20px_60px_-30px_var(--color-accent)] backdrop-blur-md sm:p-6"
        >
          <span
            aria-hidden
            className="via-accent absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent to-transparent"
          />

          <m.div
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <p className="text-fg-subtle font-mono text-xs">
              {String(index + 1).padStart(2, '0')} / {String(ORDER.length).padStart(2, '0')}
            </p>
            <h3 className="mt-1 text-xl font-semibold">{l(category.label)}</h3>
            <p className="text-fg-muted mt-2 text-sm">
              {t(`sections.skills.stages.${category.id}.desc`)}
            </p>

            <ul className="mt-5 grid grid-cols-2 gap-2.5">
              {category.skills.map((skill) => {
                const hex = brandHex(skill.icon);
                const color = hex ? readableOnDark(hex) : 'var(--color-accent)';
                return (
                  <li
                    key={skill.name}
                    style={{ '--brand': color } as CSSProperties}
                    className="border-border/70 bg-elevated/40 flex min-w-0 items-center gap-2.5 rounded-xl border p-2.5 transition-colors hover:border-(--brand)"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--brand)_14%,transparent)] text-(--brand)">
                      <TechIcon name={skill.name} slug={skill.icon} className="size-5" />
                    </span>
                    <span className="text-fg min-w-0 text-sm leading-tight break-words">
                      {skill.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </m.div>
        </div>
      </div>
    </Section>
  );
}
