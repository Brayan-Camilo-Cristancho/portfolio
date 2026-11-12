import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  decor?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  decor,
  className,
  children,
}: SectionProps) {
  const titleId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn(
        'relative isolate scroll-mt-16 py-14 sm:py-20 md:scroll-mt-28 lg:py-24',
        className,
      )}
    >
      {/* Decorations are clipped by this layer, not by the section, so focus rings stay intact. */}
      {decor && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {decor}
        </div>
      )}
      <Container>
        <header className="mb-10 flex flex-col gap-3">
          {eyebrow && (
            <p className="text-accent font-mono text-sm">
              <span className="text-fg-subtle">$ </span>
              {eyebrow}
            </p>
          )}
          <h2 id={titleId} className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {description && <p className="text-fg-muted max-w-2xl">{description}</p>}
        </header>
        {children}
      </Container>
    </section>
  );
}
