import { useTranslation } from 'react-i18next';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { services } from '@/data/services';
import { useLocalized } from '@/i18n/useLocalized';
import { Moon } from '@/components/space/planets';

export function ServicesSection() {
  const { t } = useTranslation();
  const l = useLocalized();

  return (
    <Section
      id="services"
      eyebrow="helm list --services"
      decor={
        <Moon className="animate-float absolute top-16 right-[10%] hidden w-12 opacity-80 sm:block" />
      }
      title={t('sections.services.title')}
      description={t('sections.services.description')}
    >
      <ul className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
        {services.map((service) => (
          <Card
            as="li"
            key={service.id}
            label={`svc/${service.id}`}
            interactive
            className="flex flex-col gap-3"
          >
            <h3 className="text-lg font-semibold">{l(service.title)}</h3>
            <p className="text-fg-muted text-sm">{l(service.description)}</p>

            <ul className="flex flex-col gap-1.5 text-sm">
              {l(service.deliverables).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="text-success shrink-0 font-mono">
                    [✓]
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </ul>
    </Section>
  );
}
