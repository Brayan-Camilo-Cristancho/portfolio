import type { ReactNode } from 'react';

interface WindowChromeProps {
  title: ReactNode;
  titleId?: string;
}

export function WindowChrome({ title, titleId }: WindowChromeProps) {
  return (
    <div className="border-border bg-surface/80 flex items-center gap-2 border-b px-4 py-2.5 font-mono">
      <span aria-hidden className="flex gap-1.5">
        <span className="bg-danger/80 size-3 rounded-full" />
        <span className="bg-warning/80 size-3 rounded-full" />
        <span className="bg-success/80 size-3 rounded-full" />
      </span>
      <p id={titleId} className="text-fg-muted min-w-0 flex-1 truncate text-center text-xs">
        {title}
      </p>

      <span aria-hidden className="w-[3.25rem] shrink-0" />
    </div>
  );
}
