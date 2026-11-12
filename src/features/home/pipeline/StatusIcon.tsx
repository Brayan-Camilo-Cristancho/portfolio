import { Check, Circle, LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { StageStatus } from './stages';

export function StatusIcon({ status, className }: { status: StageStatus; className?: string }) {
  if (status === 'passed') {
    return (
      <span
        aria-hidden
        className={cn(
          'bg-success/20 text-success grid size-5 place-items-center rounded-full',
          className,
        )}
      >
        <Check className="size-3" strokeWidth={3} />
      </span>
    );
  }
  if (status === 'running') {
    return (
      <span
        aria-hidden
        className={cn('text-accent relative grid size-5 place-items-center', className)}
      >
        <span className="bg-accent/15 absolute inset-0 rounded-full" />
        <LoaderCircle className="size-4 animate-spin" strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span aria-hidden className={cn('text-fg-subtle grid size-5 place-items-center', className)}>
      <Circle className="size-3" strokeWidth={2.5} />
    </span>
  );
}
