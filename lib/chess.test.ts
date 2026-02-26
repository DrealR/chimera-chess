import { describe, expect, it } from 'vitest';
import {
  createInitialGame,
  getLegalMoves,
  getLegalMovesFrom,
  isInCheck,
  makeMove,
  type GameState,
  type Move,
} from './chess';
import { createEmptyBoard, type BoardState, type Piece, type PieceColor, type PieceType } from './types';

function makeState({
  board,
  turn = 'w',
  castling = { wK: false, wQ: false, bK: false, bQ: false },
  enPassant = null,
}: {
  board?: BoardState;
  turn?: PieceColor;
  castling?: GameState['castling'];
  enPassant?: [number, number] | null;
} = {}): GameState {
  return {
    board: board ?? createEmptyBoard(),
    turn,
    castling,
    enPassant,
    halfmove: 0,
    fullmove: 1,
    moves: [],
    captured: { w: [], b: [] },
    status: 'playing',
  };
}

function place(board: BoardState, row: number, col: number, piece: Piece): BoardState {
  const next = board.map((line) => line.slice());
  next[row][col] = piece;
  return next;
}

function hasMove(moves: Move[], from: [number, number], to: [number, number], extras: Partial<Move> = {}) {
  return moves.some((m) => {
    if (m.from[0] !== from[0] || m.from[1] !== from[1]) return false;
    if (m.to[0] !== to[0] || m.to[1] !== to[1]) return false;
    if (extras.promotion && m.promotion !== extras.promotion) return false;
    if (extras.castle && m.castle !== extras.castle) return false;
    if (extras.enPassant !== undefined && m.enPassant !== extras.enPassant) return false;
    return true;
  });
}

function playMoveByCoords(state: GameState, from: [number, number], to: [number, number], extras: Partial<Move> = {}) {
  const legal = getLegalMoves(state);
  const move = legal.find(
    (m) =>
      m.from[0] === from[0] &&
      m.from[1] === from[1] &&
      m.to[0] === to[0] &&
      m.to[1] === to[1] &&
      (extras.promotion ? m.promotion === extras.promotion : true) &&
      (extras.castle ? m.castle === extras.castle : true) &&
      (extras.enPassant !== undefined ? m.enPassant === extras.enPassant : true),
  );

  if (!move) {
    throw new Error(`Expected legal move from ${from.join(',')} to ${to.join(',')}`);
  }
  return makeMove(state, move);
}

describe('chess engine', () => {
  describe('legal moves for each piece type', () => {
    it('pawn from start has one and two-step advances', () => {
      const state = createInitialGame();
      const moves = getLegalMovesFrom(state, 6, 4); // e2
      expect(hasMove(moves, [6, 4], [5, 4])).toBe(true);
      expect(hasMove(moves, [6, 4], [4, 4])).toBe(true);
    });

    it('knight in center has 8 legal moves', () => {
      let board = createEmptyBoard();
      board = place(board, 4, 4, { color: 'w', type: 'N' });
      board = place(board, 7, 4, { color: 'w', type: 'K' });
      board = place(board, 0, 4, { color: 'b', type: 'K' });

      const state = makeState({ board, turn: 'w' });
      const moves = getLegalMovesFrom(state, 4, 4);
      expect(moves).toHaveLength(8);
    });

    it('bishop in center has diagonal legal moves', () => {
      let board = createEmptyBoard();
      board = place(board, 4, 4, { color: 'w', type: 'B' });
      board = place(board, 7, 4, { color: 'w', type: 'K' });
      board = place(board, 0, 4, { color: 'b', type: 'K' });

      const state = makeState({ board, turn: 'w' });
      const moves = getLegalMovesFrom(state, 4, 4);
      expect(moves).toHaveLength(13);
      expect(hasMove(moves, [4, 4], [1, 1])).toBe(true);
      expect(hasMove(moves, [4, 4], [7, 7])).toBe(true);
    });

    it('rook in center has straight-line legal moves', () => {
      let board = createEmptyBoard();
      board = place(board, 4, 4, { color: 'w', type: 'R' });
      board = place(board, 7, 0, { color: 'w', type: 'K' });
      board = place(board, 0, 7, { color: 'b', type: 'K' });

      const state = makeState({ board, turn: 'w' });
      const moves = getLegalMovesFrom(state, 4, 4);
      expect(moves).toHaveLength(14);
      expect(hasMove(moves, [4, 4], [4, 0])).toBe(true);
      expect(hasMove(moves, [4, 4], [0, 4])).toBe(true);
    });

    it('queen in center has combined legal moves', () => {
      let board = createEmptyBoard();
      board = place(board, 4, 4, { color: 'w', type: 'Q' });
      board = place(board, 7, 0, { color: 'w', type: 'K' });
      board = place(board, 0, 7, { color: 'b', type: 'K' });

      const state = makeState({ board, turn: 'w' });
      const moves = getLegalMovesFrom(state, 4, 4);
      expect(moves).toHaveLength(27);
    });

    it('king in center has 8 adjacent legal moves', () => {
      let board = createEmptyBoard();
      board = place(board, 4, 4, { color: 'w', type: 'K' });
      board = place(board, 0, 0, { color: 'b', type: 'K' });

      const state = makeState({ board, turn: 'w' });
      const moves = getLegalMovesFrom(state, 4, 4);
      expect(moves).toHaveLength(8);
    });
  });

  describe('castling rules', () => {
    it('supports kingside and queenside castling when legal', () => {
      let board = createEmptyBoard();
      board = place(board, 7, 4, { color: 'w', type: 'K' });
      board = place(board, 7, 0, { color: 'w', type: 'R' });
      board = place(board, 7, 7, { color: 'w', type: 'R' });
      board = place(board, 0, 4, { color: 'b', type: 'K' });

      const state = makeState({
        board,
        turn: 'w',
        castling: { wK: true, wQ: true, bK: false, bQ: false },
      });

      const kingMoves = getLegalMovesFrom(state, 7, 4);
      expect(hasMove(kingMoves, [7, 4], [7, 6], { castle: 'K' })).toBe(true);
      expect(hasMove(kingMoves, [7, 4], [7, 2], { castle: 'Q' })).toBe(true);
    });

    it("doesn't allow castling through check", () => {
      let board = createEmptyBoard();
      board = place(board, 7, 4, { color: 'w', type: 'K' });
      board = place(board, 7, 7, { color: 'w', type: 'R' });
      board = place(board, 0, 4, { color: 'b', type: 'K' });
      board = place(board, 0, 5, { color: 'b', type: 'R' }); // attacks f1

      const state = makeState({
        board,
        turn: 'w',
        castling: { wK: true, wQ: false, bK: false, bQ: false },
      });

      const kingMoves = getLegalMovesFrom(state, 7, 4);
      expect(hasMove(kingMoves, [7, 4], [7, 6], { castle: 'K' })).toBe(false);
    });

    it("doesn't allow castling after king moved", () => {
      let state = createInitialGame();
      state = playMoveByCoords(state, [6, 4], [4, 4]); // e2-e4
      state = playMoveByCoords(state, [1, 0], [2, 0]); // a7-a6
      state = playMoveByCoords(state, [7, 4], [6, 4]); // Ke1-e2
      state = playMoveByCoords(state, [1, 1], [2, 1]); // b7-b6
      state = playMoveByCoords(state, [6, 4], [7, 4]); // Ke2-e1
      state = playMoveByCoords(state, [1, 2], [2, 2]); // c7-c6

      const kingMoves = getLegalMovesFrom(state, 7, 4);
      expect(kingMoves.some((m) => m.castle === 'K' || m.castle === 'Q')).toBe(false);
      expect(state.castling.wK).toBe(false);
      expect(state.castling.wQ).toBe(false);
    });
  });

  describe('en passant', () => {
    it('allows en passant only immediately after double pawn push', () => {
      let state = createInitialGame();
      state = playMoveByCoords(state, [6, 4], [4, 4]); // e2-e4
      state = playMoveByCoords(state, [1, 0], [2, 0]); // a7-a6
      state = playMoveByCoords(state, [4, 4], [3, 4]); // e4-e5
      state = playMoveByCoords(state, [1, 3], [3, 3]); // d7-d5

      const whitePawnMoves = getLegalMovesFrom(state, 3, 4);
      expect(hasMove(whitePawnMoves, [3, 4], [2, 3], { enPassant: true })).toBe(true);

      state = playMoveByCoords(state, [7, 6], [5, 5]); // Ng1-f3 (skip en passant)
      expect(state.enPassant).toBeNull();
      state = playMoveByCoords(state, [1, 7], [2, 7]); // h7-h6

      const pawnMovesAfterDelay = getLegalMovesFrom(state, 3, 4);
      expect(hasMove(pawnMovesAfterDelay, [3, 4], [2, 3], { enPassant: true })).toBe(false);
    });
  });

  describe('promotion', () => {
    it('offers all promotion piece types and applies selected promotion', () => {
      const promotions: PieceType[] = ['Q', 'R', 'B', 'N'];

      for (const promotionType of promotions) {
        let board = createEmptyBoard();
        board = place(board, 1, 0, { color: 'w', type: 'P' });
        board = place(board, 7, 4, { color: 'w', type: 'K' });
        board = place(board, 0, 7, { color: 'b', type: 'K' });

        const state = makeState({ board, turn: 'w' });
        const moves = getLegalMovesFrom(state, 1, 0);

        expect(hasMove(moves, [1, 0], [0, 0], { promotion: promotionType })).toBe(true);

        const promotedState = makeMove(state, {
          from: [1, 0],
          to: [0, 0],
          promotion: promotionType,
        });

        expect(promotedState.board[0][0]).toEqual({ color: 'w', type: promotionType });
      }
    });
  });

  describe('check, checkmate, and stalemate', () => {
    it('prevents pinned pieces from exposing their king', () => {
      let board = createEmptyBoard();
      board = place(board, 7, 4, { color: 'w', type: 'K' }); // e1
      board = place(board, 6, 4, { color: 'w', type: 'R' }); // e2 pinned piece
      board = place(board, 0, 4, { color: 'b', type: 'R' }); // e8 attacker
      board = place(board, 0, 0, { color: 'b', type: 'K' }); // a8

      const state = makeState({ board, turn: 'w' });
      expect(isInCheck(state.board, 'w')).toBe(false);

      const pinnedRookMoves = getLegalMovesFrom(state, 6, 4);
      expect(hasMove(pinnedRookMoves, [6, 4], [6, 3])).toBe(false);
      expect(hasMove(pinnedRookMoves, [6, 4], [6, 5])).toBe(false);
    });

    it('requires the side in check to resolve check', () => {
      let board = createEmptyBoard();
      board = place(board, 7, 4, { color: 'w', type: 'K' }); // e1
      board = place(board, 7, 0, { color: 'w', type: 'R' }); // a1 (cannot help)
      board = place(board, 0, 4, { color: 'b', type: 'R' }); // e8 gives check
      board = place(board, 0, 0, { color: 'b', type: 'K' }); // a8

      const state = makeState({ board, turn: 'w' });
      expect(isInCheck(state.board, 'w')).toBe(true);
      expect(getLegalMovesFrom(state, 7, 0)).toHaveLength(0);
      expect(getLegalMoves(state).every((m) => m.from[0] === 7 && m.from[1] === 4)).toBe(true);
    });

    it('detects checkmate (fool\'s mate)', () => {
      let state = createInitialGame();
      state = playMoveByCoords(state, [6, 5], [5, 5]); // f2-f3
      state = playMoveByCoords(state, [1, 4], [3, 4]); // e7-e5
      state = playMoveByCoords(state, [6, 6], [4, 6]); // g2-g4
      state = playMoveByCoords(state, [0, 3], [4, 7]); // Qd8-h4#

      expect(state.status).toBe('checkmate');
      expect(state.turn).toBe('w');
      expect(isInCheck(state.board, 'w')).toBe(true);
      expect(getLegalMoves(state)).toHaveLength(0);
    });

    it('detects stalemate', () => {
      let board = createEmptyBoard();
      board = place(board, 0, 0, { color: 'b', type: 'K' }); // a8
      board = place(board, 2, 2, { color: 'w', type: 'K' }); // c6
      board = place(board, 2, 1, { color: 'w', type: 'Q' }); // b6

      let state = makeState({ board, turn: 'w' });
      state = playMoveByCoords(state, [2, 1], [1, 2]); // Qb6-c7

      expect(state.status).toBe('stalemate');
      expect(state.turn).toBe('b');
      expect(isInCheck(state.board, 'b')).toBe(false);
      expect(getLegalMoves(state)).toHaveLength(0);
    });
  });
});
