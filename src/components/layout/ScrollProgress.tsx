import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ScrollProgress() {
  const { progress } = useScrollProgress();
  return (
    <div aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 overflow-hidden">
      <div
        className="from-accent to-nebula h-full origin-left bg-linear-to-r"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
