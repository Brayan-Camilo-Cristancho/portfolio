import { TECH_ICONS } from '@/data/techIcons';
import { cn } from '@/lib/cn';

function monogram(name: string): string {
  const words = name.split(/[\s/()-]+/).filter(Boolean);
  if (words.length > 1)
    return words
      .map((w) => w[0])
      .join('')
      .slice(0, 3)
      .toUpperCase();
  return name.length <= 3 ? name.toUpperCase() : name.slice(0, 2).toUpperCase();
}

interface TechIconProps {
  name: string;
  slug?: string;
  className?: string;
}

export function TechIcon({ name, slug, className }: TechIconProps) {
  const icon = slug ? TECH_ICONS[slug] : undefined;

  if (!icon) {
    return (
      <span
        aria-hidden
        className={cn(
          'grid place-items-center rounded-md border border-current font-mono text-[0.6rem] font-bold',
          className,
        )}
      >
        {monogram(name)}
      </span>
    );
  }

  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d={icon.path} />
    </svg>
  );
}
