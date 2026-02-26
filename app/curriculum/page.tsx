'use client';

import { useState } from 'react';
import { PHASES, type CurriculumPhase, type CurriculumWeek } from '@/lib/curriculum';

function PhaseCard({ phase, index }: { phase: CurriculumPhase; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: `1px solid ${phase.color}20` }}
    >
      {/* Phase Header */}
      <button
        className="w-full text-left px-5 py-4 flex items-center justify-between"
        style={{ borderLeft: `4px solid ${phase.color}` }}
        onClick={() => setOpen(!open)}
      >
        <div>
          <div className="text-sm font-bold" style={{ color: phase.color }}>
            {phase.name}
          </div>
          <div className="text-xs mt-0.5" style={{ color: '#888' }}>
            {phase.theme}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: '#666' }}>
            {phase.weeks.length} weeks
          </span>
          <span
            className="text-sm transition-transform"
            style={{ color: '#555', transform: open ? 'rotate(90deg)' : 'none' }}
          >
            &#9654;
          </span>
        </div>
      </button>

      {/* Phase Themes */}
      {open && (
        <div className="px-5 pb-2">
          <div className="flex flex-wrap gap-4 py-3 text-[0.65rem]" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="flex-1 min-w-[200px]">
              <div className="uppercase font-bold mb-1" style={{ color: '#c8956c' }}>CHIMERA Layer</div>
              <div style={{ color: '#888' }}>{phase.chimeraTheme}</div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="uppercase font-bold mb-1" style={{ color: '#5090ff' }}>CS Bridge</div>
              <div style={{ color: '#888' }}>{phase.csTheme}</div>
            </div>
          </div>
        </div>
      )}

      {/* Weeks */}
      {open && (
        <div className="px-5 pb-4 space-y-3">
          {phase.weeks.map((week) => (
            <WeekCard key={week.week} week={week} phaseColor={phase.color} />
          ))}
        </div>
      )}
    </div>
  );
}

function WeekCard({ week, phaseColor }: { week: CurriculumWeek; phaseColor: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-md overflow-hidden"
      style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
    >
      <button
        className="w-full text-left px-4 py-3 flex items-center gap-3"
        onClick={() => setExpanded(!expanded)}
      >
        <span
          className="text-xs font-mono font-bold flex-shrink-0 w-7 text-center"
          style={{ color: phaseColor }}
        >
          {week.week}
        </span>
        <span className="text-sm font-medium flex-1" style={{ color: '#ddd' }}>
          {week.title}
        </span>
        <span
          className="text-xs transition-transform"
          style={{ color: '#555', transform: expanded ? 'rotate(90deg)' : 'none' }}
        >
          &#9654;
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          <div className="rounded p-3" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="text-[0.65rem] font-bold uppercase mb-1" style={{ color: '#e0a040' }}>
              Chess Fundamentals
            </div>
            <div className="text-xs leading-relaxed" style={{ color: '#bbb' }}>
              {week.chess}
            </div>
          </div>

          <div className="rounded p-3" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="text-[0.65rem] font-bold uppercase mb-1" style={{ color: '#c8956c' }}>
              CHIMERA Thinking Moment
            </div>
            <div className="text-xs leading-relaxed" style={{ color: '#bbb' }}>
              {week.chimera}
            </div>
          </div>

          <div className="rounded p-3" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="text-[0.65rem] font-bold uppercase mb-1" style={{ color: '#5090ff' }}>
              CS Bridge
            </div>
            <div className="text-xs leading-relaxed" style={{ color: '#bbb' }}>
              {week.cs}
            </div>
          </div>

          {week.creatureCheck && (
            <div
              className="rounded p-3"
              style={{ backgroundColor: 'rgba(80,200,120,0.05)', borderLeft: '3px solid #50c878' }}
            >
              <div className="text-[0.65rem] font-bold uppercase mb-1" style={{ color: '#50c878' }}>
                Creature Check
              </div>
              <div className="text-xs leading-relaxed italic" style={{ color: '#aaa' }}>
                &ldquo;{week.creatureCheck}&rdquo;
              </div>
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
      <div className="max-w-4xl mx-auto px-4 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-bold" style={{ color: '#f0a050' }}>
            50-Week Curriculum
          </h2>
          <p className="text-sm mt-1" style={{ color: '#888' }}>
            Chess + CHIMERA Systems Thinking + Computer Science
          </p>
          <p className="text-xs mt-2 leading-relaxed" style={{ color: '#666' }}>
            Created by Coach Lamont &mdash; Working Wonders Starting Home Inc.
            <br />
            CHIMERA Systems Thinking &amp; CS Bridge by Deji + Team
          </p>
        </div>

        {/* Core Philosophy Banner */}
        <div
          className="rounded-lg p-5 mb-8"
          style={{ backgroundColor: 'rgba(240,160,80,0.06)', borderLeft: '4px solid #f0a050' }}
        >
          <div className="text-sm font-bold mb-1" style={{ color: '#f0a050' }}>
            The Core Philosophy
          </div>
          <div className="text-xs leading-relaxed" style={{ color: '#aaa' }}>
            Your 16 pieces are not 16 separate things. They are <strong style={{ color: '#e8e4df' }}>ONE living creature</strong>.
            Pawns are the skin. Rooks are the bones. Bishops are the eyes. Knights are the joints.
            Queen is the strongest muscle. King is the heart. If the heart stops &mdash; that&apos;s checkmate.
            Everything else? Your creature living, fighting, adapting.
          </div>
        </div>

        {/* Phases */}
        <div className="space-y-4">
          {PHASES.map((phase, i) => (
            <PhaseCard key={phase.name} phase={phase} index={i} />
          ))}
        </div>

        {/* Footer */}
        <div className="text-[0.6rem] pt-8 mt-8" style={{ color: '#444', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          Coach Lamont &times; Deji &middot; Working Wonders Starting Home Inc. &middot; 2026
        </div>
      </div>
    </main>
  );
}
