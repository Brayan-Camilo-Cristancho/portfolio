/* eslint-disable react-refresh/only-export-components --
 * This module is data (the command registry) that happens to contain JSX, not a component.
 */
import type { TFunction } from 'i18next';
import type { ReactNode } from 'react';
import { NAV_ITEMS } from '@/app/navigation';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { SUPPORTED_LANGUAGES, type Language } from '@/i18n';
import { ExternalLink } from './ExternalLink';
import type { Localized } from '@/types/content';

export const CLEAR = Symbol('clear');

export interface CommandContext {
  t: TFunction;
  l: <T>(value: Localized<T>) => T;
  language: Language;
  changeLanguage: (lng: Language) => void;
  scrollToSection: (id: string) => void;
}

export interface TerminalCommand {
  name: string;
  hidden?: boolean;
  run: (args: string[], ctx: CommandContext) => ReactNode | typeof CLEAR;
}

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

// Command registry: the terminal only looks commands up by name and calls `run`.
export const COMMANDS: TerminalCommand[] = [
  {
    name: 'help',
    run: (_args, { t }) => (
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5">
        {COMMANDS.filter((c) => !c.hidden).map((c) => (
          <div key={c.name} className="contents">
            <dt className="text-accent">{c.name}</dt>
            <dd>{t(`terminal.commands.${c.name}`)}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    name: 'whoami',
    run: (_args, { l }) => (
      <div>
        <p className="text-fg font-semibold">{profile.name}</p>
        <p className="text-nebula">{profile.role}</p>
        <p>{l(profile.tagline)}</p>
        <p className="text-fg-subtle">📍 {l(profile.location)}</p>
      </div>
    ),
  },
  {
    name: 'skills',
    run: (_args, { l }) => (
      <ul>
        {skillCategories.map((category) => (
          <li key={category.id}>
            <span className="text-accent">{l(category.label)}:</span>{' '}
            {category.skills.map((s) => s.name).join(', ')}
          </li>
        ))}
      </ul>
    ),
  },
  {
    name: 'projects',
    run: (_args, { t, l }) => (
      <div>
        <ul>
          {projects.map((project) => (
            <li key={project.slug}>
              <span className="text-success">▸</span>{' '}
              <span className="text-fg">{l(project.title)}</span>
              {project.impact[0] && (
                <span className="text-success"> ({l(project.impact[0].improvement)})</span>
              )}
            </li>
          ))}
        </ul>
        <p className="text-fg-subtle mt-1">{t('terminal.projectsHint')}</p>
      </div>
    ),
  },
  {
    name: 'contact',
    run: () => (
      <ul>
        <li>
          email:{' '}
          <a
            href={`mailto:${profile.email}`}
            className="text-accent underline-offset-4 hover:underline"
          >
            {profile.email}
          </a>
        </li>
        <li>
          github: <ExternalLink href={profile.links.github}>Brayan-Camilo-Cristancho</ExternalLink>
        </li>
        <li>
          linkedin:{' '}
          <ExternalLink href={profile.links.linkedin}>brayan-camilo-cristancho</ExternalLink>
        </li>
      </ul>
    ),
  },
  {
    name: 'cd',
    run: ([target], { t, scrollToSection }) => {
      const id = target?.replace(/^#/, '').toLowerCase();
      if (!id || !SECTION_IDS.includes(id)) {
        return t('terminal.cd.usage', { list: SECTION_IDS.join(', ') });
      }
      scrollToSection(id);
      return t('terminal.cd.ok', { id });
    },
  },
  {
    name: 'lang',
    run: ([target], { t, language, changeLanguage }) => {
      const lng = target?.toLowerCase();
      if (!lng || !(SUPPORTED_LANGUAGES as readonly string[]).includes(lng)) {
        return t('terminal.lang.current', { lng: language });
      }
      changeLanguage(lng as Language);
      return t('terminal.lang.ok', { lng });
    },
  },
  {
    name: 'clear',
    run: () => CLEAR,
  },
  {
    name: 'sudo',
    hidden: true,
    run: (_args, { t }) => t('terminal.sudo'),
  },
];

export const COMMAND_NAMES = COMMANDS.filter((c) => !c.hidden).map((c) => c.name);
