import type { SkillCategoryId } from '@/types/content';

export const VIEW = { width: 880, height: 400 } as const;

// Two cubic Bezier lobes crossing at (440, 200). Stage positions are the curves at t = 0.5.
export const LOOP_PATH =
  'M440,200 C360,90 120,90 120,200 C120,310 360,310 440,200 C520,90 760,90 760,200 C760,310 520,310 440,200';

export type LabelSide = 'top' | 'bottom' | 'left' | 'right';

export interface LoopStage {
  id: SkillCategoryId;
  x: number;
  y: number;
  side: LabelSide;
}

export const LOOP_STAGES: readonly LoopStage[] = [
  { id: 'development', x: 250, y: 118, side: 'top' },
  { id: 'automation', x: 120, y: 200, side: 'left' },
  { id: 'cicd', x: 250, y: 282, side: 'bottom' },
  { id: 'containers', x: 630, y: 118, side: 'top' },
  { id: 'os', x: 760, y: 200, side: 'right' },
  { id: 'cloud', x: 630, y: 282, side: 'bottom' },
  { id: 'observability', x: 440, y: 200, side: 'bottom' },
];
