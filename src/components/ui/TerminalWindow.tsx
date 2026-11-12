import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { WindowChrome } from './WindowChrome';

interface TerminalWindowProps {
  title: string;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}

export function TerminalWindow({ title, className, bodyClassName, children }: TerminalWindowProps) {
  return (
    <div
      className={cn(
        'border-border bg-void/70 flex flex-col overflow-hidden rounded-xl border backdrop-blur-sm',
        className,
      )}
    >
      <div aria-hidden>
        <WindowChrome title={title} />
      </div>
      <div className={cn('flex-1 p-4 sm:p-5', bodyClassName)}>{children}</div>
    </div>
  );
}
