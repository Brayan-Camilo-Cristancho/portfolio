import { z } from 'zod';

/**
 * Contact form schema, shared by the browser and the API.
 * Error messages are i18n keys, translated on the client. This file must not use the
 * '@/' alias because the serverless function imports it too.
 */
export const LIMITS = {
  name: { min: 2, max: 80 },
  message: { min: 20, max: 2000 },
} as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(LIMITS.name.min, 'name.tooShort')
    .max(LIMITS.name.max, 'name.tooLong'),
  email: z.string().trim().pipe(z.email('email.invalid')),
  message: z
    .string()
    .trim()
    .min(LIMITS.message.min, 'message.tooShort')
    .max(LIMITS.message.max, 'message.tooLong'),
  // Honeypot: hidden from humans, so any value means a bot.
  website: z.string().max(0, 'spam').optional().default(''),
  turnstileToken: z.string().min(1, 'turnstile.missing'),
});

export type ContactInput = z.input<typeof contactSchema>;

export type ContactData = z.output<typeof contactSchema>;

export type ContactResponse =
  | { ok: true; simulated?: boolean }
  | {
      ok: false;
      error: 'validation' | 'turnstile' | 'rate_limited' | 'send_failed' | 'bad_request';
      fields?: Partial<Record<keyof ContactInput, string>>;
    };

export function fieldErrors(error: z.ZodError): Partial<Record<keyof ContactInput, string>> {
  const out: Partial<Record<keyof ContactInput, string>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof ContactInput | undefined;
    if (field && !out[field]) out[field] = issue.message;
  }
  return out;
}
