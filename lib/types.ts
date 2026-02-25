export type PieceType = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P';
export type PieceColor = 'w' | 'b';
export type Piece = { type: PieceType; color: PieceColor };
export type BoardState = (Piece | null)[][];
export type ViewMode = 'both' | 'white' | 'black' | 'contest';
export type ToolSelection = { kind: 'piece'; piece: Piece } | { kind: 'eraser' } | null;

const PIECE_SYMBOLS: Record<string, string> = {
  wK: '\u2654', wQ: '\u2655', wR: '\u2656', wB: '\u2657', wN: '\u2658', wP: '\u2659',
  bK: '\u265A', bQ: '\u265B', bR: '\u265C', bB: '\u265D', bN: '\u265E', bP: '\u265F',
};

export function pieceSymbol(piece: Piece): string {
  return PIECE_SYMBOLS[`${piece.color}${piece.type}`] ?? '?';
}

export function createEmptyBoard(): BoardState {
  return Array.from({ length: 8 }, () => Array<Piece | null>(8).fill(null));
}

export function deepCopyBoard(board: BoardState): BoardState {
  return board.map(row => row.map(sq => (sq ? { ...sq } : null)));
}

export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
export const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'] as const;

export function squareName(row: number, col: number): string {
  return `${FILES[col]}${RANKS[row]}`;
}
