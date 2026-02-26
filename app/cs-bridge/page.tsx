'use client';

import { useState } from 'react';
import {
  CS_BRIDGE_HEADER,
  CS_BRIDGE_PHASES,
  CS_BRIDGE_QUICK_REFERENCE,
  type CSBridgePhase,
  type CSBridgeWeek,
} from '@/lib/csBridge';

function CSWeekCard({ week, phaseColor }: { week: CSBridgeWeek; phaseColor: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-md overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
      <button
        className="w-full text-left px-4 py-3 flex items-center gap-3"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <span
          className="text-xs font-mono font-bold flex-shrink-0 w-8 text-center"
          style={{ color: phaseColor }}
        >
          {week.week}
        </span>
        <span className="text-sm font-medium flex-1" style={{ color: '#ddd' }}>
          {week.chessTopic}
        </span>
        <span className="text-xs font-mono hidden sm:inline" style={{ color: '#7c8ba5' }}>
          {week.csConcept}
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
            <div className="text-[0.65rem] font-bold uppercase mb-1" style={{ color: '#5090ff' }}>
              CS Concept
            </div>
            <div className="text-xs leading-relaxed" style={{ color: '#bbb' }}>
              {week.csConcept}
            </div>
          </div>

          <div className="rounded p-3" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="text-[0.65rem] font-bold uppercase mb-1" style={{ color: '#e0a040' }}>
              How It Connects
            </div>
            <div className="text-xs leading-relaxed" style={{ color: '#bbb' }}>
              {week.howItConnects}
            </div>
          </div>

          <div className="rounded p-3" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="text-[0.65rem] font-bold uppercase mb-1" style={{ color: '#50c878' }}>
              Discussion Question
            </div>
            <div className="text-xs leading-relaxed italic" style={{ color: '#bbb' }}>
              {week.discussionQuestion}
            </div>
          </div>

          {week.miniActivity && (
            <div
              className="rounded p-3"
              style={{ backgroundColor: 'rgba(80,200,120,0.06)', borderLeft: '3px solid #50c878' }}
            >
              <div className="text-[0.65rem] font-bold uppercase mb-1" style={{ color: '#50c878' }}>
                Mini-Activity
              </div>
              <div className="text-xs leading-relaxed" style={{ color: '#bbb' }}>
                {week.miniActivity}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CSPhaseCard({ phase, index }: { phase: CSBridgePhase; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: `1px solid ${phase.color}20` }}
    >
      <button
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
        style={{ borderLeft: `4px solid ${phase.color}` }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div>
          <div className="text-sm font-bold" style={{ color: phase.color }}>
            {phase.name}
          </div>
          <div className="text-xs mt-0.5" style={{ color: '#888' }}>
            {phase.range}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: '#7c8ba5' }}>
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

      {open && (
        <div className="px-5 pb-4 space-y-3">
          <div className="rounded p-3" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="text-[0.65rem] uppercase font-bold mb-1" style={{ color: '#888' }}>
              Phase Theme
            </div>
            <div className="text-xs leading-relaxed" style={{ color: '#aaa' }}>
              {phase.theme}
            </div>
          </div>

          {phase.weeks.map((week) => (
            <CSWeekCard key={week.week} week={week} phaseColor={phase.color} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CSBridgePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#e8e4df' }}>
      <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8 space-y-8">
        <header>
          <h2 className="text-xl font-bold" style={{ color: '#f0a050' }}>
            {CS_BRIDGE_HEADER}
          </h2>
          <p className="text-sm mt-1" style={{ color: '#888' }}>
            CS-only companion to the 50-week BeyondChess curriculum.
          </p>
        </header>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#5090ff' }}>
            50-Week Quick Reference
          </h3>

          <div
            className="rounded-lg overflow-hidden border"
            style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-xs">
                <thead style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: '#c8956c' }}>Week</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: '#c8956c' }}>Chess Topic</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: '#c8956c' }}>CS Concept</th>
                  </tr>
                </thead>
                <tbody>
                  {CS_BRIDGE_QUICK_REFERENCE.map((entry) => (
                    <tr
                      key={entry.week}
                      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <td className="px-3 py-2 font-mono" style={{ color: '#7c8ba5' }}>{entry.week}</td>
                      <td className="px-3 py-2" style={{ color: '#ddd' }}>{entry.chessTopic}</td>
                      <td className="px-3 py-2" style={{ color: '#9fb4d9' }}>{entry.csConcept}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#50c878' }}>
            9 Phases - Expand to View Week Details
          </h3>

          <div className="space-y-4">
            {CS_BRIDGE_PHASES.map((phase, index) => (
              <CSPhaseCard key={phase.id} phase={phase} index={index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
