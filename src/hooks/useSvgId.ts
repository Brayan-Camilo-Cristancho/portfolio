import { useId } from 'react';

/** Unique id that is safe inside url(#...) references, so SVG gradients never collide. */
export function useSvgId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
}
