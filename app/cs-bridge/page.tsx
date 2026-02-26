'use client';

import { useState } from 'react';
import { CS_BRIDGE_HEADER, CS_BRIDGE_PHASES, type CSBridgePhase, type CSBridgeWeek } from '@/lib/csBridge';

function WeekRow({ week, phaseColor }: { week: CSBridgeWeek; phaseColor: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        className="w-full text-left py-2.5 flex items-center gap-3"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <span className="text-xs font-mono flex-shrink-0 w-8 text-right" style={{ color: phaseColor }}>
          {week.week}
        </span>
        <span className="text-sm flex-1" style={{ color: '#aaa' }}>
          {week.chessTopic}
        </span>
        <span className="text-xs" style={{ color: '#333' }}>
          {expanded ? '-' : '+'}
        </span>
      </button>

      {expanded && (
        <div className="pl-11 pb-4 space-y-4 text-xs leading-relaxed">
          <div>
            <div className="uppercase tracking-widest text-[0.6rem] mb-1" style={{ color: '#4a90d9' }}>
              CS Concept
            </div>
            <div style={{ color: '#777' }}>{week.csConcept}</div>
          </div>

          <div>
            <div className="uppercase tracking-widest text-[0.6rem] mb-1" style={{ color: '#c8956c' }}>
              How It Connects
            </div>
            <div style={{ color: '#777' }}>{week.howItConnects}</div>
          </div>

          <div>
            <div className="uppercase tracking-widest text-[0.6rem] mb-1" style={{ color: '#50c878' }}>
              Discussion Question
            </div>
            <div style={{ color: '#777' }}>{week.discussionQuestion}</div>
          </div>

          {week.miniActivity && (
            <div>
              <div className="uppercase tracking-widest text-[0.6rem] mb-1" style={{ color: '#888' }}>
                Mini-Activity
              </div>
              <div style={{ color: '#666' }}>{week.miniActivity}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PhaseRow({ phase, index }: { phase: CSBridgePhase; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div>
      <button
        className="w-full text-left py-4 flex items-center justify-between"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div>
          <div className="text-sm font-medium" style={{ color: phase.color }}>
            {phase.name}
          </div>
          <div className="text-xs mt-0.5" style={{ color: '#555' }}>
            {phase.range}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: '#444' }}>
            {phase.weeks.length}w
          </span>
          <span className="text-xs" style={{ color: '#333' }}>
            {open ? '-' : '+'}
          </span>
        </div>
      </button>

      {open && (
        <div className="pb-6">
          <div className="pl-4 mb-4" style={{ borderLeft: `2px solid ${phase.color}30` }}>
            <div className="text-xs leading-relaxed" style={{ color: '#666' }}>
              {phase.theme}
            </div>
          </div>

          <div className="space-y-1">
            {phase.weeks.map((week) => (
              <WeekRow key={week.week} week={week} phaseColor={phase.color} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CSBridgePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#e8e4df' }}>
      <div className="max-w-3xl mx-auto px-4 py-10 lg:px-8 lg:py-16">
        <header className="mb-16">
          <h2
            className="text-3xl font-bold tracking-tight mb-3"
            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
          >
            {CS_BRIDGE_HEADER}
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: '#666' }}>
            CS-only companion view for Coach Lamont. Each week maps chess instruction to a computer science
            conversation prompt.
          </p>
        </header>

        <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          {CS_BRIDGE_PHASES.map((phase, index) => (
            <PhaseRow key={phase.id} phase={phase} index={index} />
          ))}
        </div>

        <footer className="text-[0.55rem] pt-16" style={{ color: '#333' }}>
          BeyondChess CS Bridge · Working Wonders Starting Home Inc. · 2026
        </footer>
      </div>
    </main>
  );
}
