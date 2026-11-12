import { useTranslation } from 'react-i18next';

export function SkipLink() {
  const { t } = useTranslation();
  return (
    <a
      href="#main"
      className="bg-elevated text-fg border-accent sr-only z-100 rounded-md border px-4 py-2 font-medium focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      {t('a11y.skipToContent')}
    </a>
  );
}
