// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import type { ComponentProps } from 'react';
import Board from './Board';
import type { BoardState, ViewMode } from '@/lib/types';
import type { InfluenceMap } from '@/lib/engine';

function createBoard(): BoardState {
  return Array.from({ length: 8 }, () => Array(8).fill(null));
}

function createInfluence(): InfluenceMap {
  return {
    white: Array.from({ length: 8 }, () => Array(8).fill(0)),
    black: Array.from({ length: 8 }, () => Array(8).fill(0)),
  };
}

function renderBoard(overrides?: Partial<ComponentProps<typeof Board>>) {
  const baseInfluence = createInfluence();
  const props: ComponentProps<typeof Board> = {
    board: createBoard(),
    influence: baseInfluence,
    viewMode: 'both' as ViewMode,
    highlightedSquares: null,
    highlightedPiecePos: null,
    showLabels: true,
    onSquareClick: () => {},
    activeTool: false,
    ...overrides,
  };
  return render(<Board {...props} />);
}

describe('Board visuals', () => {
  it('renders influence glow on the matching square only', () => {
    const influence = createInfluence();
    influence.white[3][4] = 2;

    const { container } = renderBoard({ influence, viewMode: 'white' });

    const target = container.querySelector('[data-square="3,4"]');
    const other = container.querySelector('[data-square="3,5"]');

    expect(target?.querySelector('.influence-glow')).toBeTruthy();
    expect(other?.querySelector('.influence-glow')).toBeFalsy();
  });

  it('renders legal move dots, check pulse, and capture flash on the correct squares', () => {
    const { container } = renderBoard({
      legalMoves: new Set(['4,4']),
      checkSquare: [7, 4],
      flashSquare: [2, 2],
    });

    const legal = container.querySelector('[data-square="4,4"]');
    const check = container.querySelector('[data-square="7,4"]');
    const flash = container.querySelector('[data-square="2,2"]');

    expect(legal?.querySelector('.legal-move-dot')).toBeTruthy();
    expect(check?.querySelector('.check-pulse')).toBeTruthy();
    expect(flash?.querySelector('.capture-flash')).toBeTruthy();
  });
});
