import type { Project } from '@/types/content';

// Every project follows the same shape: problem, solution and measurable impact.
// Client and employer names are intentionally left out.
const professional = { es: 'Proyecto profesional', en: 'Professional project' };

export const projects: Project[] = [
  {
    slug: 'devops-metrics-platform',
    featured: true,
    title: {
      es: 'Panel de métricas de entrega de software',
      en: 'Software delivery metrics dashboard',
    },
    context: professional,
    problem: {
      es: 'Para saber cuántos despliegues se hacían, cuántos fallaban o cuánto tardaban, alguien tenía que revisar a mano Jenkins y GitHub y armar el reporte. Cada consulta tomaba entre 10 y 20 minutos y no había un lugar único donde ver los datos.',
      en: 'Knowing how many deployments ran, how many failed or how long they took meant someone checking Jenkins and GitHub by hand and putting a report together. Each query took 10 to 20 minutes and there was no single place to see the data.',
    },
    solution: {
      es: 'Un servicio que consulta automáticamente las APIs de Jenkins y GitHub, clasifica cada entregable (pipelines, repositorios, etc.) y alimenta un panel en Power BI con filtros por año, equipo, ambiente y aplicación.',
      en: 'A service that automatically queries the Jenkins and GitHub APIs, classifies each deliverable (pipelines, repositories, etc.) and feeds a Power BI dashboard filterable by year, team, environment and application.',
    },
    role: { es: 'Diseño e implementación', en: 'Design and implementation' },
    stack: ['Jenkins API', 'GitHub API', 'TypeScript', 'Express', 'Power BI'],
    impact: [
      {
        label: { es: 'Tiempo para obtener las métricas', en: 'Time to get the metrics' },
        before: { es: '10–20 min a mano', en: '10–20 min by hand' },
        after: { es: '≈ 1 min', en: '≈ 1 min' },
        improvement: { es: '90% menos tiempo', en: '90% less time' },
        minutes: { before: 15, after: 1 },
      },
    ],
  },
  {
    slug: 'repo-pipeline-scaffolding',
    featured: true,
    title: {
      es: 'Creación automática de repositorios y pipelines',
      en: 'Automated repository and pipeline setup',
    },
    context: professional,
    problem: {
      es: 'Cada proyecto nuevo necesitaba su repositorio en GitHub, sus ramas, una estructura de carpetas y un pipeline por ambiente, todo configurado a mano. Tomaba cerca de una hora y era fácil saltarse alguna regla del equipo.',
      en: 'Every new project needed its GitHub repository, branches, folder structure and one pipeline per environment, all configured by hand. It took about an hour and it was easy to miss one of the team rules.',
    },
    solution: {
      es: 'Una plantilla de autoservicio en Backstage, escrita en JavaScript: el desarrollador llena un formulario y obtiene el repositorio listo, con ramas, estructura y pipelines que ya cumplen las reglas.',
      en: 'A self-service Backstage template written in JavaScript: a developer fills in a form and gets the repository ready, with branches, structure and pipelines that already follow the rules.',
    },
    role: { es: 'Diseño e implementación', en: 'Design and implementation' },
    stack: ['Backstage', 'JavaScript', 'Node.js', 'GitHub'],
    impact: [
      {
        label: { es: 'Configurar un repositorio nuevo', en: 'Setting up a new repository' },
        before: { es: '≈ 1 hora', en: '≈ 1 hour' },
        after: { es: '2 min', en: '2 min' },
        improvement: { es: '97% menos tiempo', en: '97% less time' },
        minutes: { before: 60, after: 2 },
      },
    ],
  },
  {
    slug: 'jenkinsfile-rules-engine',
    featured: true,
    title: {
      es: 'Cambios masivos en pipelines de Jenkins',
      en: 'Bulk changes to Jenkins pipelines',
    },
    context: professional,
    problem: {
      es: 'Cuando había que cambiar algo en todos los pipelines (una versión, un paso nuevo), se editaba cada Jenkinsfile uno por uno. Podía tomar hasta 2 horas y siempre quedaba alguno distinto.',
      en: 'When something had to change in every pipeline (a version, a new step), each Jenkinsfile was edited one by one. It could take up to 2 hours and one of them always ended up different.',
    },
    solution: {
      es: 'Un motor de reglas en Jenkins: se describe el cambio una sola vez y se aplica a todos los Jenkinsfiles en unos 5 minutos, sin importar cuántos sean.',
      en: 'A rules engine in Jenkins: the change is described once and applied to every Jenkinsfile in about 5 minutes, however many there are.',
    },
    role: { es: 'Diseño e implementación', en: 'Design and implementation' },
    stack: ['Jenkins', 'TypeScript', 'GitHub'],
    impact: [
      {
        label: { es: 'Actualizar todos los pipelines', en: 'Updating every pipeline' },
        before: { es: 'hasta 2 horas', en: 'up to 2 hours' },
        after: { es: '≈ 5 min', en: '≈ 5 min' },
        improvement: { es: '96% menos tiempo', en: '96% less time' },
        minutes: { before: 120, after: 5 },
      },
    ],
  },
  {
    slug: 'deployment-scaffolding-python',
    featured: true,
    title: {
      es: 'Generador de proyectos listos para desplegar',
      en: 'Deploy-ready project generator',
    },
    context: professional,
    problem: {
      es: 'Preparar un proyecto nuevo para desplegarlo (carpetas, scripts y pipelines) tomaba hasta una hora. Además, los scripts de despliegue no validaban nada, así que los errores humanos llegaban hasta los ambientes.',
      en: 'Getting a new project ready to deploy (folders, scripts and pipelines) took up to an hour. On top of that, the deployment scripts validated nothing, so human mistakes reached the environments.',
    },
    solution: {
      es: 'Una herramienta en Python que genera la estructura y los pipelines de despliegue en Azure DevOps, y validaciones automáticas en los scripts de Bash que detienen el despliegue antes de que un error llegue a un ambiente.',
      en: 'A Python tool that generates the structure and deployment pipelines in Azure DevOps, plus automated checks in the Bash scripts that stop a deployment before a mistake reaches an environment.',
    },
    role: { es: 'Diseño e implementación', en: 'Design and implementation' },
    stack: ['Python', 'Bash', 'Azure DevOps', 'Linux'],
    impact: [
      {
        label: { es: 'Preparar un proyecto nuevo', en: 'Preparing a new project' },
        before: { es: 'hasta 1 hora', en: 'up to 1 hour' },
        after: { es: '2 min', en: '2 min' },
        improvement: { es: '97% menos tiempo', en: '97% less time' },
        minutes: { before: 60, after: 2 },
      },
      {
        label: { es: 'Errores manuales en despliegues', en: 'Manual deployment errors' },
        before: { es: 'Frecuentes', en: 'Frequent' },
        after: { es: 'Casi ninguno', en: 'Almost none' },
        improvement: { es: '90% menos errores', en: '90% fewer errors' },
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
