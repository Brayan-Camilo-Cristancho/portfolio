import type { Project } from '@/types/content';

// Every project follows the same shape: problem, solution and measurable impact.
export const projects: Project[] = [
  {
    slug: 'devops-metrics-platform',
    featured: true,
    title: {
      es: 'Plataforma de métricas DevOps',
      en: 'DevOps Metrics Platform',
    },
    context: { es: 'Banco de Occidente', en: 'Banco de Occidente' },
    problem: {
      es: 'Obtener indicadores de entrega (despliegues por ambiente, tasa de éxito, tiempos, tipos de entregable) exigía consultar Jenkins y GitHub manualmente, sin una vista centralizada para la toma de decisiones.',
      en: 'Getting delivery indicators (deployments per environment, success rate, timings, deliverable types) required manually querying Jenkins and GitHub, with no centralized view for decision-making.',
    },
    solution: {
      es: 'Automaticé la extracción de métricas desde las APIs de Jenkins y GitHub, la categorización de entregables (pipelines, repositorios, etc.) y su visualización en un panel con filtros por año, chapter, ambiente y aplicación.',
      en: 'I automated metric extraction from the Jenkins and GitHub APIs, the categorization of deliverables (pipelines, repositories, etc.) and their visualization in a dashboard filterable by year, chapter, environment and application.',
    },
    role: { es: 'Diseño e implementación', en: 'Design and implementation' },
    stack: ['Jenkins API', 'GitHub API', 'TypeScript', 'Express', 'Power BI'],
    impact: [
      {
        label: { es: 'Tiempo por tarea DevOps automatizada', en: 'Time per automated DevOps task' },
        before: { es: '5–10 min', en: '5–10 min' },
        after: { es: '≈ 1 min', en: '≈ 1 min' },
        improvement: '-80–90%',
        minutes: { before: 7.5, after: 1 }, // midpoint of the 5-10 min range
      },
      {
        label: { es: 'Tiempo para obtener métricas', en: 'Time to obtain metrics' },
        before: { es: '10–20 min manuales', en: '10–20 min manual' },
        after: { es: '≈ 1 min (panel)', en: '≈ 1 min (dashboard)' },
        improvement: '-90–95%',
        minutes: { before: 15, after: 1 },
      },
    ],
    // Sin capturas reales: son datos internos del banco.
  },
  {
    slug: 'repo-pipeline-scaffolding',
    featured: true,
    title: {
      es: 'Aprovisionamiento automático de repositorios y pipelines',
      en: 'Automated repository & pipeline provisioning',
    },
    context: { es: 'Banco de Occidente', en: 'Banco de Occidente' },
    problem: {
      es: 'Crear un repositorio nuevo implicaba configurar a mano GitHub, las ramas según la estrategia de la organización, la estructura de carpetas y los pipelines de cada ambiente: cerca de una hora por proyecto y riesgo de incumplir lineamientos.',
      en: "Creating a new repository meant manually configuring GitHub, branches per the organization's strategy, folder structure and per-environment pipelines: about an hour per project and a risk of breaking guidelines.",
    },
    solution: {
      es: 'Desarrollé en JavaScript una plantilla de autoservicio integrada a Backstage que crea el repositorio en GitHub con sus ramas, la estructura de carpetas y los pipelines por ambiente, según los lineamientos del banco.',
      en: "I built a JavaScript self-service template integrated into Backstage that creates the GitHub repository with its branches, folder structure and per-environment pipelines, following the bank's guidelines.",
    },
    role: { es: 'Diseño e implementación', en: 'Design and implementation' },
    stack: ['Backstage', 'JavaScript', 'Node.js', 'GitHub'],
    impact: [
      {
        label: { es: 'Configuración de un repositorio nuevo', en: 'New repository setup' },
        before: { es: '≈ 1 hora', en: '≈ 1 hour' },
        after: { es: '2 min', en: '2 min' },
        improvement: '-97%',
        minutes: { before: 60, after: 2 },
      },
    ],
  },
  {
    slug: 'jenkinsfile-rules-engine',
    featured: true,
    title: {
      es: 'Motor de reglas para Jenkinsfiles',
      en: 'Jenkinsfile rules engine',
    },
    context: { es: 'Banco de Occidente', en: 'Banco de Occidente' },
    problem: {
      es: 'Aplicar un cambio a muchos Jenkinsfiles se hacía archivo por archivo: hasta 2 horas de trabajo manual y propenso a inconsistencias.',
      en: 'Applying a change across many Jenkinsfiles was done file by file: up to 2 hours of manual work and prone to inconsistencies.',
    },
    solution: {
      es: 'Desarrollé un motor de reglas en Jenkins que aplica cambios masivos a los Jenkinsfiles en unos 5 minutos, sin importar la cantidad de archivos.',
      en: 'I built a Jenkins rules engine that applies bulk changes to Jenkinsfiles in about 5 minutes, regardless of how many files there are.',
    },
    role: { es: 'Diseño e implementación', en: 'Design and implementation' },
    stack: ['Jenkins', 'TypeScript', 'GitHub'],
    impact: [
      {
        label: { es: 'Actualización masiva de Jenkinsfiles', en: 'Bulk Jenkinsfile update' },
        before: { es: 'hasta 2 horas', en: 'up to 2 hours' },
        after: { es: '≈ 5 min', en: '≈ 5 min' },
        improvement: '-96%',
        minutes: { before: 120, after: 5 },
      },
    ],
  },
  {
    slug: 'deployment-scaffolding-python',
    featured: true,
    title: {
      es: 'Generador de estructura y pipelines de despliegue',
      en: 'Deployment structure & pipeline generator',
    },
    context: { es: 'GSE', en: 'GSE' },
    problem: {
      es: 'Montar la estructura de carpetas y los pipelines de despliegue de un proyecto nuevo tomaba hasta una hora, y los pipelines en Bash sin validaciones introducían errores manuales frecuentes.',
      en: 'Setting up the folder structure and deployment pipelines for a new project took up to an hour, and Bash pipelines without validations introduced frequent manual errors.',
    },
    solution: {
      es: 'Desarrollé una automatización en Python que genera la estructura y los pipelines de despliegue (Azure DevOps), y optimicé los pipelines en Bash con validaciones automáticas.',
      en: 'I built a Python automation that generates the structure and deployment pipelines (Azure DevOps), and optimized the Bash pipelines with automated validations.',
    },
    role: { es: 'Diseño e implementación', en: 'Design and implementation' },
    stack: ['Python', 'Bash', 'Azure DevOps', 'Linux'],
    impact: [
      {
        label: { es: 'Montaje de un proyecto nuevo', en: 'New project setup' },
        before: { es: 'hasta 1 hora', en: 'up to 1 hour' },
        after: { es: '2 min', en: '2 min' },
        improvement: '-97%',
        minutes: { before: 60, after: 2 },
      },
      {
        label: { es: 'Errores manuales en pipelines', en: 'Manual pipeline errors' },
        before: { es: 'Frecuentes', en: 'Frequent' },
        after: { es: 'Mínimos', en: 'Minimal' },
        improvement: '-90%',
      },
    ],
  },
  {
    slug: 'k8s-on-premise-lab',
    featured: true,
    title: {
      es: 'Laboratorio Kubernetes on-premise',
      en: 'On-premise Kubernetes lab',
    },
    context: { es: 'Proyecto personal', en: 'Personal project' },
    problem: {
      es: 'Dominar Kubernetes de verdad exige operar un clúster propio, no solo servicios gestionados: red, almacenamiento, alta disponibilidad y herramientas de plataforma.',
      en: 'Truly mastering Kubernetes requires operating your own cluster, not just managed services: networking, storage, high availability and platform tooling.',
    },
    solution: {
      es: 'Monté un hipervisor sobre Arch Linux con KVM/QEMU y libvirt que levanta un clúster de Kubernetes con kubeadm, ejecutando Jenkins, Grafana y réplicas de MongoDB. Es además mi ruta de estudio hacia Kubestronaut (KCNA, CKAD, CKA, KCSA, CKS).',
      en: 'I built a hypervisor on Arch Linux with KVM/QEMU and libvirt that provisions a kubeadm Kubernetes cluster running Jenkins, Grafana and MongoDB replica sets. It is also my study path toward Kubestronaut (KCNA, CKAD, CKA, KCSA, CKS).',
    },
    role: { es: 'Autor', en: 'Author' },
    stack: [
      'Arch Linux',
      'KVM/QEMU',
      'libvirt',
      'Kubernetes',
      'kubeadm',
      'Jenkins',
      'Grafana',
      'MongoDB',
    ],
    impact: [],
    links: { repo: 'https://github.com/Brayan-Camilo-Cristancho/k8s-on-premise-2.0' },
  },
];
