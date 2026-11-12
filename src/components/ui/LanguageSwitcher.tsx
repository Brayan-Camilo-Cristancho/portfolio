import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@/i18n';
import { cn } from '@/lib/cn';

const LANGUAGE_NAMES: Record<(typeof SUPPORTED_LANGUAGES)[number], string> = {
  es: 'Español',
  en: 'English',
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage;

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className={cn(
        'border-border bg-surface inline-flex rounded-full border p-0.5 font-mono text-xs',
        className,
      )}
    >
      {SUPPORTED_LANGUAGES.map((lng) => {
        const active = current === lng;
        return (
          <button
            key={lng}
            type="button"
            lang={lng}
            aria-pressed={active}
            aria-label={LANGUAGE_NAMES[lng]}
            onClick={() => void i18n.changeLanguage(lng)}
            className={cn(
              'min-h-8 rounded-full px-3 uppercase transition-colors',
              active ? 'bg-elevated text-fg shadow-glow' : 'text-fg-muted hover:text-fg',
            )}
          >
            {lng}
          </button>
        );
      })}
    </div>
  );
}
