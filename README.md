# Brayan Cristancho · Portfolio

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-22-5FA04E?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![Cloudflare Turnstile](https://img.shields.io/badge/Bot_protection-Turnstile-F38020?logo=cloudflare&logoColor=white)](https://www.cloudflare.com/products/turnstile/)

My personal site as a DevOps engineer. It presents my experience, projects and services,
and doubles as a small engineering project in its own right: a typed React application,
a serverless contact API, a reproducible dev container and a deployment pipeline on Vercel.

The visual language mixes two things I spend a lot of time with: terminals and CI
pipelines. Navigation is a Jenkinsfile, the experience timeline reads like `git log`,
the skills section is the DevOps loop, and everything sits on an animated starfield.

## Highlights

- **Bilingual (ES / EN)** with `react-i18next`. Content is typed so a missing translation
  is a compile error, not a blank space in production.
- **Content as data.** Profile, projects, experience and skills live in `src/data` and the
  components only render them. Updating the site rarely means touching a component.
- **Pipeline navigation.** A side rail (desktop) and a floating pill (mobile) show each
  section as a CI stage: passed, running or pending, ending in `SUCCESS`.
- **Contact form** backed by a Vercel function: shared Zod validation on client and server,
  Cloudflare Turnstile, a honeypot field, per-IP rate limiting and delivery through Resend.
- **Accessibility.** Skip link, landmarks, visible focus, WAI-ARIA tabs with keyboard
  support, `inert` while the mobile menu is open, AA contrast checked against every
  surface, and full support for `prefers-reduced-motion`.
- **Responsive** from 320 px to wide desktop, verified with an automated overflow audit.
- **Performance.** The starfield is a single canvas with pre-rendered sprites that pauses
  on hidden tabs; the contact form, Zod and Turnstile load only when the visitor scrolls
  near them.

## Tech stack

| Area          | Tools                                                           |
| ------------- | --------------------------------------------------------------- |
| UI            | React 19, TypeScript, Tailwind CSS 4, Motion, Lucide icons      |
| Routing, i18n | React Router 7, i18next                                         |
| API           | Vercel Functions (Web `Request` / `Response`), Zod              |
| Services      | Cloudflare Turnstile, Resend                                    |
| Tooling       | Vite 7, ESLint 9 (flat config), Prettier, VS Code Dev Container |

## Getting started

### Option A: Dev Container (recommended)

Requires Docker and VS Code with the Dev Containers extension. No local Node.js needed.

1. Open the folder in VS Code and run **Dev Containers: Reopen in Container**.
2. Dependencies install automatically (`npm ci`).
3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open <http://localhost:5173>.

### Option B: Local Node.js

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

The contact API also runs locally: a small Vite plugin serves the functions in `api/` from
the dev server, so there is no need for the Vercel CLI during development.

## Environment variables

Copy `.env.example` to `.env.local`. Everything is optional in development:

| Variable                  | Scope  | Purpose                                                    |
| ------------------------- | ------ | ---------------------------------------------------------- |
| `VITE_TURNSTILE_SITE_KEY` | client | Turnstile site key. Falls back to Cloudflare's test key.   |
| `TURNSTILE_SECRET_KEY`    | server | Turnstile secret. Falls back to Cloudflare's test secret.  |
| `RESEND_API_KEY`          | server | Resend API key. Without it, messages are logged, not sent. |
| `CONTACT_TO_EMAIL`        | server | Inbox that receives the messages.                          |
| `CONTACT_FROM_EMAIL`      | server | Sender address on a domain verified in Resend.             |

Only variables prefixed with `VITE_` reach the browser bundle; secrets stay on the server.

## Scripts

| Command                | Description                                  |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Dev server with hot reload and the local API |
| `npm run build`        | Type-check and production build into `dist/` |
| `npm run preview`      | Serve the production build locally           |
| `npm run typecheck`    | TypeScript project references, no emit       |
| `npm run lint`         | ESLint                                       |
| `npm run format:check` | Prettier in check mode                       |

## Project structure

```
api/                    Vercel serverless functions
  contact.ts            POST /api/contact
src/
  app/                  App shell, navigation config, scroll management
  components/
    layout/             Navbar, sections, footer, dividers
    space/              Starfield, planets and astronaut (SVG / canvas)
    ui/                 Buttons, badges, cards, terminal windows
  data/                 Typed content: profile, projects, experience, skills
  features/             One folder per page section
  hooks/                Reusable hooks (scroll spy, media queries, ...)
  i18n/                 i18next setup and ES / EN locale files
  shared/               Code shared with the API (contact schema)
  styles/               Tailwind entry point and design tokens
docs/
  architecture.md       Design decisions and trade-offs
```

## Deployment

The site deploys to Vercel as a static Vite build plus the functions in `api/`.

1. Import the repository in Vercel. The Vite preset is detected automatically.
2. Add the environment variables above under **Project Settings > Environment Variables**.
3. In Cloudflare, create a Turnstile widget for the production domain.
4. In Resend, verify the sending domain, or use `onboarding@resend.dev` while testing.

`vercel.json` rewrites every non-API route to `index.html`, adds basic security headers
and sets long-lived caching for hashed assets.

## Architecture

The reasoning behind the main decisions (content model, scroll handling, the canvas
starfield, the contact flow, accessibility and performance trade-offs) is written up in
[docs/architecture.md](docs/architecture.md).

## Contact

- LinkedIn: [brayan-camilo-cristancho-franco](https://www.linkedin.com/in/brayan-camilo-cristancho-franco-714a94202/)
- Email: brayan.cristanchof@gmail.com
