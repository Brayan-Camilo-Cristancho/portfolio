/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public Cloudflare Turnstile site key. Server-side secrets never use the VITE_ prefix. */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
