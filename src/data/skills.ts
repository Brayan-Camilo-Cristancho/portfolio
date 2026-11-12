import type { SkillCategory } from '@/types/content';

export const skillCategories: SkillCategory[] = [
  {
    id: 'containers',
    label: { es: 'Contenedores y orquestación', en: 'Containers & orchestration' },
    skills: [
      { name: 'Kubernetes', icon: 'kubernetes', featured: true },
      { name: 'Helm', icon: 'helm', featured: true },
      { name: 'Docker', icon: 'docker', featured: true },
      { name: 'Podman', icon: 'podman', featured: true },
      { name: 'Docker Compose', icon: 'docker' },
    ],
  },
  {
    id: 'cicd',
    label: { es: 'CI/CD', en: 'CI/CD' },
    skills: [
      { name: 'Jenkins', icon: 'jenkins', featured: true },
      { name: 'GitHub Actions', icon: 'githubactions', featured: true },
      { name: 'Azure DevOps', featured: true },
      { name: 'GitLab CI', icon: 'gitlab' },
      { name: 'Backstage', icon: 'backstage', featured: true },
    ],
  },
  {
    id: 'cloud',
    label: { es: 'Nube', en: 'Cloud' },
    skills: [
      { name: 'AWS', featured: true },
      { name: 'Azure', featured: true },
      { name: 'Google Cloud', icon: 'googlecloud' },
      { name: 'Oracle Cloud' },
    ],
  },
  {
    id: 'observability',
    label: { es: 'Observabilidad', en: 'Observability' },
    skills: [
      { name: 'Grafana', icon: 'grafana', featured: true },
      { name: 'Datadog', icon: 'datadog', featured: true },
      { name: 'Zabbix', featured: true },
      { name: 'Power BI' },
    ],
  },
  {
    id: 'os',
    label: { es: 'Sistemas y virtualización', en: 'Systems & virtualization' },
    skills: [
      { name: 'Linux (Red Hat)', icon: 'redhat', featured: true },
      { name: 'Arch Linux', icon: 'archlinux' },
      { name: 'KVM / QEMU', icon: 'qemu' },
      { name: 'libvirt' },
      { name: 'Nginx', icon: 'nginx' },
    ],
  },
  {
    id: 'automation',
    label: { es: 'Automatización y scripting', en: 'Automation & scripting' },
    skills: [
      { name: 'Python', icon: 'python', featured: true },
      { name: 'Bash', icon: 'gnubash', featured: true },
      { name: 'TypeScript', icon: 'typescript', featured: true },
    ],
  },
  {
    id: 'development',
    label: { es: 'Desarrollo de software', en: 'Software development' },
    skills: [
      { name: 'Node.js / Express', icon: 'nodedotjs' },
      { name: 'React', icon: 'react' },
      { name: 'Angular', icon: 'angular' },
      { name: 'Flask / Django', icon: 'django' },
      { name: 'Java / Spring', icon: 'spring' },
      { name: 'C# (.NET)', icon: 'dotnet' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'MongoDB', icon: 'mongodb' },
    ],
  },
];

export const featuredSkills = skillCategories.flatMap((c) => c.skills.filter((s) => s.featured));
