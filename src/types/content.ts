/** A value in every supported language; a missing translation fails type-checking. */
export type Localized<T = string> = { es: T; en: T };

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  tagline: Localized;
  summary: Localized;
  location: Localized;
  email: string;
  links: { github: string; linkedin: string; codersrank?: string };
}

export type SkillCategoryId =
  'containers' | 'cicd' | 'cloud' | 'observability' | 'os' | 'automation' | 'development';

export interface Skill {
  name: string;
  icon?: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: SkillCategoryId;
  label: Localized;
  skills: Skill[];
}

export interface ImpactMetric {
  label: Localized;
  before: Localized;
  after: Localized;
  /** Plain-language result, e.g. "97% less time". */
  improvement: Localized;
  /** Numeric values in minutes, used to draw the comparison bars. */
  minutes?: { before: number; after: number };
}

export interface Project {
  slug: string;
  title: Localized;
  context: Localized;
  problem: Localized;
  solution: Localized;
  role: Localized;
  stack: string[];
  impact: ImpactMetric[];
  links?: { repo?: string; demo?: string };
  images?: { src: string; alt: Localized }[];
  featured?: boolean;
}

export interface Service {
  id: string;
  title: Localized;
  description: Localized;
  deliverables: Localized<string[]>;
}

export interface Experience {
  /** Generic description of the organization; company names are not published. */
  org: Localized;
  role: Localized;
  start: string;
  end?: string;
  location: string;
  highlights: Localized<string[]>;
  stack: string[];
}

export interface Education {
  institution: string;
  degree: Localized;
  start: string;
  end?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  featured?: boolean;
  /** Shown as in progress, never as earned. */
  inProgress?: boolean;
}
