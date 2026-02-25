'use client';

import type { BoardState } from '@/lib/types';
import type { InfluenceMap } from '@/lib/engine';

type StatsPanelProps = {
  board: BoardState;
  influence: InfluenceMap;
};

export default function StatsPanel({ board, influence }: StatsPanelProps) {
  let whitePieces = 0;
  let blackPieces = 0;
  for (const row of board) {
    for (const sq of row) {
      if (sq?.color === 'w') whitePieces++;
      if (sq?.color === 'b') blackPieces++;
    }
  }

  let whiteZones = 0;
  let blackZones = 0;
  let contested = 0;
  let deadZones = 0;
  let whiteTotal = 0;
  let blackTotal = 0;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const w = influence.white[r][c];
      const b = influence.black[r][c];
      whiteTotal += w;
      blackTotal += b;
      if (w > 0 && b > 0) contested++;
      else if (w > 0) whiteZones++;
      else if (b > 0) blackZones++;
      else deadZones++;
    }
  }

  const maxInfluence = Math.max(whiteTotal, blackTotal, 1);

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#c8956c' }}>
        Breathing Report
      </h3>

      {/* Lung Capacity bars */}
      <div className="space-y-2">
        <div className="text-[0.65rem] uppercase" style={{ color: '#888' }}>
          Lung Capacity
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs w-10" style={{ color: '#5090ff' }}>White</span>
            <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(whiteTotal / maxInfluence) * 100}%`,
                  backgroundColor: '#5090ff',
                }}
              />
            </div>
            <span className="text-xs w-6 text-right font-mono" style={{ color: '#888' }}>
              {whiteTotal}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs w-10" style={{ color: '#ff5060' }}>Black</span>
            <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(blackTotal / maxInfluence) * 100}%`,
                  backgroundColor: '#ff5060',
                }}
              />
            </div>
            <span className="text-xs w-6 text-right font-mono" style={{ color: '#888' }}>
              {blackTotal}
            </span>
          </div>
        </div>
      </div>

      {/* Square Control grid */}
      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="rounded p-2" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
          <div className="text-lg font-bold" style={{ color: '#5090ff' }}>{whiteZones}</div>
          <div className="text-[0.6rem] uppercase" style={{ color: '#888' }}>White zones</div>
        </div>
        <div className="rounded p-2" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
          <div className="text-lg font-bold" style={{ color: '#ff5060' }}>{blackZones}</div>
          <div className="text-[0.6rem] uppercase" style={{ color: '#888' }}>Black zones</div>
        </div>
        <div className="rounded p-2" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
          <div className="text-lg font-bold" style={{ color: '#a060ff' }}>{contested}</div>
          <div className="text-[0.6rem] uppercase" style={{ color: '#888' }}>Contested</div>
        </div>
        <div className="rounded p-2" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
          <div className="text-lg font-bold" style={{ color: '#555' }}>{deadZones}</div>
          <div className="text-[0.6rem] uppercase" style={{ color: '#888' }}>Dead zones</div>
        </div>
      </div>

      {/* Piece count */}
      <div className="flex justify-between text-xs" style={{ color: '#888' }}>
        <span>
          Pieces: <span style={{ color: '#5090ff' }}>{whitePieces}</span> white
        </span>
        <span>
          <span style={{ color: '#ff5060' }}>{blackPieces}</span> black
        </span>
      </div>
    </div>
  );
}
