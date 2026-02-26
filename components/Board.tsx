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
  legalMoves?: Set<string>;
  lastMove?: { from: [number, number]; to: [number, number] };
  checkSquare?: [number, number] | null;
  selectedSquare?: [number, number] | null;
  flashSquare?: [number, number] | null;
};

/** Soft watercolor-wash influence style */
function getInfluenceStyle(
  row: number,
  col: number,
  influence: InfluenceMap,
  viewMode: ViewMode,
  highlightedSquares: Set<string> | null,
  highlightedPiecePos: [number, number] | null,
): React.CSSProperties {
  if (highlightedSquares) {
    if (highlightedPiecePos && highlightedPiecePos[0] === row && highlightedPiecePos[1] === col) {
      return { background: 'radial-gradient(circle, rgba(200,149,108,0.45) 0%, rgba(200,149,108,0.1) 70%, transparent 100%)' };
    }
    if (highlightedSquares.has(`${row},${col}`)) {
      return { background: 'radial-gradient(circle, rgba(200,149,108,0.3) 0%, rgba(200,149,108,0.08) 70%, transparent 100%)' };
    }
    return {};
  }

  const w = influence.white[row][col];
  const b = influence.black[row][col];

  if (viewMode === 'white') {
    if (w === 0) return {};
    const a = Math.min(0.12 + 0.1 * w, 0.55);
    return { background: `radial-gradient(circle, rgba(100,160,240,${a}) 0%, rgba(100,160,240,${a * 0.25}) 70%, transparent 100%)` };
  }
  if (viewMode === 'black') {
    if (b === 0) return {};
    const a = Math.min(0.12 + 0.1 * b, 0.55);
    return { background: `radial-gradient(circle, rgba(220,90,90,${a}) 0%, rgba(220,90,90,${a * 0.25}) 70%, transparent 100%)` };
  }
  if (viewMode === 'contest') {
    if (w === 0 && b === 0) return {};
    if (w > b) {
      const a = Math.min(0.12 + 0.1 * (w - b), 0.55);
      return { background: `radial-gradient(circle, rgba(100,160,240,${a}) 0%, rgba(100,160,240,${a * 0.25}) 70%, transparent 100%)` };
    }
    if (b > w) {
      const a = Math.min(0.12 + 0.1 * (b - w), 0.55);
      return { background: `radial-gradient(circle, rgba(220,90,90,${a}) 0%, rgba(220,90,90,${a * 0.25}) 70%, transparent 100%)` };
    }
    const a = Math.min(0.15 + 0.08 * w, 0.5);
    return { background: `radial-gradient(circle, rgba(160,120,200,${a}) 0%, rgba(160,120,200,${a * 0.25}) 70%, transparent 100%)` };
  }

  // 'both' mode
  if (w === 0 && b === 0) return {};
  if (w > 0 && b === 0) {
    const a = Math.min(0.12 + 0.1 * w, 0.55);
    return { background: `radial-gradient(circle, rgba(100,160,240,${a}) 0%, rgba(100,160,240,${a * 0.25}) 70%, transparent 100%)` };
  }
  if (b > 0 && w === 0) {
    const a = Math.min(0.12 + 0.1 * b, 0.55);
    return { background: `radial-gradient(circle, rgba(220,90,90,${a}) 0%, rgba(220,90,90,${a * 0.25}) 70%, transparent 100%)` };
  }
  const a = Math.min(0.12 + 0.08 * (w + b), 0.55);
  return { background: `radial-gradient(circle, rgba(160,120,200,${a}) 0%, rgba(160,120,200,${a * 0.25}) 70%, transparent 100%)` };
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
    <div className="flex flex-col gap-3">
      {/* Board frame */}
      <div className="board-frame">
        {/* Top file labels */}
        {showLabels && (
          <div className="flex justify-around pointer-events-none" style={{ marginBottom: 6, paddingLeft: 14, paddingRight: 14 }}>
            {FILES.map((f) => (
              <span key={f} className="board-frame-label flex-1 text-center">{f}</span>
            ))}
          </div>
        )}

        <div className="flex">
          {/* Left rank labels */}
          {showLabels && (
            <div className="flex flex-col justify-around pointer-events-none" style={{ width: 14 }}>
              {RANKS.map((r) => (
                <span key={r} className="board-frame-label flex-1 flex items-center justify-center">{r}</span>
              ))}
            </div>
          )}

          {/* Grid */}
          <div
            className="grid grid-cols-8 aspect-square flex-1 overflow-hidden select-none relative z-[1]"
            onMouseLeave={() => setHoveredSquare(null)}
          >
            {Array.from({ length: 64 }, (_, i) => {
              const row = Math.floor(i / 8);
              const col = i % 8;
              const isLight = (row + col) % 2 === 0;
              const piece = board[row][col];
              const influenceStyle = getInfluenceStyle(row, col, influence, viewMode, highlightedSquares, highlightedPiecePos);
              const hasInfluence = Object.keys(influenceStyle).length > 0;
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
                  data-square={`${row},${col}`}
                  data-row={row}
                  data-col={col}
                  data-piece-color={piece?.color}
                  onClick={() => onSquareClick(row, col)}
                  onMouseEnter={() => setHoveredSquare([row, col])}
                >
                  {(isLastMoveFrom || isLastMoveTo) && (
                    <div className="absolute inset-0 pointer-events-none last-move-highlight" />
                  )}

                  {hasInfluence && (
                    <div className="absolute inset-0 pointer-events-none influence-glow" style={influenceStyle} />
                  )}

                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  )}

                  {isHighlightedPiece && !highlightedSquares && (
                    <div className="absolute inset-0 pointer-events-none selected-glow" />
                  )}

                  {isSelected && (
                    <div className="absolute inset-0 pointer-events-none selected-glow" />
                  )}

                  {isCheck && (
                    <div className="absolute inset-0 pointer-events-none check-pulse" />
                  )}

                  {isFlash && (
                    <div className="absolute inset-0 pointer-events-none capture-flash z-20" />
                  )}

                  {isLegalMove && !piece && (
                    <div
                      className="absolute z-10 pointer-events-none legal-move-dot"
                      style={{ width: '26%', height: '26%' }}
                    />
                  )}

                  {isLegalMove && piece && (
                    <div className="absolute inset-0 pointer-events-none legal-capture-ring" />
                  )}

                  {piece && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
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
            <div className="flex flex-col justify-around pointer-events-none" style={{ width: 14 }}>
              {RANKS.map((r) => (
                <span key={r} className="board-frame-label flex-1 flex items-center justify-center">{r}</span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom file labels */}
        {showLabels && (
          <div className="flex justify-around pointer-events-none" style={{ marginTop: 6, paddingLeft: 14, paddingRight: 14 }}>
            {FILES.map((f) => (
              <span key={f} className="board-frame-label flex-1 text-center">{f}</span>
            ))}
          </div>
        )}
      </div>

      {/* Hover info */}
      <div className="h-5 text-xs font-mono px-1" style={{ color: '#555' }}>
        {hoverInfo ? (
          <span>
            <span style={{ color: '#888' }}>{hoverInfo.name}</span>
            {' '}
            <span style={{ color: '#4a90d9' }}>{hoverInfo.white}</span>
            <span style={{ color: '#555' }}>/</span>
            <span style={{ color: '#c85050' }}>{hoverInfo.black}</span>
            {hoverInfo.white > 0 && hoverInfo.black > 0 && (
              <span style={{ color: '#9070c0' }}> contested</span>
            )}
          </span>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
    </div>
  );
}
