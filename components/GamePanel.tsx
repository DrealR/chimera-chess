'use client';

import type { GameState } from '@/lib/chess';
import type { Piece } from '@/lib/types';
import { randomInsight } from '@/lib/insights';
import { useState, useMemo } from 'react';
import { MiniPiece } from './ChessPiece';

type GamePanelProps = {
  game: GameState;
  history: { state: GameState; notation: string }[];
  showInfluence: boolean;
  onToggleInfluence: () => void;
  showProtocol: boolean;
  onToggleProtocol: () => void;
  onNewGame: () => void;
  onResign: () => void;
};

const PIECE_ORDER: Record<string, number> = { Q: 0, R: 1, B: 2, N: 3, P: 4 };

function sortCaptured(pieces: Piece[]): Piece[] {
  return [...pieces].sort((a, b) => (PIECE_ORDER[a.type] ?? 5) - (PIECE_ORDER[b.type] ?? 5));
}

function Toggle({ active, onToggle, label }: { active: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-2.5 text-xs w-full text-left"
      style={{ color: active ? '#c8956c' : '#777' }}
      onClick={onToggle}
    >
      <div className={`toggle-switch ${active ? 'active' : ''}`} />
      {label}
    </button>
  );
}

export default function GamePanel({
  game,
  history,
  showInfluence,
  onToggleInfluence,
  showProtocol,
  onToggleProtocol,
  onNewGame,
  onResign,
}: GamePanelProps) {
  const [insight] = useState(() => randomInsight());

  const statusText = useMemo(() => {
    switch (game.status) {
      case 'checkmate':
        return game.turn === 'w' ? 'Black wins by checkmate!' : 'White wins by checkmate!';
      case 'stalemate':
        return 'Draw by stalemate!';
      case 'check':
        return `${game.turn === 'w' ? 'White' : 'Black'} is in check!`;
      default:
        return `${game.turn === 'w' ? 'White' : 'Black'} to move`;
    }
  }, [game.status, game.turn]);

  const gameOver = game.status === 'checkmate' || game.status === 'stalemate';

  return (
    <div className="glass-panel p-5 flex flex-col gap-4 w-full">
      {/* Turn / Status */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#c8956c' }}>
          Game
        </h3>
        <div
          className="px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
          style={{
            backgroundColor: gameOver
              ? 'rgba(240,160,80,0.12)'
              : game.turn === 'w'
              ? 'rgba(80,144,255,0.08)'
              : 'rgba(255,80,96,0.08)',
            color: gameOver ? '#f0a050' : game.turn === 'w' ? '#5090ff' : '#ff5060',
            border: `1px solid ${
              gameOver ? 'rgba(240,160,80,0.15)' : game.turn === 'w' ? 'rgba(80,144,255,0.1)' : 'rgba(255,80,96,0.1)'
            }`,
          }}
        >
          <span
            className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{
              backgroundColor: gameOver ? '#f0a050' : game.turn === 'w' ? '#f0e8d8' : '#2d2d2d',
              border: gameOver ? 'none' : game.turn === 'w' ? '1px solid #997744' : '1px solid #666',
            }}
          />
          {statusText}
        </div>
      </div>

      {/* Captured Pieces — SVG mini pieces */}
      <div className="space-y-1.5">
        <div className="text-[0.65rem] uppercase tracking-wider" style={{ color: '#666' }}>
          Captured
        </div>
        <div className="flex gap-4">
          <div className="flex flex-wrap gap-0.5 items-center min-h-[24px]">
            {sortCaptured(game.captured.w).map((p, i) => (
              <MiniPiece key={i} type={p.type} color={p.color} />
            ))}
            {game.captured.w.length === 0 && (
              <span className="text-xs" style={{ color: '#444' }}>&mdash;</span>
            )}
          </div>
          <div className="flex flex-wrap gap-0.5 items-center min-h-[24px]">
            {sortCaptured(game.captured.b).map((p, i) => (
              <MiniPiece key={i} type={p.type} color={p.color} />
            ))}
            {game.captured.b.length === 0 && (
              <span className="text-xs" style={{ color: '#444' }}>&mdash;</span>
            )}
          </div>
        </div>
      </div>

      {/* Move History */}
      <div className="space-y-1.5">
        <div className="text-[0.65rem] uppercase tracking-wider" style={{ color: '#666' }}>
          Moves
        </div>
        <div
          className="max-h-40 overflow-y-auto rounded-lg p-2.5 text-xs font-mono"
          style={{
            backgroundColor: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {history.length === 0 ? (
            <span style={{ color: '#444' }}>No moves yet</span>
          ) : (
            <div className="space-y-0.5">
              {Array.from({ length: Math.ceil(history.length / 2) }, (_, moveNum) => {
                const wIdx = moveNum * 2;
                const bIdx = moveNum * 2 + 1;
                return (
                  <div
                    key={moveNum}
                    className="flex gap-1 px-1 py-0.5 rounded"
                    style={{
                      backgroundColor: moveNum % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                    }}
                  >
                    <span className="w-6 text-right" style={{ color: '#555' }}>
                      {moveNum + 1}.
                    </span>
                    <span className="w-14" style={{ color: '#ddd' }}>
                      {history[wIdx]?.notation}
                    </span>
                    {history[bIdx] && (
                      <span className="w-14" style={{ color: '#999' }}>
                        {history[bIdx].notation}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Toggle Switches */}
      <div className="space-y-2.5">
        <Toggle
          active={showInfluence}
          onToggle={onToggleInfluence}
          label="Influence overlay"
        />
        <Toggle
          active={showProtocol}
          onToggle={onToggleProtocol}
          label="The Cheat Code"
        />
      </div>

      {/* Cheat Code Protocol */}
      {showProtocol && (
        <div
          className="rounded-lg p-3.5 space-y-1.5 text-xs"
          style={{
            backgroundColor: 'rgba(240,160,80,0.06)',
            borderLeft: '3px solid rgba(240,160,80,0.4)',
          }}
        >
          <div className="font-bold text-xs" style={{ color: '#f0a050' }}>
            The Cheat Code
          </div>
          <div className="space-y-0.5" style={{ color: '#aaa' }}>
            <div><span style={{ color: '#5090ff' }}>1. LOOK</span> &mdash; What did they just do?</div>
            <div><span style={{ color: '#f0a050' }}>2. THINK</span> &mdash; What are my 3 options?</div>
            <div><span style={{ color: '#ff5060' }}>3. CHECK</span> &mdash; If I do this, what will they do?</div>
            <div><span style={{ color: '#50c878' }}>4. MOVE</span> &mdash; Pick the best. Commit.</div>
            <div><span style={{ color: '#888' }}>5. RESET</span> &mdash; Breathe. Observe fresh.</div>
          </div>
        </div>
      )}

      {/* Insight — parchment card */}
      <div className="parchment-card px-3.5 py-3 text-xs" style={{ color: '#999' }}>
        &ldquo;{insight.text}&rdquo;
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          className="flex-1 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors"
          style={{
            backgroundColor: 'rgba(80,200,120,0.1)',
            color: '#50c878',
            border: '1px solid rgba(80,200,120,0.12)',
          }}
          onClick={onNewGame}
        >
          New Game
        </button>
        {!gameOver && (
          <button
            className="flex-1 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors"
            style={{
              backgroundColor: 'rgba(255,80,96,0.1)',
              color: '#ff5060',
              border: '1px solid rgba(255,80,96,0.12)',
            }}
            onClick={onResign}
          >
            Resign
          </button>
        )}
      </div>
    </div>
  );
}
