'use client';

import { useState, useMemo, useCallback } from 'react';
import type { BoardState, ViewMode, ToolSelection } from '@/lib/types';
import { createEmptyBoard, deepCopyBoard } from '@/lib/types';
import { calculateInfluence, getAttackedSquares } from '@/lib/engine';
import { PRESETS } from '@/lib/presets';
import Board from '@/components/Board';
import PiecePalette from '@/components/PiecePalette';
import StatsPanel from '@/components/StatsPanel';

const VIEW_MODES: { key: ViewMode; label: string; color: string }[] = [
  { key: 'both', label: 'Both', color: '#c8956c' },
  { key: 'white', label: 'White', color: '#5090ff' },
  { key: 'black', label: 'Black', color: '#ff5060' },
  { key: 'contest', label: 'Contest', color: '#a060ff' },
];

export default function InfluenceMapPage() {
  const [board, setBoard] = useState<BoardState>(() => deepCopyBoard(PRESETS[0].board));
  const [viewMode, setViewMode] = useState<ViewMode>('both');
  const [tool, setTool] = useState<ToolSelection>(null);
  const [highlightedPiece, setHighlightedPiece] = useState<[number, number] | null>(null);
  const [showLabels, setShowLabels] = useState(true);

  const influence = useMemo(() => calculateInfluence(board), [board]);

  const highlightedSquares = useMemo(() => {
    if (!highlightedPiece) return null;
    const [r, c] = highlightedPiece;
    const piece = board[r][c];
    if (!piece) return null;
    const attacked = getAttackedSquares(board, r, c, piece);
    return new Set(attacked.map(([ar, ac]) => `${ar},${ac}`));
  }, [board, highlightedPiece]);

  const handleSquareClick = useCallback(
    (row: number, col: number) => {
      if (tool) {
        // Place or erase
        setBoard((prev) => {
          const next = deepCopyBoard(prev);
          next[row][col] = tool.kind === 'eraser' ? null : { ...tool.piece };
          return next;
        });
        setHighlightedPiece(null);
      } else {
        // Toggle piece highlight
        if (highlightedPiece?.[0] === row && highlightedPiece?.[1] === col) {
          setHighlightedPiece(null);
        } else if (board[row][col]) {
          setHighlightedPiece([row, col]);
        } else {
          setHighlightedPiece(null);
        }
      }
    },
    [tool, board, highlightedPiece],
  );

  const handlePreset = useCallback((index: number) => {
    setBoard(deepCopyBoard(PRESETS[index].board));
    setHighlightedPiece(null);
    setTool(null);
  }, []);

  const handleClear = useCallback(() => {
    setBoard(createEmptyBoard());
    setHighlightedPiece(null);
  }, []);

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#e8e4df' }}>
      {/* Header */}
      <header
        className="px-4 py-3 lg:px-8"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-7xl mx-auto flex items-baseline gap-3">
          <h1 className="text-lg font-bold tracking-tight">
            <span style={{ color: '#c8956c' }}>BeyondChess</span>
            <span className="mx-1.5" style={{ color: '#555' }}>
              &times;
            </span>
            <span>CHIMERA</span>
          </h1>
          <span className="text-xs hidden sm:inline" style={{ color: '#555' }}>
            See your creature breathe.
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Board */}
          <div className="flex-shrink-0 w-full max-w-[560px] mx-auto lg:mx-0">
            <Board
              board={board}
              influence={influence}
              viewMode={viewMode}
              highlightedSquares={highlightedSquares}
              highlightedPiecePos={highlightedPiece}
              showLabels={showLabels}
              onSquareClick={handleSquareClick}
              activeTool={tool !== null}
            />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5 w-full lg:min-w-[240px] lg:max-w-[320px]">
            {/* View Mode */}
            <div className="space-y-2">
              <h3
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: '#c8956c' }}
              >
                View Mode
              </h3>
              <div className="flex flex-wrap gap-1">
                {VIEW_MODES.map(({ key, label, color }) => (
                  <button
                    key={key}
                    className="px-3 py-1.5 rounded text-xs font-medium"
                    style={
                      viewMode === key
                        ? {
                            backgroundColor: `${color}20`,
                            color,
                            boxShadow: `inset 0 0 0 1px ${color}`,
                          }
                        : { backgroundColor: 'rgba(255,255,255,0.04)', color: '#888' }
                    }
                    onClick={() => setViewMode(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <h3
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: '#c8956c' }}
              >
                Presets
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((preset, i) => (
                  <button
                    key={preset.name}
                    className="px-2.5 py-1 rounded text-xs"
                    style={{ backgroundColor: 'rgba(255,255,255,0.04)', color: '#888' }}
                    onClick={() => handlePreset(i)}
                    title={preset.description}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Piece Palette */}
            <PiecePalette selection={tool} onSelect={setTool} onClear={handleClear} />

            {/* Labels Toggle */}
            <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: '#888' }}>
              <input
                type="checkbox"
                checked={showLabels}
                onChange={(e) => setShowLabels(e.target.checked)}
                className="accent-amber-600"
              />
              Show coordinates
            </label>

            {/* Stats */}
            <StatsPanel board={board} influence={influence} />

            {/* Footer credit */}
            <div className="text-[0.6rem] pt-4" style={{ color: '#444', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              BeyondChess&trade; &times; CHIMERA &mdash; Coach Lamont &times; Deji
              <br />
              Working Wonders Starting Home Inc. &bull; 2026
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
