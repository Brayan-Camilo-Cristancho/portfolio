import type { Service } from '@/types/content';

export const services: Service[] = [
  {
    id: 'cicd',
    title: { es: 'Pipelines CI/CD', en: 'CI/CD pipelines' },
    description: {
      es: 'Diseño e implementación de pipelines confiables, desde el commit hasta producción.',
      en: 'Design and implementation of reliable pipelines, from commit to production.',
    },
    deliverables: {
      es: [
        'Jenkins, GitHub Actions o Azure DevOps',
        'Estrategia de ramas y ambientes',
        'Plantillas reutilizables',
      ],
      en: [
        'Jenkins, GitHub Actions or Azure DevOps',
        'Branching & environment strategy',
        'Reusable templates',
      ],
    },
  },
  {
    id: 'cloud',
    title: { es: 'Consultoría en nube y on-premise', en: 'Cloud & on-premise consulting' },
    description: {
      es: 'Arquitectura, contenerización y despliegue en AWS, Azure o tu propia infraestructura.',
      en: 'Architecture, containerization and deployment on AWS, Azure or your own infrastructure.',
    },
    deliverables: {
      es: ['Kubernetes y Helm', 'Migración a contenedores', 'Observabilidad con Grafana / Datadog'],
      en: ['Kubernetes & Helm', 'Containerization', 'Observability with Grafana / Datadog'],
    },
  },
  {
    id: 'automation',
    title: { es: 'Automatización de procesos', en: 'Process automation' },
    description: {
      es: 'Convierto tareas operativas manuales en herramientas de autoservicio.',
      en: 'I turn manual operational tasks into self-service tools.',
    },
    deliverables: {
      es: ['Scripts Python / Bash', 'Plantillas Backstage', 'Paneles de métricas DevOps'],
      en: ['Python / Bash scripts', 'Backstage templates', 'DevOps metrics dashboards'],
    },
  },
  {
    id: 'development',
    title: { es: 'Desarrollo de software', en: 'Software development' },
    description: {
      es: 'Aplicaciones web y APIs a la medida, pensadas desde el inicio para desplegarse bien.',
      en: 'Custom web applications and APIs, designed from day one to deploy well.',
    },
    deliverables: {
      es: ['Frontend React / Angular', 'APIs Node.js o Python', 'Bases de datos SQL y NoSQL'],
      en: ['React / Angular frontend', 'Node.js or Python APIs', 'SQL & NoSQL databases'],
    },
  },
];
