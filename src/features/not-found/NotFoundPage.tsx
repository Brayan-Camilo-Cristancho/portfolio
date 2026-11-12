import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { WindowChrome } from '@/components/ui/WindowChrome';

export function NotFoundPage() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <Container className="flex min-h-[70dvh] flex-col items-center justify-center gap-8 py-16">
      <title>{`404 · ${t('notFound.title')}`}</title>
      <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="text-danger font-mono">404</span> · {t('notFound.title')}
      </h1>

      <div className="border-border bg-void/80 w-full max-w-xl overflow-hidden rounded-xl border font-mono text-sm">
        <div aria-hidden>
          <WindowChrome title="brayan@portfolio: ~" />
        </div>
        <div className="flex flex-col gap-1 p-4 break-all">
          <p>
            <span className="text-success">brayan@portfolio</span>
            <span className="text-fg-subtle">:</span>
            <span className="text-accent">~</span>
            <span className="text-fg-subtle">$ </span>
            <span className="text-fg">cd {pathname}</span>
          </p>
          <p className="text-danger">
            bash: cd: {pathname}: {t('notFound.error')}
          </p>
          <p className="text-fg-subtle">exit 404</p>
        </div>
      </div>

      <Button to="/" variant="primary">
        {t('notFound.back')}
      </Button>
    </Container>
  );
}
