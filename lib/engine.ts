import type { BoardState, Piece } from './types';

export type InfluenceMap = {
  white: number[][];
  black: number[][];
};

function createGrid(): number[][] {
  return Array.from({ length: 8 }, () => Array<number>(8).fill(0));
}

function inBounds(r: number, c: number): boolean {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

/**
 * Returns all squares a piece ATTACKS/CONTROLS from its position.
 * Pawns control diagonally forward (not where they move).
 * Sliding pieces are blocked by any piece but DO control the blocking square.
 */
export function getAttackedSquares(
  board: BoardState,
  row: number,
  col: number,
  piece: Piece,
): [number, number][] {
  const squares: [number, number][] = [];

  switch (piece.type) {
    case 'P': {
      const dir = piece.color === 'w' ? -1 : 1;
      if (inBounds(row + dir, col - 1)) squares.push([row + dir, col - 1]);
      if (inBounds(row + dir, col + 1)) squares.push([row + dir, col + 1]);
      break;
    }
    case 'N': {
      for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
        if (inBounds(row + dr, col + dc)) squares.push([row + dr, col + dc]);
      }
      break;
    }
    case 'K': {
      for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
        if (inBounds(row + dr, col + dc)) squares.push([row + dr, col + dc]);
      }
      break;
    }
    case 'B':
    case 'R':
    case 'Q': {
      const dirs =
        piece.type === 'B'
          ? [[-1,-1],[-1,1],[1,-1],[1,1]]
          : piece.type === 'R'
            ? [[-1,0],[1,0],[0,-1],[0,1]]
            : [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
      for (const [dr, dc] of dirs) {
        let r = row + dr;
        let c = col + dc;
        while (inBounds(r, c)) {
          squares.push([r, c]);
          if (board[r][c] !== null) break; // blocked — include square, stop scanning
          r += dr;
          c += dc;
        }
      }
      break;
    }
  }

  return squares;
}

/**
 * Calculates the full influence map for both sides.
 * For each square: how many white/black pieces attack it.
 */
export function calculateInfluence(board: BoardState): InfluenceMap {
  const white = createGrid();
  const black = createGrid();

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (!piece) continue;
      const attacked = getAttackedSquares(board, r, c, piece);
      const grid = piece.color === 'w' ? white : black;
      for (const [ar, ac] of attacked) {
        grid[ar][ac]++;
      }
    }
  }

  return { white, black };
}
