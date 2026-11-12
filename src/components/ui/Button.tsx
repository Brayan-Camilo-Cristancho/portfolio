import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router';
import { cn } from '@/lib/cn';

const variants = {
  primary:
    'bg-linear-to-r from-accent to-nebula font-semibold text-void hover:shadow-glow hover:brightness-110',
  secondary: 'border border-border bg-surface text-fg hover:border-border-strong hover:bg-elevated',
  ghost: 'text-fg-muted hover:bg-elevated hover:text-fg',
};

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  icon: 'size-10', // 40x40px, above the WCAG 2.2 minimum target size
};

type BaseProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
};

// Renders a router Link (`to`), an anchor (`href`) or a button; props are typed per variant.
type ButtonProps = BaseProps &
  (
    | (Omit<ComponentPropsWithRef<'button'>, keyof BaseProps> & {
        href?: undefined;
        to?: undefined;
      })
    | (Omit<ComponentPropsWithRef<'a'>, keyof BaseProps> & { href: string; to?: undefined })
    | (Omit<LinkProps, keyof BaseProps> & { to: LinkProps['to']; href?: undefined })
  );

const base =
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-all duration-200 disabled:pointer-events-none disabled:opacity-50';

export function Button({ variant = 'secondary', size = 'md', className, ...props }: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.to !== undefined) {
    return <Link {...props} className={classes} />;
  }
  if (props.href !== undefined) {
    return <a {...props} className={classes} />;
  }

  return <button type="button" {...props} className={classes} />;
}
