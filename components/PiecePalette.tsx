'use client';

import type { PieceType, PieceColor, ToolSelection } from '@/lib/types';
import { pieceSymbol } from '@/lib/types';

type PiecePaletteProps = {
  selection: ToolSelection;
  onSelect: (selection: ToolSelection) => void;
  onClear: () => void;
};

const PIECE_TYPES: PieceType[] = ['K', 'Q', 'R', 'B', 'N', 'P'];

function isSelectedPiece(sel: ToolSelection, color: PieceColor, type: PieceType): boolean {
  return sel?.kind === 'piece' && sel.piece.color === color && sel.piece.type === type;
}

export default function PiecePalette({ selection, onSelect, onClear }: PiecePaletteProps) {
  const toggle = (color: PieceColor, type: PieceType) => {
    if (isSelectedPiece(selection, color, type)) {
      onSelect(null);
    } else {
      onSelect({ kind: 'piece', piece: { type, color } });
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#c8956c' }}>
        Pieces
      </h3>

      {/* White pieces */}
      <div className="flex flex-wrap gap-1">
        {PIECE_TYPES.map((type) => {
          const active = isSelectedPiece(selection, 'w', type);
          return (
            <button
              key={`w${type}`}
              className="w-10 h-10 rounded flex items-center justify-center text-xl transition-colors"
              style={{
                backgroundColor: active ? 'rgba(80,144,255,0.2)' : 'rgba(255,255,255,0.04)',
                boxShadow: active ? 'inset 0 0 0 1px #5090ff' : 'none',
              }}
              onClick={() => toggle('w', type)}
              title={`White ${type}`}
            >
              {pieceSymbol({ type, color: 'w' })}
            </button>
          );
        })}
      </div>

      {/* Black pieces */}
      <div className="flex flex-wrap gap-1">
        {PIECE_TYPES.map((type) => {
          const active = isSelectedPiece(selection, 'b', type);
          return (
            <button
              key={`b${type}`}
              className="w-10 h-10 rounded flex items-center justify-center text-xl transition-colors"
              style={{
                backgroundColor: active ? 'rgba(255,80,96,0.2)' : 'rgba(255,255,255,0.04)',
                boxShadow: active ? 'inset 0 0 0 1px #ff5060' : 'none',
              }}
              onClick={() => toggle('b', type)}
              title={`Black ${type}`}
            >
              {pieceSymbol({ type, color: 'b' })}
            </button>
          );
        })}
      </div>

      {/* Tools */}
      <div className="flex gap-2">
        <button
          className="px-3 py-1.5 rounded text-xs transition-colors"
          style={{
            backgroundColor: selection?.kind === 'eraser' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
            color: selection?.kind === 'eraser' ? '#f87171' : '#888',
            boxShadow: selection?.kind === 'eraser' ? 'inset 0 0 0 1px #f87171' : 'none',
          }}
          onClick={() => onSelect(selection?.kind === 'eraser' ? null : { kind: 'eraser' })}
        >
          Eraser
        </button>
        <button
          className="px-3 py-1.5 rounded text-xs transition-colors"
          style={{ backgroundColor: 'rgba(255,255,255,0.04)', color: '#888' }}
          onClick={onClear}
        >
          Clear Board
        </button>
      </div>
    </div>
  );
}
