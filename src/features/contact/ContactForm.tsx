import { CheckCircle2, LoaderCircle, Send, TriangleAlert } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/cn';
import {
  contactSchema,
  fieldErrors,
  LIMITS,
  type ContactInput,
  type ContactResponse,
} from '@/shared/contact';
import { useTurnstile } from './useTurnstile';

type Field = 'name' | 'email' | 'message';
type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'success'; simulated: boolean }
  | { kind: 'error'; code: string };

const EMPTY = { name: '', email: '', message: '', website: '' };

function FieldLabel({ text }: { text: string }) {
  return (
    <>
      <span aria-hidden className="text-accent">
        --
      </span>
      <span className="lowercase">{text}</span>
    </>
  );
}

const inputClass =
  'border-border bg-void/60 text-fg placeholder:text-fg-subtle focus-visible:border-accent w-full rounded-md border px-3 py-2.5 text-sm transition-colors focus-visible:outline-none aria-invalid:border-danger';

/** Validates with the shared schema for instant feedback; the API validates again. */
export default function ContactForm() {
  const { t, i18n } = useTranslation();
  const formId = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const turnstile = useTurnstile(i18n.resolvedLanguage ?? 'es');

  const fieldId = (field: Field) => `${formId}-${field}`;
  const errorId = (field: Field) => `${formId}-${field}-error`;

  const update = (field: keyof typeof EMPTY, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const parsed = contactSchema.safeParse({ ...values, turnstileToken: turnstile.token });
    if (!parsed.success) {
      const next = fieldErrors(parsed.error);
      setErrors(next);

      const first = (['name', 'email', 'message'] as const).find((field) => next[field]);
      if (first) document.getElementById(fieldId(first))?.focus();
      return;
    }

    setStatus({ kind: 'sending' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json()) as ContactResponse;
      if (result.ok) {
        setValues(EMPTY);
        setErrors({});
        setStatus({ kind: 'success', simulated: Boolean(result.simulated) });
      } else {
        if (result.fields) setErrors(result.fields);
        setStatus({ kind: 'error', code: result.error });
      }
    } catch {
      setStatus({ kind: 'error', code: 'network' });
    } finally {
      // Turnstile tokens are single-use.
      turnstile.reset();
    }
  };

  const fieldProps = (field: Field) => ({
    id: fieldId(field),
    name: field,
    value: values[field],
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? errorId(field) : undefined,
    onChange: (event: { target: { value: string } }) => update(field, event.target.value),
  });

  const fieldError = (field: Field) =>
    errors[field] && (
      <p id={errorId(field)} className="text-danger mt-1.5 text-xs">
        {t(`contact.errors.${errors[field]}`)}
      </p>
    );

  const sending = status.kind === 'sending';

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId('name')} className="text-fg-muted mb-1.5 block font-mono text-xs">
            <FieldLabel text={t('contact.labels.name')} />
          </label>
          <input
            {...fieldProps('name')}
            autoComplete="name"
            maxLength={LIMITS.name.max}
            placeholder={t('contact.placeholders.name')}
            className={inputClass}
          />
          {fieldError('name')}
        </div>
        <div>
          <label
            htmlFor={fieldId('email')}
            className="text-fg-muted mb-1.5 block font-mono text-xs"
          >
            <FieldLabel text={t('contact.labels.email')} />
          </label>
          <input
            {...fieldProps('email')}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={t('contact.placeholders.email')}
            className={inputClass}
          />
          {fieldError('email')}
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-baseline justify-between">
          <label htmlFor={fieldId('message')} className="text-fg-muted block font-mono text-xs">
            <FieldLabel text={t('contact.labels.message')} />
          </label>
          <span aria-hidden className="text-fg-subtle font-mono text-xs">
            {values.message.trim().length}/{LIMITS.message.max}
          </span>
        </div>
        <textarea
          {...fieldProps('message')}
          rows={6}
          maxLength={LIMITS.message.max}
          placeholder={t('contact.placeholders.message')}
          className={cn(inputClass, 'resize-y')}
        />
        {fieldError('message')}
      </div>

      {/* Honeypot field, invisible to people and assistive technology. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update('website', event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div ref={turnstile.containerRef} className="min-h-[65px]" />
        {(errors.turnstileToken || turnstile.failed) && (
          <p className="text-danger text-xs">
            {t(
              turnstile.failed
                ? 'contact.errors.turnstile.failed'
                : 'contact.errors.turnstile.missing',
            )}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={sending}
          className="from-accent to-nebula text-void hover:shadow-glow inline-flex h-11 items-center justify-center gap-2 rounded-md bg-linear-to-r px-5 text-sm font-semibold transition-all disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? (
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
          ) : (
            <Send aria-hidden className="size-4" />
          )}
          {t(sending ? 'contact.sending' : 'contact.submit')}
        </button>

        <div role="status" aria-live="polite" className="min-h-5 font-mono text-xs">
          {status.kind === 'success' && (
            <p className="text-success flex items-center gap-2">
              <CheckCircle2 aria-hidden className="size-4 shrink-0" />
              {t(status.simulated ? 'contact.successSimulated' : 'contact.success')}
            </p>
          )}
          {status.kind === 'error' && (
            <p className="text-danger flex items-center gap-2">
              <TriangleAlert aria-hidden className="size-4 shrink-0" />
              {t(`contact.status.${status.code}`, {
                defaultValue: t('contact.status.send_failed'),
              })}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
