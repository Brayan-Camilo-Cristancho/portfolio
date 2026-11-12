import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import { WindowChrome } from '@/components/ui/WindowChrome';
import type { Language } from '@/i18n';
import { useLocalized } from '@/i18n/useLocalized';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/cn';
import { CLEAR, COMMAND_NAMES, COMMANDS, type CommandContext } from './commands';

interface Line {
  id: number;
  kind: 'input' | 'output' | 'error';
  content: ReactNode;
}

const DEMO_COMMAND = 'whoami';
const QUICK_COMMANDS = ['help', 'whoami', 'projects', 'contact'];

function Prompt() {
  return (
    <span aria-hidden className="shrink-0 select-none">
      <span className="text-success">brayan@portfolio</span>
      <span className="text-fg-subtle">:</span>
      <span className="text-accent">~</span>
      <span className="text-fg-subtle">$ </span>
    </span>
  );
}

export function Terminal({ className }: { className?: string }) {
  const { t, i18n } = useTranslation();
  const l = useLocalized();
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const titleId = useId();
  const inputId = useId();

  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const nextId = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const demoTimers = useRef<number[]>([]);

  const line = (kind: Line['kind'], content: ReactNode): Line => ({
    id: nextId.current++,
    kind,
    content,
  });

  const execute = (raw: string) => {
    const text = raw.trim();
    setInput('');
    setHistoryIndex(null);

    if (!text) {
      setLines((prev) => [...prev, line('input', '')]);
      return;
    }
    setHistory((prev) => [...prev, text]);

    const [name = '', ...args] = text.split(/\s+/);
    const command = COMMANDS.find((c) => c.name === name.toLowerCase());

    if (!command) {
      setLines((prev) => [
        ...prev,
        line('input', text),
        line('error', t('terminal.notFound', { cmd: name })),
      ]);
      return;
    }

    const ctx: CommandContext = {
      t,
      l,
      language: (i18n.resolvedLanguage ?? 'es') as Language,
      changeLanguage: (lng) => void i18n.changeLanguage(lng),
      scrollToSection: (id) =>
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' }),
    };

    const output = command.run(args, ctx);
    if (output === CLEAR) {
      setLines([]);
      return;
    }
    setLines((prev) => [...prev, line('input', text), line('output', output)]);
  };

  // Keeps the demo effect pointed at the latest `execute` without re-running it.
  const executeRef = useRef(execute);
  useEffect(() => {
    executeRef.current = execute;
  });

  useEffect(() => {
    const timers: number[] = [];
    const schedule = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    if (reducedMotion) {
      schedule(() => executeRef.current(DEMO_COMMAND), 0);
    } else {
      [...DEMO_COMMAND].forEach((_, i) =>
        schedule(() => setInput(DEMO_COMMAND.slice(0, i + 1)), 700 + i * 110),
      );
      schedule(() => executeRef.current(DEMO_COMMAND), 700 + DEMO_COMMAND.length * 110 + 400);
    }
    demoTimers.current = timers;

    // Cleared on unmount so StrictMode does not run the demo twice.
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  const cancelDemo = () => {
    if (demoTimers.current.length === 0) return;
    demoTimers.current.forEach(clearTimeout);
    demoTimers.current = [];
    setInput('');
  };

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [lines]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    execute(input);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowUp': {
        if (history.length === 0) return;
        event.preventDefault();
        const index = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(index);
        setInput(history[index] ?? '');
        break;
      }
      case 'ArrowDown': {
        if (historyIndex === null) return;
        event.preventDefault();
        const index = historyIndex + 1;
        if (index >= history.length) {
          setHistoryIndex(null);
          setInput('');
        } else {
          setHistoryIndex(index);
          setInput(history[index] ?? '');
        }
        break;
      }
      case 'Tab': {
        const partial = input.trim().toLowerCase();
        // Only intercept Tab when there is something to complete, so focus is never trapped.
        if (!partial || partial.includes(' ')) return;
        const matches = COMMAND_NAMES.filter((name) => name.startsWith(partial));
        if (matches.length === 0) return;
        event.preventDefault();
        if (matches.length === 1) setInput(`${matches[0]} `);
        else
          setLines((prev) => [...prev, line('input', input), line('output', matches.join('  '))]);
        break;
      }
      case 'Escape':
        setInput('');
        setHistoryIndex(null);
        break;
      case 'l':
        if (event.ctrlKey) {
          event.preventDefault();
          setLines([]);
        }
        break;
    }
  };

  return (
    <div
      role="region"
      aria-labelledby={titleId}
      className={cn(
        'border-border bg-void/80 shadow-glow-nebula flex flex-col overflow-hidden rounded-xl border font-mono text-sm backdrop-blur-md',
        className,
      )}
    >
      <WindowChrome title={t('terminal.title')} titleId={titleId} />

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        className="h-64 overflow-y-auto px-4 pt-3 sm:h-72"
        onClick={() => inputRef.current?.focus()}
      >
        <p className="text-fg-subtle mb-2">{t('terminal.welcome')}</p>
        {lines.map((entry) => (
          <div key={entry.id} className="mb-1.5 break-words">
            {entry.kind === 'input' ? (
              <p className="flex flex-wrap">
                <Prompt />
                <span className="text-fg">{entry.content}</span>
              </p>
            ) : (
              <div className={entry.kind === 'error' ? 'text-danger' : 'text-fg-muted'}>
                {entry.content}
              </div>
            )}
          </div>
        ))}

        <form onSubmit={onSubmit} className="flex items-center pb-3">
          <Prompt />
          <label htmlFor={inputId} className="sr-only">
            {t('terminal.inputLabel')}
          </label>
          <input
            ref={inputRef}
            id={inputId}
            value={input}
            onChange={(event) => {
              cancelDemo();
              setInput(event.target.value);
            }}
            onKeyDown={onKeyDown}
            onFocus={cancelDemo}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="send"
            className="text-fg caret-accent min-w-0 flex-1 bg-transparent outline-none"
          />
        </form>
      </div>

      <div className="border-border bg-surface/60 flex flex-wrap items-center gap-2 border-t px-4 py-2.5">
        <span className="text-fg-subtle text-xs">{t('terminal.try')}</span>
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => {
              cancelDemo();
              execute(cmd);
            }}
            className="border-border text-fg-muted hover:border-accent/60 hover:text-accent min-h-8 rounded-md border px-2.5 text-xs transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
