# Architecture

Notes on how the site is built and why. The code comments stay short; the reasoning
lives here.

## Content model

All content is typed data in `src/data`, and components only render it. Text that changes
with the language uses `Localized<T> = { es: T; en: T }`, so a missing translation fails
type-checking instead of showing up empty in production. Interface strings (buttons,
labels, errors) live in the i18next locale files.

Derived values are never written twice: the skill and project counters in the navbar, the
"years in tech" figure and the featured technology mosaic are all computed from the data.

## Navigation and scrolling

The site is a single page; React Router only serves the 404 route.

- **Section links** always point to `/#section`. One component, `ScrollManager`, decides
  what to do with the URL: scroll to the hash, reset to the top on a new route, or leave
  back/forward navigation to the browser. On first load the page always starts at the top
  and any stale hash is dropped.
- **Scroll-spy** (`useActiveSection`) uses an `IntersectionObserver` with a thin band in
  the middle of the viewport, instead of measuring on every scroll event. At the very
  bottom of the page the last section is forced active, because a short final section
  never reaches that band.
- The **pipeline navigation** (side rail and mobile pill) reads the same scroll-spy, so
  the navbar, the rail and the pill can never disagree.

## Visual layer

- **Starfield.** A single fixed `<canvas>` behind the whole page. Stars are grouped in depth
  layers with mouse and scroll parallax. Halos and sparkles are pre-rendered once into small
  off-screen canvases and stamped with `drawImage`, which is much cheaper than building a
  gradient per star per frame. Animation state lives in plain variables, not React state,
  and the loop stops while the tab is hidden.
- **Planets and astronaut** are hand-written SVG. A shared `Sphere` component handles the
  lighting (atmosphere, body gradient, clipped details, night-side shade). Rings use one
  ellipse clipped twice, back half before the body and front half after it; the orbiting
  moon is masked out over the back half of the disc.
- **Animations** use the individual `translate` and `rotate` properties, so they compose
  with the `transform` set by the parallax layers. Motion is loaded through `LazyMotion`
  with only the DOM animation features.
- Each section has its own visual language within the theme (terminal windows, the DevOps
  loop, CI run cards, a `git log` timeline) to avoid repeating one pattern everywhere.

## Contact flow

```
Browser                          Vercel function                 Services
ContactForm  --POST /api/contact-->  api/contact.ts  ----------->  Turnstile (siteverify)
  Zod (UX)                             Zod (security)  --------->  Resend (email)
```

- One Zod schema in `src/shared/contact.ts` is used on both sides. The client validates
  for fast feedback; the server validates again because the endpoint can be called
  directly. Error messages are i18n keys, translated by the client.
- The function checks content type and size, applies a per-IP rate limit, validates,
  verifies the Turnstile token and sends the email through Resend's REST API. User input
  is HTML-escaped before it reaches the email body, and `reply_to` is the sender's address.
- A honeypot field catches simple bots. When it is filled the API answers with a fake
  success so the bot learns nothing.
- The rate limiter is in memory, so it is per function instance. That is enough to stop
  someone flooding the inbox; a global limit would need a shared store such as Redis.
- In development a Vite plugin runs the same handler, Turnstile uses Cloudflare's test
  keys, and without a Resend key the message is validated and logged instead of sent.

## Accessibility

- Skip link, landmarks, one `h1` and an `h2` per section.
- Visible focus with `:focus-visible`; text colours meet WCAG AA on every surface.
- The mobile menu makes the rest of the page `inert`, which keeps focus inside without a
  hand-written focus trap, and Escape returns focus to the toggle.
- The skills loop follows the WAI-ARIA tabs pattern with roving `tabindex` and arrow keys.
- Status is never conveyed by colour alone: icons and text accompany every state.
- `prefers-reduced-motion` disables animations, the canvas loop and the SVG orbit.

## Responsive layout

Mobile first, tested from 320 px upward. Two lessons worth recording:

- Grid and flex children default to `min-width: auto`. A horizontally scrollable row of
  chips inside a grid column once stretched the page to 685 px on a 375 px phone, which
  made mobile browsers zoom the whole page out. Grid children that may contain wide
  content get `min-width: 0`.
- `window.innerWidth` grows together with that kind of overflow on mobile, so overflow
  checks compare against `document.documentElement.clientWidth` instead.

## Performance

- The contact form, Zod and the Turnstile script are a separate chunk loaded only when the
  visitor scrolls near the contact section.
- Technology icons are imported one by one from `simple-icons`, so only the icons in use
  are bundled.
- Hashed assets are served with a one-year immutable cache header.

## Tooling

- A VS Code Dev Container with Node 22 keeps everyone on the same environment;
  `node_modules` lives in a named Docker volume for speed on Windows and macOS hosts.
- TypeScript runs in strict mode with `noUncheckedIndexedAccess`, using project
  references for the app and for Node-side code (`vite.config.ts`, `api/`).
- ESLint 9 flat config, Prettier with the Tailwind class sorter, and LF line endings
  enforced through `.gitattributes`.
