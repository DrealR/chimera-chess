import { describe, expect, it } from 'vitest';
import { calculateInfluence, getAttackedSquares } from './engine';
import { PRESETS } from './presets';
import { createEmptyBoard, type BoardState, type Piece } from './types';

function placePiece(board: BoardState, row: number, col: number, piece: Piece): BoardState {
  const next = board.map((line) => line.slice());
  next[row][col] = piece;
  return next;
}

function totalInfluence(grid: number[][]): number {
  return grid.reduce((sum, row) => sum + row.reduce((inner, cell) => inner + cell, 0), 0);
}

function zoneCounts(influence: { white: number[][]; black: number[][] }) {
  let blue = 0;
  let red = 0;
  let purple = 0;
  let green = 0;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const w = influence.white[r][c];
      const b = influence.black[r][c];
      if (w > 0 && b > 0) purple++;
      else if (w > 0) blue++;
      else if (b > 0) red++;
      else green++;
    }
  }

  return { blue, red, purple, green };
}

describe('influence engine', () => {
  it('single knight in center controls 8 squares', () => {
    let board = createEmptyBoard();
    board = placePiece(board, 3, 3, { color: 'w', type: 'N' });

    const attacked = getAttackedSquares(board, 3, 3, { color: 'w', type: 'N' });
    expect(attacked).toHaveLength(8);

    const influence = calculateInfluence(board);
    expect(totalInfluence(influence.white)).toBe(8);
    expect(totalInfluence(influence.black)).toBe(0);
  });

  it('single knight in corner controls 2 squares', () => {
    let board = createEmptyBoard();
    board = placePiece(board, 0, 0, { color: 'w', type: 'N' });

    const attacked = getAttackedSquares(board, 0, 0, { color: 'w', type: 'N' });
    expect(attacked).toHaveLength(2);
    expect(attacked).toEqual(
      expect.arrayContaining([
        [1, 2],
        [2, 1],
      ]),
    );
  });

  it('pawn controls diagonals only and not forward square', () => {
    let board = createEmptyBoard();
    board = placePiece(board, 6, 4, { color: 'w', type: 'P' });

    const attacked = getAttackedSquares(board, 6, 4, { color: 'w', type: 'P' });
    expect(attacked).toEqual(
      expect.arrayContaining([
        [5, 3],
        [5, 5],
      ]),
    );
    expect(attacked).not.toContainEqual([5, 4]);
  });

  it('rook is blocked by friendly piece but controls the blocking square', () => {
    let board = createEmptyBoard();
    board = placePiece(board, 4, 3, { color: 'w', type: 'R' });
    board = placePiece(board, 2, 3, { color: 'w', type: 'P' });

    const attacked = getAttackedSquares(board, 4, 3, { color: 'w', type: 'R' });
    expect(attacked).toContainEqual([3, 3]);
    expect(attacked).toContainEqual([2, 3]);
    expect(attacked).not.toContainEqual([1, 3]);
  });

  it('bishop, rook, and queen stop at any blocking piece but include that square', () => {
    const cases: Array<{ type: 'B' | 'R' | 'Q'; blocker: [number, number]; blockedBeyond: [number, number] }> = [
      { type: 'B', blocker: [3, 3], blockedBeyond: [2, 2] },
      { type: 'R', blocker: [2, 4], blockedBeyond: [1, 4] },
      { type: 'Q', blocker: [4, 6], blockedBeyond: [4, 7] },
    ];

    for (const { type, blocker, blockedBeyond } of cases) {
      let board = createEmptyBoard();
      board = placePiece(board, 4, 4, { color: 'w', type });
      board = placePiece(board, blocker[0], blocker[1], { color: 'b', type: 'P' });

      const attacked = getAttackedSquares(board, 4, 4, { color: 'w', type });
      expect(attacked).toContainEqual(blocker);
      expect(attacked).not.toContainEqual(blockedBeyond);
    }
  });

  it('king in center controls 8 adjacent squares', () => {
    let board = createEmptyBoard();
    board = placePiece(board, 3, 3, { color: 'w', type: 'K' });

    const attacked = getAttackedSquares(board, 3, 3, { color: 'w', type: 'K' });
    expect(attacked).toHaveLength(8);
  });

  it('starting position has balanced total influence for both sides', () => {
    const influence = calculateInfluence(PRESETS[0].board);
    expect(totalInfluence(influence.white)).toBe(38);
    expect(totalInfluence(influence.black)).toBe(38);
  });

  it('handles edge cases: empty board and full board', () => {
    const empty = calculateInfluence(createEmptyBoard());
    expect(totalInfluence(empty.white)).toBe(0);
    expect(totalInfluence(empty.black)).toBe(0);

    const full = createEmptyBoard().map((row) =>
      row.map(() => ({ color: 'w' as const, type: 'P' as const })),
    );
    const fullInfluence = calculateInfluence(full);
    expect(fullInfluence.white).toHaveLength(8);
    expect(fullInfluence.white[0]).toHaveLength(8);
  });

  it('opening and sparse endgame have dramatically different zone distributions', () => {
    const opening = calculateInfluence(PRESETS[0].board);

    let endgame = createEmptyBoard();
    endgame = placePiece(endgame, 0, 4, { color: 'b', type: 'K' });
    endgame = placePiece(endgame, 7, 4, { color: 'w', type: 'K' });
    const sparse = calculateInfluence(endgame);

    const openingZones = zoneCounts(opening);
    const sparseZones = zoneCounts(sparse);

    // Opening still has meaningful safe passage.
    expect(openingZones.green).toBeGreaterThan(0);
    // Endgame shifts strongly toward safe squares due to far fewer attacking pieces.
    expect(sparseZones.green - openingZones.green).toBeGreaterThan(8);
    expect(JSON.stringify(openingZones)).not.toBe(JSON.stringify(sparseZones));
  });
});
