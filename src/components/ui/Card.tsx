import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CardProps {
  as?: 'div' | 'article' | 'li';
  label?: string;
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}

export function Card({ as: Tag = 'div', label, interactive, className, children }: CardProps) {
  return (
    <Tag
      className={cn(
        'border-border bg-surface/80 relative rounded-md border p-5',
        label && 'mt-2.5',
        interactive &&
          'hover:border-accent/50 hover:shadow-glow transition duration-200 hover:-translate-y-0.5',
        className,
      )}
    >
      {label && (
        <span
          aria-hidden
          className="bg-canvas text-fg-subtle absolute -top-2.5 left-3 px-1.5 font-mono text-xs leading-5"
        >
          {label}
        </span>
      )}
      {children}
    </Tag>
  );
}
