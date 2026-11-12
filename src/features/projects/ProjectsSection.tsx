import { useTranslation } from 'react-i18next';
import { Section } from '@/components/layout/Section';
import { projects } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { RockyPlanet } from '@/components/space/planets';

export function ProjectsSection() {
  const { t } = useTranslation();

  return (
    <Section
      id="projects"
      eyebrow="kubectl get deployments"
      decor={
        <RockyPlanet className="animate-float-slow absolute bottom-[10%] -left-32 hidden w-60 opacity-70 md:block" />
      }
      title={t('sections.projects.title')}
      description={t('sections.projects.description')}
    >
      {/* auto-rows-fr keeps every card the same height. */}
      <ul className="grid gap-4 md:auto-rows-fr md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </ul>
    </Section>
  );
}
