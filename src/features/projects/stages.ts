export const STAGES = ['problem', 'solution', 'impact'] as const;
export type Stage = (typeof STAGES)[number];
