import type { Education, Experience } from '@/types/content';

export const experience: Experience[] = [
  {
    company: 'GSE',
    role: { es: 'Ingeniero DevOps', en: 'DevOps Engineer' },
    start: '2026-02',
    end: '2026-11',
    location: 'Bogotá',
    highlights: {
      es: [
        'Diseñé e implementé los flujos de despliegue CI/CD de los aplicativos con Azure DevOps y Bash, para QA, preproducción y producción.',
        'Automatización en Python que genera la estructura de carpetas y los pipelines: montar un proyecto pasó de hasta 1 hora a 2 minutos.',
        'Optimicé los pipelines en Bash con validaciones automáticas y reduje en 90% los errores manuales.',
        'Mantuve y aprovisioné clústeres de Kubernetes y contenedores Docker; validé la estrategia de despliegue para cada lenguaje.',
        'Análisis de causa raíz de fallas en despliegues e infraestructura, y mantenimiento del datacenter on-premise.',
        'Monitoreo de servicios e infraestructura con Grafana y Datadog.',
      ],
      en: [
        'Designed and implemented CI/CD deployment flows with Azure DevOps and Bash across QA, pre-production and production.',
        'Python automation that generates folder structure and pipelines: setting up a project went from up to 1 hour to 2 minutes.',
        'Optimized Bash pipelines with automated validations, cutting manual errors by 90%.',
        'Maintained and provisioned Kubernetes clusters and Docker containers; validated the deployment strategy per language.',
        'Root-cause analysis of deployment and infrastructure failures, and on-premise datacenter maintenance.',
        'Service and infrastructure monitoring with Grafana and Datadog.',
      ],
    },
    stack: [
      'Azure DevOps',
      'Kubernetes',
      'Docker',
      'Bash',
      'Python',
      'Linux',
      'Grafana',
      'Datadog',
    ],
  },
  {
    company: 'Banco de Occidente',
    role: { es: 'Analista DevOps (profesional en entrenamiento)', en: 'DevOps Analyst (trainee)' },
    start: '2025-07',
    end: '2026-01',
    location: 'Bogotá',
    highlights: {
      es: [
        'Plataforma que centraliza las APIs de Jenkins y GitHub en un panel de Power BI: obtener las métricas de DevOps pasó de hasta 20 minutos a 1 minuto.',
        'Plantilla de autoservicio en Backstage que crea repositorios con ramas, estructura y pipelines por ambiente: de 1 hora a 2 minutos.',
        'Motor de reglas en Jenkins que aplica cambios masivos a los Jenkinsfiles en unos 5 minutos (antes hasta 2 horas).',
        'Despliegues en AWS (ECS, ECR, S3) con los lineamientos de seguridad y trazabilidad del banco, con Scrum y Scrumban.',
      ],
      en: [
        'Platform centralizing the Jenkins and GitHub APIs into a Power BI dashboard: getting DevOps metrics went from up to 20 minutes to 1 minute.',
        'Backstage self-service template that creates repositories with branches, structure and per-environment pipelines: from 1 hour to 2 minutes.',
        'Jenkins rules engine that applies bulk Jenkinsfile changes in about 5 minutes (previously up to 2 hours).',
        "Deployments on AWS (ECS, ECR, S3) following the bank's security and traceability guidelines, with Scrum and Scrumban.",
      ],
    },
    stack: [
      'Jenkins',
      'GitHub Actions',
      'GitLab',
      'Backstage',
      'JavaScript',
      'TypeScript',
      'Node.js',
      'AWS',
      'Azure AD',
      'Power BI',
    ],
  },
  {
    company: 'Grupo Cubo Ltda',
    role: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
    start: '2023-12',
    end: '2025-02',
    location: 'Bogotá',
    highlights: {
      es: [
        'Sistema en Python (Flask, Pandas, NumPy) sobre PostgreSQL que automatizó cálculos manuales de un proceso gubernamental.',
        'Infraestructura de ese sistema en Azure con Docker Compose, Nginx como proxy inverso y VPN site-to-site; interfaz en Angular.',
        'Optimización de consultas de un sistema hospitalario (índices y normalización), API REST en Node.js y dashboard en React.',
        'Dashboard de KPIs en Django con análisis de texto (NLTK) sobre MySQL para una startup, validado con Pytest.',
        'Integré CI/CD con GitHub Actions en los proyectos del equipo y mantuve un sistema legacy en C# (.NET).',
      ],
      en: [
        'Python system (Flask, Pandas, NumPy) on PostgreSQL that automated the manual calculations of a government process.',
        'Infrastructure for that system on Azure with Docker Compose, Nginx reverse proxy and site-to-site VPN; Angular UI.',
        'Query optimization for a hospital system (indexes and normalization), Node.js REST API and React dashboard.',
        'Django KPI dashboard with text analysis (NLTK) on MySQL for a startup, validated with Pytest.',
        "Integrated CI/CD with GitHub Actions across the team's projects and maintained a legacy C# (.NET) system.",
      ],
    },
    stack: [
      'Python',
      'Node.js',
      'C# (.NET)',
      'Angular',
      'React',
      'PostgreSQL',
      'MySQL',
      'Azure',
      'Docker',
      'Nginx',
      'GitHub Actions',
    ],
  },
  {
    company: 'Freelance',
    role: { es: 'Desarrollador de software', en: 'Software Developer' },
    start: '2022-01',
    end: '2023-12',
    location: 'Bogotá',
    highlights: {
      es: [
        'Aplicaciones web y de escritorio para clientes empresariales y académicos, con patrones de diseño y metodologías ágiles.',
        'Chatbot en Python con fine-tuning de un modelo destilado de DeepSeek; dataset generado con web scraping en Selenium.',
        'Despliegue de aplicaciones en plataformas cloud con prácticas DevOps.',
      ],
      en: [
        'Web and desktop applications for business and academic clients, using design patterns and agile methodologies.',
        'Python chatbot fine-tuning a distilled DeepSeek model; dataset generated with Selenium web scraping.',
        'Deployed applications to cloud platforms following DevOps practices.',
      ],
    },
    stack: ['Python', 'TensorFlow', 'Pandas', 'scikit-learn', 'Selenium', 'Java'],
  },
];

export const education: Education[] = [
  {
    institution: 'Universidad El Bosque',
    degree: { es: 'Ingeniería de Sistemas', en: 'B.Sc. Systems Engineering' },
    start: '2019-01',
    end: '2026-12',
  },
];
