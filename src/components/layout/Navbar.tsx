import { Menu, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';
import { NAV_ITEMS, SECTION_IDS, sectionTo } from '@/app/navigation';
import { GitHubIcon, LinkedInIcon } from '@/components/icons/BrandIcons';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { profile } from '@/data/profile';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import { ScrollProgress } from './ScrollProgress';

interface NavbarProps {
  menuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
}

export function Navbar({ menuOpen, onMenuOpenChange }: NavbarProps) {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const active = useActiveSection(SECTION_IDS, pathname);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isDesktop && menuOpen) onMenuOpenChange(false);
  }, [isDesktop, menuOpen, onMenuOpenChange]);

  useEffect(() => {
    if (!menuOpen) return;

    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onMenuOpenChange(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen, onMenuOpenChange]);

  const closeMenu = () => onMenuOpenChange(false);

  return (
    <header className="border-border bg-canvas/85 supports-[backdrop-filter]:bg-canvas/70 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container className="flex h-16 items-center gap-3">
        <Link
          to={sectionTo('top')}
          onClick={closeMenu}
          className="flex min-w-0 items-center gap-3 rounded-md"
          aria-label={t('nav.home')}
        >
          <span
            aria-hidden
            className="from-accent to-nebula text-void grid size-8 shrink-0 place-items-center rounded-md bg-linear-to-br font-mono text-sm font-bold"
          >
            BC
          </span>

          <span className="flex min-w-0 items-center gap-1.5 text-sm">
            <span className="text-fg-muted truncate">brayan-cristancho</span>
            <span aria-hidden className="text-fg-subtle">
              /
            </span>
            <span className="text-fg font-semibold">portfolio</span>
          </span>
        </Link>

        {/* max-* variants instead of `hidden sm:flex`, which loses to a component's own display class. */}
        <Badge className="max-sm:hidden">DevOps</Badge>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher className="max-sm:hidden" />
          <SocialLinks className="max-md:hidden" />
          <Button to={sectionTo('contact')} variant="primary" size="sm" className="max-lg:hidden">
            {t('hero.cta.contact')}
          </Button>

          <Button
            ref={toggleRef}
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            onClick={() => onMenuOpenChange(!menuOpen)}
          >
            {menuOpen ? (
              <X aria-hidden className="size-5" />
            ) : (
              <Menu aria-hidden className="size-5" />
            )}
          </Button>
        </div>
      </Container>

      <Container className="hidden md:block">
        <nav aria-label={t('nav.sections')}>
          <ul className="-mb-px flex [scrollbar-width:none] gap-1 overflow-x-auto">
            {NAV_ITEMS.map(({ id, labelKey, icon: Icon, count }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <Link
                    to={sectionTo(id)}

                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative flex items-center gap-2 rounded-t-md px-3 py-3 text-sm whitespace-nowrap transition-colors',
                      'hover:bg-elevated/60 hover:text-fg',

                      'after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full',
                      isActive
                        ? 'text-fg after:from-accent after:to-nebula font-medium after:bg-linear-to-r'
                        : 'text-fg-muted after:bg-transparent',
                    )}
                  >
                    <Icon aria-hidden className="hidden size-4 lg:block" />
                    {t(labelKey)}
                    {count !== undefined && (
                      <span className="bg-elevated text-fg-muted rounded-full px-1.5 font-mono text-xs leading-5">
                        {count}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-border bg-canvas h-[calc(100dvh-4rem)] overflow-y-auto border-t md:hidden"
        >
          <Container className="flex flex-col gap-6 py-6">
            <nav aria-label={t('nav.sections')}>
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map(({ id, labelKey, icon: Icon, count }, index) => (
                  <li key={id}>
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      to={sectionTo(id)}
                      onClick={closeMenu}
                      aria-current={active === id ? 'location' : undefined}

                      className={cn(
                        'flex min-h-12 items-center gap-3 rounded-md px-3 text-base transition-colors',
                        active === id
                          ? 'bg-elevated text-fg font-medium'
                          : 'text-fg-muted hover:bg-elevated hover:text-fg',
                      )}
                    >
                      <Icon aria-hidden className="size-5" />
                      <span className="flex-1">{t(labelKey)}</span>
                      {count !== undefined && (
                        <span className="text-fg-muted font-mono text-sm">{count}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-border flex items-center justify-between border-t pt-6">
              <LanguageSwitcher />
              <SocialLinks />
            </div>
          </Container>
        </div>
      )}
      <ScrollProgress />
    </header>
  );
}

function SocialLinks({ className }: { className?: string }) {
  const { t } = useTranslation();
  const links = [
    { href: profile.links.github, label: 'GitHub', Icon: GitHubIcon },
    { href: profile.links.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  ];
  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <Button
            href={href}
            variant="ghost"
            size="icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (${t('a11y.newTab')})`}
          >
            <Icon className="size-5" />
          </Button>
        </li>
      ))}
    </ul>
  );
}
