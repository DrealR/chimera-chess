import type { GameState, Move } from './chess';
import { getLegalMoves, makeMove } from './chess';
import type { PieceType } from './types';

export type Difficulty = 'easy' | 'medium' | 'hard';

// --- Material values (centipawns) ---
const PIECE_VALUES: Record<PieceType, number> = {
  P: 100, N: 320, B: 330, R: 500, Q: 900, K: 20000,
};

// --- Piece-square tables (from white's perspective, row 0 = rank 8) ---
const PAWN_PST: number[] = [
   0,  0,  0,  0,  0,  0,  0,  0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
   5,  5, 10, 25, 25, 10,  5,  5,
   0,  0,  0, 20, 20,  0,  0,  0,
   5, -5,-10,  0,  0,-10, -5,  5,
   5, 10, 10,-20,-20, 10, 10,  5,
   0,  0,  0,  0,  0,  0,  0,  0,
];

const KNIGHT_PST: number[] = [
 -50,-40,-30,-30,-30,-30,-40,-50,
 -40,-20,  0,  0,  0,  0,-20,-40,
 -30,  0, 10, 15, 15, 10,  0,-30,
 -30,  5, 15, 20, 20, 15,  5,-30,
 -30,  0, 15, 20, 20, 15,  0,-30,
 -30,  5, 10, 15, 15, 10,  5,-30,
 -40,-20,  0,  5,  5,  0,-20,-40,
 -50,-40,-30,-30,-30,-30,-40,-50,
];

const BISHOP_PST: number[] = [
 -20,-10,-10,-10,-10,-10,-10,-20,
 -10,  0,  0,  0,  0,  0,  0,-10,
 -10,  0, 10, 10, 10, 10,  0,-10,
 -10,  5,  5, 10, 10,  5,  5,-10,
 -10,  0,  5, 10, 10,  5,  0,-10,
 -10, 10, 10, 10, 10, 10, 10,-10,
 -10,  5,  0,  0,  0,  0,  5,-10,
 -20,-10,-10,-10,-10,-10,-10,-20,
];

const ROOK_PST: number[] = [
   0,  0,  0,  0,  0,  0,  0,  0,
   5, 10, 10, 10, 10, 10, 10,  5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
   0,  0,  0,  5,  5,  0,  0,  0,
];

const QUEEN_PST: number[] = [
 -20,-10,-10, -5, -5,-10,-10,-20,
 -10,  0,  0,  0,  0,  0,  0,-10,
 -10,  0,  5,  5,  5,  5,  0,-10,
  -5,  0,  5,  5,  5,  5,  0, -5,
   0,  0,  5,  5,  5,  5,  0, -5,
 -10,  5,  5,  5,  5,  5,  0,-10,
 -10,  0,  5,  0,  0,  0,  0,-10,
 -20,-10,-10, -5, -5,-10,-10,-20,
];

const KING_PST: number[] = [
 -30,-40,-40,-50,-50,-40,-40,-30,
 -30,-40,-40,-50,-50,-40,-40,-30,
 -30,-40,-40,-50,-50,-40,-40,-30,
 -30,-40,-40,-50,-50,-40,-40,-30,
 -20,-30,-30,-40,-40,-30,-30,-20,
 -10,-20,-20,-20,-20,-20,-20,-10,
  20, 20,  0,  0,  0,  0, 20, 20,
  20, 30, 10,  0,  0, 10, 30, 20,
];

const PST: Record<PieceType, number[]> = {
  P: PAWN_PST,
  N: KNIGHT_PST,
  B: BISHOP_PST,
  R: ROOK_PST,
  Q: QUEEN_PST,
  K: KING_PST,
};

// --- Evaluation ---

export function evaluate(state: GameState): number {
  let score = 0;
  const { board } = state;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (!piece) continue;

      const material = PIECE_VALUES[piece.type];
      // White reads table top-down (row 0 = rank 8), black mirrors
      const pstIdx = piece.color === 'w' ? r * 8 + c : (7 - r) * 8 + c;
      const positional = PST[piece.type][pstIdx];
      const value = material + positional;

      score += piece.color === 'w' ? value : -value;
    }
  }

  return score;
}

// --- Move ordering (captures first, high-value victims first) ---

function orderMoves(state: GameState, moves: Move[]): Move[] {
  return moves.sort((a, b) => {
    const aCapture = state.board[a.to[0]][a.to[1]];
    const bCapture = state.board[b.to[0]][b.to[1]];
    const aScore = aCapture ? PIECE_VALUES[aCapture.type] : 0;
    const bScore = bCapture ? PIECE_VALUES[bCapture.type] : 0;
    return bScore - aScore;
  });
}

// --- Minimax with alpha-beta pruning ---

function minimax(
  state: GameState,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean,
): number {
  if (state.status === 'checkmate') {
    return maximizing ? -100000 : 100000;
  }
  if (state.status === 'stalemate') {
    return 0;
  }
  if (depth === 0) {
    return evaluate(state);
  }

  const moves = orderMoves(state, getLegalMoves(state));

  if (maximizing) {
    let best = -Infinity;
    for (const move of moves) {
      const next = makeMove(state, move);
      const score = minimax(next, depth - 1, alpha, beta, false);
      best = Math.max(best, score);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const move of moves) {
      const next = makeMove(state, move);
      const score = minimax(next, depth - 1, alpha, beta, true);
      best = Math.min(best, score);
      beta = Math.min(beta, score);
      if (beta <= alpha) break;
    }
    return best;
  }
}

// --- Public API ---

const DEPTH_MAP: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export function getBestMove(state: GameState, difficulty: Difficulty): Move | null {
  const moves = getLegalMoves(state);
  if (moves.length === 0) return null;

  const depth = DEPTH_MAP[difficulty];
  const isMaximizing = state.turn === 'w';

  let bestMove = moves[0];
  let bestScore = isMaximizing ? -Infinity : Infinity;

  const ordered = orderMoves(state, moves);

  for (const move of ordered) {
    const next = makeMove(state, move);
    const score = minimax(next, depth - 1, -Infinity, Infinity, !isMaximizing);

    if (isMaximizing ? score > bestScore : score < bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}
