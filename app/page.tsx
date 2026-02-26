'use client';

import { useState, useMemo, useCallback } from 'react';
import type { BoardState, ViewMode, ToolSelection } from '@/lib/types';
import { createEmptyBoard, deepCopyBoard } from '@/lib/types';
import { calculateInfluence, getAttackedSquares } from '@/lib/engine';
import { PRESETS } from '@/lib/presets';
import Board from '@/components/Board';
import PiecePalette from '@/components/PiecePalette';
import StatsPanel from '@/components/StatsPanel';

const VIEW_MODES: { key: ViewMode; label: string }[] = [
  { key: 'both', label: 'Both' },
  { key: 'white', label: 'White' },
  { key: 'black', label: 'Black' },
  { key: 'contest', label: 'Contest' },
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
        setBoard((prev) => {
          const next = deepCopyBoard(prev);
          next[row][col] = tool.kind === 'eraser' ? null : { ...tool.piece };
          return next;
        });
        setHighlightedPiece(null);
      } else {
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
      <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8 lg:py-14">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Board */}
          <div className="flex-1 w-full max-w-[600px] mx-auto lg:mx-0">
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
          <div className="flex flex-col gap-6 w-full lg:w-[220px] lg:flex-shrink-0">
            {/* View Mode */}
            <div>
              <div className="text-[0.6rem] uppercase tracking-widest mb-2" style={{ color: '#444' }}>
                View
              </div>
              <div className="flex flex-wrap gap-3">
                {VIEW_MODES.map(({ key, label }) => (
                  <button
                    key={key}
                    className="text-xs transition-colors"
                    style={{ color: viewMode === key ? '#c8956c' : '#444' }}
                    onClick={() => setViewMode(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Presets */}
            <div>
              <div className="text-[0.6rem] uppercase tracking-widest mb-2" style={{ color: '#444' }}>
                Presets
              </div>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset, i) => (
                  <button
                    key={preset.name}
                    className="text-xs transition-colors"
                    style={{ color: '#666' }}
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
            <button
              className="text-xs text-left transition-colors"
              style={{ color: showLabels ? '#c8956c' : '#444' }}
              onClick={() => setShowLabels((p) => !p)}
            >
              {showLabels ? '\u25CF' : '\u25CB'} Coordinates
            </button>

            {/* Stats */}
            <StatsPanel board={board} influence={influence} />

            {/* Footer */}
            <div className="text-[0.55rem] pt-4" style={{ color: '#333' }}>
              Coach Lamont &times; Deji &middot; Working Wonders Starting Home Inc.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
