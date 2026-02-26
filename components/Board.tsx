'use client';

import { useState, useMemo } from 'react';
import type { BoardState, ViewMode } from '@/lib/types';
import { pieceSymbol, squareName, FILES, RANKS } from '@/lib/types';
import type { InfluenceMap } from '@/lib/engine';

type BoardProps = {
  board: BoardState;
  influence: InfluenceMap;
  viewMode: ViewMode;
  highlightedSquares: Set<string> | null;
  highlightedPiecePos: [number, number] | null;
  showLabels: boolean;
  onSquareClick: (row: number, col: number) => void;
  activeTool: boolean;
  // Play-mode optional props
  legalMoves?: Set<string>;
  lastMove?: { from: [number, number]; to: [number, number] };
  checkSquare?: [number, number] | null;
  selectedSquare?: [number, number] | null;
};

function getOverlayColor(
  row: number,
  col: number,
  influence: InfluenceMap,
  viewMode: ViewMode,
  highlightedSquares: Set<string> | null,
  highlightedPiecePos: [number, number] | null,
): string {
  // Single-piece highlight mode
  if (highlightedSquares) {
    if (highlightedPiecePos && highlightedPiecePos[0] === row && highlightedPiecePos[1] === col) {
      return 'rgba(80, 200, 120, 0.5)';
    }
    if (highlightedSquares.has(`${row},${col}`)) {
      return 'rgba(80, 200, 120, 0.4)';
    }
    return 'transparent';
  }

  const w = influence.white[row][col];
  const b = influence.black[row][col];

  if (viewMode === 'white') {
    if (w === 0) return 'transparent';
    return `rgba(80, 144, 255, ${Math.min(0.15 + 0.13 * w, 0.75)})`;
  }
  if (viewMode === 'black') {
    if (b === 0) return 'transparent';
    return `rgba(255, 80, 96, ${Math.min(0.15 + 0.13 * b, 0.75)})`;
  }
  if (viewMode === 'contest') {
    if (w === 0 && b === 0) return 'transparent';
    if (w > b) return `rgba(80, 144, 255, ${Math.min(0.15 + 0.13 * (w - b), 0.75)})`;
    if (b > w) return `rgba(255, 80, 96, ${Math.min(0.15 + 0.13 * (b - w), 0.75)})`;
    return `rgba(160, 96, 255, ${Math.min(0.2 + 0.1 * w, 0.7)})`;
  }

  // 'both' mode
  if (w === 0 && b === 0) return 'transparent';
  if (w > 0 && b === 0) return `rgba(80, 144, 255, ${Math.min(0.15 + 0.13 * w, 0.75)})`;
  if (b > 0 && w === 0) return `rgba(255, 80, 96, ${Math.min(0.15 + 0.13 * b, 0.75)})`;
  return `rgba(160, 96, 255, ${Math.min(0.15 + 0.1 * (w + b), 0.75)})`;
}

export default function Board({
  board,
  influence,
  viewMode,
  highlightedSquares,
  highlightedPiecePos,
  showLabels,
  onSquareClick,
  activeTool,
  legalMoves,
  lastMove,
  checkSquare,
  selectedSquare,
}: BoardProps) {
  const [hoveredSquare, setHoveredSquare] = useState<[number, number] | null>(null);

  const hoverInfo = useMemo(() => {
    if (!hoveredSquare) return null;
    const [r, c] = hoveredSquare;
    return {
      name: squareName(r, c),
      piece: board[r][c],
      white: influence.white[r][c],
      black: influence.black[r][c],
    };
  }, [hoveredSquare, influence, board]);

  return (
    <div className="flex flex-col gap-2">
      <div
        className="grid grid-cols-8 aspect-square w-full max-w-[560px] border-2 rounded-sm overflow-hidden select-none"
        style={{ borderColor: '#5a3e28' }}
        onMouseLeave={() => setHoveredSquare(null)}
      >
        {Array.from({ length: 64 }, (_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const isLight = (row + col) % 2 === 0;
          const piece = board[row][col];
          const overlay = getOverlayColor(row, col, influence, viewMode, highlightedSquares, highlightedPiecePos);
          const isHovered = hoveredSquare?.[0] === row && hoveredSquare?.[1] === col;
          const isHighlightedPiece = highlightedPiecePos?.[0] === row && highlightedPiecePos?.[1] === col;
          const isLegalMove = legalMoves?.has(`${row},${col}`) ?? false;
          const isLastMoveFrom = lastMove && lastMove.from[0] === row && lastMove.from[1] === col;
          const isLastMoveTo = lastMove && lastMove.to[0] === row && lastMove.to[1] === col;
          const isCheck = checkSquare && checkSquare[0] === row && checkSquare[1] === col;
          const isSelected = selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;

          return (
            <div
              key={i}
              className="relative flex items-center justify-center"
              style={{
                backgroundColor: isLight ? '#d4a76a' : '#8b5e3c',
                cursor: activeTool ? 'crosshair' : isLegalMove ? 'pointer' : piece ? 'pointer' : 'default',
              }}
              onClick={() => onSquareClick(row, col)}
              onMouseEnter={() => setHoveredSquare([row, col])}
            >
              {/* Last move highlight */}
              {(isLastMoveFrom || isLastMoveTo) && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ backgroundColor: 'rgba(240, 200, 80, 0.3)' }}
                />
              )}

              {/* Influence overlay */}
              <div
                className="absolute inset-0 pointer-events-none transition-colors duration-150"
                style={{ backgroundColor: overlay }}
              />

              {/* Hover ring */}
              {isHovered && (
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/30" />
              )}

              {/* Selected piece ring (sandbox mode) */}
              {isHighlightedPiece && !highlightedSquares && (
                <div className="absolute inset-0 pointer-events-none ring-2 ring-inset ring-emerald-400/60" />
              )}

              {/* Selected piece ring (play mode) */}
              {isSelected && (
                <div className="absolute inset-0 pointer-events-none ring-2 ring-inset" style={{ boxShadow: 'inset 0 0 0 2px rgba(80,144,255,0.7)' }} />
              )}

              {/* Check highlight */}
              {isCheck && (
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'rgba(255,60,60,0.45)' }} />
              )}

              {/* Legal move dot */}
              {isLegalMove && !piece && (
                <div
                  className="absolute z-10 rounded-full pointer-events-none"
                  style={{
                    width: '26%',
                    height: '26%',
                    backgroundColor: 'rgba(80,200,120,0.5)',
                  }}
                />
              )}

              {/* Legal move capture ring */}
              {isLegalMove && piece && (
                <div
                  className="absolute inset-0 pointer-events-none rounded-sm"
                  style={{ boxShadow: 'inset 0 0 0 3px rgba(80,200,120,0.5)' }}
                />
              )}

              {/* Piece */}
              {piece && (
                <span
                  className="relative z-10 select-none leading-none"
                  style={{
                    fontSize: 'clamp(1.5rem, 7vw, 2.8rem)',
                    textShadow:
                      piece.color === 'w'
                        ? '0 1px 4px rgba(0,0,0,0.7)'
                        : '0 1px 4px rgba(0,0,0,0.5), 0 0 1px rgba(255,255,255,0.2)',
                  }}
                >
                  {pieceSymbol(piece)}
                </span>
              )}

              {/* Rank labels (left edge) */}
              {showLabels && col === 0 && (
                <span
                  className="absolute top-0.5 left-1 text-[0.55rem] font-mono z-10 pointer-events-none"
                  style={{ color: isLight ? '#8b6b47' : '#c9a87c', opacity: 0.7 }}
                >
                  {RANKS[row]}
                </span>
              )}

              {/* File labels (bottom edge) */}
              {showLabels && row === 7 && (
                <span
                  className="absolute bottom-0.5 right-1 text-[0.55rem] font-mono z-10 pointer-events-none"
                  style={{ color: isLight ? '#8b6b47' : '#c9a87c', opacity: 0.7 }}
                >
                  {FILES[col]}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Hover info bar */}
      <div className="h-6 text-sm font-mono px-1" style={{ color: '#888' }}>
        {hoverInfo ? (
          <span>
            <span className="font-bold" style={{ color: '#e8e4df' }}>
              {hoverInfo.name.toUpperCase()}
            </span>
            {hoverInfo.piece && <span> {pieceSymbol(hoverInfo.piece)}</span>}
            {' \u2014 '}
            <span style={{ color: '#5090ff' }}>W:{hoverInfo.white}</span>
            {' '}
            <span style={{ color: '#ff5060' }}>B:{hoverInfo.black}</span>
            {hoverInfo.white > 0 && hoverInfo.black > 0 && (
              <span style={{ color: '#a060ff' }}> contested</span>
            )}
          </span>
        ) : (
          <span>Hover a square to inspect</span>
        )}
      </div>
    </div>
  );
}
