'use client';

import { useState } from 'react';
import { PHASES, type CurriculumPhase, type CurriculumWeek } from '@/lib/curriculum';

function PhaseCard({ phase, index }: { phase: CurriculumPhase; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div>
      <button
        className="w-full text-left py-4 flex items-center justify-between group"
        onClick={() => setOpen(!open)}
      >
        <div>
          <div className="text-sm font-medium" style={{ color: phase.color }}>
            {phase.name}
          </div>
          <div className="text-xs mt-0.5" style={{ color: '#555' }}>
            {phase.theme}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: '#444' }}>
            {phase.weeks.length}w
          </span>
          <span
            className="text-xs transition-transform"
            style={{ color: '#444', transform: open ? 'rotate(90deg)' : 'none' }}
          >
            &#9654;
          </span>
        </div>
      </button>

      {open && (
        <div className="pb-6">
          <div className="flex gap-8 pb-4 text-xs" style={{ color: '#555' }}>
            <div>
              <span style={{ color: '#c8956c' }}>CHIMERA</span> {phase.chimeraTheme}
            </div>
            <div>
              <span style={{ color: '#4a90d9' }}>CS</span> {phase.csTheme}
            </div>
          </div>

          <div className="space-y-1">
            {phase.weeks.map((week) => (
              <WeekCard key={week.week} week={week} phaseColor={phase.color} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function WeekCard({ week, phaseColor }: { week: CurriculumWeek; phaseColor: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        className="w-full text-left py-2.5 flex items-center gap-3"
        onClick={() => setExpanded(!expanded)}
      >
        <span
          className="text-xs font-mono flex-shrink-0 w-6 text-right"
          style={{ color: phaseColor }}
        >
          {week.week}
        </span>
        <span className="text-sm flex-1" style={{ color: '#aaa' }}>
          {week.title}
        </span>
        <span className="text-xs" style={{ color: '#333' }}>
          {expanded ? '\u2212' : '+'}
        </span>
      </button>

      {expanded && (
        <div className="pl-9 pb-4 space-y-4 text-xs leading-relaxed">
          <div>
            <div className="uppercase tracking-widest text-[0.6rem] mb-1" style={{ color: '#c8956c' }}>
              Chess
            </div>
            <div style={{ color: '#777' }}>{week.chess}</div>
          </div>

          <div>
            <div className="uppercase tracking-widest text-[0.6rem] mb-1" style={{ color: '#888' }}>
              CHIMERA
            </div>
            <div style={{ color: '#777' }}>{week.chimera}</div>
          </div>

          <div>
            <div className="uppercase tracking-widest text-[0.6rem] mb-1" style={{ color: '#4a90d9' }}>
              CS Bridge
            </div>
            <div style={{ color: '#777' }}>{week.cs}</div>
          </div>

          {week.creatureCheck && (
            <div className="italic" style={{ color: '#666' }}>
              &ldquo;{week.creatureCheck}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CurriculumPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#e8e4df' }}>
      <div className="max-w-3xl mx-auto px-4 py-10 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="mb-16">
          <h2
            className="text-3xl font-bold tracking-tight mb-3"
            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
          >
            50-Week Curriculum
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: '#666' }}>
            Chess + CHIMERA Systems Thinking + Computer Science
          </p>
          <p className="text-xs mt-3" style={{ color: '#444' }}>
            Coach Lamont &mdash; Working Wonders Starting Home Inc.
          </p>
        </div>

        {/* Philosophy */}
        <div className="mb-16 pl-4" style={{ borderLeft: '2px solid rgba(200,149,108,0.2)' }}>
          <div className="text-sm leading-relaxed" style={{ color: '#888' }}>
            Your 16 pieces are not 16 separate things. They are <strong style={{ color: '#e8e4df' }}>one living creature</strong>.
            Pawns are the skin. Rooks are the bones. Bishops are the eyes. Knights are the joints.
            Queen is the strongest muscle. King is the heart. If the heart stops &mdash; checkmate.
          </div>
        </div>

        {/* Phases */}
        <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          {PHASES.map((phase, i) => (
            <PhaseCard key={phase.name} phase={phase} index={i} />
          ))}
        </div>

        {/* Footer */}
        <div className="text-[0.55rem] pt-16" style={{ color: '#333' }}>
          Coach Lamont &times; Deji &middot; Working Wonders Starting Home Inc. &middot; 2026
        </div>
      </div>
    </main>
  );
}
