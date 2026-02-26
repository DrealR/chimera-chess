'use client';

import type { GameState } from '@/lib/chess';
import type { Piece } from '@/lib/types';
import type { Difficulty } from '@/lib/ai';
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
  difficulty: Difficulty;
  onDifficultyChange: (d: Difficulty) => void;
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
  difficulty,
  onDifficultyChange,
}: GamePanelProps) {
  const [insight] = useState(() => randomInsight());

  const statusText = useMemo(() => {
    switch (game.status) {
      case 'checkmate':
        return game.turn === 'w' ? 'Black wins' : 'White wins';
      case 'stalemate':
        return 'Draw';
      case 'check':
        return `${game.turn === 'w' ? 'White' : 'Black'} in check`;
      default:
        return `${game.turn === 'w' ? 'White' : 'Black'} to move`;
    }
  }, [game.status, game.turn]);

  const gameOver = game.status === 'checkmate' || game.status === 'stalemate';

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Status */}
      <div>
        <div className="text-sm font-medium" style={{ color: gameOver ? '#c8956c' : '#888' }}>
          {statusText}
        </div>
      </div>

      {/* Captured */}
      <div>
        <div className="text-[0.6rem] uppercase tracking-widest mb-2" style={{ color: '#444' }}>
          Captured
        </div>
        <div className="flex gap-4">
          <div className="flex flex-wrap gap-0.5 items-center min-h-[20px] opacity-50">
            {sortCaptured(game.captured.w).map((p, i) => (
              <MiniPiece key={i} type={p.type} color={p.color} />
            ))}
            {game.captured.w.length === 0 && (
              <span className="text-xs" style={{ color: '#333' }}>&mdash;</span>
            )}
          </div>
          <div className="flex flex-wrap gap-0.5 items-center min-h-[20px] opacity-50">
            {sortCaptured(game.captured.b).map((p, i) => (
              <MiniPiece key={i} type={p.type} color={p.color} />
            ))}
            {game.captured.b.length === 0 && (
              <span className="text-xs" style={{ color: '#333' }}>&mdash;</span>
            )}
          </div>
        </div>
      </div>

      {/* Move History */}
      <div>
        <div className="text-[0.6rem] uppercase tracking-widest mb-2" style={{ color: '#444' }}>
          Moves
        </div>
        <div
          className="max-h-48 overflow-y-auto font-mono text-xs leading-relaxed"
          style={{ color: '#555' }}
        >
          {history.length === 0 ? (
            <span style={{ color: '#333' }}>&mdash;</span>
          ) : (
            <div className="space-y-px">
              {Array.from({ length: Math.ceil(history.length / 2) }, (_, moveNum) => {
                const wIdx = moveNum * 2;
                const bIdx = moveNum * 2 + 1;
                return (
                  <div key={moveNum} className="flex gap-1">
                    <span style={{ color: '#444' }}>{moveNum + 1}.</span>
                    <span style={{ color: '#888' }}>{history[wIdx]?.notation}</span>
                    {history[bIdx] && (
                      <span style={{ color: '#666' }}>{history[bIdx].notation}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-1.5">
        <button
          className="text-xs text-left transition-colors"
          style={{ color: showInfluence ? '#c8956c' : '#444' }}
          onClick={onToggleInfluence}
          aria-pressed={showInfluence}
        >
          {showInfluence ? '\u25CF' : '\u25CB'} Influence
        </button>
        <button
          className="text-xs text-left transition-colors"
          style={{ color: showProtocol ? '#c8956c' : '#444' }}
          onClick={onToggleProtocol}
          aria-pressed={showProtocol}
        >
          {showProtocol ? '\u25CF' : '\u25CB'} The Cheat Code
        </button>
      </div>

      {/* Protocol */}
      {showProtocol && (
        <div className="text-xs leading-loose" style={{ color: '#666' }}>
          <span style={{ color: '#4a90d9' }}>Look</span> &rarr;{' '}
          <span style={{ color: '#c8956c' }}>Think</span> &rarr;{' '}
          <span style={{ color: '#c85050' }}>Check</span> &rarr;{' '}
          <span style={{ color: '#888' }}>Move</span> &rarr;{' '}
          <span style={{ color: '#555' }}>Reset</span>
        </div>
      )}

      {/* Insight */}
      <div className="text-xs italic leading-relaxed" style={{ color: '#444' }}>
        &ldquo;{insight.text}&rdquo;
      </div>

      {/* Difficulty */}
      <div>
        <div className="text-[0.6rem] uppercase tracking-widest mb-2" style={{ color: '#444' }}>
          Difficulty
        </div>
        <div className="flex gap-3 text-xs">
          {(['easy', 'medium', 'hard'] as const).map((d) => (
            <button
              key={d}
              className="transition-colors capitalize"
              style={{ color: difficulty === d ? '#c8956c' : '#444' }}
              onClick={() => onDifficultyChange(d)}
              aria-pressed={difficulty === d}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 text-xs">
        <button
          className="transition-opacity hover:opacity-70"
          style={{ color: '#c8956c' }}
          onClick={onNewGame}
        >
          New game
        </button>
        {!gameOver && (
          <button
            className="transition-opacity hover:opacity-70"
            style={{ color: '#444' }}
            onClick={onResign}
          >
            Resign
          </button>
        )}
      </div>
    </div>
  );
}
