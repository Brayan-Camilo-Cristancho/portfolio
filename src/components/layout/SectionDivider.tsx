import { Container } from './Container';

interface SectionDividerProps {
  index: number;
  total: number;
  label: string;
  delay?: number;
}

/** Decorative separator between sections; each section already announces itself via its heading. */
export function SectionDivider({ index, total, label, delay = 0 }: SectionDividerProps) {
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div aria-hidden className="py-4 sm:py-6">
      <Container className="relative">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="via-border-strong to-accent/50 h-px flex-1 bg-linear-to-r from-transparent" />
          <span className="text-fg-subtle flex shrink-0 items-center gap-2.5 font-mono text-[0.65rem] tracking-[0.2em] uppercase sm:text-xs">
            <span className="relative grid size-4 place-items-center">
              <span className="border-accent/60 animate-beacon absolute inset-0 rounded-full border" />
              <span className="bg-accent shadow-glow size-1.5 rounded-full" />
            </span>
            <span>
              sector <span className="text-fg-muted">{pad(index)}</span>/{pad(total)}
              <span className="text-accent"> · </span>
              <span className="text-fg-muted">{label}</span>
            </span>
          </span>
          <span className="via-border-strong to-nebula/50 h-px flex-1 bg-linear-to-l from-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-x-4 top-1/2 h-px overflow-hidden sm:inset-x-6">
          <span
            className="via-accent/80 animate-comet absolute top-0 left-0 block h-px w-[7%] bg-linear-to-r from-transparent to-white"
            style={{ animationDelay: `${delay}s` }}
          />
        </div>
      </Container>
    </div>
  );
}
