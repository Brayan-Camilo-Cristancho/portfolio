import { m, type Variants } from 'motion/react';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { TechIcon } from '@/components/ui/TechIcon';
import { WindowChrome } from '@/components/ui/WindowChrome';
import { featuredSkills } from '@/data/skills';
import { brandHex } from '@/data/techIcons';
import { cn } from '@/lib/cn';
import { readableOnDark } from '@/lib/color';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
};

const tile: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

const toSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[()]/g, '')
    .trim()
    .replace(/[\s/]+/g, '-');

const TILES = featuredSkills.map((skill, index) => {
  const hex = brandHex(skill.icon);
  return {
    ...skill,
    slug: toSlug(skill.name),
    index: String(index + 1).padStart(2, '0'),
    color: hex ? readableOnDark(hex) : 'var(--color-accent)',
  };
});

export function TechMosaic({ className }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'border-border bg-void/70 overflow-hidden rounded-xl border font-mono backdrop-blur-md',
        className,
      )}
    >
      <div aria-hidden>
        <WindowChrome title="brayan@portfolio: ~/stack" />
      </div>

      <div className="relative p-3 sm:p-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_2px,rgb(255_255_255/0.03)_3px)]"
        />

        <p aria-hidden className="mb-3 text-xs sm:text-sm">
          <span className="text-success">brayan@portfolio</span>
          <span className="text-fg-subtle">:</span>
          <span className="text-accent">~</span>
          <span className="text-fg-subtle">$ </span>
          <span className="text-fg">ls ~/stack --icons</span>
        </p>

        <m.ul
          aria-label={t('hero.techLabel')}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6"
        >
          {TILES.map((skill) => (
            <m.li
              key={skill.name}
              variants={tile}

              style={{ '--brand': skill.color } as CSSProperties}
              className={cn(
                'group border-border/80 bg-surface/50 relative flex items-center gap-3 rounded-sm border px-3 py-2.5',
                'transition-[border-color,background-color,box-shadow] duration-200',
                'hover:border-(--brand) hover:bg-[color-mix(in_oklab,var(--brand)_8%,transparent)] hover:shadow-[0_0_20px_-8px_var(--brand)]',
              )}
            >
              <span aria-hidden className="text-fg-subtle absolute top-1 right-1.5 text-[0.6rem]">
                {skill.index}
              </span>

              <span
                aria-hidden
                className="absolute top-1/2 left-1 -translate-y-1/2 text-xs text-(--brand) opacity-0 transition-opacity group-hover:opacity-100"
              >
                ›
              </span>
              <TechIcon
                name={skill.name}
                slug={skill.icon}
                className="text-fg-muted size-6 shrink-0 transition-colors duration-200 group-hover:text-(--brand)"
              />
              <span className="min-w-0 text-xs leading-tight">
                <span
                  aria-hidden
                  className="text-fg-muted group-hover:text-fg block break-words transition-colors"
                >
                  {skill.slug}

                  {/* The cursor always reserves its width; toggling display would reflow long names. */}
                  <span className="group-hover:animate-blink ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-(--brand) opacity-0 group-hover:opacity-100" />
                </span>
                <span className="sr-only">{skill.name}</span>
              </span>
            </m.li>
          ))}
        </m.ul>
      </div>

      <div
        aria-hidden
        className="border-border bg-surface/80 text-fg-muted flex items-center gap-3 border-t text-[0.7rem]"
      >
        <span className="bg-success/15 text-success px-3 py-1.5">[0] stack</span>
        <span>{t('hero.techCount', { count: TILES.length })}</span>
        <span className="ml-auto hidden pr-3 sm:inline">utf-8 · lf · main</span>
      </div>
    </div>
  );
}
