/**
 * POST /api/contact
 *
 * Validates the payload with the same schema as the form, checks the Turnstile token
 * and forwards the message through Resend. Without RESEND_API_KEY the message is
 * validated and logged instead of sent, which keeps local development key-free.
 *
 * Env: TURNSTILE_SECRET_KEY, RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 */
import {
  contactSchema,
  fieldErrors,
  type ContactData,
  type ContactResponse,
} from '../src/shared/contact.js';

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60_000 };

// Per-instance, in-memory limiter. Good enough to stop a single person flooding the
// inbox; a global limit would need a shared store such as Redis.
const hits = new Map<string, number[]>();
function isRateLimited(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

const json = (body: ContactResponse, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

// User input is never interpolated into the email HTML unescaped.
const escapeHtml = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

async function sendEmail(data: ContactData): Promise<{ ok: boolean; simulated: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info('[contact] RESEND_API_KEY not set, message logged instead of sent:', {
      from: `${data.name} <${data.email}>`,
      message: data.message.slice(0, 120),
    });
    return { ok: true, simulated: true };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Portafolio <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: data.email,
      subject: `Portafolio: mensaje de ${data.name}`,
      text: `De: ${data.name} <${data.email}>\n\n${data.message}`,
      html: `<p><strong>De:</strong> ${escapeHtml(data.name)} &lt;${escapeHtml(data.email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`,
    }),
  });
  if (!res.ok) console.error('[contact] Resend responded with', res.status, await res.text());
  return { ok: res.ok, simulated: false };
}

export async function POST(request: Request): Promise<Response> {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ ok: false, error: 'bad_request' }, 415);
  }
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: 'bad_request' }, 413);

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
  if (ip && isRateLimited(ip)) return json({ ok: false, error: 'rate_limited' }, 429);

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fields = fieldErrors(parsed.error);

    // Honeypot filled: answer as if it worked so bots learn nothing.
    if (fields.website) return json({ ok: true }, 200);
    return json({ ok: false, error: 'validation', fields }, 400);
  }

  try {
    if (!(await verifyTurnstile(parsed.data.turnstileToken, ip))) {
      return json({ ok: false, error: 'turnstile' }, 403);
    }
  } catch (error) {
    console.error('[contact] Turnstile verification failed', error);
    return json({ ok: false, error: 'turnstile' }, 403);
  }

  try {
    const result = await sendEmail(parsed.data);
    if (!result.ok) return json({ ok: false, error: 'send_failed' }, 502);
    return json({ ok: true, simulated: result.simulated || undefined }, 200);
  } catch (error) {
    console.error('[contact] Sending the email failed', error);
    return json({ ok: false, error: 'send_failed' }, 502);
  }
}
