import { SECTION_IDS } from '@/app/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { isComplete, PIPELINE_STAGES } from './stages';

export function usePipeline() {
  const active = useActiveSection(SECTION_IDS, '/');
  const activeIndex = Math.max(
    0,
    PIPELINE_STAGES.findIndex((stage) => stage.id === active),
  );
  return { activeIndex, total: PIPELINE_STAGES.length, completed: isComplete(activeIndex) };
}
