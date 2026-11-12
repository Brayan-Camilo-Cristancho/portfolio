import { Briefcase, FolderGit2, Layers, Mail, User, Wrench, type LucideIcon } from 'lucide-react';
import { experience } from '@/data/experience';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { skillCategories } from '@/data/skills';

export interface NavItem {
  id: string;
  labelKey: string;
  icon: LucideIcon;
  count?: number;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'about', labelKey: 'nav.about', icon: User },
  {
    id: 'skills',
    labelKey: 'nav.skills',
    icon: Layers,
    count: skillCategories.reduce((total, c) => total + c.skills.length, 0),
  },
  { id: 'projects', labelKey: 'nav.projects', icon: FolderGit2, count: projects.length },
  { id: 'services', labelKey: 'nav.services', icon: Wrench, count: services.length },
  { id: 'experience', labelKey: 'nav.experience', icon: Briefcase, count: experience.length },
  { id: 'contact', labelKey: 'nav.contact', icon: Mail },
];

export const sectionTo = (id: string) => ({ pathname: '/', hash: `#${id}` });

export const SECTION_IDS: readonly string[] = ['top', ...NAV_ITEMS.map((item) => item.id)];
