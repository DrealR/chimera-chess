import type { BoardState, Piece, PieceColor, PieceType } from './types';
import { deepCopyBoard, squareName, FILES } from './types';

export type CastlingRights = { wK: boolean; wQ: boolean; bK: boolean; bQ: boolean };

export type Move = {
  from: [number, number];
  to: [number, number];
  promotion?: PieceType;
  castle?: 'K' | 'Q';
  enPassant?: boolean;
};

export type GameStatus = 'playing' | 'check' | 'checkmate' | 'stalemate';

export type GameState = {
  board: BoardState;
  turn: PieceColor;
  castling: CastlingRights;
  enPassant: [number, number] | null;
  halfmove: number;
  fullmove: number;
  moves: Move[];
  captured: { w: Piece[]; b: Piece[] };
  status: GameStatus;
};

const OPP: Record<PieceColor, PieceColor> = { w: 'b', b: 'w' };

function inBounds(r: number, c: number): boolean {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

// --- Initial Position ---

export function createInitialGame(): GameState {
  const back: PieceType[] = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
  const board: BoardState = Array.from({ length: 8 }, () => Array(8).fill(null));
  for (let c = 0; c < 8; c++) {
    board[0][c] = { type: back[c], color: 'b' };
    board[1][c] = { type: 'P', color: 'b' };
    board[6][c] = { type: 'P', color: 'w' };
    board[7][c] = { type: back[c], color: 'w' };
  }
  return {
    board,
    turn: 'w',
    castling: { wK: true, wQ: true, bK: true, bQ: true },
    enPassant: null,
    halfmove: 0,
    fullmove: 1,
    moves: [],
    captured: { w: [], b: [] },
    status: 'playing',
  };
}

// --- Attack Detection ---

export function isSquareAttacked(board: BoardState, row: number, col: number, byColor: PieceColor): boolean {
  // Pawn attacks (check from the perspective of "who could attack this square")
  const pDir = byColor === 'w' ? 1 : -1;
  for (const dc of [-1, 1]) {
    const r = row + pDir, c = col + dc;
    if (inBounds(r, c)) {
      const p = board[r][c];
      if (p && p.color === byColor && p.type === 'P') return true;
    }
  }

  // Knight
  for (const [dr, dc] of [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]) {
    const r = row + dr, c = col + dc;
    if (inBounds(r, c)) {
      const p = board[r][c];
      if (p && p.color === byColor && p.type === 'N') return true;
    }
  }

  // King
  for (const [dr, dc] of [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]) {
    const r = row + dr, c = col + dc;
    if (inBounds(r, c)) {
      const p = board[r][c];
      if (p && p.color === byColor && p.type === 'K') return true;
    }
  }

  // Diagonal (bishop/queen)
  for (const [dr, dc] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) {
    let r = row + dr, c = col + dc;
    while (inBounds(r, c)) {
      const p = board[r][c];
      if (p) {
        if (p.color === byColor && (p.type === 'B' || p.type === 'Q')) return true;
        break;
      }
      r += dr;
      c += dc;
    }
  }

  // Straight (rook/queen)
  for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
    let r = row + dr, c = col + dc;
    while (inBounds(r, c)) {
      const p = board[r][c];
      if (p) {
        if (p.color === byColor && (p.type === 'R' || p.type === 'Q')) return true;
        break;
      }
      r += dr;
      c += dc;
    }
  }

  return false;
}

function findKing(board: BoardState, color: PieceColor): [number, number] {
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.color === color && p.type === 'K') return [r, c];
    }
  return [-1, -1];
}

export function isInCheck(board: BoardState, color: PieceColor): boolean {
  const [kr, kc] = findKing(board, color);
  return isSquareAttacked(board, kr, kc, OPP[color]);
}

// --- Move Application (internal) ---

function applyMoveToBoard(board: BoardState, move: Move): BoardState {
  const next = deepCopyBoard(board);
  const piece = next[move.from[0]][move.from[1]]!;

  next[move.from[0]][move.from[1]] = null;

  // En passant capture — remove the pawn beside us
  if (move.enPassant) {
    next[move.from[0]][move.to[1]] = null;
  }

  // Castling — move the rook
  if (move.castle) {
    const rank = move.from[0];
    if (move.castle === 'K') {
      next[rank][5] = next[rank][7];
      next[rank][7] = null;
    } else {
      next[rank][3] = next[rank][0];
      next[rank][0] = null;
    }
  }

  // Place piece (or promoted piece)
  next[move.to[0]][move.to[1]] = move.promotion
    ? { type: move.promotion, color: piece.color }
    : piece;

  return next;
}

// --- Pseudo-Legal Move Generation ---

function getPseudoLegalMoves(state: GameState): Move[] {
  const moves: Move[] = [];
  const { board, turn, castling, enPassant } = state;
  const dir = turn === 'w' ? -1 : 1;
  const startRank = turn === 'w' ? 6 : 1;
  const promoRank = turn === 'w' ? 0 : 7;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (!piece || piece.color !== turn) continue;

      switch (piece.type) {
        case 'P': {
          const r1 = r + dir;
          // Forward one
          if (inBounds(r1, c) && !board[r1][c]) {
            if (r1 === promoRank) {
              for (const pr of ['Q', 'R', 'B', 'N'] as PieceType[])
                moves.push({ from: [r, c], to: [r1, c], promotion: pr });
            } else {
              moves.push({ from: [r, c], to: [r1, c] });
              // Forward two from start
              const r2 = r + 2 * dir;
              if (r === startRank && !board[r2][c])
                moves.push({ from: [r, c], to: [r2, c] });
            }
          }
          // Captures
          for (const dc of [-1, 1]) {
            const nr = r + dir, nc = c + dc;
            if (!inBounds(nr, nc)) continue;
            const target = board[nr][nc];
            if (target && target.color !== turn) {
              if (nr === promoRank) {
                for (const pr of ['Q', 'R', 'B', 'N'] as PieceType[])
                  moves.push({ from: [r, c], to: [nr, nc], promotion: pr });
              } else {
                moves.push({ from: [r, c], to: [nr, nc] });
              }
            }
            // En passant
            if (enPassant && enPassant[0] === nr && enPassant[1] === nc)
              moves.push({ from: [r, c], to: [nr, nc], enPassant: true });
          }
          break;
        }

        case 'N': {
          for (const [dr, dc] of [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]) {
            const nr = r + dr, nc = c + dc;
            if (inBounds(nr, nc) && (!board[nr][nc] || board[nr][nc]!.color !== turn))
              moves.push({ from: [r, c], to: [nr, nc] });
          }
          break;
        }

        case 'K': {
          for (const [dr, dc] of [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]) {
            const nr = r + dr, nc = c + dc;
            if (inBounds(nr, nc) && (!board[nr][nc] || board[nr][nc]!.color !== turn))
              moves.push({ from: [r, c], to: [nr, nc] });
          }
          // Castling
          const backRank = turn === 'w' ? 7 : 0;
          if (r === backRank && c === 4) {
            const opp = OPP[turn];
            const kSide = turn === 'w' ? castling.wK : castling.bK;
            const qSide = turn === 'w' ? castling.wQ : castling.bQ;
            if (kSide && !board[backRank][5] && !board[backRank][6] &&
              !isSquareAttacked(board, backRank, 4, opp) &&
              !isSquareAttacked(board, backRank, 5, opp) &&
              !isSquareAttacked(board, backRank, 6, opp))
              moves.push({ from: [r, c], to: [backRank, 6], castle: 'K' });
            if (qSide && !board[backRank][3] && !board[backRank][2] && !board[backRank][1] &&
              !isSquareAttacked(board, backRank, 4, opp) &&
              !isSquareAttacked(board, backRank, 3, opp) &&
              !isSquareAttacked(board, backRank, 2, opp))
              moves.push({ from: [r, c], to: [backRank, 2], castle: 'Q' });
          }
          break;
        }

        case 'B':
        case 'R':
        case 'Q': {
          const dirs =
            piece.type === 'B' ? [[-1, -1], [-1, 1], [1, -1], [1, 1]] :
              piece.type === 'R' ? [[-1, 0], [1, 0], [0, -1], [0, 1]] :
                [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
          for (const [dr, dc] of dirs) {
            let nr = r + dr, nc = c + dc;
            while (inBounds(nr, nc)) {
              const target = board[nr][nc];
              if (!target) {
                moves.push({ from: [r, c], to: [nr, nc] });
              } else {
                if (target.color !== turn)
                  moves.push({ from: [r, c], to: [nr, nc] });
                break;
              }
              nr += dr;
              nc += dc;
            }
          }
          break;
        }
      }
    }
  }

  return moves;
}

// --- Legal Moves ---

export function getLegalMoves(state: GameState): Move[] {
  return getPseudoLegalMoves(state).filter((move) => {
    const newBoard = applyMoveToBoard(state.board, move);
    return !isInCheck(newBoard, state.turn);
  });
}

export function getLegalMovesFrom(state: GameState, row: number, col: number): Move[] {
  return getLegalMoves(state).filter(
    (m) => m.from[0] === row && m.from[1] === col,
  );
}

// --- Make Move ---

export function makeMove(state: GameState, move: Move): GameState {
  const piece = state.board[move.from[0]][move.from[1]]!;
  const captured = move.enPassant
    ? state.board[move.from[0]][move.to[1]]
    : state.board[move.to[0]][move.to[1]];

  const newBoard = applyMoveToBoard(state.board, move);

  // Update castling rights
  const castling = { ...state.castling };
  if (piece.type === 'K') {
    if (piece.color === 'w') { castling.wK = false; castling.wQ = false; }
    else { castling.bK = false; castling.bQ = false; }
  }
  if (piece.type === 'R') {
    if (move.from[0] === 7 && move.from[1] === 0) castling.wQ = false;
    if (move.from[0] === 7 && move.from[1] === 7) castling.wK = false;
    if (move.from[0] === 0 && move.from[1] === 0) castling.bQ = false;
    if (move.from[0] === 0 && move.from[1] === 7) castling.bK = false;
  }
  // Rook captured on home square
  if (move.to[0] === 7 && move.to[1] === 0) castling.wQ = false;
  if (move.to[0] === 7 && move.to[1] === 7) castling.wK = false;
  if (move.to[0] === 0 && move.to[1] === 0) castling.bQ = false;
  if (move.to[0] === 0 && move.to[1] === 7) castling.bK = false;

  // En passant target
  let ep: [number, number] | null = null;
  if (piece.type === 'P' && Math.abs(move.to[0] - move.from[0]) === 2)
    ep = [(move.from[0] + move.to[0]) / 2, move.from[1]];

  // Captured pieces
  const newCaptured = { w: [...state.captured.w], b: [...state.captured.b] };
  if (captured) newCaptured[state.turn].push(captured);

  const halfmove = piece.type === 'P' || captured ? 0 : state.halfmove + 1;
  const fullmove = state.turn === 'b' ? state.fullmove + 1 : state.fullmove;
  const opponent = OPP[state.turn];

  const next: GameState = {
    board: newBoard,
    turn: opponent,
    castling,
    enPassant: ep,
    halfmove,
    fullmove,
    moves: [...state.moves, move],
    captured: newCaptured,
    status: 'playing',
  };

  // Determine status
  const hasLegalMoves = getLegalMoves(next).length > 0;
  const inCheck = isInCheck(newBoard, opponent);
  if (!hasLegalMoves) {
    next.status = inCheck ? 'checkmate' : 'stalemate';
  } else if (inCheck) {
    next.status = 'check';
  }

  return next;
}

// --- AI ---

export function getRandomMove(state: GameState): Move | null {
  const moves = getLegalMoves(state);
  if (moves.length === 0) return null;
  return moves[Math.floor(Math.random() * moves.length)];
}

// --- Notation ---

export function moveToNotation(state: GameState, move: Move): string {
  if (move.castle === 'K') return 'O-O';
  if (move.castle === 'Q') return 'O-O-O';

  const piece = state.board[move.from[0]][move.from[1]]!;
  const captured = move.enPassant
    ? state.board[move.from[0]][move.to[1]]
    : state.board[move.to[0]][move.to[1]];

  let notation = '';

  if (piece.type !== 'P') {
    notation += piece.type;
    // Simple disambiguation by file
    for (let r = 0; r < 8; r++)
      for (let c = 0; c < 8; c++) {
        if (r === move.from[0] && c === move.from[1]) continue;
        const p = state.board[r][c];
        if (p && p.color === piece.color && p.type === piece.type) {
          // Check if this other piece can also reach the same destination
          const otherMoves = getLegalMovesFrom(state, r, c);
          if (otherMoves.some((m) => m.to[0] === move.to[0] && m.to[1] === move.to[1])) {
            if (c !== move.from[1]) notation += FILES[move.from[1]];
            else notation += (8 - move.from[0]).toString();
            break;
          }
        }
      }
  } else if (captured) {
    notation += FILES[move.from[1]];
  }

  if (captured) notation += 'x';
  notation += squareName(move.to[0], move.to[1]);
  if (move.promotion) notation += '=' + move.promotion;

  // Check marker
  const newBoard = applyMoveToBoard(state.board, move);
  const opp = OPP[state.turn];
  if (isInCheck(newBoard, opp)) {
    const tempState: GameState = { ...state, board: newBoard, turn: opp };
    const hasLegal = getLegalMoves(tempState).length > 0;
    notation += hasLegal ? '+' : '#';
  }

  return notation;
}
