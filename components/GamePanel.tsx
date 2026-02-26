'use client';

import type { GameState } from '@/lib/chess';
import type { Piece } from '@/lib/types';
import { pieceSymbol } from '@/lib/types';
import { randomInsight } from '@/lib/insights';
import { useState, useMemo } from 'react';

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
    <div className="flex flex-col gap-4 w-full">
      {/* Turn / Status */}
      <div className="space-y-1">
        <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#c8956c' }}>
          Game
        </h3>
        <div
          className="px-3 py-2 rounded text-sm font-medium"
          style={{
            backgroundColor: gameOver ? 'rgba(240,160,80,0.15)' : 'rgba(255,255,255,0.04)',
            color: gameOver ? '#f0a050' : game.turn === 'w' ? '#5090ff' : '#ff5060',
          }}
        >
          {statusText}
        </div>
      </div>

      {/* Captured Pieces */}
      <div className="space-y-1">
        <div className="text-[0.65rem] uppercase" style={{ color: '#888' }}>Captured</div>
        <div className="flex gap-4">
          <div className="flex flex-wrap gap-0.5 text-lg">
            {sortCaptured(game.captured.w).map((p, i) => (
              <span key={i} title={p.type} style={{ opacity: 0.7 }}>{pieceSymbol(p)}</span>
            ))}
            {game.captured.w.length === 0 && <span className="text-xs" style={{ color: '#555' }}>—</span>}
          </div>
          <div className="flex flex-wrap gap-0.5 text-lg">
            {sortCaptured(game.captured.b).map((p, i) => (
              <span key={i} title={p.type} style={{ opacity: 0.7 }}>{pieceSymbol(p)}</span>
            ))}
            {game.captured.b.length === 0 && <span className="text-xs" style={{ color: '#555' }}>—</span>}
          </div>
        </div>
      </div>

      {/* Move History */}
      <div className="space-y-1">
        <div className="text-[0.65rem] uppercase" style={{ color: '#888' }}>Moves</div>
        <div
          className="max-h-40 overflow-y-auto rounded p-2 text-xs font-mono"
          style={{ backgroundColor: 'rgba(255,255,255,0.03)', color: '#aaa' }}
        >
          {history.length === 0 ? (
            <span style={{ color: '#555' }}>No moves yet</span>
          ) : (
            <div className="flex flex-wrap gap-x-1 gap-y-0.5">
              {history.map((h, i) => (
                <span key={i}>
                  {i % 2 === 0 && (
                    <span style={{ color: '#666' }}>{Math.floor(i / 2) + 1}.</span>
                  )}
                  <span className="ml-0.5" style={{ color: i % 2 === 0 ? '#ddd' : '#aaa' }}>
                    {h.notation}
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: '#888' }}>
          <input
            type="checkbox"
            checked={showInfluence}
            onChange={onToggleInfluence}
            className="accent-amber-600"
          />
          Show influence overlay
        </label>
        <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: '#888' }}>
          <input
            type="checkbox"
            checked={showProtocol}
            onChange={onToggleProtocol}
            className="accent-amber-600"
          />
          Show Cheat Code
        </label>
      </div>

      {/* Cheat Code Protocol */}
      {showProtocol && (
        <div
          className="rounded p-3 space-y-1.5 text-xs"
          style={{ backgroundColor: 'rgba(240,160,80,0.08)', borderLeft: '3px solid #f0a050' }}
        >
          <div className="font-bold text-xs" style={{ color: '#f0a050' }}>The Cheat Code</div>
          <div style={{ color: '#aaa' }}>
            <div><span style={{ color: '#5090ff' }}>1. LOOK</span> — What did they just do?</div>
            <div><span style={{ color: '#f0a050' }}>2. THINK</span> — What are my 3 options?</div>
            <div><span style={{ color: '#ff5060' }}>3. CHECK</span> — If I do this, what will they do?</div>
            <div><span style={{ color: '#50c878' }}>4. MOVE</span> — Pick the best. Commit.</div>
            <div><span style={{ color: '#888' }}>5. RESET</span> — Breathe. Observe fresh.</div>
          </div>
        </div>
      )}

      {/* Insight */}
      <div
        className="rounded p-3 text-xs italic"
        style={{ backgroundColor: 'rgba(255,255,255,0.02)', color: '#777', borderLeft: '2px solid #333' }}
      >
        &ldquo;{insight.text}&rdquo;
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          className="flex-1 px-3 py-2 rounded text-xs font-medium"
          style={{ backgroundColor: 'rgba(80,200,120,0.1)', color: '#50c878' }}
          onClick={onNewGame}
        >
          New Game
        </button>
        {!gameOver && (
          <button
            className="flex-1 px-3 py-2 rounded text-xs font-medium"
            style={{ backgroundColor: 'rgba(255,80,96,0.1)', color: '#ff5060' }}
            onClick={onResign}
          >
            Resign
          </button>
        )}
      </div>
    </div>
  );
}
