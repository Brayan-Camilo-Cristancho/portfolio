import { ArrowRight, Download, MapPin } from 'lucide-react';
import { m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { sectionTo } from '@/app/navigation';
import { Container } from '@/components/layout/Container';
import { Astronaut } from '@/components/space/Astronaut';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import { useLocalized } from '@/i18n/useLocalized';
import { CosmicBackground } from './CosmicBackground';
import { TechMosaic } from './TechMosaic';
import { Terminal } from './terminal/Terminal';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const { t } = useTranslation();
  const l = useLocalized();

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate scroll-mt-28 overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24"
    >
      <CosmicBackground />

      <Container className="flex flex-col gap-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <m.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-5"
          >
            <div aria-hidden className="min-[90rem]:hidden">
              <Astronaut className="animate-drift w-24 drop-shadow-[0_0_24px_rgb(56_189_248/0.3)] sm:w-28 lg:w-32" />
            </div>
            <Badge tone="success" dot className="w-fit">
              {t('hero.available')}
            </Badge>
            <div>
              <p className="text-fg-muted">{t('hero.greeting')}</p>
              <h1
                id="hero-title"
                className="mt-1 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
              >
                <span className="from-accent to-nebula bg-linear-to-r bg-clip-text text-transparent">
                  {profile.shortName}
                </span>
              </h1>
            </div>
            <p className="font-mono text-base sm:text-lg">{profile.role}</p>
            <p className="text-fg-muted max-w-xl text-lg text-pretty">{l(profile.tagline)}</p>
            <p className="text-fg-muted flex items-center gap-2 text-sm">
              <MapPin aria-hidden className="size-4" />
              {l(profile.location)}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button to={sectionTo('contact')} variant="primary" className="w-full sm:w-auto">
                {t('hero.cta.contact')}
                <ArrowRight aria-hidden className="size-4" />
              </Button>
              <Button href={profile.cvPath} download className="w-full sm:w-auto">
                <Download aria-hidden className="size-4" />
                {t('hero.cta.cv')}
                <span className="sr-only"> (PDF)</span>
              </Button>
            </div>
          </m.div>

          <m.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="min-w-0"
          >
            <Terminal />
          </m.div>
        </div>

        <TechMosaic />
      </Container>
    </section>
  );
}
