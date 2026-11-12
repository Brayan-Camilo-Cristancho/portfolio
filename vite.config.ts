import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';

// Cloudflare test secret: always validates. Used only when no real key is configured.
const TURNSTILE_TEST_SECRET = '1x0000000000000000000000000000000AA';

/**
 * Serves the Vercel functions in /api from the Vite dev server, so local development
 * runs the exact same handler as production without the Vercel CLI.
 */
function devApi(): Plugin {
  return {
    name: 'dev-api',
    apply: 'serve', // dev server only
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        try {
          const mod = (await server.ssrLoadModule('/api/contact.ts')) as Record<
            string,
            ((request: Request) => Promise<Response>) | undefined
          >;
          const handler = mod[req.method ?? 'GET'];
          if (!handler) {
            res.statusCode = 405;
            res.end();
            return;
          }
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const headers = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (typeof value === 'string') headers.set(key, value);
          }
          headers.set('x-forwarded-for', req.socket.remoteAddress ?? '127.0.0.1');
          const response = await handler(
            new Request(`http://localhost${req.originalUrl ?? req.url}`, {
              method: req.method,
              headers,
              body: chunks.length ? Buffer.concat(chunks) : undefined,
            }),
          );
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (error) {
          server.ssrFixStacktrace(error as Error);
          console.error(error);
          res.statusCode = 500;
          res.end();
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Server-only variables (no VITE_ prefix) are never exposed to the client bundle.
  const env = loadEnv(mode, process.cwd(), '');
  for (const key of [
    'TURNSTILE_SECRET_KEY',
    'RESEND_API_KEY',
    'CONTACT_TO_EMAIL',
    'CONTACT_FROM_EMAIL',
  ]) {
    if (env[key] && !process.env[key]) process.env[key] = env[key];
  }
  process.env.TURNSTILE_SECRET_KEY ??= TURNSTILE_TEST_SECRET;

  return {
    plugins: [react(), tailwindcss(), devApi()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: {
      host: true, // listen on 0.0.0.0 so the port is reachable from outside the dev container
      port: 5173,
      strictPort: true,
      watch: { usePolling: true, interval: 300 },
    },
  };
});
