import { useTranslation } from 'react-i18next';
import { profile } from '@/data/profile';
import { Container } from './Container';

// Extra bottom padding below xl leaves room for the floating pipeline pill and rocket.
export function Footer({ inert }: { inert?: boolean }) {
  const { t } = useTranslation();
  return (
    <footer inert={inert} className="border-border border-t pt-8 pb-24 xl:pb-8">
      <Container className="text-fg-muted flex flex-col gap-2 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.shortName}
        </p>
        <p>{t('footer.built')}</p>
      </Container>
    </footer>
  );
}
