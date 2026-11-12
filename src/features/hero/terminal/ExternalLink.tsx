import type { ReactNode } from 'react';

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline-offset-4 hover:underline"
    >
      {children}
    </a>
  );
}
