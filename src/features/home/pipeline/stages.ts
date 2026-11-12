import { NAV_ITEMS } from '@/app/navigation';

export type StageStatus = 'passed' | 'running' | 'pending';

export interface PipelineStage {
  id: string;
  labelKey: string;
  stage: string;
}

export const PIPELINE_STAGES: readonly PipelineStage[] = [
  { id: 'top', labelKey: 'nav.top', stage: 'checkout' },
  ...NAV_ITEMS.map((item) => ({ id: item.id, labelKey: item.labelKey, stage: item.id })),
];

export const isComplete = (activeIndex: number) => activeIndex === PIPELINE_STAGES.length - 1;

// Once the last stage is reached the whole pipeline is reported as passed.
export const statusOf = (index: number, activeIndex: number): StageStatus =>
  isComplete(activeIndex) || index < activeIndex
    ? 'passed'
    : index === activeIndex
      ? 'running'
      : 'pending';
