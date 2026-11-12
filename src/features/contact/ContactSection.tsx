import { Mail } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { GitHubIcon, LinkedInIcon } from '@/components/icons/BrandIcons';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { HorizonPlanet } from '@/components/space/planets';
import { profile } from '@/data/profile';
import { useNearViewport } from '@/hooks/useNearViewport';

// Zod and Turnstile ship in a separate chunk that loads only near this section.
const ContactForm = lazy(() => import('./ContactForm'));

function FormSkeleton() {
  return (
    <div aria-hidden className="flex animate-pulse flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="bg-elevated h-[62px] rounded-md" />
        <div className="bg-elevated h-[62px] rounded-md" />
      </div>
      <div className="bg-elevated h-40 rounded-md" />
      <div className="bg-elevated h-11 w-40 rounded-md" />
    </div>
  );
}

export function ContactSection() {
  const { t } = useTranslation();
  const [formAreaRef, nearForm] = useNearViewport<HTMLDivElement>();
  const newTab = { target: '_blank', rel: 'noopener noreferrer' } as const;

  return (
    <Section
      id="contact"
      eyebrow="ssh hello@brayan"
      decor={
        <HorizonPlanet className="absolute -bottom-[35rem] left-1/2 w-[46rem] max-w-none -translate-x-1/2 opacity-70 sm:-bottom-[46rem] sm:w-[60rem]" />
      }
      title={t('sections.contact.title')}
      description={t('sections.contact.description')}
    >
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] [&>*]:min-w-0">
        <Card label="message.txt" className="sm:p-6">
          <h3 className="sr-only">{t('contact.formTitle')}</h3>
          <div ref={formAreaRef}>
            {nearForm ? (
              <Suspense fallback={<FormSkeleton />}>
                <ContactForm />
              </Suspense>
            ) : (
              <FormSkeleton />
            )}
          </div>
        </Card>

        <Card label="channels.sh" className="flex flex-col gap-3 self-start">
          <h3 className="font-semibold">{t('contact.directTitle')}</h3>
          <p className="text-fg-muted text-sm">{t('contact.directText')}</p>
          <Button href={`mailto:${profile.email}`} variant="primary" className="w-full">
            <Mail aria-hidden className="size-4" />
            {t('sections.contact.email')}
          </Button>
          <Button href={profile.links.linkedin} {...newTab} className="w-full">
            <LinkedInIcon className="size-4" />
            LinkedIn
            <span className="sr-only"> ({t('a11y.newTab')})</span>
          </Button>
          <Button href={profile.links.github} {...newTab} className="w-full">
            <GitHubIcon className="size-4" />
            GitHub
            <span className="sr-only"> ({t('a11y.newTab')})</span>
          </Button>
        </Card>
      </div>
    </Section>
  );
}
