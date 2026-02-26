'use client';

import { useState, useMemo } from 'react';
import type { BoardState, ViewMode } from '@/lib/types';
import { squareName, FILES, RANKS } from '@/lib/types';
import type { InfluenceMap } from '@/lib/engine';
import ChessPiece from './ChessPiece';

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
  flashSquare?: [number, number] | null;
};

/** Returns a radial-gradient background for the influence glow overlay */
function getInfluenceStyle(
  row: number,
  col: number,
  influence: InfluenceMap,
  viewMode: ViewMode,
  highlightedSquares: Set<string> | null,
  highlightedPiecePos: [number, number] | null,
): React.CSSProperties {
  // Single-piece highlight mode (sandbox)
  if (highlightedSquares) {
    if (highlightedPiecePos && highlightedPiecePos[0] === row && highlightedPiecePos[1] === col) {
      return { background: 'radial-gradient(circle, rgba(80,200,120,0.5) 0%, rgba(80,200,120,0.2) 70%, transparent 100%)' };
    }
    if (highlightedSquares.has(`${row},${col}`)) {
      return { background: 'radial-gradient(circle, rgba(80,200,120,0.4) 0%, rgba(80,200,120,0.15) 70%, transparent 100%)' };
    }
    return {};
  }

  const w = influence.white[row][col];
  const b = influence.black[row][col];

  if (viewMode === 'white') {
    if (w === 0) return {};
    const a = Math.min(0.15 + 0.13 * w, 0.75);
    return { background: `radial-gradient(circle, rgba(80,144,255,${a}) 0%, rgba(80,144,255,${a * 0.4}) 70%, transparent 100%)` };
  }
  if (viewMode === 'black') {
    if (b === 0) return {};
    const a = Math.min(0.15 + 0.13 * b, 0.75);
    return { background: `radial-gradient(circle, rgba(255,80,96,${a}) 0%, rgba(255,80,96,${a * 0.4}) 70%, transparent 100%)` };
  }
  if (viewMode === 'contest') {
    if (w === 0 && b === 0) return {};
    if (w > b) {
      const a = Math.min(0.15 + 0.13 * (w - b), 0.75);
      return { background: `radial-gradient(circle, rgba(80,144,255,${a}) 0%, rgba(80,144,255,${a * 0.4}) 70%, transparent 100%)` };
    }
    if (b > w) {
      const a = Math.min(0.15 + 0.13 * (b - w), 0.75);
      return { background: `radial-gradient(circle, rgba(255,80,96,${a}) 0%, rgba(255,80,96,${a * 0.4}) 70%, transparent 100%)` };
    }
    const a = Math.min(0.2 + 0.1 * w, 0.7);
    return { background: `radial-gradient(circle, rgba(160,96,255,${a}) 0%, rgba(160,96,255,${a * 0.4}) 70%, transparent 100%)` };
  }

  // 'both' mode
  if (w === 0 && b === 0) return {};
  if (w > 0 && b === 0) {
    const a = Math.min(0.15 + 0.13 * w, 0.75);
    return { background: `radial-gradient(circle, rgba(80,144,255,${a}) 0%, rgba(80,144,255,${a * 0.4}) 70%, transparent 100%)` };
  }
  if (b > 0 && w === 0) {
    const a = Math.min(0.15 + 0.13 * b, 0.75);
    return { background: `radial-gradient(circle, rgba(255,80,96,${a}) 0%, rgba(255,80,96,${a * 0.4}) 70%, transparent 100%)` };
  }
  // Contested
  const a = Math.min(0.15 + 0.1 * (w + b), 0.75);
  return { background: `radial-gradient(circle, rgba(160,96,255,${a}) 0%, rgba(160,96,255,${a * 0.4}) 70%, transparent 100%)` };
}

function isContested(row: number, col: number, influence: InfluenceMap): boolean {
  return influence.white[row][col] > 0 && influence.black[row][col] > 0;
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
  flashSquare,
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
      {/* 3D Perspective wrapper */}
      <div className="board-perspective">
        <div className="board-3d">
          {/* Wooden frame */}
          <div className="board-frame relative">
            {/* Dust particles */}
            <div className="dust-particles" />

            {/* Top file labels */}
            {showLabels && (
              <div className="flex justify-around px-0" style={{ marginBottom: 8 }}>
                {FILES.map((f) => (
                  <span key={f} className="board-frame-label flex-1 text-center">
                    {f}
                  </span>
                ))}
              </div>
            )}

            <div className="flex">
              {/* Left rank labels */}
              {showLabels && (
                <div className="flex flex-col justify-around" style={{ marginRight: 8 }}>
                  {RANKS.map((r) => (
                    <span key={r} className="board-frame-label flex-1 flex items-center">
                      {r}
                    </span>
                  ))}
                </div>
              )}

              {/* Board grid */}
              <div
                className="grid grid-cols-8 aspect-square flex-1 overflow-hidden select-none"
                style={{ borderRadius: 2 }}
                onMouseLeave={() => setHoveredSquare(null)}
              >
                {Array.from({ length: 64 }, (_, i) => {
                  const row = Math.floor(i / 8);
                  const col = i % 8;
                  const isLight = (row + col) % 2 === 0;
                  const piece = board[row][col];
                  const influenceStyle = getInfluenceStyle(row, col, influence, viewMode, highlightedSquares, highlightedPiecePos);
                  const hasInfluence = Object.keys(influenceStyle).length > 0;
                  const contested = hasInfluence && isContested(row, col, influence) && !highlightedSquares;
                  const isHovered = hoveredSquare?.[0] === row && hoveredSquare?.[1] === col;
                  const isHighlightedPiece = highlightedPiecePos?.[0] === row && highlightedPiecePos?.[1] === col;
                  const isLegalMove = legalMoves?.has(`${row},${col}`) ?? false;
                  const isLastMoveFrom = lastMove && lastMove.from[0] === row && lastMove.from[1] === col;
                  const isLastMoveTo = lastMove && lastMove.to[0] === row && lastMove.to[1] === col;
                  const isCheck = checkSquare && checkSquare[0] === row && checkSquare[1] === col;
                  const isSelected = selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
                  const isFlash = flashSquare && flashSquare[0] === row && flashSquare[1] === col;

                  return (
                    <div
                      key={i}
                      className={`relative flex items-center justify-center ${isLight ? 'square-light' : 'square-dark'} square-depth`}
                      style={{
                        cursor: activeTool ? 'crosshair' : isLegalMove ? 'pointer' : piece ? 'pointer' : 'default',
                      }}
                      data-piece-color={piece?.color}
                      onClick={() => onSquareClick(row, col)}
                      onMouseEnter={() => setHoveredSquare([row, col])}
                    >
                      {/* Last move highlight */}
                      {(isLastMoveFrom || isLastMoveTo) && (
                        <div className="absolute inset-0 pointer-events-none last-move-highlight" />
                      )}

                      {/* Influence glow overlay */}
                      {hasInfluence && (
                        <div
                          className={`absolute inset-0 pointer-events-none influence-glow ${contested ? 'contest-pulse' : ''}`}
                          style={influenceStyle}
                        />
                      )}

                      {/* Hover ring */}
                      {isHovered && (
                        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/20" />
                      )}

                      {/* Selected piece ring (sandbox mode) */}
                      {isHighlightedPiece && !highlightedSquares && (
                        <div className="absolute inset-0 pointer-events-none ring-2 ring-inset ring-emerald-400/60" />
                      )}

                      {/* Selected piece glow (play mode) */}
                      {isSelected && (
                        <div className="absolute inset-0 pointer-events-none selected-glow" />
                      )}

                      {/* Check pulse */}
                      {isCheck && (
                        <div className="absolute inset-0 pointer-events-none check-pulse" />
                      )}

                      {/* Capture flash */}
                      {isFlash && (
                        <div className="absolute inset-0 pointer-events-none capture-flash z-20" />
                      )}

                      {/* Legal move dot */}
                      {isLegalMove && !piece && (
                        <div
                          className="absolute z-10 pointer-events-none legal-move-dot"
                          style={{ width: '26%', height: '26%' }}
                        />
                      )}

                      {/* Legal move capture ring */}
                      {isLegalMove && piece && (
                        <div className="absolute inset-0 pointer-events-none legal-capture-ring" />
                      )}

                      {/* SVG Piece */}
                      {piece && (
                        <div className="relative z-10 flex items-center justify-center w-full h-full">
                          <ChessPiece
                            type={piece.type}
                            color={piece.color}
                            isSelected={!!isSelected}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right rank labels */}
              {showLabels && (
                <div className="flex flex-col justify-around" style={{ marginLeft: 8 }}>
                  {RANKS.map((r) => (
                    <span key={r} className="board-frame-label flex-1 flex items-center">
                      {r}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom file labels */}
            {showLabels && (
              <div className="flex justify-around px-0" style={{ marginTop: 8 }}>
                {FILES.map((f) => (
                  <span key={f} className="board-frame-label flex-1 text-center">
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hover info bar */}
      <div className="h-6 text-sm font-mono px-1" style={{ color: '#888' }}>
        {hoverInfo ? (
          <span>
            <span className="font-bold" style={{ color: '#e8e4df' }}>
              {hoverInfo.name.toUpperCase()}
            </span>
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
