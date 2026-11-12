import { useTranslation } from 'react-i18next';
import type { Localized } from '@/types/content';
import type { Language } from './index';

export function useLocalized() {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage ?? 'es') as Language;
  return <T>(value: Localized<T>): T => value[lang];
}
