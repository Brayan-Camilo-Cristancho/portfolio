import { Fragment, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionDivider } from '@/components/layout/SectionDivider';
import { AboutSection } from '@/features/about/AboutSection';
import { ContactSection } from '@/features/contact/ContactSection';
import { ExperienceSection } from '@/features/experience/ExperienceSection';
import { HeroSection } from '@/features/hero/HeroSection';
import { ProjectsSection } from '@/features/projects/ProjectsSection';
import { ServicesSection } from '@/features/services/ServicesSection';
import { SkillsSection } from '@/features/skills/SkillsSection';
import { PipelinePill } from './PipelinePill';
import { SectionRail } from './SectionRail';

const SECTIONS: { id: string; labelKey: string; Component: ComponentType }[] = [
  { id: 'about', labelKey: 'nav.about', Component: AboutSection },
  { id: 'skills', labelKey: 'nav.skills', Component: SkillsSection },
  { id: 'projects', labelKey: 'nav.projects', Component: ProjectsSection },
  { id: 'services', labelKey: 'nav.services', Component: ServicesSection },
  { id: 'experience', labelKey: 'nav.experience', Component: ExperienceSection },
  { id: 'contact', labelKey: 'nav.contact', Component: ContactSection },
];

export function HomePage() {
  const { t } = useTranslation();
  const total = SECTIONS.length + 1;

  return (
    <>
      <HeroSection />
      {SECTIONS.map(({ id, labelKey, Component }, i) => (
        <Fragment key={id}>
          <SectionDivider index={i + 2} total={total} label={t(labelKey)} delay={i * 1.3} />
          <Component />
        </Fragment>
      ))}
      <SectionRail />
      <PipelinePill />
    </>
  );
}
