// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
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

afterEach(() => {
  cleanup();
});

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

  it('renders all four influence zones and legend in both mode', () => {
    const influence = createInfluence();
    influence.white[0][0] = 1; // blue
    influence.black[0][1] = 1; // red
    influence.white[0][2] = 1; // purple (both)
    influence.black[0][2] = 1;
    // green appears automatically where both are 0

    const { container, getAllByText } = renderBoard({ influence, viewMode: 'both', showInfluence: true });

    const blue = container.querySelector('[data-square="0,0"] .influence-glow') as HTMLElement;
    const red = container.querySelector('[data-square="0,1"] .influence-glow') as HTMLElement;
    const purple = container.querySelector('[data-square="0,2"] .influence-glow') as HTMLElement;
    const green = container.querySelector('[data-square="0,3"] .influence-glow') as HTMLElement;

    expect(blue.style.background).toContain('rgba(100,160,240');
    expect(red.style.background).toContain('rgba(220,90,90');
    expect(purple.style.background).toContain('rgba(160,120,200');
    expect(green.style.background).toContain('rgba(80,180,100');

    expect(getAllByText(/your territory/i).length).toBeGreaterThan(0);
    expect(getAllByText(/opponent/i).length).toBeGreaterThan(0);
    expect(getAllByText(/safe passage/i).length).toBeGreaterThan(0);
    expect(getAllByText(/contested/i).length).toBeGreaterThan(0);
  });

  it('hides influence glows and legend when overlay is off', () => {
    const influence = createInfluence();
    influence.white[4][4] = 2;

    const { container } = renderBoard({ influence, showInfluence: false });

    expect(container.querySelector('.influence-glow')).toBeFalsy();
    expect(container.textContent?.toLowerCase().includes('safe passage')).toBe(false);
  });
});
