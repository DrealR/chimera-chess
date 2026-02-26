import { describe, expect, it } from 'vitest';
import { evaluate, getBestMove, type Difficulty } from './ai';
import { createInitialGame, getLegalMoves } from './chess';
import type { GameState } from './chess';
import { createEmptyBoard } from './types';
import type { BoardState } from './types';

function place(board: BoardState, row: number, col: number, type: string, color: 'w' | 'b'): BoardState {
  const next = board.map((r) => r.slice()) as BoardState;
  next[row][col] = { type: type as any, color };
  return next;
}

function makeState(overrides: Partial<GameState> = {}): GameState {
  return {
    board: createEmptyBoard(),
    turn: 'w',
    castling: { wK: false, wQ: false, bK: false, bQ: false },
    enPassant: null,
    halfmove: 0,
    fullmove: 1,
    moves: [],
    captured: { w: [], b: [] },
    status: 'playing',
    ...overrides,
  };
}

describe('AI', () => {
  it('evaluate returns 0 for starting position (symmetric)', () => {
    const game = createInitialGame();
    expect(evaluate(game)).toBe(0);
  });

  it('evaluate returns positive when white has extra material', () => {
    let board = createEmptyBoard();
    board = place(board, 7, 4, 'K', 'w');
    board = place(board, 0, 4, 'K', 'b');
    board = place(board, 4, 4, 'Q', 'w');
    const game = makeState({ board });
    expect(evaluate(game)).toBeGreaterThan(0);
  });

  it('evaluate returns negative when black has extra material', () => {
    let board = createEmptyBoard();
    board = place(board, 7, 4, 'K', 'w');
    board = place(board, 0, 4, 'K', 'b');
    board = place(board, 3, 3, 'Q', 'b');
    const game = makeState({ board });
    expect(evaluate(game)).toBeLessThan(0);
  });

  it('getBestMove returns a legal move for all difficulties', () => {
    const game = createInitialGame();
    for (const d of ['easy', 'medium', 'hard'] as Difficulty[]) {
      const move = getBestMove(game, d);
      expect(move).not.toBeNull();
      const legal = getLegalMoves(game);
      expect(
        legal.some(
          (m) =>
            m.from[0] === move!.from[0] &&
            m.from[1] === move!.from[1] &&
            m.to[0] === move!.to[0] &&
            m.to[1] === move!.to[1],
        ),
      ).toBe(true);
    }
  });

  it('captures a free queen when available', () => {
    let board = createEmptyBoard();
    board = place(board, 0, 4, 'K', 'b');
    board = place(board, 7, 4, 'K', 'w');
    board = place(board, 4, 4, 'Q', 'b'); // free black queen
    board = place(board, 5, 3, 'B', 'w'); // white bishop can capture it
    const game = makeState({ board, turn: 'w' });
    const move = getBestMove(game, 'medium');
    expect(move).not.toBeNull();
    expect(move!.to).toEqual([4, 4]);
  });

  it('runs in under 1 second at depth 3 from starting position', () => {
    const game = createInitialGame();
    const start = performance.now();
    getBestMove(game, 'hard');
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(1000);
  });
});
