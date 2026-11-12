import type { KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/cn';
import { LOOP_PATH, LOOP_STAGES, VIEW, type LabelSide } from './loop';

interface DevOpsLoopProps {
  activeId: string;
  onSelect: (id: string) => void;
  tabId: (id: string) => string;
  panelId: string;
  onTabKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

const LABEL_POSITION: Record<LabelSide, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-1',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1',
  left: 'right-full top-1/2 -translate-y-1/2 mr-1',
  right: 'left-full top-1/2 -translate-y-1/2 ml-1',
};

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

/**
 * The DevOps loop: an SVG for the path and nodes, with real tab buttons positioned over
 * each node in percentages so labels stay crisp and keyboard accessible.
 */
export function DevOpsLoop({ activeId, onSelect, tabId, panelId, onTabKeyDown }: DevOpsLoopProps) {
  const { t } = useTranslation();

  return (
    <div className="md:px-16">
      <div className="relative aspect-[2.2/1] w-full">
        <svg
          aria-hidden
          viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
          className="absolute inset-0 size-full overflow-visible"
        >
          <defs>
            <linearGradient id="loop-flow" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--color-accent)" />
              <stop offset="100%" stopColor="var(--color-nebula)" />
            </linearGradient>
          </defs>

          <text
            x="250"
            y="214"
            textAnchor="middle"
            className="fill-fg/5 font-mono text-[44px] font-bold"
          >
            DEV
          </text>
          <text
            x="630"
            y="214"
            textAnchor="middle"
            className="fill-fg/5 font-mono text-[44px] font-bold"
          >
            OPS
          </text>

          <path d={LOOP_PATH} fill="none" stroke="var(--color-border-strong)" strokeWidth={2} />
          <path
            d={LOOP_PATH}
            fill="none"
            stroke="url(#loop-flow)"
            strokeWidth={8}
            opacity={0.12}
            className="blur-[2px]"
          />
          <path
            d={LOOP_PATH}
            fill="none"
            stroke="url(#loop-flow)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray="6 14"
            className="animate-flow"
          />

          {LOOP_STAGES.map((stage) => {
            const active = stage.id === activeId;
            return (
              <g key={stage.id}>
                {active && <circle cx={stage.x} cy={stage.y} r={22} className="fill-accent/15" />}
                <circle
                  cx={stage.x}
                  cy={stage.y}
                  r={active ? 10 : 7}
                  className={cn(
                    'transition-all duration-300',
                    active ? 'fill-accent stroke-void' : 'fill-canvas stroke-border-strong',
                  )}
                  strokeWidth={3}
                />
              </g>
            );
          })}
        </svg>

        <div
          role="tablist"
          aria-label={t('sections.skills.tablist')}
          className="absolute inset-0 max-md:hidden"
        >
          {LOOP_STAGES.map((stage) => {
            const active = stage.id === activeId;
            return (
              <button
                key={stage.id}
                id={tabId(stage.id)}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={panelId}

                tabIndex={active ? 0 : -1}
                onClick={() => onSelect(stage.id)}
                onKeyDown={onTabKeyDown}
                className="group absolute size-11 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ left: pct(stage.x, VIEW.width), top: pct(stage.y, VIEW.height) }}
              >
                <span
                  className={cn(
                    'absolute font-mono text-xs whitespace-nowrap transition-colors',
                    LABEL_POSITION[stage.side],
                    active ? 'text-accent font-semibold' : 'text-fg-muted group-hover:text-fg',
                  )}
                >
                  {t(`sections.skills.stages.${stage.id}.short`)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
