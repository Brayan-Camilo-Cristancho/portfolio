import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { STAGES } from './stages';

export function PipelineStages() {
  const { t } = useTranslation();
  return (
    <ol
      aria-label={t('project.pipeline')}
      className="flex flex-wrap items-center gap-y-2 font-mono text-[0.7rem]"
    >
      {STAGES.map((stage, i) => (
        <li key={stage} className="flex items-center">
          {i > 0 && <span aria-hidden className="bg-success/40 mx-1 h-px w-3 sm:w-5" />}
          <span className="border-success/30 bg-success/10 text-success inline-flex items-center gap-1 rounded-full border px-2 py-0.5">
            <Check aria-hidden className="size-3" />
            {t(`project.stages.${stage}`)}
          </span>
        </li>
      ))}
    </ol>
  );
}
